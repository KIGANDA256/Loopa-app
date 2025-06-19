<template>
  <div>
    <div class="flex flex-row  justify-start items-center">
      <nuxt-link to="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Crime Reporting App</span>
        <img class="h-35 px-0" src="../assets/logo.svg" alt="RT-CRA" />
      </nuxt-link>
    </div>

    <!-- Add this to your existing navigation bar -->
    <div class="flex items-center space-x-4">
      <!-- Regular navigation items -->
      <NuxtLink to="/records" class="px-3 py-2 rounded hover:bg-gray-100">Records</NuxtLink>

      <!-- Admin-only navigation items -->
      <template v-if="user && user.isAdmin">
        <NuxtLink to="/admin/dashboard" class="px-3 py-2 rounded bg-blue-100 text-blue-800 hover:bg-blue-200">
          Admin Dashboard
        </NuxtLink>
      </template>

      <!-- User menu -->
      <div v-if="user" class="relative">
        <button @click="toggleUserMenu" class="flex items-center space-x-2">
          <span>{{ user.firstName }}</span>
          <span class="text-xs bg-blue-500 text-white px-2 py-1 rounded">{{ user.role }}</span>
        </button>

        <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
          <NuxtLink to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</NuxtLink>
          <button @click="handleLogout" class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
            Logout
          </button>
        </div>
      </div>

      <NuxtLink v-else to="/login" class="px-3 py-2 rounded hover:bg-gray-100">Login</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user, logout } = useAuth()
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>