<script setup lang="ts">
defineProps({
  modelValue: { type: String, required: true },
});

defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();
</script>
<template>
  <div class="relative">
    <IconSearch
      class="w-3 w-3 absolute top-[50%] translate-y-[-50%] left-2 opacity-30"
    />

    <input
      type="text"
      placeholder="Search"
      class="pl-10 p-2 rounded"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :value="modelValue"
    />
  </div>
</template>
