import router from "@/router";
import axios from "axios";
import jsesc from "jsesc";
// import API_URL from "../env";

const HTTP = () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL_SERVER,
    withCredentials: false,
  });
  instance.interceptors.request.use(
    (config) => {
      config.headers = {
        "X-AUTH-TOKEN": localStorage.getItem("token"),
      };
      return config;
    },
    (error) => console.log(error)
  );
  instance.interceptors.response.use(
    (response) => {
      if (response.headers["content-type"] === "application/json") {
        response.data = JSON.parse(jsesc(response.data, { json: true }));
      }
      return response;
    },
    (error) => {
      if ([401, 403, 500].includes(error.response.status)) {
        router.push(
          {
            name: "Error",
            params: error.response.data,
          },
          () => {}
        );
        return Promise.resolve(error.response);
      } else if ([422].includes(error.response.status)) {
        return Promise.resolve(error.response);
      }
    }
  );
  return instance;
};

export default HTTP();
