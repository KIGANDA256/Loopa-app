<template>
  <MainLayout>
    <div class="container my-5">
      <div class="card shadow p-4">
        <h1 class="h3 fw-bold mb-4">User Management</h1>
        
        <div v-if="loading" class="text-center py-4">Loading users...</div>
        <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
        
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h5 mb-0">All Users</h2>
        </div>
        
        <div class="table-responsive">
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{ user.firstName }} {{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <span
                    :class="[
                      'badge',
                      user.role === 'Super Admin' ? 'bg-purple' :
                      user.role === 'Security Personnel' ? 'bg-primary' : 'bg-secondary'
                    ]"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td>{{ user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never' }}</td>
              </tr>
              <tr v-if="!loading && users.length === 0">
                <td colspan="4" class="text-center text-muted">No users found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/components/Layouts/MainLayout.vue'
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { authFetch } = useAuth()
const loading = ref(false)
const error = ref(null)
const users = ref([])

onMounted(async () => {
  loading.value = true
  try {
    // Fetch users from the backend API using authFetch
    users.value = await authFetch('/api/admin/users')
  } catch (err) {
    error.value = err.data?.message || err.message || 'Error loading users'
  } finally {
    loading.value = false
  }
})
</script>

<script>
definePageMeta({
  auth: {
    required: true,
    role: 'admin'
  }
})
</script>