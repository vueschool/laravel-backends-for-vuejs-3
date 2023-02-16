<script setup>
definePageMeta({
  middleware: ["auth"],
});
const { user } = useAuth();
</script>
<template>
  <p><strong>User Name:</strong> {{ user.name }}</p>
  <p><strong>User Email:</strong> {{ user.email }}</p>
</template>
