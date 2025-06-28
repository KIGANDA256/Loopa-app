<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">
        <img src="/images/logo.png" alt="Loopa" height="30" class="me-2">
        Loopa
      </NuxtLink>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Public Navigation -->
        <ul v-if="!isLoggedIn" class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" exact-active-class="active">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/contact" class="nav-link" active-class="active">Contact</NuxtLink>
          </li>
        </ul>
        
        <!-- User Navigation -->
        <ul v-else-if="isLoggedIn && !isAdmin" class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink to="/dashboard" class="nav-link" active-class="active">Dashboard</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/reports" class="nav-link" active-class="active">Reports</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/evidence" class="nav-link" active-class="active">Evidence</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/profile" class="nav-link" active-class="active">Profile</NuxtLink>
          </li>
        </ul>
        
        <!-- Admin Navigation -->
        <ul v-else class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink to="/admin/dashboard" class="nav-link" active-class="active">Admin Dashboard</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/users" class="nav-link" active-class="active">Users</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/reports" class="nav-link" active-class="active">Reports</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/Evidence" class="nav-link" active-class="active">Evidence</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/admin/settings" class="nav-link" active-class="active">Settings</NuxtLink>
          </li>
        </ul>
        
        <!-- Auth Buttons -->
        <div class="navbar-nav ms-auto">
          <template v-if="!isLoggedIn">
            <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
            <NuxtLink to="/register" class="btn btn-outline-light ms-2">Register</NuxtLink>
          </template>
          <template v-else>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                {{ currentUser.firstName || 'User' }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <span class="dropdown-item-text text-muted small">
                    Logged in as <strong>{{ currentUser.role || 'User' }}</strong>
                  </span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <NuxtLink class="dropdown-item" :to="isAdmin ? '/admin/profile' : '/profile'">
                    <i class="bi bi-person me-2"></i> Profile
                  </NuxtLink>
                </li>
                <li v-if="isAdmin">
                  <NuxtLink class="dropdown-item" to="/dashboard">
                    <i class="bi bi-layout-text-window me-2"></i> User Dashboard
                  </NuxtLink>
                </li>
                <li v-else-if="canAccessAdmin">
                  <NuxtLink class="dropdown-item" to="/admin/dashboard">
                    <i class="bi bi-speedometer me-2"></i> Admin Dashboard
                  </NuxtLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                    <i class="bi bi-box-arrow-right me-2"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const currentUser = ref({})
const isAdmin = computed(() => {
  if (!currentUser.value) return false
  return (
    currentUser.value.role === 'Super Admin' || 
    currentUser.value.role === 'Admin' || 
    currentUser.value.isAdmin === true
  )
})
const canAccessAdmin = computed(() => {
  if (!currentUser.value) return false
  return (
    currentUser.value.permissions?.viewAllRecords === true || 
    currentUser.value.adminLevel > 0
  )
})

onMounted(async () => {
  await checkAuthStatus()
})

async function checkAuthStatus() {
  try {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      isLoggedIn.value = false
      currentUser.value = {}
      return
    }
    
    const response = await fetch('/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.ok) {
      const userData = await response.json()
      isLoggedIn.value = true
      currentUser.value = userData
    } else {
      // Token invalid or expired
      isLoggedIn.value = false
      localStorage.removeItem('auth_token')
      currentUser.value = {}
    }
  } catch (error) {
    console.error('Error checking auth status:', error)
    isLoggedIn.value = false
    currentUser.value = {}
  }
}

async function logout() {
  try {
    localStorage.removeItem('auth_token')
    isLoggedIn.value = false
    currentUser.value = {}
    await router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>