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
                    <label class="label">Nguồn</label>
                    <input
                      type="text"
                      v-model="dataEmployee.source"
                      placeholder="Nguồn"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày về/nhập CV</label>
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
                    <label class="label">Job</label>
                    <input
                      type="text"
                      v-model="dataEmployee.job"
                      placeholder="Job"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Họ và tên</label>
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
                    <label class="label">Năm sinh</label>
                    <input
                      type="text"
                      v-model="dataEmployee.birthYear"
                      placeholder="Năm sinh"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Trình độ học vấn</label>
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
                    <label class="label">Chuyên ngành</label>
                    <input
                      type="text"
                      v-model="dataEmployee.specialized"
                      placeholder="Chuyên ngành"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Số điện thoại</label>
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
                    <label class="label">Địa chỉ mail</label>
                    <input
                      type="text"
                      v-model="dataEmployee.email"
                      placeholder="Địa chỉ mail"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link CV</label>
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
                    <label class="label">Link SP</label>
                    <input
                      type="text"
                      v-model="dataEmployee.linkSP"
                      placeholder="Link SP"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link FB</label>
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
                  <div class="form-group text-area-group">
                    <label class="label">Đơn vị UV từng làm</label>
                    <textarea
                      type="text"
                      v-model="dataEmployee.companyUV"
                      placeholder="Đơn vị UV từng làm"
                    ></textarea>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group text-area-group">
                    <label class="label">HR suggest</label>
                    <textarea
                      type="text"
                      v-model="dataEmployee.hrSuggest"
                      placeholder="HR suggest"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">HR chấm</label>
                    <b-form-select
                      placeholder="HR chấm"
                      v-model="dataEmployee.hrMark"
                      :options="markOptions"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Bộ phận chấm</label>
                    <b-form-select
                      placeholder="Bộ phận chấm"
                      v-model="dataEmployee.partMark"
                      :options="markOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Vòng 1</label>
                    <b-form-select
                      placeholder="Vòng 1"
                      v-model="dataEmployee.round1"
                      :options="round1Options"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tham gia Vòng 1</label>
                    <b-form-select
                      placeholder="Tham gia Vòng 1"
                      v-model="dataEmployee.joinRound1"
                      :options="interviewOptions"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả PV V1</label>
                    <b-form-select
                      placeholder="Kết quả PV V1"
                      v-model="dataEmployee.interviewV1"
                      :options="markOptions"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Notes</label>
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
                    <label class="label">Vòng 2</label>
                    <b-form-select
                      placeholder="Vòng 2"
                      v-model="dataEmployee.round2"
                      :options="round2Options"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tham gia Vòng 2</label>
                    <b-form-select
                      placeholder="Tham gia Vòng 2"
                      v-model="dataEmployee.joinRound2"
                      :options="interviewOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả PV V2</label>
                    <b-form-select
                      placeholder="Kết quả PV V2"
                      v-model="dataEmployee.interviewV2"
                      :options="markOptions"
                    ></b-form-select>
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
                    <b-form-select
                      placeholder="OFFER"
                      v-model="dataEmployee.offer"
                      :options="offerOptions"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả offer</label>
                    <b-form-select
                      placeholder="Kết quả offer"
                      v-model="dataEmployee.offerResult"
                      :options="offerResultOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Notes</label>
                    <input
                      type="text"
                      v-model="dataEmployee.notes2"
                      placeholder="Notes"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">ĐI LÀM</label>
                    <b-form-select
                      placeholder="ĐI LÀM"
                      v-model="dataEmployee.goWork"
                      :options="goWorkOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày đi làm</label>
                    <input
                      type="text"
                      v-model="dataEmployee.onboardDate"
                      placeholder="Ngày đi làm"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Thời gian thử việc</label>
                    <b-form-select
                      placeholder="Thời gian thử việc"
                      v-model="dataEmployee.probationTime"
                      :options="probationTimeOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả thử việc</label>
                    <b-form-select
                      placeholder="Kết quả thử việc"
                      v-model="dataEmployee.probationResult"
                      :options="probationResultOptions"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Note</label>
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
      markOptions: [
        { value: "Pass", text: "Pass" },
        { value: "Fail", text: "Fail" },
      ],
      interviewOptions: [
        { value: "Đến", text: "Đến" },
        { value: "Không đến", text: "Không đến" },
      ],
      round1Options: [
        { value: "PV Vòng 1", text: "PV Vòng 1" },
        { value: "Test", text: "Test" },
      ],
      round2Options: [
        { value: "PV Vòng 2", text: "PV Vòng 2" },
        { value: "Test", text: "Test" },
      ],
      offerOptions: [
        { value: "Đã gọi", text: "Đã gọi" },
        { value: "Không gọi được", text: "Không gọi được" }
      ],
      offerResultOptions: [
        { value: "Yes", text: "Yes" },
        { value: "No", text: "No" },
      ],
      goWorkOptions: [
        { value: "Đi làm", text: "Đi làm" },
        { value: "Từ chối", text: "Từ chối" },
      ],
      probationTimeOptions: [
        { value: "Không thử việc", text: "Không thử việc" },
        { value: "30 ngày", text: "30 ngày" },
        { value: "60 ngày", text: "60 ngày" },
        { value: "Khác", text: "Khác" },
      ],
      probationResultOptions: [
        { value: "Pass", text: "Pass" },
        { value: "Fail", text: "Fail" },
        { value: "Nghỉ", text: "Nghỉ" },
      ],
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

<style scoped lang="scss">
.form-group textarea {
  padding: 10px;

  &:focus {
    border: 1px solid #ebecf1 !important;
  }
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;

  &.text-area-group {
    align-items: flex-start;
  }

  input,
  select {
    height: 40px;
  }
}
.label {
  padding-right: 20px;
  text-align: left;
  width: 180px;
}
</style>
