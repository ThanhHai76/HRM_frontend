<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row mb-4">
        <div class="col-xl-6 col-sm-12 col-12">
          <div class="breadcrumb-path">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-3"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ul>
            <h3>
              Admin Dashboard (<label>{{ convertTime(new Date()) }}</label
              >)
            </h3>
          </div>
        </div>
        <div class="col-xl-6 col-sm-12 col-12">
          <div class="row">
            <div class="col-xl-6 col-sm-6 col-12">
              <a class="btn-dash" @click="$router.push('/employee')">
                Employee CV
              </a>
            </div>
            <div class="col-xl-6 col-sm-6 col-12">
              <a class="btn-emp" @click="$router.push('/report')">Reports</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card board1 fill1">
            <div class="card-body">
              <div class="card_widget_header d-flex flex-column">
                <label>Employees CV</label>
                <h4>
                  {{ allEmployees.length }}
                </h4>
              </div>
              <div class="card_widget_img">
                <img src="@/assets/img/dash1.png" alt="card-img" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card board1 fill2">
            <div class="card-body">
              <div class="card_widget_header d-flex flex-column">
                <label>Jobs</label>
                <h4>{{ allJobs.length }}</h4>
              </div>
              <div class="card_widget_img">
                <img src="@/assets/img/dash2.png" alt="card-img" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card board1 fill3">
            <div class="card-body">
              <div class="card_widget_header d-flex flex-column">
                <label>BP chấm Pass</label>
                <h4>
                  {{ partMarkPass.length }}
                </h4>
              </div>
              <div class="card_widget_img">
                <img src="@/assets/img/dash3.png" alt="card-img" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card board1 fill4">
            <div class="card-body">
              <div class="card_widget_header d-flex flex-column birth_year">
                <label>Năm sinh</label>
                <h4>
                  {{ minBirth }} - {{ maxBirth }}
                </h4>
              </div>
              <div class="card_widget_img">
                <img src="@/assets/img/dash4.png" alt="card-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 d-flex mobile-h">
          <div class="card flex-fill">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Total Employees CV</h5>
                <b-dropdown
                  v-if="barChartByType === 'MONTH'"
                  id="dropdown-1"
                  :text="`Năm ${yearFilter}`"
                  variant="outline"
                >
                  <b-dropdown-item
                    :active="yearFilter === '2021'"
                    @click="changeYear('2021')"
                    >Năm 2021</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearFilter === '2022'"
                    @click="changeYear('2022')"
                    >Năm 2022</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearFilter === '2023'"
                    @click="changeYear('2023')"
                    >Năm 2023</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="yearFilter === '2024'"
                    @click="changeYear('2024')"
                    >Năm 2024</b-dropdown-item
                  >
                </b-dropdown>
                <b-nav tabs>
                  <b-nav-item
                    :active="barChartByType === 'YEAR'"
                    @click="changeBarChartByType('YEAR')"
                    >By Year</b-nav-item
                  >
                  <b-nav-item
                    :active="barChartByType === 'MONTH'"
                    @click="changeBarChartByType('MONTH')"
                    >By Month</b-nav-item
                  >
                </b-nav>
              </div>
            </div>
            <div class="card-body">
              <div v-show="barChartByType === 'YEAR'">
                <canvas id="employeee_chart"></canvas>
              </div>
              <div v-show="barChartByType === 'MONTH'">
                <canvas ref="cv_year_chart" id="cv_year_chart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 d-flex justify-content-center">
          <div class="card flex-fill">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Ratio CV In 2024</h5>
                <b-nav tabs>
                  <b-nav-item
                    :active="pieChartByType === 'PASS'"
                    @click="changePieChartByType('PASS')"
                    >Pass</b-nav-item
                  >
                  <b-nav-item
                    :active="pieChartByType === 'WORK'"
                    @click="changePieChartByType('WORK')"
                    >Work</b-nav-item
                  >
                </b-nav>
              </div>
            </div>
            <div v-show="pieChartByType === 'PASS'" class="card-body chart-pie">
              <canvas id="cv_pass_chart"></canvas>
            </div>
            <div v-show="pieChartByType === 'WORK'" class="card-body chart-pie">
              <canvas id="cv_work_chart"></canvas>
            </div>
          </div>
        </div>

        <loading v-model:active="isLoading"
                 :is-full-page="true"/>

      </div>
    </div>
  </div>
</template>

<script>
import { getALLEmployeesCVHome } from "@/services/employee-service";
import moment from "moment";
import Chart from "chart.js/auto";
import Loading from 'vue-loading-overlay';

export default {
  name: "HomePage",
  setup() {
    return {};
  },
  components: {
    Loading,
  },
  data() {
    return {
      allEmployees: [],
      allJobs: [],
      partMarkPass: [],
      birthYears: [],
      minBirth: 0,
      maxBirth: 0,
      dataChart: [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ],
      barChartByType: "YEAR",
      pieChartByType: "PASS",
      yearFilter: "2024",
      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;
    const { data } = await getALLEmployeesCVHome();
    this.allEmployees = data;
    await this.analysisData();
    this.chartEmployeesCV();
    this.chartYear();
    this.pieChartForCV();
    this.pieChartForWork();
    this.isLoading = false;
  },
  computed: {
    employeesCVByYear() {
      return [
        {
          year: "Năm 2021",
          count: this.allEmployees.filter(({ cvDate }) =>
            (cvDate || "").includes("/2021")
          ).length,
        },
        {
          year: "Năm 2022",
          count: this.allEmployees.filter(({ cvDate }) =>
            (cvDate || "").includes("/2022")
          ).length,
        },
        {
          year: "Năm 2023",
          count: this.allEmployees.filter(({ cvDate }) =>
            (cvDate || "").includes("/2023")
          ).length,
        },
        {
          year: "Năm 2024",
          count: this.allEmployees.filter(({ cvDate }) =>
            (cvDate || "").includes("/2024")
          ).length,
        },
      ];
    },
    cvCurrentYear() {
      const data = this.allEmployees.filter(({ cvDate }) =>
        (cvDate || "").includes(`/${this.yearFilter}`)
      );
      const dataMonth = (month) => {
        return {
          month: `Tháng ${month}`,
          count: data.filter(({ cvDate }) =>
            (cvDate || "").includes(`/${month}/${this.yearFilter}`)
          ).length,
        };
      };
      return [
        dataMonth("01"),
        dataMonth("02"),
        dataMonth("03"),
        dataMonth("04"),
        dataMonth("05"),
        dataMonth("06"),
        dataMonth("07"),
        dataMonth("08"),
        dataMonth("09"),
        dataMonth("10"),
        dataMonth("11"),
        dataMonth("12"),
      ];
    },
    cvPassInYear() {
      const cvTotal = this.allEmployees.filter(({ cvDate }) =>
        (cvDate || "").includes("/2024")
      );
      const joinRound1 = cvTotal.filter(
        ({ joinRound1 }) => joinRound1 === "Đến"
      ).length;
      const interviewV1 = cvTotal.filter(
        ({ interviewV1 }) => interviewV1 === "Pass"
      ).length;
      const partMarkPass = cvTotal.filter(
        ({ partMark }) => partMark === "Pass"
      ).length;
      return {
        interviewV1,
        joinRound1,
        partMarkPass,
      };
    },
    cvWorkInYear() {
      const cvTotal = this.allEmployees.filter(({ cvDate }) =>
        (cvDate || "").includes("/2024")
      );
      const goWork = cvTotal.filter(({ goWork }) => goWork === "Đi làm").length;
      const partMarkPass = cvTotal.filter(
        ({ partMark }) => partMark === "Pass"
      ).length;
      const probationResult = cvTotal.filter(
        ({ probationResult }) => probationResult === "Pass"
      ).length;
      return {
        goWork,
        partMarkPass,
        probationResult,
      };
    },
  },
  watch: {
    yearFilter() {
      this.chartYear();
    },
  },
  methods: {
    async analysisData() {
      this.allJobs = [...new Set(this.allEmployees.map((e) => e.job))];

      const word = "Pass".toUpperCase().trim();
      this.partMarkPass = this.allEmployees.filter(({ partMark }) =>
        (partMark || "").toUpperCase().includes(word)
      );

      this.birthYears = [
        ...new Set(this.allEmployees.map((e) => Number(e.birthYear))),
      ];
      this.minBirth = Math.min(...this.birthYears.filter((e) => e > 0));
      this.maxBirth = Math.max(...this.birthYears.filter((e) => e > 0));
    },
    convertTime(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
    },
    chartEmployeesCV() {
      new Chart(document.getElementById("employeee_chart"), {
        type: "bar",
        data: {
          labels: this.employeesCVByYear.map((row) => row.year),
          datasets: [
            {
              label: "Employees CV",
              data: this.employeesCVByYear.map((row) => row.count),
            },
          ],
        },
      });
    },
    chartYear() {
      this.destroyChartYear();
      new Chart(document.getElementById("cv_year_chart"), {
        type: "bar",
        data: {
          labels: this.cvCurrentYear.map((row) => row.month),
          datasets: [
            {
              label: "Employees CV",
              data: this.cvCurrentYear.map((row) => row.count),
              // fill: false,
              // borderColor: "rgb(75, 192, 192)",
              // tension: 0.1,
            },
          ],
        },
      });
    },
    destroyChartYear() {
      const ctx = document.getElementById("cv_year_chart");
      const chart = Chart.getChart(ctx);
      if (chart) chart.destroy();
    },
    pieChartForCV() {
      new Chart(document.getElementById("cv_pass_chart"), {
        type: "pie",
        data: {
          labels: ["Tham gia PV vòng 1", "Pass vòng 1", "Bộ phận chấm"],
          datasets: [
            {
              label: "Employees CV",
              data: [
                this.cvPassInYear.joinRound1,
                this.cvPassInYear.interviewV1,
                this.cvPassInYear.partMarkPass,
              ],
              backgroundColor: [
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    },
    pieChartForWork() {
      new Chart(document.getElementById("cv_work_chart"), {
        type: "pie",
        data: {
          labels: ["Đi làm", "Pass thử việc", "BP chấm pass"],
          datasets: [
            {
              label: "Employees CV",
              data: [
                this.cvWorkInYear.goWork,
                this.cvWorkInYear.probationResult,
                this.cvWorkInYear.partMarkPass,
              ],
              backgroundColor: [
                "rgb(255, 205, 86)",
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    },
    changeBarChartByType(type) {
      this.barChartByType = type;
    },
    changePieChartByType(type) {
      this.pieChartByType = type;
    },
    changeYear(year) {
      this.yearFilter = year;
    },
  },
};
</script>

<style lang="scss" scoped>
.birth_year h4 {
  font-size: 20px;
  color: #fff;
  font-weight: 700;
}
.chart-pie {
  display: flex;
  justify-content: center;

  canvas {
    width: 400px !important;
    height: 400px !important;
  }
}
</style>
