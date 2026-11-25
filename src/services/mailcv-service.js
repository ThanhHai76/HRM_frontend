import HTTP from "@/services/api-service.js";
import { errorMessage } from "@/services/ai-service";

// Luôn trả { ok, data, error } (interceptor trả phản hồi cho 400/422/429 và ném lỗi cho các mã khác)
async function call(request) {
  try {
    const res = await request();
    if (res && res.status >= 200 && res.status < 300) return { ok: true, data: res.data && res.data.data };
    return { ok: false, error: (res && res.data && (res.data.error || (typeof res.data === "string" && res.data))) || "Có lỗi xảy ra" };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

export const getMailConfig = () => call(() => HTTP.get("/mail-cv/config"));
export const saveMailConfig = (payload) => call(() => HTTP.put("/mail-cv/config", payload));
export const testMailConfig = () => call(() => HTTP.post("/mail-cv/config/test"));
export const deleteMailConfig = () => call(() => HTTP.delete("/mail-cv/config"));
export const runMailIngest = () => call(() => HTTP.post("/mail-cv/run"));
export const listMailCvs = (status = "pending") => call(() => HTTP.get("/mail-cv/items", { params: { status } }));
export const approveMailCv = (id, payload) => call(() => HTTP.post(`/mail-cv/items/${id}/approve`, payload || {}));
export const rejectMailCv = (id) => call(() => HTTP.post(`/mail-cv/items/${id}/reject`));
export const retryMailCvSheet = (id) => call(() => HTTP.post(`/mail-cv/items/${id}/retry-sheet`));
