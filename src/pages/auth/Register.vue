<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <img
          class="img-fluid logo-dark mb-2"
          src="@/assets/img/SeaLinh.jpg"
          alt="Logo"
        />
        <div class="loginbox">
          <div class="login-right">
            <div class="login-right-wrap">
              <h1>Register</h1>
              <p class="account-subtitle">Access to our dashboard</p>

              <div>
                <div class="form-group">
                  <label class="form-control-label text-left">Name</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="dataRegister.name"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-left">Email</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model="dataRegister.email"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-left">Password</label>
                  <input
                    class="form-control"
                    :type="type"
                    v-model="dataRegister.password"
                  />
                  <span
                    class="fas fa-eye toggle-password"
                    @click="showPassword"
                  ></span>
                </div>
                <div class="text-bg-danger mb-2" v-if="message">
                  {{ message }}
                </div>
                <div class="form-group mb-0">
                  <button
                    class="btn btn-lg btn-block btn-primary"
                    type="submit"
                    @click="onSubmit"
                  >
                    <b-spinner
                      v-if="isLoading"
                      class="mr-2"
                      variant="success"
                      label="Spinning"
                    ></b-spinner>
                    Register
                  </button>
                </div>
              </div>

              <div class="login-or">
                <span class="or-line"></span>
                <span class="span-or">or</span>
              </div>

              <div class="social-login">
                <span>Register with</span>
                <a href="#" class="facebook"
                  ><i class="fab fa-facebook-f"></i></a
                ><a href="#" class="google"><i class="fab fa-google"></i></a>
              </div>

              <div class="text-center dont-have">
                Already have an account?
                <a @click="$router.push('/login')">Login</a>
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
      ok-title="Confirm"
      @ok="$router.push('/login')"
    >
      <div>
        <p>{{ messageNoti }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { register } from "@/services/auth-service";
export default {
  name: "RegisterPage",
  data() {
    return {
      dataRegister: {
        name: "",
        email: "",
        password: "",
      },
      type: "password",
      isShowModalSuccess: false,
      messageNoti: "",
      message: null,
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.message = '';
      const { data, status } = await register(this.dataRegister);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = "Register successful";
      } else {
        this.message = data;
      }
      this.isLoading = false;
    },
    showPassword() {
      this.type = this.type === "password" ? "text" : "password";
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.toggle-password {
  top: 70%;
}
</style>
