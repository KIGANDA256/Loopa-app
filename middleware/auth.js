export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  // If user is not authenticated and trying to access a restricted page
  if (!isAuthenticated.value && to.path !== '/login' && to.path !== '/Sign-up') {
    return navigateTo('/login')
  }
  
  // If user is authenticated and trying to access login/signup pages
  if (isAuthenticated.value && (to.path === '/login' || to.path === '/Sign-up')) {
    return navigateTo('/records')
  }
})