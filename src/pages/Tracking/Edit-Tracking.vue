<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Chỉnh sửa tracking</h2>
          <p v-if="track">{{ track.name }}</p>
        </div>
      </div>

      <div v-if="loading" class="ui-card ui-empty"><span class="ui-spin"></span></div>
      <div v-else-if="loadError" class="ui-notice error"><i class="fas fa-exclamation-triangle"></i><div>{{ loadError }}</div></div>

      <tracking-form
        v-else
        :model-value="track"
        submit-label="Lưu thay đổi"
        :loading="isEditing"
        :submit-error="submitError"
        @submit="onEditTracking"
        @cancel="isShowModalCancel = true"
      />

      <b-modal centered title="Xác nhận hủy" v-model="isShowModalCancel" @ok="$router.push('/tracking-candidates')" ok-title="Hủy chỉnh sửa" cancel-title="Quay lại">
        <p>Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ mất.</p>
      </b-modal>
      <b-modal centered title="Thông báo" v-model="isShowModalSuccess" @hidden="$router.push('/tracking-candidates')" ok-only ok-title="Về danh sách">
        <p>Đã cập nhật tracking.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TrackingForm from "@/components/TrackingForm.vue";
import { getTrack, updateTrack } from "@/services/track-service";

const route = useRoute();
const track = ref(null);
const loading = ref(true);
const loadError = ref("");
const isEditing = ref(false);
const isShowModalCancel = ref(false);
const isShowModalSuccess = ref(false);
const submitError = ref("");

onMounted(async () => {
  try {
    const { data } = await getTrack(route.params.id);
    if (!data) loadError.value = "Không tìm thấy bản ghi.";
    track.value = data;
  } catch {
    loadError.value = "Không tải được dữ liệu.";
  }
  loading.value = false;
});

async function onEditTracking(payload) {
  isEditing.value = true;
  submitError.value = "";
  try {
    const { status } = await updateTrack(route.params.id, payload);
    if (status === 200) isShowModalSuccess.value = true;
    else submitError.value = "Không lưu được thay đổi. Vui lòng thử lại.";
  } catch {
    submitError.value = "Không kết nối được máy chủ.";
  }
  isEditing.value = false;
}
</script>
