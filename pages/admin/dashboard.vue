<template>
  <div>
    <Nav-bar />
    
    <div class="flex flex-col mx-20 my-20 h-full border-2 border-gray-300 rounded-lg px-12 py-8 shadow-lg bg-white">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div v-if="loading" class="text-center py-4">Loading...</div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{{ error }}</div>
      
      <div v-if="user && user.isSuperAdmin" class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
        <p class="font-bold">Super Admin Mode</p>
        <p>You have full system access</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white border rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">Users</h2>
          <p class="text-3xl font-bold">{{ userCount }}</p>
          <NuxtLink to="/admin/users" class="text-blue-600 hover:underline block mt-4">Manage Users</NuxtLink>
        </div>
        
        <div class="bg-white border rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">Records</h2>
          <p class="text-3xl font-bold">{{ recordCount }}</p>
          <NuxtLink to="/records" class="text-blue-600 hover:underline block mt-4">View Records</NuxtLink>
        </div>
        
        <div class="bg-white border rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-2">System</h2>
          <p class="text-sm mt-2">Last backup: {{ lastBackup || 'Never' }}</p>
          <button @click="triggerBackup" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Backup System
          </button>
        </div>
      </div>
      
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">User</th>
            <th class="py-2 px-4 border-b text-left">Action</th>
            <th class="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in recentActivity" :key="index" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ activity.user }}</td>
            <td class="py-2 px-4 border-b">{{ activity.action }}</td>
            <td class="py-2 px-4 border-b">{{ activity.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user, fetchUser } = useAuth()
const loading = ref(false)
const error = ref(null)
const userCount = ref(0)
const recordCount = ref(0)
const lastBackup = ref(null)
const recentActivity = ref([])

onMounted(async () => {
  loading.value = true
  try {
    await fetchUser()
    
    // Check if user is admin
    if (!user.value || !user.value.isAdmin) {
      navigateTo('/login')
      return
    }
    
    // Fetch admin dashboard data
    const dashboardData = await $fetch('/api/admin/dashboard')
    userCount.value = dashboardData.userCount
    recordCount.value = dashboardData.recordCount
    lastBackup.value = dashboardData.lastBackup
    recentActivity.value = dashboardData.recentActivity
  } catch (err) {
    error.value = err.data?.message || 'Error loading dashboard'
  } finally {
    loading.value = false
  }
})

const triggerBackup = async () => {
  try {
    const result = await $fetch('/api/admin/backup', { method: 'POST' })
    lastBackup.value = result.backupTime
  } catch (err) {
    error.value = err.data?.message || 'Error creating backup'
  }
}
</script>