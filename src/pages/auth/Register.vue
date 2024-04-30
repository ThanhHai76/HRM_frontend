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
                    type="password"
                    v-model="dataRegister.password"
                  />
                </div>
                <div class="form-group mb-0">
                  <button
                    class="btn btn-lg btn-block btn-primary"
                    type="submit"
                    @click="onSubmit"
                  >
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
      isShowModalSuccess: false,
      messageNoti: "",
    };
  },
  methods: {
    async onSubmit() {
      const { data, status } = await register(this.dataRegister);
      console.log(data);
      if (status === 200) {
        this.isShowModalSuccess = true;
        this.messageNoti = 'Register successful';
      }
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
