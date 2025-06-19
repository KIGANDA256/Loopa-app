<template>
    <div class="flex flex-col mx-auto my-20 max-w-md border-2 border-gray-300 rounded-lg px-8 py-16 shadow-lg bg-white">
        <h2 class="text-2xl font-semibold text-gray-900 text-center mb-8">Login to Loopa-App</h2>
        
        <form @submit.prevent="handleLogin">
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {{ error }}
            </div>
            
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-900 mb-2">Email address</label>
                <input
                    id="email"
                    v-model="loginData.email"
                    type="email"
                    required 
                    class="block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 focus:border-indigo-600 focus:outline-none"
                >
            </div>
            
            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-900 mb-2">Password</label>
                <input
                    id="password"
                    v-model="loginData.password"
                    type="password"
                    required 
                    class="block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 focus:border-indigo-600 focus:outline-none"
                >
            </div>
            
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    >
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                
                <div class="text-sm">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                </div>
            </div>
            
            <button
                class="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
                type="submit"
                :disabled="loading"
            >
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            
            <div class="mt-4 text-center">
                <p class="text-sm text-gray-600">
                    Don't have an account?
                    <NuxtLink to="/Sign-up" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</NuxtLink>
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { loginData, login, loading, error } = useAuth()

const handleLogin = async () => {
  try {
    const result = await login()
    
    // Redirect based on user role
    if (result.user.role === 'Super Admin' || result.user.isAdmin) {
      router.push('/admin/dashboard')
    } else {
      router.push('/records')
    }
  } catch {
    // Error is already handled in the composable
  }
}
</script>
