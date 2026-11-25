import HTTP from "@/services/api-service.js";
import { useAuthStore } from "@/stores/auth";

async function getUser() {
  const { data } = await HTTP.get("/users");
  return data;
}

async function login(dataSubmit) {
  const { data, status } = await HTTP.post("/auth/login", dataSubmit);
  return { data, status };
}

async function register(dataSubmit) {
  const { data, status } = await HTTP.post("/auth/register", dataSubmit);
  return { data, status };
}

function setAuthData(accessToken, userData) {
  useAuthStore().set(accessToken, userData);
}

function resetAuthData() {
  useAuthStore().clear();
}

export { getUser, login, register, setAuthData, resetAuthData };
