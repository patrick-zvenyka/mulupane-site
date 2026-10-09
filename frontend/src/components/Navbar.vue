<script setup>
</script>

<template>
  <nav class="relative flex items-center px-[5%] py-6 bg-white sticky top-0 z-50">
    <div class="flex items-center gap-3">
      <img src="/assets/logo.jpeg" alt="Mulupane Logo" class="w-9 h-9 rounded-full object-cover" />
     
    </div>
    
    <div class="absolute left-1/2 -translate-x-1/2 flex gap-10">
      <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Home</router-link>
      <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Services</router-link>
      <router-link to="/" class="text-slate-600 font-medium text-[0.95rem] transition-colors hover:text-slate-900">Company</router-link>
    </div>

    
  </nav>
</template>
