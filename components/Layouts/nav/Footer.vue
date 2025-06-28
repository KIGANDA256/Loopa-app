<template>
  <footer class="footer bg-light py-3">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <!-- Logo and Copyright -->
        <div class="d-flex align-items-center mb-2 mb-md-0">
          <div class="logo-placeholder bg-primary rounded me-2" style="width: 20px; height: 20px;"></div>
          <span class="text-muted small">
            &copy; {{ new Date().getFullYear() }} Loopa App
          </span>
        </div>
        
        <!-- Essential Links -->
        <div class="small">
          <NuxtLink to="/terms" class="text-decoration-none text-secondary me-3">Terms</NuxtLink>
          <NuxtLink to="/privacy" class="text-decoration-none text-secondary me-3">Privacy</NuxtLink>
          <a href="mailto:info@loopa.com" class="text-decoration-none text-secondary">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No script logic needed for this component
</script>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
</style>