<template>
  <form ref="formEl" class="emp-form" novalidate @submit.prevent="submit">
    <!-- ========== Thông tin cơ bản ========== -->
    <section class="ui-card">
      <h5><i class="fas fa-id-card"></i> Thông tin cơ bản</h5>
      <div class="emp-grid">
        <div class="field">
          <label>Nguồn</label>
          <input class="form-control" v-model="form.source" placeholder="Facebook, TopCV, Refer..." />
        </div>
        <div class="field">
          <label>Ngày về/nhập CV</label>
          <input class="form-control" type="date" :value="toIso(form.cvDate)" @input="setDate('cvDate', $event.target.value)" />
          <small v-if="legacyText('cvDate')" class="hint">Giá trị cũ: {{ form.cvDate }}</small>
        </div>
        <div class="field">
          <label>Job</label>
          <input class="form-control" list="emp-form-jobs" v-model="form.job" placeholder="Vị trí ứng tuyển" />
          <datalist id="emp-form-jobs">
            <option v-for="j in jobs" :key="j" :value="j"></option>
          </datalist>
        </div>
        <div class="field" :class="{ invalid: errors.name }">
          <label>Họ và tên <b class="req">*</b></label>
          <input class="form-control" v-model="form.name" placeholder="Nguyễn Văn A" />
          <small v-if="errors.name" class="err">{{ errors.name }}</small>
        </div>
        <div class="field" :class="{ invalid: errors.birthYear }">
          <label>Năm sinh</label>
          <input class="form-control" v-model="form.birthYear" inputmode="numeric" placeholder="1998" />
          <small v-if="errors.birthYear" class="err">{{ errors.birthYear }}</small>
        </div>
        <div class="field">
          <label>Trình độ học vấn</label>
          <input class="form-control" v-model="form.academicLevel" placeholder="Đại học, Cao đẳng..." />
        </div>
        <div class="field">
          <label>Chuyên ngành</label>
          <input class="form-control" v-model="form.specialized" />
        </div>
        <div class="field" :class="{ invalid: errors.phone }">
          <label>Số điện thoại <b class="req">*</b></label>
          <input class="form-control" v-model="form.phone" inputmode="tel" placeholder="0901234567" />
          <small v-if="errors.phone" class="err">{{ errors.phone }}</small>
        </div>
        <div class="field" :class="{ invalid: errors.email }">
          <label>Địa chỉ mail</label>
          <input class="form-control" type="email" v-model="form.email" placeholder="ten@congty.com" />
          <small v-if="errors.email" class="err">{{ errors.email }}</small>
        </div>
        <div class="field" v-for="link in linkFields" :key="link.key" :class="{ invalid: errors[link.key] }">
          <label>{{ link.label }}</label>
          <input class="form-control" v-model="form[link.key]" placeholder="https://..." />
          <small v-if="errors[link.key]" class="err">{{ errors[link.key] }}</small>
        </div>
      </div>
    </section>

    <!-- ========== Quá trình tuyển dụng ========== -->
    <section class="ui-card">
      <h5><i class="fas fa-route"></i> Quá trình tuyển dụng</h5>
      <div class="emp-grid">
        <div class="field wide">
          <label>Đơn vị UV từng làm</label>
          <textarea class="form-control" rows="3" v-model="form.companyUV"></textarea>
        </div>
        <div class="field wide">
          <label>HR suggest</label>
          <textarea class="form-control" rows="3" v-model="form.hrSuggest"></textarea>
        </div>
        <div class="field" v-for="s in processSelects" :key="s.key">
          <label>{{ s.label }}</label>
          <select class="form-select" v-model="form[s.key]">
            <option value="">— Chọn —</option>
            <option v-for="o in options[s.options]" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
        <div class="field wide">
          <label>Notes</label>
          <input class="form-control" v-model="form.notes" />
        </div>
      </div>
    </section>

    <!-- ========== Offer & thử việc ========== -->
    <section class="ui-card">
      <h5><i class="fas fa-handshake"></i> Offer &amp; thử việc</h5>
      <div class="emp-grid">
        <div class="field" v-for="s in offerSelects" :key="s.key">
          <label>{{ s.label }}</label>
          <select class="form-select" v-model="form[s.key]">
            <option value="">— Chọn —</option>
            <option v-for="o in options[s.options]" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
        <div class="field">
          <label>Ngày đi làm</label>
          <input class="form-control" type="date" :value="toIso(form.onboardDate)" @input="setDate('onboardDate', $event.target.value)" />
          <small v-if="legacyText('onboardDate')" class="hint">Giá trị cũ: {{ form.onboardDate }}</small>
        </div>
        <div class="field wide">
          <label>Notes (offer)</label>
          <input class="form-control" v-model="form.notes2" />
        </div>
        <div class="field wide">
          <label>Note (thử việc)</label>
          <input class="form-control" v-model="form.notes3" />
        </div>
      </div>
    </section>

    <div v-if="submitError" class="ui-notice error"><i class="fas fa-exclamation-triangle"></i><div>{{ submitError }}</div></div>

    <div class="emp-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading" class="ui-spin me-2"></span>{{ submitLabel }}
      </button>
      <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">Hủy</button>
    </div>
  </form>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { useJobNames } from "@/composables/useJobNames";

// Chỉ các trường này được gửi lên server (không đụng tới hồ sơ AI / file CV đã lưu)
const EMPLOYEE_FIELDS = [
  "source", "cvDate", "job", "name", "birthYear", "academicLevel", "specialized", "phone", "email",
  "linkCV", "linkSP", "linkFB", "companyUV", "hrSuggest", "hrMark", "partMark", "round1", "joinRound1",
  "interviewV1", "notes", "round2", "joinRound2", "interviewV2", "offer", "offerResult", "notes2",
  "goWork", "onboardDate", "probationTime", "probationResult", "notes3",
];

const DMY = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  loading: Boolean,
  submitLabel: { type: String, default: "Lưu" },
  submitError: { type: String, default: "" },
});
const emit = defineEmits(["submit", "cancel"]);

const linkFields = [
  { key: "linkCV", label: "Link CV" },
  { key: "linkSP", label: "Link SP" },
  { key: "linkFB", label: "Link FB" },
];
const processSelects = [
  { key: "hrMark", label: "HR chấm", options: "mark" },
  { key: "partMark", label: "Bộ phận chấm", options: "mark" },
  { key: "round1", label: "Vòng 1", options: "round1" },
  { key: "joinRound1", label: "Tham gia Vòng 1", options: "join" },
  { key: "interviewV1", label: "Kết quả PV V1", options: "mark" },
  { key: "round2", label: "Vòng 2", options: "round2" },
  { key: "joinRound2", label: "Tham gia Vòng 2", options: "join" },
  { key: "interviewV2", label: "Kết quả PV V2", options: "mark" },
];
const offerSelects = [
  { key: "offer", label: "OFFER", options: "offer" },
  { key: "offerResult", label: "Kết quả offer", options: "offerResult" },
  { key: "goWork", label: "ĐI LÀM", options: "goWork" },
  { key: "probationTime", label: "Thời gian thử việc", options: "probationTime" },
  { key: "probationResult", label: "Kết quả thử việc", options: "probationResult" },
];
const options = {
  mark: ["Pass", "Fail"],
  join: ["Đến", "Không đến"],
  round1: ["PV Vòng 1", "Test"],
  round2: ["PV Vòng 2", "Test"],
  offer: ["Đã gọi", "Không gọi được"],
  offerResult: ["Yes", "No"],
  goWork: ["Đi làm", "Từ chối"],
  probationTime: ["Không thử việc", "30 ngày", "60 ngày", "Khác"],
  probationResult: ["Pass", "Fail", "Nghỉ"],
};

function pick(source) {
  const out = {};
  EMPLOYEE_FIELDS.forEach((k) => {
    if (source && source[k] != null) out[k] = source[k];
  });
  return out;
}

const empty = Object.fromEntries(EMPLOYEE_FIELDS.map((k) => [k, ""]));
const form = ref({ ...empty, ...pick(props.modelValue) });
const errors = ref({});
const jobs = useJobNames();
const formEl = ref(null);

// Edit: dữ liệu tải về sau khi form đã mount
watch(() => props.modelValue, (value) => {
  form.value = { ...form.value, ...pick(value) };
});

// "DD/MM/YYYY" <-> "YYYY-MM-DD" (dữ liệu cũ lưu theo DD/MM/YYYY nên giữ nguyên định dạng lưu)
function toIso(value) {
  const m = DMY.exec(String(value || ""));
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}
function setDate(key, iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  form.value[key] = m ? `${m[3]}/${m[2]}/${m[1]}` : "";
}
function legacyText(key) {
  const v = String(form.value[key] || "");
  return v && !DMY.test(v);
}

function validate() {
  const e = {};
  const f = form.value;
  const phone = String(f.phone || "").trim();
  if (!String(f.name || "").trim()) e.name = "Vui lòng nhập họ tên";
  if (!phone) e.phone = "Vui lòng nhập số điện thoại";
  else if (!/^\+?[\d\s().-]{8,15}$/.test(phone)) e.phone = "Số điện thoại không hợp lệ";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(f.email).trim())) e.email = "Email không hợp lệ";
  if (f.birthYear) {
    const y = Number(f.birthYear);
    if (!/^\d{4}$/.test(String(f.birthYear).trim()) || y < 1940 || y > new Date().getFullYear()) {
      e.birthYear = "Năm sinh không hợp lệ (ví dụ 1998)";
    }
  }
  linkFields.forEach(({ key, label }) => {
    if (f[key] && !/^https?:\/\/\S+$/i.test(String(f[key]).trim())) e[key] = `${label} phải bắt đầu bằng http:// hoặc https://`;
  });
  errors.value = e;
  return Object.keys(e).length === 0;
}

async function submit() {
  if (!validate()) {
    await nextTick();
    const first = formEl.value && formEl.value.querySelector(".field.invalid input");
    if (first) first.focus();
    return;
  }
  const payload = {};
  EMPLOYEE_FIELDS.forEach((k) => (payload[k] = typeof form.value[k] === "string" ? form.value[k].trim() : form.value[k]));
  emit("submit", payload);
}
</script>

<style scoped>
.emp-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; }
.field label { display: block; margin-bottom: 6px; }
.field.wide { grid-column: 1 / -1; }
.field .req { color: var(--c-danger); }
.field.invalid .form-control { border-color: var(--c-danger) !important; }
.err { color: var(--c-danger); display: block; margin-top: 4px; }
.hint { color: var(--c-muted); display: block; margin-top: 4px; }
.emp-actions { display: flex; gap: 10px; margin: 4px 0 24px; }
@media (max-width: 767.98px) { .emp-grid { grid-template-columns: 1fr; } }
</style>
