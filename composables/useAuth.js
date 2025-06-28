import { ref, readonly, onMounted, computed } from 'vue'

export const useAuth = () => {
  const user = useState('user', () => null)
  const token = useCookie('auth_token', { sameSite: 'lax' }) // or 'strict' if you want
  const error = useState('auth-error', () => null)
  const loading = useState('auth-loading', () => false)
  
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'Admin' || user.value?.role === 'Super Admin')
  const isNormalUser = computed(() => user.value && !isAdmin.value)
  
  function clearError() {
    error.value = null
  }
  
  // Create a function to get auth headers for API requests
  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }
  
  // Real login function that calls the backend
  const login = async (email, password) => {
    // Clear error at the start of login
    clearError()
    loading.value = true
    
    try {
      // Make a real API call to your backend
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      
      // Make sure token is properly stored
      token.value = response.token
      console.log('Token stored:', token.value) // Debug line
      user.value = response.user
      
      return response
    } catch (err) {
      // Set error message
      error.value = err.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Fetch the current user data - updated to handle no token case silently
  const fetchUser = async () => {
    // If no token exists, silently return without error
    if (!token.value) {
      return null
    }
    
    try {
      const userData = await $fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      
      user.value = userData
      return userData
    } catch (err) {
      // Only log detailed errors in development
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error fetching user:', err)
      }
      
      // Only logout on actual token validation failures, not on first-time visits
      if (err.response?.status === 401 && token.value) {
        // Clear the invalid token
        token.value = null
        user.value = null
      }
      return null
    }
  }
  
  // Logout function
  const logout = () => {
    console.log('Logout called')
    
    // Clear token in cookie
    token.value = null
    user.value = null
    
    // Call the backend logout endpoint for any server-side cleanup
    try {
      $fetch('/api/auth/logout', {
        method: 'POST',
        headers: getAuthHeaders()
      })
    } catch (error) {
      console.error('Error during logout:', error)
    }

    // Force clear any stored auth data
    if (process.client) {
      // Clear any localStorage items if you're using them
      localStorage.removeItem('auth_user')
      
      // Hard redirect to login page to ensure clean state
      window.location.href = '/login'
    } else {
      // Server-side, just navigate
      navigateTo('/login')
    }
  }
  
  // Create a custom fetch function that automatically adds auth headers
  const authFetch = async (url, options = {}) => {
    return await $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token.value}` // token from useCookie('auth_token')
      }
    })
  }
  
  // Registration function
  const register = async (userData) => {
    clearError()
    loading.value = true
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })
    } catch (err) {
      error.value = err.data?.message || err.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Initialize auth on client side
  if (process.client) {
    onMounted(fetchUser)
  }
  
  return {
    user,
    login,
    logout,
    fetchUser,
    loading,
    error,
    clearError,
    isAuthenticated,
    isAdmin,
    isNormalUser,
    authFetch, // Export the authenticated fetch function
    getAuthHeaders, // Export for manual use when needed
    register // Export the registration function
  }
}