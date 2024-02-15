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
              <li class="breadcrumb-item active">Details Employees CV</li>
            </ul>
            <h3>Edit Employees</h3>
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
                    <label class="label">Nguồn</label>
                    <input type="text" :value="dataEmployee.source" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày về/nhập CV</label>
                    <input type="text" :value="dataEmployee.cvDate" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Job</label>
                    <input type="text" :value="dataEmployee.job" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Họ và tên</label>
                    <input type="text" :value="dataEmployee.name" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Năm sinh</label>
                    <input
                      type="text"
                      :value="dataEmployee.birthYear"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Trình độ học vấn</label>
                    <input
                      type="text"
                      :value="dataEmployee.academicLevel"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Chuyên ngành</label>
                    <input
                      type="text"
                      :value="dataEmployee.specialized"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Số điện thoại</label>
                    <input type="text" :value="dataEmployee.phone" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Địa chỉ mail</label>
                    <input type="text" :value="dataEmployee.email" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link CV</label>
                    <input
                      type="button"
                      :value="dataEmployee.linkCV"
                      @click="openLink(dataEmployee.linkCV)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link SP</label>
                    <input
                      type="button"
                      :value="dataEmployee.linkSP"
                      @click="openLink(dataEmployee.linkSP)"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link FB</label>
                    <input
                      type="button"
                      :value="dataEmployee.linkFB"
                      @click="openLink(dataEmployee.linkFB)"
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
                    <label class="label">Đơn vị UV từng làm</label>
                    <input
                      type="text"
                      :value="dataEmployee.companyUV"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">HR suggest</label>
                    <input
                      type="text"
                      :value="dataEmployee.hrSuggest"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">HR chấm</label>
                    <input type="text" :value="dataEmployee.hrMark" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Bộ phận chấm</label>
                    <input
                      type="text"
                      :value="dataEmployee.partMark"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Vòng 1</label>
                    <input type="text" :value="dataEmployee.round1" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tham gia Vòng 1</label>
                    <input
                      type="text"
                      :value="dataEmployee.joinRound1"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả PV V1</label>
                    <input
                      type="text"
                      :value="dataEmployee.interviewV1"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Notes</label>
                    <input type="text" :value="dataEmployee.notes" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Vòng 2</label>
                    <input type="text" :value="dataEmployee.round2" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tham gia Vòng 2</label>
                    <input
                      type="text"
                      :value="dataEmployee.joinRound2"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả PV V2</label>
                    <input
                      type="text"
                      :value="dataEmployee.interviewV2"
                      disabled
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
                    <label class="label">OFFER</label>
                    <input type="text" :value="dataEmployee.offer" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả offer</label>
                    <input
                      type="text"
                      :value="dataEmployee.offerResult"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Notes</label>
                    <input type="text" :value="dataEmployee.notes2" disabled />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">ĐI LÀM</label>
                    <input type="text" :value="dataEmployee.goWork" disabled />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày đi làm</label>
                    <input
                      type="text"
                      :value="dataEmployee.onboardDate"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Thời gian thử việc</label>
                    <input
                      type="text"
                      :value="dataEmployee.probationTime"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả thử việc</label>
                    <input
                      type="text"
                      :value="dataEmployee.probationResult"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Note</label>
                    <input type="text" :value="dataEmployee.notes3" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="row">
              <div class="col-xl-12 col-sm-12 col-12">
                <div class="form-btn">
                  <a @click="onEditEmployee" class="btn btn-apply w-auto">
                    <b-spinner
                      v-if="isEditing"
                      variant="success"
                      label="Spinning"
                    ></b-spinner>
                    <span v-else>Save</span>
                  </a>
                  <a @click="onCancel" class="btn btn-secondary">Cancel</a>
                </div>
              </div>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployee } from "@/services/employee-service";

export default {
  name: "DetailEmployee",
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
    };
  },
  mounted() {
    this.getDataEmployee();
  },
  methods: {
    async getDataEmployee() {
      const { data } = await getEmployee(this.$route.params.id);
      this.dataEmployee = data;
    },
    openLink(link) {
      if(link) window.open(link, "_black");
    },
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.label {
  padding-right: 20px;
  text-align: left;
  width: 180px;
}
.form-group input[type="text"]:disabled {
  cursor: pointer;
}
.form-group select, .form-group input[type="text"] {
    min-height: 50px;
}
input[type="button"] {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(235, 236, 241, 1);
  padding: 0 20px;
  font-size: 15px;
  color: #000000;
  border-radius: 5px;
  overflow: hidden;
}
</style>
