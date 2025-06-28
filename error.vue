<template>
  <div class="min-vh-100 d-flex align-items-center">
    <div class="container text-center py-5">
      <h1 class="display-1 fw-bold text-danger mb-4">
        {{ error.statusCode || 'Error' }}
      </h1>
      
      <template v-if="error.statusCode === 403">
        <h2 class="mb-4">Access Denied</h2>
        <p class="lead mb-4">
          You don't have permission to access this page.
        </p>
      </template>
      <template v-else-if="error.statusCode === 404">
        <h2 class="mb-4">Page Not Found</h2>
        <p class="lead mb-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </template>
      <template v-else>
        <h2 class="mb-4">Something went wrong</h2>
        <p class="lead mb-4">
          {{ error.message || 'An unexpected error occurred' }}
        </p>
      </template>
      
      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
        <button @click="handleError" class="btn btn-primary">
          {{ error.statusCode === 404 ? 'Go Home' : 'Return to Dashboard' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Capture the props in a variable so we can use it in functions
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

function handleError() {
  // Access error through props
  if (props.error.statusCode === 404) {
    navigateTo('/')
  } else {
    navigateTo('/dashboard')
  }
}
</script>