<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Yêu cầu vị trí</h2>
          <p>AI đề xuất yêu cầu có cấu trúc từ mô tả công việc (JD). Bạn xác nhận hoặc chỉnh sửa rồi mới lưu để dùng cho so khớp.</p>
        </div>
      </div>

      <div class="ui-grid-2" style="grid-template-columns: 320px 1fr">
        <!-- Danh sách job -->
        <div class="ui-card" style="padding: 12px">
          <div v-if="loadingJobs" class="ui-empty"><span class="ui-spin"></span></div>
          <div v-else-if="!jobs.length" class="ui-empty">
            <i class="fas fa-inbox"></i>Chưa có vị trí. Hãy tạo ở trang List Order Job.
          </div>
          <button
            v-for="j in jobs"
            :key="j._id"
            class="job-item"
            :class="{ active: selected && selected._id === j._id }"
            @click="select(j)"
          >
            <b>{{ j.jobName }}</b>
            <span class="ui-pill" :class="hasReq(j) ? 'shortlist' : 'pending'">
              {{ hasReq(j) ? "Đã có yêu cầu" : "Chưa có" }}
            </span>
          </button>
        </div>

        <!-- Chi tiết -->
        <div>
          <div v-if="!selected" class="ui-card ui-empty">
            <i class="fas fa-clipboard-list"></i>Chọn một vị trí để bắt đầu.
          </div>

          <template v-else>
            <div class="ui-card">
              <h5><i class="fas fa-briefcase"></i> {{ selected.jobName }}</h5>
              <label>Mô tả công việc (JD)</label>
              <div class="jd">{{ selected.jobDescription || "Chưa có mô tả. Hãy thêm JD ở trang List Order Job." }}</div>
            </div>

            <div class="ui-card">
              <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h5 class="mb-0"><i class="fas fa-clipboard-check"></i> Yêu cầu có cấu trúc</h5>
                <button class="btn btn-outline-success" :disabled="extracting || !canExtract" @click="extract">
                  <span v-if="extracting" class="ui-spin me-2"></span>
                  <i v-else class="fas fa-magic me-2"></i>AI đề xuất từ JD
                </button>
              </div>

              <div v-if="message" class="ui-notice" :class="messageType">
                <i class="fas fa-info-circle"></i><div>{{ message }}</div>
              </div>

              <div class="mb-3">
                <label>Kỹ năng bắt buộc</label>
                <chip-input v-model="req.mustHaveSkills" placeholder="Ví dụ: Vue.js, rồi Enter" />
              </div>
              <div class="mb-3">
                <label>Kỹ năng ưu tiên</label>
                <chip-input v-model="req.niceToHaveSkills" placeholder="Ví dụ: TypeScript" />
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label>Số năm kinh nghiệm tối thiểu</label>
                  <input type="number" min="0" step="0.5" class="form-control" v-model.number="req.minYearsExperience" />
                </div>
                <div class="col-md-6 mb-3">
                  <label>Trình độ học vấn</label>
                  <input class="form-control" v-model="req.educationLevel" placeholder="Đại học, Cao đẳng..." />
                </div>
              </div>

              <div class="ui-notice warn">
                <i class="fas fa-balance-scale"></i>
                <div>Chỉ đưa vào các yêu cầu liên quan trực tiếp đến năng lực. Không dùng tuổi, giới tính, ngoại hình, quê quán hay tình trạng hôn nhân làm tiêu chí.</div>
              </div>

              <button class="btn btn-primary" :disabled="saving" @click="save">
                <span v-if="saving" class="ui-spin me-2"></span>
                <i v-else class="fas fa-save me-2"></i>Xác nhận & lưu yêu cầu
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ChipInput from "@/components/ChipInput.vue";
import { getAllJobs, updateJob } from "@/services/job-service";
import { extractJobRequirements, errorMessage } from "@/services/ai-service";

const emptyReq = () => ({
  mustHaveSkills: [],
  niceToHaveSkills: [],
  minYearsExperience: 0,
  educationLevel: "",
});
const clone = (value) => JSON.parse(JSON.stringify(value));

const jobs = ref([]);
const loadingJobs = ref(true);
const selected = ref(null);
const req = ref(emptyReq());
const extracting = ref(false);
const saving = ref(false);
const message = ref("");
const messageType = ref("info");

const canExtract = computed(() => selected.value && (selected.value.jobDescription || "").trim().length >= 20);

onMounted(async () => {
  const res = await getAllJobs();
  jobs.value = (res && res.data) || [];
  loadingJobs.value = false;
});

const hasReq = (j) => !!(j.requirements && (j.requirements.mustHaveSkills || []).length);

function notify(text, type = "info") {
  message.value = text;
  messageType.value = type;
}

function select(job) {
  selected.value = job;
  message.value = "";
  req.value = { ...emptyReq(), ...clone(job.requirements || {}) };
}

async function extract() {
  extracting.value = true;
  message.value = "";
  try {
    const res = await extractJobRequirements(selected.value._id);
    if (res.status === 200) {
      req.value = { ...emptyReq(), ...res.data.data.requirements };
      notify("AI đã đề xuất yêu cầu. Hãy kiểm tra, chỉnh sửa rồi bấm “Xác nhận & lưu”. Chưa có gì được lưu.");
    } else {
      notify((res.data && res.data.error) || "AI không đề xuất được.", "error");
    }
  } catch (e) {
    notify(errorMessage(e), "error");
  }
  extracting.value = false;
}

async function save() {
  saving.value = true;
  const res = await updateJob(selected.value._id, { requirements: req.value });
  if (res.status === 200) {
    selected.value.requirements = clone(req.value);
    notify("Đã lưu yêu cầu cho vị trí.");
  } else {
    notify("Lưu thất bại.", "error");
  }
  saving.value = false;
}
</script>

<style scoped>
.job-item {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  width: 100%; text-align: left; border: 0; background: transparent;
  padding: 12px; border-radius: 10px; cursor: pointer;
}
.job-item .ui-pill { white-space: nowrap; }
.job-item:hover { background: var(--c-primary-50); }
.job-item.active { background: var(--c-primary-50); box-shadow: inset 3px 0 0 var(--c-primary); }
.jd {
  white-space: pre-wrap; background: #f9fafb; border: 1px solid var(--c-border);
  border-radius: 10px; padding: 12px; max-height: 220px; overflow: auto; font-size: 13.5px;
}
@media (max-width: 991px) { .ui-grid-2 { grid-template-columns: 1fr !important; } }
</style>
