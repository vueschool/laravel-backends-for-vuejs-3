import axios, { AxiosError } from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    await axios.get("/user");
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return navigateTo("/login");
    }
  }
});
