<template>
  <nav
    class="bg-gray-800 p-4 shadow shadow-gray-900 text-white flex justify-between items-center"
  >
    <div>
      <NuxtLink to="/" class="text-3xl font-bold">
        <IconLink class="inline" />
        URLShortify
      </NuxtLink>
    </div>
    <div>
      <NuxtLink to="/me">My Profile</NuxtLink>
      <NuxtLink to="/links">Links</NuxtLink>
      <NuxtLink to="/logout">
        <IconLogout class="inline" />
      </NuxtLink>
    </div>
  </nav>
</template>
<style scoped>
a {
  @apply text-white mr-3 no-underline;
}
</style>
