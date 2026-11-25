<template>
  <div class="error-page">
    <div class="error-card">
      <div class="icon"><i class="fas fa-exclamation-triangle"></i></div>
      <h1>Đã xảy ra lỗi</h1>
      <p class="lead">{{ message }}</p>
      <div class="d-flex gap-2 justify-content-center flex-wrap">
        <button class="btn btn-primary" @click="$router.push('/')"><i class="fas fa-home me-1"></i> Về trang chủ</button>
        <button class="btn btn-outline-secondary" @click="$router.back()">Quay lại</button>
        <button class="btn btn-outline-secondary" @click="relogin">Đăng nhập lại</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { resetAuthData } from "@/services/auth-service";

const router = useRouter();

// Nội dung lỗi của máy chủ được truyền qua history.state khi chuyển tới trang này
const fromServer = window.history.state && window.history.state.message;
const message = typeof fromServer === "string" && fromServer ? fromServer : "Có sự cố khi xử lý yêu cầu. Vui lòng thử lại sau ít phút.";

function relogin() {
  resetAuthData();
  router.push("/login");
}
</script>

<style scoped>
.error-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.error-card { max-width: 480px; width: 100%; text-align: center; background: #fff; border: 1px solid var(--c-border); border-radius: 20px; padding: 40px 32px; box-shadow: var(--shadow-md); }
.icon { width: 72px; height: 72px; margin: 0 auto 16px; border-radius: 50%; background: var(--c-warning-50); color: var(--c-warning); display: flex; align-items: center; justify-content: center; font-size: 30px; }
h1 { font-size: 24px; font-weight: 750; margin-bottom: 8px; }
.lead { color: var(--c-muted); margin-bottom: 24px; }
</style>
