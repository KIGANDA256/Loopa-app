<template>
  <MainLayout>
    <PageLayout title="Records" description="Here you can find all your submitted crime reports.">
      <Tables
        :headers="['Report ID', 'Crime Type', 'Date', 'Status', 'Actions']"
        :rows="tableRows"
      >
        <template #cell-Actions="{ row }">
          <Button variant="outline-primary" size="sm">View</Button>
        </template>
      </Tables>
      <div v-if="tableRows.length === 0" class="text-center text-muted mt-4">
        No records found.
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
import { useToast } from 'primevue/usetoast'

let toast
if (process.client) {
  toast = useToast()
}
const tableRows = ref([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await fetch('/api/user/crime-reports', {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
    if (!response.ok) throw new Error('Failed to fetch records')
    const data = await response.json()
    tableRows.value = data.map(report => ({
      'Report ID': report.reportId || report._id,
      'Crime Type': report.crimeType,
      'Date': new Date(report.date).toLocaleDateString(),
      'Status': report.status,
      Actions: ''
    }))
  } catch (err) {
    if (process.client && toast) {
      toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 4000 })
    }
  }
})
</script>