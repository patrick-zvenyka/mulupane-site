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
  <div class="admin animate-fade-in">
    <div class="glass form-container">
      <h2>Publish New Product/Service</h2>
      
      <form @submit.prevent="submitProduct">
        <div class="input-group">
          <label for="name">Product Name</label>
          <input type="text" id="name" v-model="name" required placeholder="e.g. Managed IT Support" />
        </div>
        
        <div class="input-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="description" rows="4" required placeholder="Describe the service..."></textarea>
        </div>
        
        <div class="input-group">
          <label for="price">Price ($)</label>
          <input type="number" id="price" v-model="price" step="0.01" required placeholder="0.00" />
        </div>
        
        <div class="input-group">
          <label for="imageUpload">Image (Optional)</label>
          <input type="file" id="imageUpload" @change="handleFileChange" accept="image/*" />
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%;">Publish</button>
      </form>
      
      <div v-if="statusMessage" class="status" :class="{ success: isSuccess, error: !isSuccess }">
        {{ statusMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}
.form-container {
  width: 100%;
  max-width: 600px;
  padding: 2.5rem;
}
.status {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.error {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
</style>
