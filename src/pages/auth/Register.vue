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
            <h1>Tạo tài khoản công ty</h1>
            <p class="account-subtitle">
              Bạn sẽ là quản trị viên của công ty này
            </p>

            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="form-control-label">Tên công ty</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Công ty TNHH ..."
                  v-model="dataRegister.companyName"
                />
              </div>
              <div class="form-group">
                <label class="form-control-label">Họ tên (tối thiểu 6 ký tự)</label>
                <input class="form-control" type="text" v-model="dataRegister.name" />
              </div>
              <div class="form-group">
                <label class="form-control-label">Email</label>
                <input class="form-control" type="email" v-model="dataRegister.email" />
              </div>
              <div class="form-group">
                <label class="form-control-label">Mật khẩu (6-20 ký tự chữ và số)</label>
                <div class="position-relative">
                  <input
                    class="form-control"
                    :type="type"
                    autocomplete="new-password"
                    v-model="dataRegister.password"
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
                Đăng ký
              </button>
            </form>

            <div class="text-center dont-have mt-4">
              Đã có tài khoản?
              <a @click="$router.push('/login')">Đăng nhập</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-success"
      centered
      title="Thông báo"
      v-model="isShowModalSuccess"
      ok-title="Đăng nhập"
      ok-only
      @ok="$router.push('/login')"
    >
      <p>{{ messageNoti }}</p>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/services/auth-service";

const dataRegister = ref({ companyName: "", name: "", email: "", password: "" });
const type = ref("password");
const isShowModalSuccess = ref(false);
const messageNoti = ref("");
const message = ref(null);
const isLoading = ref(false);

async function onSubmit() {
  isLoading.value = true;
  message.value = "";
  const { data, status } = await register(dataRegister.value);
  if (status === 200) {
    isShowModalSuccess.value = true;
    messageNoti.value = "Đăng ký thành công. Hãy đăng nhập để bắt đầu.";
  } else {
    message.value = typeof data === "string" ? data : "Đăng ký thất bại";
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
