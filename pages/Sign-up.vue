<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                <p class="mt-2 text-sm text-gray-600">Please fill in your information to get started</p>
            </div>
            
            <!-- Error Alert -->
            <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-red-700">{{ error }}</p>
                    </div>
                </div>
            </div>
            
            <form class="mt-8 space-y-6" @submit.prevent="handleSignup">
                <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <!-- First Name & Last Name -->
                    <div class="sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                        <div class="mt-1">
                            <input
                                id="first-name"
                                v-model="userData.firstName"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                        <div class="mt-1">
                            <input
                                id="last-name"
                                v-model="userData.lastName"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <!-- Email & Password -->
                    <div class="sm:col-span-6">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                        <div class="mt-1">
                            <input
                                id="email"
                                v-model="userData.email"
                                type="email"
                                autocomplete="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <div class="sm:col-span-6">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <div class="mt-1">
                            <input
                                id="password"
                                v-model="userData.password"
                                type="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <!-- Citizenship & Role -->
                    <div class="sm:col-span-3">
                        <label for="citizenship" class="block text-sm font-medium text-gray-700">
                            <span class="text-red-500">*</span> Citizenship
                        </label>
                        <div class="mt-1 relative">
                            <select
                                id="citizenship"
                                v-model="userData.citizenship"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option>Ugandan Citizen</option>
                                <option>Not a Ugandan citizen</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="role" class="block text-sm font-medium text-gray-700">
                            <span class="text-red-500">*</span> Role
                        </label>
                        <div class="mt-1 relative">
                            <select
                                id="role"
                                v-model="userData.role"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option>Security Personnel</option>
                                <option>Civilian</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- National ID & Staff ID -->
                    <div class="sm:col-span-6">
                        <label for="nationalId" class="block text-sm font-medium text-gray-700">
                            <span class="text-red-500">*</span> National ID number
                        </label>
                        <div class="mt-1">
                            <input
                                id="nationalId"
                                v-model="userData.nationalId"
                                type="text"
                                placeholder="CM90388321NZGA"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <!-- Only show Staff ID for Security Personnel -->
                    <div v-if="userData.role === 'Security Personnel'" class="sm:col-span-6">
                        <label for="staffId" class="block text-sm font-medium text-gray-700">
                            <span class="text-red-500">*</span> Staff ID number
                        </label>
                        <div class="mt-1">
                            <input
                                id="staffId"
                                v-model="userData.staffId"
                                type="text"
                                placeholder="STF-KLA02-"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>

                    <!-- City, District & Contact -->
                    <div class="sm:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                        <div class="mt-1">
                            <input
                                id="city"
                                v-model="userData.city"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="district" class="block text-sm font-medium text-gray-700">District</label>
                        <div class="mt-1">
                            <input
                                id="district"
                                v-model="userData.district"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="contact" class="block text-sm font-medium text-gray-700">
                            <span class="text-red-500">*</span> Contact
                        </label>
                        <div class="mt-1">
                            <input
                                id="contact"
                                v-model="userData.contact"
                                type="text"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                        class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        type="button"
                        @click="navigateToLogin"
                    >
                        Already have an account? Login
                    </button>
                    <button
                        class="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="submit"
                        :disabled="loading"
                    >
                        <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="animate-spin h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </span>
                        {{ loading ? 'Signing up...' : 'Sign up' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref(null)

const userData = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    citizenship: 'Ugandan Citizen',
    role: 'Civilian',
    nationalId: '',
    staffId: '',
    city: '',
    district: '',
    contact: ''
})

const handleSignup = async () => {
    loading.value = true
    error.value = null
    
    try {
        // Make sure staffId is required for Security Personnel
        if (userData.role === 'Security Personnel' && !userData.staffId) {
            throw new Error('Staff ID is required for Security Personnel')
        }
        
        // Call the register API endpoint
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: userData
        })
        
        // Show success message
        alert('Registration successful! Please log in with your credentials.')
        
        // Redirect to login page
        router.push('/login')
    } catch (err) {
        console.error('Registration error:', err)
        error.value = err.data?.message || err.message || 'Failed to register. Please try again.'
    } finally {
        loading.value = false
    }
}

const navigateToLogin = () => {
    router.push('/login')
}
</script>