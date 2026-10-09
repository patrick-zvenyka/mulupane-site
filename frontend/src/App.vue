<script setup>
</script>

<template>
  <nav class="glass" style="margin: 1rem; border-radius: 20px;">
    <div class="logo-container">
      <img src="/logo.jpeg" alt="Mulupane Logo" />
      <span>Mulupane</span>
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/admin">Admin (Publish)</router-link>
    </div>
  </nav>

  <main style="flex: 1; padding: 2rem 5%;">
    <router-view></router-view>
  </main>

  <footer style="padding: 2rem; text-align: center; color: var(--text-secondary); margin-top: auto;">
    <p>&copy; 2026 Mulupane IT Services. All rights reserved.</p>
  </footer>
</template>

<style scoped>
nav {
  background: rgba(30, 41, 59, 0.5);
}
</style>
