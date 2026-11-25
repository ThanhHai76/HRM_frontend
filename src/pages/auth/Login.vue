<template>
  <div class="main-wrapper login-body">
    <div class="login-wrapper">
      <div class="container">
        <img
          class="img-fluid logo-dark"
          src="@/assets/img/logo-hrm.svg"
          alt="Logo"
        />
        <div class="loginbox">
          <div class="login-right">
            <h1>Chào mừng trở lại</h1>
            <p class="account-subtitle">Đăng nhập để vào hệ thống tuyển dụng</p>

            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="form-control-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="ban@congty.com"
                  autocomplete="username"
                  v-model="dataLogin.email"
                />
              </div>
              <div class="form-group">
                <label class="form-control-label">Mật khẩu</label>
                <div class="position-relative">
                  <input
                    :type="type"
                    class="form-control"
                    autocomplete="current-password"
                    v-model="dataLogin.password"
                  />
                  <i
                    class="fas toggle-eye"
                    :class="type === 'password' ? 'fa-eye' : 'fa-eye-slash'"
                    @click="showPassword"
                  ></i>
                </div>
              </div>
              <div class="text-bg-danger mb-3" v-if="message">
                {{ message }}
              </div>
              <button class="btn btn-lg btn-primary" type="submit" :disabled="isLoading">
                <span v-if="isLoading" class="ui-spin me-2"></span>
                Đăng nhập
              </button>
            </form>

            <div class="text-center dont-have mt-4">
              Chưa có tài khoản?
              <a @click="$router.push('/register')">Đăng ký công ty</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login, setAuthData } from "@/services/auth-service";

const router = useRouter();
const dataLogin = ref({ email: "", password: "" });
const type = ref("password");
const message = ref(null);
const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;
  message.value = null;
  const { data, status } = await login(dataLogin.value);
  if (status === 200) {
    // Không lưu mật khẩu vào localStorage
    setAuthData(data.token, { email: dataLogin.value.email, userName: data.name, role: data.role });
    router.push("/");
  } else {
    message.value = typeof data === "string" ? data : "Đăng nhập thất bại";
  }
  isLoading.value = false;
}

const showPassword = () => (type.value = type.value === "password" ? "text" : "password");
</script>

<style scoped>
.toggle-eye {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  cursor: pointer;
}
</style>
