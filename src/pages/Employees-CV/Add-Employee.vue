<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a @click="$router.push('/employee')">Employee</a>
              </li>
              <li class="breadcrumb-item active">Add Employees</li>
            </ul>
            <h3>Add Employees</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Basic Infomation</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.source"
                      placeholder="Nguồn"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.cvDate"
                      placeholder="Ngày về/nhập CV"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.job"
                      placeholder="Job"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.name"
                      placeholder="Họ và tên"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.birthYear"
                      placeholder="Năm sinh"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.academicLevel"
                      placeholder="Trình độ học vấn"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.specialized"
                      placeholder="Chuyên ngành"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.phone"
                      placeholder="SĐT"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.email"
                      placeholder="Địa chỉ mail"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.linkCV"
                      placeholder="Link CV"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.linkSP"
                      placeholder="Link SP"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.linkFB"
                      placeholder="Link FB"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Employment Details</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.companyUV"
                      placeholder="Đơn vị UV từng làm"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.hrSuggest"
                      placeholder="HR suggest"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.hrMark"
                      placeholder="HR chấm"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.partMark"
                      placeholder="Bộ phận chấm"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.round1"
                      placeholder="Vòng 1"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.joinRound1"
                      placeholder="Tham gia Vòng 1"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.interviewV1"
                      placeholder="Kết quả PV V1"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.notes"
                      placeholder="Notes"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.round2"
                      placeholder="Vòng 2"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.joinRound2"
                      placeholder="Tham gia Vòng 2"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.interviewV2"
                      placeholder="Kết quả PV V2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-titles">Salary/Offer Details</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.offer"
                      placeholder="OFFER"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.offerResult"
                      placeholder="Kết quả offer"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.notes2"
                      placeholder="Notes"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.goWork"
                      placeholder="ĐI LÀM"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.onboardDate"
                      placeholder="Ngày đi làm"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.probationTime"
                      placeholder="THỬ VIỆC Thời gian"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.probationResult"
                      placeholder="Kết quả thử việc"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="dataEmployee.notes3"
                      placeholder="Note"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-12 col-sm-12 col-12">
              <div class="form-btn">
                <a @click="onAddEmployee" class="btn btn-apply w-auto">
                  <b-spinner
                    v-if="isAdding"
                    variant="success"
                    label="Spinning"
                  ></b-spinner>
                  <span v-else>Add Employee</span>
                </a>
                <a @click="onCancel" class="btn btn-secondary">Cancel</a>
              </div>
            </div>
          </div>
        </div>

        <b-modal
          id="modal-cancel"
          centered
          title="Confirm cancel"
          v-model="isShowModalCancel"
          @ok="$router.push('/employee')"
          ok-title="Confirm"
        >
          <div>
            <p>{{ messageNoti }}</p>
          </div>
        </b-modal>

        <b-modal
          id="modal-success"
          centered
          title="Notify"
          v-model="isShowModalSuccess"
          @ok="$router.push('/employee')"
          ok-title="Confirm"
        >
          <div>
            <p>{{ messageNoti }}</p>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { createEmployee } from "@/services/employee-service";

export default {
  name: "AddEmployee",
  data() {
    return {
      dataEmployee: {
        source: "",
        cvDate: "",
        job: "",
        name: "",
        birthYear: "",
        academicLevel: "",
        specialized: "",
        phone: "",
        email: "",
        linkCV: "",
        linkSP: "",
        linkFB: "",
        companyUV: "",
        hrSuggest: "",
        hrMark: "",
        partMark: "",
        round1: "",
        joinRound1: "",
        interviewV1: "",
        round2: "",
        joinRound2: "",
        interviewV2: "",
        notes: "",
        offer: "",
        offerResult: "",
        notes2: "",
        goWork: "",
        onboardDate: "",
        probationTime: "",
        probationResult: "",
        notes3: "",
      },
      isShowModalCancel: false,
      isShowModalSuccess: false,
      messageNoti: "",
      isAdding: false,
    };
  },
  methods: {
    async onAddEmployee() {
      if (!this.dataEmployee.phone) {
        alert("You should add information");
        return;
      }
      this.isAdding = true;
      const { status } = await createEmployee(this.dataEmployee);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Add a employee successfully";
      }
      this.isAdding = false;
    },
    onCancel() {
      this.isShowModalCancel = true;
      this.messageNoti = "Are you sure you want to cancel";
    },
  },
};
</script>

<style scoped lang="scss"></style>
