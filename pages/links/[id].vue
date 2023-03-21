<script setup lang="ts">
import type { Link } from "@/types";
import { FormKitNode } from "@formkit/core";
definePageMeta({
  middleware: ["auth"],
});

const { find, link, update } = useLinks();
await find(Number(useRoute().params.id));

async function handleUpdate(payload: Partial<Link>, node?: FormKitNode) {
  try {
    await update(Number(useRoute().params.id), payload);
  } catch (err) {
    handleInvalidForm(err, node);
  }
}
</script>
<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>

  <FormKit type="form" submit-label="Update Link" @submit="handleUpdate">
    <FormKit
      :value="link.short_link"
      type="text"
      name="short_link"
      label="Short Link"
    />
    <FormKit
      :value="link.full_link"
      type="url"
      name="full_link"
      label="Full Link"
    />
  </FormKit>
</template>
