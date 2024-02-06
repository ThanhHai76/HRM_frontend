import HTTP from "@/services/api-service.js";

async function getALLEmployees() {
  const { data } = await HTTP.get("/all-employees");
  return data;
}

async function createEmployee(employee) {
  const { data } = await HTTP.post("/employee/create", employee);
  return data;
}

async function getEmployee(id) {
  const { data } = await HTTP.get(`/employee/${id}`);
  return data;
}

async function updateEmployee(id) {
  const { data } = await HTTP.put(`/employee/update/${id}`);
  return data;
}

async function deleteEmployee(id) {
  const { status } = await HTTP.delete(`/employee/${id}`);
  return status;
}

async function getEmployeeByPhone(phone) {
  const { status } = await HTTP.get(`/employee/find/${phone}`);
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
  const { data, status } = await HTTP.post("/upload_excel", formData, options);
  return { data, status };
}

export {
  getALLEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByPhone,
  uploadExcelEmployee,
};
