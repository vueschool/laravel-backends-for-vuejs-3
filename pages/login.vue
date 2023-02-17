<script setup lang="ts">
import { AxiosError } from "axios";

definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});

const { login } = useAuth();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: [],
  password: [],
});

async function handleLogin() {
  try {
    await login(form.value);
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      errors.value = err.response.data.errors;
    }
  }
}
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email" />
        <div class="text-red-600 p-1" v-for="error in errors.email">
          {{ error }}
        </div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
        <div class="text-red-600 p-1" v-for="error in errors.password">
          {{ error }}
        </div>
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
