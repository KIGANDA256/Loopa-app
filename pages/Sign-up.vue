<template>
  <div class="signup-container">
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

    
    <div class="form-side">
      <div class="form-container">
        <h2 class="welcome-text">Create your account</h2>
        <p class="login-subtitle">Please fill in your information to get started</p>

        <div v-if="error" class="error-message">
          <i class="bi bi-exclamation-triangle"></i>
          {{ error }}
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group-row">
            <div class="form-group">
              <label for="first-name">First name</label>
              <input
                id="first-name"
                v-model="userData.firstName"
                type="text"
                class="form-control"
                required
              >
            </div>
            <div class="form-group">
              <label for="last-name">Last name</label>
              <input
                id="last-name"
                v-model="userData.lastName"
                type="text"
                class="form-control"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email address</label>
            <input
              id="email"
              v-model="userData.email"
              type="email"
              class="form-control"
              autocomplete="email"
              required
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="userData.password"
              type="password"
              class="form-control"
              required
            >
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="citizenship">Citizenship <span class="text-danger">*</span></label>
              <select
                id="citizenship"
                v-model="userData.citizenship"
                class="form-select"
                required
              >
                <option>Ugandan Citizen</option>
                <option>Not a Ugandan citizen</option>
              </select>
            </div>
            <div class="form-group">
              <label for="nationalId">National ID number <span class="text-danger">*</span></label>
              <input
                id="nationalId"
                v-model="userData.nationalId"
                type="text"
                placeholder="CM90388321NZGA"
                class="form-control"
                required
              >
            </div>
          </div>
          <div v-if="userData.role === 'Security Personnel'" class="form-group">
            <label for="staffId">Staff ID number <span class="text-danger">*</span></label>
            <input
              id="staffId"
              v-model="userData.staffId"
              type="text"
              placeholder="STF-KLA02-"
              class="form-control"
              required
            >
          </div>
          <div class="form-group-row">
            <div class="form-group">
              <label for="city">City</label>
              <input
                id="city"
                v-model="userData.city"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="district">District</label>
              <input
                id="district"
                v-model="userData.district"
                type="text"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="contact">Contact <span class="text-danger">*</span></label>
              <input
                id="contact"
                v-model="userData.contact"
                type="text"
                class="form-control"
                required
              >
            </div>
          </div>
          <button
            class="signup-button"
            type="submit"
            :disabled="loading"
          >
            <span v-if="loading">
              <i class="bi bi-arrow-repeat spin"></i> Signing up...
            </span>
            <span v-else>Sign up</span>
          </button>
        </form>

        <div class="register-prompt">
          Already have an account?
          <NuxtLink to="/login" class="register-link">Login</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register, loading, error, clearError } = useAuth()

const userData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  citizenship: 'Ugandan Citizen',
  role: 'User',
  nationalId: '',
  staffId: '',
  city: '',
  district: '',
  contact: ''
})

const handleSignup = async () => {
  clearError()
  try {
    if (userData.role === 'Security Personnel' && !userData.staffId) {
      throw new Error('Staff ID is required for Security Personnel')
    }
    await register(userData)
    alert('Registration successful! Please log in with your credentials.')
    router.push('/login')
  } catch (err) {
    console.error('Registration error:', err)
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Branding side */
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
  max-width: 500px;
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

.form-group-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-control,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus,
.form-select:focus {
  outline: none;
  border-color: #3a4dff;
  box-shadow: 0 0 0 0.2rem rgba(58, 77, 255, 0.15);
}

.signup-button {
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
  margin-top: 1.5rem;
}

.signup-button:hover {
  background-color: #2a3bed;
}

.signup-button:disabled {
  background-color: #6c7ae0;
  cursor: not-allowed;
}

.error-message {
  margin-bottom: 1rem;
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

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>