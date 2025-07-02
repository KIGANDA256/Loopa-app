<template>
  <MainLayout>
    <!-- Main content -->
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Report a Crime</h2>
        <Button 
          variant="primary" 
          size="lg"
          @click="openReportModal"
        >
          <i class="bi bi-plus-circle me-2"></i> Report New Crime
        </Button>
      </div>

      <!-- Reports table -->
      <div class="card shadow-sm">
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Region</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="report in reports" :key="report._id">
                <td>{{ report.region }}</td>
                <td>{{ report.crimeType }}</td>
                <td>{{ report.date ? new Date(report.date).toLocaleDateString() : '' }}</td>
                <td>
                  <span :class="[
                    'badge',
                    report.status === 'pending' ? 'bg-warning' : 
                    report.status === 'investigating' ? 'bg-info' : 
                    report.status === 'resolved' ? 'bg-success' : 'bg-secondary'
                  ]">
                    {{ report.status }}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" @click="openModal(report)">
                    <i class="bi bi-eye me-1"></i> View
                  </Button>
                </td>
              </tr>
              <tr v-if="reports.length === 0">
                <td colspan="5" class="text-center py-4 text-muted">
                  No reports found. Click "Report New Crime" to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Report Crime Modal -->
    <div v-if="showReportModal" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Report a Crime</h5>
            <button type="button" class="btn-close" @click="closeReportModal"></button>
          </div>
          <form @submit.prevent="submitReport">
            <div class="modal-body">
              <!-- Form content -->
              <div class="mb-3">
                <label for="police-station" class="form-label fw-bold">
                  Select region
                </label>
                <select class="form-select" id="police-station" v-model="form.region" required>
                  <option value="" disabled>Select a police station</option>
                  <option>Kampala Metropolitan East</option>
                  <option>Kampala Metropolitan North</option>
                  <option>Kampala Metropolitan South</option>
                  <option>Other..</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="crime-location" class="form-label fw-bold">
                  Detect Location
                </label>
                <div class="input-group">
                  <input
                    type="text"
                    placeholder="Tap to get my location"
                    readonly
                    class="form-control"
                    id="crime-location"
                    v-model="form.location"
                  >
                  <button 
                    class="btn btn-outline-primary" 
                    type="button"
                    @click="detectLocation"
                  >
                    <i class="bi bi-geo-alt"></i>
                  </button>
                </div>
                <small class="text-muted">Click the location button to automatically detect your coordinates</small>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="crime-type" class="form-label fw-bold">
                    Select Crime Type
                  </label>
                  <select class="form-select" id="crime-type" v-model="form.crimeType" required>
                    <option value="" disabled>Select Crime Type</option>
                    <option value="assault">Assault</option>
                    <option value="theft">Theft</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="fraud">Fraud</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="crime-date" class="form-label fw-bold">
                    Date of Incident
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="crime-date"
                    v-model="form.date"
                    required
                  >
                </div>
              </div>

              <div class="mb-3">
                <label for="crime-description" class="form-label fw-bold">
                  Description
                </label>
                <textarea
                  id="crime-description"
                  class="form-control"
                  v-model="form.description"
                  required
                  rows="3"
                  placeholder="Describe the crime here"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="evidence-upload" class="form-label fw-bold">
                  Attach Evidence
                </label>
                <input
                  type="file"
                  multiple
                  class="form-control"
                  id="evidence-upload"
                  accept=".pdf,.jpg,.jpeg,.mp4"
                  @change="handleFileUpload"
                >
                <small class="form-text text-muted">
                  Acceptable formats: videos, images, or documents
                </small>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeReportModal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Submit Report' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Report Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">View Crime Report</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Region</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ editForm.region }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Location</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ editForm.location }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Crime Type</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ editForm.crimeType }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Status</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">
                  <span :class="[
                    'badge',
                    editForm.status === 'pending' ? 'bg-warning' : 
                    editForm.status === 'investigating' ? 'bg-info' : 
                    editForm.status === 'resolved' ? 'bg-success' : 'bg-secondary'
                  ]">
                    {{ editForm.status }}
                  </span>
                </p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Description</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ editForm.description }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/components/Layouts/MainLayout.vue'
import Button from '~/components/shared components/Button.vue'
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '~/composables/useAuth'

const toast = useToast()
const { user, authFetch } = useAuth()

const form = ref({
  region: '',
  location: '',
  crimeType: '',
  description: '',
  date: new Date().toISOString().substr(0, 10),
  files: []
})

const isSubmitting = ref(false)
const reports = ref([]) 
const showModal = ref(false)
const showReportModal = ref(false)
const editForm = ref({})

// Fetch user's reports on mount
onMounted(async () => {
  try {
    if (!user.value && typeof fetchUser === 'function') {
      await fetchUser()
    }
    reports.value = await authFetch('/api/user/crime-reports')
  } catch (err) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to load your reports: ' + (err.message || 'Authentication error'), 
      life: 4000 
    })
  }
})

function openReportModal() {
  showReportModal.value = true
}

function closeReportModal() {
  showReportModal.value = false
  form.value = {
    region: '',
    location: '',
    crimeType: '',
    description: '',
    date: new Date().toISOString().substr(0, 10),
    files: []
  }
}

function openModal(report) {
  editForm.value = { ...report }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.value.location = `${position.coords.latitude}, ${position.coords.longitude}`
        toast.add({
          severity: 'info',
          summary: 'Location Detected',
          detail: 'Your location has been detected and added to the form.',
          life: 3000
        })
      },
      (err) => {
        toast.add({ severity: 'error', summary: 'Location Error', detail: err.message, life: 3000 })
      }
    )
  } else {
    toast.add({ severity: 'error', summary: 'Not Supported', detail: 'Geolocation is not supported by your browser', life: 3000 })
  }
}

function handleFileUpload(event) {
  form.value.files = Array.from(event.target.files)
  toast.add({
    severity: 'info',
    summary: 'Files Selected',
    detail: `${form.value.files.length} file(s) selected.`,
    life: 2000
  })
}

async function submitReport() {
  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('region', form.value.region)
    formData.append('location', form.value.location)
    formData.append('crimeType', form.value.crimeType)
    formData.append('date', form.value.date)
    formData.append('description', form.value.description)
    form.value.files.forEach(file => {
      formData.append('files', file)
    })

    // Use authFetch for POST
    await authFetch('/api/crime-reports', {
      method: 'POST',
      body: formData
    })

    toast.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Report submitted successfully! Our team will review it shortly.', 
      life: 4000 
    })

    closeReportModal()
    reports.value = await authFetch('/api/user/crime-reports')
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 4000 })
  } finally {
    isSubmitting.value = false
  }
}
</script>