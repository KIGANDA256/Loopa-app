<template>
  <nav class="navbar navbar-expand navbar-dark bg-primary shadow-sm px-3">
    <div class="container-fluid">
      <!-- Sidebar Toggle -->
      <button 
        class="btn btn-link text-white me-3 p-1 border-0" 
        @click="toggleSidebar"
        aria-label="Toggle sidebar">
        <i class="bi bi-list fs-5"></i>
      </button>
      
      <!-- App Logo & Title -->
      <NuxtLink to="/dashboard" class="navbar-brand d-flex align-items-center">
        <div class="logo-circle bg-white rounded-circle me-2 d-flex align-items-center justify-content-center">
          <span class="text-primary fw-bold">L</span>
        </div>
        <span class="fw-bold d-none d-sm-inline">LOOPA</span>
      </NuxtLink>
      
      <!-- App Title on Medium Screens -->
      <span class="navbar-text text-white-50 d-none d-md-block ms-3">
        Crime Reporting Dashboard
      </span>
      
      <!-- User Controls -->
      <div class="ms-auto d-flex align-items-center gap-2 gap-md-3">
        <span class="text-white-50 d-none d-md-inline">
          <small class="opacity-75">Welcome</small>
        </span>
        
        <!-- Notification Dropdown -->
        <div class="dropdown">
          <button class="btn btn-link text-white p-1 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-bell-fill"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              2
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><h6 class="dropdown-header">Notifications</h6></li>
            <li><a class="dropdown-item" href="#">New report submitted</a></li>
            <li><a class="dropdown-item" href="#">Evidence approved</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item small" href="#">View all notifications</a></li>
          </ul>
        </div>
        
        <!-- Direct Logout Button -->
        <button @click="handleLogout" class="btn btn-outline-light btn-sm rounded-pill">
          <i class="bi bi-box-arrow-right me-1"></i>
          <span class="d-none d-sm-inline">Logout</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const isMenuOpen = ref(true)
const { logout } = useAuth()

// Enhanced logout function with forceful cookie clearing
const handleLogout = () => {
  console.log('Logging out forcefully...')
  
  // First try the composable logout
  logout()
  
  // Then force a complete page reload with cookie clearing
  setTimeout(() => {
    // Clear all cookies
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim()
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    })
    
    // Clear localStorage
    localStorage.clear()
    
    // Force navigation to login page
    window.location.href = '/login'
  }, 100)
}

// Emit sidebar toggle event for parent component to handle
const emit = defineEmits(['toggle-sidebar'])
const toggleSidebar = () => {
  isMenuOpen.value = !isMenuOpen.value
  emit('toggle-sidebar', isMenuOpen.value)
}
</script>

<style scoped>
.logo-circle {
  width: 26px;
  height: 26px;
  font-size: 16px;
}

.navbar-brand {
  letter-spacing: 1px;
}

.btn-link {
  text-decoration: none;
}

/* Prevent extra space from button focus */
.btn:focus {
  box-shadow: none;
}
</style>