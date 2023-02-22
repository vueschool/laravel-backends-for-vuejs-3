<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>

  <FormKit type="form" submit-label="Create Link">
    <FormKit label="Link" type="url" name="full_link" />
  </FormKit>
</template>
