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
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
            <NuxtLink to="/register" class="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
              Register
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <div class="flex h-screen">
        <!-- Map Section -->
        <div class="flex-1 relative">
          <GoogleMapsView
            :services="filteredServices"
            :center="mapCenter"
            :zoom="mapZoom"
            :customer-location="customerLocation"
            @service-selected="handleServiceSelected"
            @map-click="handleMapClick"
          />

          <!-- Search Bar Overlay -->
          <div class="absolute top-4 left-4 right-4 z-30">
            <div class="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl p-4 shadow-lg max-w-md">
              <div class="space-y-3">
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
                    @click="toggleLocationSelector"
                    class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-xl font-medium hover:shadow-md transition-all duration-300"
                    :class="{ 'bg-green-600': customerLocation }"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                <!-- Location Selector -->
                <div v-if="showLocationSelector" class="border-t border-white/20 pt-3">
                  <LocationSelector
                    v-model="customerLocation"
                    :default-radius="searchRadius"
                    @update:radius="updateSearchRadius"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="w-96 bg-white/20 backdrop-blur-xl border-l border-white/20 overflow-y-auto">
          <div class="p-6">
            <!-- Filters -->
            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
              <div class="space-y-4">
                <!-- Category Filter -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="category in categories"
                      :key="category.id"
                      @click="toggleCategory(category.slug)"
                      :disabled="loading"
                      class="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200"
                      :class="selectedCategories.includes(category.slug) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white/50 text-gray-700 hover:bg-white/70'"
                    >
                      {{ category.name }}
                    </button>
                  </div>
                </div>

                <!-- Price Range -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div class="space-y-2">
                    <input
                      v-model="priceRange[0]"
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      class="w-full"
                    />
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>R{{ priceRange[0] }}</span>
                      <span>R{{ priceRange[1] }}+</span>
                    </div>
                  </div>
                </div>

                <!-- Sort Options -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    v-model="sortBy"
                    class="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="distance" :disabled="!customerLocation">Distance</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                <button
                  @click="clearFilters"
                  class="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-lg text-gray-700 hover:bg-white/70 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <!-- Services List -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Services Near You</h3>
                <span class="text-sm text-gray-500">{{ filteredServices.length }} found</span>
              </div>

              <div
                v-for="service in filteredServices"
                :key="service.id"
                class="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-4 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                :class="selectedService?.id === service.id ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''"
                @click="selectServiceFromSidebar(service)"
              >
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-semibold text-gray-900">{{ service.name }}</h4>
                  <span class="text-sm font-medium text-green-600">R{{ service.price }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ service.categoryName }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span v-if="service.distance !== null">{{ service.distance.toFixed(1) }}km away</span>
                    <span v-else>{{ service.location }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ service.rating }}</span>
                  </div>
                </div>
              </div>

              <div v-if="filteredServices.length === 0" class="text-center py-8">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p class="text-gray-600">No services found</p>
                <p class="text-sm text-gray-500">Try adjusting your filters or location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Meta
definePageMeta({
  layout: false
})

// Composables
const { fetchServices, fetchCategories, categories, loading, formatPrice } = useServices()

// State
const searchQuery = ref('')
const selectedCategories = ref([])
const customerLocation = ref(null)
const searchRadius = ref(10)
const showLocationSelector = ref(false)
const priceRange = ref([0, 5000])
const sortBy = ref('relevance')
const services = ref([])
const selectedService = ref(null)

// Map state
const mapCenter = ref({ lat: -26.2041, lng: 28.0473 }) // Johannesburg default
const mapZoom = ref(10)

// Load data on mount
onMounted(async () => {
  try {
    await fetchCategories()
    
    const response = await fetchServices({
      per_page: 100,
      sort: 'popular'
    })
    services.value = response.data || []
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

// Transform services for display
const transformServiceForDisplay = (service) => {
  return {
    id: service.id,
    name: service.title,
    category: service.category?.slug || 'service',
    categoryName: service.category?.name || 'Service',
    location: service.location_display || 'Location not specified',
    latitude: service.latitude,
    longitude: service.longitude,
    price: service.base_price,
    rating: service.average_rating || 4.5,
    reviews: service.review_count || 0,
    full_slug: service.full_slug,
    distance: null
  }
}

// Calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Filtered and sorted services
const filteredServices = computed(() => {
  const transformedServices = services.value.map(transformServiceForDisplay)
  
  let filtered = transformedServices.filter(service => {
    const matchesSearch = !searchQuery.value || 
      service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = selectedCategories.value.length === 0 || 
      selectedCategories.value.includes(service.category)
    
    const matchesPrice = service.price >= priceRange.value[0] && service.price <= priceRange.value[1]
    
    // Location-based filtering
    let matchesLocation = true
    if (customerLocation.value && service.latitude && service.longitude) {
      const distance = calculateDistance(
        customerLocation.value.latitude,
        customerLocation.value.longitude,
        service.latitude,
        service.longitude
      )
      matchesLocation = distance <= searchRadius.value
      service.distance = distance
    } else if (customerLocation.value && (!service.latitude || !service.longitude)) {
      matchesLocation = false
    }
    
    return matchesSearch && matchesCategory && matchesPrice && matchesLocation
  })

  // Sorting
  if (sortBy.value === 'price') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'distance' && customerLocation.value) {
    filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999))
  } else if (sortBy.value === 'newest') {
    filtered.sort((a, b) => b.id - a.id)
  }

  return filtered
})

// Methods
const toggleCategory = (categorySlug) => {
  const index = selectedCategories.value.indexOf(categorySlug)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categorySlug)
  }
}

const toggleLocationSelector = () => {
  showLocationSelector.value = !showLocationSelector.value
}

const updateSearchRadius = (radius) => {
  searchRadius.value = radius
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  priceRange.value = [0, 5000]
  sortBy.value = 'relevance'
}

const searchServices = () => {
  // Trigger search - filtering happens automatically via computed
}

const handleServiceSelected = (service) => {
  selectedService.value = service
}

const handleMapClick = () => {
  selectedService.value = null
}

const selectServiceFromSidebar = (service) => {
  selectedService.value = service
  
  // Center map on selected service
  if (service.latitude && service.longitude) {
    mapCenter.value = { lat: service.latitude, lng: service.longitude }
  }
}

// Watch customer location changes to update map center
watch(customerLocation, (newLocation) => {
  if (newLocation) {
    mapCenter.value = { lat: newLocation.latitude, lng: newLocation.longitude }
    mapZoom.value = 12
  }
}, { deep: true })
</script>

<style scoped>
/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Transitions */
.slide-right-enter-active,
.slide-left-enter-active,
.scale-up-enter-active,
.fade-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
</style>