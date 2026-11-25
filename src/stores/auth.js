import { defineStore } from "pinia";
import { computed, ref } from "vue";

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userData") || "null");
  } catch {
    return null;
  }
};

// Phiên đăng nhập: token + thông tin người dùng, đồng bộ với localStorage
export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(readUser());

  const role = computed(() => (user.value && user.value.role) || "viewer");
  const isAdmin = computed(() => role.value === "admin");
  const canWrite = computed(() => role.value !== "viewer");

  function set(accessToken, userData) {
    token.value = accessToken;
    user.value = userData;
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  function clear() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  }

  // Đọc lại từ localStorage (ví dụ khi tab khác đăng nhập/đăng xuất)
  function reload() {
    token.value = localStorage.getItem("token");
    user.value = readUser();
  }

  return { token, user, role, isAdmin, canWrite, set, clear, reload };
});
