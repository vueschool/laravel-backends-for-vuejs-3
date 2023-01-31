<script setup lang="ts">
definePageMeta({
  layout: "centered",
});
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form>
      <label>
        <div>Name</div>
        <input type="text" />
      </label>

      <label>
        <div>Email</div>
        <input type="email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" />
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="password" />
      </label>

      <button class="btn">Register</button>
    </form>

    <p>
      Already have an account?
      <NuxtLink class="underline text-lime-600" to="/login">Login</NuxtLink>
    </p>
  </div>
</template>
