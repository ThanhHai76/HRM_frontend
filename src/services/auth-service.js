import HTTP from "@/services/api-service.js";

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

async function setAuthData(accessToken, userData) {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("userData", JSON.stringify(userData));
  // $store.commit('user/SET_CURRENT_USER', userData)
}

async function resetAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}

export { getUser, login, register, setAuthData, resetAuthData };
