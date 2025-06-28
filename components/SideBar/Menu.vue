<template>
  <div class="sidebar-menu d-flex flex-column flex-shrink-0 p-3 bg-white text-dark border-end" 
       :class="{'collapsed': isCollapsed}"
       :style="isCollapsed ? 'width: 60px' : 'width: 240px'">
    <!-- Title is removed as requested -->
    <ul class="nav nav-pills flex-column mb-auto">
      <!-- Show Dashboard only for normal users -->
      <template v-if="role !== 'Super Admin' && role !== 'Admin'">
        <li class="nav-item mb-2">
          <NuxtLink to="/homeDashboard" class="nav-link custom-link" active-class="active">
            <i class="bi bi-speedometer2 me-2" />
            <span v-if="!isCollapsed">Dashboard</span>
          </NuxtLink>
        </li>
      </template>
      <!-- Admin/Super Admin links -->
      <template v-if="role === 'Super Admin' || role === 'Admin'">
        <li class="nav-item mb-2">
          <NuxtLink to="/admin/dashboard" class="nav-link custom-link" active-class="active">
            <i class="bi bi-bar-chart-steps me-2" />
            <span v-if="!isCollapsed">Admin Dashboard</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/admin/users" class="nav-link custom-link" active-class="active">
            <i class="bi bi-person-gear me-2" />
            <span v-if="!isCollapsed">Manage Users</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/admin/Records" class="nav-link custom-link" active-class="active">
            <i class="bi bi-archive me-2" />
            <span v-if="!isCollapsed">Records</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/admin/Evidence" class="nav-link custom-link" active-class="active">
            <i class="bi bi-folder-symlink me-2" />
            <span v-if="!isCollapsed">Evidence</span>
          </NuxtLink>
        </li>
      </template>
      <!-- Normal user links -->
      <template v-else>
        <li class="nav-item mb-2">
          <NuxtLink to="/normal-user/reportCrime" class="nav-link custom-link" active-class="active">
            <i class="bi bi-flag-fill me-2" />
            <span v-if="!isCollapsed">Report Crime</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/normal-user/records" class="nav-link custom-link" active-class="active">
            <i class="bi bi-archive me-2" />
            <span v-if="!isCollapsed">Records</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/normal-user/evidence" class="nav-link custom-link" active-class="active">
            <i class="bi bi-folder-symlink me-2" />
            <span v-if="!isCollapsed">Evidence</span>
          </NuxtLink>
        </li>
        <li class="nav-item mb-2">
          <NuxtLink to="/normal-user/personal-information" class="nav-link custom-link" active-class="active">
            <i class="bi bi-person-vcard me-2" />
            <span v-if="!isCollapsed">Personal Information</span>
          </NuxtLink>
        </li>
      </template>
    </ul>
    <hr>
    <div v-if="!isCollapsed" class="text-center">
      <small class="text-muted">&copy; 2025 Loopa-App</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  role: { type: String, default: 'User' },
  isCollapsed: { type: Boolean, default: false }
})
</script>

<style scoped>
.sidebar-menu {
  transition: width 0.3s ease;
  min-height: calc(100vh - 56px);
  overflow-x: hidden;
}

.sidebar-menu.collapsed .nav-link {
  justify-content: center;
  padding: 0.5rem;
}

.sidebar-menu.collapsed .bi {
  margin-right: 0 !important;
  font-size: 1.25rem;
}

.custom-link {
  color: #212529 !important;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-link:hover {
  background: rgba(13, 110, 253, 0.08) !important;
  color: #0a58ca !important;
}

.custom-link.active {
  background: rgba(13, 110, 253, 0.15) !important;
  color: #0a58ca !important;
  font-weight: 600;
}
</style>