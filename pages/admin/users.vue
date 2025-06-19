<template>
  <div>
    <Nav-bar />
    
    <div class="flex flex-col mx-20 my-20 h-full border-2 border-gray-300 rounded-lg px-12 py-8 shadow-lg bg-white">
      <h1 class="text-2xl font-bold mb-6">User Management</h1>
      
      <div v-if="loading" class="text-center py-4">Loading users...</div>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{{ error }}</div>
      
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-xl">All Users</h2>
        <button @click="showAddModal = true" class="bg-green-500 text-white px-4 py-2 rounded">
          Add New User
        </button>
      </div>
      
      <table class="min-w-full bg-white border">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b text-left">Name</th>
            <th class="py-2 px-4 border-b text-left">Email</th>
            <th class="py-2 px-4 border-b text-left">Role</th>
            <th class="py-2 px-4 border-b text-left">Last Login</th>
            <th class="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
            <td class="py-2 px-4 border-b">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">
              <span :class="{
                'bg-purple-100 text-purple-800': user.role === 'Super Admin',
                'bg-blue-100 text-blue-800': user.role === 'Security Personnel',
                'bg-gray-100 text-gray-800': user.role === 'Civilian'
              }" class="px-2 py-1 rounded text-xs">
                {{ user.role }}
              </span>
            </td>
            <td class="py-2 px-4 border-b">{{ user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never' }}</td>
            <td class="py-2 px-4 border-b">
              <button @click="editUser(user)" class="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
              <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Add User Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg w-96 max-w-full">
          <h3 class="text-xl font-bold mb-4">Add New User</h3>
          <form @submit.prevent="addUser">
            <!-- Form fields for new user -->
            <div class="mb-4">
              <label class="block mb-1">First Name</label>
              <input v-model="newUser.firstName" class="border p-2 w-full" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Last Name</label>
              <input v-model="newUser.lastName" class="border p-2 w-full" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Email</label>
              <input v-model="newUser.email" type="email" class="border p-2 w-full" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Password</label>
              <input v-model="newUser.password" type="password" class="border p-2 w-full" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Role</label>
              <select v-model="newUser.role" class="border p-2 w-full" required>
                <option>Civilian</option>
                <option>Security Personnel</option>
                <option>Super Admin</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block mb-1">National ID</label>
              <input v-model="newUser.nationalId" class="border p-2 w-full" required />
            </div>
            
            <div class="flex justify-end">
              <button type="button" @click="showAddModal = false" class="bg-gray-300 px-4 py-2 rounded mr-2">
                Cancel
              </button>
              <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Edit User Modal - Similar to Add User but with user data pre-filled -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <!-- Similar form to Add User but for editing -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user, fetchUser } = useAuth()
const loading = ref(false)
const error = ref(null)
const users = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'Civilian',
  nationalId: ''
})
const editingUser = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    await fetchUser()
    
    // Check if user is admin
    if (!user.value || !user.value.isAdmin) {
      router.push('/login')
      return
    }
    
    // Fetch users
    users.value = await $fetch('/api/admin/users')
  } catch (err) {
    error.value = err.data?.message || 'Error loading users'
  } finally {
    loading.value = false
  }
})

const addUser = async () => {
  try {
    const response = await $fetch('/api/admin/users', {
      method: 'POST',
      body: newUser.value
    })
    
    users.value.push(response)
    showAddModal.value = false
    
    // Reset form
    newUser.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'Civilian',
      nationalId: ''
    }
  } catch (err) {
    error.value = err.data?.message || 'Error adding user'
  }
}

const editUser = (user) => {
  editingUser.value = { ...user }
  showEditModal.value = true
}

const confirmDeleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
    try {
      await $fetch(`/api/admin/users/${user._id}`, {
        method: 'DELETE'
      })
      
      // Remove from list
      users.value = users.value.filter(u => u._id !== user._id)
    } catch (err) {
      error.value = err.data?.message || 'Error deleting user'
    }
  }
}
</script>