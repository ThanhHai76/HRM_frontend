import HTTP from "@/services/api-service.js";
import HTTP_PDF from "@/services/api-pdf-service.js";

async function getAllPDFs() {
  const { data } = await HTTP.get("/pdf/all-pdfs");
  return data;
}

async function createPDF(PDF) {
  const { data, status } = await HTTP.post("/pdf/create-pdf", PDF);
  return { data, status };
}

async function getPDF(id) {
  const { data } = await HTTP.get(`/pdf/get-pdf/${id}`);
  return data;
}

async function updatePDF(id, PDF) {
  const { data, status } = await HTTP.put(`/pdf/update-pdf/${id}`, PDF);
  return { data, status };
}

async function deletePDF(id) {
  const { status } = await HTTP.delete(`/pdf/delete-pdf/${id}`);
  return status;
}

async function uploadFilePDF(file) {
  const formData = new FormData();
  formData.append("pdfFile", file);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data, status } = await HTTP_PDF.post(
    "/pdf/upload_pdf",
    formData,
    options
  );
  return { data, status };
}

export { getAllPDFs, createPDF, getPDF, updatePDF, deletePDF, uploadFilePDF };
