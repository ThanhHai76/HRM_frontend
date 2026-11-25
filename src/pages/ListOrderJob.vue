<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Vị trí cần tuyển</h2>
          <p>Quản lý các order tuyển dụng: số lượng, chi phí, JD và nhóm báo cáo.</p>
        </div>
        <button class="btn btn-primary" @click="showModalCreateJob"><i class="fas fa-plus me-1"></i> Thêm vị trí</button>
      </div>

      <!-- Số liệu nhanh -->
      <div class="stat-tiles">
        <div class="tile"><span class="ico a"><i class="fas fa-briefcase"></i></span><div><b>{{ dataListJobs.length }}</b><small>Vị trí</small></div></div>
        <div class="tile"><span class="ico b"><i class="fas fa-users"></i></span><div><b>{{ amountTotal }}</b><small>Tổng số lượng cần tuyển</small></div></div>
        <div class="tile"><span class="ico c"><i class="fas fa-coins"></i></span><div><b>{{ formatMoney(costTotal) || "0 VND" }}</b><small>Tổng chi phí tuyển dụng</small></div></div>
      </div>

      <div class="ui-card toolbar">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" class="form-control" v-model="searchWord" placeholder="Tìm theo tên vị trí, khối, team…" />
          <button v-if="searchWord" class="clear" @click="searchWord = ''">&times;</button>
        </div>
      </div>

      <div class="ui-card table-card">
        <div v-if="isLoading" class="ui-empty"><span class="ui-spin"></span></div>
        <div v-else-if="!filteredJobs.length" class="ui-empty">
          <i class="fas fa-briefcase"></i>
          {{ dataListJobs.length ? "Không có vị trí nào khớp." : "Chưa có vị trí nào. Bấm “Thêm vị trí” để bắt đầu." }}
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Vị trí</th>
                <th class="d-none d-md-table-cell">Ngày order</th>
                <th class="num">SL</th>
                <th class="d-none d-lg-table-cell">Chi phí</th>
                <th class="d-none d-lg-table-cell">Yêu cầu AI</th>
                <th class="d-none d-xl-table-cell">JD</th>
                <th class="actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredJobs" :key="item._id">
                <td>
                  <div class="job-name">{{ item.jobName }}</div>
                  <small v-if="item.block || item.team" class="text-muted">{{ [item.block, item.team].filter(Boolean).join(" / ") }}</small>
                  <small v-if="item.note" class="text-muted d-block">{{ item.note }}</small>
                </td>
                <td class="d-none d-md-table-cell nowrap">{{ item.orderDate }}</td>
                <td class="num"><b>{{ item.amount }}</b></td>
                <td class="d-none d-lg-table-cell nowrap">{{ formatMoney(item.recruitmentCost) || "—" }}</td>
                <td class="d-none d-lg-table-cell">
                  <router-link to="/ai/job-requirements" class="ui-pill" :class="hasRequirements(item) ? 'shortlist' : 'pending'">
                    {{ hasRequirements(item) ? "Đã thiết lập" : "Chưa có" }}
                  </router-link>
                </td>
                <td class="d-none d-xl-table-cell"><div class="jd">{{ item.jobDescription }}</div></td>
                <td class="actions">
                  <button class="icon-btn" title="Sửa" @click="onEditJob(item)"><i class="fas fa-pen"></i></button>
                  <button class="icon-btn danger" title="Xóa" @click="onDeleteJob(item)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Thêm / sửa -->
      <b-modal
        centered
        size="lg"
        :title="isEditMode ? 'Chỉnh sửa vị trí' : 'Thêm vị trí'"
        v-model="isShowModalCreateJob"
        @ok="onOk"
        @hidden="resetForm"
        :ok-title="isEditMode ? 'Lưu thay đổi' : 'Thêm vị trí'"
        cancel-title="Hủy"
        :ok-disabled="saving"
      >
        <div class="row g-3">
          <div class="col-md-8">
            <label>Tên vị trí <b class="req">*</b></label>
            <input class="form-control" :class="{ bad: touched && !formCreate.jobName }" v-model="formCreate.jobName" placeholder="Ví dụ: Frontend Developer (Vue)" />
          </div>
          <div class="col-md-4">
            <label>Số lượng <b class="req">*</b></label>
            <input class="form-control" :class="{ bad: touched && !validAmount }" type="number" min="1" v-model="formCreate.amount" />
          </div>
          <div class="col-md-6">
            <label>Ngày order <b class="req">*</b></label>
            <input class="form-control" :class="{ bad: touched && !formCreate.orderDate }" v-model="formCreate.orderDate" placeholder="Ví dụ: 01/2026" />
          </div>
          <div class="col-md-6">
            <label>Chi phí tuyển dụng (VND)</label>
            <input class="form-control" type="number" min="0" v-model="formCreate.recruitmentCost" />
          </div>
          <div class="col-md-6">
            <label>Khối <small class="text-muted">(dùng cho báo cáo)</small></label>
            <input class="form-control" v-model="formCreate.block" placeholder="Ví dụ: Dự án, Digital" />
          </div>
          <div class="col-md-6">
            <label>Team</label>
            <input class="form-control" v-model="formCreate.team" placeholder="Ví dụ: Marketing" />
          </div>
          <div class="col-12">
            <label>Mô tả công việc (JD)</label>
            <textarea class="form-control" rows="5" v-model="formCreate.jobDescription" placeholder="Dán JD đầy đủ để AI có thể đề xuất yêu cầu cho vị trí"></textarea>
          </div>
          <div class="col-12">
            <label>Ghi chú</label>
            <input class="form-control" v-model="formCreate.note" />
          </div>
        </div>
        <div v-if="touched && checkInvalidForm" class="text-danger small mt-3">Vui lòng nhập tên vị trí, ngày order và số lượng hợp lệ.</div>
      </b-modal>

      <b-modal centered title="Thông báo" v-model="isShowModalSuccess" ok-only ok-title="Đóng">
        <p>{{ messageNoti }}</p>
      </b-modal>

      <b-modal centered title="Xóa vị trí" v-model="isShowModalDeleteJob" @ok="confirmDeleteJob" ok-title="Xóa" ok-variant="danger" cancel-title="Hủy">
        <p>Bạn có chắc muốn xóa vị trí này? Hành động không thể hoàn tác.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { createJob, deleteJob, getAllJobs, updateJob } from "@/services/job-service";

const emptyForm = () => ({
  jobName: "",
  block: "",
  team: "",
  orderDate: "",
  amount: "",
  jobDescription: "",
  recruitmentCost: "",
  note: "",
});

const dataListJobs = ref([]);
const isLoading = ref(true);
const searchWord = ref("");
const isShowModalCreateJob = ref(false);
const formCreate = ref(emptyForm());
const touched = ref(false);
const saving = ref(false);
const isShowModalSuccess = ref(false);
const messageNoti = ref("");
const isEditMode = ref(false);
const selectedJob = ref("");
const isShowModalDeleteJob = ref(false);

const validAmount = computed(() => Number(formCreate.value.amount) > 0);
const checkInvalidForm = computed(() => !String(formCreate.value.jobName).trim() || !String(formCreate.value.orderDate).trim() || !validAmount.value);
const amountTotal = computed(() => dataListJobs.value.reduce((total, job) => total + (Number(job.amount) || 0), 0));
const costTotal = computed(() => dataListJobs.value.reduce((total, job) => total + (Number(job.recruitmentCost) || 0), 0));
const filteredJobs = computed(() => {
  const q = searchWord.value.trim().toLowerCase();
  if (!q) return dataListJobs.value;
  return dataListJobs.value.filter((j) => ["jobName", "block", "team", "note"].some((k) => String(j[k] || "").toLowerCase().includes(q)));
});

const hasRequirements = (job) => !!(job.requirements && (job.requirements.mustHaveSkills || []).length);

function resetForm() {
  formCreate.value = emptyForm();
  touched.value = false;
  isEditMode.value = false;
}

async function fetchDataListJobs() {
  isLoading.value = true;
  try {
    const { data } = await getAllJobs();
    dataListJobs.value = data || [];
  } catch {
    dataListJobs.value = [];
  }
  isLoading.value = false;
}

function showModalCreateJob() {
  resetForm();
  isShowModalCreateJob.value = true;
}

// Không đóng hộp thoại khi dữ liệu chưa hợp lệ
async function onOk(event) {
  event.preventDefault();
  touched.value = true;
  if (checkInvalidForm.value) return;
  saving.value = true;
  const f = formCreate.value;
  const payload = { ...f, amount: Number(f.amount), recruitmentCost: f.recruitmentCost === "" ? undefined : Number(f.recruitmentCost) };
  try {
    const { status } = isEditMode.value ? await updateJob(selectedJob.value, payload) : await createJob(payload);
    if (status === 200) {
      isShowModalCreateJob.value = false;
      messageNoti.value = isEditMode.value ? "Đã cập nhật vị trí." : "Đã thêm vị trí.";
      isShowModalSuccess.value = true;
      await fetchDataListJobs();
    }
  } finally {
    saving.value = false;
  }
}

function onEditJob(item) {
  isEditMode.value = true;
  selectedJob.value = item._id;
  formCreate.value = {
    jobName: item.jobName || "",
    block: item.block || "",
    team: item.team || "",
    orderDate: item.orderDate || "",
    amount: item.amount != null ? item.amount : "",
    jobDescription: item.jobDescription || "",
    recruitmentCost: item.recruitmentCost != null ? item.recruitmentCost : "",
    note: item.note || "",
  };
  touched.value = false;
  isShowModalCreateJob.value = true;
}

function onDeleteJob(item) {
  isShowModalDeleteJob.value = true;
  selectedJob.value = item._id;
}

async function confirmDeleteJob() {
  const status = await deleteJob(selectedJob.value);
  await fetchDataListJobs();
  isShowModalDeleteJob.value = false;
  if (status === 200) {
    messageNoti.value = "Đã xóa vị trí.";
    isShowModalSuccess.value = true;
  }
}

function formatMoney(number) {
  if (!number) return "";
  const [integerPart, decimalPart] = String(number).split(".");
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (decimalPart ? formatted + "." + decimalPart : formatted) + " VND";
}

onMounted(fetchDataListJobs);
</script>

<style scoped>
.stat-tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 16px; }
.tile { display: flex; align-items: center; gap: 14px; background: #fff; border: 1px solid var(--c-border); border-radius: var(--radius); padding: 16px; box-shadow: var(--shadow-sm); }
.tile b { display: block; font-size: 22px; line-height: 1.15; }
.tile small { color: var(--c-muted); }
.tile .ico { width: 44px; height: 44px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 18px; }
.tile .ico.a { background: var(--c-primary-50); color: var(--c-primary); }
.tile .ico.b { background: var(--c-success-50); color: var(--c-success); }
.tile .ico.c { background: var(--c-warning-50); color: var(--c-warning); }
.toolbar { display: flex; gap: 12px; align-items: center; padding: 14px 16px; }
.search-box { position: relative; flex: 1 1 320px; }
.search-box > i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
.search-box .form-control { padding-left: 38px; padding-right: 34px; }
.search-box .clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); border: 0; background: transparent; font-size: 20px; color: #9ca3af; line-height: 1; }
.table-card { padding: 0; overflow: hidden; }
th.num, td.num { width: 70px; text-align: center; }
th.actions, td.actions { width: 96px; text-align: right; white-space: nowrap; }
.job-name { font-weight: 650; }
.nowrap { white-space: nowrap; }
.jd { max-width: 320px; color: var(--c-muted); font-size: 13px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.req { color: var(--c-danger); }
.form-control.bad { border-color: var(--c-danger) !important; }
label { margin-bottom: 6px; display: block; }
</style>
