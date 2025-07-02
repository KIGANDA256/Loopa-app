<template>
  <div class="landing-hero d-flex flex-column min-vh-100">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <div class="navbar-brand d-flex align-items-center">
          <div class="app-logo-small me-2">L</div>
          <span class="fw-bold">LOOPA</span>
        </div>
        <div class="ms-auto d-none d-md-block">
          <NuxtLink to="/login" class="btn btn-outline-light btn-sm me-2">Log in</NuxtLink>
          <NuxtLink to="/Sign-up" class="btn btn-light btn-sm">Sign up</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left Column: Content -->
          <div class="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <span class="badge bg-white text-primary fs-6 px-3 py-2 mb-3 animate-in">CRIME REPORTING PLATFORM</span>
            <h1 class="display-3 fw-bold mb-4 text-white animate-in-delay-1">
              Report crimes <span class="highlight">anonymously</span>, quickly, and securely
            </h1>
            <p class="lead text-white opacity-75 mb-4 animate-in-delay-2">
              Loopa empowers communities to report criminal activities while ensuring your identity remains protected.
            </p>
            <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start animate-in-delay-3">
              <NuxtLink to="/login" class="btn btn-light btn-lg px-4 shadow-sm">
                <i class="bi bi-box-arrow-in-right me-2"></i>Login
              </NuxtLink>
              <NuxtLink to="/Sign-up" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-person-plus me-2"></i>Sign Up
              </NuxtLink>
            </div>
            
            <!-- Trust Indicators -->
            <div class="mt-5 d-flex flex-wrap gap-4 justify-content-center justify-content-lg-start text-white animate-in-delay-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-shield-check fs-4 me-2"></i>
                <span>Secure & Private</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-clock-history fs-4 me-2"></i>
                <span>24/7 Availability</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-geo-alt fs-4 me-2"></i>
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Visual -->
          <div class="col-lg-6 d-flex justify-content-center animate-in-delay-2">
            <div class="position-relative">
              <div class="hero-visual-card p-4 rounded-4 shadow-lg">
                <div class="d-flex align-items-center mb-3">
                  <div class="app-icon-circle bg-primary text-white me-3">
                    <i class="bi bi-shield"></i>
                  </div>
                  <div>
                    <h5 class="mb-0">Report Status</h5>
                    <small class="text-muted">Case #2384</small>
                  </div>
                  <span class="badge bg-success ms-auto">Processing</span>
                </div>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-primary" role="progressbar" style="width: 65%"></div>
                </div>
                <p class="small text-muted mb-0">Your report has been received and is being processed by authorities.</p>
              </div>
              
              <div class="hero-visual-card-sm bg-white p-3 rounded-3 shadow position-absolute">
                <div class="d-flex align-items-center">
                  <i class="bi bi-check-circle-fill text-success me-2"></i>
                  <span>Report submitted anonymously</span>
                </div>
              </div>
              
              <div class="hero-visual-card-sm bg-white p-3 rounded-3 shadow position-absolute" style="right: -20px; bottom: 20px;">
                <div class="d-flex align-items-center">
                  <i class="bi bi-geo-alt-fill text-danger me-2"></i>
                  <span>Location secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="container mt-auto pb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div class="text-white opacity-75 small">
          &copy; {{ new Date().getFullYear() }} Loopa App. All rights reserved.
        </div>
        <div class="mt-3 mt-md-0">
          <a href="#" class="text-white opacity-75 small me-3">Terms</a>
          <a href="#" class="text-white opacity-75 small me-3">Privacy</a>
          <a href="#" class="text-white opacity-75 small">Contact</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
</script>

<style scoped>
.landing-hero {
  background: radial-gradient(ellipse at bottom right, #4a6bfc 0%, #2047e0 50%, #1a34a7 100%);
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.landing-hero::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.8;
}

.navbar {
  padding: 1.5rem 0;
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
  z-index: 10;
}

.app-logo-small {
  width: 30px;
  height: 30px;
  background-color: white;
  color: #3a4dff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.highlight {
  position: relative;
  display: inline-block;
  color: #fff;
}

.highlight::after {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  bottom: 5px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: -1;
  border-radius: 10px;
}

.hero-visual-card {
  background: white;
  width: 320px;
  border-radius: 16px;
  z-index: 2;
}

.hero-visual-card-sm {
  width: 200px;
  z-index: 1;
}

.hero-visual-card-sm:nth-of-type(2) {
  top: -20px;
  left: -40px;
}

.app-icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.7);
  color: white;
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* Animations */
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
}

.animate-in-delay-1 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease 0.2s forwards;
}

.animate-in-delay-2 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease 0.4s forwards;
}

.animate-in-delay-3 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease 0.6s forwards;
}

.animate-in-delay-4 {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease 0.8s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 767px) {
  .hero-visual-card {
    width: 280px;
  }
  
  .hero-visual-card-sm {
    width: 180px;
  }
}
</style>
