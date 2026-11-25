<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Hộp thư CV</h2>
          <p>CV ứng viên gửi qua email được lấy tự động, AI trích xuất thông tin và chờ bạn duyệt trước khi vào hệ thống.</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button v-if="config && canRun" class="btn btn-primary" :disabled="running" @click="runNow">
            <span v-if="running" class="ui-spin me-2"></span><i v-else class="fas fa-sync-alt me-1"></i>Quét hộp thư ngay
          </button>
        </div>
      </div>

      <div v-if="toast" class="ui-notice" :class="toast.type"><i class="fas fa-info-circle"></i><div>{{ toast.text }}</div></div>

      <div class="ui-tabs">
        <button :class="{ active: tab === 'pending' }" @click="setTab('pending')">Chờ duyệt <span v-if="pendingCount" class="count">{{ pendingCount }}</span></button>
        <button :class="{ active: tab === 'approved' }" @click="setTab('approved')">Đã duyệt</button>
        <button :class="{ active: tab === 'rejected' }" @click="setTab('rejected')">Đã bỏ qua</button>
        <button :class="{ active: tab === 'settings' }" @click="setTab('settings')"><i class="fas fa-cog me-1"></i>Cài đặt hộp thư</button>
      </div>

      <div v-if="loading" class="ui-card ui-empty"><span class="ui-spin"></span></div>

      <!-- ========== Danh sách ========== -->
      <template v-else-if="tab !== 'settings'">
        <div v-if="!config" class="ui-notice warn">
          <i class="fas fa-plug"></i>
          <div>Chưa kết nối hộp thư. <a @click="setTab('settings')" class="link">Thiết lập hộp thư</a> để hệ thống tự động nhận CV.</div>
        </div>

        <div v-if="!items.length" class="ui-card ui-empty">
          <i class="fas fa-inbox"></i>
          {{ tab === "pending" ? "Không có CV nào đang chờ duyệt." : "Chưa có mục nào." }}
        </div>

        <!-- Chờ duyệt -->
        <template v-if="tab === 'pending'">
          <div v-for="it in items" :key="it._id" class="ui-card cv-card">
            <div class="cv-main">
              <span class="avatar-ini" :style="{ background: avatarColor(it.prefill.name) }">{{ initials(it.prefill.name) }}</span>
              <div class="grow">
                <div class="d-flex flex-wrap align-items-center gap-2">
                  <b class="nm">{{ it.prefill.name || "(chưa nhận diện được tên)" }}</b>
                  <span v-if="it.flags.includes('duplicate')" class="ui-pill hold">Đã có trong hệ thống: {{ it.duplicateOf && it.duplicateOf.name }}</span>
                  <span v-if="it.flags.includes('missing_contact')" class="ui-pill reject">Thiếu SĐT/email</span>
                  <span v-if="it.flags.includes('scanned')" class="ui-pill reject">PDF scan</span>
                  <span v-if="it.flags.includes('email_from_sender')" class="ui-pill pending" title="CV không ghi email, dùng email người gửi">Email lấy từ người gửi</span>
                </div>
                <div class="contact">
                  <span v-if="it.prefill.phone"><i class="fas fa-phone-alt"></i>{{ it.prefill.phone }}</span>
                  <span v-if="it.prefill.email"><i class="fas fa-envelope"></i>{{ it.prefill.email }}</span>
                  <span v-if="it.prefill.academicLevel"><i class="fas fa-graduation-cap"></i>{{ it.prefill.academicLevel }} {{ it.prefill.specialized }}</span>
                </div>
                <div v-if="it.headline || it.skills.length" class="mt-2">
                  <span v-if="it.headline" class="text-muted me-2">{{ it.headline }}<template v-if="it.totalYearsExperience"> · {{ it.totalYearsExperience }} năm</template></span>
                  <span v-for="s in it.skills" :key="s" class="ui-chip">{{ s }}</span>
                </div>
                <div v-if="it.parseError" class="ui-notice warn mt-2 mb-0"><i class="fas fa-exclamation-triangle"></i><div>{{ it.parseError }}</div></div>
                <div class="meta mt-2">
                  <i class="fas fa-envelope-open-text"></i> {{ it.subject || "(không có tiêu đề)" }} · từ {{ it.fromName ? it.fromName + " " : "" }}&lt;{{ it.from }}&gt; · {{ formatDate(it.receivedAt) }}
                </div>
              </div>
            </div>
            <div class="cv-actions">
              <button class="btn btn-outline-secondary" @click="viewFile(it)"><i class="fas fa-file-pdf text-danger me-1"></i>{{ it.attachmentName || "Xem CV" }}</button>
              <button v-if="canRun" class="btn btn-primary" @click="openApprove(it)"><i class="fas fa-check me-1"></i>Duyệt</button>
              <button v-if="canRun" class="btn btn-outline-secondary text-danger" @click="confirmReject(it)">Bỏ qua</button>
            </div>
          </div>
        </template>

        <!-- Đã duyệt / đã bỏ qua -->
        <div v-else-if="items.length" class="ui-card table-card" style="padding: 0; overflow: hidden">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>{{ tab === "approved" ? "Ứng viên" : "Người gửi" }}</th>
                  <th>Tiêu đề email</th>
                  <th>Xử lý lúc</th>
                  <th v-if="tab === 'approved'">Google Sheet</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="it in items" :key="it._id">
                  <td>
                    <template v-if="tab === 'approved'">
                      <a class="nm link" @click="$router.push(`/detail-employee/${it.employeeId}`)">{{ it.prefill.name }}</a>
                      <span v-if="it.autoApproved" class="ui-pill" title="Hệ thống tự nhập, chưa qua duyệt tay"> Tự động</span>
                      <small class="text-muted d-block">{{ it.prefill.phone }} {{ it.prefill.email }}</small>
                    </template>
                    <template v-else>{{ it.fromName }} <small class="text-muted">{{ it.from }}</small></template>
                  </td>
                  <td>{{ it.subject }}</td>
                  <td class="nowrap">{{ formatDate(it.reviewedAt) }}</td>
                  <td v-if="tab === 'approved'">
                    <span v-if="it.sheet && it.sheet.appended" class="ui-pill shortlist">Đã ghi vào Sheet</span>
                    <span v-else-if="it.sheet && it.sheet.skipped === 'exists'" class="ui-pill pending">Sheet đã có dòng này</span>
                    <span v-else-if="it.sheet && it.sheet.error" class="ui-pill reject" :title="it.sheet.error">Lỗi ghi Sheet</span>
                    <span v-else class="ui-pill pending">Không ghi Sheet</span>
                    <small v-if="it.sheet && it.sheet.error" class="text-muted d-block">{{ it.sheet.error }}</small>
                    <button v-if="it.sheet && it.sheet.error && canRun" class="btn btn-sm btn-outline-secondary mt-1" @click="retrySheet(it)">Thử ghi lại</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- ========== Cài đặt ========== -->
      <template v-else>
        <div v-if="!encryptionConfigured" class="ui-notice error">
          <i class="fas fa-exclamation-triangle"></i>
          <div>Máy chủ chưa có khóa mã hóa mật khẩu hộp thư (biến <code>MAIL_CRED_KEY</code>), nên chưa thể lưu cấu hình. Hãy nhờ quản trị hệ thống cấu hình.</div>
        </div>
        <div v-if="!aiConfigured" class="ui-notice warn">
          <i class="fas fa-magic"></i><div>Chưa cấu hình <code>ANTHROPIC_API_KEY</code>: hệ thống chưa thể trích xuất thông tin CV bằng AI.</div>
        </div>
        <div class="ui-notice info">
          <i class="fas fa-shield-alt"></i>
          <div>
            Hệ thống chỉ <b>đọc</b> hộp thư (chế độ chỉ đọc): không xóa, không đánh dấu đã đọc, không trả lời hay gửi email.
            Mật khẩu được mã hóa trước khi lưu và không bao giờ hiển thị lại. Chỉ file <b>PDF</b> đính kèm được xử lý.
          </div>
        </div>

        <div class="ui-card">
          <h5><i class="fas fa-plug"></i> Kết nối hộp thư (IMAP)</h5>
          <div class="row g-3">
            <div class="col-md-6"><label>Máy chủ IMAP</label><input class="form-control" v-model="form.host" :disabled="!isAdmin" placeholder="imap.gmail.com" /></div>
            <div class="col-md-3"><label>Cổng</label><select class="form-select" v-model.number="form.port" :disabled="!isAdmin"><option :value="993">993 (SSL, khuyến nghị)</option><option :value="143">143</option></select></div>
            <div class="col-md-3 d-flex align-items-end"><div class="form-check form-switch"><input id="ssl" class="form-check-input" type="checkbox" v-model="form.secure" :disabled="!isAdmin" /><label for="ssl" class="form-check-label">Dùng SSL</label></div></div>
            <div class="col-md-6"><label>Email hộp thư</label><input class="form-control" type="email" v-model="form.user" :disabled="!isAdmin" placeholder="tuyendung@congty.com" /></div>
            <div class="col-md-6"><label>Mật khẩu ứng dụng</label><input class="form-control" type="password" v-model="form.password" :disabled="!isAdmin" autocomplete="new-password" :placeholder="config && config.hasPassword ? '•••••••• (đã lưu, để trống nếu không đổi)' : 'Mật khẩu ứng dụng'" /></div>
            <div class="col-md-4"><label>Thư mục</label><input class="form-control" v-model="form.folder" :disabled="!isAdmin" placeholder="INBOX" /></div>
            <div class="col-md-8"><label>Chỉ nhận email có từ khóa <small class="text-muted">(ở tiêu đề hoặc tên file; cách nhau bằng dấu phẩy; để trống = nhận mọi email có PDF)</small></label><input class="form-control" v-model="form.subjectKeywords" :disabled="!isAdmin" placeholder="ứng tuyển, cv, resume" /></div>
            <div class="col-md-4"><label>Lần quét đầu lấy email trong</label><select class="form-select" v-model.number="form.sinceDays" :disabled="!isAdmin"><option v-for="d in [3, 7, 14, 30, 60, 90]" :key="d" :value="d">{{ d }} ngày gần nhất</option></select></div>
            <div class="col-md-4"><label>Tự động quét mỗi</label><select class="form-select" v-model.number="form.intervalMinutes" :disabled="!isAdmin"><option v-for="o in intervals" :key="o.value" :value="o.value">{{ o.label }}</option></select></div>
            <div class="col-md-4 d-flex align-items-end"><div class="form-check form-switch"><input id="en" class="form-check-input" type="checkbox" v-model="form.enabled" :disabled="!isAdmin" /><label for="en" class="form-check-label">Bật tự động quét</label></div></div>
            <div class="col-12">
              <div class="form-check form-switch">
                <input id="aa" class="form-check-input" type="checkbox" v-model="form.autoApprove" :disabled="!isAdmin" />
                <label for="aa" class="form-check-label"><b>Tự động nhập CV vào hệ thống</b> (không cần duyệt tay)</label>
              </div>
              <small class="text-muted d-block mt-1 mb-3">
                Chỉ CV đọc được chữ, có họ tên và SĐT/email thật, chưa có trong hệ thống mới được nhập tự động. CV scan, thiếu thông tin liên hệ hoặc trùng ứng viên cũ vẫn nằm ở tab "Chờ duyệt". Dữ liệu do AI trích xuất có thể sai, nên bạn nên kiểm tra lại ở tab "Đã duyệt".
              </small>
              <div class="form-check form-switch">
                <input id="ap" class="form-check-input" type="checkbox" v-model="form.appendToSheet" :disabled="!isAdmin" />
                <label for="ap" class="form-check-label">Khi nhập CV (duyệt tay hoặc tự động), ghi thêm một dòng vào Google Sheet đã liên kết</label>
              </div>
              <small class="text-muted d-block mt-1">
                <template v-if="sheetLinked">Cần chia sẻ Sheet cho Service Account với quyền <b>Chỉnh sửa (Editor)</b> thay vì chỉ Người xem. Dòng đã có trên Sheet sẽ không bị ghi trùng.</template>
                <template v-else>Chưa liên kết Google Sheet (xem mục "Đồng bộ Google Sheet"). Khi chưa liên kết, bước này được bỏ qua.</template>
              </small>
            </div>
          </div>
          <div v-if="message" class="ui-notice mt-3 mb-0" :class="messageType"><i class="fas fa-info-circle"></i><div>{{ message }}</div></div>
          <div v-if="isAdmin" class="mt-3 d-flex gap-2 flex-wrap">
            <button class="btn btn-primary" :disabled="saving || !encryptionConfigured" @click="save"><span v-if="saving" class="ui-spin me-2"></span>Kiểm tra kết nối &amp; lưu</button>
            <button v-if="config" class="btn btn-outline-secondary" :disabled="testing" @click="testNow"><span v-if="testing" class="ui-spin me-2"></span>Thử kết nối</button>
            <button v-if="config" class="btn btn-outline-secondary text-danger" @click="disconnect">Ngắt kết nối</button>
          </div>
          <small v-else class="text-muted d-block mt-3">Chỉ quản trị viên (admin) được thay đổi cấu hình hộp thư.</small>
        </div>

        <details class="ui-card help">
          <summary><b>Hướng dẫn tạo mật khẩu ứng dụng Gmail</b></summary>
          <ol class="steps mt-3">
            <li>Bật <b>Xác minh 2 bước</b> cho tài khoản Google của hộp thư tuyển dụng.</li>
            <li>Vào <b>myaccount.google.com → Bảo mật → Mật khẩu ứng dụng</b>, tạo mật khẩu mới (đặt tên "HRM") và sao chép chuỗi 16 ký tự.</li>
            <li>Trong Gmail: <b>Cài đặt → Chuyển tiếp và POP/IMAP → Bật IMAP</b>.</li>
            <li>Điền ở trên: máy chủ <code>imap.gmail.com</code>, cổng 993, email hộp thư và mật khẩu ứng dụng vừa tạo. Outlook/Microsoft 365 dùng <code>outlook.office365.com</code>.</li>
          </ol>
        </details>

        <div v-if="config && config.history && config.history.length" class="ui-card" style="padding: 0; overflow: hidden">
          <h5 class="p-3 pb-0"><i class="fas fa-clipboard-list"></i> Lịch sử quét (20 lần gần nhất)</h5>
          <div class="table-responsive">
            <table class="table mb-0">
              <thead><tr><th>Thời gian</th><th>Kiểu</th><th>Kết quả</th><th>Đã xem</th><th>Vào hàng chờ</th><th>Trùng</th><th>Không phải CV</th><th>Bỏ qua</th></tr></thead>
              <tbody>
                <tr v-for="(h, i) in config.history" :key="i">
                  <td class="nowrap">{{ formatDate(h.at) }}</td>
                  <td>{{ h.trigger === "schedule" ? "Tự động" : "Thủ công" }}</td>
                  <td><span v-if="h.ok" class="ui-pill shortlist">Thành công</span><span v-else class="ui-pill reject">Lỗi</span><small v-if="!h.ok" class="text-muted d-block">{{ h.error }}</small></td>
                  <td>{{ h.stats ? h.stats.scanned : "—" }}</td>
                  <td><b>{{ h.stats ? h.stats.queued : "—" }}</b></td>
                  <td>{{ h.stats ? h.stats.duplicatesSkipped : "—" }}</td>
                  <td>{{ h.stats ? h.stats.notCv : "—" }}</td>
                  <td>{{ h.stats ? h.stats.skipped + h.stats.failed : "—" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <!-- Hộp thoại duyệt -->
      <b-modal centered size="lg" title="Duyệt CV và thêm vào hệ thống" v-model="showApprove" @ok="submitApprove" ok-title="Duyệt & thêm" cancel-title="Hủy" :ok-disabled="approving">
        <template v-if="current">
          <div v-if="current.flags.includes('duplicate')" class="ui-notice warn">
            <i class="fas fa-exclamation-triangle"></i>
            <div>Ứng viên này đã có trong hệ thống (<b>{{ current.duplicateOf && current.duplicateOf.name }}</b>). Duyệt sẽ <b>bổ sung các ô còn trống</b> và đính kèm CV, không ghi đè dữ liệu đã nhập.</div>
          </div>
          <div class="row g-3">
            <div class="col-md-6"><label>Họ và tên <b class="req">*</b></label><input class="form-control" v-model="edit.name" /></div>
            <div class="col-md-6"><label>Vị trí ứng tuyển</label><input class="form-control" list="mailcv-jobs" v-model="edit.job" placeholder="Chọn hoặc nhập" /><datalist id="mailcv-jobs"><option v-for="j in jobs" :key="j" :value="j"></option></datalist></div>
            <div class="col-md-6"><label>SĐT</label><input class="form-control" v-model="edit.phone" /></div>
            <div class="col-md-6"><label>Email</label><input class="form-control" v-model="edit.email" /></div>
            <div class="col-md-4"><label>Năm sinh</label><input class="form-control" v-model="edit.birthYear" /></div>
            <div class="col-md-4"><label>Trình độ</label><input class="form-control" v-model="edit.academicLevel" /></div>
            <div class="col-md-4"><label>Chuyên ngành</label><input class="form-control" v-model="edit.specialized" /></div>
          </div>
          <small class="text-muted d-block mt-3">Cần có họ tên và SĐT hoặc email. Hãy đối chiếu với file CV trước khi duyệt, vì thông tin do AI trích xuất có thể chưa chính xác.</small>
          <div v-if="approveError" class="text-danger small mt-2">{{ approveError }}</div>
        </template>
      </b-modal>

      <b-modal centered title="Bỏ qua CV này?" v-model="showReject" @ok="doReject" ok-title="Bỏ qua" ok-variant="danger" cancel-title="Hủy">
        <p>File CV và thông tin đã trích xuất sẽ bị <b>xóa</b>. Hệ thống chỉ giữ lại người gửi, tiêu đề và thời gian.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  getMailConfig, saveMailConfig, testMailConfig, deleteMailConfig, runMailIngest,
  listMailCvs, approveMailCv, rejectMailCv, retryMailCvSheet,
} from "@/services/mailcv-service";
import { openCvFile } from "@/services/ai-service";
import { useJobNames } from "@/composables/useJobNames";
import { useAuthStore } from "@/stores/auth";
import { avatarColor, initials } from "@/utils/avatar";
import { localDateTime as formatDate } from "@/utils/format";

const intervals = [
  { value: 5, label: "5 phút" }, { value: 10, label: "10 phút" }, { value: 15, label: "15 phút" },
  { value: 30, label: "30 phút" }, { value: 60, label: "1 giờ" }, { value: 360, label: "6 giờ" },
];
const emptyForm = () => ({ host: "", port: 993, secure: true, user: "", password: "", folder: "INBOX", subjectKeywords: "", sinceDays: 14, intervalMinutes: 10, enabled: false, appendToSheet: true, autoApprove: false });

const auth = useAuthStore();
const isAdmin = computed(() => auth.role === "admin");
const canRun = computed(() => ["admin", "hr"].includes(auth.role));

const tab = ref("pending");
const loading = ref(true);
const config = ref(null);
const encryptionConfigured = ref(true);
const aiConfigured = ref(true);
const sheetLinked = ref(false);
const pendingCount = ref(0);
const items = ref([]);
const jobs = useJobNames();
const form = ref(emptyForm());
const saving = ref(false);
const testing = ref(false);
const running = ref(false);
const message = ref("");
const messageType = ref("info");
const toast = ref(null);
const showApprove = ref(false);
const showReject = ref(false);
const approving = ref(false);
const approveError = ref("");
const current = ref(null);
const edit = ref({});

// Thông báo trong khung cài đặt
function notify(text, type = "info") {
  message.value = text;
  messageType.value = type;
}
// Thông báo nổi, tự ẩn sau 8 giây
function flash(text, type = "info") {
  toast.value = { text, type };
  setTimeout(() => (toast.value = null), 8000);
}

async function loadConfig() {
  const res = await getMailConfig();
  if (!res.ok) return;
  const d = res.data;
  encryptionConfigured.value = d.encryptionConfigured;
  aiConfigured.value = d.aiConfigured;
  sheetLinked.value = d.sheetLinked;
  pendingCount.value = d.pendingCount;
  config.value = d.config;
  if (d.config) form.value = { ...d.config, password: "", subjectKeywords: (d.config.subjectKeywords || []).join(", ") };
}

async function loadItems() {
  if (tab.value === "settings") return;
  const res = await listMailCvs(tab.value);
  items.value = res.ok ? res.data : [];
}

async function setTab(value) {
  tab.value = value;
  message.value = "";
  loading.value = true;
  await loadItems();
  loading.value = false;
}

async function save() {
  saving.value = true;
  message.value = "";
  const res = await saveMailConfig({ ...form.value });
  if (res.ok) {
    await loadConfig();
    notify("Đã kiểm tra kết nối và lưu cấu hình.");
  } else {
    notify(res.error, "error");
  }
  saving.value = false;
}

async function testNow() {
  testing.value = true;
  const res = await testMailConfig();
  notify(res.ok ? `Kết nối thành công. Thư mục "${res.data.folder}" có ${res.data.exists} email.` : res.error, res.ok ? "info" : "error");
  testing.value = false;
}

async function runNow() {
  running.value = true;
  const res = await runMailIngest();
  if (res.ok) {
    const s = res.data.stats;
    const auto = s.autoApproved ? `, ${s.autoApproved} CV tự nhập vào hệ thống` : "";
    flash(`Đã quét ${s.scanned} email: ${s.queued} CV mới vào hàng chờ${auto}, ${s.duplicatesSkipped} trùng, ${s.notCv} không phải CV.`);
  } else {
    flash(res.error, "error");
  }
  running.value = false;
  await loadConfig();
  await loadItems();
}

async function disconnect() {
  if (!window.confirm("Ngắt kết nối hộp thư? Mật khẩu sẽ bị xóa. Hàng chờ và ứng viên đã nhận vẫn được giữ.")) return;
  const res = await deleteMailConfig();
  if (res.ok) {
    config.value = null;
    notify("Đã ngắt kết nối và xóa mật khẩu.");
  } else {
    notify(res.error, "error");
  }
}

async function viewFile(it) {
  try {
    await openCvFile(it.cvFileId);
  } catch {
    flash("Không mở được file CV.", "error");
  }
}

function openApprove(it) {
  current.value = it;
  approveError.value = "";
  const p = it.prefill || {};
  edit.value = { name: p.name || "", phone: p.phone || "", email: p.email || "", birthYear: p.birthYear || "", academicLevel: p.academicLevel || "", specialized: p.specialized || "", job: "" };
  showApprove.value = true;
}

// Giữ hộp thoại mở nếu lỗi để người dùng sửa
async function submitApprove(event) {
  event.preventDefault();
  approving.value = true;
  approveError.value = "";
  const { job, ...prefill } = edit.value;
  const res = await approveMailCv(current.value._id, { job, prefill });
  if (res.ok) {
    showApprove.value = false;
    const sheet = res.data.item.sheet || {};
    const sheetText = sheet.appended ? " Đã ghi thêm một dòng vào Google Sheet." : sheet.skipped === "exists" ? " Google Sheet đã có dòng này." : sheet.error ? ` Chưa ghi được vào Google Sheet: ${sheet.error}` : "";
    flash((res.data.updatedExisting ? "Đã bổ sung thông tin cho ứng viên có sẵn." : "Đã thêm ứng viên mới vào Employees CV.") + sheetText, sheet.error ? "warn" : "info");
    await loadConfig();
    await loadItems();
  } else {
    approveError.value = res.error;
  }
  approving.value = false;
}

function confirmReject(it) {
  current.value = it;
  showReject.value = true;
}

async function doReject() {
  const res = await rejectMailCv(current.value._id);
  flash(res.ok ? "Đã bỏ qua CV và xóa file." : res.error, res.ok ? "info" : "error");
  await loadConfig();
  await loadItems();
}

async function retrySheet(it) {
  const res = await retryMailCvSheet(it._id);
  flash(res.ok ? "Đã thử ghi lại vào Google Sheet." : res.error, res.ok ? "info" : "error");
  await loadItems();
}

onMounted(async () => {
  await loadConfig();
  if (!config.value) tab.value = isAdmin.value ? "settings" : "pending";
  await loadItems();
  loading.value = false;
});
</script>

<style scoped>
.count { background: var(--c-primary); color: #fff; border-radius: 999px; padding: 1px 8px; font-size: 12px; margin-left: 6px; }
.cv-card { display: flex; gap: 16px; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; }
.cv-main { display: flex; gap: 14px; flex: 1 1 520px; min-width: 0; }
.cv-main .grow { min-width: 0; }
.nm { font-size: 16px; font-weight: 700; }
.nm.link, .link { color: var(--c-primary); cursor: pointer; }
.contact { display: flex; flex-wrap: wrap; gap: 2px 16px; color: var(--c-muted); font-size: 13px; margin-top: 2px; }
.contact i { margin-right: 6px; font-size: 11px; opacity: 0.75; }
.meta { color: var(--c-muted); font-size: 12.5px; }
.meta i { margin-right: 6px; }
.cv-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.nowrap { white-space: nowrap; }
.req { color: var(--c-danger); }
.steps { padding-left: 20px; margin-bottom: 8px; }
.steps li { margin-bottom: 10px; }
code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
.help summary { cursor: pointer; }
label { display: block; margin-bottom: 6px; }
</style>
