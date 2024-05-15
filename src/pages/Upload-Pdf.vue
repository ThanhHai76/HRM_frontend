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
        <b-card no-body>
          <b-tabs card>
            <b-tab
              title="List PDF Upload"
              :active="tabActive === 'list'"
              @click="changeTab('list')"
            >
              <b-card-text>
                <div class="col-xl-12 col-sm-12 col-12">
                  <div class="row justify-content-between">
                    <div class="col-xl-6 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-header">
                          <h2 class="card-titles mb-2">
                            Information about PDF CV of Employee
                          </h2>
                        </div>
                        <div class="card-body">
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
                                  <th>Tên file</th>
                                  <th>Note</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(item, index) in dataListPDF"
                                  :key="item._id"
                                >
                                  <td>{{ index + 1 }}</td>
                                  <td>{{ item.name }}</td>
                                  <td>{{ item.phone }}</td>
                                  <td>{{ item.email }}</td>
                                  <td>{{ item.cvDate }}</td>
                                  <td>{{ item.filename }}</td>
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
                                            @click="onEditJob(item)"
                                            >Edit</a
                                          >
                                        </li>
                                        <li>
                                          <a
                                            class="dropdown-item"
                                            @click="onDeleteJob(item)"
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
                            Upload PDF for Employee CV
                          </h2>
                        </div>
                        <div class="card-body">
                          <vue-pdf-app
                            style="height: 100vh"
                            :pdf="linkPDFUpload"
                          ></vue-pdf-app>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>

            <b-tab
              title="Upload file"
              :active="tabActive === 'upload'"
              @click="changeTab('upload')"
            >
              <b-card-text>
                <div class="col-xl-12 col-sm-12 col-12">
                  <div class="row justify-content-between">
                    <div class="col-xl-6 col-sm-12 col-12">
                      <div class="card">
                        <div class="card-header">
                          <h2 class="card-titles mb-2">
                            Upload PDF for Employee CV
                          </h2>
                        </div>
                        <div class="card-body">
                          <!-- <b-form>
                            <b-form-group
                              id="input-group-1"
                              label="Tên Job"
                              :state="formCreate.name !== ''"
                            >
                              <b-form-input
                                id="input-1"
                                v-model="formCreate.name"
                                placeholder="Nhập tên job"
                                required
                                :state="this.formCreate.name !== ''"
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              id="input-group-1"
                              label="Ngày order"
                            >
                              <b-form-input
                                id="input-1"
                                v-model="formCreate.phone"
                                placeholder="Nhập ngày order"
                                required
                                :state="this.formCreate.phone !== ''"
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group
                              id="input-group-1"
                              label="Số lượng"
                            >
                              <b-form-input
                                id="input-1"
                                v-model="formCreate.email"
                                placeholder="Nhập số lượng"
                                required
                                type="number"
                                :state="this.formCreate.email !== ''"
                              ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-1" label="JD">
                              <b-form-input
                                id="input-1"
                                v-model="formCreate.cvDate"
                                placeholder="Nhập JD"
                              ></b-form-input>
                            </b-form-group>
                          </b-form> -->
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
                          <div class="import-excel">
                            <div
                              class="import-excel__drop d-flex align-items-center justify-content-center"
                            >
                              <h5 class="mb-4">
                                Choose File or Drag and drop to upload file
                              </h5>
                              <input
                                type="file"
                                class="import-excel__drop__file form-control"
                                ref="file_upload"
                                name="excelFile"
                                accept=".pdf"
                                @dragend="dragEnter"
                                @dragleave="dragLeave"
                                @change="onFileChange"
                              />
                            </div>
                          </div>
                          <div class="form-btn">
                            <a @click="onSubmitUploadPDF" class="btn btn-apply">
                              <b-spinner
                                v-if="loadingUpload"
                                variant="success"
                                label="Spinning"
                              ></b-spinner>
                              Upload PDF</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
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
        <p class="text-success">{{ uploadSucessMessage }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { getAllPDFs, uploadFilePDF } from "@/services/pdf-service";
import VuePdfApp from "vue3-pdf-app";

export default {
  name: "UploadPdf",
  components: {
    VuePdfApp,
  },
  data() {
    return {
      isEnter: false,
      fileImported: null,
      uploadSucessMessage: "",
      isShowModalSuccess: false,
      loadingUpload: false,
      dataListPDF: [],
      isLoading: false,
      linkPDFUpload: "",
      tabActive: "list",
      formCreate: {
        name: '',
        phone: '',
        email: '',
        cvDate: '',
        filename: '',
        filePath: '',
      }
    };
  },
  methods: {
    async fetchAllEmployees() {
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
      if (this.fileImported) {
        this.loadingUpload = true;
        const { data, status } = await uploadFilePDF(this.fileImported);
        if (status === 200) {
          this.linkPDFUpload = data.data;
          this.isShowModalSuccess = true;
          this.uploadSucessMessage = "Thank You! ✔ File Succesfully Uploaded.";
        }
        this.loadingUpload = false;
      }
    },
    changeTab(tab) {
      this.tabActive = tab;
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

.nav-link {
  color: inherit !important;
}
</style>
