import HTTP from "@/services/api-service.js";
import { errorMessage } from "@/services/ai-service";

// Chuẩn hóa kết quả: luôn trả { ok, data, error } (interceptor trả về phản hồi cho 400/422/429 và ném lỗi cho các mã khác)
async function call(request) {
  try {
    const res = await request();
    if (res && res.status >= 200 && res.status < 300) return { ok: true, data: res.data && res.data.data };
    return { ok: false, error: (res && res.data && (res.data.error || (typeof res.data === "string" && res.data))) || "Có lỗi xảy ra" };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

export const getSheetSync = () => call(() => HTTP.get("/sync/sheets"));
export const saveSheetSync = (payload) => call(() => HTTP.put("/sync/sheets", payload));
export const verifySheetSync = () => call(() => HTTP.post("/sync/sheets/verify"));
export const previewSheetSync = () => call(() => HTTP.post("/sync/sheets/preview"));
export const runSheetSync = () => call(() => HTTP.post("/sync/sheets/run"));
export const disconnectSheetSync = () => call(() => HTTP.delete("/sync/sheets"));
