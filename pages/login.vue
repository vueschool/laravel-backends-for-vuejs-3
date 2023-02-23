<script setup lang="ts">
import { LoginPayload } from "@/types";
import type { FormKitNode } from "@formkit/core";

definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});

const { login } = useAuth();

async function handleLogin(payload: LoginPayload, node?: FormKitNode) {
  try {
    await login(payload);
  } catch (err) {
    handleInvalidForm(err, node);
  }
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
    </FormKit>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
