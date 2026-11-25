<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div v-if="loading" class="ui-card ui-empty"><span class="ui-spin"></span></div>
      <div v-else-if="!employee" class="ui-notice error">
        <i class="fas fa-exclamation-triangle"></i><div>Không tìm thấy ứng viên.</div>
      </div>

      <template v-else>
        <!-- Đầu hồ sơ -->
        <div class="ui-card profile-head">
          <span class="avatar-ini big" :style="{ background: avatarColor(employee.name) }">{{ initials(employee.name) }}</span>
          <div class="grow">
            <h2>{{ employee.name || "(chưa có tên)" }}</h2>
            <div class="sub">
              <span v-if="employee.job"><i class="fas fa-briefcase"></i>{{ employee.job }}</span>
              <span v-if="employee.phone"><i class="fas fa-phone-alt"></i>{{ employee.phone }}</span>
              <span v-if="employee.email"><i class="fas fa-envelope"></i>{{ employee.email }}</span>
            </div>
            <div class="marks mt-2">
              <span v-if="employee.hrMark" class="ui-pill" :class="pillClass(employee.hrMark)">HR chấm: {{ employee.hrMark }}</span>
              <span v-if="employee.partMark" class="ui-pill" :class="pillClass(employee.partMark)">Bộ phận chấm: {{ employee.partMark }}</span>
              <span v-if="employee.goWork" class="ui-pill" :class="pillClass(employee.goWork)">{{ employee.goWork }}</span>
              <span v-if="employee.sheetSyncedAt" class="ui-pill pending" title="Dữ liệu được đồng bộ từ Google Sheet"><i class="fas fa-sync-alt"></i> Sheet · {{ formatDate(employee.sheetSyncedAt) }}</span>
            </div>
          </div>
          <div class="head-actions">
            <button v-if="employee.cvFileId" class="btn btn-outline-secondary" @click="openStoredCv"><i class="fas fa-file-pdf text-danger me-1"></i> Xem file CV</button>
            <button class="btn btn-primary" @click="$router.push(`/edit-employee/${employee._id}`)"><i class="fas fa-pen me-1"></i> Chỉnh sửa</button>
            <button class="btn btn-outline-secondary" @click="$router.push('/employee')">Quay lại</button>
          </div>
        </div>

        <!-- Hồ sơ năng lực do AI trích xuất -->
        <div v-if="employee.cvProfile" class="ui-card">
          <h5><i class="fas fa-magic"></i> Hồ sơ năng lực (AI phân tích từ CV)</h5>
          <p v-if="employee.cvProfile.headline" class="mb-2"><b>{{ employee.cvProfile.headline }}</b>
            <span v-if="employee.cvProfile.totalYearsExperience" class="text-muted"> · {{ employee.cvProfile.totalYearsExperience }} năm kinh nghiệm</span>
          </p>
          <p v-if="employee.cvProfile.summary" class="text-muted">{{ employee.cvProfile.summary }}</p>
          <div v-if="(employee.cvProfile.skills || []).length">
            <span v-for="s in employee.cvProfile.skills" :key="s" class="ui-chip">{{ s }}</span>
          </div>
          <router-link to="/ai/matching" class="small">So khớp ứng viên này với một vị trí →</router-link>
        </div>

        <!-- Các nhóm thông tin -->
        <div v-for="group in groups" :key="group.title" class="ui-card">
          <h5><i :class="group.icon"></i> {{ group.title }}</h5>
          <div class="info-grid">
            <div v-for="f in group.fields" :key="f.key" class="info" :class="{ wide: f.wide }">
              <label>{{ f.label }}</label>
              <a v-if="f.link && isUrl(employee[f.key])" :href="employee[f.key]" target="_blank" rel="noopener noreferrer">{{ employee[f.key] }}</a>
              <div v-else class="val">{{ employee[f.key] || "—" }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getEmployee } from "@/services/employee-service";
import { openCvFile } from "@/services/ai-service";
import { avatarColor, initials } from "@/utils/avatar";
import { localDate as formatDate } from "@/utils/format";

const groups = [
  {
    title: "Thông tin cơ bản",
    icon: "fas fa-id-card",
    fields: [
      { key: "source", label: "Nguồn" },
      { key: "cvDate", label: "Ngày về/nhập CV" },
      { key: "birthYear", label: "Năm sinh" },
      { key: "academicLevel", label: "Trình độ học vấn" },
      { key: "specialized", label: "Chuyên ngành" },
      { key: "linkCV", label: "Link CV", link: true },
      { key: "linkSP", label: "Link SP", link: true },
      { key: "linkFB", label: "Link FB", link: true },
      { key: "companyUV", label: "Đơn vị UV từng làm", wide: true },
    ],
  },
  {
    title: "Quá trình tuyển dụng",
    icon: "fas fa-route",
    fields: [
      { key: "hrSuggest", label: "HR suggest", wide: true },
      { key: "hrMark", label: "HR chấm" },
      { key: "partMark", label: "Bộ phận chấm" },
      { key: "round1", label: "Vòng 1" },
      { key: "joinRound1", label: "Tham gia vòng 1" },
      { key: "interviewV1", label: "Kết quả PV V1" },
      { key: "round2", label: "Vòng 2" },
      { key: "joinRound2", label: "Tham gia vòng 2" },
      { key: "interviewV2", label: "Kết quả PV V2" },
      { key: "notes", label: "Notes", wide: true },
    ],
  },
  {
    title: "Offer và thử việc",
    icon: "fas fa-handshake",
    fields: [
      { key: "offer", label: "Offer" },
      { key: "offerResult", label: "Kết quả offer" },
      { key: "goWork", label: "Đi làm" },
      { key: "onboardDate", label: "Ngày đi làm" },
      { key: "probationTime", label: "Thời gian thử việc" },
      { key: "probationResult", label: "Kết quả thử việc" },
      { key: "notes2", label: "Notes (offer)", wide: true },
      { key: "notes3", label: "Note (thử việc)", wide: true },
    ],
  },
];

const route = useRoute();
const employee = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await getEmployee(route.params.id);
    employee.value = data || null;
  } catch {
    employee.value = null;
  }
  loading.value = false;
});

function pillClass(value) {
  const v = String(value || "").toLowerCase();
  if (/(pass|đi làm|đạt)/.test(v)) return "shortlist";
  if (/(fail|từ chối|nghỉ)/.test(v)) return "reject";
  return "hold";
}

// Chỉ mở liên kết http(s), tránh javascript: và các scheme khác
const isUrl = (value) => /^https?:\/\/\S+$/i.test(String(value || ""));

async function openStoredCv() {
  try {
    await openCvFile(employee.value.cvFileId);
  } catch {
    alert("Không mở được file CV.");
  }
}
</script>

<style scoped>
.profile-head { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
.profile-head .grow { flex: 1 1 280px; min-width: 0; }
.profile-head h2 { font-size: 24px; font-weight: 750; margin: 0 0 6px; }
.avatar-ini.big { width: 72px; height: 72px; min-width: 72px; font-size: 24px; }
.sub { display: flex; flex-wrap: wrap; gap: 6px 18px; color: var(--c-muted); }
.sub i { margin-right: 6px; font-size: 12px; opacity: 0.75; }
.marks { display: flex; gap: 6px; flex-wrap: wrap; }
.head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.info-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px 24px; }
.info.wide { grid-column: 1 / -1; }
.info label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--c-muted); margin-bottom: 3px; }
.info .val, .info a { word-break: break-word; white-space: pre-wrap; }
@media (max-width: 991.98px) { .info-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 575.98px) { .info-grid { grid-template-columns: 1fr; } }
</style>
