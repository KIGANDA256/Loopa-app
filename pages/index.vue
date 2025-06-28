<template>
  <div class="landing-hero d-flex align-items-center justify-content-center min-vh-100">
    <div class="hero-card shadow-lg p-5 rounded-4 text-center glass-bg">
      <div class="mb-4">
        <span class="badge bg-primary fs-6 px-3 py-2 mb-2">The Real-time Crime Reporting App</span>
      </div>
      <h1 class="display-4 fw-bold mb-3 text-gradient">Report crimes anonymously, quickly, and securely</h1>
      <p class="lead text-muted mb-4">To Serve and Protect the Ugandan citizen</p>
      <div class="d-flex justify-content-center gap-3 mb-4">
        <NuxtLink to="/login" class="btn btn-primary btn-lg px-4 shadow-sm">
          <i class="bi bi-box-arrow-in-right me-2"></i>Login
        </NuxtLink>
        <NuxtLink to="/Sign-up" class="btn btn-outline-light btn-lg px-4 border-2 shadow-sm">
          <i class="bi bi-person-plus me-2"></i>Sign Up
        </NuxtLink>
      </div>
      <div class="mt-3">
        <i class="bi bi-shield-lock-fill text-primary fs-1"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<style scoped>
.landing-hero {
  background: linear-gradient(135deg, #3a4dff 0%, #2079ff 100%);
  min-height: 100vh;
  background-attachment: fixed;
  background-size: cover;
}
.hero-card {
  background: rgba(255,255,255,0.85);
  max-width: 500px;
  width: 100%;
  border-radius: 2rem;
  box-shadow: 0 8px 32px rgba(58,77,255,0.15);
  backdrop-filter: blur(6px);
}
.glass-bg {
  background: rgba(255,255,255,0.7);
  box-shadow: 0 8px 32px rgba(32,121,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
}
.text-gradient {
  background: linear-gradient(90deg, #3a4dff, #2079ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.btn-outline-light {
  color: #2079ff;
  border-color: #2079ff;
}
.btn-outline-light:hover {
  background: #2079ff;
  color: #fff;
}
</style>
