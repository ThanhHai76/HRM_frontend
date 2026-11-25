import { createHttp } from "./http";

export default createHttp(import.meta.env.VUE_APP_PDF_URL_SERVER);
