<script setup>
import axios from "axios";
definePageMeta({
  middleware: ["auth"],
});
const { data: user } = await axios.get("/user");
</script>
<template>
  <p><strong>User Name:</strong> {{ user.name }}</p>
  <p><strong>User Email:</strong> {{ user.email }}</p>
</template>
