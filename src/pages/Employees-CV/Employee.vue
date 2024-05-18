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
              <li class="breadcrumb-item active">Employees</li>
            </ul>
            <h3>Employees CV</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="head-link-set flex-wrap">
            <div class="top-nav-search d-flex align-items-center">
              <form>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchWord"
                  placeholder="Search for mobile phone, name, email..."
                />
                <button class="btn" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
              <div class="search_status" v-if="isShowStatus">
                Đã từng tham gia phỏng vấn
              </div>
            </div>
            <div class="d-flex btn-employee">
              <button
                type="button"
                class="btn btn-outline-success mr-4"
                @click="addEmployee"
              >
                Add Employee CV
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="importExcel"
              >
                Import Excel
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="card">
            <div class="table-heading d-flex">
              <div class="button mr-5">
                <b-dropdown
                  id="dropdown-1"
                  :text="yearFilter"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="yearFilter === 'Tất cả'"
                    @click="changeYear('Tất cả')"
                    >Tất cả</b-dropdown-item
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
              </div>
              <div class="d-flex align-items-center mr-5">
                <h2 v-if="employeeFilter.length > 0" class="pr-2">
                  {{ employeeFilter.length }} Employees CV
                </h2>
                <b-spinner
                  v-if="isLoading && employeeFilter.length == 0"
                  variant="success"
                  label="Spinning"
                ></b-spinner>
              </div>
              <div v-if="employeeFilter.length > 0" class="button mr-5">
                <b-dropdown
                  id="dropdown-2"
                  :text="`Mỗi trang ${perPage}`"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    :active="perPage === 5"
                    @click="changePerPage(5)"
                    >5</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="perPage === 10"
                    @click="changePerPage(10)"
                    >10</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="perPage === 20"
                    @click="changePerPage(20)"
                    >20</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="perPage === 50"
                    @click="changePerPage(50)"
                    >50</b-dropdown-item
                  >
                  <b-dropdown-item
                    :active="perPage === 100"
                    @click="changePerPage(100)"
                    >100</b-dropdown-item
                  >
                </b-dropdown>
              </div>
              <div class="button">
                Filter Job:
                <b-dropdown
                  id="dropdown-3"
                  :text="jobFilterSelected"
                  variant="outline"
                  class="m-md-2"
                >
                  <b-dropdown-item
                    v-for="item in dataListJobs"
                    :key="item._id"
                    :active="jobFilterSelected === item.jobName"
                    @click="changeJobFilter(item.jobName)"
                    >{{ item.jobName }}</b-dropdown-item
                  >
                </b-dropdown>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered custom-table no-footer">
                <thead>
                  <tr>
                    <th>STT</th>
                    <td>Thao tác</td>
                    <th>Nguồn</th>
                    <th>Ngày về/nhập CV</th>
                    <th>Job</th>
                    <th>Họ và tên</th>
                    <th>Năm sinh</th>
                    <th>Trình độ học vấn</th>
                    <th>Chuyên ngành</th>
                    <th>SĐT</th>
                    <th>Địa chỉ mail</th>
                    <th>HR suggest</th>
                    <th>HR chấm</th>
                    <th>Bộ phận chấm</th>
                    <!-- <th>Link CV</th>
                    <th>Link SP</th>
                    <th>Link FB</th>
                    <th>Đơn vị UV từng làm</th>
                    <th>Vòng 1</th>
                    <th>Tham gia Vòng 1</th>
                    <th>Kết quả PV V1</th>
                    <th>VÒNG 2</th>
                    <th>Tham gia Vòng 2</th>
                    <th>Kết qủa PV V2</th>
                    <th>Notes</th>
                    <th>OFFER</th>
                    <th>Kết quả offer</th>
                    <th>Notes</th>
                    <th>ĐI LÀM</th>
                    <th>Ngày đi làm</th>
                    <th>THỬ VIỆC Thời gian</th>
                    <th>Kết quả thử việc</th>
                    <th>Note</th>
                    <td>Ngày tạo</td> -->
                  </tr>
                </thead>
                <tbody v-if="employeePerpage.length === 0">
                  <tr>
                    <td colspan="12">Không có kết quả</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr v-for="(item, index) of employeePerpage" :key="item._id">
                    <td>{{ (this.currentPage - 1) * perPage + index + 1 }}</td>
                    <td class="tab-select">
                      <div class="dropdown">
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Tuỳ chọn
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              @click="onDetailEmployee(item)"
                            >
                              <span class="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-info-square"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
                                  />
                                  <path
                                    d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                                  />
                                </svg>
                              </span>
                              <span>Chi tiết</span></a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              @click="onEditEmployee(item)"
                            >
                              <span class="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-pencil"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                                  />
                                </svg>
                              </span>
                              <span>Sửa</span>
                            </a>
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              @click="onDeleteEmployee(item)"
                              ><span class="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                  />
                                  <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                  />
                                </svg>
                              </span>
                              <span>Xoá</span></a
                            >
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div>{{ item.source }}</div>
                    </td>
                    <td>
                      <div>{{ item.cvDate }}</div>
                    </td>
                    <td>{{ item.job }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.birthYear }}</td>
                    <td>{{ item.academicLevel }}</td>
                    <td>{{ item.specialized }}</td>
                    <td>
                      <label class="action_label" @click="onCopy(item.phone)">{{
                        item.phone
                      }}</label>
                    </td>
                    <td>
                      <label class="action_label" @click="onCopy(item.email)">{{
                        item.email
                      }}</label>
                    </td>
                    <td>{{ item.hrSuggest }}</td>
                    <td>{{ item.hrMark }}</td>
                    <td>{{ item.partMark }}</td>
                    <!-- <td>
                      <a :href="item.linkCV" target="_blank">Link</a>
                    </td>
                    <td><a v-if="item.linkSP" :href="item.linkSP" target="_blank">Link</a></td>
                    <td><a v-if="item.linkFB" :href="item.linkFB" target="_blank">Link</a></td>
                    <td>{{ item.companyUV }}</td>
                    <td>{{ item.round1 }}</td>
                    <td>{{ item.joinRound1 }}</td>
                    <td>{{ item.interviewV1 }}</td>
                    <td>{{ item.round2 }}</td>
                    <td>{{ item.joinRound2 }}</td>
                    <td>{{ item.interviewV2 }}</td>
                    <td>{{ item.notes }}</td>
                    <td>{{ item.offer }}</td>
                    <td>{{ item.offerResult }}</td>
                    <td>{{ item.notes2 }}</td>
                    <td>{{ item.goWork }}</td>
                    <td>{{ item.onboardDate }}</td>
                    <td>{{ item.probationTime }}</td>
                    <td>{{ item.probationResult }}</td>
                    <td>{{ item.notes3 }}</td>
                    <td>
                      <label>{{ convertTime(item.createdAt) }}</label>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="overflow-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="employeeFilter.length"
              :per-page="perPage"
            ></b-pagination>
          </div>
        </div>
      </div>

      <b-modal
        id="modal-delete"
        centered
        title="Confirm delete"
        v-model="isShowModalDelete"
        @ok="confirmDeleteEmployee"
        ok-title="Confirm"
      >
        <div>
          <p>Confirm to delete this Employee CV</p>
        </div>
      </b-modal>

      <b-modal
        id="modal-success"
        centered
        title="Notify"
        v-model="isShowModalSuccess"
        ok-title="Confirm"
      >
        <div>
          <p>{{ messageNoti }}</p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { deleteEmployee, getALLEmployees } from "@/services/employee-service";
import { getAllJobs } from "@/services/job-service";
import moment from "moment";

export default {
  name: "EmployeePage",
  data() {
    return {
      allEmployees: [],
      searchWord: "",
      currentPage: 1,
      perPage: 5,
      itemSelected: null,
      isShowModalDelete: false,
      isShowModalSuccess: false,
      messageNoti: "",
      yearFilter: "Tất cả",
      isLoading: false,
      dataListJobs: [],
      jobFilterSelected: "Tất cả Jobs",
    };
  },
  computed: {
    employeeFilter() {
      const trimWord = this.searchWord.toUpperCase().trim();
      return this.employeeJobFilter.filter(
        ({
          name,
          phone,
          email,
          source,
          job,
          cvDate,
          birthYear,
          academicLevel,
          specialized,
          hrMark,
        }) =>
          (name || "").toUpperCase().includes(trimWord) ||
          (phone || "").toUpperCase().includes(trimWord) ||
          (email || "").toUpperCase().includes(trimWord) ||
          (source || "").toUpperCase().includes(trimWord) ||
          (job || "").toUpperCase().includes(trimWord) ||
          (cvDate || "").toUpperCase().includes(trimWord) ||
          (birthYear || "").toUpperCase().includes(trimWord) ||
          (academicLevel || "").toUpperCase().includes(trimWord) ||
          (specialized || "").toUpperCase().includes(trimWord) ||
          (hrMark || "").toUpperCase().includes(trimWord)
      );
    },
    employeeJobFilter() {
      if (this.jobFilterSelected === "Tất cả Jobs")
        return this.employeeYearFilter;
      return this.employeeYearFilter.filter(
        ({ job }) => job === this.jobFilterSelected
      );
    },
    employeeYearFilter() {
      if (this.yearFilter === "Tất cả") return this.allEmployees;
      return this.allEmployees.filter(({ cvDate }) =>
        (cvDate || "").includes(`/${this.yearFilter}`)
      );
    },
    employeePerpage() {
      return this.employeeFilter.filter((employee, index) => {
        return (
          (this.currentPage - 1) * this.perPage < index + 1 &&
          index + 1 <= this.currentPage * this.perPage
        );
      });
    },
    isShowStatus() {
      return (
        this.searchWord !== "" &&
        this.validatePhoneNumber(this.searchWord) &&
        this.employeePerpage.length > 1
      );
    },
  },
  watch: {
    employeeFilter() {
      this.currentPage = 1;
    },
  },
  async mounted() {
    await this.fetchAllEmployees();
    await this.fetchDataListJobs();
  },
  methods: {
    convertTime(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    validatePhoneNumber(input_str) {
      var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      return re.test(input_str);
    },
    addEmployee() {
      this.$router.push("/add-employee");
    },
    importExcel() {
      this.$router.push("/import-excel-empoyee");
    },
    async fetchAllEmployees() {
      this.isLoading = true;
      const { data } = await getALLEmployees();
      this.allEmployees = data;
      this.isLoading = false;
    },
    onEditEmployee(employee) {
      this.$router.push(`/Edit-Employee/${employee._id}`);
    },
    onDetailEmployee(employee) {
      this.$router.push(`/Detail-Employee/${employee._id}`);
    },
    onDeleteEmployee(item) {
      this.isShowModalDelete = true;
      this.itemSelected = item._id;
    },
    async confirmDeleteEmployee() {
      const status = await deleteEmployee(this.itemSelected);
      await this.fetchAllEmployees();
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Deleted successfully";
      }
    },
    onCopy(message) {
      this.$copyText(message).then(function () {
        alert("Copied");
      });
    },
    changeYear(year) {
      this.yearFilter = year;
    },
    changePerPage(perPage) {
      this.perPage = perPage;
    },
    async fetchDataListJobs() {
      const { data } = await getAllJobs();
      const selectAlll = {
        _id: "All jobs",
        jobName: "Tất cả Jobs",
        orderDate: "",
        amount: "",
        jobDescription: "",
        note: "",
      };
      this.dataListJobs = [selectAlll, ...data];
    },
    changeJobFilter(job) {
      this.jobFilterSelected = job;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  font-size: 14px;

  th,
  td,
  button {
    font-size: 14px;
  }
}

.table td,
.table th {
  padding: 10px;
}

.table td {
  white-space: pre-wrap;
}

.btn-employee {
  font-size: 14px;
}

.action_label {
  cursor: pointer;
}
.search_status {
  min-width: 180px;
  border: 1px solid #1665d8;
  color: #1665d8;
  font-size: 12px;
  padding: 10px;
  border-radius: 20px;
  margin-left: 20px;
}
.head-link-set {
  gap: 24px;
}

.table-heading .button {
  left: 10px;
  top: 10px;
}

@media (max-width: 991.98px) {
  .btn-employee {
    padding-left: 20px;
  }
}
</style>
