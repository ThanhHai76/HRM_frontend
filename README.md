# HRM Frontend

Giao diện web (SPA) của hệ thống HRM, viết bằng **Vue 3** theo chuẩn hiện tại: `<script setup>` (Composition API), build bằng **Vite**, quản lý trạng thái bằng **Pinia**. Xem [README gốc](../README.md) để có bức tranh tổng thể và [backend](../HRM_backend/README.md) cho API.

**Công nghệ:** Vue 3.5, Vite 6, Vue Router 4, Pinia, Bootstrap 5 + bootstrap-vue-3, Chart.js, @vuepic/vue-datepicker, Font Awesome 5, `xlsx-js-style` (xuất Excel), Quill (soạn email), axios.

## Chạy và build

Cần Node.js 18 trở lên.

```bash
npm install
npm run dev       # dev, http://localhost:8080 (hot reload; "npm run serve" cũng được)
npm run build     # build production ra dist/
npm run preview   # chạy thử bản build ở http://localhost:8080
npm run lint      # ESLint
npm start         # server Express phục vụ dist/ (server.cjs, dùng cho Heroku)
```

### Biến môi trường (`.env`, `.env.development`, `.env.production`, `.env.*.local`)

Vite được cấu hình để đọc cả tiền tố cũ `VUE_APP_` lẫn `VITE_`, nên các file `.env` hiện có giữ nguyên. Trong code đọc bằng `import.meta.env.TÊN_BIẾN`.

| Biến | Ý nghĩa |
|---|---|
| `VUE_APP_BACKEND_URL_SERVER_RENDER` | URL API backend, kết thúc bằng `/api` |
| `VUE_APP_PDF_URL_SERVER` | URL `HRM_PDF_server` (upload ảnh trong trình soạn email) |

Chạy dev với backend local: tạo `.env.development.local` (đã được git bỏ qua):

```
VUE_APP_BACKEND_URL_SERVER_RENDER=http://localhost:3001/api
```

Mọi biến có tiền tố trên đều bị đóng gói vào mã chạy trên trình duyệt, nên **không** đặt khóa bí mật vào đây.

## Các trang

| Đường dẫn | Trang |
|---|---|
| `/login`, `/register` | Đăng nhập; đăng ký công ty (tạo admin) |
| `/` | Dashboard: KPI, CV theo tháng/năm, phễu tuyển dụng, nguồn ứng viên, lịch phỏng vấn |
| `/employee` | Danh sách ứng viên (tìm kiếm, lọc năm/job, phân trang) |
| `/add-employee`, `/edit-employee/:id`, `/detail-employee/:id` | Thêm, sửa, xem ứng viên |
| `/import-excel-employee` | Nhập ứng viên từ Excel |
| `/tracking-candidates`, `/add-tracking-candidate`, `/edit-tracking-candidate/:id` | Theo dõi phỏng vấn, offer, thử việc |
| `/list-order-job` | Danh sách vị trí cần tuyển |
| `/report` | Báo cáo tháng/quý/năm, xuất Excel |
| `/mail-cv` | Hộp thư CV: hàng chờ duyệt, đã duyệt, đã bỏ qua và cài đặt hộp thư IMAP |
| `/sync/google-sheet` | Đồng bộ Google Sheet: kết nối, xác minh, xem trước, đồng bộ ngay, lịch sử |
| `/ai/cv-analysis` | Phân tích CV bằng AI và kho CV đã lưu |
| `/ai/job-requirements` | Yêu cầu có cấu trúc cho từng vị trí |
| `/ai/matching` | So khớp, xếp hạng, duyệt ứng viên, báo cáo công bằng |

- Trang **Email Template** (`/send-mail`, file `pages/SendMail.vue`) đang tạm ẩn: route chuyển về `/`, mục menu được comment. Bật lại theo ghi chú trong `router/index.js` và `components/Sidebar.vue`.
- Các route cũ `/upload-pdf` và `/todo-list` được chuyển hướng (sang `/ai/cv-analysis` và `/`).
- Các trang được tải khi cần (lazy-load), nên lần mở đầu chỉ tải mã của trang đang xem.
- Trang cần đăng nhập được bảo vệ ở `src/router/middleware.js`.

## Cấu trúc mã nguồn

```
index.html                 trang HTML gốc (Vite), nạp src/main.js
vite.config.js             alias "@" -> src, base /HRM_frontend/ khi build, cổng 8080
src/
  main.js                  khởi tạo app, nạp CSS (thư viện trước, theme.css sau cùng), đăng ký plugin
  App.vue                  chọn layout theo meta.layout của route
  router/                  khai báo route (lazy-load) + middleware đăng nhập
  layout/                  DefaultLayout (sidebar + header), LoginLayout
  stores/                  Pinia: auth (token, người dùng, vai trò), tracking (cho chuông thông báo)
  composables/             useJobNames (danh sách vị trí cho các form)
  components/              Header, Sidebar, EmployeeForm, TrackingForm, ChipInput
  pages/
    HomePage.vue, Report.vue, ListOrderJob.vue, SendMail.vue, Import-Excel.vue, Error.vue
    Employees-CV/          Employee, Add/Edit/Detail-Employee
    Tracking/              Tracking, Add/Edit-Tracking
    AI/                    CvAnalysis, JobRequirements, Matching
    Sync/                  GoogleSheet
    MailCv/                Inbox
    auth/                  Login, Register
  services/                gọi API; http.js tạo axios client dùng chung (gắn token + xử lý lỗi)
  utils/                   format (ngày giờ, dung lượng, sao chép), avatar (chữ cái + màu), years
  assets/css/              style.css (template gốc), theme.css (giao diện hiện tại)
```

### Quy ước viết component

- Dùng `<script setup>`; trạng thái bằng `ref`/`computed`, tải dữ liệu trong `onMounted`.
- Lấy vai trò người dùng từ `useAuthStore()` (`auth.role`, `auth.isAdmin`) thay vì đọc `localStorage` trực tiếp.
- Định dạng ngày và avatar dùng hàm trong `utils/`, không thêm thư viện ngày giờ.

### Giao diện

- `assets/css/theme.css` được nạp **sau cùng** và ghi đè để có giao diện thống nhất (biến CSS `--c-primary`… ở đầu file). Muốn đổi màu chủ đạo, sửa các biến này.
- Lớp tiện ích: `ui-page`, `ui-card`, `ui-grid-2`, `ui-notice`, `ui-chip`, `ui-pill`, `ui-tabs`, `ui-drawer`…
- Sidebar thu gọn (desktop) và dạng ngăn kéo (điện thoại) do `layout/DefaultLayout.vue` điều khiển.

### Gọi API

`src/services/http.js` (dùng cho `api-service.js` và `api-pdf-service.js`):
- tự gắn header `X-AUTH-TOKEN`;
- lỗi 401: đăng xuất và chuyển về `/login`;
- lỗi 403/500: chuyển sang trang Lỗi và hiển thị nội dung lỗi của máy chủ;
- 400/422/429: trả lại phản hồi để trang tự hiển thị thông báo;
- lỗi mạng được ném lại để trang xử lý.

## Triển khai

`vite.config.js` đặt `base` là `/HRM_frontend/` khi build, khớp cách đang deploy (GitHub Pages / subtree). Quy trình cũ:

```bash
npm run build
git add dist && git commit -m "adding dist subtree"
git subtree push --prefix dist origin gh-pages
```

Lưu ý:
- `npm run build` **xóa và ghi đè** thư mục `dist/` (thư mục này đang được commit). Muốn chỉ kiểm tra build: `npx vite build --outDir <thư-mục-khác> --emptyOutDir`.
- `server.cjs` + `Procfile` (`web: npm run start`) phục vụ `dist/` bằng Express cho Heroku.

## Hạn chế đã biết

- Danh sách ứng viên, Dashboard, Report tải toàn bộ dữ liệu rồi lọc/phân trang ở trình duyệt.
- Ngày CV lưu dạng chuỗi `DD/MM/YYYY`.
- Token lưu trong `localStorage`.
- Đường dẫn không tồn tại hiển thị trang trống (chưa có trang 404).
- Bundle trang Report lớn (~880 KB) do thư viện xuất Excel; chỉ tải khi mở trang Report.
