<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  computed: {
    layout () {
      return (this.$route.meta.layout || 'default') + '-layout';
    }
  },
  setup() {
    return {};
  },
};
</script>
