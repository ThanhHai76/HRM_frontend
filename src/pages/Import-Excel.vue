<template>
  <div class="page-wrapper">
    <div class="ui-page">
      <div class="ui-page-head">
        <div>
          <h2>Nhập ứng viên từ Excel</h2>
          <p>Tải file <b>.xlsx</b> (tab đầu tiên) để thêm hàng loạt vào Employees CV.</p>
        </div>
        <button class="btn btn-outline-secondary" @click="$router.push('/employee')"><i class="fas fa-arrow-left me-1"></i> Về danh sách</button>
      </div>

      <div class="ui-grid-2" style="grid-template-columns: 1.2fr 1fr">
        <div>
          <div class="ui-card">
            <h5><i class="fas fa-cloud-upload-alt"></i> Chọn file</h5>
            <label
              class="ui-dropzone d-block"
              :class="{ drag: isEnter }"
              @dragover.prevent="isEnter = true"
              @dragleave.prevent="isEnter = false"
              @drop.prevent="dropFile"
            >
              <i class="fas fa-file-excel" style="color: #059669"></i>
              <div class="name">{{ fileImported ? fileImported.name : "Kéo thả hoặc bấm để chọn file Excel" }}</div>
              <small>Chỉ hỗ trợ .xlsx, tối đa 20 MB</small>
              <input type="file" ref="file_upload" name="excelFile" accept=".xlsx" hidden @change="onFileChange" />
            </label>

            <div v-if="error" class="ui-notice error mt-3 mb-0"><i class="fas fa-exclamation-triangle"></i><div>{{ error }}</div></div>
            <div v-if="done" class="ui-notice info mt-3 mb-0">
              <i class="fas fa-check-circle"></i>
              <div>Đã nhập xong. <router-link to="/employee">Xem danh sách ứng viên →</router-link></div>
            </div>

            <button class="btn btn-primary mt-3 w-100" :disabled="!fileImported || loadingUpload" @click="onSubmitImportExcel">
              <span v-if="loadingUpload" class="ui-spin me-2"></span>
              <i v-else class="fas fa-upload me-2"></i>
              {{ loadingUpload ? "Đang nhập…" : "Nhập vào hệ thống" }}
            </button>
          </div>

          <div class="ui-notice info">
            <i class="fas fa-sync-alt"></i>
            <div>Dữ liệu nằm sẵn trên Google Sheet? Dùng <router-link to="/sync/google-sheet">Đồng bộ Google Sheet</router-link> để cập nhật tự động, không cần tải file thủ công.</div>
          </div>
        </div>

        <div class="ui-card">
          <h5><i class="fas fa-columns"></i> Tiêu đề cột được nhận diện</h5>
          <p class="text-muted small">Dòng đầu tiên của file phải là tiêu đề. Cột không có trong danh sách sẽ bị bỏ qua.</p>
          <span v-for="c in columns" :key="c" class="ui-chip">{{ c }}</span>
          <p class="text-muted small mt-2 mb-0">Dòng không có Nguồn và SĐT sẽ bị bỏ qua. Nhập từ Excel luôn <b>thêm mới</b>; muốn cập nhật ứng viên có sẵn, hãy dùng đồng bộ Google Sheet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadExcelEmployee } from "@/services/employee-service";

const columns = [
  "Nguồn", "Ngày về/nhập CV", "Job", "Họ và tên", "Năm sinh", "Trình độ học vấn", "Chuyên ngành", "SĐT",
  "Địa chỉ mail", "Link CV", "Link SP", "Link FB", "Đơn vị UV từng làm", "HR suggesst", "HR chấm", "Bộ phận chấm",
  "Vòng 1", "Tham gia Vòng 1", "Kết quả PV V1", "VÒNG 2", "Tham gia Vòng 2", "Kết qủa PV V2", "Notes", "OFFER",
  "Kết quả offer", "ĐI LÀM", "Ngày đi làm", "THỬ VIỆC Thời gian", "Kết quả thử việc", "Note",
];

const isEnter = ref(false);
const fileImported = ref(null);
const loadingUpload = ref(false);
const error = ref("");
const done = ref(false);

function setFile(file) {
  error.value = "";
  done.value = false;
  if (file && !/\.xlsx$/i.test(file.name)) {
    error.value = "Chỉ hỗ trợ file .xlsx.";
    return;
  }
  fileImported.value = file || null;
}
const onFileChange = (event) => setFile(event.target.files && event.target.files[0]);
function dropFile(event) {
  isEnter.value = false;
  setFile(event.dataTransfer.files && event.dataTransfer.files[0]);
}

async function onSubmitImportExcel() {
  if (!fileImported.value) return;
  loadingUpload.value = true;
  error.value = "";
  done.value = false;
  try {
    const res = await uploadExcelEmployee(fileImported.value);
    if (res.status === 201) done.value = true;
    else error.value = (res.data && res.data.error) || "Không nhập được file. Vui lòng kiểm tra lại định dạng.";
  } catch (e) {
    error.value = (e.response && e.response.data && e.response.data.error) || "Không kết nối được máy chủ.";
  }
  loadingUpload.value = false;
}
</script>
