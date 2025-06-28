<template>
  <MainLayout>
    <div class="container-fluid py-4">
      <Cards customClass="mx-auto" style="max-width: 1100px;">
        <template #default>
          <h1 class="fw-bold mb-4">My Dashboard</h1>

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
                <div class="small">Pending</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="widget-card bg-success text-white text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.resolvedReports }}</div>
                <div class="small">Resolved</div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="widget-card bg-info text-white text-center p-3 rounded shadow-sm">
                <div class="fs-2 fw-bold">{{ stats.evidenceSubmitted }}</div>
                <div class="small">Evidence Submitted</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions Card -->
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 fw-bold mb-0">Quick Actions</h2>
            </div>
            <div class="row g-3">
              <div class="col-md-3 col-6">
                <NuxtLink to="/normal-user/reportCrime" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-flag-fill text-danger fs-2 mb-2"></i>
                    <span class="fw-medium">Report Crime</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/normal-user/evidence" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-folder-symlink text-primary fs-2 mb-2"></i>
                    <span class="fw-medium">Submit Evidence</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/normal-user/records" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-archive text-warning fs-2 mb-2"></i>
                    <span class="fw-medium">My Records</span>
                  </div>
                </NuxtLink>
              </div>
              <div class="col-md-3 col-6">
                <NuxtLink to="/normal-user/personal-information" class="text-decoration-none">
                  <div class="d-flex flex-column align-items-center p-3 bg-light rounded text-center h-100">
                    <i class="bi bi-person-vcard text-secondary fs-2 mb-2"></i>
                    <span class="fw-medium">My Profile</span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 fw-bold mb-0">Recent Reports</h2>
              <NuxtLink to="/normal-user/records" class="btn btn-sm btn-outline-primary">View All</NuxtLink>
            </div>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Report ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="report in recentReports" :key="report.reportId">
                    <td>{{ report.reportId }}</td>
                    <td>{{ report.crimeType }}</td>
                    <td>{{ new Date(report.date).toLocaleDateString() }}</td>
                    <td>
                      <span :class="['badge', statusClass(report.status)]">{{ report.status }}</span>
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm">View Details</Button>
                    </td>
                  </tr>
                  <tr v-if="recentReports.length === 0">
                    <td colspan="5" class="text-center text-muted">No recent reports found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Safety Tips & Resources -->
          <div>
            <h2 class="h5 fw-bold mb-3">Safety Tips & Resources</h2>
            <div class="row g-3">
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h3 class="h6 fw-bold"><i class="bi bi-shield-check text-success me-2"></i>Personal Safety</h3>
                    <p class="small text-muted mb-0">Tips for staying safe at home and in public areas.</p>
                  </div>
                  <div class="card-footer bg-transparent border-0">
                    <Button variant="link" class="p-0">Learn more</Button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h3 class="h6 fw-bold"><i class="bi bi-telephone-fill text-danger me-2"></i>Emergency Contacts</h3>
                    <p class="small text-muted mb-0">Important phone numbers and contact information.</p>
                  </div>
                  <div class="card-footer bg-transparent border-0">
                    <Button variant="link" class="p-0">View contacts</Button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm">
                  <div class="card-body">
                    <h3 class="h6 fw-bold"><i class="bi bi-question-circle text-primary me-2"></i>FAQ</h3>
                    <p class="small text-muted mb-0">Answers to common questions about reporting and evidence.</p>
                  </div>
                  <div class="card-footer bg-transparent border-0">
                    <Button variant="link" class="p-0">Read FAQ</Button>
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
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { authFetch } = useAuth()

const recentReports = ref([])
const stats = ref({
  totalReports: 0,
  pendingReports: 0,
  resolvedReports: 0,
  evidenceSubmitted: 0
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

onMounted(async () => {
  try {
    // Fetch reports for stats using authFetch
    const reports = await authFetch('/api/user/crime-reports')
    stats.value.totalReports = reports.length
    stats.value.pendingReports = reports.filter(r => r.status === 'pending').length
    stats.value.resolvedReports = reports.filter(r => r.status === 'resolved').length
    recentReports.value = reports.slice(0, 5)

    // Fetch evidence from the working endpoint only
    const evidenceUser = await authFetch('/api/evidence/user')
    stats.value.evidenceSubmitted = evidenceUser.length
  } catch (err) {
    console.error('Dashboard fetch error:', err)
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
    role: 'normal-user'
  }
})
</script>