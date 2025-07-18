<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Gradient -->
    <div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80')] bg-cover bg-center opacity-10"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
    </div>

    <!-- Glassmorphism Header -->
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <Transition name="slide-right" appear>
            <div class="flex items-center space-x-8">
              <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ORDO
              </div>
              <nav class="hidden md:flex space-x-8">
                <a href="#" class="text-blue-600 font-medium relative">
                  Search
                  <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Map Search</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Find an Agent</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</a>
                <a href="#" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</a>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-4">
              <select class="bg-transparent border-none text-gray-700 focus:outline-none">
                <option>English</option>
              </select>
              <button class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</button>
              <button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                List a Service
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <!-- Hero Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="mb-12">
              <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                Find a new service in
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  South Africa
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Discover trusted vendors while you stay at home
              </p>
            </div>
          </Transition>
          
          <!-- Glassmorphism Search Bar -->
          <Transition name="scale-up" appear>
            <div class="glass-card max-w-5xl mx-auto mb-8">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <input
                    type="text"
                    placeholder="Enter Location, Project or Landmark"
                    class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div class="flex-1">
                  <select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                    <option>Service Type</option>
                    <option>Barber</option>
                    <option>Wedding</option>
                    <option>Equipment</option>
                  </select>
                </div>
                <div class="flex-1">
                  <select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                    <option>Budget</option>
                    <option>R100 - R500</option>
                    <option>R500 - R2000</option>
                    <option>R2000+</option>
                  </select>
                </div>
                <button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Search
                </button>
              </div>
              
              <!-- Quick Links -->
              <div class="flex flex-wrap gap-3 mt-8 justify-center">
                <span class="text-gray-600 font-medium">Popular:</span>
                <button v-for="tag in popularTags" :key="tag" 
                        class="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 hover:bg-white/70 transition-all duration-200 hover:scale-105">
                  {{ tag }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="flex items-center justify-between mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
                Services You May Like in 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Johannesburg
                </span>
              </h2>
              <button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TransitionGroup name="card-stagger" appear>
              <div
                v-for="(vendor, index) in featuredVendors"
                :key="vendor.id"
                :style="{ '--delay': index * 0.1 + 's' }"
                class="glass-card-hover group cursor-pointer"
                @click="viewVendor(vendor.id)"
              >
                <div class="relative overflow-hidden rounded-2xl">
                  <img
                    :src="vendor.image"
                    :alt="vendor.name"
                    class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300">
                    <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      R {{ vendor.price.toLocaleString() }}
                    </span>
                    <button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                  
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ vendor.name }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ vendor.category }} • {{ vendor.details }}</p>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ vendor.location }}
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm font-medium text-gray-700">{{ vendor.rating }}</span>
                    </div>
                    <span class="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                      Available Today
                    </span>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="text-center mb-16">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose ORDO</h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                We make it easy to find, book, and manage your service appointments
              </p>
            </div>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TransitionGroup name="feature-stagger" appear>
              <div v-for="(feature, index) in features" :key="feature.title" 
                   :style="{ '--delay': index * 0.2 + 's' }"
                   class="glass-card text-center group hover:scale-105 transition-all duration-300">
                <div class="glass-icon mb-6 mx-auto">
                  <component :is="feature.icon" class="w-8 h-8 text-blue-600" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ feature.title }}</h3>
                <p class="text-gray-600">{{ feature.description }}</p>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="glass-card">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p class="text-xl text-gray-600 mb-8">
                Join thousands of satisfied customers who trust our platform
              </p>
              <NuxtLink
                to="/search"
                class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Start Searching
              </NuxtLink>
            </div>
          </Transition>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

// Popular search tags
const popularTags = ref([
  'Weddings', 'Barbers', 'Equipment', 'Photography', 'Catering', 'Events'
])

// Featured vendors data
const featuredVendors = ref([
  {
    id: 1,
    name: 'Premium Cuts',
    category: 'Barber',
    details: '2 Services • 1 Location',
    price: 150,
    rating: 4.8,
    location: 'Sandton, Johannesburg',
    image: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=400&h=300&fit=crop',
    timeAgo: '2 days ago'
  },
  {
    id: 2,
    name: 'Elegant Weddings',
    category: 'Wedding',
    details: '5 Services • 3 Locations',
    price: 2500,
    rating: 4.9,
    location: 'Camps Bay, Cape Town',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    timeAgo: '1 week ago'
  },
  {
    id: 3,
    name: 'Pro Equipment',
    category: 'Equipment',
    details: '10 Items • Same Day',
    price: 300,
    rating: 4.6,
    location: 'Umhlanga, Durban',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
    timeAgo: '3 days ago'
  },
  {
    id: 4,
    name: 'Studio Flash',
    category: 'Photography',
    details: '3 Packages • Weekend',
    price: 800,
    rating: 4.7,
    location: 'Hatfield, Pretoria',
    image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&h=300&fit=crop',
    timeAgo: '5 days ago'
  }
])

// Features data with icon components
const features = ref([
  {
    title: 'Easy Search',
    description: 'Find the perfect vendor with our advanced search and filter system',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
    ])
  },
  {
    title: 'Instant Booking',
    description: 'Book appointments instantly and manage them from your dashboard',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ])
  },
  {
    title: 'Trusted Vendors',
    description: 'All vendors are verified and rated by our community',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
])

// Navigation functions
const viewVendor = (vendorId) => {
  navigateTo(`/vendor/${vendorId}`)
}

const searchCategory = (category) => {
  navigateTo(`/search?category=${category}`)
}
</script>

<style scoped>
/* Glassmorphism Effects */
.glass-card {
  @apply backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg;
}

.glass-card-hover {
  @apply backdrop-blur-xl bg-white/60 border border-white/20 rounded-2xl p-0 shadow-lg hover:shadow-2xl hover:bg-white/70 transition-all duration-300;
}

.glass-button {
  @apply backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300;
}

.glass-input {
  @apply backdrop-blur-sm bg-white/50 border border-white/30 text-gray-900 placeholder-gray-500;
}

.glass-icon {
  @apply w-16 h-16 rounded-2xl backdrop-blur-sm bg-white/50 border border-white/30 flex items-center justify-center;
}

/* Transition Animations */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.scale-up-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.slide-right-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

/* Staggered Animations */
.card-stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.card-stagger-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.feature-stagger-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.feature-stagger-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}

/* Custom Backdrop Blur Support */
@supports not (backdrop-filter: blur(12px)) {
  .glass-card,
  .glass-card-hover,
  .glass-button,
  .glass-input,
  .glass-icon {
    @apply bg-white/90;
  }
  
  header {
    @apply bg-white/95;
  }
}
</style>