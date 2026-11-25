<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";

const route = useRoute();
const layout = computed(() => (route.meta.layout === "login" ? LoginLayout : DefaultLayout));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
