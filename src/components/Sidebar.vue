<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-inner slimscroll">
      <div class="sidebar-contents">
        <div id="sidebar-menu" class="sidebar-menu">
          <ul>
            <li title="Dashboard" :class="{ active: path === '/' }">
              <router-link to="/">
                <img src="@/assets/img/home.svg" alt="sidebar_img" />
                <span>Dashboard</span>
              </router-link>
            </li>
            <li title="Employees CV" :class="{ active: path === '/employee' }">
              <router-link to="/employee">
                <img src="@/assets/img/employee.svg" alt="sidebar_img" />
                <span>Employees CV</span>
              </router-link>
            </li>
            <li title="Import Employees CV" :class="{ active: path === '/import-excel-empoyee' }">
              <router-link to="/import-excel-empoyee">
                <img src="@/assets/img/manage.svg" alt="sidebar_img" />
                <span>Import Excel</span>
              </router-link>
            </li>
            <li title="Report" :class="{ active: path === '/report' }">
              <router-link to="/report">
                <img src="@/assets/img/report.svg" alt="sidebar_img" />
                <span>Reports</span>
              </router-link>
            </li>
            <li title="List Order Job" :class="{ active: path === '/list-order-job' }">
              <router-link to="/list-order-job">
                <img src="@/assets/img/company.svg" alt="sidebar_img" />
                <span>List Order Job</span>
              </router-link>
            </li>
            <li title="Tracking" :class="{ active: path === '/tracking-candidates' }">
              <router-link to="/tracking-candidates">
                <img src="@/assets/img/calendar.svg" alt="sidebar_img" />
                <span>Tracking</span>
              </router-link>
            </li> 
            <!-- <li title="Calendar" :class="{ active: path === '/calendar' }">
              <router-link to="/calendar">
                <img src="@/assets/img/calendar.svg" alt="sidebar_img" />
                <span>Calendar</span>
              </router-link>
            </li> -->
            <li title="Todo List" :class="{ active: path === '/todo-list' }">
              <router-link to="/todo-list">
                <img src="@/assets/img/report.svg" alt="sidebar_img" />
                <span>Todo List</span>
              </router-link>
            </li>
            
            <!-- <li title="Leave" :class="{ active: path === '/leave' }">
              <router-link to="/leave">
                <img src="@/assets/img/leave.svg" alt="sidebar_img" />
                <span>Leave</span>
              </router-link>
            </li> -->
          </ul>
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
