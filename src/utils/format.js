// Định dạng ngày giờ dùng chung (thay cho moment). Nhận Date, chuỗi ISO hoặc timestamp.
const pad = (n) => String(n).padStart(2, "0");

const toDate = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

/** DD/MM/YYYY ("" nếu không hợp lệ) */
export const formatDate = (value) => {
  const d = toDate(value);
  return d ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}` : "";
};

/** HH:mm */
export const formatTime = (value) => {
  const d = toDate(value);
  return d ? `${pad(d.getHours())}:${pad(d.getMinutes())}` : "";
};

/** DD/MM/YYYY HH:mm */
export const formatDateTime = (value) => {
  const d = toDate(value);
  return d ? `${formatDate(d)} ${formatTime(d)}` : "";
};

/** Ngày theo định dạng trình duyệt tiếng Việt, ví dụ "25/11/2026" */
export const localDate = (value) => (value ? new Date(value).toLocaleDateString("vi-VN") : "");

/** Ngày giờ theo định dạng trình duyệt tiếng Việt, ví dụ "09:00:00 25/11/2026" */
export const localDateTime = (value) => (value ? new Date(value).toLocaleString("vi-VN") : "");

/** Ngày trong tháng "DD" và tháng "M" (dùng cho ô lịch nhỏ) */
export const dayOf = (value) => {
  const d = toDate(value);
  return d ? pad(d.getDate()) : "";
};
export const monthOf = (value) => {
  const d = toDate(value);
  return d ? String(d.getMonth() + 1) : "";
};

const WEEKDAYS = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"];

/** "thứ tư, 25/11/2026" */
export const formatWeekdayDate = (value = new Date()) => {
  const d = toDate(value);
  return d ? `${WEEKDAYS[d.getDay()]}, ${formatDate(d)}` : "";
};

/** Đầu ngày hôm nay (ms) */
export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

/** Dung lượng file: "345 KB", "1.2 MB" */
export const formatSize = (bytes) => {
  if (!bytes) return "";
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? mb.toFixed(1) + " MB" : Math.round(bytes / 1024) + " KB";
};

/** Ngày hôm nay dạng DD/MM/YYYY (định dạng lưu của cvDate) */
export const todayDMY = () => formatDate(new Date());

/** Sao chép văn bản vào clipboard; có phương án dự phòng cho trình duyệt cũ / http */
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(el);
  }
}
