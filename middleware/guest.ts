import axios, { AxiosError } from "axios";

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const { data: user } = await axios.get("/user");
    if (user) {
      return navigateTo("/me");
    }
  } catch (error) {}
});
