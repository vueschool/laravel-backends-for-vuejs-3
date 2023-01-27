<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  modelValue: { type: String, required: true },
});

defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const withoutDash = computed(() => props.name.replace(/^-/, ""));
const withDash = computed(() => `-${withoutDash.value}`);

const sorting = computed(
  () => props.name === props.modelValue.replace(/^-/, "")
);
const desc = computed(() => props.modelValue.startsWith("-"));
</script>
<template>
  <th>
    <button
      class="flex items-center"
      @click="$emit('update:modelValue', desc ? withoutDash : withDash)"
    >
      <slot></slot>
      <button v-if="sorting && desc">
        <IconChevronDown class="inline w-2 ml-2" />
      </button>
      <button v-if="sorting && !desc">
        <IconChevronUp class="inline w-2 ml-2" />
      </button>
    </button>
  </th>
</template>
