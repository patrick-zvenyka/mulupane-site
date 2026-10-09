<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-1">
      <router-view></router-view>
    </main>

    <footer class="p-8 text-center text-slate-500 text-sm mt-auto">
      <p>&copy; 2026 Mulupane IT Services. All rights reserved.</p>
    </footer>
  </div>
</template>
