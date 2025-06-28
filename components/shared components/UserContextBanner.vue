<template>
  <div v-if="isAdmin" class="admin-context-banner">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <div>
        <i class="bi bi-shield-lock-fill me-2"></i>
        <strong>Admin Mode</strong> - You are viewing the admin interface
      </div>
      <NuxtLink to="/dashboard" class="btn btn-sm btn-light">
        Switch to User View
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const isAdmin = computed(() => {
  return props.user.role === 'Super Admin' || 
         props.user.role === 'Admin' || 
         props.user.isAdmin === true
})
</script>

<style scoped>
.admin-context-banner {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}
</style>