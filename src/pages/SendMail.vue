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
              <li class="breadcrumb-item active">Email Template</li>
            </ul>
            <h3>Email Template</h3>
          </div>
        </div>
        <div class="col-xl-12 col-sm-12 col-12">
          <div class="row justify-content-center">
            <div class="col-xl-4 col-sm-12 col-12">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-titles mb-2">List Email Template</h2>
                </div>
                <div class="card-body">
                  <div class="top-nav-search mb-4 d-flex align-items-center">
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
                  <div class="table-responsive">
                    <table class="table table-bordered custom-table no-footer">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Subject</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in listTemplateEmailFilter"
                          :key="item._id"
                          :class="{
                            'table-active': selectedItem._id === item._id,
                          }"
                          @click="selectItemToShow(item)"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.subject }}</td>
                          <td>{{ item.email }}</td>
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
                                    @click.prevent.stop="onCopy(item.email)"
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
                                    <span>Copy Email</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    class="dropdown-item"
                                    @click.prevent.stop="onDeleteTemplate(item)"
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
            <div class="col-xl-8 col-sm-12 col-12">
              <div class="card">
                <div class="card-header">
                  <h2 class="card-titles mb-2">Content Email</h2>
                </div>
                <div class="card-body template-email-content">
                  <div class="email-title">
                    <b-form class="text-left">
                      <b-form-group id="input-group-1" label="Subject Mail">
                        <b-form-input
                          id="input-1"
                          v-model="mailForm.subject"
                          placeholder="Nhập Subject Email"
                          required
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-1" label="Email">
                        <b-form-input
                          id="input-1"
                          v-model="mailForm.email"
                          placeholder="Nhập Email người nhận"
                          required
                        ></b-form-input>
                      </b-form-group>
                    </b-form>
                  </div>
                  <div class="editor-email">
                    <QuillEditor
                      id="editor"
                      ref="quillEditor"
                      :toolbar="toolbarSettings"
                      :options="editorOption"
                      theme="snow"
                      v-model="editorContent"
                      @update:content="onContentUpdate"
                      @textChange="onTextChange"
                      @editorChange="onEditorChange"
                    >
                    </QuillEditor>
                    <div class="form-btn mt-4 mb-4">
                      <a @click="createTemplateEmail" class="btn btn-apply">
                        <b-spinner
                          v-if="loadingCreate"
                          variant="success"
                          label="Spinning"
                        ></b-spinner>
                        Create Template</a
                      >
                      <a
                        v-if="selectedItem.subject"
                        class="btn btn-outline-secondary"
                        @click="updateTemplateEmail"
                      >
                        <b-spinner
                          v-if="loadingUpdate"
                          variant="success"
                          label="Spinning"
                        ></b-spinner>
                        Update Template</a
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
      @ok="confirmDeleteTemplate"
      ok-title="Confirm"
    >
      <div>
        <p>Confirm to delete this Template Email</p>
      </div>
    </b-modal>

    <loading v-model:active="isLoadingPage" :is-full-page="true" />
  </div>
</template>

<script>
import {
  getAllTemplateEmails,
  createTemplateEmail,
  updateTemplateEmail,
  deleteTemplateEmail
} from "@/services/email-service";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const toolbarSettings = {
  container: [
    // [{ placeholder: ["[GuestName]", "[HotelName]"] }], // my custom dropdown
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
  handlers: {
    placeholder: function (value) {
      console.log(this.quill);
      if (value) {
        const cursorPosition = this.quill.getSelection().index;
        this.quill.insertText(cursorPosition, value);
        this.quill.setSelection(cursorPosition + value.length);
      }
    },
  },
};

const editorOption = {
  placeholder: "Nhập nội dung Email",
  modules: {
    imageDrop: true,
    imagePaste: true,
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"],
    ],
    imageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
      modules: ["Toolbar", "Resize", "DisplaySize"], // ,
    },
  },
};

export default {
  name: "SendMail",
  components: {
    QuillEditor,
  },
  data() {
    return {
      toolbarSettings,
      editorOption,
      editorContent: "",
      mailForm: {
        subject: "",
        email: "",
        content: "",
      },
      listTemplateEmail: [],
      messageNoti: "",
      isShowModalNotify: false,
      isShowModalDelete: false,
      loadingCreate: false,
      loadingUpdate: false,
      searchWord: "",
      selectedItem: {
        subject: "",
        email: "",
        content: "",
      },
      isLoadingPage: false,
    };
  },
  async mounted() {
    this.isLoadingPage = true;
    await this.fetchAllTemplateEmails();
    this.isLoadingPage = false;
  },
  computed: {
    listTemplateEmailFilter() {
      const trimWord = this.searchWord.toUpperCase().trim();
      return this.listTemplateEmail.filter(
        ({ subject, content, email }) =>
          (subject || "").toUpperCase().includes(trimWord) ||
          (content || "").toUpperCase().includes(trimWord) ||
          (email || "").toUpperCase().includes(trimWord)
      );
    },
  },
  methods: {
    async fetchAllTemplateEmails() {
      const { data } = await getAllTemplateEmails();
      this.listTemplateEmail = data;
    },
    onTextChange() {},
    onEditorChange() {},
    onContentUpdate() {},
    getHTMLContent() {
      // Access the VueQuill component instance using the ref
      const quillInstance = this.$refs.quillEditor;

      // Do something with the HTML content
      this.mailForm.content = quillInstance.getHTML();
    },
    selectItemToShow(item) {
      this.selectedItem = item;
      this.mailForm = {
        subject: this.selectedItem.subject,
        email: this.selectedItem.email,
        content: this.selectedItem.content,
      };
      const quillInstance = this.$refs.quillEditor;
      quillInstance.setHTML(this.selectedItem.content);
    },
    async createTemplateEmail() {
      this.getHTMLContent();
      if (!this.checkFillForm()) return;
      this.loadingCreate = true;
      const { status } = await createTemplateEmail(this.mailForm);
      if (status === 200) {
        this.isShowModalNotify = true;
        this.messageNoti = "Create A Email Template Successfully !";
      }
      await this.fetchAllTemplateEmails();
      this.loadingCreate = false;
    },
    async updateTemplateEmail() {
      this.getHTMLContent();
      if (!this.checkFillForm()) return;
      this.loadingUpdate = true;
      const { status } = await updateTemplateEmail(
        this.selectedItem._id,
        this.mailForm
      );
      if (status === 200) {
        this.isShowModalNotify = true;
        this.messageNoti = "Update This Template Email Successfully !";
      }
      await this.fetchAllTemplateEmails();
      this.loadingUpdate = false;
    },
    checkFillForm() {
      if (
        !this.mailForm.subject ||
        !this.mailForm.email ||
        !this.mailForm.content
      ) {
        this.isShowModalNotify = true;
        this.messageNoti = "Please enter info";
        return false;
      }
      return true;
    },
    onCopy(message) {
      this.$copyText(message).then(function () {
        alert("Copied");
      });
    },
    onDeleteTemplate(item) {
      this.isShowModalDelete = true;
      this.selectedItem = item;
    },
    async confirmDeleteTemplate() {
      this.isLoadingPage = true;
      const status = await deleteTemplateEmail(this.selectedItem._id);
      await this.fetchAllTemplateEmails();
      this.isShowModalDelete = false;
      if (status === 200) {
        this.isShowModalNotify = true;
        this.messageNoti = "Deleted successfully";
      }
      this.isLoadingPage = false;
    },
  },
};
</script>

<style scoped lang="scss">
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

.top-nav-search {
  width: 80%;
  margin-left: 0;
}
.template-email-content {
  height: 630px;
  overflow: auto;
}
.card {
  margin-bottom: 0;
}
</style>
