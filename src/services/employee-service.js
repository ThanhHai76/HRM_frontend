import HTTP from "@/services/api-service.js";

async function getALLEmployees() {
  const { data } = await HTTP.get("/hrm/all-employees");
  return data;
}

async function getALLEmployeesCVHome() {
  const { data } = await HTTP.get("/hrm/employees-cv-home");
  return data;
}

async function getReportCurrentYear(year) {
  const { data } = await HTTP.post("/hrm/report-current-year", { year });
  return data;
}

async function createEmployee(employee) {
  const { data, status } = await HTTP.post("/hrm/employee/create", employee);
  return { data, status };
}

async function getEmployee(id) {
  const { data } = await HTTP.get(`/hrm/employee/${id}`);
  return data;
}

async function updateEmployee(id, employee) {
  const { data, status } = await HTTP.put(`/hrm/employee/update/${id}`, employee);
  return { data, status };
}

async function deleteEmployee(id) {
  const { status } = await HTTP.delete(`/hrm/employee/${id}`);
  return status;
}

async function getEmployeeByPhone(phone) {
  const { status } = await HTTP.get(`/hrm/employee/find/${phone}`);
  return status;
}

async function uploadExcelEmployee(file) {
  const formData = new FormData();
  formData.append("excelFile", file);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data, status } = await HTTP.post("/hrm/upload_excel", formData, options);
  return { data, status };
}

export {
  getALLEmployees,
  getALLEmployeesCVHome,
  getReportCurrentYear,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByPhone,
  uploadExcelEmployee,
};
