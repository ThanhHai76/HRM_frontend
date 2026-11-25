// Avatar chữ cái: chữ đầu của từ đầu + từ cuối trong tên, màu cố định theo tên
const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#ec4899"];

export function initials(name) {
  const parts = String(name || "?").trim().split(/\s+/);
  const last = parts[parts.length - 1] || "?";
  return ((parts.length > 1 ? parts[0].charAt(0) : "") + last.charAt(0)).toUpperCase();
}

export function avatarColor(name) {
  let h = 0;
  for (const ch of String(name || "")) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return COLORS[h % COLORS.length];
}
