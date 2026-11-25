<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Thêm tracking ứng viên</h2>
          <p>Ghi lại lịch phỏng vấn, kết quả, offer và thử việc.</p>
        </div>
      </div>

      <tracking-form
        submit-label="Thêm tracking"
        :loading="isCreating"
        :submit-error="submitError"
        @submit="onCreateTracking"
        @cancel="isShowModalCancel = true"
      />

      <b-modal centered title="Xác nhận hủy" v-model="isShowModalCancel" @ok="$router.push('/tracking-candidates')" ok-title="Hủy thêm" cancel-title="Quay lại">
        <p>Bạn có chắc muốn hủy? Thông tin đã nhập sẽ không được lưu.</p>
      </b-modal>
      <b-modal centered title="Thông báo" v-model="isShowModalSuccess" @hidden="$router.push('/tracking-candidates')" ok-only ok-title="Về danh sách">
        <p>Đã thêm tracking ứng viên.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TrackingForm from "@/components/TrackingForm.vue";
import { createTrack } from "@/services/track-service";

const isShowModalCancel = ref(false);
const isShowModalSuccess = ref(false);
const isCreating = ref(false);
const submitError = ref("");

async function onCreateTracking(payload) {
  isCreating.value = true;
  submitError.value = "";
  try {
    const { status } = await createTrack(payload);
    if (status === 200) isShowModalSuccess.value = true;
    else submitError.value = "Không thêm được. Vui lòng thử lại.";
  } catch {
    submitError.value = "Không kết nối được máy chủ.";
  }
  isCreating.value = false;
}
</script>
