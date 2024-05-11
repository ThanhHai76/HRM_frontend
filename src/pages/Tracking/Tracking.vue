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
              <li class="breadcrumb-item active">Tracking Candidates</li>
            </ul>
            <h3>Tracking Candidates</h3>
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
                @click="createTrack"
              >
                Add Tracking Candidate
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="table-responsive" @scroll="onScollTable">
              <table class="table table-bordered custom-table no-footer">
                <thead>
                  <tr>
                    <th class="sticky-col first-col">STT</th>
                    <th class="sticky-col second-col">Thao tác</th>
                    <th class="sticky-col third-col">Ngày về/ Nhập CV</th>
                    <th class="sticky-col fourth-col">Job</th>
                    <th class="sticky-col fifth-col">Họ và tên</th>
                    <th class="sticky-col sixth-col">SĐT</th>
                    <th>Địa chỉ Email</th>
                    <th>Link CV</th>
                    <th>Ngày PV</th>
                    <th>Thời gian PV vòng 1</th>
                    <th>Người PV</th>
                    <th>Phòng PV</th>
                    <th>Team</th>
                    <th>Thay đổi thời gian PV</th>
                    <th>Tình trạng tham gia PV V1</th>
                    <th>Test/ PV vòng 2</th>
                    <th>Tình trạng tham gia vòng 2</th>
                    <th>Đánh giá</th>
                    <th>Kết quả PV</th>
                    <th>Ngày chốt KQPV</th>
                    <th>Kết quả offer</th>
                    <th>Lương chính thức</th>
                    <th>Lương thử việc</th>
                    <th>Ngày bắt đầu đi làm</th>
                    <th>Thời gian thử việc</th>
                    <th>Ngày hết thử việc</th>
                    <th>Đi mail thông báo / cảm ơn</th>
                    <th>Tình trạng thử việc</th>
                    <th>Update tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataListTracks" :key="item._id">
                    <td class="sticky-col first-col">{{ index + 1 }}</td>
                    <td
                      class="second-col"
                      :class="{ 'sticky-col': isScrolling }"
                    >
                      <div class="dropdown">
                        <button
                          class="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          @click="isScrolling = false"
                        >
                          Tuỳ chọn
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="dropdown-item" @click="onEditTrack(item)"
                              >Edit</a
                            >
                          </li>
                          <li>
                            <a class="dropdown-item" @click="onDeleteTrack(item)"
                              >Delete</a
                            >
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td class="sticky-col third-col">
                      {{ formatDatePicker(item.cvDate) }}
                    </td>
                    <td class="sticky-col fourth-col">{{ item.job }}</td>
                    <td class="sticky-col fifth-col">{{ item.name }}</td>
                    <td class="sticky-col sixth-col">{{ item.phone }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.linkCV }}</td>
                    <td>{{ formatDatePicker(item.interviewDate) }}</td>
                    <td>{{ formatDateTime(item.interviewTime) }}</td>
                    <td>{{ item.interviewer }}</td>
                    <td>{{ item.interviewRoom }}</td>
                    <td>{{ item.team }}</td>
                    <td>{{ item.interviewTimeChange }}</td>
                    <td>{{ item.joinRound1Status }}</td>
                    <td>{{ item.testInterviewRound2 }}</td>
                    <td>{{ item.joinRound2Status }}</td>
                    <td>{{ item.evaluation }}</td>
                    <td>{{ item.interviewResult }}</td>
                    <td>
                      {{ formatDatePicker(item.interviewResultClosingDate) }}
                    </td>
                    <td>{{ item.offerResult }}</td>
                    <td>{{ item.officialSalary }}</td>
                    <td>{{ item.probationarySalary }}</td>
                    <td>{{ formatDatePicker(item.startWorkDate) }}</td>
                    <td>{{ item.probationaryTime }}</td>
                    <td>{{ formatDatePicker(item.probationaryEndDate) }}</td>
                    <td>{{ item.sendMail }}</td>
                    <td>{{ item.probationStatus }}</td>
                    <td>{{ item.statusUpdate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
        @ok="confirmDeleteTrack"
        ok-title="Confirm"
      >
        <div>
          <p>Confirm to delete this Tracking Candidate</p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { deleteTrack, getAllTracks } from "@/services/track-service";
import moment from "moment";
export default {
  name: "TrackingPage",
  setup() {
    return {};
  },
  data() {
    return {
      dataListTracks: [],
      isShowModalSuccess: false,
      messageNoti: "",
      isEditMode: false,
      selectedTrack: "",
      isShowModalDeleteJob: false,
      titleModal: "",
      isScrolling: false,
    };
  },
  computed: {
    amountTotal() {
      return this.dataListTracks.length;
    },
    probationaryEndList() {
      const currentTime = new Date().getTime();
      const getTime = (time) => new Date(time).getTime();
      return this.dataListTracks.filter(
        (item) =>
          currentTime + 5 * 24 * 60 * 60 * 1000 >
            getTime(item.probationaryEndDate) &&
          currentTime < getTime(item.probationaryEndDate)
      );
    },
  },
  async mounted() {
    await this.fetchDataListTrack();
  },
  methods: {
    async fetchDataListTrack() {
      const { data } = await getAllTracks();
      this.dataListTracks = data;
      this.$store.commit('SET_TRACKING_LIST', this.dataListTracks);
    },
    async createTrack() {
      this.$router.push("/add-tracking-candidate");
    },
    onEditTrack(item) {
      this.$router.push(`/edit-tracking-candidate/${item._id}`);
    },
    onDeleteTrack(item) {
      this.isShowModalDeleteJob = true;
      this.selectedTrack = item._id;
    },
    async confirmDeleteTrack() {
      const status = await deleteTrack(this.selectedTrack);
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Deleted successfully";
      }
      await this.fetchDataListTrack();
    },
    formatDatePicker(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
    },
    formatDateTime(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    onScollTable() {
      this.isScrolling = true;
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
  td {
    white-space: pre-wrap;
  }
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  background-color: white;
}
.first-col {
  width: 100px;
  min-width: 101px;
  max-width: 101px;
  left: -1px;
}
.second-col {
  width: 120px;
  min-width: 121px;
  max-width: 120px;
  left: 99px;
}
.third-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 99px;
}
.fourth-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 240px;
}
.fifth-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 388px;
}
.sixth-col {
  width: 150px;
  min-width: 150px;
  max-width: 150px;
  left: 536px;
}
</style>
