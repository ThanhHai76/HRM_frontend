<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Tracking ứng viên</h2>
          <p>{{ amountTotal }} ứng viên đang theo dõi<span v-if="probationaryEndList.length"> · <b class="text-warning">{{ probationaryEndList.length }} sắp hết thử việc</b></span></p>
        </div>
        <button class="btn btn-primary" @click="createTrack"><i class="fas fa-plus me-1"></i> Thêm tracking</button>
      </div>

      <div class="ui-card toolbar">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" class="form-control" v-model="searchWord" placeholder="Tìm theo tên, SĐT, email, job, người phỏng vấn…" />
          <button v-if="searchWord" class="clear" title="Xóa tìm kiếm" @click="searchWord = ''">&times;</button>
        </div>
        <select class="form-select filter" v-model="stageFilter">
          <option value="">Tất cả giai đoạn</option>
          <option value="upcoming">Sắp phỏng vấn</option>
          <option value="probation">Đang thử việc</option>
          <option value="ending">Sắp hết thử việc</option>
        </select>
      </div>

      <div class="ui-card table-card">
        <div v-if="isLoading" class="ui-empty"><span class="ui-spin"></span></div>
        <div v-else-if="!filteredTracks.length" class="ui-empty">
          <i class="fas fa-route"></i>
          {{ dataListTracks.length ? "Không có kết quả khớp bộ lọc." : "Chưa có ứng viên nào được theo dõi." }}
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Ứng viên</th>
                <th>Phỏng vấn</th>
                <th>Tiến trình</th>
                <th class="d-none d-lg-table-cell">Offer / Thử việc</th>
                <th class="actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredTracks" :key="item._id">
                <td>
                  <div class="person">
                    <span class="avatar-ini" :style="{ background: avatarColor(item.name) }">{{ initials(item.name) }}</span>
                    <div class="who">
                      <a class="name" @click="selected = item">{{ item.name || "(chưa có tên)" }}</a>
                      <div class="contact">
                        <span>{{ item.job || "—" }}</span>
                        <span v-if="item.phone"><i class="fas fa-phone-alt"></i>{{ item.phone }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="nowrap">
                    <i class="far fa-calendar me-1 text-muted"></i>{{ formatDatePicker(item.interviewDate) || "Chưa đặt lịch" }}
                    <small v-if="item.interviewTime" class="text-muted"> · {{ formatTime(item.interviewTime) }}</small>
                  </div>
                  <small class="text-muted">
                    <template v-if="item.interviewer">PV: {{ item.interviewer }}</template>
                    <template v-if="item.interviewRoom"> · {{ item.interviewRoom }}</template>
                  </small>
                </td>
                <td>
                  <div class="marks">
                    <span v-if="item.joinRound1Status" class="ui-pill" :class="tone(item.joinRound1Status)" title="Tham gia vòng 1">V1: {{ item.joinRound1Status }}</span>
                    <span v-if="item.joinRound2Status" class="ui-pill" :class="tone(item.joinRound2Status)" title="Tham gia vòng 2">V2: {{ item.joinRound2Status }}</span>
                    <span v-if="item.interviewResult" class="ui-pill" :class="tone(item.interviewResult)" title="Kết quả phỏng vấn">KQ: {{ item.interviewResult }}</span>
                    <span v-if="!item.joinRound1Status && !item.joinRound2Status && !item.interviewResult" class="ui-pill pending">Chưa có kết quả</span>
                  </div>
                </td>
                <td class="d-none d-lg-table-cell">
                  <span v-if="item.offerResult" class="ui-pill" :class="tone(item.offerResult)">Offer: {{ item.offerResult }}</span>
                  <div v-if="item.startWorkDate || item.probationaryEndDate" class="small text-muted mt-1">
                    <template v-if="item.startWorkDate">Đi làm {{ formatDatePicker(item.startWorkDate) }}</template><template v-if="item.startWorkDate && item.probationaryEndDate"> · </template>
                    <template v-if="item.probationaryEndDate">hết thử việc {{ formatDatePicker(item.probationaryEndDate) }}</template>
                  </div>
                  <span v-if="daysToEnd(item) !== null" class="ui-pill hold mt-1">Còn {{ daysToEnd(item) }} ngày thử việc</span>
                </td>
                <td class="actions">
                  <button class="icon-btn" title="Chi tiết" @click="selected = item"><i class="fas fa-eye"></i></button>
                  <button class="icon-btn" title="Sửa" @click="onEditTrack(item)"><i class="fas fa-pen"></i></button>
                  <button class="icon-btn danger" title="Xóa" @click="onDeleteTrack(item)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Chi tiết -->
      <template v-if="selected">
        <div class="ui-drawer-mask" @click="selected = null"></div>
        <aside class="ui-drawer">
          <button class="close" @click="selected = null"><i class="fas fa-times"></i></button>
          <div class="person mb-3">
            <span class="avatar-ini" :style="{ background: avatarColor(selected.name) }">{{ initials(selected.name) }}</span>
            <div>
              <h4 class="mb-0">{{ selected.name }}</h4>
              <div class="text-muted">{{ selected.job }}</div>
            </div>
          </div>
          <div v-for="group in detailGroups" :key="group.title" class="mb-3">
            <h6>{{ group.title }}</h6>
            <dl class="kv">
              <div v-for="row in group.rows" :key="row.label" class="kv-row">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value(selected) || "—" }}</dd>
              </div>
            </dl>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" @click="onEditTrack(selected)">Chỉnh sửa</button>
            <button class="btn btn-outline-secondary text-danger" @click="onDeleteTrack(selected)">Xóa</button>
          </div>
        </aside>
      </template>

      <b-modal centered title="Xóa tracking" v-model="isShowModalDeleteJob" @ok="confirmDeleteTrack" ok-title="Xóa" ok-variant="danger" cancel-title="Hủy">
        <p>Bạn có chắc muốn xóa ứng viên này khỏi danh sách theo dõi?</p>
      </b-modal>
      <b-modal centered title="Thông báo" v-model="isShowModalSuccess" ok-only ok-title="Đóng">
        <p>{{ messageNoti }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { deleteTrack, getAllTracks } from "@/services/track-service";
import { useTrackingStore } from "@/stores/tracking";
import { avatarColor, initials } from "@/utils/avatar";
import { formatDate as formatDatePicker, formatDateTime, formatTime } from "@/utils/format";

const DAY = 24 * 60 * 60 * 1000;

const router = useRouter();
const trackingStore = useTrackingStore();

const dataListTracks = ref([]);
const isLoading = ref(true);
const isShowModalSuccess = ref(false);
const messageNoti = ref("");
const selectedTrack = ref("");
const isShowModalDeleteJob = ref(false);
const searchWord = ref("");
const stageFilter = ref("");
const selected = ref(null);

const detailGroups = [
  {
    title: "Thông tin",
    rows: [
      { label: "Ngày về/nhập CV", value: (t) => formatDatePicker(t.cvDate) },
      { label: "SĐT", value: (t) => t.phone },
      { label: "Email", value: (t) => t.email },
      { label: "Link CV", value: (t) => t.linkCV },
    ],
  },
  {
    title: "Phỏng vấn",
    rows: [
      { label: "Ngày PV", value: (t) => formatDatePicker(t.interviewDate) },
      { label: "Giờ PV vòng 1", value: (t) => formatDateTime(t.interviewTime) },
      { label: "Người PV", value: (t) => t.interviewer },
      { label: "Phòng PV", value: (t) => t.interviewRoom },
      { label: "Team", value: (t) => t.team },
      { label: "Đổi giờ PV", value: (t) => t.interviewTimeChange },
      { label: "Tham gia vòng 1", value: (t) => t.joinRound1Status },
      { label: "Test / PV vòng 2", value: (t) => t.testInterviewRound2 },
      { label: "Tham gia vòng 2", value: (t) => t.joinRound2Status },
      { label: "Đánh giá", value: (t) => t.evaluation },
      { label: "Kết quả PV", value: (t) => t.interviewResult },
      { label: "Ngày chốt KQ", value: (t) => formatDatePicker(t.interviewResultClosingDate) },
    ],
  },
  {
    title: "Offer và thử việc",
    rows: [
      { label: "Kết quả offer", value: (t) => t.offerResult },
      { label: "Lương chính thức", value: (t) => t.officialSalary },
      { label: "Lương thử việc", value: (t) => t.probationarySalary },
      { label: "Ngày bắt đầu", value: (t) => formatDatePicker(t.startWorkDate) },
      { label: "Thời gian thử việc", value: (t) => t.probationaryTime },
      { label: "Ngày hết thử việc", value: (t) => formatDatePicker(t.probationaryEndDate) },
      { label: "Mail thông báo", value: (t) => t.sendMail },
      { label: "Tình trạng thử việc", value: (t) => t.probationStatus },
      { label: "Cập nhật tình trạng", value: (t) => t.statusUpdate },
    ],
  },
];

// Số ngày còn lại nếu thử việc kết thúc trong 5 ngày tới, ngược lại null
function daysToEnd(item) {
  if (!item.probationaryEndDate) return null;
  const diff = new Date(item.probationaryEndDate).getTime() - Date.now();
  if (diff < 0 || diff > 5 * DAY) return null;
  return Math.ceil(diff / DAY);
}

// Giá trị trạng thái là chữ tự do -> chọn màu theo từ khóa
function tone(value) {
  const v = String(value || "").toLowerCase();
  if (/(pass|đạt|đến|yes|đồng ý|đi làm|ok)/.test(v) && !/không|fail|no\b/.test(v)) return "shortlist";
  if (/(fail|không|từ chối|nghỉ|no\b|hủy|huỷ)/.test(v)) return "reject";
  return "hold";
}

const amountTotal = computed(() => dataListTracks.value.length);
const probationaryEndList = computed(() => dataListTracks.value.filter((item) => daysToEnd(item) !== null));
const filteredTracks = computed(() => {
  const q = searchWord.value.trim().toLowerCase();
  const now = Date.now();
  return dataListTracks.value.filter((t) => {
    if (q && !["name", "phone", "email", "job", "interviewer", "team"].some((k) => String(t[k] || "").toLowerCase().includes(q))) return false;
    if (stageFilter.value === "upcoming") return t.interviewDate && new Date(t.interviewDate).getTime() >= now - DAY;
    if (stageFilter.value === "probation") return t.probationaryEndDate && new Date(t.probationaryEndDate).getTime() >= now;
    if (stageFilter.value === "ending") return daysToEnd(t) !== null;
    return true;
  });
});

async function fetchDataListTrack() {
  isLoading.value = true;
  try {
    const { data } = await getAllTracks();
    dataListTracks.value = data || [];
    trackingStore.setList(dataListTracks.value);
  } catch {
    dataListTracks.value = [];
  }
  isLoading.value = false;
}

const createTrack = () => router.push("/add-tracking-candidate");
const onEditTrack = (item) => router.push(`/edit-tracking-candidate/${item._id}`);

function onDeleteTrack(item) {
  selected.value = null;
  isShowModalDeleteJob.value = true;
  selectedTrack.value = item._id;
}

async function confirmDeleteTrack() {
  const status = await deleteTrack(selectedTrack.value);
  isShowModalDeleteJob.value = false;
  if (status === 200) {
    isShowModalSuccess.value = true;
    messageNoti.value = "Đã xóa khỏi danh sách theo dõi.";
  }
  await fetchDataListTrack();
}

onMounted(fetchDataListTrack);
</script>

<style scoped>
.toolbar { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 14px 16px; }
.search-box { position: relative; flex: 1 1 280px; min-width: 220px; }
.search-box > i { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
.search-box .form-control { padding-left: 38px; padding-right: 34px; }
.search-box .clear { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); border: 0; background: transparent; font-size: 20px; color: #9ca3af; line-height: 1; }
.filter { width: auto; min-width: 180px; }
.table-card { padding: 0; overflow: hidden; }
th.actions, td.actions { width: 124px; text-align: right; white-space: nowrap; }
.person { display: flex; align-items: center; gap: 12px; min-width: 220px; }
.person .name { font-weight: 650; color: var(--c-text); cursor: pointer; }
.person .name:hover { color: var(--c-primary); }
.contact { display: flex; flex-wrap: wrap; gap: 2px 14px; font-size: 12.5px; color: var(--c-muted); }
.contact i { margin-right: 5px; font-size: 11px; opacity: 0.7; }
.kv { margin: 0; font-size: 13.5px; }
.kv-row { display: grid; grid-template-columns: 150px 1fr; gap: 12px; padding: 5px 0; border-bottom: 1px dashed var(--c-border); }
.kv-row dt { color: var(--c-muted); font-weight: 600; }
.kv-row dd { margin: 0; word-break: break-word; }
.nowrap { white-space: nowrap; }
.marks { display: flex; gap: 6px; flex-wrap: wrap; }
</style>
