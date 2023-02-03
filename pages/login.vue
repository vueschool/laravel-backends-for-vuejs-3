<script setup lang="ts">
definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});

const { login } = useAuth();

const form = ref({
  email: "",
  password: "",
});
</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login(form)">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
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
