<script setup>
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const price = ref('')
const image = ref(null)
const statusMessage = ref('')
const isSuccess = ref(false)

const handleFileChange = (e) => {
  image.value = e.target.files[0]
}

const submitProduct = async () => {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  if (image.value) {
    formData.append('image', image.value)
  }

  try {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: formData
    })
    
    if (res.ok) {
      statusMessage.value = 'Service published successfully!'
      isSuccess.value = true
      name.value = ''
      description.value = ''
      price.value = ''
      image.value = null
      document.getElementById('imageUpload').value = ""
    } else {
      const data = await res.json()
      statusMessage.value = 'Error: ' + data.error
      isSuccess.value = false
    }
  } catch (error) {
    statusMessage.value = 'Network error'
    isSuccess.value = false
  }
}
</script>

<template>
  <div class="px-[5%] py-16 flex justify-center items-center bg-slate-50 min-h-[calc(100vh-160px)]">
    <div class="w-full max-w-[600px] bg-white p-12 rounded-xl border border-slate-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] animate-fade-in">
      <h2 class="text-2xl font-semibold text-slate-800 text-center mb-8">Publish New Product/Service</h2>
      
      <form @submit.prevent="submitProduct">
        <div class="mb-6">
          <label for="name" class="block mb-2 font-medium text-slate-800">Product Name</label>
          <input type="text" id="name" v-model="name" required placeholder="e.g. Managed IT Support" class="w-full px-4 py-3 border border-slate-300 rounded-md font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
        </div>
        
        <div class="mb-6">
          <label for="description" class="block mb-2 font-medium text-slate-800">Description</label>
          <textarea id="description" v-model="description" rows="4" required placeholder="Describe the service..." class="w-full px-4 py-3 border border-slate-300 rounded-md font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"></textarea>
        </div>
        
        <div class="mb-6">
          <label for="price" class="block mb-2 font-medium text-slate-800">Price ($)</label>
          <input type="number" id="price" v-model="price" step="0.01" required placeholder="0.00" class="w-full px-4 py-3 border border-slate-300 rounded-md font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
        </div>
        
        <div class="mb-6">
          <label for="imageUpload" class="block mb-2 font-medium text-slate-800">Image (Optional)</label>
          <input type="file" id="imageUpload" @change="handleFileChange" accept="image/*" class="w-full px-4 py-3 border border-slate-300 rounded-md font-inherit transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white font-medium px-5 py-3.5 rounded-lg text-lg shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 hover:-translate-y-[1px] transition-all">Publish Service</button>
      </form>
      
      <div v-if="statusMessage" :class="['mt-6 p-4 rounded-md text-center font-medium border', isSuccess ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200']">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>
