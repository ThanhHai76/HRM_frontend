import HTTP from "@/services/api-service.js";
import HTTP_PDF from "@/services/api-pdf-service.js";

async function getAllTemplateEmails() {
  const { data } = await HTTP.get("/email/all-emails");
  return data;
}

async function createTemplateEmail(Email) {
  const { data, status } = await HTTP.post("/email/create-email", Email);
  return { data, status };
}

async function sendEmail(Email) {
  const { status } = await HTTP.post("/email/send-email", Email);
  return { status };
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

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("imageFile", file);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await HTTP_PDF.post(
    "/image/upload_image",
    formData,
    options
  );
  return res;
}

export {
  getAllTemplateEmails,
  createTemplateEmail,
  sendEmail,
  getTemplateEmail,
  updateTemplateEmail,
  deleteTemplateEmail,
  uploadImage,
};
