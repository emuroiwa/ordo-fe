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
              <NuxtLink to="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ORDO
              </NuxtLink>
              <nav class="hidden md:flex space-x-8">
                <NuxtLink to="/search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Search</NuxtLink>
                <NuxtLink to="/map-search" class="text-blue-600 font-medium relative">
                  Map Search
                  <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </NuxtLink>
                <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</NuxtLink>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-4">
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
              <NuxtLink to="/register" class="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                Register
              </NuxtLink>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <div class="flex h-screen">
        <!-- Map Section -->
        <div class="flex-1 relative">
          <div class="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <!-- Placeholder for map -->
            <div class="text-center">
              <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p class="text-gray-600 text-lg">Interactive Map</p>
              <p class="text-gray-500 text-sm">Google Maps integration would go here</p>
            </div>
          </div>

          <!-- Map Overlays -->
          <div class="absolute inset-0 pointer-events-none">
            <!-- Service Markers -->
            <div
              v-for="marker in mapMarkers"
              :key="marker.id"
              :style="{ left: marker.x + '%', top: marker.y + '%' }"
              class="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
            >
              <button
                @click="selectMarker(marker)"
                class="backdrop-blur-sm bg-white/90 border border-white/30 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-300"
                :class="selectedMarker?.id === marker.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-white'"
              >
                <component :is="getMarkerIcon(marker.category)" class="w-5 h-5" :class="getMarkerColor(marker.category)" />
              </button>
            </div>
          </div>

          <!-- Map Controls -->
          <div class="absolute top-4 right-4 flex flex-col space-y-2">
            <button class="backdrop-blur-sm bg-white/90 border border-white/30 rounded-xl p-3 shadow-lg hover:bg-white transition-all duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button class="backdrop-blur-sm bg-white/90 border border-white/30 rounded-xl p-3 shadow-lg hover:bg-white transition-all duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <button class="backdrop-blur-sm bg-white/90 border border-white/30 rounded-xl p-3 shadow-lg hover:bg-white transition-all duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <!-- Search Bar Overlay -->
          <div class="absolute top-4 left-4 right-20">
            <Transition name="scale-up" appear>
              <div class="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-4 shadow-lg">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for services near you..."
                    class="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
                    @keyup.enter="searchServices"
                  />
                  <button
                    @click="searchServices"
                    class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="w-96 bg-white/20 backdrop-blur-xl border-l border-white/20 overflow-y-auto">
          <div class="p-6">
            <!-- Filters -->
            <Transition name="fade-up" appear>
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
                <div class="space-y-4">
                  <!-- Category Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="category in categories"
                        :key="category"
                        @click="toggleCategory(category)"
                        class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                        :class="selectedCategories.includes(category) 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/50 text-gray-700 hover:bg-white/70'"
                      >
                        {{ category }}
                      </button>
                    </div>
                  </div>

                  <!-- Distance Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                    <select
                      v-model="selectedDistance"
                      class="w-full px-3 py-2 backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">Any distance</option>
                      <option value="1">Within 1 km</option>
                      <option value="5">Within 5 km</option>
                      <option value="10">Within 10 km</option>
                      <option value="20">Within 20 km</option>
                    </select>
                  </div>

                  <!-- Price Range -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div class="space-y-2">
                      <input
                        v-model="priceRange[0]"
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        class="w-full"
                      />
                      <div class="flex justify-between text-sm text-gray-600">
                        <span>R{{ priceRange[0] }}</span>
                        <span>R{{ priceRange[1] }}+</span>
                      </div>
                    </div>
                  </div>

                  <!-- Rating Filter -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                    <div class="flex space-x-2">
                      <button
                        v-for="rating in [3, 4, 5]"
                        :key="rating"
                        @click="selectedRating = rating"
                        class="flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                        :class="selectedRating === rating 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-white/50 text-gray-700 hover:bg-white/70'"
                      >
                        <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {{ rating }}+
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Results -->
            <Transition name="fade-up" appear>
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ filteredServices.length }} Services Found
                  </h3>
                  <select
                    v-model="sortBy"
                    class="px-3 py-1 text-sm backdrop-blur-sm bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                <div class="space-y-4">
                  <TransitionGroup name="list-stagger" appear>
                    <div
                      v-for="(service, index) in filteredServices"
                      :key="service.id"
                      :style="{ '--delay': index * 0.1 + 's' }"
                      class="backdrop-blur-sm bg-white/70 border border-white/20 rounded-xl p-4 cursor-pointer hover:bg-white/80 hover:shadow-md transition-all duration-300"
                      @click="selectService(service)"
                      :class="selectedService?.id === service.id ? 'ring-2 ring-blue-500 bg-white/80' : ''"
                    >
                      <div class="flex items-start space-x-3">
                        <img
                          :src="service.image"
                          :alt="service.name"
                          class="w-16 h-16 rounded-xl object-cover"
                        />
                        <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between">
                            <div>
                              <h4 class="font-medium text-gray-900 truncate">{{ service.name }}</h4>
                              <p class="text-sm text-gray-600">{{ service.category }}</p>
                            </div>
                            <div class="text-right">
                              <div class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                R{{ service.price }}
                              </div>
                              <div class="text-xs text-gray-500">{{ service.distance }} km away</div>
                            </div>
                          </div>
                          
                          <div class="mt-2 flex items-center justify-between">
                            <div class="flex items-center">
                              <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span class="text-sm font-medium text-gray-700">{{ service.rating }}</span>
                              <span class="text-xs text-gray-500 ml-1">({{ service.reviews }})</span>
                            </div>
                            <span class="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              {{ service.availability }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Selected Service Modal -->
      <Transition name="modal-fade">
        <div
          v-if="selectedService"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click="selectedService = null"
        >
          <div
            class="backdrop-blur-xl bg-white/90 border border-white/20 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            @click.stop
          >
            <div class="flex items-start space-x-4">
              <img
                :src="selectedService.image"
                :alt="selectedService.name"
                class="w-20 h-20 rounded-xl object-cover"
              />
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ selectedService.name }}</h3>
                <p class="text-gray-600 mb-2">{{ selectedService.category }}</p>
                <div class="flex items-center mb-3">
                  <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm font-medium text-gray-700">{{ selectedService.rating }}</span>
                  <span class="text-xs text-gray-500 ml-1">({{ selectedService.reviews }} reviews)</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    R{{ selectedService.price }}
                  </div>
                  <div class="text-sm text-gray-500">{{ selectedService.distance }} km away</div>
                </div>
              </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
              <button
                @click="bookService(selectedService)"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Book Now
              </button>
              <button
                @click="viewService(selectedService)"
                class="px-4 py-3 backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl font-medium text-gray-700 hover:bg-white/70 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'

// Search state
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDistance = ref('')
const priceRange = ref([0, 2000])
const selectedRating = ref(null)
const sortBy = ref('distance')

// Map state
const selectedMarker = ref(null)
const selectedService = ref(null)

// Available categories
const categories = ref([
  'Barber', 'Wedding', 'Equipment', 'Photography', 'Catering', 'Events'
])

// Map markers (positioned as percentages)
const mapMarkers = ref([
  { id: 1, x: 30, y: 40, category: 'Barber', name: 'Premium Cuts' },
  { id: 2, x: 60, y: 35, category: 'Wedding', name: 'Elegant Weddings' },
  { id: 3, x: 45, y: 60, category: 'Equipment', name: 'Pro Equipment' },
  { id: 4, x: 70, y: 45, category: 'Photography', name: 'Studio Flash' },
  { id: 5, x: 35, y: 70, category: 'Catering', name: 'Gourmet Catering' },
  { id: 6, x: 55, y: 25, category: 'Barber', name: 'Urban Cuts' },
  { id: 7, x: 25, y: 55, category: 'Events', name: 'Event Masters' },
  { id: 8, x: 75, y: 65, category: 'Photography', name: 'Capture Moments' }
])

// Services data
const services = ref([
  {
    id: 1,
    name: 'Premium Cuts Barber',
    category: 'Barber',
    price: 150,
    rating: 4.8,
    reviews: 127,
    distance: 1.2,
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Elegant Weddings',
    category: 'Wedding',
    price: 2500,
    rating: 4.9,
    reviews: 89,
    distance: 2.5,
    availability: 'Book in Advance',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Pro Equipment Rental',
    category: 'Equipment',
    price: 300,
    rating: 4.6,
    reviews: 45,
    distance: 0.8,
    availability: 'Available Now',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Studio Flash Photography',
    category: 'Photography',
    price: 800,
    rating: 4.7,
    reviews: 73,
    distance: 3.2,
    availability: 'Weekend Available',
    image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    name: 'Gourmet Catering Co.',
    category: 'Catering',
    price: 1200,
    rating: 4.5,
    reviews: 156,
    distance: 1.8,
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=100&h=100&fit=crop'
  },
  {
    id: 6,
    name: 'Urban Cuts',
    category: 'Barber',
    price: 180,
    rating: 4.6,
    reviews: 92,
    distance: 2.1,
    availability: 'Walk-ins Welcome',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=100&h=100&fit=crop'
  },
  {
    id: 7,
    name: 'Event Masters',
    category: 'Events',
    price: 1500,
    rating: 4.8,
    reviews: 67,
    distance: 1.5,
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=100&h=100&fit=crop'
  },
  {
    id: 8,
    name: 'Capture Moments',
    category: 'Photography',
    price: 1200,
    rating: 4.9,
    reviews: 134,
    distance: 4.1,
    availability: 'Book in Advance',
    image: 'https://images.unsplash.com/photo-1606914469633-5fe06c9e8fcc?w=100&h=100&fit=crop'
  }
])

// Computed properties
const filteredServices = computed(() => {
  let filtered = services.value.filter(service => {
    const matchesSearch = !searchQuery.value || 
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategories.value.length === 0 || 
      selectedCategories.value.includes(service.category)
    
    const matchesDistance = !selectedDistance.value || 
      service.distance <= parseFloat(selectedDistance.value)
    
    const matchesPrice = service.price >= priceRange.value[0] && 
      service.price <= priceRange.value[1]
    
    const matchesRating = !selectedRating.value || 
      service.rating >= selectedRating.value
    
    return matchesSearch && matchesCategory && matchesDistance && matchesPrice && matchesRating
  })

  // Sort results
  if (sortBy.value === 'distance') {
    filtered.sort((a, b) => a.distance - b.distance)
  } else if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'price') {
    filtered.sort((a, b) => a.price - b.price)
  }

  return filtered
})

// Functions
const toggleCategory = (category) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

const selectMarker = (marker) => {
  selectedMarker.value = marker
  const service = services.value.find(s => s.id === marker.id)
  if (service) {
    selectedService.value = service
  }
}

const selectService = (service) => {
  selectedService.value = service
  // Find corresponding marker
  const marker = mapMarkers.value.find(m => m.id === service.id)
  if (marker) {
    selectedMarker.value = marker
  }
}

const searchServices = () => {
  // Handle search functionality
  console.log('Searching for:', searchQuery.value)
}

const bookService = (service) => {
  navigateTo(`/vendor/${service.id}`)
}

const viewService = (service) => {
  navigateTo(`/vendor/${service.id}`)
}

// Marker icon helpers
const getMarkerIcon = (category) => {
  const icons = {
    'Barber': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { d: 'M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5z' })
    ]),
    'Wedding': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
    ]),
    'Equipment': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { d: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' })
    ]),
    'Photography': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z', 'clip-rule': 'evenodd' })
    ]),
    'Catering': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { d: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' })
    ]),
    'Events': h('svg', { class: 'w-5 h-5', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { 'fill-rule': 'evenodd', d: 'M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z', 'clip-rule': 'evenodd' })
    ])
  }
  return icons[category] || icons['Equipment']
}

const getMarkerColor = (category) => {
  const colors = {
    'Barber': 'text-blue-600',
    'Wedding': 'text-pink-600',
    'Equipment': 'text-green-600',
    'Photography': 'text-purple-600',
    'Catering': 'text-orange-600',
    'Events': 'text-red-600'
  }
  return colors[category] || 'text-gray-600'
}

// Set page title
useHead({
  title: 'Map Search - ORDO'
})
</script>

<style scoped>
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

/* List Stagger Animation */
.list-stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.list-stagger-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

/* Modal Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .backdrop-blur-xl,
.modal-fade-leave-active .backdrop-blur-xl {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .backdrop-blur-xl,
.modal-fade-leave-to .backdrop-blur-xl {
  transform: scale(0.9);
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
</style>