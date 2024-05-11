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
              <h1>Login</h1>
              <p class="account-subtitle">Access to our dashboard</p>
              <div>
                <div class="form-group">
                  <label class="form-control-label text-left">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="dataLogin.email"
                  />
                </div>
                <div class="form-group">
                  <label class="form-control-label text-left">Password</label>
                  <div class="pass-group">
                    <input
                      :type="type"
                      class="form-control pass-input"
                      v-model="dataLogin.password"
                    />
                    <span
                      class="fas fa-eye toggle-password"
                      @click="showPassword"
                    ></span>
                  </div>
                </div>
                <div class="text-bg-danger mb-2" v-if="message">
                  {{ message }}
                </div>
                <!-- <div class="form-group">
                  <div class="row">
                    <div class="col-6">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="cb1"
                        />
                        <label class="custom-control-label" for="cb1"
                          >Remember me</label
                        >
                      </div>
                    </div>
                    <div class="col-6 text-right">
                      <a class="forgot-link" href="forgot-password.html"
                        >Forgot Password ?</a
                      >
                    </div>
                  </div>
                </div> -->
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
                  Login
                </button>
                <div class="login-or">
                  <span class="or-line"></span>
                  <span class="span-or">or</span>
                </div>

                <div class="social-login mb-3">
                  <span>Login with</span>
                  <a href="#" class="facebook"
                    ><i class="fab fa-facebook-f"></i></a
                  ><a href="#" class="google"><i class="fab fa-google"></i></a>
                </div>

                <div class="text-center dont-have">
                  Don't have an account yet?
                  <a @click="$router.push('/register')">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, setAuthData } from "@/services/auth-service";
export default {
  name: "LoginPage",
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
      type: "password",
      message: null,
      isLoading: false,
    };
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      const { data, status } = await login(this.dataLogin);
      if (status === 200) {
        const userData = { ...this.dataLogin, userName: data.name };
        await setAuthData(data.token, userData);
        this.$router.push("/");
      } else {
        this.$router.push("/login");
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
</style>
