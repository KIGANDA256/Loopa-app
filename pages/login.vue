<template>
  <div class="login-container">
    <!-- Branding Side -->
    <div class="branding-side">
      <div class="branding-content">
        <div class="logo-container">
          <div class="app-logo">
            <span>L</span>
          </div>
        </div>
        <h1 class="app-name">LOOPA</h1>
        <p class="app-tagline">Secure crime reporting and evidence management platform</p>
        <div class="features">
          <div class="feature-item">
            <i class="bi bi-shield-check"></i>
            <span>Secure reporting</span>
          </div>
          <div class="feature-item">
            <i class="bi bi-file-earmark-text"></i>
            <span>Evidence management</span>
          </div>
          <div class="feature-item">
            <i class="bi bi-graph-up"></i>
            <span>Real-time analytics</span>
          </div>
        </div>
      </div>
      <div class="overlay"></div>
    </div>
    
    <!-- Login Form Side -->
    <div class="form-side">
      <div class="form-container">
        <h2 class="welcome-text">Welcome back</h2>
        <p class="login-subtitle">Log in to your account to continue</p>
        
        <!-- Added a notification for redirects -->
        <div v-if="redirect" class="redirect-message">
          <i class="bi bi-info-circle"></i>
          Please log in to access the requested page
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-with-icon">
              <i class="bi bi-envelope"></i>
              <input
                v-model="form.email"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                autocomplete="username"
              />
            </div>
          </div>
          
          <div class="form-group">
            <div class="password-label">
              <label for="password">Password</label>
              <a href="/forgot-password" class="forgot-link">Forgot password?</a>
            </div>
            <div class="input-with-icon">
              <i class="bi bi-lock"></i>
              <input
                v-model="form.password"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
            </div>
          </div>
          
          <button type="submit" class="login-button" :disabled="loading">
            <span v-if="loading">
              <i class="bi bi-arrow-repeat spin"></i> Loading...
            </span>
            <span v-else>Login</span>
          </button>
          
          <div v-if="error" class="error-message">
            <i class="bi bi-exclamation-triangle"></i>
            {{ error }}
          </div>
        </form>
        
        <div class="register-prompt">
          Don't have an account?
          <NuxtLink to="/Sign-up" class="register-link">Sign up</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const route = useRoute()
// Get all the values from useAuth
const { login, loading, error, user, isAuthenticated, clearError } = useAuth()

// Get redirect URL from query params
const redirect = ref(route.query.redirect || null)

const form = ref({
  email: '',
  password: ''
})

// If user is already authenticated, redirect them
onMounted(() => {
  if (isAuthenticated.value) {
    handleRedirectForRole()
  }
})

// Function to redirect based on user role
function handleRedirectForRole() {
  // If there's a specific redirect path, use it
  if (redirect.value) {
    router.push(redirect.value.toString())
    return
  }
  
  // Otherwise redirect based on role
  if (user.value?.role === 'Admin' || user.value?.role === 'Super Admin') {
    router.push('/admin/dashboard')
  } else {
    router.push('/homeDashboard')
  }
}

const handleLogin = async () => {
  try {
   
    clearError()
    
    // Attempt login
    await login(form.value.email, form.value.password)
    
    // Redirect based on role or redirect parameter
    handleRedirectForRole()
  } catch (err) {
    // Error handling is done in the useAuth composable
    console.error('Login error:', err)
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.branding-side {
  display: none;
  position: relative;
  background-image: linear-gradient(135deg, #3a4dff, #2079ff);
  color: white;
  overflow: hidden;
}

@media (min-width: 768px) {
  .branding-side {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .form-side {
    flex: 1;
  }
}

.branding-content {
  z-index: 2;
  padding: 2rem;
  text-align: center;
  max-width: 80%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB2aWV3Qm94PSIwIDAgNjAwIDYwMCI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIGQ9Ik0wLDBoNjAwdjYwMEgwVjB6IE02MCw2MGg0ODB2NDgwSDYwVjYweiBNMTIwLDEyMGgzNjB2MzYwSDEyMFYxMjB6IE0xODAsMTgwaDI0MHYyNDBIMTgwVjE4MHogTTI0MCwyNDBoMTIwdjEyMEgyNDBWMjQweiIvPjwvc3ZnPg==');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.1;
  z-index: 1;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.app-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.app-logo span {
  font-size: 36px;
  font-weight: bold;
  color: #3a4dff;
}

.app-name {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.app-tagline {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features {
  margin-top: 3rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.feature-item i {
  margin-right: 1rem;
  font-size: 1.5rem;
}

/* Form side */
.form-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.form-container {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

.welcome-text {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #6c757d;
  margin-bottom: 2.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.password-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.forgot-link {
  font-size: 0.85rem;
  color: #3a4dff;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
}

.input-with-icon input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-size: 1rem;
}

.input-with-icon input:focus {
  outline: none;
  border-color: #3a4dff;
  box-shadow: 0 0 0 0.2rem rgba(58, 77, 255, 0.25);
}

.login-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #3a4dff;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button:hover {
  background-color: #2a3bed;
}

.login-button:disabled {
  background-color: #6c7ae0;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  color: #e03131;
  border-radius: 0.375rem;
  border-left: 4px solid #e03131;
  display: flex;
  align-items: center;
}

.error-message i {
  margin-right: 0.5rem;
}

.register-prompt {
  margin-top: 2.5rem;
  text-align: center;
  color: #6c757d;
}

.register-link {
  color: #3a4dff;
  font-weight: 500;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

/* Add styles for redirect message */
.redirect-message {
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background-color: #e7f5ff;
  color: #1971c2;
  border-radius: 0.375rem;
  border-left: 4px solid #1971c2;
  display: flex;
  align-items: center;
}

.redirect-message i {
  margin-right: 0.5rem;
}
</style>