<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Đồng bộ Google Sheet</h2>
          <p>Tự động đưa dữ liệu ứng viên từ Google Sheet vào <b>Employees CV</b>. Dashboard và Report cập nhật theo.</p>
        </div>
        <button v-if="config" class="btn btn-outline-secondary" :disabled="loading" @click="load"><i class="fas fa-sync-alt me-1"></i>Làm mới</button>
      </div>

      <div v-if="loading && !loaded" class="ui-card ui-empty"><span class="ui-spin"></span></div>

      <template v-else>
        <div v-if="!serverConfigured" class="ui-notice error">
          <i class="fas fa-exclamation-triangle"></i>
          <div>Máy chủ chưa được cấu hình Service Account Google (biến <code>GOOGLE_SERVICE_ACCOUNT_JSON</code>). Hãy nhờ người quản trị hệ thống cấu hình trước khi dùng tính năng này.</div>
        </div>

        <div class="ui-notice info">
          <i class="fas fa-info-circle"></i>
          <div>
            <b>Cách hoạt động:</b> Google Sheet là nguồn chính (một chiều, hệ thống chỉ <b>đọc</b>, không sửa Sheet).
            Ứng viên được nhận diện theo <b>SĐT</b> (hoặc email). Dòng mới thì thêm, dòng có sẵn thì cập nhật.
            Ô trống trên Sheet <b>không xóa</b> dữ liệu hiện có, và dòng bị xóa khỏi Sheet <b>không</b> xóa ứng viên.
            Dòng đầu tiên của tab phải là tiêu đề cột (ví dụ: Họ và tên, SĐT, Địa chỉ mail, Nguồn, Job…).
          </div>
        </div>

        <!-- ========== 1. Kết nối ========== -->
        <div class="ui-card">
          <h5><i class="fas fa-link"></i> 1. Kết nối Google Sheet</h5>
          <div class="row g-3">
            <div class="col-lg-6">
              <label>Link hoặc ID Google Sheet</label>
              <input class="form-control" v-model="form.spreadsheet" :disabled="!isAdmin" placeholder="https://docs.google.com/spreadsheets/d/..." />
            </div>
            <div class="col-lg-3">
              <label>Tên tab chứa dữ liệu</label>
              <input class="form-control" v-model="form.sheetName" :disabled="!isAdmin" placeholder="Kho CV" />
            </div>
            <div class="col-lg-3">
              <label>Tự động đồng bộ mỗi</label>
              <select class="form-select" v-model.number="form.intervalMinutes" :disabled="!isAdmin">
                <option v-for="o in intervals" :key="o.value" :value="o.value">{{ o.label }}</option>
              </select>
            </div>
          </div>
          <div class="form-check form-switch mt-3">
            <input id="auto" class="form-check-input" type="checkbox" v-model="form.enabled" :disabled="!isAdmin || !verified" />
            <label for="auto" class="form-check-label">Bật tự động đồng bộ <small v-if="!verified" class="text-muted">(cần xác minh Sheet ở bước 2 trước)</small></label>
          </div>
          <div v-if="message" class="ui-notice mt-3 mb-0" :class="messageType"><i class="fas fa-info-circle"></i><div>{{ message }}</div></div>
          <div v-if="isAdmin" class="mt-3 d-flex gap-2 flex-wrap">
            <button class="btn btn-primary" :disabled="saving || !serverConfigured" @click="save"><span v-if="saving" class="ui-spin me-2"></span>Lưu kết nối</button>
            <button v-if="config" class="btn btn-outline-secondary text-danger" @click="disconnect">Ngắt kết nối</button>
          </div>
          <small v-else class="text-muted d-block mt-3">Chỉ quản trị viên (admin) được thay đổi kết nối.</small>
        </div>

        <!-- ========== 2. Xác minh ========== -->
        <div v-if="config && !verified" class="ui-card">
          <h5><i class="fas fa-shield-alt"></i> 2. Xác minh quyền sở hữu Sheet</h5>
          <ol class="steps">
            <li>
              Chia sẻ Google Sheet cho email dưới đây với quyền <b>Người xem (Viewer)</b>:
              <div class="copy"><code>{{ serviceAccountEmail || "(chưa cấu hình)" }}</code><button class="btn btn-sm btn-outline-secondary" @click="copy(serviceAccountEmail)">Sao chép</button></div>
            </li>
            <li>
              Tạo thêm một tab tên <code>HRM_SYNC</code>, rồi dán mã sau vào ô <b>A1</b>:
              <div class="copy"><code>{{ config.verifyCode }}</code><button class="btn btn-sm btn-outline-secondary" @click="copy(config.verifyCode)">Sao chép</button></div>
              <small class="text-muted">Bước này chứng minh bạn là chủ của Sheet, để công ty khác không thể đọc dữ liệu của bạn.</small>
            </li>
            <li>Bấm nút bên dưới.</li>
          </ol>
          <button v-if="isAdmin" class="btn btn-primary" :disabled="verifying" @click="verify"><span v-if="verifying" class="ui-spin me-2"></span><i v-else class="fas fa-check-circle me-1"></i>Kiểm tra &amp; xác minh</button>
          <div v-if="verifyError" class="ui-notice error mt-3 mb-0"><i class="fas fa-exclamation-triangle"></i><div>{{ verifyError }}</div></div>
        </div>

        <!-- ========== 3. Đồng bộ ========== -->
        <div v-if="config && verified" class="ui-card">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
            <h5 class="mb-0"><i class="fas fa-sync-alt"></i> 2. Đồng bộ dữ liệu</h5>
            <span class="ui-pill" :class="config.enabled ? 'shortlist' : 'pending'">{{ config.enabled ? `Tự động mỗi ${intervalLabel}` : "Tự động: tắt" }}</span>
          </div>
          <p class="text-muted mb-3">
            Lần chạy gần nhất: <b>{{ config.lastRunAt ? formatDate(config.lastRunAt) : "chưa có" }}</b>
            <span v-if="config.running" class="ms-2"><span class="ui-spin"></span> đang chạy…</span>
          </p>
          <div v-if="canRun" class="d-flex gap-2 flex-wrap">
            <button class="btn btn-outline-secondary" :disabled="previewing || running" @click="preview"><span v-if="previewing" class="ui-spin me-2"></span><i v-else class="fas fa-search me-1"></i>Xem trước (không ghi dữ liệu)</button>
            <button class="btn btn-primary" :disabled="running || previewing" @click="runNow"><span v-if="running" class="ui-spin me-2"></span><i v-else class="fas fa-bolt me-1"></i>Đồng bộ ngay</button>
          </div>
          <small v-else class="text-muted">Vai trò của bạn chỉ được xem.</small>

          <div v-if="runError" class="ui-notice error mt-3 mb-0"><i class="fas fa-exclamation-triangle"></i><div>{{ runError }}</div></div>

          <div v-if="result" class="mt-3">
            <h6 class="result-title">{{ result.kind === "preview" ? "Kết quả xem trước" : "Kết quả đồng bộ" }}</h6>
            <div v-if="result.stats" class="stat-grid">
              <div class="stat ok"><b>{{ result.kind === "preview" ? result.stats.toAdd : result.stats.added }}</b><span>Thêm mới</span></div>
              <div class="stat"><b>{{ result.kind === "preview" ? result.stats.toUpdate : result.stats.updated }}</b><span>Cập nhật</span></div>
              <div class="stat muted"><b>{{ result.stats.unchanged }}</b><span>Không đổi</span></div>
              <div class="stat warn"><b>{{ result.stats.skippedNoKey }}</b><span>Bỏ qua (thiếu SĐT và email)</span></div>
              <div class="stat warn"><b>{{ result.stats.duplicatesInSheet }}</b><span>Trùng trong Sheet</span></div>
              <div class="stat danger"><b>{{ result.stats.conflicts }}</b><span>Sẽ ghi đè chỉnh sửa tay</span></div>
              <div v-if="result.stats.errors" class="stat danger"><b>{{ result.stats.errors }}</b><span>Dòng lỗi</span></div>
            </div>
            <div v-if="result.stats && result.stats.conflicts" class="ui-notice warn mt-3">
              <i class="fas fa-exclamation-triangle"></i>
              <div>{{ result.stats.conflicts }} ứng viên đã được sửa tay trên web khác với Sheet. Vì Sheet là nguồn chính nên các giá trị đó {{ result.kind === "preview" ? "sẽ bị" : "đã bị" }} ghi đè. Hãy sửa trên Google Sheet thay vì sửa trên web.</div>
            </div>
            <div v-if="result.kind === 'preview'" class="mt-3">
              <div class="mb-2"><b>Cột được nhận diện ({{ result.recognized.length }}):</b></div>
              <span v-for="h in result.recognized" :key="h" class="ui-chip ok">{{ h }}</span>
              <div v-if="result.unrecognized.length" class="mt-2 mb-2"><b>Cột bị bỏ qua ({{ result.unrecognized.length }}):</b> <small class="text-muted">không khớp tên cột nào của hệ thống</small></div>
              <span v-for="h in result.unrecognized" :key="h" class="ui-chip miss">{{ h }}</span>
            </div>
          </div>
        </div>

        <!-- ========== Lịch sử ========== -->
        <div v-if="config && config.history && config.history.length" class="ui-card" style="padding: 0; overflow: hidden">
          <h5 class="p-3 pb-0"><i class="fas fa-clipboard-list"></i> Lịch sử đồng bộ (20 lần gần nhất)</h5>
          <div class="table-responsive">
            <table class="table mb-0">
              <thead><tr><th>Thời gian</th><th>Kiểu</th><th>Kết quả</th><th>Thêm</th><th>Cập nhật</th><th>Xung đột</th><th>Thời lượng</th></tr></thead>
              <tbody>
                <tr v-for="(h, i) in config.history" :key="i">
                  <td>{{ formatDate(h.at) }}</td>
                  <td>{{ h.trigger === "schedule" ? "Tự động" : "Thủ công" }}</td>
                  <td>
                    <span v-if="h.ok" class="ui-pill shortlist">Thành công</span>
                    <span v-else class="ui-pill reject" :title="h.error">Lỗi</span>
                    <small v-if="!h.ok" class="text-muted d-block">{{ h.error }}</small>
                  </td>
                  <td>{{ h.stats ? h.stats.added : "—" }}</td>
                  <td>{{ h.stats ? h.stats.updated : "—" }}</td>
                  <td>{{ h.stats ? h.stats.conflicts : "—" }}</td>
                  <td>{{ h.durationMs != null ? (h.durationMs / 1000).toFixed(1) + " giây" : "" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ========== Hướng dẫn tạo Service Account ========== -->
        <details class="ui-card help">
          <summary><b>Dành cho quản trị hệ thống:</b> tạo Service Account Google (làm một lần)</summary>
          <ol class="steps mt-3">
            <li>Vào <b>Google Cloud Console</b>, tạo (hoặc chọn) một project, bật <b>Google Sheets API</b>.</li>
            <li>Vào <b>IAM &amp; Admin → Service Accounts</b>, tạo Service Account, rồi tạo <b>khóa JSON</b> và tải về.</li>
            <li>Đặt toàn bộ nội dung file JSON vào biến môi trường <code>GOOGLE_SERVICE_ACCOUNT_JSON</code> của backend (hoặc mã base64 của file), rồi khởi động lại backend.</li>
            <li>Mỗi công ty tự chia sẻ Google Sheet của mình cho email của Service Account (quyền <b>Người xem</b>) và xác minh ở bước 2.</li>
          </ol>
          <small class="text-muted">Không bao giờ commit file JSON này vào git.</small>
        </details>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getSheetSync, saveSheetSync, verifySheetSync, previewSheetSync, runSheetSync, disconnectSheetSync } from "@/services/sync-service";
import { useAuthStore } from "@/stores/auth";
import { copyText, localDateTime as formatDate } from "@/utils/format";

const intervals = [
  { value: 5, label: "5 phút" },
  { value: 15, label: "15 phút" },
  { value: 30, label: "30 phút" },
  { value: 60, label: "1 giờ" },
  { value: 360, label: "6 giờ" },
  { value: 1440, label: "24 giờ" },
];
const emptyForm = () => ({ spreadsheet: "", sheetName: "", intervalMinutes: 15, enabled: false });

const auth = useAuthStore();
const isAdmin = computed(() => auth.role === "admin");
const canRun = computed(() => ["admin", "hr"].includes(auth.role));

const loaded = ref(false);
const loading = ref(true);
const serverConfigured = ref(true);
const serviceAccountEmail = ref("");
const config = ref(null);
const form = ref(emptyForm());
const saving = ref(false);
const verifying = ref(false);
const previewing = ref(false);
const running = ref(false);
const message = ref("");
const messageType = ref("info");
const verifyError = ref("");
const runError = ref("");
const result = ref(null);

const verified = computed(() => !!(config.value && config.value.verified));
const intervalLabel = computed(() => {
  const minutes = config.value && config.value.intervalMinutes;
  const o = intervals.find((i) => i.value === minutes);
  return o ? o.label : `${minutes} phút`;
});

function notify(text, type = "info") {
  message.value = text;
  messageType.value = type;
}

function setConfig(value) {
  config.value = value || null;
  if (value) {
    form.value = { spreadsheet: value.spreadsheetId, sheetName: value.sheetName, intervalMinutes: value.intervalMinutes, enabled: value.enabled };
  }
}

async function load() {
  loading.value = true;
  const res = await getSheetSync();
  if (res.ok) {
    serverConfigured.value = res.data.serverConfigured;
    serviceAccountEmail.value = res.data.serviceAccountEmail || "";
    setConfig(res.data.config);
  } else {
    notify(res.error, "error");
  }
  loading.value = false;
  loaded.value = true;
}

async function save() {
  saving.value = true;
  message.value = "";
  const res = await saveSheetSync({ ...form.value });
  if (res.ok) {
    setConfig(res.data);
    notify(verified.value ? "Đã lưu kết nối." : "Đã lưu. Hãy hoàn tất bước 2 để xác minh Sheet.");
  } else {
    notify(res.error, "error");
  }
  saving.value = false;
}

async function verify() {
  verifying.value = true;
  verifyError.value = "";
  const res = await verifySheetSync();
  if (res.ok) {
    setConfig(res.data);
    notify("Xác minh thành công. Bạn có thể xem trước và đồng bộ.");
  } else {
    verifyError.value = res.error;
  }
  verifying.value = false;
}

async function preview() {
  previewing.value = true;
  runError.value = "";
  result.value = null;
  const res = await previewSheetSync();
  if (res.ok) result.value = { kind: "preview", ...res.data };
  else runError.value = res.error;
  previewing.value = false;
}

async function runNow() {
  running.value = true;
  runError.value = "";
  result.value = null;
  const res = await runSheetSync();
  if (res.ok) result.value = { kind: "run", stats: res.data.stats };
  else runError.value = res.error;
  running.value = false;
  await load();
}

async function disconnect() {
  if (!window.confirm("Ngắt kết nối Google Sheet? Ứng viên đã đồng bộ vẫn được giữ nguyên.")) return;
  const res = await disconnectSheetSync();
  if (res.ok) {
    config.value = null;
    result.value = null;
    form.value = emptyForm();
    notify("Đã ngắt kết nối.");
  } else {
    notify(res.error, "error");
  }
}

function copy(text) {
  if (text) copyText(text).catch(() => {});
}

onMounted(load);
</script>

<style scoped>
.steps { padding-left: 20px; margin-bottom: 16px; }
.steps li { margin-bottom: 12px; }
.copy { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }
.copy code, .steps code { background: #f3f4f6; padding: 3px 8px; border-radius: 6px; word-break: break-all; }
.result-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--c-muted); margin-bottom: 10px; }
.stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.stat { border: 1px solid var(--c-border); border-radius: 12px; padding: 12px; background: #f9fafb; }
.stat b { display: block; font-size: 26px; line-height: 1.1; }
.stat span { color: var(--c-muted); font-size: 12.5px; }
.stat.ok b { color: var(--c-success); }
.stat.warn b { color: var(--c-warning); }
.stat.danger b { color: var(--c-danger); }
.stat.muted b { color: var(--c-muted); }
.help summary { cursor: pointer; }
</style>
