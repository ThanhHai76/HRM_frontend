<template>
  <div class="page-wrapper">
    <div class="content container-fluid">
      <div class="row">
        <!-- <div class="col-xl-12 col-sm-12 col-12">
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
        </div> -->
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
                      <div class="card-body list-pdf-cv">
                        <div
                          class="top-nav-search mb-4 d-flex align-items-center"
                        >
                          <form>
                            <input
                              type="text"
                              class="form-control"
                              v-model="searchWord"
                              placeholder="Search for mobile phone, name, email..."
                            />
                            <button class="btn" type="submit">
                              <i class="fas fa-search"></i>
                            </button>
                          </form>
                        </div>
                        <div class="table-responsive" v-show="isReloadTable">
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
                                v-for="(item, index) in listPdfDataFilter"
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
                                          @click.prevent.stop="
                                            onCopy(item.linkCVPDF)
                                          "
                                        >
                                          <span class="mr-2">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-copy"
                                              viewBox="0 0 16 16"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                                              />
                                            </svg>
                                          </span>
                                          <span>Copy Link</span>
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          @click.prevent.stop="onEditPdf(item)"
                                        >
                                          <span class="mr-2">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-pencil"
                                              viewBox="0 0 16 16"
                                            >
                                              <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"
                                              />
                                            </svg>
                                          </span>
                                          <span>Edit</span></a
                                        >
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          @click.prevent.stop="
                                            onDeletePdf(item)
                                          "
                                        >
                                          <span class="mr-2">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-trash"
                                              viewBox="0 0 16 16"
                                            >
                                              <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                              />
                                              <path
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                              />
                                            </svg>
                                          </span>
                                          <span>Delete</span></a
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
                        <h2 class="card-titles mb-2">PDF CV Viewer</h2>
                      </div>
                      <div class="card-body pdf-view">
                        <!-- <PDF
                          :src="linkPDFUpload"
                          :show-page-tooltip="true"
                          :show-progress="true"
                        /> -->
                        <iframe
                          :src="linkPDFUpload"
                          title="PDF CV Viewer"
                          :allowfullscreen="true"
                        ></iframe>
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

    <loading v-model:active="isLoadingPage" :is-full-page="true" />
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
import Loading from "vue-loading-overlay";
import moment from "moment";
// import PDF from "pdf-vue3";

export default {
  name: "UploadPdf",
  components: {
    Loading,
    // PDF,
  },
  data() {
    return {
      isEnter: false,
      fileImported: null,
      isShowModalSuccess: false,
      loadingUpload: false,
      dataListPDF: [],
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
      isLoadingPage: false,
      isShowModalNotify: false,
      messageNoti: "",
      isShowModalDelete: false,
      isModeEdit: false,
      searchWord: "",
      isReloadTable: true,
    };
  },
  async mounted() {
    this.isLoadingPage = true;
    await this.fetchAllPdfs();
    this.changeTab("list");
    this.isLoadingPage = false;
  },
  computed: {
    listPdfDataFilter() {
      const trimWord = this.searchWord.toUpperCase().trim();
      return this.dataListPDF.filter(
        ({ name, phone, email }) =>
          (name || "").toUpperCase().includes(trimWord) ||
          (phone || "").toUpperCase().includes(trimWord) ||
          (email || "").toUpperCase().includes(trimWord)
      );
    },
  },
  methods: {
    async fetchAllPdfs() {
      const { data } = await getAllPDFs();
      this.dataListPDF = data;
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
          this.messageNoti = "File Succesfully Uploaded.";
        }
        this.loadingUpload = false;
      }
    },
    changeTab(tab) {
      this.tabActive = tab;
      if (tab === "list") {
        this.fetchAllPdfs();
        if (this.dataListPDF.length > 0) {
          this.isReloadTable = false;
          this.linkPDFUpload = this.dataListPDF[0].linkCVPDF;
          this.selectedItem = this.dataListPDF[0]._id;
          this.isReloadTable = true;
        }
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
      this.isLoadingPage = true;
      const { status } = this.isModeEdit
        ? await updatePDF(this.selectedItem, this.formCreate)
        : await createPDF(this.formCreate);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = this.isModeEdit
          ? "Update PDF CV successfully"
          : "Add a PDF CV successfully";
      }
      this.isLoadingPage = false;
    },
    selectItemToShow(item) {
      this.selectedItem = item._id;
      this.linkPDFUpload = item.linkCVPDF;
      this.isReloadTable = false;
      this.isReloadTable = true;
    },
    confirmUploadSuccess() {
      this.changeTab("list");
    },
    onDeletePdf(item) {
      this.isShowModalDelete = true;
      this.selectedItem = item._id;
    },
    async confirmDeletePdf() {
      this.isLoadingPage = true;
      const status = await deletePDF(this.selectedItem);
      await this.fetchAllPdfs();
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalNotify = true;
        this.messageNoti = "Deleted successfully";
      }
      this.isLoadingPage = false;
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
      this.fileImported = null;
      this.formCreate = {
        name: "",
        phone: "",
        email: "",
        cvDate: "",
        filename: "",
        linkCVPDF: "",
      };
    },
    onCopy(message) {
      this.$copyText(message).then(function () {
        alert("Copied");
      });
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
  height: 500px !important;
  overflow: auto;
  height: 100%;
}

.nav-link {
  color: inherit !important;
}

.card {
  margin-bottom: 0;
}

.card {
  .card-header,
  .card-body {
    padding: 20px;
  }
}

.list-pdf-cv {
  height: 600px;
}

.pdf-view {
  height: 600px;
}

.top-nav-search {
  width: 60%;
  margin-left: 0;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
