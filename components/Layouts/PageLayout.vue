<template>
  <div :class="['container py-5', containerClass]">
    <div v-if="title || description" class="mb-4 text-center">
      <h1 v-if="title" class="display-5 fw-bold mb-2">{{ title }}</h1>
      <p v-if="description" class="lead text-muted">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="mb-3 d-flex justify-content-end">
      <slot name="actions" />
    </div>
    <div class="bg-white rounded shadow-sm p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  containerClass: { type: String, default: '' }
})
</script>