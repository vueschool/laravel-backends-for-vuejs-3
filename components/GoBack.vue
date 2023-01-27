<template>
  <a
    href="#"
    class="text-sm mb-5 italic flex items-center mt-[-10px]"
    @click.prevent="useRouter().back()"
  >
    <IconBack class="w-2 mr-1" /><slot>Go back</slot>
  </a>
</template>
