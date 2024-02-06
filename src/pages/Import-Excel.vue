<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="breadcrumb-path mb-4">
            <ul class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html"
                  ><img
                    src="@/assets/img/dash.png"
                    class="mr-2"
                    alt="breadcrumb"
                  />Home</a
                >
              </li>
              <li class="breadcrumb-item active">Settings</li>
            </ul>
            <h3>Settings</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-sm-8 col-8">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-titles">Import Excel</h2>
                </div>
                <div class="card-body">
                  <!-- <div class="company-logo">
                    <label class="logo-upload" for="edit_img">
                      <input type="file" id="edit_img" />
                      <a><i data-feather="edit"></i></a>
                    </label>
                    <img src="@/assets/img/logo2.png" alt="logo" />
                  </div> -->
                  <div class="import-excel">
                    <div
                      class="import-excel__drop d-flex align-items-center justify-content-center"
                    >
                      <h5 class="mb-4">Drag and drop to upload file</h5>
                      <input
                        type="file"
                        class="import-excel__drop__file form-control"
                        ref="file_upload"
                        name="excelFile"
                        accept=".xlsx, .xls, .csv"
                        @dragend="dragEnter"
                        @dragleave="dragLeave"
                        @change="onFileChange"
                      />
                    </div>
                  </div>
                  <div class="form-btn">
                    <a
                      href="#"
                      @click="onSubmitImportExcel"
                      class="btn btn-apply"
                      >Upload Excel</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-success"
      centered
      title="Notify"
      v-model="isShowModalSuccess"
    >
      <div>
        <p class="text-success">{{ uploadSucessMessage }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { uploadExcelEmployee } from "@/services/employee-service";

export default {
  name: "ImportExcel",
  data() {
    return {
      isEnter: false,
      fileImported: null,
      uploadSucessMessage: "",
      isShowModalSuccess: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.fileImported = this.takeFile(event);
    },
    takeFile({ target = {}, dataTransfer = {} }) {
      const files = target.files || dataTransfer.files;
      if (files.length > 0) {
        return files[0];
      }
      return null;
    },
    dragEnter() {
      this.isEnter = true;
    },
    dragLeave() {
      this.isEnter = false;
    },
    dropFile(event) {
      this.isEnter = false;
      this.onFileChange(event);
    },
    async onSubmitImportExcel() {
      if (this.fileImported) {
        const { status } = await uploadExcelEmployee(this.fileImported);
        if (status === 201) {
          this.isShowModalSuccess = true;
          this.uploadSucessMessage = "Thank You! ✔ File Succesfully Uploaded.";
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.import-excel {
  &__drop {
    height: 200px;
    flex-direction: column;

    &__file {
      width: 50%;
    }
  }
}
</style>
