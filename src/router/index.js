import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import EmployeePage from "@/pages/Employee.vue";
import CalendarPage from "@/pages/Calendar.vue";
import LeavePage from "@/pages/Leave.vue";
import ErrorPage from "@/pages/Error.vue";
import AddEmployeePage from "@/pages/Add-Employee.vue";
import ImportExcelEmployee from "@/pages/Import-Excel.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/employee",
    name: "Employee",
    component: EmployeePage,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarPage,
  },
  {
    path: "/leave",
    name: "LeavePage",
    component: LeavePage,
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
  },
  {
    path: "/add-employee",
    name: "AddEmployee",
    component: AddEmployeePage,
  },
  {
    path: "/import-excel-empoyee",
    name: "ImportExcelEmployee",
    component: ImportExcelEmployee,
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
