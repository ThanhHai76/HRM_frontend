import HTTP from "@/services/api-service.js";

async function getAllJobs() {
  const { data } = await HTTP.get("/job/all-jobs");
  return data;
}

async function createJob(job) {
  const { data, status } = await HTTP.post("/job/create-job", job);
  return { data, status };
}

async function getJob(id) {
  const { data } = await HTTP.get(`/job/get-job/${id}`);
  return data;
}

async function updateJob(id, job) {
  const { data, status } = await HTTP.put(
    `/job/update-job/${id}`,
    job
  );
  return { data, status };
}

async function deleteJob(id) {
  const { status } = await HTTP.delete(`/job/delete-job/${id}`);
  return status;
}

export {
    getAllJobs,
    createJob,
    getJob,
    updateJob,
    deleteJob,
}