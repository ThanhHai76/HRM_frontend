<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-2"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Employees</li>
            </ul>
            <h3>Employees</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="head-link-set">
            <div class="top-nav-search">
              <form>
                <input
                  type="text"
                  class="form-control"
                  v-model="searchWord"
                  placeholder="Search for mobile phone"
                />
                <button class="btn" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div class="d-flex">
              <button
                type="button"
                class="btn btn-outline-success btn-lg mr-4"
                @click="addEmployee"
              >
                Add Employee
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg"
                @click="importExcel"
              >
                Import Excel
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="card">
            <div class="table-heading">
              <h2>{{ employeeFilter.length }} Employees</h2>
            </div>
            <div class="table-responsive">
              <table class="table custom-table no-footer">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Nguồn</th>
                    <th>Ngày về/nhập CV</th>
                    <th>Job</th>
                    <th>Họ và tên</th>
                    <th>Năm sinh</th>
                    <th>Trình độ học vấn</th>
                    <th>Chuyên ngành</th>
                    <th>SĐT</th>
                    <th>Địa chỉ mail</th>
                    <th>Link CV</th>
                    <th>Link SP</th>
                    <th>Link FB</th>
                    <th>Đơn vị UV từng làm</th>
                    <th>HR suggest</th>
                    <th>HR chấm</th>
                    <th>Bộ phận chấm</th>
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
                    <td>Ngày tạo</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) of employeePerpage" :key="item._id">
                    <td>{{ (this.currentPage - 1) * perPage + index + 1 }}</td>
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
                      <label class="action_label">{{ item.phone }}</label>
                    </td>
                    <td>
                      <label class="action_label">{{ item.email }}</label>
                    </td>
                    <td>
                      <label>{{ item.cvLinkPDF }} </label>
                    </td>
                    <td>{{ item.linkSP }}</td>
                    <td>{{ item.linkFB }}</td>
                    <td>{{ item.companyUV }}</td>
                    <td>{{ item.hrSuggest }}</td>
                    <td>{{ item.hrMark }}</td>
                    <td>{{ item.partMark }}</td>
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
                    </td>
                    <td class="tab-select">
                      <div class="dropdown">
                        <button
                          class="btn btn-info dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Options
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              class="dropdown-item"
                              @click="onEditEmployee(item)"
                              >Edit</a
                            >
                          </li>
                          <li>
                            <a
                              class="dropdown-item"
                              @click="onDeleteEmployee(item)"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </td>
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
        id="modal-edit"
        centered
        title="Edit employee"
        v-model="isShowModalEdit"
      >
        <div></div>
      </b-modal>

      <b-modal
        id="modal-delete"
        centered
        title="Confirm delete"
        v-model="isShowModalDelete"
        @ok="confirmDeleteEmployee"
      >
        <div>
          <p>Confirm to delete this Employee</p>
        </div>
      </b-modal>

      <b-modal
        id="modal-success"
        centered
        title="Notify"
        v-model="isShowModalSuccess"
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
      isShowModalEdit: false,
      isShowModalDelete: false,
      isShowModalSuccess: false,
      messageNoti: "",
    };
  },
  computed: {
    employeeFilter() {
      const trimWord = this.searchWord.toUpperCase().trim();
      return this.allEmployees.filter(
        ({ name, phone, email, job, birthYear, academicLevel, specialized }) =>
          (name || "").toUpperCase().includes(trimWord) ||
          (phone || "").toUpperCase().includes(trimWord) ||
          (email || "").toUpperCase().includes(trimWord) ||
          (job || "").toUpperCase().includes(trimWord) ||
          (birthYear || "").toUpperCase().includes(trimWord) ||
          (academicLevel || "").toUpperCase().includes(trimWord) ||
          (specialized || "").toUpperCase().includes(trimWord)
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
  },
  async mounted() {
    this.fetchAllEmployees();
  },
  methods: {
    convertTime(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    addEmployee() {
      this.$router.push("/add-employee");
    },
    importExcel() {
      this.$router.push("/import-excel-empoyee");
    },
    async fetchAllEmployees() {
      const { data } = await getALLEmployees();
      this.allEmployees = data;
    },
    onEditEmployee(employee) {
      this.isShowModalEdit = true;
      this.itemSelected = employee;
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
  },
};
</script>

<style lang="scss" scoped></style>
