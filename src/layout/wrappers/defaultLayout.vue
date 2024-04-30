<template>
  <div class="main-wrapper">
    <transition name="fade">
      <sidebar-component></sidebar-component>
    </transition>
    <header-component></header-component>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import SidebarComponent from "@/components/Sidebar.vue";
export default {
  name: "defaultLayout",
  components: {
    HeaderComponent,
    SidebarComponent,
  },
};
</script>

<style lang="scss" scoped>
.main-wrapper {
    padding-top: 65px;
}
</style>
