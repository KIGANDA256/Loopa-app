<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <MainLayout>
    <PageLayout
      title="Admin Records"
      description="Manage and review all records in the system."
    >
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="h5 mb-0">All Records</h2>
        <Button variant="outline-secondary" size="sm" @click="fetchRecords" :disabled="loading">
          <i class="bi" :class="loading ? 'bi-arrow-repeat spin' : 'bi-arrow-repeat'"></i>
          Refresh
        </Button>
      </div>
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
        Loading records...
      </div>
      <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
      <Tables
        :headers="['Record ID', 'User', 'Type', 'Date', 'Status', 'Actions']"
        :rows="tableRows"
      >
        <template #cell-Actions="{ row }">
          <Button variant="outline-primary" size="sm" @click="reviewRecord(row)" 
                  :disabled="row.isLoading">
            <i class="bi" :class="row.isLoading ? 'bi-hourglass' : 'bi-eye'"></i>
            {{ row.isLoading ? 'Loading...' : 'Review' }}
          </Button>
          <Button variant="outline-danger" size="sm" class="ms-2" @click="deleteRecord(row)">
            <i class="bi bi-trash"></i> Delete
          </Button>
        </template>
      </Tables>

      <!-- Modal for viewing report details -->
      <div v-if="showModal" class="modal-backdrop fade show"></div>
      <div v-if="showModal" class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,0.3)">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Report Details</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <div v-if="selectedReport">
                <p><strong>Report ID:</strong> {{ selectedReport._id }}</p>
                <p><strong>User:</strong> 
                  {{ selectedReport.user?.firstName }} {{ selectedReport.user?.lastName }}
                  <span v-if="!selectedReport.user?.firstName && !selectedReport.user?.lastName">{{ selectedReport.user }}</span>
                </p>
                <p><strong>Type:</strong> {{ selectedReport.crimeType }}</p>
                <p><strong>Date:</strong> {{ selectedReport.date ? new Date(selectedReport.date).toLocaleString() : 'N/A' }}</p>
                <p><strong>Status:</strong> {{ selectedReport.status }}</p>
                <p><strong>Description:</strong> {{ selectedReport.description }}</p>
                <!-- Add more fields as needed -->
              </div>
            </div>
            <div class="modal-footer">
              <Button variant="secondary" @click="showModal = false">Close</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/components/Layouts/MainLayout.vue'
import PageLayout from '~/components/Layouts/PageLayout.vue'
import Tables from '~/components/shared components/Tables.vue'
import Button from '~/components/shared components/Button.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { authFetch } = useAuth()
const loading = ref(false)
const error = ref(null)
const tableRows = ref([])
const showModal = ref(false)
const selectedReport = ref(null)

async function fetchRecords() {
  loading.value = true
  error.value = null

  try {
    // Use authFetch for secure API calls
    const reports = await authFetch('/api/admin/crime-reports')
    tableRows.value = reports.map(report => ({
      'Report ID': report._id,
      'User': (report.user && (report.user.firstName || report.user.lastName))
        ? `${report.user.firstName ?? ''} ${report.user.lastName ?? ''}`.trim()
        : (report.user && typeof report.user === 'string')
          ? report.user
          : 'Unknown',
      'Type': report.crimeType || 'N/A',
      'Date': report.date ? new Date(report.date).toLocaleDateString() : 'N/A',
      'Status': report.status || 'N/A',
      'Record': report,
      Actions: '',
      isLoading: false
    }))
  } catch (err) {
    console.error('Error fetching records:', err)
    error.value = err.data?.message || 'Error loading reports'
  } finally {
    loading.value = false
  }
}

onMounted(fetchRecords)

function reviewRecord(row) {
  selectedReport.value = row['Record']
  showModal.value = true
}

async function deleteRecord(row) {
  if (!confirm(`Delete Report: ${row['Report ID']}?`)) {
    return
  }
  loading.value = true
  try {
    // Use authFetch for DELETE as well
    await authFetch(`/api/admin/crime-reports/${row['Report ID']}`, {
      method: 'DELETE'
    })
    tableRows.value = tableRows.value.filter(r => r['Report ID'] !== row['Report ID'])
    alert('Record deleted successfully')
  } catch (err) {
    error.value = err.data?.message || 'Failed to delete record'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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