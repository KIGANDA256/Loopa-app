<!-- filepath: /Users/macbookair/Desktop/Loopa-app/pages/admin/Records/_id.vue -->
<template>
  <MainLayout>
    <PageLayout
      title="Review Record"
      description="Review and update record details"
    >
      <div class="mb-4">
        <Button variant="outline-secondary" @click="router.back()">
          <i class="bi bi-arrow-left me-2"></i> Back to Records
        </Button>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading record details...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else-if="report">
        <!-- Record Overview Card -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <h3 class="h5 mb-0">Record #{{ $route.params.id }}</h3>
            <span :class="['badge', statusClass]">{{ report.status }}</span>
          </div>
          <div class="card-body">
            <div class="row g-4">
              <div class="col-md-6">
                <h4 class="h6 text-muted mb-3">Basic Information</h4>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Crime Type:</span>
                    <span class="fw-medium">{{ report.crimeType }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Submitted By:</span>
                    <span class="fw-medium">{{ report.user?.firstName }} {{ report.user?.lastName }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Date Submitted:</span>
                    <span class="fw-medium">{{ formatDate(report.date) }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Location:</span>
                    <span class="fw-medium">{{ report.location || 'Not specified' }}</span>
                  </li>
                </ul>
              </div>
              
              <div class="col-md-6">
                <h4 class="h6 text-muted mb-3">Additional Details</h4>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Evidence Count:</span>
                    <span class="fw-medium">{{ report.evidenceCount || 0 }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Witnesses:</span>
                    <span class="fw-medium">{{ report.witnesses?.length || 0 }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Priority:</span>
                    <span class="fw-medium">{{ report.priority || 'Normal' }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between px-0">
                    <span class="text-muted">Last Updated:</span>
                    <span class="fw-medium">{{ formatDate(report.updatedAt) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Description Card -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-light">
            <h3 class="h5 mb-0">Description</h3>
          </div>
          <div class="card-body">
            <p class="mb-0">{{ report.description || 'No description provided.' }}</p>
          </div>
        </div>

        <!-- Review Section -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-light">
            <h3 class="h5 mb-0">Review Actions</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateStatus">
              <div class="mb-3">
                <label for="status" class="form-label">Update Status</label>
                <select v-model="selectedStatus" id="status" class="form-select">
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div class="mb-3">
                <label for="adminNotes" class="form-label">Admin Notes</label>
                <textarea v-model="adminNotes" id="adminNotes" class="form-control" rows="4" 
                  placeholder="Add private notes about this record..."></textarea>
              </div>
              
              <div class="d-flex justify-content-end gap-2">
                <Button variant="success" type="submit" :disabled="isUpdating">
                  <i class="bi bi-check-circle me-1"></i> Update Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-5">
        <div class="text-muted">No record found with ID: {{ $route.params.id }}</div>
      </div>
    </PageLayout>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import MainLayout from '~/components/Layouts/MainLayout.vue'
import PageLayout from '~/components/Layouts/PageLayout.vue'
import Button from '~/components/shared components/Button.vue'

const { authFetch } = useAuth()
const router = useRouter()
const route = useRoute()
const recordId = route.params.id

const report = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedStatus = ref('')
const adminNotes = ref('')
const isUpdating = ref(false)

const statusClass = computed(() => {
  switch (report.value?.status) {
    case 'pending': return 'bg-secondary'
    case 'in_review': return 'bg-warning text-dark'
    case 'investigating': return 'bg-info text-dark'
    case 'resolved': return 'bg-success'
    case 'closed': return 'bg-dark'
    case 'rejected': return 'bg-danger'
    default: return 'bg-light text-dark'
  }
})

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

async function updateStatus() {
  if (!selectedStatus.value) return
  
  isUpdating.value = true
  try {
    // Call your API to update the record status
    await $fetch(`/api/admin/crime-reports/${recordId}`, {
      method: 'PATCH',
      body: {
        status: selectedStatus.value,
        adminNotes: adminNotes.value
      }
    })
    
    // Update local record data
    report.value.status = selectedStatus.value
    
    // Show success message
    alert('Record status updated successfully')
  } catch (err) {
    error.value = err.data?.message || 'Failed to update record status'
  } finally {
    isUpdating.value = false
  }
}

onMounted(async () => {
  loading.value = true
  try {
    report.value = await authFetch(`/api/admin/crime-reports/${route.params.id}`)
    selectedStatus.value = report.value.status || 'pending'
    adminNotes.value = report.value.adminNotes || ''
  } catch (err) {
    console.error('Error loading record:', err)
    error.value = err.data?.message || 'Error loading record details'
  } finally {
    loading.value = false
  }
})
</script>