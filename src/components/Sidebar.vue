<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
      <div class="sidebar-contents">
        <div id="sidebar-menu" class="sidebar-menu">
          <div class="mobile-show">
            <div class="offcanvas-menu">
              <div class="user-info align-center bg-theme text-center">
                <span class="lnr lnr-cross text-white" id="mobile_btn_close"
                  >X</span
                >
                <a
                  href="javascript:void(0)"
                  class="d-block menu-style text-white"
                >
                  <div class="user-avatar d-inline-block mr-3">
                    <img
                      src="@/assets/img/profiles/avatar-18.jpg"
                      alt="user avatar"
                      class="rounded-circle"
                      width="50"
                    />
                  </div>
                </a>
              </div>
            </div>
            <div class="sidebar-input">
              <div class="top-nav-search">
                <form>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search here"
                  />
                  <button class="btn" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ul>
            <li :class="{ active: path === '/' }">
              <router-link to="/">
                <img src="@/assets/img/home.svg" alt="sidebar_img" />
                <span>Dashboard</span>
              </router-link>
            </li>
            <li :class="{ active: path === '/employee' }">
              <router-link to="/employee">
                <img src="@/assets/img/employee.svg" alt="sidebar_img" />
                <span>Employees</span>
              </router-link>
            </li>
            <li :class="{ active: path === '/calendar' }">
              <router-link to="/calendar">
                <img src="@/assets/img/calendar.svg" alt="sidebar_img" />
                <span>Calendar</span>
              </router-link>
            </li>
            <li :class="{ active: path === '/leave' }">
              <router-link to="/leave">
                <img src="@/assets/img/leave.svg" alt="sidebar_img" />
                <span>Leave</span>
              </router-link>
            </li>
          </ul>
          <!-- <ul class="logout">
            <li>
              <a href="profile.html"
                ><img src="@/assets/img/logout.svg" alt="sidebar_img" /><span
                  >Log out</span
                ></a
              >
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "SidebarComponent",
  setup() {
    const route = useRoute();
    const path = computed(() => route.path);
    return { path };
  },
};
</script>

<style lang="scss" scoped></style>
