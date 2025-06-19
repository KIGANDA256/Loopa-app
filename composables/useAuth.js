import { ref, reactive, computed, onMounted } from 'vue'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const registerData = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    citizenship: '',
    role: 'Civilian',
    nationalId: '',
    staffId: '',
    city: '',
    district: '',
    contact: ''
  })
  
  const loginData = reactive({
    email: '',
    password: ''
  })

  const register = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: registerData
      })
      
      return response
    } catch (err) {
      error.value = err.data?.message || 'Registration failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }
  
  const login = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: loginData
      })
      
      // Store token and user data
      localStorage.setItem('auth_token', response.token)
      user.value = response.user
      
      return response
    } catch (err) {
      error.value = err.data?.message || 'Login failed'
      throw error.value
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    localStorage.removeItem('auth_token')
    user.value = null
  }
  
  const fetchUser = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) return null
    
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      user.value = response
      return response
    } catch (err) {
      error.value = err.data?.message || 'Failed to fetch user'
      logout()
      throw error.value
    } finally {
      loading.value = false
    }
  }
  
  const isAuthenticated = computed(() => !!user.value)
  
  // Try to restore session on init
  onMounted(() => {
    fetchUser().catch(() => {})
  })
  
  return {
    user,
    loading,
    error,
    registerData,
    loginData,
    register,
    login,
    logout,
    fetchUser,
    isAuthenticated
  }
}