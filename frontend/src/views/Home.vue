<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products')
    const json = await res.json()
    products.value = json.data
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative text-center px-[5%] pt-24 pb-16 min-h-[85vh] flex flex-col justify-center items-center">
      <div class="absolute inset-0 z-[-1] overflow-hidden flex justify-center items-center">
        <img src="/network_bg.png" alt="Network Background" class="w-full max-w-[1200px] opacity-60 object-cover" />
      </div>
      
      <div class="max-w-[800px] mx-auto z-10 animate-fade-in">
        <h1 class="text-6xl font-bold text-slate-800 leading-[1.1] tracking-tight mb-6">
          Empowering IT<br>and <span class="text-blue-600">Connectivity</span>
        </h1>
        <p class="text-[1.1rem] text-slate-600 max-w-[650px] mx-auto mb-10 leading-[1.7]">
          Empowering businesses and individuals with cutting-edge technology solutions, Mulupane connects you to the latest innovations, seamless integrations, and expert IT support.
        </p>
        <button class="bg-blue-600 text-white font-medium px-8 py-3.5 rounded-lg text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 hover:-translate-y-[1px] transition-all">
          Get Started
        </button>
      </div>
      
      <div class="mt-32 z-10">
        <p class="text-xs font-bold tracking-[2px] text-slate-500 mb-6">TRUSTED BY:</p>
        <div class="flex justify-center items-center gap-16">
          <div class="text-2xl font-bold text-slate-900 flex items-center gap-2">Webflow</div>
          <div class="text-2xl font-bold text-slate-900 flex items-center gap-2">GitHub</div>
          <div class="text-2xl font-bold text-slate-900 flex items-center gap-2">Postman</div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-slate-50 py-24 px-[5%]">
      <div class="max-w-[1200px] mx-auto">
        <h2 class="text-4xl font-semibold text-center mb-12 text-slate-800">Our Services</h2>
        
        <div v-if="loading" class="text-center py-12 text-slate-500">
          Loading services...
        </div>
        <div v-else-if="products.length === 0" class="text-center py-12 text-slate-500">
          No services available yet.
        </div>
        
        <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
          <div class="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] animate-fade-in" v-for="(product, index) in products" :key="product.id" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="h-[200px] bg-slate-100" v-if="product.imageUrl">
              <img :src="`http://localhost:3000${product.imageUrl}`" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-7">
              <h3 class="text-xl font-semibold text-slate-800 mb-2">{{ product.name }}</h3>
              <p class="text-[0.95rem] text-slate-500 mb-6">{{ product.description }}</p>
              <div class="font-bold text-xl text-blue-600">${{ product.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
