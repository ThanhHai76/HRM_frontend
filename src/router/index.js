import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/auth/Login.vue";
import RegisterPage from "@/pages/auth/Register.vue";
import EmployeePage from "@/pages/Employee.vue";
import CalendarPage from "@/pages/Calendar.vue";
import LeavePage from "@/pages/Leave.vue";
import ErrorPage from "@/pages/Error.vue";
import AddEmployeePage from "@/pages/Add-Employee.vue";
import EditEmployeePage from "@/pages/Edit-Employee.vue";
import DetailEmployeePage from "@/pages/Detail-Employee.vue";
import ImportExcelEmployee from "@/pages/Import-Excel.vue";
import TodoListPage from "@/pages/TodoList.vue";
import ReportPage from "@/pages/Report.vue";
import ListOrderJobPage from "@/pages/ListOrderJob.vue";

import { checkAccessMiddleware } from "./middleware";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { isAuth: true, title: 'Home' }
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { isAuth: false, title: 'Login', layout: 'login' }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: { isAuth: false, title: 'Register', layout: 'login' }
  },
  {
    path: "/employee",
    name: "Employee",
    component: EmployeePage,
    meta: { isAuth: true, title: 'Employee' }
  },
  {
    path: "/add-employee",
    name: "AddEmployee",
    component: AddEmployeePage,
    meta: { isAuth: true, title: 'Add Employee' }
  },
  {
    path: "/edit-employee/:id",
    name: "EditEmployee",
    component: EditEmployeePage,
    meta: { isAuth: true, title: 'Edit Employee' }
  },
  {
    path: "/detail-employee/:id",
    name: "DetailEmployee",
    component: DetailEmployeePage,
    meta: { isAuth: true, title: 'Detail Employee' }
  },
  {
    path: "/import-excel-empoyee",
    name: "ImportExcelEmployee",
    component: ImportExcelEmployee,
    meta: { isAuth: true, title: 'Import Excel Employee' }
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarPage,
    meta: { isAuth: true, title: 'Calendar' }
  },
  {
    path: "/leave",
    name: "LeavePage",
    component: LeavePage,
    meta: { isAuth: true, title: 'Leave Page' }
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
    meta: { isAuth: false, title: 'Error', layout: 'login' }
  },
  {
    path: "/todo-list",
    name: "TodoListPage",
    component: TodoListPage,
    meta: { isAuth: true, title: 'Todo List' }
  },
  {
    path: "/todo-list/:status",
    name: "TodoListStatusPage",
    component: TodoListPage,
    meta: { isAuth: true, title: 'Todo List Status' }
  },
  {
    path: "/report",
    name: "ReportPage",
    component: ReportPage,
    meta: { isAuth: true, title: 'Report Page' }
  },
  {
    path: "/list-order-job",
    name: "ListOrderJobPage", 
    component: ListOrderJobPage,
    meta: { isAuth: true, title: 'List Order Job Page' }
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(checkAccessMiddleware);

export default router;
