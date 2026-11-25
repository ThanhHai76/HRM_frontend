<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Thêm ứng viên</h2>
          <p>Nhập thông tin ứng viên. Muốn điền nhanh từ file CV, dùng <router-link to="/ai/cv-analysis">Phân tích CV</router-link>.</p>
        </div>
      </div>

      <employee-form
        submit-label="Thêm ứng viên"
        :loading="isAdding"
        :submit-error="submitError"
        @submit="onAddEmployee"
        @cancel="isShowModalCancel = true"
      />

      <b-modal
        centered
        title="Xác nhận hủy"
        v-model="isShowModalCancel"
        @ok="$router.push('/employee')"
        ok-title="Hủy thêm"
        cancel-title="Quay lại"
      >
        <p>Bạn có chắc muốn hủy? Thông tin đã nhập sẽ không được lưu.</p>
      </b-modal>

      <b-modal
        centered
        title="Thông báo"
        v-model="isShowModalSuccess"
        @hidden="$router.push('/employee')"
        ok-only
        ok-title="Về danh sách"
      >
        <p>Đã thêm ứng viên thành công.</p>
      </b-modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import { createEmployee } from "@/services/employee-service";

const isShowModalCancel = ref(false);
const isShowModalSuccess = ref(false);
const isAdding = ref(false);
const submitError = ref("");

async function onAddEmployee(payload) {
  isAdding.value = true;
  submitError.value = "";
  try {
    const { status } = await createEmployee(payload);
    if (status === 200) isShowModalSuccess.value = true;
    else submitError.value = "Không thêm được ứng viên. Vui lòng thử lại.";
  } catch {
    submitError.value = "Không kết nối được máy chủ.";
  }
  isAdding.value = false;
}
</script>
