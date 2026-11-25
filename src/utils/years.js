// Tiện ích năm dùng chung cho Dashboard / Report / Employee.
// Ngày CV đang lưu dạng chuỗi "DD/MM/YYYY", nên lấy năm bằng cách tách chuỗi.

export const currentYear = () => String(new Date().getFullYear());

const YEAR_RE = /(?:^|\D)((?:19|20)\d{2})(?:\D|$)/;

export const yearOf = (text) => {
  const m = YEAR_RE.exec(String(text || ""));
  return m ? m[1] : null;
};

// Các năm xuất hiện trong dữ liệu (+ năm hiện tại), sắp xếp tăng dần
export const yearsFromDates = (items, key = "cvDate") => {
  const years = new Set([currentYear()]);
  (items || []).forEach((item) => {
    const y = yearOf(item && item[key]);
    if (y) years.add(y);
  });
  return [...years].sort();
};

// N năm gần nhất, giảm dần: ["2026", "2025", ...]
export const recentYears = (count = 6) => {
  const now = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => String(now - i));
};
