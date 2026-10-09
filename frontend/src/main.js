import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Lazy load routes
const Home = () => import('./views/Home.vue')
const Admin = () => import('./views/Admin.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

// Intersection Observer Directive for scroll animations
app.directive('animate', {
  mounted(el) {
    // Initial state: hidden and slightly translated down
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out')
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Final state: visible and in original position
          el.classList.remove('opacity-0', 'translate-y-10')
          el.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    
    // Add a slight delay if data-delay attribute is present
    const delay = el.getAttribute('data-delay')
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }
    
    observer.observe(el)
  }
})

app.use(router).mount('#app')
