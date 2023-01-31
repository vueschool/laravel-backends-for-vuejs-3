import axios from "axios";
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  axios.defaults.baseURL = `${config.public.appURL}/api`;
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.withCredentials = true;

  await axios.get("/sanctum/csrf-cookie", {
    baseURL: config.public.appURL,
  });
});
