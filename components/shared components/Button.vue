<template>
  <button
    :type="type"
    :class="['btn', btnClass, { 'w-100': block, disabled: disabled }]"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, // e.g. 'primary', 'secondary', 'danger'
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const btnClass = computed(() => `btn-${props.variant}`)

function onClick(event) {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>