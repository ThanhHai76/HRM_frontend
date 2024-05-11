import HTTP from "@/services/api-service.js";

async function getAllTracks() {
  const { data } = await HTTP.get("/track/all-tracks");
  return data;
}

async function createTrack(track) {
  const { data, status } = await HTTP.post("/track/create-track", track);
  return { data, status };
}

async function getTrack(id) {
  const { data } = await HTTP.get(`/track/get-track/${id}`);
  return data;
}

async function updateTrack(id, track) {
  const { data, status } = await HTTP.put(
    `/track/update-track/${id}`,
    track
  );
  return { data, status };
}

async function deleteTrack(id) {
  const { status } = await HTTP.delete(`/track/delete-track/${id}`);
  return status;
}

export {
    getAllTracks,
    createTrack,
    getTrack,
    updateTrack,
    deleteTrack,
}