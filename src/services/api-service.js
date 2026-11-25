import { createHttp } from "./http";

export default createHttp(import.meta.env.VUE_APP_BACKEND_URL_SERVER_RENDER);
