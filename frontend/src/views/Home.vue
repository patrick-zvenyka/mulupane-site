<script setup>
import { ref, onMounted } from 'vue'
import Globe from '../components/Globe.vue'

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
    <section class="relative text-center px-[5%] pt-24 pb-16 min-h-[85vh] flex flex-col justify-center items-center overflow-hidden">
      <div class="absolute inset-0 z-[-1] flex justify-center items-center">
        <Globe />
      </div>
      
      <div class="max-w-[800px] mx-auto z-10" v-animate>
        <h1 class="text-6xl md:text-7xl font-bold text-slate-800 leading-[1.1] tracking-tight mb-6">
          Empowering IT<br>and <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Connectivity</span>
        </h1>
        <p class="text-[1.1rem] text-slate-600 max-w-[650px] mx-auto mb-10 leading-[1.7]">
          Empowering businesses and individuals with cutting-edge technology solutions, Mulupane connects you to the latest innovations, seamless integrations, and expert IT support.
        </p>
        <button class="bg-blue-600 text-white font-medium px-8 py-3.5 rounded-lg text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 hover:-translate-y-[2px] hover:shadow-lg transition-all">
          Get Started
        </button>
      </div>
      
      <div class="mt-32 z-10" v-animate data-delay="300">
        <p class="text-xs font-bold tracking-[2px] text-slate-500 mb-6">TRUSTED BY:</p>
        <div class="flex justify-center items-center flex-wrap gap-10 md:gap-16">
          <div class="text-2xl font-bold text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2">Webflow</div>
          <div class="text-2xl font-bold text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2">GitHub</div>
          <div class="text-2xl font-bold text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2">Postman</div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-slate-50 py-24 px-[5%] relative overflow-hidden">
      <!-- Decorative gradient blobs -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div class="max-w-[1200px] mx-auto relative z-10">
        <h2 class="text-4xl font-bold text-center mb-16 text-slate-800" v-animate>Our Services</h2>
        
        <div v-if="loading" class="text-center py-12 text-slate-500" v-animate>
          <div class="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
          <p>Loading services...</p>
        </div>
        <div v-else-if="products.length === 0" class="text-center py-12 text-slate-500" v-animate>
          No services available yet.
        </div>
        
        <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
          <div 
            class="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group" 
            v-for="(product, index) in products" 
            :key="product.id"
            v-animate
            :data-delay="index * 100"
          >
            <div class="h-[220px] bg-slate-100 overflow-hidden relative" v-if="product.imageUrl">
              <img :src="`http://localhost:3000${product.imageUrl}`" :alt="product.name" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div class="h-[220px] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center" v-else>
               <span class="text-4xl">💼</span>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-800 mb-3">{{ product.name }}</h3>
              <p class="text-[0.95rem] text-slate-500 mb-6 leading-relaxed">{{ product.description }}</p>
              <div class="flex justify-between items-center mt-4">
                <div class="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">${{ product.price }}</div>
                <button class="text-blue-600 font-medium text-sm group-hover:underline">View details &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us / Features Section -->
    <section class="py-24 px-[5%] bg-white">
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16" v-animate>
          <h2 class="text-4xl font-bold text-slate-800 mb-6">Why Choose Mulupane</h2>
          <p class="text-slate-500 max-w-[600px] mx-auto text-lg">We bring together the best of innovation, reliability, and security to empower your digital transformation journey.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center md:text-left group" v-animate data-delay="100">
            <div class="w-16 h-16 bg-white shadow-sm text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 text-3xl group-hover:scale-110 transition-transform">
              🚀
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Rapid Deployment</h3>
            <p class="text-slate-600">Get your infrastructure running in record time with our automated and streamlined setup processes.</p>
          </div>
          
          <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all text-center md:text-left group" v-animate data-delay="200">
            <div class="w-16 h-16 bg-white shadow-sm text-slate-800 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 text-3xl group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Enterprise Security</h3>
            <p class="text-slate-600">Bank-grade security protocols ensuring your data and infrastructure remain protected 24/7.</p>
          </div>
          
          <div class="p-8 rounded-3xl bg-indigo-50 border border-indigo-100 hover:shadow-lg hover:-translate-y-1 transition-all text-center md:text-left group" v-animate data-delay="300">
            <div class="w-16 h-16 bg-white shadow-sm text-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 text-3xl group-hover:scale-110 transition-transform">
              📈
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Infinite Scalability</h3>
            <p class="text-slate-600">Our cloud-native solutions grow with you, ensuring seamless scaling without bottlenecks.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative py-24 px-[5%] text-white overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 z-0"></div>
      
      <div class="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center divide-x-0 md:divide-x divide-blue-500/30 relative z-10">
        <div v-animate data-delay="100">
          <div class="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md">99.9<span class="text-blue-300 text-3xl md:text-4xl">%</span></div>
          <div class="text-blue-200 font-medium tracking-widest text-xs uppercase">Uptime Guarantee</div>
        </div>
        <div v-animate data-delay="200">
          <div class="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md">500<span class="text-blue-300 text-3xl md:text-4xl">+</span></div>
          <div class="text-blue-200 font-medium tracking-widest text-xs uppercase">Enterprise Clients</div>
        </div>
        <div v-animate data-delay="300">
          <div class="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md">24<span class="text-blue-300 text-3xl md:text-4xl">/7</span></div>
          <div class="text-blue-200 font-medium tracking-widest text-xs uppercase">Expert Support</div>
        </div>
        <div v-animate data-delay="400">
          <div class="text-4xl md:text-6xl font-bold mb-3 drop-shadow-md">15<span class="text-blue-300 text-3xl md:text-4xl">ms</span></div>
          <div class="text-blue-200 font-medium tracking-widest text-xs uppercase">Average Latency</div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 px-[5%] text-center bg-slate-50 relative overflow-hidden">
      <div class="max-w-[800px] mx-auto bg-white p-12 md:p-20 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative z-10" v-animate>
        <h2 class="text-3xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">Ready to scale your infrastructure?</h2>
        <p class="text-slate-500 mb-12 text-lg md:text-xl">Join hundreds of companies that trust Mulupane for their critical IT and connectivity needs.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-5">
          <button class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Start Your Project</button>
          <button class="bg-white text-slate-700 font-medium px-8 py-4 rounded-xl text-lg border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all">Talk to Sales</button>
        </div>
      </div>
    </section>
  </div>
</template>
