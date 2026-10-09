<script setup>
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <nav class="flex justify-between items-center px-[5%] py-6 bg-white sticky top-0 z-50">
      <div class="flex items-center gap-3">
        <img src="/logo.jpeg" alt="Mulupane Logo" class="w-9 h-9 rounded-full object-cover" />
        <span class="text-2xl font-bold text-slate-800 tracking-tight">Mulupane</span>
      </div>
      
      <div class="flex gap-10">
        <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Home</router-link>
        <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Services</router-link>
        <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Company</router-link>
      </div>

      <div class="flex items-center gap-6">
        <router-link to="/admin" class="text-blue-600 font-medium text-[0.95rem] no-underline">Admin Login</router-link>
        <router-link to="/admin" class="px-5 py-2 rounded-md font-medium text-[0.95rem] transition-all border border-blue-600 text-blue-600 hover:bg-blue-50">Publish</router-link>
      </div>
    </nav>

    <main class="flex-1">
      <router-view></router-view>
    </main>

    <footer class="p-8 text-center text-slate-500 text-sm mt-auto">
      <p>&copy; 2026 Mulupane IT Services. All rights reserved.</p>
    </footer>
  </div>
</template>
