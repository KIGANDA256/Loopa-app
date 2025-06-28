<!-- eslint-disable vue/no-multiple-template-root -->
<!-- eslint-disable vue/attributes-order -->

<template>
  <MainLayout>
    <PageLayout
      title="Evidence Management"
      description="View and manage user evidence submissions"
    >
      <!-- Search and Filter Controls -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row align-items-end">
            <div class="col-md-4 mb-3">
              <label class="form-label">Search</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search evidence..."
                  v-model="filters.search"
                  @input="applyFilters"
                >
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">File Type</label>
              <select class="form-select" v-model="filters.fileType" @change="applyFilters">
                <option value="">All Types</option>
                <option value="documents/pdf">Documents</option>
                <option value="images/jpeg">Images</option>
                <option value="videos/mp4">Videos</option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Police Station</label>
              <select class="form-select" v-model="filters.station" @change="applyFilters">
                <option value="">All Stations</option>
                <option v-for="station in uniqueStations" :key="station" :value="station">
                  {{ station }}
                </option>
              </select>
            </div>
            <div class="col-md-2 mb-3">
              <Button variant="outline-secondary" block @click="resetFilters">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table with Evidence Data -->
      <div class="card">
        <div class="card-header bg-light">
          <h5 class="mb-0">Evidence Submissions</h5>
        </div>
        <div class="card-body p-0">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading evidence data...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="alert alert-danger m-3">
            {{ error }}
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredEvidence.length === 0" class="text-center py-5">
            <i class="bi bi-folder text-muted" style="font-size: 3rem;"></i>
            <p class="mt-2">No evidence found matching your filters</p>
          </div>

          <!-- Data Table -->
          <table v-else class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th @click="sortBy('createdAt')" style="cursor: pointer" class="user-select-none">
                  Date
                  <i v-if="sortConfig.key === 'createdAt'" 
                     :class="sortConfig.direction === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'">
                  </i>
                </th>
                <th @click="sortBy('userId')" style="cursor: pointer" class="user-select-none">
                  User
                  <i v-if="sortConfig.key === 'userId'" 
                     :class="sortConfig.direction === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'">
                  </i>
                </th>
                <th @click="sortBy('station')" style="cursor: pointer" class="user-select-none">
                  Police Station
                  <i v-if="sortConfig.key === 'station'" 
                     :class="sortConfig.direction === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'">
                  </i>
                </th>
                <th @click="sortBy('fileType')" style="cursor: pointer" class="user-select-none">
                  Type
                  <i v-if="sortConfig.key === 'fileType'" 
                     :class="sortConfig.direction === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'">
                  </i>
                </th>
                <th>Files</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedEvidence" :key="item._id">
                <td>{{ formatDate(item.createdAt) }}</td>
                <td>{{ getUserName(item.userId) }}</td>
                <td>{{ item.station }}</td>
                <td>
                  <span 
                    class="badge rounded-pill"
                    :class="{
                      'bg-danger': item.fileType?.includes('pdf'),
                      'bg-success': item.fileType?.includes('image'),
                      'bg-primary': item.fileType?.includes('video'),
                      'bg-secondary': !item.fileType
                    }"
                  >
                    {{ formatFileType(item.fileType) }}
                  </span>
                </td>
                <td>
                  <span class="badge bg-secondary">{{ item.files?.length || 0 }}</span>
                </td>
                <td>
                  <span 
                    class="badge"
                    :class="{
                      'bg-warning': item.status === 'pending',
                      'bg-success': item.status === 'approved',
                      'bg-danger': item.status === 'rejected',
                      'bg-secondary': !item.status
                    }"
                  >
                    {{ item.status || 'pending' }}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" @click="viewEvidence(item)">
                    <i class="bi bi-eye"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="card-footer d-flex justify-content-center">
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">
                  <i class="bi bi-chevron-left"></i>
                </a>
              </li>
              <li v-for="page in paginationRange" :key="page" 
                  class="page-item" :class="{ active: currentPage === page }">
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">
                  <i class="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- View Evidence Modal -->
      <div v-if="showViewModal" class="modal fade show d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Evidence Details</h5>
              <button type="button" class="btn-close" @click="closeViewModal"></button>
            </div>
            <div class="modal-body">
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">Date Submitted:</div>
                <div class="col-md-9">{{ formatDate(selectedItem.createdAt, true) }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">User:</div>
                <div class="col-md-9">{{ getUserName(selectedItem.userId) }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">Police Station:</div>
                <div class="col-md-9">{{ selectedItem.station }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">Location:</div>
                <div class="col-md-9">{{ selectedItem.location }}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">Files:</div>
                <div class="col-md-9">
                  <div v-if="selectedItem.files?.length">
                    <div v-for="(file, index) in selectedItem.files" :key="index"
                         class="d-flex justify-content-between align-items-center border p-2 mb-2">
                      <div>
                        <i :class="getFileIcon(file.mimetype)" class="me-2"></i>
                        {{ file.filename }}
                      </div>
                      <a :href="file.path" target="_blank" class="btn btn-sm btn-primary">
                        <i class="bi bi-download"></i>
                      </a>
                    </div>
                  </div>
                  <div v-else class="text-muted">No files attached</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 fw-bold">Status:</div>
                <div class="col-md-9">
                  <span 
                    class="badge"
                    :class="{
                      'bg-warning': selectedItem.status === 'pending',
                      'bg-success': selectedItem.status === 'approved',
                      'bg-danger': selectedItem.status === 'rejected',
                      'bg-secondary': !selectedItem.status
                    }"
                  >
                    {{ selectedItem.status || 'pending' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeViewModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MainLayout from '~/components/Layouts/MainLayout.vue'
import PageLayout from '~/components/Layouts/PageLayout.vue'
import Button from '~/components/shared components/Button.vue'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '~/composables/useAuth'

// Guard toast for client-side only
let toast
if (process.client) {
  toast = useToast()
}

// Data states
const evidenceData = ref([])
const isLoading = ref(false)
const error = ref(null)
const selectedItem = ref({})

// UI states
const showViewModal = ref(false)

// Sorting
const sortConfig = ref({
  key: 'createdAt',
  direction: 'desc'
})

// Filtering
const filters = ref({
  search: '',
  fileType: '',
  station: ''
})

// Pagination
const itemsPerPage = 10
const currentPage = ref(1)

// Auth fetch
const { authFetch } = useAuth()

// Load data on component mount
onMounted(async () => {
  await fetchEvidenceData()
})

async function fetchEvidenceData() {
  isLoading.value = true
  error.value = null

  try {
    // Use authFetch instead of fetch and manual token handling
    const data = await authFetch('/api/admin/evidence')
    console.log('Evidence data:', data)
    evidenceData.value = data
  } catch (err) {
    console.error('Failed to fetch evidence data:', err)
    error.value = `Failed to load evidence data: ${err.message}`

    if (process.client && toast) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Failed to load evidence data: ${err.message}`,
        life: 5000
      })
    }
  } finally {
    isLoading.value = false
  }
}

// Sort function
function sortBy(key) {
  // If already sorting by this key, toggle direction
  if (sortConfig.value.key === key) {
    sortConfig.value.direction = sortConfig.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    // Otherwise, set new sort key with default direction
    sortConfig.value.key = key
    sortConfig.value.direction = 'asc'
  }
}

// Filter function
function applyFilters() {
  currentPage.value = 1 // Reset to first page when filters change
}

function resetFilters() {
  filters.value = {
    search: '',
    fileType: '',
    station: ''
  }
  currentPage.value = 1
}

// View evidence details
function viewEvidence(item) {
  selectedItem.value = item
  showViewModal.value = true
}

function closeViewModal() {
  showViewModal.value = false
}

// Computed properties
const filteredEvidence = computed(() => {
  let result = [...evidenceData.value]
  
  // Text search
  if (filters.value.search) {
    const searchLower = filters.value.search.toLowerCase()
    result = result.filter(item => 
      (item.station && item.station.toLowerCase().includes(searchLower)) ||
      (item.location && item.location.toLowerCase().includes(searchLower)) ||
      (item.userId && item.userId.toString().includes(searchLower))
    )
  }
  
  // File type filter
  if (filters.value.fileType) {
    result = result.filter(item => item.fileType === filters.value.fileType)
  }
  
  // Station filter
  if (filters.value.station) {
    result = result.filter(item => item.station === filters.value.station)
  }
  
  // Apply sorting
  result.sort((a, b) => {
    let valueA = a[sortConfig.value.key]
    let valueB = b[sortConfig.value.key]
    
    // Handle dates
    if (sortConfig.value.key === 'createdAt') {
      valueA = new Date(valueA || 0).getTime()
      valueB = new Date(valueB || 0).getTime()
    }
    
    // Handle null values
    if (valueA === undefined || valueA === null) valueA = ''
    if (valueB === undefined || valueB === null) valueB = ''
    
    // Compare values
    const comparison = typeof valueA === 'string' 
      ? valueA.localeCompare(valueB) 
      : valueA - valueB
    
    return sortConfig.value.direction === 'asc' ? comparison : -comparison
  })
  
  return result
})

// Unique stations for filter dropdown
const uniqueStations = computed(() => {
  const stations = new Set()
  evidenceData.value.forEach(item => {
    if (item.station) stations.add(item.station)
  })
  return Array.from(stations)
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredEvidence.value.length / itemsPerPage))

const paginatedEvidence = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredEvidence.value.slice(startIndex, startIndex + itemsPerPage)
})

const paginationRange = computed(() => {
  const range = []
  const maxPages = 5 // Show at most 5 page numbers
  
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start + 1 < maxPages) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  
  return range
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Utility functions
function formatDate(dateString, includeTime = false) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (includeTime) {
    return date.toLocaleString()
  }
  return date.toLocaleDateString()
}

function formatFileType(type) {
  if (!type) return 'Unknown'
  if (type.includes('pdf')) return 'PDF'
  if (type.includes('image') || type.includes('jpeg')) return 'Image'
  if (type.includes('video') || type.includes('mp4')) return 'Video'
  return type.split('/').pop().toUpperCase()
}

function getUserName(user) {
  if (!user) return 'Unknown'
  if (typeof user === 'object') {
    // If populated, show full name or email
    return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email || 'Unknown'
  }
  // fallback for string IDs
  return user
}

function getFileIcon(mimetype) {
  if (!mimetype) return 'bi bi-file'
  if (mimetype.includes('pdf')) return 'bi bi-file-earmark-pdf text-danger'
  if (mimetype.includes('image')) return 'bi bi-file-earmark-image text-success'
  if (mimetype.includes('video')) return 'bi bi-file-earmark-play text-primary'
  return 'bi bi-file-earmark text-secondary'
}
</script>

<script>
definePageMeta({
  auth: {
    required: true,
    role: 'admin'
  }
})
</script>
