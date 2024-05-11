<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a @click="$router.push('/')"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-2"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Report</li>
            </ul>
            <h3>Reports</h3>
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
                  id="dropdown-2"
                  :text="`Năm ${yearReport}`"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="yearReport === '2021'"
                    @click="changeYear('2021')"
                    >Năm 2021</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearReport === '2022'"
                    @click="changeYear('2022')"
                    >Năm 2022</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearReport === '2023'"
                    @click="changeYear('2023')"
                    >Năm 2023</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearReport === '2024'"
                    @click="changeYear('2024')"
                    >Năm 2024</b-dropdown-item
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
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataReportShow" :key="index">
                    <td class="sticky-col first-col">{{ index + 1 }}</td>

                    <td
                      v-if="index === 0 && item.block === 'DỰ ÁN'"
                      class="sticky-col second-col"
                      rowspan="11"
                      :style="{ background: '#C16C70' }"
                    >
                      <b>{{ item.block }}</b>
                    </td>
                    <td
                      v-else-if="item.block === 'Digital'"
                      class="sticky-col second-col"
                      :style="{ background: '#F6B26B' }"
                    >
                      <b>{{ item.block }}</b>
                    </td>

                    <td
                      v-if="index === 0 && item.team === 'KAILAS MEDIA'"
                      class="sticky-col third-col"
                      rowspan="7"
                      :style="{ background: '#DEEEB4' }"
                    >
                      <b>{{ item.team }}</b>
                    </td>
                    <td
                      v-else-if="index === 9 && item.team === 'TĐCS'"
                      class="sticky-col third-col"
                      rowspan="2"
                    >
                      <b>{{ item.team }}</b>
                    </td>
                    <td
                      v-else-if="['QTCS', 'GBD'].includes(item.team)"
                      class="sticky-col third-col"
                      :style="{ background: '#C1CBED' }"
                    >
                      <b>{{ item.team }}</b>
                    </td>
                    <td
                      v-else-if="['Digital'].includes(item.team)"
                      class="sticky-col third-col"
                      :style="{ background: '#F6B26B' }"
                    >
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

<script>
import { getReportCurrentYear } from "@/services/employee-service";
import { getAllJobs } from "@/services/job-service";
import * as XLSX from "xlsx-js-style";

export default {
  name: "ReportPage",
  setup() {
    return {};
  },
  data() {
    return {
      dataReport: [
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Biên kịch 01,2024",
          jobRecruitment: "Kailas Biên kịch 01,2024",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Admin Fanpage 01.2024",
          jobRecruitment: "Kailas Admin Fanpage 01.2024",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Content Creator DL",
          jobRecruitment: "Kailas Content Creator DL",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Quản trị Tiktok",
          jobRecruitment: "Quản trị Tiktok",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Admin hành chính",
          jobRecruitment: "Kailas Admin hành chính",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Kế Toán",
          jobRecruitment: "Kailas Kế Toán",
        },
        {
          block: "DỰ ÁN",
          team: "KAILAS MEDIA",
          job: "Kailas Dựng 01.2024",
          jobRecruitment: "Kailas Dựng 01.2024",
        },
        {
          block: "DỰ ÁN",
          team: "QTCS",
          job: "QTCS BTV Part",
          jobRecruitment: "QTCS BTV Part",
        },
        {
          block: "DỰ ÁN",
          team: "GBD",
          job: "Ghiền Video Editor",
          jobRecruitment: "Ghiền Video Editor",
        },
        {
          block: "DỰ ÁN",
          team: "TĐCS",
          job: "TĐCS BTV Web 1.2024",
          jobRecruitment: "TĐCS BTV 01.2024",
        },
        {
          block: "DỰ ÁN",
          team: "TĐCS",
          job: "TĐCS Biên kịch 01.2024",
          jobRecruitment: "TĐCS Biên kịch 01.2024",
        },
        {
          block: "Digital",
          team: "Digital",
          job: "Senior Graphic Design",
          jobRecruitment: "Senior Graphic Design",
        },
      ],
      dataReportFetch: [],
      downloadLink: "",
      typeReport: "month",
      yearReport: "2024",
      typeQuarter: "Quý 1",
      typeMonth: "Tháng 01",
      dataListJobs: [],
      isLoading: false,
    };
  },
  computed: {
    dataReportShow() {
      const dataReport = this.dataReport.map((item) => {
        const orderQuantity = this.dataListJobs.find(
          (job) => job.jobName === item.job
        )?.amount;
        const goWork = this.dataReportFilter.filter(
          (cvItem) => cvItem.job === item.job && cvItem.goWork === "Đi làm"
        ).length;
        return {
          ...item,
          orderJobDate: this.dataListJobs.find(
            (job) => job.jobName === item.job
          )?.orderDate,
          orderQuantity: orderQuantity,
          personInCharge: "Tổng",
          cvHR: this.dataReportFilter.filter(
            (cvItem) => cvItem.job === item.job
          ).length,
          cvPass: this.dataReportFilter.filter(
            (cvItem) => cvItem.job === item.job && cvItem.partMark === "Pass"
          ).length,
          pvRound1: this.dataReportFilter.filter(
            (cvItem) => cvItem.job === item.job && cvItem.joinRound1 === "Đến"
          ).length,
          passRound1: this.dataReportFilter.filter(
            (cvItem) => cvItem.job === item.job && cvItem.interviewV1 === "Pass"
          ).length,
          offer: this.dataReportFilter.filter(
            (cvItem) => cvItem.job === item.job && cvItem.offer === "Đã gọi"
          ).length,
          goWork: goWork,
          personnelAllocation: {
            HN: 0,
            SG: 0,
            total: 0,
          },
          recruitMore: orderQuantity - goWork || 0,
          jobState: "",
          sourceHR: {
            FBFree: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "FB Free"
            ).length,
            TopCV: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "TopCV"
            ).length,
            Refer: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "Refer"
            ).length,
            YBOX: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "YBOX"
            ).length,
            VNW: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "VNW"
            ).length,
            FBAds: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "FBAds"
            ).length,
            HH: this.dataReportFilter.filter(
              (cvItem) => cvItem.job === item.job && cvItem.source === "HH"
            ).length,
          },
          recruitFees: this.formatMoney(
            this.dataListJobs.find((job) => job.jobName === item.job)
              ?.recruitmentCost
          ),
          recruitFeesCandidate: 0,
        };
      });
      return dataReport;
    },
    dataReportFilter() {
      if (this.typeReport === "year") return this.dataReportFetch;
      return this.typeReport === "month"
        ? this.dataMonthFilter
        : this.dataQuarterFilter;
    },
    dataMonthFilter() {
      const conditionFilter = this.typeMonth.substring(
        this.typeMonth.length - 2,
        this.typeMonth.length
      );
      return this.dataReportFetch.filter((cvItem) =>
        cvItem.cvDate.includes(`/${conditionFilter}/${this.yearReport}`)
      );
    },
    dataQuarterFilter() {
      const checkCondition = (date) => {
        if (this.typeQuarter === "Quý 1")
          return (
            date.includes(`/01/${this.yearReport}`) ||
            date.includes(`/02/${this.yearReport}`) ||
            date.includes(`/03/${this.yearReport}`)
          );
        if (this.typeQuarter === "Quý 2")
          return (
            date.includes(`/04/${this.yearReport}`) ||
            date.includes(`/05/${this.yearReport}`) ||
            date.includes(`/06/${this.yearReport}`)
          );
        if (this.typeQuarter === "Quý 3")
          return (
            date.includes(`/07/${this.yearReport}`) ||
            date.includes(`/08/${this.yearReport}`) ||
            date.includes(`/09/${this.yearReport}`)
          );
        return (
          date.includes(`/10/${this.yearReport}`) ||
          date.includes(`/11/${this.yearReport}`) ||
          date.includes(`/12/${this.yearReport}`)
        );
      };

      return this.dataReportFetch.filter((cvItem) =>
        checkCondition(cvItem.cvDate)
      );
    },
    typeReportTextShow() {
      if (this.typeReport === "quarter") return "Báo cáo quý";
      if (this.typeReport === "year") return "Báo cáo năm";
      return "Báo cáo tháng";
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.fetchDataReport();
    await this.fetchDataListJobs();
    this.isLoading = false;
  },
  methods: {
    async fetchDataReport() {
      const { data } = await getReportCurrentYear(this.yearReport);
      this.dataReportFetch = data;
    },
    async fetchDataListJobs() {
      const { data } = await getAllJobs();
      this.dataListJobs = data;
    },
    exportToExcel() {
      const wb = XLSX.utils.table_to_book(this.$refs.tableRef, {
        sheet: "Sheet1",
      });
      const wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      this.downloadLink = URL.createObjectURL(blob);
    },
    changeTypeReport(type) {
      this.typeReport = type;
    },
    async changeYear(year) {
      this.yearReport = year;
      const { data } = await getReportCurrentYear(this.yearReport);
      this.dataReportFetch = data;
    },
    changeQuarter(quarter) {
      this.typeQuarter = quarter;
    },
    changeMonth(month) {
      this.typeMonth = month;
    },
    getTotalColumn(keyColumn) {
      return this.dataReportShow.reduce(
        (total, report) => total + (report[keyColumn] || 0),
        0
      );
    },
    formatMoney(number) {
      const [integerPart, decimalPart] = String(number).split(".");
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
      if (!number) return "";
      return decimalPart
        ? formattedIntegerPart + "." + decimalPart
        : formattedIntegerPart + " VND";
    },
  },
};
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
