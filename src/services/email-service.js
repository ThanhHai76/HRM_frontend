import HTTP from "@/services/api-service.js";

async function getAllTemplateEmails() {
  const { data } = await HTTP.get("/email/all-emails");
  return data;
}

async function createTemplateEmail(Email) {
  const { data, status } = await HTTP.post("/email/create-email", Email);
  return { data, status };
}

async function getTemplateEmail(id) {
  const { data } = await HTTP.get(`/email/get-email/${id}`);
  return data;
}

async function updateTemplateEmail(id, Email) {
  const { data, status } = await HTTP.put(`/email/update-email/${id}`, Email);
  return { data, status };
}

async function deleteTemplateEmail(id) {
  const { status } = await HTTP.delete(`/email/delete-email/${id}`);
  return status;
}

export {
  getAllTemplateEmails,
  createTemplateEmail,
  getTemplateEmail,
  updateTemplateEmail,
  deleteTemplateEmail,
};
