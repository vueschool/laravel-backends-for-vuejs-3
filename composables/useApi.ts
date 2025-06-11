import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const { $api } = useNuxtApp();

  return useFetch(url, {
    ...options,
    // @ts-ignore
    $fetch: $api as typeof $fetch,
  });
}
