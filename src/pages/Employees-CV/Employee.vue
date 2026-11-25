<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Employees CV</h2>
          <p>
            <template v-if="isLoading">Đang tải…</template>
            <template v-else>{{ allEmployees.length }} ứng viên<span v-if="employeeFilter.length !== allEmployees.length"> · đang hiển thị {{ employeeFilter.length }}</span></template>
          </p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-outline-secondary" @click="importExcel"><i class="fas fa-file-excel me-1"></i> Import Excel</button>
          <button class="btn btn-primary" @click="addEmployee"><i class="fas fa-plus me-1"></i> Thêm ứng viên</button>
        </div>
      </div>

      <!-- Thanh công cụ -->
      <div class="ui-card toolbar">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            type="text"
            class="form-control"
            v-model="searchWord"
            placeholder="Tìm theo tên, SĐT, email, job, nguồn…"
          />
          <button v-if="searchWord" class="clear" title="Xóa tìm kiếm" @click="searchWord = ''">&times;</button>
        </div>
        <select class="form-select filter" v-model="yearFilter" title="Lọc theo năm nhập CV">
          <option value="Tất cả">Tất cả năm</option>
          <option v-for="y in yearOptions" :key="y" :value="y">Năm {{ y }}</option>
        </select>
        <select class="form-select filter" v-model="jobFilterSelected" title="Lọc theo vị trí">
          <option v-for="item in dataListJobs" :key="item._id" :value="item.jobName">{{ item.jobName }}</option>
        </select>
        <select class="form-select filter small" v-model.number="perPage" title="Số dòng mỗi trang">
          <option v-for="n in [5, 10, 20, 50, 100]" :key="n" :value="n">{{ n }} / trang</option>
        </select>
      </div>

      <div v-if="isShowStatus" class="ui-notice info">
        <i class="fas fa-history"></i>
        <div>Số điện thoại này xuất hiện ở nhiều hồ sơ: ứng viên <b>đã từng tham gia phỏng vấn</b>.</div>
      </div>

      <!-- Bảng -->
      <div class="ui-card table-card">
        <div v-if="isLoading && !allEmployees.length" class="ui-empty"><span class="ui-spin"></span></div>
        <div v-else-if="!employeePerpage.length" class="ui-empty">
          <i class="fas fa-user-slash"></i>
          {{ allEmployees.length ? "Không có ứng viên nào khớp bộ lọc." : "Chưa có ứng viên. Hãy thêm mới, nhập từ Excel hoặc đồng bộ từ Google Sheet." }}
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0 emp-table">
            <thead>
              <tr>
                <th class="num">#</th>
                <th>Ứng viên</th>
                <th>Vị trí</th>
                <th class="d-none d-lg-table-cell">Học vấn</th>
                <th class="d-none d-md-table-cell">Ngày CV</th>
                <th>Đánh giá</th>
                <th class="actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of employeePerpage" :key="item._id" @dblclick="onDetailEmployee(item)">
                <td class="num">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                <td>
                  <div class="person">
                    <span class="avatar-ini" :style="{ background: avatarColor(item.name) }">{{ initials(item.name) }}</span>
                    <div class="who">
                      <a class="name" @click="onDetailEmployee(item)">{{ item.name || "(chưa có tên)" }}</a>
                      <div class="contact">
                        <span v-if="item.phone" class="copyable" :title="'Sao chép ' + item.phone" @click="onCopy(item.phone)">
                          <i class="fas fa-phone-alt"></i>{{ item.phone }}<i v-if="copied === item.phone" class="fas fa-check ok"></i>
                        </span>
                        <span v-if="item.email" class="copyable" :title="'Sao chép ' + item.email" @click="onCopy(item.email)">
                          <i class="fas fa-envelope"></i>{{ item.email }}<i v-if="copied === item.email" class="fas fa-check ok"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="job">{{ item.job || "—" }}</div>
                  <small v-if="item.source" class="text-muted">{{ item.source }}</small>
                </td>
                <td class="d-none d-lg-table-cell">
                  <div>{{ item.academicLevel || "—" }}</div>
                  <small class="text-muted">{{ item.specialized }}</small>
                </td>
                <td class="d-none d-md-table-cell nowrap">{{ item.cvDate || "—" }}</td>
                <td>
                  <div class="marks">
                    <span v-if="item.hrMark" class="ui-pill" :class="pillClass(item.hrMark)" title="HR chấm">HR: {{ item.hrMark }}</span>
                    <span v-if="item.partMark" class="ui-pill" :class="pillClass(item.partMark)" title="Bộ phận chấm">BP: {{ item.partMark }}</span>
                    <span v-if="!item.hrMark && !item.partMark" class="ui-pill pending">Chưa chấm</span>
                    <span v-if="item.hasCvProfile" class="ui-pill ai" title="Đã có hồ sơ năng lực do AI phân tích"><i class="fas fa-magic"></i> AI</span>
                    <i v-if="item.hasCvFile" class="fas fa-file-pdf text-danger" title="Có file CV đã lưu"></i>
                  </div>
                </td>
                <td class="actions">
                  <button class="icon-btn" title="Chi tiết" @click="onDetailEmployee(item)"><i class="fas fa-eye"></i></button>
                  <button class="icon-btn" title="Sửa" @click="onEditEmployee(item)"><i class="fas fa-pen"></i></button>
                  <button class="icon-btn danger" title="Xóa" @click="onDeleteEmployee(item)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="employeeFilter.length" class="table-pager">
          <small class="text-muted">
            {{ (currentPage - 1) * perPage + 1 }}–{{ Math.min(currentPage * perPage, employeeFilter.length) }} / {{ employeeFilter.length }}
          </small>
          <b-pagination v-model="currentPage" :total-rows="employeeFilter.length" :per-page="perPage" class="mb-0"></b-pagination>
        </div>
      </div>

      <b-modal centered title="Xóa ứng viên" v-model="isShowModalDelete" @ok="confirmDeleteEmployee" ok-title="Xóa" ok-variant="danger" cancel-title="Hủy">
        <p>Bạn có chắc muốn xóa hồ sơ này? Hành động không thể hoàn tác (file CV đã lưu của ứng viên cũng bị xóa).</p>
      </b-modal>

      <b-modal centered title="Thông báo" v-model="isShowModalSuccess" ok-only ok-title="Đóng">
        <p>{{ messageNoti }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { yearsFromDates } from "@/utils/years";
import { deleteEmployee, getALLEmployees } from "@/services/employee-service";
import { getAllJobs } from "@/services/job-service";
import { avatarColor, initials } from "@/utils/avatar";
import { copyText } from "@/utils/format";

const ALL_JOBS = "Tất cả Jobs";
const SEARCH_FIELDS = ["name", "phone", "email", "source", "job", "cvDate", "birthYear", "academicLevel", "specialized", "hrMark"];

const router = useRouter();

const allEmployees = ref([]);
const searchWord = ref("");
const currentPage = ref(1);
const perPage = ref(10);
const itemSelected = ref(null);
const isShowModalDelete = ref(false);
const isShowModalSuccess = ref(false);
const messageNoti = ref("");
const yearFilter = ref("Tất cả");
const isLoading = ref(false);
const dataListJobs = ref([{ _id: "all", jobName: ALL_JOBS }]);
const jobFilterSelected = ref(ALL_JOBS);
const copied = ref("");

const yearOptions = computed(() => yearsFromDates(allEmployees.value).reverse());

const employeeYearFilter = computed(() => {
  if (yearFilter.value === "Tất cả") return allEmployees.value;
  return allEmployees.value.filter(({ cvDate }) => (cvDate || "").includes(`/${yearFilter.value}`));
});
const employeeJobFilter = computed(() => {
  if (jobFilterSelected.value === ALL_JOBS) return employeeYearFilter.value;
  return employeeYearFilter.value.filter(({ job }) => job === jobFilterSelected.value);
});
const employeeFilter = computed(() => {
  const word = searchWord.value.toUpperCase().trim();
  return employeeJobFilter.value.filter((e) => SEARCH_FIELDS.some((f) => String(e[f] || "").toUpperCase().includes(word)));
});
const employeePerpage = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return employeeFilter.value.slice(start, start + perPage.value);
});

const validatePhoneNumber = (text) => /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(text);
// Tìm theo SĐT mà ra nhiều hơn 1 người -> cảnh báo trùng
const isShowStatus = computed(() => searchWord.value !== "" && validatePhoneNumber(searchWord.value) && employeePerpage.value.length > 1);

watch([employeeFilter, perPage], () => {
  currentPage.value = 1;
});

function pillClass(value) {
  const v = String(value || "").toLowerCase();
  if (v.includes("pass")) return "shortlist";
  if (v.includes("fail")) return "reject";
  return "hold";
}

const addEmployee = () => router.push("/add-employee");
const importExcel = () => router.push("/import-excel-employee");
const onEditEmployee = (employee) => router.push(`/edit-employee/${employee._id}`);
const onDetailEmployee = (employee) => router.push(`/detail-employee/${employee._id}`);

async function fetchAllEmployees() {
  isLoading.value = true;
  try {
    const { data } = await getALLEmployees();
    allEmployees.value = data || [];
  } catch {
    allEmployees.value = [];
  }
  isLoading.value = false;
}

async function fetchDataListJobs() {
  try {
    const { data } = await getAllJobs();
    dataListJobs.value = [{ _id: "all", jobName: ALL_JOBS }, ...(data || [])];
  } catch {
    /* giữ danh sách mặc định */
  }
}

function onDeleteEmployee(item) {
  isShowModalDelete.value = true;
  itemSelected.value = item._id;
}

async function confirmDeleteEmployee() {
  const status = await deleteEmployee(itemSelected.value);
  await fetchAllEmployees();
  isShowModalDelete.value = false;
  if (status === 200) {
    isShowModalSuccess.value = true;
    messageNoti.value = "Đã xóa ứng viên.";
  }
}

async function onCopy(text) {
  try {
    await copyText(text);
    copied.value = text;
    setTimeout(() => {
      if (copied.value === text) copied.value = "";
    }, 1500);
  } catch {
    /* bỏ qua nếu trình duyệt chặn clipboard */
  }
}

onMounted(async () => {
  await fetchAllEmployees();
  await fetchDataListJobs();
});
</script>

<style scoped>
.toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 14px 16px; }
.search-box { position: relative; flex: 1 1 280px; min-width: 220px; }
.search-box > i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
.search-box .form-control { padding-left: 38px; padding-right: 34px; }
.search-box .clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); border: 0; background: transparent; font-size: 20px; color: #9ca3af; line-height: 1; }
.filter { width: auto; min-width: 150px; max-width: 220px; }
.filter.small { min-width: 110px; }
.table-card { padding: 0; overflow: hidden; }
.emp-table th.num, .emp-table td.num { width: 52px; text-align: center; color: var(--c-muted); }
.emp-table th.actions, .emp-table td.actions { width: 124px; text-align: right; white-space: nowrap; }
.emp-table tbody tr { cursor: default; }
.person { display: flex; align-items: center; gap: 12px; min-width: 240px; }
.person .who { min-width: 0; }
.person .name { font-weight: 650; color: var(--c-text); cursor: pointer; }
.person .name:hover { color: var(--c-primary); }
.contact { display: flex; flex-wrap: wrap; gap: 2px 14px; font-size: 12.5px; color: var(--c-muted); }
.copyable { cursor: pointer; white-space: nowrap; }
.copyable i:first-child { margin-right: 5px; font-size: 11px; opacity: 0.7; }
.copyable:hover { color: var(--c-primary); }
.copyable .ok { color: var(--c-success); margin-left: 6px; }
.job { font-weight: 600; }
.nowrap { white-space: nowrap; }
.marks { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.table-pager { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; border-top: 1px solid var(--c-border); flex-wrap: wrap; }
</style>
