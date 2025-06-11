export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.appURL}`;

  // Fetch CSRF cookie first (once per session)
  await $fetch("/sanctum/csrf-cookie", {
    baseURL,
    credentials: "include",
  });

  const api = $fetch.create({
    baseURL,
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    onRequest({ options }) {
      const xsrfToken = useCookie("XSRF-TOKEN");
      if (xsrfToken.value) {
        const headers = new Headers(options.headers);
        headers.set("X-XSRF-TOKEN", xsrfToken.value);
        options.headers = headers;
      }
    },
  });

  nuxtApp.provide("api", api);
});
