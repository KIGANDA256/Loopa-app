<template>
  <div :class="['card', customClass]" style="width: 100%;">
    <img v-if="img" :src="img" class="card-img-top" :alt="imgAlt" />
    <div class="card-body">
      <h5 v-if="title" class="card-title">{{ title }}</h5>
      <p v-if="subtitle" class="card-subtitle mb-2 text-muted">{{ subtitle }}</p>
      <p v-if="text" class="card-text">{{ text }}</p>
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer bg-transparent border-0">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  text: String,
  img: String,
  imgAlt: { type: String, default: 'Card image' },
  customClass: { type: String, default: '' }
})
</script>