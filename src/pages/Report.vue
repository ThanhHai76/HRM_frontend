<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="ui-page-head">
            <div>
              <h2>Báo cáo tuyển dụng</h2>
              <p>Thống kê theo vị trí và nguồn ứng viên, theo tháng, quý hoặc năm. Có thể xuất ra Excel.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div v-if="isLoading">
            <b-spinner variant="success" label="Spinning"></b-spinner>
          </div>
          <div v-else class="d-flex justify-content-between align-items-center">
            <div class="d-flex">
              <div class="button">
                <b-dropdown
                  id="dropdown-year"
                  :text="`Năm ${yearReport}`"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    v-for="y in yearOptions"
                    :key="y"
                    :active="yearReport === y"
                    @click="changeYear(y)"
                    >Năm {{ y }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div class="button">
                <b-dropdown
                  id="dropdown-1"
                  :text="typeReportTextShow"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="typeReport === 'month'"
                    @click="changeTypeReport('month')"
                    >Báo cáo tháng</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeReport === 'quarter'"
                    @click="changeTypeReport('quarter')"
                    >Báo cáo Quý</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeReport === 'year'"
                    @click="changeTypeReport('year')"
                    >Báo cáo năm</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div v-if="typeReport === 'quarter'" class="button">
                <b-dropdown
                  id="dropdown-2"
                  :text="typeQuarter"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="typeQuarter === 'Quý 1'"
                    @click="changeQuarter('Quý 1')"
                    >Quý 1</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeQuarter === 'Quý 2'"
                    @click="changeQuarter('Quý 2')"
                    >Quý 2</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeQuarter === 'Quý 3'"
                    @click="changeQuarter('Quý 3')"
                    >Quý 3</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeQuarter === 'Quý 4'"
                    @click="changeQuarter('Quý 4')"
                    >Quý 4</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div v-if="typeReport === 'month'" class="button">
                <b-dropdown
                  id="dropdown-3"
                  :text="typeMonth"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 01'"
                    @click="changeMonth('Tháng 01')"
                    >Tháng 1</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 02'"
                    @click="changeMonth('Tháng 02')"
                    >Tháng 2</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 03'"
                    @click="changeMonth('Tháng 03')"
                    >Tháng 3</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 04'"
                    @click="changeMonth('Tháng 04')"
                    >Tháng 4</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 05'"
                    @click="changeMonth('Tháng 05')"
                    >Tháng 5</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 06'"
                    @click="changeMonth('Tháng 06')"
                    >Tháng 6</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 07'"
                    @click="changeMonth('Tháng 07')"
                    >Tháng 7</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 08'"
                    @click="changeMonth('Tháng 08')"
                    >Tháng 8</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 09'"
                    @click="changeMonth('Tháng 09')"
                    >Tháng 9</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 10'"
                    @click="changeMonth('Tháng 10')"
                    >Tháng 10</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 11'"
                    @click="changeMonth('Tháng 11')"
                    >Tháng 11</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="typeMonth === 'Tháng 12'"
                    @click="changeMonth('Tháng 12')"
                    >Tháng 12</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>
            <div class="mr-4">
              <a
                :href="downloadLink"
                @click="exportToExcel"
                download="report.xlsx"
                >Export to Excel</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="card">
            <div class="table-responsive">
              <table
                ref="tableRef"
                class="table table-bordered custom-table no-footer"
              >
                <thead>
                  <tr>
                    <th class="sticky-col first-col" rowspan="2">STT</th>
                    <th class="sticky-col second-col" rowspan="2">Khối</th>
                    <th class="sticky-col third-col" rowspan="2">Team</th>
                    <!-- <th class="sticky-col fourth-col">Jobs</th> -->
                    <th class="sticky-col fifth-col" rowspan="2">
                      Job chạy tuyển dụng
                    </th>
                    <th rowspan="2">Ngày order job</th>
                    <th rowspan="2">SL order</th>
                    <th rowspan="2">Người phụ trách</th>
                    <th rowspan="2">CV về</th>
                    <th rowspan="2">CV Pass chấm</th>
                    <th rowspan="2">Đến PV vòng 1</th>
                    <th rowspan="2">Pass PV vòng 1</th>
                    <th rowspan="2">Đến Offer</th>
                    <th rowspan="2">Đi làm</th>
                    <th colspan="3">Phân bổ nhân sự</th>
                    <th rowspan="2" class="align-center">Cần tuyển thêm</th>
                    <th rowspan="2">Tình trạng job (tháng)</th>
                    <th colspan="7">Nguồn chạy</th>
                    <th rowspan="2">Chi phí tuyển dụng</th>
                    <th rowspan="2">Chi phí / Ứng viên</th>
                  </tr>
                  <tr>
                    <th>Hà Nội</th>
                    <th>Sài Gòn</th>
                    <th>Tổng</th>
                    <th>FB free</th>
                    <th>TopCV</th>
                    <th>Refer</th>
                    <th>Ybox</th>
                    <th>Đăng tin VNW</th>
                    <th>FB ADs</th>
                    <th>HH</th>
                  </tr>
                  <tr>
                    <th class="sticky-col first-col">Tổng</th>
                    <th class="sticky-col second-col"></th>
                    <th class="sticky-col third-col"></th>
                    <!-- <th class="sticky-col fourth-col">Jobs</th> -->
                    <th class="sticky-col fifth-col"></th>
                    <th></th>
                    <th>
                      {{ getTotalColumn("orderQuantity") }}
                    </th>
                    <th></th>
                    <th>
                      {{ getTotalColumn("cvHR") }}
                    </th>
                    <th>
                      {{ getTotalColumn("cvPass") }}
                    </th>
                    <th>
                      {{ getTotalColumn("pvRound1") }}
                    </th>
                    <th>
                      {{ getTotalColumn("passRound1") }}
                    </th>
                    <th>
                      {{ getTotalColumn("offer") }}
                    </th>
                    <th>
                      {{ getTotalColumn("goWork") }}
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>{{ getTotalColumn("recruitMore") }}</th>
                    <th></th>
                    <th>{{ getTotalColumn("sourceHR", "FBFree") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "TopCV") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "Refer") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "YBOX") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "VNW") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "FBAds") }}</th>
                    <th>{{ getTotalColumn("sourceHR", "HH") }}</th>
                    <th></th>
                    <th>{{ getTotalColumn("recruitFeesCandidate") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataReportShow" :key="index">
                    <td class="sticky-col first-col">{{ index + 1 }}</td>

                    <td class="sticky-col second-col">
                      <b>{{ item.block }}</b>
                    </td>
                    <td class="sticky-col third-col">
                      <b>{{ item.team }}</b>
                    </td>

                    <!-- <td class="sticky-col fourth-col">{{ item.job }}</td> -->
                    <td class="sticky-col fifth-col">
                      {{ item.jobRecruitment }}
                    </td>
                    <td>{{ item.orderJobDate }}</td>
                    <td>{{ item.orderQuantity }}</td>
                    <td>{{ item.personInCharge }}</td>
                    <td>{{ item.cvHR }}</td>
                    <td>{{ item.cvPass }}</td>
                    <td>{{ item.pvRound1 }}</td>
                    <td>{{ item.passRound1 }}</td>
                    <td>{{ item.offer }}</td>
                    <td>{{ item.goWork }}</td>
                    <td>{{ item.personnelAllocation.HN }}</td>
                    <td>{{ item.personnelAllocation.SG }}</td>
                    <td>{{ item.personnelAllocation.total }}</td>
                    <td>{{ item.recruitMore }}</td>
                    <td>{{ item.jobState }}</td>
                    <td>{{ item.sourceHR.FBFree }}</td>
                    <td>{{ item.sourceHR.TopCV }}</td>
                    <td>{{ item.sourceHR.Refer }}</td>
                    <td>{{ item.sourceHR.YBOX }}</td>
                    <td>{{ item.sourceHR.VNW }}</td>
                    <td>{{ item.sourceHR.FBAds }}</td>
                    <td>{{ item.sourceHR.HH }}</td>
                    <td>{{ item.recruitFees }}</td>
                    <td>{{ item.recruitFeesCandidate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import * as XLSX from "xlsx-js-style";
import { getReportCurrentYear } from "@/services/employee-service";
import { getAllJobs } from "@/services/job-service";
import { currentYear, recentYears } from "@/utils/years";

// Các nguồn CV có cột riêng trong báo cáo: khóa cột -> giá trị "Nguồn" trong dữ liệu
const SOURCE_COLUMNS = { FBFree: "FB Free", TopCV: "TopCV", Refer: "Refer", YBOX: "YBOX", VNW: "VNW", FBAds: "FBAds", HH: "HH" };
const QUARTER_MONTHS = { "Quý 1": ["01", "02", "03"], "Quý 2": ["04", "05", "06"], "Quý 3": ["07", "08", "09"], "Quý 4": ["10", "11", "12"] };

const now = new Date();
const dataReportFetch = ref([]);
const downloadLink = ref("");
const typeReport = ref("month");
const yearReport = ref(currentYear());
const typeQuarter = ref(`Quý ${Math.floor(now.getMonth() / 3) + 1}`);
const typeMonth = ref(`Tháng ${String(now.getMonth() + 1).padStart(2, "0")}`);
const dataListJobs = ref([]);
const isLoading = ref(false);
const tableRef = ref(null);

const yearOptions = computed(() => recentYears(6));

function formatMoney(number) {
  if (!number) return "";
  const [integerPart, decimalPart] = String(number).split(".");
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimalPart ? formatted + "." + decimalPart : formatted + " VND";
}

const jobByName = (name) => dataListJobs.value.find((job) => job.jobName === name);

// Dòng báo cáo lấy từ danh sách Job của công ty (+ các job có CV nhưng chưa có trong danh sách)
const reportRows = computed(() => {
  const rows = dataListJobs.value.map((job) => ({ block: job.block || "", team: job.team || "", job: job.jobName, jobRecruitment: job.jobName }));
  const known = new Set(rows.map((r) => r.job));
  const extra = [...new Set((dataReportFetch.value || []).map((c) => c.job).filter(Boolean))].filter((name) => !known.has(name));
  return [...rows, ...extra.map((name) => ({ block: "", team: "", job: name, jobRecruitment: name }))];
});

// CV trong kỳ báo cáo (tháng / quý / năm)
const dataReportFilter = computed(() => {
  const all = dataReportFetch.value || [];
  if (typeReport.value === "year") return all;
  const months = typeReport.value === "month" ? [typeMonth.value.slice(-2)] : QUARTER_MONTHS[typeQuarter.value] || QUARTER_MONTHS["Quý 4"];
  return all.filter((cv) => months.some((m) => (cv.cvDate || "").includes(`/${m}/${yearReport.value}`)));
});

const dataReportShow = computed(() =>
  reportRows.value.map((item) => {
    const job = jobByName(item.job);
    const cvs = dataReportFilter.value.filter((cv) => cv.job === item.job);
    const count = (pred) => cvs.filter(pred).length;
    const orderQuantity = job && job.amount;
    const goWork = count((cv) => cv.goWork === "Đi làm");
    return {
      ...item,
      orderJobDate: job && job.orderDate,
      orderQuantity,
      personInCharge: "Tổng",
      cvHR: cvs.length,
      cvPass: count((cv) => cv.partMark === "Pass"),
      pvRound1: count((cv) => cv.joinRound1 === "Đến"),
      passRound1: count((cv) => cv.interviewV1 === "Pass"),
      offer: count((cv) => cv.offer === "Đã gọi"),
      goWork,
      personnelAllocation: { HN: 0, SG: 0, total: 0 },
      recruitMore: orderQuantity - goWork || 0,
      jobState: "",
      sourceHR: Object.fromEntries(Object.entries(SOURCE_COLUMNS).map(([key, source]) => [key, count((cv) => cv.source === source)])),
      recruitFees: formatMoney(job && job.recruitmentCost),
      recruitFeesCandidate: 0,
    };
  })
);

const typeReportTextShow = computed(() => {
  if (typeReport.value === "quarter") return "Báo cáo quý";
  if (typeReport.value === "year") return "Báo cáo năm";
  return "Báo cáo tháng";
});

function getTotalColumn(keyColumn, keyColumnMore) {
  return dataReportShow.value.reduce((total, report) => total + ((keyColumnMore ? report[keyColumn][keyColumnMore] : report[keyColumn]) || 0), 0);
}

async function fetchDataReport() {
  const { data } = await getReportCurrentYear(yearReport.value);
  dataReportFetch.value = Array.isArray(data) ? data : [];
}
async function fetchDataListJobs() {
  const { data } = await getAllJobs();
  dataListJobs.value = Array.isArray(data) ? data : [];
}

function exportToExcel() {
  const wb = XLSX.utils.table_to_book(tableRef.value, { sheet: "Sheet1" });
  const wbout = XLSX.write(wb, { bookType: "xlsx", bookSST: true, type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  downloadLink.value = URL.createObjectURL(blob);
}

const changeTypeReport = (type) => (typeReport.value = type);
const changeQuarter = (quarter) => (typeQuarter.value = quarter);
const changeMonth = (month) => (typeMonth.value = month);
async function changeYear(year) {
  yearReport.value = year;
  await fetchDataReport();
}

onMounted(async () => {
  isLoading.value = true;
  await fetchDataReport();
  await fetchDataListJobs();
  isLoading.value = false;
});
</script>

<style lang="scss" scoped>
.table-responsive {
  font-size: 14px;

  th {
    font-size: 14px;
  }
  th,
  td {
    border: 1px solid #bbc0c2;
  }
}

.table td,
.table th {
  padding: 10px;
}

.table thead th {
  vertical-align: middle;
}

.table-responsive tr td:first-child,
.table-responsive tr th:first-child {
  padding-left: 10px;
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
}
.first-col {
  width: 60px;
  min-width: 61px;
  max-width: 61px;
  left: -1px;
}
.second-col {
  width: 120px;
  min-width: 121px;
  max-width: 120px;
  left: 59px;
}
.third-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 179px;
}
.fourth-col {
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  left: 328px;
}
.fifth-col {
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  left: 328px;
}
.sixth-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 578px;
}
</style>
