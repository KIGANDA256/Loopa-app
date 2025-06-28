
<template>
  <MainLayout>
    <PageLayout title="Evidence Management">
      <!-- Header with action button -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Evidence Submissions</h2>
        <Button 
          variant="primary" 
          size="lg"
          @click="openSubmitModal"
        >
          <i class="bi bi-plus-circle me-2"></i> Submit New Evidence
        </Button>
      </div>

      <!-- Evidence List -->
      <div class="card shadow-sm">
        <div class="card-body p-0">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Date</th>
                <th>Police Station</th>
                <th>File Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in evidenceList" :key="item._id">
                <td>{{ formatDate(item.createdAt) }}</td>
                <td>{{ item.station }}</td>
                <td>{{ item.fileType }}</td>
                <td>
                  <span 
                    :class="[
                      'badge',
                      item.status === 'pending' ? 'bg-warning' : 
                      item.status === 'approved' ? 'bg-success' : 
                      item.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                    ]"
                  >
                    {{ item.status || 'pending' }}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" @click="viewEvidence(item)">
                    <i class="bi bi-eye me-1"></i> View
                  </Button>
                </td>
              </tr>
              <tr v-if="evidenceList.length === 0">
                <td colspan="5" class="text-center py-4 text-muted">
                  No evidence submissions found. Click "Submit New Evidence" to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading evidence submissions...</p>
      </div>
    </PageLayout>

    <!-- Submit Evidence Modal -->
    <div v-if="showSubmitModal" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submit New Evidence</h5>
            <button type="button" class="btn-close" @click="closeSubmitModal"></button>
          </div>
          <form @submit.prevent="submitEvidence">
            <div class="modal-body">
              <div class="mb-3">
                <label for="police-station" class="form-label fw-bold">
                  Select Police Station
                </label>
                <select class="form-select" id="police-station" v-model="form.station" required>
                  <option value="" disabled>Select a police station</option>
                  <option>Select nearby police station</option>
                  <option>Kyaggwe Police Station</option>
                  <option>Mukono Police Station</option>
                  <option>Seeta Police Station</option>
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

              <div class="mb-3">
                <label for="crime-type" class="form-label fw-bold">
                  Select File Type
                </label>
                <select class="form-select" id="crime-type" v-model="form.fileType" required>
                  <option value="" disabled>Select a file type</option>
                  <option value="documents/pdf">Documents (PDF)</option>
                  <option value="images/jpeg">Images (JPEG)</option>
                  <option value="videos/mp4">Videos (MP4)</option>
                  <option value="other">Other</option>
                </select>
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
              <button type="button" class="btn btn-secondary" @click="closeSubmitModal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Submitting...' : 'Submit Evidence' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Evidence Modal -->
    <div v-if="showViewModal" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">View Evidence Details</h5>
            <button type="button" class="btn-close" @click="closeViewModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Police Station</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ selectedItem.station }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Location</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ selectedItem.location }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">File Type</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">{{ selectedItem.fileType }}</p>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Status</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">
                  <span :class="[
                    'badge',
                    selectedItem.status === 'pending' ? 'bg-warning' : 
                    selectedItem.status === 'approved' ? 'bg-success' : 
                    selectedItem.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                  ]">
                    {{ selectedItem.status || 'pending' }}
                  </span>
                </p>
              </div>
            </div>
            <div v-if="selectedItem.files && selectedItem.files.length" class="mb-3 row">
              <label class="col-sm-3 col-form-label fw-bold">Files</label>
              <div class="col-sm-9">
                <ul class="list-group">
                  <li v-for="(file, index) in selectedItem.files" :key="index" class="list-group-item">
                    <a :href="file.path" target="_blank">{{ file.filename }}</a>
                    <span class="badge bg-secondary ms-2">{{ formatFileSize(file.size) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeViewModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/components/Layouts/MainLayout.vue'
import PageLayout from '~/components/Layouts/PageLayout.vue'
import Cards from '~/components/shared components/Cards.vue'
import Button from '~/components/shared components/Button.vue'
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '~/composables/useAuth'

const { authFetch } = useAuth()

// Guard toast for client-side only
let toast
if (process.client) {
  toast = useToast()
}

const { user } = useAuth()

// Form state
const form = ref({
  station: '',
  location: '',
  fileType: '',
  files: []
})

// UI state
const isSubmitting = ref(false)
const isLoading = ref(false)
const showSubmitModal = ref(false)
const showViewModal = ref(false)
const evidenceList = ref([])
const selectedItem = ref({})

// Fetch evidence list on component mount
onMounted(async () => {
  await fetchEvidenceList()
})

async function fetchEvidenceList() {
  isLoading.value = true
  try {
    // Changed endpoint from /api/evidence/user to /api/evidence/list
    const data = await authFetch('/api/evidence/user')
    console.log('Evidence data received:', data)
    evidenceList.value = data
  } catch (err) {
    console.error('Error fetching user evidence:', err)
    if (process.client && toast) {
      toast.add({ 
        severity: 'error', 
        summary: 'Error', 
        detail: err.message || 'Failed to load evidence submissions',
        life: 4000 
      })
    }
  } finally {
    isLoading.value = false
  }
}

function openSubmitModal() {
  showSubmitModal.value = true
}

function closeSubmitModal() {
  showSubmitModal.value = false
  // Reset form
  form.value = {
    station: '',
    location: '',
    fileType: '',
    files: []
  }
}

function viewEvidence(item) {
  selectedItem.value = item
  showViewModal.value = true
}

function closeViewModal() {
  showViewModal.value = false
  selectedItem.value = {}
}

function detectLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.value.location = `${position.coords.latitude}, ${position.coords.longitude}`
        if (process.client && toast) {
          toast.add({ 
            severity: 'info', 
            summary: 'Location Detected', 
            detail: 'Your location has been detected',
            life: 2000 
          })
        }
      },
      (err) => {
        if (process.client && toast) {
          toast.add({ severity: 'error', summary: 'Location Error', detail: err.message, life: 3000 })
        }
      }
    )
  } else {
    if (process.client && toast) {
      toast.add({ severity: 'error', summary: 'Not Supported', detail: 'Geolocation is not supported by your browser', life: 3000 })
    }
  }
}

function handleFileUpload(event) {
  form.value.files = Array.from(event.target.files)
}

async function submitEvidence() {
  isSubmitting.value = true
  try {
    const formData = new FormData()
    formData.append('station', form.value.station)
    formData.append('location', form.value.location)
    formData.append('fileType', form.value.fileType)
    form.value.files.forEach(file => {
      formData.append('files', file)
    })

    // Use authFetch for POST
    const response = await authFetch('/api/evidence', {
      method: 'POST',
      body: formData
    })

    if (process.client && toast) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Evidence submitted successfully!', life: 4000 })
    }

    closeSubmitModal()
    await fetchEvidenceList()
  } catch (err) {
    if (process.client && toast) {
      toast.add({ severity: 'error', summary: 'Error', detail: err.message || 'Failed to submit evidence', life: 4000 })
    }
    console.error('Error submitting evidence:', err)
  } finally {
    isSubmitting.value = false
  }
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString() // or use toLocaleDateString() for just the date
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
