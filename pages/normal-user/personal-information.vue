<template>
  <MainLayout>
    <PageLayout title="Personal Information">
      <Cards customClass="mx-auto" style="max-width: 700px;">
        <template #default>
          <div class="bg-white rounded shadow-sm p-4">
            <div class="row g-4">
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted mb-1">First Name</label>
                <div class="profile-value">{{ form.firstName || '-' }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted mb-1">Last Name</label>
                <div class="profile-value">{{ form.lastName || '-' }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted mb-1">Email Address</label>
                <div class="profile-value">{{ form.email || '-' }}</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label text-muted mb-1">Country</label>
                <div class="profile-value">{{ form.country || '-' }}</div>
              </div>
              <div class="col-md-12 mb-3">
                <label class="form-label text-muted mb-1">Street Address</label>
                <div class="profile-value">{{ form.street || '-' }}</div>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label text-muted mb-1">City</label>
                <div class="profile-value">{{ form.city || '-' }}</div>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label text-muted mb-1">State / Province</label>
                <div class="profile-value">{{ form.region || '-' }}</div>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label text-muted mb-1">ZIP / Postal Code</label>
                <div class="profile-value">{{ form.postal || '-' }}</div>
              </div>
            </div>
          </div>
        </template>
      </Cards>
    </PageLayout>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~/components/Layouts/MainLayout.vue'
import PageLayout from '~/components/Layouts/PageLayout.vue'
import Cards from '~/components/shared components/Cards.vue'
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useAuth } from '~/composables/useAuth'

const { authFetch } = useAuth()
const toast = useToast()
const isLoading = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  street: '',
  city: '',
  region: '',
  postal: ''
})

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await authFetch('/api/user/personal-info')
    Object.assign(form.value, data)
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: err.message || 'Failed to fetch user info', life: 4000 })
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.profile-value {
  font-size: 1.08rem;
  font-weight: 500;
  color: #22223b;
  background: #f8fafc;
  border-radius: 6px;
  padding: 0.65rem 1rem;
  min-height: 44px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  border: 1px solid #e9ecef;
}
.form-label {
  font-size: 0.97rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.bg-white {
  background: #fff !important;
}
</style>


