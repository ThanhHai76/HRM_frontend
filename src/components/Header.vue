<template>
  <div class="header">
    <div class="header-left">
      <a href="/" class="logo">
        <img class="brand-full" src="@/assets/img/logo-hrm.svg" alt="HRM Recruitment" />
      </a>
      <a href="/" class="logo logo-small">
        <img src="@/assets/img/logo-mark.svg" alt="HRM" width="34" height="34" />
      </a>
      <a id="toggle_btn" role="button" title="Thu gọn / mở menu" @click="$emit('toggle-sidebar')">
        <span class="bar-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </a>
    </div>

    <ul class="nav user-menu">
      <div
        v-if="interviewList.length > 0"
        class="d-flex align-items-center notification-alarm mr-4"
        @click="onClickInterview"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-person-badge"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
          />
          <path
            d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z"
          />
        </svg>
        <div class="noti-red"></div>
      </div>

      <b-modal
        id="modal-noti"
        centered
        title="Danh sách ứng viên ứng viên phỏng vấn hôm nay"
        v-model="isShowModalInterviewNotify"
        ok-title="Confirm"
      >
        <div>
          <div
            class="d-flex"
            v-for="(item, index) in interviewList"
            :key="item._id"
          >
            <b class="mr-1">{{ index + 1 }}. </b>
            <b class="mr-2">{{ item.name }}:</b>
            <div>{{ formatDatePicker(item.interviewDate) }}</div>
          </div>
        </div>
      </b-modal>

      <div
        v-if="probationaryEndList.length > 0"
        class="d-flex align-items-center notification-alarm mr-2"
        @click="onClickAlarm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-bell"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
          />
        </svg>
        <div class="noti-red"></div>
      </div>

      <b-modal
        id="modal-noti"
        centered
        title="Danh sách ứng viên sắp hết thử việc"
        v-model="isShowModalProbationNotify"
        ok-title="Confirm"
      >
        <div>
          <div
            class="d-flex"
            v-for="(item, index) in probationaryEndList"
            :key="item._id"
          >
            <b class="mr-1">{{ index + 1 }}. </b>
            <b class="mr-2">{{ item.name }}:</b>
            <div>{{ formatDatePicker(item.probationaryEndDate) }}</div>
          </div>
        </div>
      </b-modal>

      <li class="nav-item dropdown has-arrow main-drop">
        <a href="#" class="nav-link" data-toggle="dropdown">
          <span class="user-img">
            <span class="avatar-ini user-avatar" :style="{ background: userAvatarColor }" :title="getUserName">{{ userInitials }}</span>
            <span class="status online"></span>
          </span>
        </a>
      </li>
      <div class="dropdown d-flex align-items-center">
        <button
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ getUserName }}
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { resetAuthData } from "@/services/auth-service";
import { getAllTracks } from "@/services/track-service";
import { useAuthStore } from "@/stores/auth";
import { useTrackingStore } from "@/stores/tracking";
import { formatDate } from "@/utils/format";
import { avatarColor, initials } from "@/utils/avatar";

defineEmits(["toggle-sidebar"]);

const router = useRouter();
const auth = useAuthStore();
const trackingStore = useTrackingStore();

const dataListTracks = ref([]);
const isShowModalProbationNotify = ref(false);
const isShowModalInterviewNotify = ref(false);

const getUserName = computed(() => auth.user && auth.user.userName);

const userInitials = computed(() => initials(getUserName.value));
const userAvatarColor = computed(() => avatarColor(getUserName.value));

const formatDatePicker = (date) => (date ? formatDate(date) : undefined);

// Sắp hết thử việc trong 5 ngày tới
const probationaryEndList = computed(() => {
  const now = Date.now();
  const time = (t) => new Date(t).getTime();
  return dataListTracks.value.filter((item) => now + 5 * 24 * 60 * 60 * 1000 > time(item.probationaryEndDate) && now < time(item.probationaryEndDate));
});
// Phỏng vấn hôm nay
const interviewList = computed(() => {
  const today = formatDatePicker(new Date());
  return dataListTracks.value.filter((item) => today === formatDatePicker(item.interviewDate));
});

// Trang Tracking tải lại danh sách -> chuông cập nhật theo
watch(() => trackingStore.list, (list) => {
  if (list) dataListTracks.value = list;
});

onMounted(async () => {
  const { data } = await getAllTracks();
  dataListTracks.value = data || [];
});

const onClickAlarm = () => (isShowModalProbationNotify.value = true);
const onClickInterview = () => (isShowModalInterviewNotify.value = true);

function logout() {
  resetAuthData();
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.notification-alarm {
  cursor: pointer;
  animation: shaking 0.5s infinite alternate;
}

.noti-red {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  transform: translateY(-5px);
}

@keyframes ringing {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shaking {
  0% {
    transform: rotateZ(0deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  50% {
    transform: rotateZ(10deg);
  }
  75% {
    transform: rotateZ(-5deg);
  }
  100% {
    transform: rotateZ(5deg);
  }
}
</style>
