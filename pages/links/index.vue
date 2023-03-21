<script setup lang="ts">
import { TailwindPagination } from "laravel-vue-pagination";

const queries = ref({
  page: 1,
  sort: "",
  "filter[full_link]": "",
  ...useRoute().query,
});

const { data, index: getLinks, destroy } = useLinks({ queries });

await getLinks();
let links = computed(() => data.value?.data);

watch(queries, () => useRouter().push({ query: queries.value }), {
  deep: true,
});

definePageMeta({
  middleware: ["auth"],
});

async function handleDelete(id: number) {
  await destroy(id);
  if (data.value) {
    data.value.data = data.value?.data.filter((link) => link.id !== id);
  }
}
</script>
<template>
  <div>
    <nav class="flex justify-between mb-4 items-center">
      <h1 class="mb-0">My Links</h1>
      <div class="flex items-center">
        <SearchInput v-model="queries['filter[full_link]']" />
        <NuxtLink to="/links/create" class="ml-4">
          <IconPlusCircle class="inline" /> Create New
        </NuxtLink>
      </div>
    </nav>

    <div v-if="true">
      <table class="table-fixed w-full">
        <thead>
          <tr>
            <TableTh v-model="queries.sort" name="full_link" class="w-[29%]">
              Full Link
            </TableTh>
            <TableTh v-model="queries.sort" name="short_link" class="w-[29%]">
              Short Link
            </TableTh>
            <TableTh v-model="queries.sort" name="views" class="w-[16%]">
              Views
            </TableTh>
            <th class="w-[10%]">Edit</th>
            <th class="w-[10%]">Trash</th>
            <th class="w-[6%] text-center">
              <button @click="getLinks()">
                <IconRefresh class="w-[15px] relative top-[2px]" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links">
            <td :title="`created ${useTimeAgo(link.created_at).value}`">
              <a :href="link.full_link" target="_blank">
                {{ link.full_link.replace(/^http(s?):\/\//, "") }}</a
              >
            </td>
            <td>
              <a
                :href="`${useRuntimeConfig().public.appURL}/${link.short_link}`"
                target="_blank"
              >
                {{
                  useRuntimeConfig().public.appURL.replace(
                    /^http(s?):\/\//,
                    ""
                  )
                }}/{{ link.short_link }}
              </a>
            </td>
            <td>{{ link.views }}</td>
            <td>
              <NuxtLink class="no-underline" :to="`/links/${link.id}`"
                ><iconEdit
              /></NuxtLink>
            </td>
            <td>
              <button @click="handleDelete(link.id)"><IconTrash /></button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <TailwindPagination
        :data="data"
        @pagination-change-page="queries.page = $event"
      />
      <div class="mt-5 flex justify-center"></div>
    </div>

    <!-- No links message for when table is empty -->
    <div
      v-else
      class="border-dashed border-gray-500 p-3 border-[1px] text-center"
    >
      <div class="flex justify-center">
        <IconLink />
      </div>
      <p>
        <!-- Show this if reason for no links is none found in search -->
        <span v-if="false"> No links matching links found. </span>

        <!-- Show this if reason for no links is User has none -->
        <span v-else>
          No links created yet
          <NuxtLink to="/links/create" class="text-green-600"
            >Go create your first link!</NuxtLink
          >
        </span>
      </p>
    </div>
  </div>
</template>
