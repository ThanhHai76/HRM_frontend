import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

// Tạo client axios dùng chung: gắn token, xử lý 401 (đăng xuất) và lỗi máy chủ (trang Lỗi).
// 400/422/429 được trả về như phản hồi thường để form hiển thị thông báo.
export function createHttp(baseURL) {
  const instance = axios.create({ baseURL, withCredentials: false });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["X-AUTH-TOKEN"] = token;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const res = error.response;
      if (!res) return Promise.reject(error);
      if (res.status === 401) {
        useAuthStore().clear();
        router.push({ name: "login" }).catch(() => {});
        return Promise.resolve(res);
      }
      if ([403, 500].includes(res.status)) {
        const data = res.data || {};
        const message = typeof data === "string" ? data : data.error || data.message || "";
        router.push({ name: "Error", state: { message: String(message || "") } }).catch(() => {});
        return Promise.resolve(res);
      }
      if ([400, 422, 429].includes(res.status)) return Promise.resolve(res);
      return Promise.reject(error);
    }
  );
  return instance;
}
