import { createRouter, createWebHistory } from "vue-router";
import { checkAccessMiddleware } from "./middleware";

// Các trang được tải khi cần (lazy-load) để trang đầu tiên nhẹ hơn
const routes = [
  { path: "/", name: "Home", component: () => import("@/pages/HomePage.vue"), meta: { isAuth: true, title: "Home" } },
  { path: "/login", name: "login", component: () => import("@/pages/auth/Login.vue"), meta: { isAuth: false, title: "Login", layout: "login" } },
  { path: "/register", name: "register", component: () => import("@/pages/auth/Register.vue"), meta: { isAuth: false, title: "Register", layout: "login" } },

  { path: "/employee", name: "Employee", component: () => import("@/pages/Employees-CV/Employee.vue"), meta: { isAuth: true, title: "Employee" } },
  { path: "/add-employee", name: "AddEmployee", component: () => import("@/pages/Employees-CV/Add-Employee.vue"), meta: { isAuth: true, title: "Add Employee" } },
  { path: "/edit-employee/:id", name: "EditEmployee", component: () => import("@/pages/Employees-CV/Edit-Employee.vue"), meta: { isAuth: true, title: "Edit Employee" } },
  { path: "/detail-employee/:id", name: "DetailEmployee", component: () => import("@/pages/Employees-CV/Detail-Employee.vue"), meta: { isAuth: true, title: "Detail Employee" } },
  { path: "/import-excel-employee", name: "ImportExcelEmployee", component: () => import("@/pages/Import-Excel.vue"), meta: { isAuth: true, title: "Import Excel Employee" } },

  { path: "/error", name: "Error", component: () => import("@/pages/Error.vue"), meta: { isAuth: false, title: "Error", layout: "login" } },
  { path: "/report", name: "ReportPage", component: () => import("@/pages/Report.vue"), meta: { isAuth: true, title: "Report Page" } },
  { path: "/list-order-job", name: "ListOrderJobPage", component: () => import("@/pages/ListOrderJob.vue"), meta: { isAuth: true, title: "List Order Job Page" } },

  { path: "/tracking-candidates", name: "TrackingPage", component: () => import("@/pages/Tracking/Tracking.vue"), meta: { isAuth: true, title: "Tracking Candidates" } },
  { path: "/add-tracking-candidate", name: "AddTrackingPage", component: () => import("@/pages/Tracking/Add-Tracking.vue"), meta: { isAuth: true, title: "Add Tracking Candidates" } },
  { path: "/edit-tracking-candidate/:id", name: "EditTrackingPage", component: () => import("@/pages/Tracking/Edit-Tracking.vue"), meta: { isAuth: true, title: "Edit Tracking Candidates" } },

  // Trang Email Template tạm ẩn. Muốn bật lại: thay redirect bằng route dưới đây và bỏ comment mục "Email Template" trong Sidebar.vue.
  // { path: "/send-mail", name: "SendMailPage", component: () => import("@/pages/SendMail.vue"), meta: { isAuth: true, title: "Send Mail Page" } },
  { path: "/send-mail", redirect: "/" },
  { path: "/upload-pdf", redirect: "/ai/cv-analysis" },
  { path: "/todo-list/:pathMatch(.*)*", redirect: "/" },

  { path: "/mail-cv", name: "MailCvInbox", component: () => import("@/pages/MailCv/Inbox.vue"), meta: { isAuth: true, title: "Mail CV Inbox" } },
  { path: "/sync/google-sheet", name: "GoogleSheetSync", component: () => import("@/pages/Sync/GoogleSheet.vue"), meta: { isAuth: true, title: "Google Sheet Sync" } },
  { path: "/ai/cv-analysis", name: "AiCvAnalysis", component: () => import("@/pages/AI/CvAnalysis.vue"), meta: { isAuth: true, title: "AI CV Analysis" } },
  { path: "/ai/job-requirements", name: "AiJobRequirements", component: () => import("@/pages/AI/JobRequirements.vue"), meta: { isAuth: true, title: "AI Job Requirements" } },
  { path: "/ai/matching", name: "AiMatching", component: () => import("@/pages/AI/Matching.vue"), meta: { isAuth: true, title: "AI Matching" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(checkAccessMiddleware);

export default router;
