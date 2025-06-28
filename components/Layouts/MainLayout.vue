<template>
  <!-- Toast notifications -->
  <Toast />

  <!-- Header -->
  <Header />

  <div class="layout-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <Menu :role="user?.role || 'User'" />
    </aside>

    <main class="main-content">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="layout-footer">
      <Footer />
    </footer>
  </div>
</template>

<script setup>
import Header from '~/components/Layouts/nav/Header.vue'
import Menu from '~/components/SideBar/Menu.vue'
import Footer from '~/components/Layouts/nav/Footer.vue'
import { useAuth } from '~/composables/useAuth'
import Toast from 'primevue/toast'

const { user } = useAuth()
</script>

<style scoped>
.nav-link.active, .nav-link.router-link-exact-active {
  background: rgba(13,110,253,0.08) !important;
  font-weight: 600;
}

/* Fixed layout structure */
.layout-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas: 
    "sidebar main"
    "footer footer";
  height: calc(100vh - 56px); 
  overflow: hidden; /* Prevent container from scrolling */
}

.sidebar {
  grid-area: sidebar;
  overflow-y: auto; 
  border-right: 1px solid rgba(0,0,0,0.1);
}

.main-content {
  grid-area: main;
  overflow-y: auto; 
  background: #f8fafc;
  padding: 1rem;
}

.layout-footer {
  grid-area: footer;
  width: 100%;
}
</style>