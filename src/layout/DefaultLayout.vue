<template>
  <div
    class="main-wrapper app-shell"
    :class="{ 'is-collapsed': collapsed, 'is-mobile-open': mobileOpen }"
  >
    <AppSidebar />
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="shell-overlay" @click="mobileOpen = false"></div>
    <slot />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "@/components/Header.vue";
import AppSidebar from "@/components/Sidebar.vue";

const STORAGE_KEY = "sidebar-collapsed";
const MOBILE_BREAKPOINT = 992;

// Desktop: thu gọn thành cột icon. Điện thoại: ngăn kéo mở/đóng.
const collapsed = ref(localStorage.getItem(STORAGE_KEY) === "1");
const mobileOpen = ref(false);

// Chuyển trang thì đóng ngăn kéo trên điện thoại
const route = useRoute();
watch(() => route.fullPath, () => {
  mobileOpen.value = false;
});

function toggleSidebar() {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    mobileOpen.value = !mobileOpen.value;
    return;
  }
  collapsed.value = !collapsed.value;
  localStorage.setItem(STORAGE_KEY, collapsed.value ? "1" : "0");
}

function onResize() {
  if (window.innerWidth >= MOBILE_BREAKPOINT) mobileOpen.value = false;
}

onMounted(() => window.addEventListener("resize", onResize));
onBeforeUnmount(() => window.removeEventListener("resize", onResize));
</script>

<style lang="scss" scoped>
.main-wrapper {
  padding-top: 65px;
}
</style>
