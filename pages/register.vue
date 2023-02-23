<script setup lang="ts">
import { RegisterPayload } from "@/types";
import type { FormKitNode } from "@formkit/core";

definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});

const { register } = useAuth();

async function handleRegister(payload: RegisterPayload, node?: FormKitNode) {
  try {
    await register(payload);
  } catch (err) {
    handleInvalidForm(err, node);
  }
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" @submit="handleRegister">
      <FormKit type="text" label="Name" name="name"></FormKit>
      <FormKit type="text" label="Email" name="email"></FormKit>
      <FormKit
        type="password"
        label="Password"
        name="password"
        validation="required"
      ></FormKit>
      <FormKit
        type="password"
        label="Confirm Password"
        name="password_confirmation"
        validation="required|confirm:password"
      ></FormKit>
    </FormKit>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
