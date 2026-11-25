import HTTP from "@/services/api-service.js";

// Phân tích CV (PDF). Truyền employeeId để lưu hồ sơ năng lực cho ứng viên.
async function parseCv(file, employeeId) {
  const formData = new FormData();
  formData.append("pdfFile", file);
  if (employeeId) formData.append("employeeId", employeeId);
  const { data, status } = await HTTP.post("/ai/parse-cv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return { data, status };
}

// AI đề xuất yêu cầu có cấu trúc từ JD (chưa lưu, nhân sự xác nhận)
async function extractJobRequirements(jobId) {
  const { data, status } = await HTTP.post(`/ai/jobs/${jobId}/extract-requirements`);
  return { data, status };
}

async function matchCandidate(employeeId, jobId) {
  const { data, status } = await HTTP.post("/ai/match", { employeeId, jobId });
  return { data, status };
}

async function getRankings(jobId) {
  const { data } = await HTTP.get(`/ai/jobs/${jobId}/rankings`);
  return data;
}

// decision: "shortlist" | "hold" | "reject"; note bắt buộc
async function reviewMatch(matchId, decision, note) {
  const { data, status } = await HTTP.post(`/ai/matches/${matchId}/review`, { decision, note });
  return { data, status };
}

async function getFairnessReport(jobId) {
  const { data } = await HTTP.get(`/ai/jobs/${jobId}/fairness-report`);
  return data;
}

export { parseCv, extractJobRequirements, matchCandidate, getRankings, reviewMatch, getFairnessReport };

// Lưu hồ sơ năng lực (đã được nhân sự kiểm tra/chỉnh sửa) cho ứng viên
async function saveCvProfile(employeeId, profile, fileId) {
  const { data, status } = await HTTP.put(`/ai/employees/${employeeId}/cv-profile`, { profile, fileId });
  return { data, status };
}

export { saveCvProfile };

// Lấy thông báo lỗi thân thiện từ lỗi axios
function errorMessage(e) {
  return (
    (e && e.response && e.response.data && (e.response.data.error || e.response.data)) ||
    "Không kết nối được máy chủ."
  );
}

export { errorMessage };

// ----- Kho CV -----
async function listCvFiles() {
  const { data } = await HTTP.get("/ai/cv-files");
  return data;
}

// Tải file có xác thực rồi mở trong tab mới (link trực tiếp không gửi được token)
async function openCvFile(fileId) {
  const win = window.open("", "_blank");
  try {
    const res = await HTTP.get(`/ai/cv-files/${fileId}/download`, { responseType: "blob" });
    if (res.status !== 200) throw new Error("download failed");
    const url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    if (win) win.location.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
  } catch (e) {
    if (win) win.close();
    throw e;
  }
}

async function deleteCvFile(fileId) {
  const { status } = await HTTP.delete(`/ai/cv-files/${fileId}`);
  return status;
}

export { listCvFiles, openCvFile, deleteCvFile };
