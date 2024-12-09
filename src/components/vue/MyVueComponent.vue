<!-- MyVueComponent.vue -->
<template>
  <div style="background: var(--background); color: var(--color);">Vue Component: {{ text }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<style scoped>
div {
  background: var(--background);
  color: var(--color);
}
</style>

