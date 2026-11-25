<template>
  <form ref="formEl" class="trk-form" novalidate @submit.prevent="submit">
    <section class="ui-card">
      <h5><i class="fas fa-id-card"></i> Thông tin ứng viên</h5>
      <div class="trk-grid">
        <div class="field" :class="{ invalid: errors.name }">
          <label>Họ và tên <b class="req">*</b></label>
          <input class="form-control" v-model="form.name" placeholder="Nguyễn Văn A" />
          <small v-if="errors.name" class="err">{{ errors.name }}</small>
        </div>
        <div class="field">
          <label>Job</label>
          <input class="form-control" list="trk-form-jobs" v-model="form.job" placeholder="Vị trí ứng tuyển" />
          <datalist id="trk-form-jobs"><option v-for="j in jobs" :key="j" :value="j"></option></datalist>
        </div>
        <div class="field">
          <label>Ngày về/nhập CV</label>
          <VueDatePicker v-model="form.cvDate" :enable-time-picker="false" placeholder="Chọn ngày" />
        </div>
        <div class="field" :class="{ invalid: errors.phone }">
          <label>SĐT</label>
          <input class="form-control" v-model="form.phone" inputmode="tel" placeholder="0901234567" />
          <small v-if="errors.phone" class="err">{{ errors.phone }}</small>
        </div>
        <div class="field" :class="{ invalid: errors.email }">
          <label>Địa chỉ email</label>
          <input class="form-control" type="email" v-model="form.email" placeholder="ten@congty.com" />
          <small v-if="errors.email" class="err">{{ errors.email }}</small>
        </div>
        <div class="field" :class="{ invalid: errors.linkCV }">
          <label>Link CV</label>
          <input class="form-control" v-model="form.linkCV" placeholder="https://..." />
          <small v-if="errors.linkCV" class="err">{{ errors.linkCV }}</small>
        </div>
      </div>
    </section>

    <section class="ui-card">
      <h5><i class="fas fa-calendar-check"></i> Phỏng vấn</h5>
      <div class="trk-grid">
        <div class="field">
          <label>Ngày PV</label>
          <VueDatePicker v-model="form.interviewDate" :enable-time-picker="false" placeholder="Chọn ngày" />
        </div>
        <div class="field">
          <label>Thời gian PV vòng 1</label>
          <VueDatePicker v-model="form.interviewTime" placeholder="Chọn ngày giờ" />
        </div>
        <div class="field"><label>Người PV</label><input class="form-control" v-model="form.interviewer" /></div>
        <div class="field"><label>Phòng PV</label><input class="form-control" v-model="form.interviewRoom" /></div>
        <div class="field"><label>Team</label><input class="form-control" v-model="form.team" /></div>
        <div class="field">
          <label>Thay đổi thời gian PV</label>
          <VueDatePicker v-model="form.interviewTimeChange" placeholder="Chọn ngày giờ" />
        </div>
        <div class="field" v-for="s in selects.interview" :key="s.key">
          <label>{{ s.label }}</label>
          <select class="form-select" v-model="form[s.key]">
            <option value="">— Chọn —</option>
            <option v-for="o in options[s.options]" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
        <div class="field">
          <label>Ngày chốt kết quả PV</label>
          <VueDatePicker v-model="form.interviewResultClosingDate" :enable-time-picker="false" placeholder="Chọn ngày" />
        </div>
        <div class="field wide">
          <label>Đánh giá</label>
          <textarea class="form-control" rows="3" v-model="form.evaluation"></textarea>
        </div>
      </div>
    </section>

    <section class="ui-card">
      <h5><i class="fas fa-handshake"></i> Offer và thử việc</h5>
      <div class="trk-grid">
        <div class="field">
          <label>Kết quả offer</label>
          <select class="form-select" v-model="form.offerResult">
            <option value="">— Chọn —</option>
            <option v-for="o in options.result" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
        <div class="field"><label>Lương chính thức</label><input class="form-control" v-model="form.officialSalary" /></div>
        <div class="field"><label>Lương thử việc</label><input class="form-control" v-model="form.probationarySalary" /></div>
        <div class="field">
          <label>Ngày bắt đầu đi làm</label>
          <VueDatePicker v-model="form.startWorkDate" :enable-time-picker="false" placeholder="Chọn ngày" />
        </div>
        <div class="field"><label>Thời gian thử việc</label><input class="form-control" v-model="form.probationaryTime" placeholder="Ví dụ: 2 tháng" /></div>
        <div class="field">
          <label>Ngày hết thử việc <small class="text-muted">(hệ thống nhắc trước 5 ngày)</small></label>
          <VueDatePicker v-model="form.probationaryEndDate" :enable-time-picker="false" placeholder="Chọn ngày" />
        </div>
        <div class="field"><label>Đã gửi mail thông báo / cảm ơn</label><input class="form-control" v-model="form.sendMail" /></div>
        <div class="field">
          <label>Tình trạng thử việc</label>
          <select class="form-select" v-model="form.probationStatus">
            <option value="">— Chọn —</option>
            <option v-for="o in options.probation" :key="o" :value="o">{{ o }}</option>
          </select>
        </div>
        <div class="field wide"><label>Cập nhật tình trạng</label><input class="form-control" v-model="form.statusUpdate" /></div>
      </div>
    </section>

    <div v-if="submitError" class="ui-notice error"><i class="fas fa-exclamation-triangle"></i><div>{{ submitError }}</div></div>

    <div class="trk-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading"><span v-if="loading" class="ui-spin me-2"></span>{{ submitLabel }}</button>
      <button type="button" class="btn btn-outline-secondary" @click="$emit('cancel')">Hủy</button>
    </div>
  </form>
</template>

<script setup>
import { nextTick, ref, watch } from "vue";
import { useJobNames } from "@/composables/useJobNames";

// Chỉ các trường này được gửi lên server
const TRACK_FIELDS = [
  "cvDate", "job", "name", "phone", "email", "linkCV", "interviewDate", "interviewTime", "interviewer", "interviewRoom",
  "team", "interviewTimeChange", "joinRound1Status", "testInterviewRound2", "joinRound2Status", "evaluation",
  "interviewResult", "interviewResultClosingDate", "offerResult", "officialSalary", "probationarySalary",
  "startWorkDate", "probationaryTime", "probationaryEndDate", "sendMail", "probationStatus", "statusUpdate",
];

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  loading: Boolean,
  submitLabel: { type: String, default: "Lưu" },
  submitError: { type: String, default: "" },
});
const emit = defineEmits(["submit", "cancel"]);

const selects = {
  interview: [
    { key: "joinRound1Status", label: "Tình trạng tham gia PV vòng 1", options: "join" },
    { key: "testInterviewRound2", label: "Test / PV vòng 2", options: "round2" },
    { key: "joinRound2Status", label: "Tình trạng tham gia vòng 2", options: "yesno" },
    { key: "interviewResult", label: "Kết quả PV", options: "result" },
  ],
};
const options = {
  join: ["Đến", "Đến muộn", "Cancel"],
  round2: ["Test", "PV V2", "Không"],
  yesno: ["Yes", "No"],
  result: ["Pass", "Fail"],
  probation: ["Đang thử việc", "Từ chối việc", "Nghỉ việc", "Fail thử việc", "Pass việc", "Thực tập", "Chưa đi làm"],
};

function pick(source) {
  const out = {};
  TRACK_FIELDS.forEach((k) => {
    if (source && source[k] != null) out[k] = source[k];
  });
  return out;
}

const empty = Object.fromEntries(TRACK_FIELDS.map((k) => [k, ""]));
const form = ref({ ...empty, ...pick(props.modelValue) });
const errors = ref({});
const jobs = useJobNames();
const formEl = ref(null);

watch(() => props.modelValue, (value) => {
  form.value = { ...form.value, ...pick(value) };
});

function validate() {
  const e = {};
  const f = form.value;
  if (!String(f.name || "").trim()) e.name = "Vui lòng nhập họ tên";
  if (f.phone && !/^\+?[\d\s().-]{8,15}$/.test(String(f.phone).trim())) e.phone = "Số điện thoại không hợp lệ";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(f.email).trim())) e.email = "Email không hợp lệ";
  if (f.linkCV && !/^https?:\/\/\S+$/i.test(String(f.linkCV).trim())) e.linkCV = "Link phải bắt đầu bằng http:// hoặc https://";
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
  TRACK_FIELDS.forEach((k) => (payload[k] = typeof form.value[k] === "string" ? form.value[k].trim() : form.value[k]));
  emit("submit", payload);
}
</script>

<style scoped>
.trk-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; }
.field label { display: block; margin-bottom: 6px; }
.field.wide { grid-column: 1 / -1; }
.field .req { color: var(--c-danger); }
.field.invalid .form-control { border-color: var(--c-danger) !important; }
.err { color: var(--c-danger); display: block; margin-top: 4px; }
.trk-actions { display: flex; gap: 10px; margin: 4px 0 24px; }
@media (max-width: 767.98px) { .trk-grid { grid-template-columns: 1fr; } }
</style>
