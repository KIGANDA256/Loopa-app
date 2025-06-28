<template>
  <div class="unauthorized-container">
    <div class="content-box">
      <i class="bi bi-shield-lock text-danger display-1"></i>
      <h1>Access Denied</h1>
      <p class="lead">You don't have permission to access this page.</p>
      
      <div class="action-buttons">
        <button @click="goBack" class="btn btn-outline-secondary me-2">
          <i class="bi bi-arrow-left"></i> Go Back
        </button>
        <button @click="goToLogin" class="btn btn-primary">
          <i class="bi bi-box-arrow-in-right"></i> Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  window.history.length > 1 ? router.go(-1) : router.push('/')
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
.unauthorized-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.content-box {
  text-align: center;
  padding: 3rem;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.content-box i {
  margin-bottom: 1.5rem;
}

.content-box h1 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.content-box p {
  color: #6c757d;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>