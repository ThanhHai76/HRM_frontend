<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
      <div class="sidebar-contents">
        <div id="sidebar-menu" class="sidebar-menu">
          <ul>
            <li class="menu-section">Quản lý</li>
            <li
              v-for="item in manageItems"
              :key="item.to"
              :title="item.label"
              :class="{ active: isActive(item.to) }"
            >
              <router-link :to="item.to">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </router-link>
            </li>

            <li class="menu-section">
              AI Recruitment <span class="ai-tag">AI</span>
            </li>
            <li
              v-for="item in aiItems"
              :key="item.to"
              :title="item.label"
              :class="{ active: isActive(item.to) }"
            >
              <router-link :to="item.to">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const manageItems = [
  { to: "/", label: "Dashboard", icon: "fas fa-tachometer-alt" },
  { to: "/employee", label: "Employees CV", icon: "fas fa-users" },
  { to: "/tracking-candidates", label: "Tracking", icon: "fas fa-route" },
  { to: "/list-order-job", label: "List Order Job", icon: "fas fa-briefcase" },
  { to: "/report", label: "Reports", icon: "fas fa-chart-bar" },
  // { to: "/send-mail", label: "Email Template", icon: "fas fa-envelope" }, // tạm ẩn
  { to: "/mail-cv", label: "Hộp thư CV", icon: "fas fa-envelope-open-text" },
  { to: "/sync/google-sheet", label: "Đồng bộ Google Sheet", icon: "fas fa-sync-alt" },
];

const aiItems = [
  { to: "/ai/cv-analysis", label: "Phân tích & kho CV", icon: "fas fa-file-alt" },
  { to: "/ai/job-requirements", label: "Yêu cầu vị trí", icon: "fas fa-clipboard-list" },
  { to: "/ai/matching", label: "So khớp & xếp hạng", icon: "fas fa-trophy" },
];

const route = useRoute();
const path = computed(() => route.path);
const isActive = (to) => (to === "/" ? path.value === "/" : path.value.startsWith(to));
</script>
