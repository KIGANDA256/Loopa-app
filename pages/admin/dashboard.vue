<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <MainLayout>
    <div class="container-fluid py-4">
      <Cards customClass="mx-auto" style="max-width: 1100px;">
        <template #default>
          <!-- Dashboard Title -->
          <h1 class="fw-bold mb-4">Admin Dashboard</h1>

          <!-- Dashboard Widgets -->
          <div class="row g-3 mb-4">
            <div class="col-md-3 col-6">
              <div class="widget-card bg-primary text-white text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.totalReports }}</div>
                <div class="small">Total Reports</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="widget-card bg-warning text-dark text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.pendingReports }}</div>
                <div class="small">Pending Review</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="widget-card bg-success text-white text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.totalUsers }}</div>
                <div class="small">Registered Users</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="widget-card bg-info text-white text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.evidenceSubmitted }}</div>
                <div class="small">Evidence Items</div>
              </div>
            </div>
          </div>

          <!-- Admin Actions Card -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 fw-bold mb-0">Admin Actions</h2>
            </div>
            <div class="row g-3">
              <div class="col-md-3 col-6">
                <NuxtLink to="/admin/users" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-people-fill text-primary fs-2 mb-2"></i>
                    <span class="fw-medium">Manage Users</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/admin/Evidence" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-folder-symlink text-warning fs-2 mb-2"></i>
                    <span class="fw-medium">Review Evidence</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/admin/CrimeReport" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-clipboard-data text-danger fs-2 mb-2"></i>
                    <span class="fw-medium">Crime Reports</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/admin/CrimeInformation" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-gear-fill text-secondary fs-2 mb-2"></i>
                    <span class="fw-medium">Settings</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Recent Reports -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 fw-bold mb-0">Recent Reports</h2>
              <NuxtLink to="/admin/CrimeReport" class="btn btn-sm btn-outline-primary">View All</NuxtLink>
            </div>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Report ID</th>
                    <th>User</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="6" class="text-center py-3">
                      <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      Loading reports...
                    </td>
                  </tr>
                  <tr v-else v-for="report in recentReports" :key="report.reportId">
                    <td>{{ report.reportId?.substring(0, 8) }}</td>
                    <td>{{ report.userName || 'Unknown' }}</td>
                    <td>{{ report.crimeType }}</td>
                    <td>{{ new Date(report.date).toLocaleDateString() }}</td>
                    <td>
                      <span :class="['badge', statusClass(report.status)]">{{ report.status }}</span>
                    </td>
                    <td>
                      <NuxtLink :to="`/admin/CrimeReport/${report.reportId}`">
                        <Button variant="outline-primary" size="sm">View</Button>
                      </NuxtLink>
                    </td>
                  </tr>
                  <tr v-if="!isLoading && recentReports.length === 0">
                    <td colspan="6" class="text-center text-muted">No recent reports found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- System Overview -->
          <div class="row g-3">
            <div class="col-md-6">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-header bg-light">
                  <h3 class="h5 fw-bold mb-0">User Activity</h3>
                </div>
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div style="width: 70%;">
                      <h6 class="mb-2">New User Registrations</h6>
                      <div class="progress" style="height: 8px;">
                        <div class="progress-bar bg-primary" role="progressbar" :style="`width: ${calculatePercentage(stats.newUsers, stats.totalUsers)}%`"></div>
                      </div>
                    </div>
                    <div class="ms-auto text-end">
                      <div class="h4 mb-0">{{ stats.newUsers || 0 }}</div>
                      <small class="text-muted">Last 7 days</small>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <div style="width: 70%;">
                      <h6 class="mb-2">Reports Submitted</h6>
                      <div class="progress" style="height: 8px;">
                        <div class="progress-bar bg-success" role="progressbar" :style="`width: ${calculatePercentage(stats.weeklyReports, stats.totalReports)}%`"></div>
                      </div>
                    </div>
                    <div class="ms-auto text-end">
                      <div class="h4 mb-0">{{ stats.weeklyReports || 0 }}</div>
                      <small class="text-muted">Last 7 days</small>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div style="width: 70%;">
                      <h6 class="mb-2">Evidence Uploads</h6>
                      <div class="progress" style="height: 8px;">
                        <div class="progress-bar bg-info" role="progressbar" :style="`width: ${calculatePercentage(stats.weeklyEvidence, stats.evidenceSubmitted)}%`"></div>
                      </div>
                    </div>
                    <div class="ms-auto text-end">
                      <div class="h4 mb-0">{{ stats.weeklyEvidence || 0 }}</div>
                      <small class="text-muted">Last 7 days</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="card h-100 border-0 shadow-sm">
                <div class="card-header bg-light">
                  <h3 class="h5 fw-bold mb-0">System Status</h3>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <div class="d-flex justify-content-between mb-1">
                      <span class="fw-medium">Storage Usage</span>
                      <span>{{ stats.storagePercentage || '45' }}%</span>
                    </div>
                    <div class="progress" style="height: 8px;">
                      <div class="progress-bar bg-primary" role="progressbar" 
                           :style="`width: ${stats.storagePercentage || 45}%`"></div>
                    </div>
                    <small class="text-muted">{{ stats.storageUsed || '4.5' }}GB of 10GB</small>
                  </div>
                  
                  <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="fw-medium">System Health</span>
                      <span class="badge bg-success">Operational</span>
                    </div>
                    <small class="text-muted">All services running normally</small>
                  </div>
                  
                  <div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <span class="fw-medium">Latest Backup</span>
                      <span>{{ stats.lastBackupTime || '2h ago' }}</span>
                    </div>
                    <div class="d-grid">
                      <button class="btn btn-outline-primary btn-sm">Run Manual Backup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Cards>
    </div>
  </MainLayout>
</template>

<script setup>
import Cards from '~/components/shared components/Cards.vue'
import Button from '~/components/shared components/Button.vue'
import MainLayout from '~/components/Layouts/MainLayout.vue'
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

// Data refs
const recentReports = ref([])
const userActivity = ref([])
const isLoading = ref(true)
const error = ref(null)
const stats = ref({
  totalReports: 0,
  pendingReports: 0,
  totalUsers: 0,
  evidenceSubmitted: 0,
  newUsers: 0,
  weeklyReports: 0,
  weeklyEvidence: 0,
  storagePercentage: 45,
  storageUsed: '4.5',
  lastBackupTime: '2h ago'
})

// Get date from 7 days ago for filtering
const sevenDaysAgo = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() - 7)
  return date
})

function statusClass(status) {
  switch (status) {
    case 'pending': return 'bg-secondary'
    case 'in_review': return 'bg-warning text-dark'
    case 'investigating': return 'bg-info text-dark'
    case 'resolved': return 'bg-success'
    case 'closed': return 'bg-dark'
    default: return 'bg-light text-dark'
  }
}

// Calculate percentage for progress bars
function calculatePercentage(value, max) {
  if (!max) return 0
  const percentage = (value / max) * 100
  return Math.min(Math.round(percentage), 100) // Cap at 100%
}

const { authFetch } = useAuth()

onMounted(async () => {
  try {
    // Fetch reports for stats using authFetch
    const reports = await authFetch('/api/admin/crime-reports')
    stats.value.totalReports = reports.length
    stats.value.pendingReports = reports.filter(r => r.status === 'pending').length
    stats.value.weeklyReports = reports.filter(r => new Date(r.createdAt) >= sevenDaysAgo.value).length
    recentReports.value = reports.slice(0, 5)

    // Fetch users
    const users = await authFetch('/api/admin/users')
    stats.value.totalUsers = users.length
    stats.value.newUsers = users.filter(user => new Date(user.createdAt) >= sevenDaysAgo.value).length
    // Attach user names to recent reports
    recentReports.value.forEach(report => {
      const user = users.find(u => u._id === report.userId)
      report.userName = user ? `${user.firstName} ${user.lastName}` : 'Unknown'
    })

    // Fetch evidence
    const evidence = await authFetch('/api/admin/evidence')
    stats.value.evidenceSubmitted = evidence.length
    stats.value.weeklyEvidence = evidence.filter(item =>
      new Date(item.uploadedAt || item.createdAt) >= sevenDaysAgo.value
    ).length

    // Fetch user activity (optional)
    try {
      userActivity.value = await authFetch('/api/admin/user-activity')
    } catch (err) {
      userActivity.value = []
      console.warn('User activity fetch failed:', err)
    }

    // Calculate storage usage
    const averageFileSize = 0.5 // MB per evidence item
    const estimatedStorageUsed = (stats.value.evidenceSubmitted * averageFileSize) / 1000 // GB
    stats.value.storageUsed = estimatedStorageUsed.toFixed(1)
    stats.value.storagePercentage = Math.min(Math.round((estimatedStorageUsed / 10) * 100), 100)
  } catch (err) {
    error.value = err.data?.message || err.message || 'Failed to load dashboard data'
    console.error('Dashboard error:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.widget-card {
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
definePageMeta({
  auth: {
    required: true,
    role: 'admin'
  }
})
</script>