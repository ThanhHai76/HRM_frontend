<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Chỉnh sửa ứng viên</h2>
          <p v-if="employee">{{ employee.name }}</p>
        </div>
      </div>

      <div v-if="loading" class="ui-card ui-empty"><span class="ui-spin"></span></div>
      <div v-else-if="loadError" class="ui-notice error">
        <i class="fas fa-exclamation-triangle"></i><div>{{ loadError }}</div>
      </div>

      <employee-form
        v-else
        :model-value="employee"
        submit-label="Lưu thay đổi"
        :loading="isEditing"
        :submit-error="submitError"
        @submit="onEditEmployee"
        @cancel="isShowModalCancel = true"
      />

      <b-modal
        centered
        title="Xác nhận hủy"
        v-model="isShowModalCancel"
        @ok="$router.push('/employee')"
        ok-title="Hủy chỉnh sửa"
        cancel-title="Quay lại"
      >
        <p>Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ mất.</p>
      </b-modal>

      <b-modal
        centered
        title="Thông báo"
        v-model="isShowModalSuccess"
        @hidden="$router.push('/employee')"
        ok-only
        ok-title="Về danh sách"
      >
        <p>Đã cập nhật hồ sơ ứng viên.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import EmployeeForm from "@/components/EmployeeForm.vue";
import { getEmployee, updateEmployee } from "@/services/employee-service";

const route = useRoute();
const employee = ref(null);
const loading = ref(true);
const loadError = ref("");
const isEditing = ref(false);
const isShowModalCancel = ref(false);
const isShowModalSuccess = ref(false);
const submitError = ref("");

onMounted(async () => {
  try {
    const { data } = await getEmployee(route.params.id);
    if (!data) loadError.value = "Không tìm thấy ứng viên.";
    employee.value = data;
  } catch {
    loadError.value = "Không tải được dữ liệu ứng viên.";
  }
  loading.value = false;
});

async function onEditEmployee(payload) {
  isEditing.value = true;
  submitError.value = "";
  try {
    const { status } = await updateEmployee(route.params.id, payload);
    if (status === 200) isShowModalSuccess.value = true;
    else submitError.value = "Không lưu được thay đổi. Vui lòng thử lại.";
  } catch {
    submitError.value = "Không kết nối được máy chủ.";
  }
  isEditing.value = false;
}
</script>
