<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a @click="$router.push('/tracking-candidates')">Tracking</a>
              </li>
              <li class="breadcrumb-item active">Edit Tracking Candidate</li>
            </ul>
            <h3>Edit Tracking Candidate</h3>
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
                    <label class="label">Ngày về/ Nhập CV</label>
                    <VueDatePicker
                      v-model="dataTracking.cvDate"
                      :enable-time-picker="false"
                      placeholder="Ngày về/ Nhập CV"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Job</label>
                    <input
                      type="text"
                      v-model="dataTracking.job"
                      placeholder="Job"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Họ và tên</label>
                    <input
                      type="text"
                      v-model="dataTracking.name"
                      placeholder="Họ và tên"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">SĐT</label>
                    <input
                      type="text"
                      v-model="dataTracking.phone"
                      placeholder="SĐT"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Địa chỉ Email</label>
                    <input
                      type="text"
                      v-model="dataTracking.email"
                      placeholder="Địa chỉ Email"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Link CV</label>
                    <input
                      type="text"
                      v-model="dataTracking.linkCV"
                      placeholder="Link CV"
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
              <h2 class="card-titles">Interview Details</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày PV</label>
                    <VueDatePicker
                      v-model="dataTracking.interviewDate"
                      :enable-time-picker="false"
                      placeholder="Ngày PV"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Thời gian PV vòng 1</label>
                    <VueDatePicker
                      v-model="dataTracking.interviewTime"
                      placeholder="Thời gian PV vòng 1"
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Người PV</label>
                    <input
                      type="text"
                      v-model="dataTracking.interviewer"
                      placeholder="Người PV"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Phòng PV</label>
                    <input
                      type="text"
                      v-model="dataTracking.interviewRoom"
                      placeholder="Phòng PV"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Team</label>
                    <input
                      type="text"
                      v-model="dataTracking.team"
                      placeholder="Team"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Thay đổi thời gian PV</label>
                    <VueDatePicker
                      v-model="dataTracking.interviewTimeChange"
                      placeholder="Thay đổi thời gian PV"
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tình trạng tham gia PV V1</label>
                    <input
                      type="text"
                      v-model="dataTracking.joinRound1Status"
                      placeholder="Tình trạng tham gia PV V1"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Test/ PV vòng 2</label>
                    <input
                      type="text"
                      v-model="dataTracking.testInterviewRound2"
                      placeholder="Test/ PV vòng 2"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tình trạng tham gia vòng 2</label>
                    <input
                      type="text"
                      v-model="dataTracking.joinRound2Status"
                      placeholder="Tình trạng tham gia vòng 2"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Đánh giá</label>
                    <input
                      type="text"
                      v-model="dataTracking.evaluation"
                      placeholder="Đánh giá"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả PV</label>
                    <input
                      type="text"
                      v-model="dataTracking.interviewResult"
                      placeholder="Kết quả PV"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày chốt KQPV</label>
                    <VueDatePicker
                      v-model="dataTracking.interviewResultClosingDate"
                      :enable-time-picker="false"
                      placeholder="Ngày chốt KQPV"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Kết quả offer</label>
                    <input
                      type="text"
                      v-model="dataTracking.offerResult"
                      placeholder="Kết quả offer"
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
              <h2 class="card-titles">Tracking</h2>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Lương chính thức</label>
                    <input
                      type="text"
                      v-model="dataTracking.officialSalary"
                      placeholder="Lương chính thức"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Lương thử việc</label>
                    <input
                      type="text"
                      v-model="dataTracking.probationarySalary"
                      placeholder="Lương thử việc"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày bắt đầu đi làm</label>
                    <VueDatePicker
                      v-model="dataTracking.startWorkDate"
                      placeholder="Ngày bắt đầu đi làm"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Thời gian thử việc</label>
                    <input
                      type="text"
                      v-model="dataTracking.probationaryTime"
                      placeholder="Thời gian thử việc"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Ngày hết thử việc</label>
                    <VueDatePicker
                      v-model="dataTracking.probationaryEndDate"
                      placeholder="Ngày hết thử việc"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Đi mail</label>
                    <input
                      type="text"
                      v-model="dataTracking.sendMail"
                      placeholder="Đi mail "
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Tình trạng thử việc</label>
                    <input
                      type="text"
                      v-model="dataTracking.probationStatus"
                      placeholder="Tình trạng thử việc"
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-sm-12 col-12">
                  <div class="form-group">
                    <label class="label">Update tình trạng</label>
                    <input
                      type="text"
                      v-model="dataTracking.statusUpdate"
                      placeholder="Update tình trạng"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-12 col-sm-12 col-12">
          <div class="row">
            <div class="col-xl-12 col-sm-12 col-12">
              <div class="form-btn">
                <a @click="onEditTracking" class="btn btn-apply w-auto">
                  <b-spinner
                    v-if="isCreating"
                    variant="success"
                    label="Spinning"
                  ></b-spinner>
                  <span v-else>Save</span>
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
          @ok="$router.push('/tracking-candidates')"
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
          @ok="$router.push('/tracking-candidates')"
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
import { updateTrack, getTrack } from "@/services/track-service";

export default {
  name: "AddTracking",
  data() {
    return {
      dataTracking: {
        job: "",
        cvDate: "",
        name: "",
        phone: "",
        email: "",
        linkCV: "",
        interviewDate: "",
        interviewTime: "",
        interviewer: "",
        interviewRoom: "",
        team: "",
        interviewTimeChange: "",
        joinRound1Status: "",
        testInterviewRound2: "",
        joinRound2Status: "",
        evaluation: "",
        interviewResult: "",
        interviewResultClosingDate: "",
        offerResult: "",
        officialSalary: "",
        probationarySalary: "",
        startWorkDate: "",
        probationaryTime: "",
        probationaryEndDate: "",
        sendMail: "",
        probationStatus: "",
        statusUpdate: "",
      },
      isShowModalCancel: false,
      isShowModalSuccess: false,
      messageNoti: "",
      isCreating: false,
    };
  },
  mounted() {
    this.getDataTracking();
  },
  methods: {
    async getDataTracking() {
      const { data } = await getTrack(this.$route.params.id);
      this.dataTracking = { ...this.dataTracking, ...data };
    },
    async onEditTracking() {
        this.isCreating = true;
      const { status } = await updateTrack(this.$route.params.id, this.dataTracking);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Add a tracking candidate successfully";
      }
      this.isCreating = false;
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
  padding: 20px;

  &:focus {
    border: 1px solid #ebecf1 !important;
  }
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.label {
  padding-right: 20px;
  text-align: left;
  width: 150px;
}
input {
  height: 38px !important;
}
</style>
