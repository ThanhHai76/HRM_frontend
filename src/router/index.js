import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import EmployeePage from "@/pages/Employee.vue";
import CalendarPage from "@/pages/Calendar.vue";
import LeavePage from "@/pages/Leave.vue";
import ErrorPage from "@/pages/Error.vue";
import AddEmployeePage from "@/pages/Add-Employee.vue";
import EditEmployeePage from "@/pages/Edit-Employee.vue"
import ImportExcelEmployee from "@/pages/Import-Excel.vue";
import TodoListPage from "@/pages/TodoList.vue";

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
    path: "/edit-employee/:id",
    name: "EditEmployee",
    component: EditEmployeePage,
  },
  {
    path: "/import-excel-empoyee",
    name: "ImportExcelEmployee",
    component: ImportExcelEmployee,
  },
  {
    path: "/todo-list",
    name: "TodoListPage",
    component: TodoListPage,
  },
  {
    path: "/todo-list/:status",
    name: "TodoListStatusPage",
    component: TodoListPage
  }
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
