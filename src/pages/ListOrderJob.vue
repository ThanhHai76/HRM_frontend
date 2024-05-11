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
              <li class="breadcrumb-item active">List Order Job</li>
            </ul>
            <h3>List Order Job</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12 mb-4">
          <div class="head-link-set flex-wrap">
            <div class="top-nav-search d-flex align-items-center">
              Tổng số lượng: {{ amountTotal }}
            </div>
            <div class="d-flex btn-employee">
              <button
                type="button"
                class="btn btn-outline-success btn-lg mr-4"
                @click="showModalCreateJob"
              >
                Create Job
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="table-responsive">
              <table class="table table-bordered custom-table no-footer">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Job</th>
                    <th>Ngày Order</th>
                    <th>Số lượng</th>
                    <th>JD</th>
                    <th>Chi phí tuyển dụng</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataListJobs" :key="item._id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.jobName }}</td>
                    <td>{{ item.orderDate }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.jobDescription }}</td>
                    <td>{{ formatMoney(item.recruitmentCost) }}</td>
                    <td>{{ item.note }}</td>
                    <td>
                      <div class="dropdown">
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Options
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="dropdown-item" @click="onEditJob(item)"
                              >Edit</a
                            >
                          </li>
                          <li>
                            <a class="dropdown-item" @click="onDeleteJob(item)"
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
      </div>

      <b-modal
        id="modal-create-job"
        centered
        :title="titleModal"
        v-model="isShowModalCreateJob"
        @ok="createJob"
        @cancel="cancelCreateJob"
        ok-title="Confirm"
      >
        <div>
          <b-form>
            <b-form-group
              id="input-group-1"
              label="Tên Job"
              :invalid-feedback="invalidFeedback"
              :state="this.formCreate.jobName !== ''"
            >
              <b-form-input
                id="input-1"
                v-model="formCreate.jobName"
                placeholder="Nhập tên job"
                required
                :state="this.formCreate.jobName !== ''"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Ngày order"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="formCreate.orderDate"
                placeholder="Nhập ngày order"
                required
                :state="this.formCreate.orderDate !== ''"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Số lượng"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="formCreate.amount"
                placeholder="Nhập số lượng"
                required
                type="number"
                :state="this.formCreate.amount !== ''"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-1" label="JD">
              <b-form-input
                id="input-1"
                v-model="formCreate.jobDescription"
                placeholder="Nhập JD"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Chi phí tuyển dụng"
              :invalid-feedback="invalidFeedback"
            >
              <b-form-input
                id="input-1"
                v-model="formCreate.recruitmentCost"
                placeholder="Nhập số lượng"
                required
                type="number"
                :state="formCreate.recruitmentCost !== ''"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-1" label="Note">
              <b-form-input
                id="input-1"
                v-model="formCreate.note"
                placeholder="Nhập note"
              ></b-form-input>
            </b-form-group>
          </b-form>
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

      <b-modal
        id="modal-delete"
        centered
        title="Confirm delete"
        v-model="isShowModalDeleteJob"
        @ok="confirmDeleteJob"
        ok-title="Confirm"
      >
        <div>
          <p>Confirm to delete this Employee CV</p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
} from "@/services/job-service";
export default {
  setup() {
    return {};
  },
  data() {
    return {
      dataListJobs: [],
      isShowModalCreateJob: false,
      formCreate: {
        jobName: "",
        orderDate: "",
        amount: "",
        jobDescription: "",
        recruitmentCost: "",
        note: "",
      },
      isShowModalSuccess: false,
      messageNoti: "",
      isEditMode: false,
      selectedJob: "",
      isShowModalDeleteJob: false,
      titleModal: "",
    };
  },
  computed: {
    checkInvalidForm() {
      return (
        this.formCreate.jobName === "" ||
        this.formCreate.orderDate === "" ||
        this.formCreate.amount === ""
      );
    },
    invalidFeedback() {
      return "Please enter something";
    },
    amountTotal() {
      return this.dataListJobs.reduce((total, job) => total + job.amount, 0);
    },
  },
  async mounted() {
    await this.fetchDataListJobs();
  },
  methods: {
    initForm() {
      this.formCreate = {
        jobName: "",
        orderDate: "",
        amount: "",
        jobDescription: "",
        recruitmentCost: "",
        note: "",
      };
      this.titleModal = "Create job";
    },
    async fetchDataListJobs() {
      const { data } = await getAllJobs();
      this.dataListJobs = data;
    },
    showModalCreateJob() {
      this.titleModal = "Create job";
      this.isShowModalCreateJob = true;
    },
    async createJob() {
      if (this.checkInvalidForm) {
        this.initForm();
        return;
      }
      const { status } = this.isEditMode
        ? await updateJob(this.selectedJob, this.formCreate)
        : await createJob(this.formCreate);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = `${
          this.isEditMode ? "Updated" : "Created"
        } job successfully`;
      }
      await this.fetchDataListJobs();
      this.isShowModalCreateJob = false;
      this.isEditMode = false;
      this.initForm();
    },
    cancelCreateJob() {
      this.isShowModalCreateJob = false;
      this.isEditMode = false;
      this.initForm();
    },
    onEditJob(item) {
      this.isShowModalCreateJob = true;
      this.isEditMode = true;
      this.titleModal = "Edit Job";
      this.selectedJob = item._id;
      this.formCreate = {
        jobName: item.jobName,
        orderDate: item.orderDate,
        amount: item.amount,
        jobDescription: item.jobDescription,
        recruitmentCost: item.recruitmentCost,
        note: item.note,
      };
    },
    onDeleteJob(item) {
      this.isShowModalDeleteJob = true;
      this.selectedJob = item._id;
    },
    async confirmDeleteJob() {
      const status = await deleteJob(this.selectedJob);
      await this.fetchDataListJobs();
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Deleted successfully";
      }
    },
    formatMoney(number) {
      // Convert number to string and split into integer and decimal parts
      const [integerPart, decimalPart] = String(number).split(".");

      // Add dots as thousand separators to the integer part
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );

      if (!number) return "";

      // Combine formatted integer part with decimal part (if exists)
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
}

.table td,
.table th {
  padding: 10px;
}
</style>
