<script setup lang="ts">
import axios from "axios";

definePageMeta({
  layout: "centered",
});

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

async function register(payload: RegisterPayload) {
  const res = await axios.post("/api/register", payload);
  console.log(res);
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register(form)">
      <label>
        <div>Name</div>
        <input type="text" v-model="form.name" />
      </label>

      <label>
        <div>Email</div>
        <input type="email" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="password" v-model="form.password_confirmation" />
      </label>

      <button class="btn">Register</button>
    </form>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
