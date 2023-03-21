<script setup>
definePageMeta({
  layout: "plain",
});

const { data: profile, error } = await useFetch(
  `http://localhost/api/profiles/${useRoute().params.id}`
);

if (error.value) {
  showError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>
<template>
  <div class="p-10">
    <h1>👋 {{ profile.user.name }} Links</h1>
    <ul class="list-disc list-inside ml-10">
      <li v-for="link in profile.links" :key="link.short_link">
        <a :href="`http://localhost/${link.short_link}`">
          {{ `http://localhost/${link.short_link}` }}
        </a>
      </li>
      <li v-if="!profile.links.length">No links</li>
    </ul>
    <div class="p-10"></div>
  </div>
</template>
