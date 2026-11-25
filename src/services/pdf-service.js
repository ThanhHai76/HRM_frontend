import HTTP from "@/services/api-service.js";

// Chỉ còn dùng để xem các CV đã tải lên bằng chức năng Upload PDF cũ (read-only).
async function getAllPDFs() {
  const { data } = await HTTP.get("/pdf/all-pdfs");
  return data;
}

export { getAllPDFs };
