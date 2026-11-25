<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>So khớp & xếp hạng ứng viên</h2>
          <p>AI chấm điểm gợi ý theo yêu cầu vị trí. Quyết định cuối cùng luôn thuộc về nhân sự.</p>
        </div>
        <div style="min-width: 280px">
          <select class="form-select" v-model="jobId" @change="loadRankings">
            <option value="">— Chọn vị trí —</option>
            <option v-for="j in jobs" :key="j._id" :value="j._id">{{ j.jobName }}</option>
          </select>
        </div>
      </div>

      <div class="ui-notice warn">
        <i class="fas fa-balance-scale"></i>
        <div>
          Điểm số chỉ là <b>gợi ý</b>, không tự động loại hay chọn ứng viên. Mỗi quyết định cần có lý do và được lưu lại
          cùng người duyệt. AI không nhìn thấy tên, tuổi, giới tính, quê quán, tên trường hay tên công ty cũ của ứng viên.
        </div>
      </div>

      <div v-if="!jobId" class="ui-card ui-empty">
        <i class="fas fa-trophy"></i>Chọn một vị trí để xem bảng xếp hạng.
      </div>

      <template v-else>
        <div v-if="selectedJob && !jobHasRequirements" class="ui-notice error">
          <i class="fas fa-exclamation-triangle"></i>
          <div>
            Vị trí này chưa có yêu cầu có cấu trúc, kết quả so khớp sẽ kém chính xác.
            <router-link to="/ai/job-requirements">Thiết lập yêu cầu →</router-link>
          </div>
        </div>

        <div class="ui-tabs">
          <button :class="{ active: tab === 'ranking' }" @click="tab = 'ranking'">Xếp hạng</button>
          <button v-if="isAdmin" :class="{ active: tab === 'fairness' }" @click="openFairness">Báo cáo công bằng</button>
        </div>

        <!-- ========== Xếp hạng ========== -->
        <template v-if="tab === 'ranking'">
          <div v-if="canReview" class="ui-card">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 class="mb-0"><i class="fas fa-user-plus"></i> Thêm ứng viên để so khớp</h5>
              <button class="btn btn-outline-secondary btn-sm" @click="showAdd = !showAdd">
                {{ showAdd ? "Thu gọn" : "Mở danh sách" }}
              </button>
            </div>
            <div v-if="showAdd" class="mt-3">
              <input class="form-control mb-2" placeholder="Tìm theo tên, SĐT..." v-model="search" />
              <div class="cand-list">
                <label v-for="e in candidates" :key="e._id" class="cand">
                  <input type="checkbox" :value="e._id" v-model="picked" />
                  <span><b>{{ e.name }}</b> <small class="text-muted">{{ e.phone }} {{ e.job ? "· " + e.job : "" }}</small></span>
                </label>
                <div v-if="!candidates.length" class="text-muted p-2">
                  Không có ứng viên khả dụng. Ứng viên cần có hồ sơ từ trang
                  <router-link to="/ai/cv-analysis">Phân tích CV</router-link>.
                </div>
              </div>
              <button class="btn btn-primary mt-3" :disabled="!picked.length || running" @click="runMatching">
                <span v-if="running" class="ui-spin me-2"></span>
                {{ running ? `Đang chấm ${progress}/${picked.length}...` : `So khớp ${picked.length} ứng viên` }}
              </button>
              <div v-if="runErrors.length" class="ui-notice error mt-3 mb-0">
                <i class="fas fa-exclamation-triangle"></i>
                <div><div v-for="(m, i) in runErrors" :key="i">{{ m }}</div></div>
              </div>
            </div>
          </div>

          <div class="ui-card" style="padding: 0; overflow: hidden">
            <div v-if="loading" class="ui-empty"><span class="ui-spin"></span></div>
            <div v-else-if="!rows.length" class="ui-empty">
              <i class="fas fa-inbox"></i>Chưa có ứng viên nào được so khớp cho vị trí này.
            </div>
            <div v-else class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th style="width: 50px">#</th>
                    <th>Ứng viên</th>
                    <th>Điểm gợi ý</th>
                    <th>Thiếu kỹ năng bắt buộc</th>
                    <th>Độ tin cậy</th>
                    <th>Quyết định của nhân sự</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(r, i) in rows" :key="r.matchId" class="clickable" @click="open(r)">
                    <td>{{ i + 1 }}</td>
                    <td>
                      <b>{{ r.employee ? r.employee.name : "(đã xóa)" }}</b><br />
                      <small class="text-muted">{{ r.employee && r.employee.phone }}</small>
                    </td>
                    <td>
                      <div class="ui-score">
                        <div class="bar"><span :class="scoreClass(r.suggestedScore)" :style="{ width: r.suggestedScore + '%' }"></span></div>
                        <b>{{ r.suggestedScore }}</b>
                      </div>
                    </td>
                    <td>
                      <span v-for="s in (r.missingMustHave || []).slice(0, 3)" :key="s" class="ui-chip miss">{{ s }}</span>
                      <span v-if="(r.missingMustHave || []).length > 3" class="text-muted">+{{ r.missingMustHave.length - 3 }}</span>
                      <span v-if="!(r.missingMustHave || []).length" class="text-muted">—</span>
                    </td>
                    <td><span class="ui-pill" :class="r.confidence">{{ confidenceLabel(r.confidence) }}</span></td>
                    <td>
                      <span class="ui-pill" :class="r.humanDecision ? r.humanDecision.decision : 'pending'">
                        {{ r.humanDecision ? decisionLabel(r.humanDecision.decision) : "Chờ duyệt" }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

        <!-- ========== Báo cáo công bằng ========== -->
        <template v-else>
          <div class="ui-card">
            <h5><i class="fas fa-balance-scale"></i> Điểm theo nhóm tuổi (chỉ dùng để kiểm toán)</h5>
            <p class="text-muted">Năm sinh <b>không</b> được đưa vào AI. Báo cáo này giúp phát hiện sự chênh lệch bất thường để rà soát lại tiêu chí.</p>
            <div v-if="fairness && fairness.warning" class="ui-notice error">
              <i class="fas fa-exclamation-triangle"></i><div>{{ fairness.warning }}</div>
            </div>
            <div v-else-if="fairness" class="ui-notice info">
              <i class="fas fa-check-circle"></i><div>Chưa phát hiện chênh lệch đáng kể giữa các nhóm đủ lớn.</div>
            </div>
            <table v-if="fairness && fairness.data.length" class="table">
              <thead><tr><th>Nhóm tuổi</th><th>Số ứng viên</th><th>Điểm TB</th><th>Tỷ lệ được chọn</th></tr></thead>
              <tbody>
                <tr v-for="g in fairness.data" :key="g.ageBucket">
                  <td>{{ g.ageBucket === "unknown" ? "Không rõ" : g.ageBucket }}</td>
                  <td>{{ g.count }}{{ g.count < 5 ? " (chưa đủ mẫu)" : "" }}</td>
                  <td>{{ g.avgSuggestedScore }}</td>
                  <td>{{ g.shortlistRate }}%</td>
                </tr>
              </tbody>
            </table>
            <div v-else-if="fairness" class="text-muted">Chưa có dữ liệu.</div>
            <small v-if="fairness" class="text-muted">{{ fairness.note }}</small>
          </div>
        </template>
      </template>
    </div>

    <!-- ========== Chi tiết & duyệt ========== -->
    <template v-if="current">
      <div class="ui-drawer-mask" @click="current = null"></div>
      <aside class="ui-drawer">
        <button class="close" @click="current = null"><i class="fas fa-times"></i></button>
        <h4 class="mb-1">{{ current.employee ? current.employee.name : "Ứng viên" }}</h4>
        <p class="text-muted">{{ current.employee && current.employee.phone }} {{ current.employee && current.employee.email }}</p>

        <div class="score-row">
          <div class="score-box"><small>Điểm gợi ý</small><b>{{ current.suggestedScore }}</b></div>
          <div class="score-box"><small>Theo luật</small><b>{{ current.ruleScore == null ? "—" : current.ruleScore }}</b></div>
          <div class="score-box"><small>AI ngữ nghĩa</small><b>{{ current.semanticScore }}</b></div>
        </div>

        <div class="ui-notice info">
          <i class="fas fa-info-circle"></i>
          <div>{{ current.summary }}</div>
        </div>

        <h6 class="mt-3">Theo yêu cầu bắt buộc</h6>
        <div v-if="current.breakdown">
          <span v-for="s in current.breakdown.matchedMustHave" :key="'m' + s" class="ui-chip ok">✓ {{ s }}</span>
          <span v-for="s in current.breakdown.missingMustHave" :key="'x' + s" class="ui-chip miss">✗ {{ s }}</span>
          <div class="text-muted small mt-1">
            Kinh nghiệm: {{ current.breakdown.candidateYears }} năm / yêu cầu {{ current.breakdown.requiredYears || 0 }} năm
          </div>
        </div>

        <h6 class="mt-3">Bằng chứng từ AI</h6>
        <div v-for="(a, i) in assessments" :key="i" class="ui-evidence">
          <div class="req">
            <span>{{ a.requirement }}</span>
            <span class="ui-pill" :class="metClass(a.met)">{{ metLabel(a.met) }}</span>
          </div>
          <div v-if="a.evidence" class="ev">“{{ a.evidence }}”</div>
        </div>

        <div class="row mt-3">
          <div class="col-6">
            <h6>Điểm mạnh</h6>
            <ul class="small ps-3"><li v-for="s in strengths" :key="s">{{ s }}</li></ul>
          </div>
          <div class="col-6">
            <h6>Khoảng trống</h6>
            <ul class="small ps-3"><li v-for="s in gaps" :key="s">{{ s }}</li></ul>
          </div>
        </div>
        <div class="text-muted small mb-3" v-if="current.audit">
          Mô hình: {{ current.audit.model }} · phiên bản prompt: {{ current.audit.promptVersion }}
        </div>

        <hr />
        <h6>Quyết định của nhân sự</h6>
        <div v-if="current.reviews.length" class="mb-3">
          <div v-for="(rv, i) in current.reviews" :key="i" class="ui-evidence">
            <div class="req">
              <span class="ui-pill" :class="rv.decision">{{ decisionLabel(rv.decision) }}</span>
              <small class="text-muted fw-normal">{{ formatDate(rv.reviewedAt) }}</small>
            </div>
            <div class="ev">{{ rv.note }}</div>
          </div>
        </div>
        <div v-else class="text-muted mb-3">Chưa có quyết định.</div>

        <div v-if="canReview">
          <div class="decision-group mb-2">
            <label v-for="d in decisions" :key="d.value" class="decision" :class="[d.value, { on: form.decision === d.value }]">
              <input type="radio" :value="d.value" v-model="form.decision" hidden />
              {{ d.label }}
            </label>
          </div>
          <textarea class="form-control ui-textarea" v-model="form.note" placeholder="Lý do (bắt buộc), dựa trên năng lực liên quan công việc..."></textarea>
          <div v-if="reviewError" class="text-danger small mt-1">{{ reviewError }}</div>
          <button class="btn btn-primary mt-2 w-100" :disabled="reviewing" @click="submitReview">
            <span v-if="reviewing" class="ui-spin me-2"></span>Lưu quyết định
          </button>
        </div>
        <div v-else class="text-muted small">Bạn không có quyền duyệt (chỉ xem).</div>
      </aside>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getAllJobs } from "@/services/job-service";
import { getALLEmployees } from "@/services/employee-service";
import { matchCandidate, getRankings, reviewMatch, getFairnessReport, errorMessage } from "@/services/ai-service";
import { useAuthStore } from "@/stores/auth";
import { localDateTime as formatDate } from "@/utils/format";

const decisions = [
  { value: "shortlist", label: "Mời tiếp" },
  { value: "hold", label: "Cân nhắc" },
  { value: "reject", label: "Không phù hợp" },
];

const auth = useAuthStore();
const isAdmin = computed(() => auth.role === "admin");
const canReview = computed(() => ["admin", "hr"].includes(auth.role));

const jobs = ref([]);
const employees = ref([]);
const jobId = ref("");
const rows = ref([]);
const loading = ref(false);
const tab = ref("ranking");
const showAdd = ref(false);
const search = ref("");
const picked = ref([]);
const running = ref(false);
const progress = ref(0);
const runErrors = ref([]);
const current = ref(null);
const form = ref({ decision: "shortlist", note: "" });
const reviewing = ref(false);
const reviewError = ref("");
const fairness = ref(null);

const selectedJob = computed(() => jobs.value.find((j) => j._id === jobId.value));
const jobHasRequirements = computed(() => {
  const r = selectedJob.value && selectedJob.value.requirements;
  return !!(r && (r.mustHaveSkills || []).length);
});
// Ứng viên có hồ sơ năng lực, chưa có trong bảng xếp hạng
const candidates = computed(() => {
  const inRank = new Set(rows.value.map((r) => r.employee && r.employee._id));
  const q = search.value.trim().toLowerCase();
  return employees.value.filter((e) => e.hasCvProfile && !inRank.has(e._id) && (!q || `${e.name} ${e.phone} ${e.email}`.toLowerCase().includes(q)));
});
const assessmentOf = (key) => (current.value && current.value.assessment && current.value.assessment[key]) || [];
const assessments = computed(() => assessmentOf("requirementAssessments"));
const strengths = computed(() => assessmentOf("strengths"));
const gaps = computed(() => assessmentOf("gaps"));

onMounted(async () => {
  const [jobsRes, empsRes] = await Promise.all([getAllJobs(), getALLEmployees()]);
  jobs.value = (jobsRes && jobsRes.data) || [];
  employees.value = (empsRes && empsRes.data) || [];
});

async function loadRankings() {
  rows.value = [];
  fairness.value = null;
  tab.value = "ranking";
  if (!jobId.value) return;
  loading.value = true;
  try {
    const res = await getRankings(jobId.value);
    rows.value = (res && res.data) || [];
  } catch {
    rows.value = [];
  }
  loading.value = false;
}

async function runMatching() {
  running.value = true;
  progress.value = 0;
  runErrors.value = [];
  for (const id of picked.value) {
    const emp = employees.value.find((e) => e._id === id);
    try {
      const res = await matchCandidate(id, jobId.value);
      if (res.status !== 200) throw { response: res };
    } catch (e) {
      runErrors.value.push(`${emp ? emp.name : id}: ${errorMessage(e)}`);
    }
    progress.value += 1;
  }
  picked.value = [];
  running.value = false;
  await loadRankings();
}

function open(row) {
  current.value = row;
  form.value = { decision: "shortlist", note: "" };
  reviewError.value = "";
}

async function submitReview() {
  reviewError.value = "";
  if (form.value.note.trim().length < 5) {
    reviewError.value = "Vui lòng ghi lý do (ít nhất 5 ký tự).";
    return;
  }
  reviewing.value = true;
  try {
    const res = await reviewMatch(current.value.matchId, form.value.decision, form.value.note);
    if (res.status === 200) {
      const openId = current.value.matchId;
      await loadRankings();
      current.value = rows.value.find((r) => r.matchId === openId) || null;
      form.value.note = "";
    } else {
      reviewError.value = (res.data && res.data.error) || "Lưu thất bại.";
    }
  } catch (e) {
    reviewError.value = errorMessage(e);
  }
  reviewing.value = false;
}

async function openFairness() {
  tab.value = "fairness";
  try {
    fairness.value = await getFairnessReport(jobId.value);
  } catch (e) {
    fairness.value = { data: [], note: errorMessage(e) };
  }
}

const scoreClass = (s) => (s >= 70 ? "score-high" : s >= 45 ? "score-mid" : "score-low");
const confidenceLabel = (c) => ({ high: "Cao", medium: "Vừa", low: "Thấp" })[c] || "—";
const decisionLabel = (d) => ({ shortlist: "Mời tiếp", hold: "Cân nhắc", reject: "Không phù hợp" })[d] || d;
const metLabel = (m) => ({ yes: "Đạt", partial: "Một phần", no: "Chưa đạt", unknown: "Không rõ" })[m] || m;
const metClass = (m) => ({ yes: "shortlist", partial: "hold", no: "reject", unknown: "pending" })[m] || "pending";
</script>

<style scoped>
.clickable { cursor: pointer; }
.cand-list { max-height: 240px; overflow: auto; border: 1px solid var(--c-border); border-radius: 10px; }
.cand { display: flex; gap: 10px; align-items: center; padding: 8px 12px; border-bottom: 1px solid var(--c-border); margin: 0; font-weight: 500; cursor: pointer; }
.cand:last-child { border-bottom: 0; }
.cand:hover { background: var(--c-primary-50); }
.score-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 16px 0; }
.score-box { background: #f9fafb; border: 1px solid var(--c-border); border-radius: 12px; padding: 10px; text-align: center; }
.score-box small { display: block; color: var(--c-muted); font-weight: 600; }
.score-box b { font-size: 26px; color: var(--c-primary); }
.decision-group { display: flex; gap: 8px; }
.decision { flex: 1; text-align: center; border: 1px solid var(--c-border); border-radius: 10px; padding: 8px; cursor: pointer; margin: 0; font-weight: 650; }
.decision.on.shortlist { background: var(--c-success-50); border-color: var(--c-success); color: #047857; }
.decision.on.hold { background: var(--c-warning-50); border-color: var(--c-warning); color: #b45309; }
.decision.on.reject { background: var(--c-danger-50); border-color: var(--c-danger); color: #b91c1c; }
</style>
