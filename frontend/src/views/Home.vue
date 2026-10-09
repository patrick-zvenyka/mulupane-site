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
    <header class="hero animate-fade-in">
      <h1>Elevating Your Digital Infrastructure</h1>
      <p>Mulupane provides cutting-edge IT services and tailored solutions to scale your business into the future.</p>
      <button class="btn btn-primary" style="margin-top: 1.5rem;">Explore Services</button>
    </header>

    <section class="services">
      <h2>Our Services & Products</h2>
      
      <div v-if="loading" class="loading">
        Loading services...
      </div>
      <div v-else-if="products.length === 0" class="empty">
        No services available yet.
      </div>
      
      <div v-else class="grid">
        <div class="card glass animate-fade-in" v-for="(product, index) in products" :key="product.id" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="card-image" v-if="product.imageUrl">
            <img :src="`http://localhost:3000${product.imageUrl}`" :alt="product.name" />
          </div>
          <div class="card-content">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <div class="price">${{ product.price }}</div>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 0;
  max-width: 800px;
  margin: 0 auto;
}
.hero p {
  font-size: 1.2rem;
  margin-top: 1rem;
}
.services {
  margin-top: 3rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
.card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px 0 rgba(59, 130, 246, 0.2);
}
.card-image {
  height: 200px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.card-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}
.card-content p {
  flex: 1;
  margin-bottom: 1.5rem;
}
.price {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent-color);
}
.loading, .empty {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}
</style>
