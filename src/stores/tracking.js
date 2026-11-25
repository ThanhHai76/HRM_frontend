import { defineStore } from "pinia";
import { ref } from "vue";

// Danh sách tracking tải gần nhất. Trang Tracking cập nhật để chuông thông báo trên Header làm mới theo.
export const useTrackingStore = defineStore("tracking", () => {
  const list = ref(null);
  const setList = (items) => {
    list.value = items || [];
  };
  return { list, setList };
});
