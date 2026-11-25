<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Phân tích & kho CV</h2>
          <p>Tải CV (PDF) để AI trích xuất kỹ năng, kinh nghiệm. Bạn kiểm tra, chỉnh sửa rồi lưu; file gốc được lưu cùng ứng viên.</p>
        </div>
      </div>

      <div class="ui-tabs">
        <button :class="{ active: tab === 'analyze' }" @click="tab = 'analyze'">Phân tích CV mới</button>
        <button :class="{ active: tab === 'files' }" @click="openFiles">Kho CV đã lưu</button>
      </div>

      <template v-if="tab === 'analyze'">

      <div class="ui-notice info">
        <i class="fas fa-shield-alt"></i>
        <div>
          Tên, email, SĐT, năm sinh <b>chỉ dùng để điền sẵn form</b> và không bao giờ được gửi vào bước chấm điểm.
          Tên công ty và trường học cũng bị loại khỏi hồ sơ chấm điểm để tránh thiên lệch theo “danh tiếng”.
        </div>
      </div>

      <div class="ui-grid-2">
        <!-- Cột trái: tải lên -->
        <div>
          <div class="ui-card">
            <h5><i class="fas fa-cloud-upload-alt"></i> 1. Tải CV lên</h5>
            <label
              class="ui-dropzone d-block"
              :class="{ drag: dragging }"
              @dragover.prevent="dragging = true"
              @dragleave.prevent="dragging = false"
              @drop.prevent="onDrop"
            >
              <i class="fas fa-file-pdf"></i>
              <div class="name">{{ file ? file.name : "Kéo thả hoặc bấm để chọn file PDF" }}</div>
              <small>Tối đa 10MB. PDF dạng scan chưa được hỗ trợ.</small>
              <input type="file" accept="application/pdf" hidden @change="onPick" />
            </label>

            <div v-if="error" class="ui-notice error mt-3 mb-0">
              <i class="fas fa-exclamation-triangle"></i><div>{{ error }}</div>
            </div>

            <button class="btn btn-primary mt-3 w-100" :disabled="!file || loading" @click="analyze">
              <span v-if="loading" class="ui-spin me-2"></span>
              <i v-else class="fas fa-magic me-2"></i>
              {{ loading ? "AI đang đọc CV..." : "Phân tích CV" }}
            </button>
          </div>

          <div v-if="result" class="ui-card">
            <h5><i class="fas fa-user-check"></i> Thông tin liên hệ (chỉ để điền form)</h5>
            <dl class="ui-kv">
              <dt>Họ tên</dt><dd>{{ result.prefill.name || "—" }}</dd>
              <dt>Email</dt><dd>{{ result.prefill.email || "—" }}</dd>
              <dt>SĐT</dt><dd>{{ result.prefill.phone || "—" }}</dd>
              <dt>Năm sinh</dt><dd>{{ result.prefill.birthYear || "—" }}</dd>
              <dt>Học vấn</dt><dd>{{ result.prefill.academicLevel || "—" }}</dd>
              <dt>Chuyên ngành</dt><dd>{{ result.prefill.specialized || "—" }}</dd>
              <dt>Từng làm tại</dt><dd>{{ result.prefill.companyUV || "—" }}</dd>
            </dl>
          </div>
        </div>

        <!-- Cột phải: kết quả -->
        <div>
          <div v-if="!result" class="ui-card ui-empty">
            <i class="fas fa-file-alt"></i>
            Kết quả phân tích sẽ hiển thị ở đây.
          </div>

          <template v-else>
            <div class="ui-card">
              <h5><i class="fas fa-clipboard-check"></i> 2. Hồ sơ năng lực (có thể chỉnh sửa)</h5>
              <div class="mb-3">
                <label>Định hướng / chức danh</label>
                <input class="form-control" v-model="profile.headline" />
              </div>
              <div class="mb-3">
                <label>Tóm tắt năng lực</label>
                <textarea class="form-control ui-textarea" v-model="profile.summary"></textarea>
              </div>
              <div class="mb-3">
                <label>Kỹ năng</label>
                <chip-input v-model="profile.skills" placeholder="Thêm kỹ năng, Enter" />
              </div>
              <div class="row">
                <div class="col-6 mb-3">
                  <label>Tổng số năm kinh nghiệm</label>
                  <input type="number" min="0" step="0.5" class="form-control" v-model.number="profile.totalYearsExperience" />
                </div>
                <div class="col-6 mb-3">
                  <label>Ngoại ngữ</label>
                  <chip-input v-model="profile.languages" placeholder="Thêm ngôn ngữ" />
                </div>
              </div>
              <label>Kinh nghiệm làm việc</label>
              <div v-for="(exp, i) in profile.experiences" :key="i" class="ui-evidence">
                <div class="req">
                  <span>{{ exp.title }}</span>
                  <span class="text-muted fw-normal">{{ exp.durationMonths ? exp.durationMonths + " tháng" : "" }}</span>
                </div>
                <div class="ev">{{ exp.description }}</div>
              </div>
              <div v-if="!profile.experiences.length" class="text-muted">Không tìm thấy kinh nghiệm.</div>
            </div>

            <div class="ui-card">
              <h5><i class="fas fa-save"></i> 3. Lưu hồ sơ và file CV</h5>
              <p class="text-muted small">File CV gốc chỉ được giữ lại khi bạn lưu cho một ứng viên; nếu không, hệ thống tự xóa sau 24 giờ.</p>
              <div class="mb-3">
                <label>Gắn vào ứng viên đã có</label>
                <select class="form-select" v-model="employeeId">
                  <option value="">— Chọn ứng viên —</option>
                  <option v-for="e in employees" :key="e._id" :value="e._id">
                    {{ e.name }} {{ e.phone ? "· " + e.phone : "" }} {{ e.hasCvProfile ? "(đã có hồ sơ)" : "" }}
                  </option>
                </select>
              </div>
              <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-primary" :disabled="!employeeId || saving" @click="saveToExisting">
                  <i class="fas fa-save me-1"></i> Lưu cho ứng viên đã chọn
                </button>
                <button class="btn btn-outline-success" :disabled="saving" @click="createCandidate">
                  <i class="fas fa-user-plus me-1"></i> Tạo ứng viên mới từ CV
                </button>
              </div>
              <div v-if="savedMessage" class="ui-notice info mt-3 mb-0">
                <i class="fas fa-check-circle"></i><div>{{ savedMessage }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      </template>

      <!-- ========== Kho CV ========== -->
      <template v-else>
        <div class="ui-card" style="padding: 0; overflow: hidden">
          <div v-if="loadingFiles" class="ui-empty"><span class="ui-spin"></span></div>
          <div v-else-if="!files.length" class="ui-empty">
            <i class="fas fa-inbox"></i>Chưa có CV nào được lưu. Hãy phân tích một CV rồi lưu cho ứng viên.
          </div>
          <div v-else class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th>File</th><th>Ứng viên</th><th>Dung lượng</th><th>Ngày lưu</th><th style="width: 170px"></th></tr>
              </thead>
              <tbody>
                <tr v-for="f in files" :key="f._id">
                  <td><i class="fas fa-file-pdf text-danger me-2"></i>{{ f.filename }}</td>
                  <td>
                    <b>{{ f.employee ? f.employee.name : "—" }}</b>
                    <small class="text-muted d-block">{{ f.employee && f.employee.phone }}</small>
                  </td>
                  <td>{{ formatSize(f.size) }}</td>
                  <td>{{ formatDate(f.createdAt) }}</td>
                  <td class="text-end">
                    <button class="btn btn-outline-secondary btn-sm me-1" @click="view(f)">Xem</button>
                    <button v-if="canEdit" class="btn btn-outline-secondary btn-sm text-danger" @click="removeFile(f)">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="legacy.length" class="ui-card">
          <h5><i class="fas fa-inbox"></i> CV tải lên bằng chức năng Upload PDF cũ (chỉ xem)</h5>
          <p class="text-muted small">Các file này nằm trên máy chủ cũ và ai có link cũng mở được. Nên tải lại vào kho CV để được bảo vệ bằng đăng nhập.</p>
          <table class="table mb-0">
            <thead><tr><th>Họ tên</th><th>SĐT</th><th>Email</th><th></th></tr></thead>
            <tbody>
              <tr v-for="l in legacy" :key="l._id">
                <td>{{ l.name }}</td><td>{{ l.phone }}</td><td>{{ l.email }}</td>
                <td class="text-end">
                  <a v-if="l.linkCVPDF" :href="l.linkCVPDF" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm">Mở</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ChipInput from "@/components/ChipInput.vue";
import { parseCv, saveCvProfile, listCvFiles, openCvFile, deleteCvFile, errorMessage } from "@/services/ai-service";
import { getAllPDFs } from "@/services/pdf-service";
import { getALLEmployees, createEmployee } from "@/services/employee-service";
import { useAuthStore } from "@/stores/auth";
import { formatSize, localDate as formatDate, todayDMY } from "@/utils/format";

const auth = useAuthStore();
const canEdit = computed(() => ["admin", "hr"].includes(auth.role));

const tab = ref("analyze");
const files = ref([]);
const legacy = ref([]);
const loadingFiles = ref(false);
const fileId = ref("");
const file = ref(null);
const dragging = ref(false);
const loading = ref(false);
const saving = ref(false);
const error = ref("");
const savedMessage = ref("");
const result = ref(null);
const profile = ref(null);
const employees = ref([]);
const employeeId = ref("");

onMounted(async () => {
  const res = await getALLEmployees();
  employees.value = (res && res.data) || [];
});

// ---------- Kho CV ----------
async function openFiles() {
  tab.value = "files";
  loadingFiles.value = true;
  try {
    const res = await listCvFiles();
    files.value = (res && res.data) || [];
  } catch {
    files.value = [];
  }
  try {
    const old = await getAllPDFs();
    legacy.value = (old && old.data) || [];
  } catch {
    legacy.value = [];
  }
  loadingFiles.value = false;
}

async function view(f) {
  try {
    await openCvFile(f._id);
  } catch {
    alert("Không mở được file CV.");
  }
}

async function removeFile(f) {
  if (!window.confirm(`Xóa file "${f.filename}"? Hồ sơ năng lực của ứng viên vẫn được giữ.`)) return;
  if ((await deleteCvFile(f._id)) === 200) files.value = files.value.filter((x) => x._id !== f._id);
}

// ---------- Phân tích ----------
function setFile(f) {
  error.value = "";
  if (f && f.type !== "application/pdf") {
    error.value = "Chỉ chấp nhận file PDF.";
    return;
  }
  file.value = f || null;
}
const onPick = (e) => setFile(e.target.files[0]);
function onDrop(e) {
  dragging.value = false;
  setFile(e.dataTransfer.files[0]);
}

async function analyze() {
  loading.value = true;
  error.value = "";
  savedMessage.value = "";
  result.value = null;
  try {
    const res = await parseCv(file.value);
    if (res.status !== 200) {
      error.value = (res.data && res.data.error) || "Không phân tích được CV.";
    } else {
      result.value = res.data.data;
      fileId.value = result.value.fileId;
      profile.value = JSON.parse(JSON.stringify(result.value.profile));
    }
  } catch (e) {
    error.value = errorMessage(e);
  }
  loading.value = false;
}

function markHasProfile(id) {
  const e = employees.value.find((x) => x._id === id);
  if (e) e.hasCvProfile = true;
}

async function saveToExisting() {
  saving.value = true;
  const res = await saveCvProfile(employeeId.value, profile.value, fileId.value);
  savedMessage.value = res.status === 200 ? "Đã lưu hồ sơ năng lực cho ứng viên." : "Lưu thất bại.";
  if (res.status === 200) markHasProfile(employeeId.value);
  saving.value = false;
}

async function createCandidate() {
  saving.value = true;
  const p = result.value.prefill;
  const created = await createEmployee({
    name: p.name,
    email: p.email,
    phone: p.phone,
    birthYear: p.birthYear,
    academicLevel: p.academicLevel,
    specialized: p.specialized,
    companyUV: p.companyUV,
    cvDate: todayDMY(),
    source: "AI phân tích CV",
  });
  const id = created.data && created.data.data && created.data.data._id;
  if (id) {
    await saveCvProfile(id, profile.value, fileId.value);
    employees.value.unshift({ _id: id, name: p.name, phone: p.phone, hasCvProfile: true });
    savedMessage.value = "Đã tạo ứng viên mới và lưu hồ sơ năng lực. Bạn có thể bổ sung thông tin ở trang Employees CV.";
  } else {
    savedMessage.value = "Tạo ứng viên thất bại.";
  }
  saving.value = false;
}
</script>
