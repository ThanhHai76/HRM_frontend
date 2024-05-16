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
              <li class="breadcrumb-item active">Upload PDF</li>
            </ul>
            <h3>Upload PDF</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-header">
              <b-nav tabs>
                <b-nav-item
                  :active="tabActive === 'list'"
                  @click="changeTab('list')"
                  >List PDF Upload</b-nav-item
                >
                <b-nav-item
                  :active="tabActive === 'upload'"
                  @click="changeTab('upload')"
                  >Upload file</b-nav-item
                >
              </b-nav>
            </div>
            <div class="card-body">
              <div
                v-if="tabActive === 'list'"
                class="col-xl-12 col-sm-12 col-12"
              >
                <div class="row justify-content-between">
                  <div class="col-xl-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-header">
                        <h2 class="card-titles mb-2">
                          Information about PDF CV of Employee
                        </h2>
                      </div>
                      <div class="card-body" style="min-height: 385px">
                        <div class="table-responsive">
                          <table
                            class="table table-bordered custom-table no-footer"
                          >
                            <thead>
                              <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(item, index) in dataListPDF"
                                :key="item._id"
                                :class="{
                                  'table-active': selectedItem === item._id,
                                }"
                                @click="selectItemToShow(item)"
                              >
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ formatDatePicker(item.cvDate) }}</td>
                                <td>
                                  <div class="dropdown">
                                    <button
                                      class="btn dropdown-toggle"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Options
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          @click.prevent.stop="onEditPdf(item)"
                                          >Edit</a
                                        >
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          @click.prevent.stop="
                                            onDeletePdf(item)
                                          "
                                          >Delete</a
                                        >
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-header">
                        <h2 class="card-titles mb-2">
                          PDF CV Viewer
                        </h2>
                      </div>
                      <div class="card-body">
                        <vue-pdf-app
                          style="min-height: 400px"
                          :pdf="linkPDFUpload"
                        ></vue-pdf-app>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="tabActive === 'upload'"
                class="col-xl-12 col-sm-12 col-12"
              >
                <div class="row justify-content-between">
                  <div class="col-xl-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-header">
                        <h2 class="card-titles mb-2">
                          Information PDF for Employee CV
                        </h2>
                      </div>
                      <div class="card-body">
                        <b-form class="text-left">
                          <b-form-group id="input-group-1" label="Tên">
                            <b-form-input
                              id="input-1"
                              v-model="formCreate.name"
                              placeholder="Nhập tên"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group
                            id="input-group-1"
                            label="Số điện thoại"
                          >
                            <b-form-input
                              id="input-1"
                              v-model="formCreate.phone"
                              placeholder="Nhập SĐT"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group id="input-group-1" label="Email">
                            <b-form-input
                              id="input-1"
                              v-model="formCreate.email"
                              placeholder="Nhập Email"
                              required
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group id="input-group-1" label="Ngày nhập CV">
                            <VueDatePicker
                              v-model="formCreate.cvDate"
                              placeholder="Ngày nhập CV"
                            ></VueDatePicker>
                          </b-form-group>

                          <div class="form-btn mt-4">
                            <a
                              @click="onSubmitFormUploadPDF"
                              class="btn btn-apply"
                            >
                              <b-spinner
                                v-if="isLoadingForm"
                                variant="success"
                                label="Spinning"
                              ></b-spinner>
                              {{
                                isModeEdit
                                  ? "Update upload pdf"
                                  : "Add upload pdf"
                              }}</a
                            >
                          </div>
                        </b-form>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-sm-12 col-12">
                    <div class="card">
                      <div class="card-header">
                        <h2 class="card-titles mb-2">
                          Upload PDF for Employee CV
                        </h2>
                      </div>
                      <div class="card-body">
                        <div class="import-pdf">
                          <div
                            class="import-pdf__drop d-flex align-items-center justify-content-center"
                          >
                            <h5 class="mb-4">
                              Choose File or Drag and drop to upload file
                            </h5>
                            <input
                              type="file"
                              class="import-pdf__drop__file form-control"
                              ref="file_upload"
                              name="excelFile"
                              accept=".pdf"
                              @dragend="dragEnter"
                              @dragleave="dragLeave"
                              @change="onFileChange"
                            />
                            <div class="form-btn mt-4">
                              <a
                                @click="onSubmitUploadPDF"
                                class="btn btn-apply"
                              >
                                <b-spinner
                                  v-if="loadingUpload"
                                  variant="success"
                                  label="Spinning"
                                ></b-spinner>
                                Get Link PDF</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <b-card no-body>
            <b-tabs card>
              <b-tab
                title="List PDF Upload"
                :active="tabActive === 'list'"
                @click="changeTab('list')"
              >
                
              </b-tab>

              <b-tab
                title="Upload file"
                :active="tabActive === 'upload'"
                @click="changeTab('upload')"
              >
                
              </b-tab>
            </b-tabs>
          </b-card> -->
        </div>
      </div>
    </div>

    <b-modal
      id="modal-success"
      centered
      title="Notify"
      v-model="isShowModalSuccess"
      @ok="confirmUploadSuccess"
      ok-title="Confirm"
    >
      <div>
        <p class="text-success">{{ messageNoti }}</p>
      </div>
    </b-modal>

    <b-modal
      id="modal-success"
      centered
      title="Notify"
      v-model="isShowModalNotify"
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
      v-model="isShowModalDelete"
      @ok="confirmDeletePdf"
      ok-title="Confirm"
    >
      <div>
        <p>Confirm to delete this Employee CV</p>
      </div>
    </b-modal>

    <loading
      v-model:active="isLoadingForm"
      :can-cancel="true"
      :is-full-page="true"
    />
  </div>
</template>

<script>
import {
  createPDF,
  deletePDF,
  getAllPDFs,
  updatePDF,
  uploadFilePDF,
} from "@/services/pdf-service";
import VuePdfApp from "vue3-pdf-app";
import Loading from "vue-loading-overlay";
import moment from "moment";

export default {
  name: "UploadPdf",
  components: {
    VuePdfApp,
    Loading,
  },
  data() {
    return {
      isEnter: false,
      fileImported: null,
      isShowModalSuccess: false,
      loadingUpload: false,
      dataListPDF: [],
      isLoading: false,
      linkPDFUpload: "",
      tabActive: "list",
      formCreate: {
        name: "",
        phone: "",
        email: "",
        cvDate: "",
        filename: "",
        linkCVPDF: "",
      },
      isLoadingForm: false,
      isShowModalNotify: false,
      messageNoti: "",
      isShowModalDelete: false,
      isModeEdit: false,
    };
  },
  mounted() {
    this.fetchAllPdfs();
  },
  methods: {
    async fetchAllPdfs() {
      this.isLoading = true;
      const { data } = await getAllPDFs();
      this.dataListPDF = data;
      this.isLoading = false;
    },
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
    async onSubmitUploadPDF() {
      if (!this.fileImported) {
        this.isShowModalNotify = true;
        this.messageNoti = "Please choose file PDF";
        return;
      }
      if (this.fileImported) {
        this.loadingUpload = true;
        const { data, status } = await uploadFilePDF(this.fileImported);
        if (status === 200) {
          this.formCreate.linkCVPDF = data.data;
          this.isShowModalNotify = true;
          this.messageNoti = "Thank You! ✔ File Succesfully Uploaded.";
        }
        this.loadingUpload = false;
      }
    },
    changeTab(tab) {
      this.tabActive = tab;
      if (tab === "list") {
        this.fetchAllPdfs();
        this.clearForm();
      }
    },
    formatDatePicker(date) {
      if (!date) return;
      return moment(date).format("DD/MM/YYYY");
    },
    async onSubmitFormUploadPDF() {
      if (
        !this.formCreate.phone ||
        !this.formCreate.name ||
        !this.formCreate.linkCVPDF
      ) {
        this.isShowModalNotify = true;
        this.messageNoti = !this.formCreate.linkCVPDF
          ? "Please Upload file PDF"
          : "Please enter info";
        return;
      }
      this.isLoadingForm = true;
      const { status } = this.isModeEdit
        ? await updatePDF(this.selectedItem, this.formCreate)
        : await createPDF(this.formCreate);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = this.isModeEdit
          ? "Update PDF CV successfully"
          : "Add a PDF CV successfully";
      }
      this.isLoadingForm = false;
    },
    selectItemToShow(item) {
      this.linkPDFUpload = item.linkCVPDF;
      this.selectedItem = item._id;
      this.changeTab("list");
    },
    confirmUploadSuccess() {
      this.clearForm();
      this.changeTab("list");
    },
    onDeletePdf(item) {
      this.isShowModalDelete = true;
      this.selectedItem = item._id;
    },
    async confirmDeletePdf() {
      const status = await deletePDF(this.selectedItem);
      await this.fetchAllPdfs();
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalNotify = true;
        this.messageNoti = "Deleted successfully";
      }
    },
    onEditPdf(item) {
      this.isModeEdit = true;
      this.formCreate = {
        name: item.name,
        phone: item.phone,
        email: item.email,
        cvDate: item.cvDate,
        filename: item.filename,
        linkCVPDF: item.linkCVPDF,
      };
      this.changeTab("upload");
    },
    clearForm() {
      this.isModeEdit = false;
      this.formCreate = {
        name: "",
        phone: "",
        email: "",
        cvDate: "",
        filename: "",
        linkCVPDF: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.import-pdf {
  &__drop {
    height: 400px;
    flex-direction: column;

    &__file {
      width: 50%;
    }
  }
}

.table td,
.table th {
  padding: 10px;
}

.table-responsive tr td:first-child,
.table-responsive tr th:first-child {
  padding-left: 10px;
}

.table td {
  white-space: pre-wrap;
  cursor: pointer;
}

.table-active {
  cursor: pointer;
}

.table-responsive {
  min-height: 385px;
}

.nav-link {
  color: inherit !important;
}
</style>
