<template>
  <div class="page-wrapper">
    <div class="ui-page dash">
      <!-- Lời chào + hành động nhanh -->
      <div class="ui-page-head">
        <div>
          <h2>{{ greeting }}, {{ firstName }} 👋</h2>
          <p>{{ todayText }} · Tổng quan hoạt động tuyển dụng</p>
        </div>
        <div class="d-flex gap-2 flex-wrap align-items-center">
          <select class="form-select year-select" v-model="yearFilter" title="Phạm vi thời gian">
            <option value="all">Tất cả năm</option>
            <option v-for="y in yearOptions" :key="y" :value="y">Năm {{ y }}</option>
          </select>
          <button class="btn btn-outline-secondary" @click="$router.push('/mail-cv')"><i class="fas fa-envelope-open-text me-1"></i> Hộp thư CV</button>
          <button class="btn btn-primary" @click="$router.push('/add-employee')"><i class="fas fa-plus me-1"></i> Thêm ứng viên</button>
        </div>
      </div>

      <div v-if="isLoading" class="ui-card ui-empty"><span class="ui-spin"></span></div>

      <template v-else>
        <!-- Việc cần xử lý -->
        <div v-if="pendingMail > 0" class="ui-notice info alert-click" @click="$router.push('/mail-cv')">
          <i class="fas fa-inbox"></i>
          <div><b>{{ pendingMail }} CV từ email</b> đang chờ bạn duyệt. <span class="link">Xem ngay →</span></div>
        </div>

        <!-- Thẻ chỉ số -->
        <div class="kpis">
          <div class="kpi" v-for="k in kpis" :key="k.label" :class="k.tone">
            <span class="ico"><i :class="k.icon"></i></span>
            <div class="body">
              <small>{{ k.label }}</small>
              <b>{{ k.value }}</b>
              <em v-if="k.hint">{{ k.hint }}</em>
            </div>
          </div>
        </div>

        <div v-if="!scoped.length" class="ui-card ui-empty">
          <i class="fas fa-chart-line"></i>
          Chưa có dữ liệu trong phạm vi này. Hãy thêm ứng viên, nhập từ Excel hoặc đồng bộ từ Google Sheet.
        </div>

        <template v-else>
          <div class="dash-grid">
            <!-- CV theo thời gian -->
            <div class="ui-card span-7">
              <div class="card-head">
                <h5><i class="fas fa-chart-bar"></i> {{ yearFilter === "all" ? "CV theo năm" : `CV về theo tháng (${yearFilter})` }}</h5>
                <small class="text-muted">{{ trendTotal }} CV · {{ trendPass }} đạt chấm</small>
              </div>
              <div class="chart-box"><canvas ref="trendChart"></canvas></div>
            </div>

            <!-- Phễu tuyển dụng -->
            <div class="ui-card span-5">
              <div class="card-head">
                <h5><i class="fas fa-filter"></i> Phễu tuyển dụng</h5>
                <small class="text-muted">{{ yearFilter === "all" ? "Tất cả năm" : "Năm " + yearFilter }}</small>
              </div>
              <div class="funnel">
                <div v-for="(st, i) in funnel" :key="st.label" class="seg-wrap">
                  <div class="seg" :class="{ empty: !st.count }" :style="{ clipPath: st.clip, background: st.color }" :title="st.label + ': ' + st.count">
                    <span class="seg-label">{{ st.label }}</span>
                    <b>{{ st.count }}</b>
                  </div>
                  <span v-if="i < funnel.length - 1" class="seg-rate" :title="'Tỷ lệ chuyển từ \'' + st.label + '\' sang \'' + funnel[i + 1].label + '\''">
                    <i class="fas fa-caret-down"></i> {{ funnel[i + 1].rate }}%
                  </span>
                </div>
              </div>
              <div class="funnel-sum">
                <span>Từ CV về đến đi làm</span>
                <b>{{ overallRate }}%</b>
              </div>
              <small class="text-muted d-block mt-2">Độ rộng mỗi tầng chỉ mang tính minh họa; số liệu thật nằm ở con số trên từng tầng.</small>
            </div>

            <!-- Nguồn ứng viên -->
            <div class="ui-card span-4">
              <div class="card-head"><h5><i class="fas fa-bullseye"></i> Nguồn ứng viên</h5></div>
              <div v-if="sources.length" class="src-wrap">
                <div class="doughnut"><canvas ref="sourceChart"></canvas></div>
                <ul class="legend">
                  <li v-for="(s, i) in sources" :key="s.label"><i :style="{ background: palette[i % palette.length] }"></i>{{ s.label }}<b>{{ s.count }}</b></li>
                </ul>
              </div>
              <div v-else class="text-muted small">Chưa có thông tin nguồn.</div>
            </div>

            <!-- Vị trí nhiều CV -->
            <div class="ui-card span-4">
              <div class="card-head"><h5><i class="fas fa-briefcase"></i> Vị trí nhiều CV nhất</h5></div>
              <div v-for="j in topJobs" :key="j.label" class="rank">
                <div class="stage-top"><span class="ellip" :title="j.label">{{ j.label }}</span><b>{{ j.count }}</b></div>
                <div class="bar"><span :style="{ width: j.width + '%' }"></span></div>
              </div>
              <div v-if="!topJobs.length" class="text-muted small">Chưa có thông tin vị trí.</div>
            </div>

            <!-- Lịch & nhắc việc -->
            <div class="ui-card span-4">
              <div class="card-head"><h5><i class="fas fa-calendar-check"></i> Sắp phỏng vấn</h5>
                <a class="link small" @click="$router.push('/tracking-candidates')">Tất cả</a></div>
              <div v-for="t in upcoming" :key="t._id" class="row-item" @click="$router.push('/tracking-candidates')">
                <span class="date"><b>{{ dayOf(t.interviewDate) }}</b><small>Th {{ monthOf(t.interviewDate) }}</small></span>
                <div class="grow">
                  <div class="nm">{{ t.name }}</div>
                  <small class="text-muted">{{ t.job || "—" }}<template v-if="t.interviewer"> · PV: {{ t.interviewer }}</template></small>
                </div>
              </div>
              <div v-if="!upcoming.length" class="text-muted small">Không có lịch phỏng vấn sắp tới.</div>

              <template v-if="probationEnding.length">
                <h6 class="sub">Sắp hết thử việc</h6>
                <div v-for="t in probationEnding" :key="'p' + t._id" class="row-item" @click="$router.push('/tracking-candidates')">
                  <span class="date warn"><b>{{ daysLeft(t) }}</b><small>ngày</small></span>
                  <div class="grow"><div class="nm">{{ t.name }}</div><small class="text-muted">{{ t.job || "—" }}</small></div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import { getALLEmployeesCVHome } from "@/services/employee-service";
import { getAllTracks } from "@/services/track-service";
import { getAllJobs } from "@/services/job-service";
import { getMailConfig } from "@/services/mailcv-service";
import { useAuthStore } from "@/stores/auth";
import { currentYear, yearsFromDates, yearOf } from "@/utils/years";
import { dayOf, formatWeekdayDate, monthOf, startOfToday } from "@/utils/format";

const PALETTE = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];
const STAGE_COLORS = ["#6366f1", "#818cf8", "#0ea5e9", "#14b8a6", "#10b981", "#059669"];
const DAY = 24 * 60 * 60 * 1000;
const isPass = (v) => /pass/i.test(String(v || ""));
const monthOfCv = (cvDate) => {
  const m = /^\s*\d{1,2}\/(\d{1,2})\/\d{4}/.exec(String(cvDate || ""));
  return m ? Number(m[1]) : null;
};

const auth = useAuthStore();
const palette = PALETTE;

const isLoading = ref(true);
const employees = ref([]);
const tracks = ref([]);
const jobsCount = ref(0);
const pendingMail = ref(0);
const yearFilter = ref("all");
const trendChart = ref(null);
const sourceChart = ref(null);

const firstName = computed(() => {
  const name = String((auth.user && auth.user.userName) || "");
  return name.trim().split(/\s+/).pop() || "bạn";
});
const greeting = computed(() => {
  const h = new Date().getHours();
  return h < 11 ? "Chào buổi sáng" : h < 14 ? "Chào buổi trưa" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối";
});
const todayText = computed(() => formatWeekdayDate());
const yearOptions = computed(() => yearsFromDates(employees.value).reverse());

const scoped = computed(() => {
  if (yearFilter.value === "all") return employees.value;
  return employees.value.filter((e) => yearOf(e.cvDate) === yearFilter.value);
});

const kpis = computed(() => {
  const sc = scoped.value;
  const total = sc.length;
  const pass = sc.filter((e) => isPass(e.partMark)).length;
  const goWork = sc.filter((e) => /đi làm/i.test(e.goWork || "")).length;
  const interviewed = sc.filter((e) => /đến/i.test(e.joinRound1 || "")).length;
  return [
    { label: "Ứng viên", value: total, icon: "fas fa-users", tone: "t1", hint: yearFilter.value === "all" ? "Toàn bộ" : `Năm ${yearFilter.value}` },
    { label: "Đạt vòng chấm CV", value: pass, icon: "fas fa-check-circle", tone: "t2", hint: total ? `${Math.round((pass / total) * 100)}% tổng CV` : "" },
    { label: "Đã phỏng vấn", value: interviewed, icon: "fas fa-comments", tone: "t3", hint: pass ? `${Math.round((interviewed / pass) * 100)}% số đạt chấm` : "" },
    { label: "Đã đi làm", value: goWork, icon: "fas fa-user-check", tone: "t4", hint: total ? `${((goWork / total) * 100).toFixed(1)}% tổng CV` : "" },
    { label: "Vị trí đang tuyển", value: jobsCount.value, icon: "fas fa-briefcase", tone: "t5", hint: "Trong List Order Job" },
  ];
});

const funnel = computed(() => {
  const sc = scoped.value;
  const stages = [
    { label: "CV về", count: sc.length },
    { label: "Đạt chấm CV", count: sc.filter((e) => isPass(e.partMark)).length },
    { label: "Đến phỏng vấn", count: sc.filter((e) => /đến/i.test(e.joinRound1 || "")).length },
    { label: "Đạt phỏng vấn", count: sc.filter((e) => isPass(e.interviewV1)).length },
    { label: "Đi làm", count: sc.filter((e) => /đi làm/i.test(e.goWork || "")).length },
    { label: "Đạt thử việc", count: sc.filter((e) => isPass(e.probationResult)).length },
  ];
  // Phễu thu hẹp đều từ 100% xuống 38% bề rộng; mỗi tầng là hình thang nối với tầng kế tiếp
  const n = stages.length;
  const widthAt = (i) => 100 - i * (62 / (n - 1));
  return stages.map((st, i) => {
    const top = widthAt(i);
    const bottom = i < n - 1 ? widthAt(i + 1) : top * 0.82;
    const l1 = (100 - top) / 2;
    const l2 = (100 - bottom) / 2;
    return {
      ...st,
      color: STAGE_COLORS[i],
      clip: `polygon(${l1}% 0, ${100 - l1}% 0, ${100 - l2}% 100%, ${l2}% 100%)`,
      rate: i === 0 ? 100 : stages[i - 1].count ? Math.round((st.count / stages[i - 1].count) * 100) : 0,
    };
  });
});

const overallRate = computed(() => {
  const total = scoped.value.length;
  const work = funnel.value.length ? funnel.value[4].count : 0;
  return total ? ((work / total) * 100).toFixed(1) : "0";
});

const trend = computed(() => {
  const all = employees.value;
  if (yearFilter.value === "all") {
    const years = yearsFromDates(all).filter((y) => all.some((e) => yearOf(e.cvDate) === y));
    return {
      labels: years,
      cv: years.map((y) => all.filter((e) => yearOf(e.cvDate) === y).length),
      pass: years.map((y) => all.filter((e) => yearOf(e.cvDate) === y && isPass(e.partMark)).length),
    };
  }
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  return {
    labels: months.map((m) => `T${m}`),
    cv: months.map((m) => scoped.value.filter((e) => monthOfCv(e.cvDate) === m).length),
    pass: months.map((m) => scoped.value.filter((e) => monthOfCv(e.cvDate) === m && isPass(e.partMark)).length),
  };
});
const trendTotal = computed(() => trend.value.cv.reduce((a, b) => a + b, 0));
const trendPass = computed(() => trend.value.pass.reduce((a, b) => a + b, 0));

// Đếm theo một trường, sắp xếp giảm dần
const countBy = (key) => {
  const map = {};
  scoped.value.forEach((e) => {
    const k = String(e[key] || "").trim();
    if (k) map[k] = (map[k] || 0) + 1;
  });
  return Object.entries(map).map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count);
};

const sources = computed(() => {
  const list = countBy("source");
  const top = list.slice(0, 5);
  const rest = list.slice(5).reduce((a, b) => a + b.count, 0);
  return rest ? [...top, { label: "Khác", count: rest }] : top;
});

const topJobs = computed(() => {
  const list = countBy("job").slice(0, 6);
  const max = Math.max(1, list.length ? list[0].count : 1);
  return list.map((j) => ({ ...j, width: Math.round((j.count / max) * 100) }));
});

function daysLeft(t) {
  if (!t.probationaryEndDate) return null;
  const diff = new Date(t.probationaryEndDate).getTime() - Date.now();
  return diff < 0 || diff > 7 * DAY ? null : Math.ceil(diff / DAY);
}

const upcoming = computed(() => {
  const start = startOfToday();
  return tracks.value
    .filter((t) => t.interviewDate && new Date(t.interviewDate).getTime() >= start)
    .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
    .slice(0, 5);
});
const probationEnding = computed(() => tracks.value.filter((t) => daysLeft(t) !== null).slice(0, 4));

// ---------- Biểu đồ ----------
function destroyCharts() {
  [trendChart.value, sourceChart.value].forEach((el) => {
    const chart = el && Chart.getChart(el);
    if (chart) chart.destroy();
  });
}

function drawCharts() {
  destroyCharts();
  const grid = { color: "#eef0f4" };
  if (trendChart.value) {
    new Chart(trendChart.value, {
      type: "bar",
      data: {
        labels: trend.value.labels,
        datasets: [
          { label: "CV về", data: trend.value.cv, backgroundColor: "#c7d2fe", borderRadius: 6, maxBarThickness: 34 },
          { label: "Đạt chấm CV", data: trend.value.pass, type: "line", borderColor: "#10b981", backgroundColor: "#10b981", tension: 0.35, pointRadius: 3, borderWidth: 2 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 }, grid }, x: { grid: { display: false } } },
      },
    });
  }
  if (sourceChart.value && sources.value.length) {
    new Chart(sourceChart.value, {
      type: "doughnut",
      data: { labels: sources.value.map((s) => s.label), datasets: [{ data: sources.value.map((s) => s.count), backgroundColor: PALETTE, borderWidth: 2, borderColor: "#fff" }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: "68%", plugins: { legend: { display: false } } },
    });
  }
}

// Vẽ lại biểu đồ khi đổi phạm vi thời gian
watch(yearFilter, () => nextTick(drawCharts));

onMounted(async () => {
  const [emps, trk, jobs, mail] = await Promise.allSettled([getALLEmployeesCVHome(), getAllTracks(), getAllJobs(), getMailConfig()]);
  employees.value = (emps.status === "fulfilled" && emps.value && emps.value.data) || [];
  tracks.value = (trk.status === "fulfilled" && trk.value && trk.value.data) || [];
  jobsCount.value = ((jobs.status === "fulfilled" && jobs.value && jobs.value.data) || []).length;
  pendingMail.value = mail.status === "fulfilled" && mail.value.ok ? mail.value.data.pendingCount || 0 : 0;

  // Mặc định: năm hiện tại nếu có dữ liệu, ngược lại tất cả
  const cur = currentYear();
  yearFilter.value = employees.value.some((e) => yearOf(e.cvDate) === cur) ? cur : "all";
  isLoading.value = false;
  nextTick(drawCharts);
});

onBeforeUnmount(destroyCharts);
</script>

<style scoped>
.year-select { width: auto; min-width: 140px; }
.alert-click { cursor: pointer; }
.link { color: var(--c-primary); cursor: pointer; font-weight: 600; }

.kpis { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; margin-bottom: 20px; }
.kpi { display: flex; gap: 14px; align-items: center; background: #fff; border: 1px solid var(--c-border); border-radius: var(--radius); padding: 16px; box-shadow: var(--shadow-sm); }
.kpi .ico { width: 46px; height: 46px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 19px; flex: none; }
.kpi small { color: var(--c-muted); font-weight: 600; display: block; }
.kpi b { font-size: 26px; line-height: 1.15; display: block; }
.kpi em { font-style: normal; font-size: 12px; color: var(--c-muted); }
.t1 .ico { background: var(--c-primary-50); color: var(--c-primary); }
.t2 .ico { background: var(--c-success-50); color: var(--c-success); }
.t3 .ico { background: #e0f2fe; color: #0284c7; }
.t4 .ico { background: #ccfbf1; color: #0f766e; }
.t5 .ico { background: var(--c-warning-50); color: var(--c-warning); }

.dash-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 20px; }
.dash-grid > .ui-card { margin-bottom: 0; }
.span-7 { grid-column: span 7; }
.span-5 { grid-column: span 5; }
.span-4 { grid-column: span 4; }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; gap: 8px; }
.card-head h5 { margin: 0; }
.span-7 { display: flex; flex-direction: column; }
.chart-box { height: 300px; position: relative; }
.span-7 .chart-box { flex: 1 1 auto; min-height: 300px; height: auto; }

.funnel { padding: 4px 0 2px; }
.seg-wrap { position: relative; margin-bottom: 14px; }
.seg-wrap:last-child { margin-bottom: 0; }
.seg { height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; text-align: center; line-height: 1.15; transition: filter 0.15s; }
.seg:hover { filter: brightness(1.08); }
.seg.empty { opacity: 0.45; }
.seg-label { font-size: 12px; font-weight: 600; opacity: 0.95; padding: 0 8px; white-space: nowrap; }
.seg b { font-size: 19px; }
.seg-rate { position: absolute; left: 50%; bottom: -12px; transform: translateX(-50%); z-index: 2; background: #fff; border: 1px solid var(--c-border); border-radius: 999px; padding: 0 9px; font-size: 11.5px; font-weight: 700; color: var(--c-muted); line-height: 20px; box-shadow: var(--shadow-sm); white-space: nowrap; }
.seg-rate i { color: var(--c-primary); margin-right: 2px; }
.funnel-sum { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; padding: 10px 14px; background: var(--c-success-50); color: #047857; border-radius: 10px; font-weight: 600; }
.funnel-sum b { font-size: 18px; }
.stage { margin-bottom: 12px; }
.stage-top { display: flex; justify-content: space-between; gap: 8px; font-size: 13.5px; margin-bottom: 5px; }
.bar { height: 9px; border-radius: 99px; background: #eef0f4; overflow: hidden; }
.bar > span { display: block; height: 100%; border-radius: 99px; background: var(--c-primary); transition: width 0.4s ease; }
.rank { margin-bottom: 12px; }
.ellip { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 75%; }

.src-wrap { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.doughnut { width: 150px; height: 150px; position: relative; flex: none; }
.legend { list-style: none; margin: 0; padding: 0; flex: 1; min-width: 130px; font-size: 13.5px; }
.legend li { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.legend li b { margin-left: auto; }
.legend i { width: 10px; height: 10px; border-radius: 50%; flex: none; }

.row-item { display: flex; align-items: center; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--c-border); cursor: pointer; }
.row-item:last-child { border-bottom: 0; }
.row-item .grow { min-width: 0; }
.row-item .nm { font-weight: 650; }
.date { width: 46px; height: 50px; border-radius: 10px; background: var(--c-primary-50); color: var(--c-primary); display: inline-flex; flex-direction: column; align-items: center; justify-content: center; flex: none; line-height: 1.1; }
.date b { font-size: 18px; }
.date small { font-size: 10.5px; font-weight: 600; }
.date.warn { background: var(--c-warning-50); color: var(--c-warning); }
.sub { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--c-muted); margin: 16px 0 4px; }

@media (max-width: 1399.98px) { .kpis { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 1199.98px) { .span-7, .span-5 { grid-column: span 12; } .span-4 { grid-column: span 6; } }
@media (max-width: 767.98px) { .seg { height: 50px; } .kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); } .span-4 { grid-column: span 12; } .kpi b { font-size: 22px; } }
</style>
