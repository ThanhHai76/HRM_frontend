<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="page-name mb-4">
        <h4 class="m-0"></h4>
        <label>{{ convertTime(new Date()) }}</label>
      </div>
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
            <h3>Admin Dashboard</h3>
          </div>
        </div>
        <div class="col-xl-6 col-sm-12 col-12">
          <div class="row">
            <div class="col-xl-6 col-sm-6 col-12">
              <a class="btn-dash" href="#"> Admin Dashboard</a>
            </div>
            <div class="col-xl-6 col-sm-6 col-12">
              <a class="btn-emp" @click="$router.push('/employee')">Employee</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-xl-3 col-sm-6 col-12">
          <div class="card board1 fill1">
            <div class="card-body">
              <div class="card_widget_header d-flex flex-column">
                <label>Employees</label>
                <h4 v-if="allEmployees.length > 0">
                  {{ allEmployees.length }}
                </h4>
                <b-spinner
                  v-else
                  variant="success"
                  label="Spinning"
                ></b-spinner>
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
                <h4 v-if="allJobs.length > 0">{{ allJobs.length }}</h4>
                <b-spinner
                  v-else
                  variant="success"
                  label="Spinning"
                ></b-spinner>
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
                <label>HR chấm Pass</label>
                <h4 v-if="hrMarkPass.length > 0">{{ hrMarkPass.length }}</h4>
                <b-spinner
                  v-else
                  variant="success"
                  label="Spinning"
                ></b-spinner>
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
                <h4 v-if="allEmployees.length > 0">
                  {{ minBirth }} - {{ maxBirth }}
                </h4>
                <b-spinner
                  v-else
                  variant="success"
                  label="Spinning"
                ></b-spinner>
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
                <h5 class="card-title">Total Employees</h5>
              </div>
            </div>
            <div class="card-body">
              <div id="invoice_chart"></div>
              <div class="text-center text-muted">
                <div class="row">
                  <div class="col-4">
                    <div class="mt-4">
                      <p class="mb-2 text-truncate">
                        <i class="fas fa-circle text-primary mr-1"></i>
                        Business
                      </p>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mt-4">
                      <p class="mb-2 text-truncate">
                        <i class="fas fa-circle text-success mr-1"></i>
                        Testing
                      </p>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="mt-4">
                      <p class="mb-2 text-truncate">
                        <i class="fas fa-circle text-danger mr-1"></i>
                        Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Total Salary By Unit</h5>
              </div>
            </div>
            <div class="card-body">
              <div id="sales_chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getALLEmployees } from "@/services/employee-service";
import moment from "moment";

export default {
  name: "HomePage",
  setup() {
    return {};
  },
  data() {
    return {
      allEmployees: [],
      allJobs: [],
      hrMarkPass: [],
      birthYears: [],
      minBirth: 0,
      maxBirth: 0,
    };
  },
  async mounted() {
    const { data } = await getALLEmployees();
    this.allEmployees = data.filter((employee) => employee.phone);

    this.allJobs = [...new Set(this.allEmployees.map((e) => e.job))];

    const word = "Pass".toUpperCase().trim();
    this.hrMarkPass = this.allEmployees.filter(({ hrMark }) =>
      (hrMark || "").toUpperCase().includes(word)
    );

    this.birthYears = [
      ...new Set(this.allEmployees.map((e) => Number(e.birthYear))),
    ];
    this.minBirth = Math.min(...this.birthYears.filter((e) => e > 0));
    this.maxBirth = Math.max(...this.birthYears.filter((e) => e > 0));
  },
  methods: {
    convertTime(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
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
</style>
