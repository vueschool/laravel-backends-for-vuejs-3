import type { PaginatedResponse, Link, RawLink } from "~~/types";
import type { Ref } from "vue";

interface UseLinksOptions {
  queries?: Ref<Record<string, string | number>>;
}

export const useLinks = ({ queries = ref({}) }: UseLinksOptions = {}) => {
  const { $api } = useNuxtApp();
  const slug = "links";
  const paginatedData = ref<PaginatedResponse<Link>>();
  const item = ref<Link>();

  function adapter(link: RawLink): Link {
    return {
      ...link,
      created_at: new Date(link.created_at),
      updated_at: new Date(link.updated_at),
    };
  }

  // get all links
  async function index(qs?: Record<string, string | number>) {
    qs = { ...queries.value, ...qs };
    // @ts-expect-error page is number and that's ok
    const q = new URLSearchParams(qs).toString();
    const data = (await $api(
      `/api/${slug}?${q}`
    )) as PaginatedResponse<RawLink>;
    return (paginatedData.value = {
      ...data,
      data: data.data.map((i) => adapter(i)),
    });
  }
  watch(queries, index, { deep: true });

  // find one link by id
  async function find(id: string | number) {
    const data = (await $api(`/api/${slug}/${id}`)) as RawLink;
    return (item.value = adapter(data));
  }

  // create a new link
  async function create(payload: Partial<Link>) {
    const data = (await $api(`/api/${slug}`, {
      method: "POST",
      body: payload,
    })) as RawLink;
    return (item.value = adapter(data));
  }

  // update an existing link
  async function update(id: string | number, payload: Partial<Link>) {
    const data = (await $api(`/api/${slug}/${id}`, {
      method: "PUT",
      body: payload,
    })) as RawLink;
    return (item.value = adapter(data));
  }

  // delete an existing item
  async function destroy(id: string | number) {
    await $api(`/api/${slug}/${id}`, {
      method: "DELETE",
    });
  }

  return {
    find,
    create,
    update,
    destroy,
    index,
    data: paginatedData,
    link: item,
  };
};
