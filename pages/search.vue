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
              <NuxtLink to="/search" class="text-blue-600 font-medium relative">
                Search
                <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </NuxtLink>
              <NuxtLink to="/map-search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Map Search</NuxtLink>
              <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</NuxtLink>
              <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</NuxtLink>
            </nav>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
            <NuxtLink to="/register" class="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300">Register</NuxtLink>
            <NuxtLink to="/register">
              <button class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                 List a Service
              </button>
            </NuxtLink> 
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="relative z-10 pt-16 sm:pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <!-- Mobile Filter Toggle -->
        <div class="lg:hidden mb-6">
          <button 
            @click="showFilters = !showFilters"
            class="w-full backdrop-blur-sm bg-white/80 rounded-xl shadow-lg border border-white/20 p-4 flex items-center justify-between text-gray-900 font-medium touch-target"
          >
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L9 21.414A1 1 0 018 20.586V11.414a1 1 0 00-.293-.707L1.293 4.293A1 1 0 011 4z" />
              </svg>
              Filters
            </span>
            <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': showFilters }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <!-- Filters Sidebar -->
          <div class="lg:col-span-1">
            <div 
              class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 sticky top-24 transition-all duration-300"
              :class="{ 'block': showFilters, 'hidden lg:block': !showFilters }"
            >
              <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707L9 21.414A1 1 0 018 20.586V11.414a1 1 0 00-.293-.707L1.293 4.293A1 1 0 011 4z" />
                </svg>
                Filters
              </h2>
            
            <div class="space-y-4 sm:space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search vendors or services..."
                  class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 touch-target"
                />
              </div>

              <!-- Mobile-First Category Selection -->
              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Category</label>
                
                <!-- Mobile: Touch-friendly buttons -->
                <div class="lg:hidden space-y-2">
                  <button
                    @click="selectedCategory = ''"
                    :class="[
                      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 touch-target',
                      selectedCategory === '' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">All Categories</span>
                      <div v-if="selectedCategory === ''" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    v-for="category in categories"
                    :key="category.id"
                    @click="selectedCategory = category.slug"
                    :class="[
                      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 touch-target',
                      selectedCategory === category.slug 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ category.name }}</span>
                      <div v-if="selectedCategory === category.slug" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Desktop: Traditional select -->
                <select
                  v-model="selectedCategory"
                  class="hidden lg:block w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 touch-target"
                  :disabled="loading"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category.id" :value="category.slug">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Location & Distance</label>
                <LocationSelector
                  v-model="customerLocation"
                  :default-radius="searchRadius"
                  @update:radius="updateSearchRadius"
                />
              </div>

              <!-- Mobile-First Price Range -->
              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Price Range</label>
                <div class="space-y-4">
                  <!-- Mobile: Larger range input with better thumb -->
                  <div class="relative">
                    <input
                      v-model="priceRange[0]"
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      class="w-full h-8 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                    />
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="bg-blue-50 px-3 py-2 rounded-lg">
                      <span class="text-base font-medium text-blue-700">R{{ priceRange[0] }}</span>
                    </div>
                    <span class="text-gray-500">to</span>
                    <div class="bg-blue-50 px-3 py-2 rounded-lg">
                      <span class="text-base font-medium text-blue-700">R{{ priceRange[1] }}+</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile-First Availability -->
              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Availability</label>
                <div class="space-y-3">
                  <label class="flex items-center p-4 rounded-xl border-2 hover:bg-white/30 transition-all duration-200 cursor-pointer touch-target"
                         :class="availabilityFilter.includes('today') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'">
                    <input
                      v-model="availabilityFilter"
                      type="checkbox"
                      value="today"
                      class="sr-only"
                    />
                    <div class="flex items-center justify-between w-full">
                      <span class="text-base font-medium" :class="availabilityFilter.includes('today') ? 'text-blue-700' : 'text-gray-700'">
                        Available Today
                      </span>
                      <div v-if="availabilityFilter.includes('today')" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </label>
                  
                  <label class="flex items-center p-4 rounded-xl border-2 hover:bg-white/30 transition-all duration-200 cursor-pointer touch-target"
                         :class="availabilityFilter.includes('weekend') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'">
                    <input
                      v-model="availabilityFilter"
                      type="checkbox"
                      value="weekend"
                      class="sr-only"
                    />
                    <div class="flex items-center justify-between w-full">
                      <span class="text-base font-medium" :class="availabilityFilter.includes('weekend') ? 'text-blue-700' : 'text-gray-700'">
                        Weekend Available
                      </span>
                      <div v-if="availabilityFilter.includes('weekend')" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </label>
                  
                  <label class="flex items-center p-4 rounded-xl border-2 hover:bg-white/30 transition-all duration-200 cursor-pointer touch-target"
                         :class="availabilityFilter.includes('evening') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'">
                    <input
                      v-model="availabilityFilter"
                      type="checkbox"
                      value="evening"
                      class="sr-only"
                    />
                    <div class="flex items-center justify-between w-full">
                      <span class="text-base font-medium" :class="availabilityFilter.includes('evening') ? 'text-blue-700' : 'text-gray-700'">
                        Evening Hours
                      </span>
                      <div v-if="availabilityFilter.includes('evening')" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                @click="clearFilters"
                class="w-full px-4 py-3 backdrop-blur-sm bg-white/20 border border-white/30 rounded-xl text-gray-700 hover:bg-white/30 transition-all duration-300 font-medium touch-target"
              >
                Clear Filters
              </button>
            </div>
            </div>
          </div>

        <!-- Results Section -->
        <div class="lg:col-span-3" @click="closeFilters">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <p class="text-gray-600 text-sm sm:text-base">{{ filteredVendors.length }} results found</p>
            <select
              v-model="sortBy"
              class="px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 touch-target min-w-0 sm:min-w-[180px]"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="distance" :disabled="!customerLocation">Sort by Distance</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <div
              v-for="vendor in filteredVendors"
              :key="vendor.id"
              class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] active:scale-[0.98] sm:hover:scale-105"
              @click="bookVendor(vendor)"
            >
              <div class="relative">
                <img
                  :src="vendor.image"
                  :alt="vendor.name"
                  class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button 
                  @click.stop="handleToggleFavorite(vendor.id)"
                  :disabled="favoritesLoading"
                  class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  :class="{ 'text-red-500': isFavorited(vendor.id), 'text-gray-600': !isFavorited(vendor.id) }"
                >
                  <svg class="w-5 h-5" :fill="isFavorited(vendor.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <div class="absolute top-3 left-3">
                  <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {{ vendor.categoryName }}
                  </span>
                </div>
              </div>
              
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xl font-bold text-gray-900">{{ formatPrice(vendor.price, 'ZAR') }}</span>
                  <button 
                    @click.stop="handleShare(vendor)"
                    class="text-gray-400 hover:text-gray-600"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
                
                <h3 class="font-semibold text-gray-900 mb-1">{{ vendor.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ vendor.categoryName }} • {{ vendor.reviews }} reviews</p>
                
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ vendor.location }}
                  <span v-if="vendor.distance !== null" class="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {{ vendor.distance.toFixed(1) }}km away
                  </span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ vendor.rating }}</span>
                  </div>
                  <span class="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">Available Today</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="filteredVendors.length === 0" class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0712 15c-2.34 0-4.29-1.007-5.824-2.562M12 9l3 3-3 3m0-6l-3 3 3 3" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
            <p class="text-gray-600">Try adjusting your filters to find more results.</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Meta
definePageMeta({
  layout: false // Don't use any layout since we're implementing our own
})

const route = useRoute()
const { fetchServices, fetchCategories, categories, loading, formatPrice } = useServices()
const { favorites, toggleFavorite, isFavorited, loading: favoritesLoading } = useFavorites()
const { share } = useShare()

// Mobile filters state
const showFilters = ref(false)

const searchQuery = ref('')
const selectedCategory = ref('')
const customerLocation = ref(null)
const searchRadius = ref(10)
const priceRange = ref([0, 5000])
const availabilityFilter = ref([])
const sortBy = ref('name')
const services = ref([])

onMounted(async () => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  
  try {
    // Load categories from backend
    await fetchCategories()
    
    // Load services from backend
    const response = await fetchServices({
      per_page: 50,
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
    image: service.primary_image?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    availability: ['today'], // Mock for now, could be enhanced with real availability
    full_slug: service.full_slug,
    distance: null // Will be calculated if customer location is available
  }
}

const filteredVendors = computed(() => {
  const transformedServices = services.value.map(transformServiceForDisplay)
  
  let filtered = transformedServices.filter(vendor => {
    const matchesSearch = !searchQuery.value || 
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.categoryName.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCategory = !selectedCategory.value || vendor.category === selectedCategory.value
    const matchesPrice = vendor.price >= priceRange.value[0] && vendor.price <= priceRange.value[1]
    
    const matchesAvailability = availabilityFilter.value.length === 0 || 
      availabilityFilter.value.some(filter => vendor.availability.includes(filter))
    
    // Location-based filtering
    let matchesLocation = true
    if (customerLocation.value && vendor.latitude && vendor.longitude) {
      const distance = calculateDistance(
        customerLocation.value.latitude,
        customerLocation.value.longitude,
        vendor.latitude,
        vendor.longitude
      )
      matchesLocation = distance <= searchRadius.value
      vendor.distance = distance // Store distance for sorting and display
    } else if (customerLocation.value && (!vendor.latitude || !vendor.longitude)) {
      // If customer has location but vendor doesn't have coordinates, exclude vendor
      matchesLocation = false
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesAvailability
  })

  // Sorting
  if (sortBy.value === 'price') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'distance' && customerLocation.value) {
    filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999))
  }

  return filtered
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  customerLocation.value = null
  searchRadius.value = 10
  priceRange.value = [0, 5000]
  availabilityFilter.value = []
  sortBy.value = 'name'
}

const updateSearchRadius = (radius) => {
  searchRadius.value = radius
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

const bookVendor = (vendor) => {
  if (vendor.full_slug) {
    navigateTo(`/services/${vendor.full_slug}`)
  } else {
    // Fallback for legacy URLs
    navigateTo(`/vendor/${vendor.id}`)
  }
}

const handleToggleFavorite = async (serviceId) => {
  try {
    await toggleFavorite(serviceId)
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
  }
}

const handleShare = async (vendor) => {
  const shareData = {
    title: `${vendor.name} - ${vendor.categoryName}`,
    text: `Check out this ${vendor.categoryName.toLowerCase()} service: ${vendor.name} starting from ${formatPrice(vendor.price, 'ZAR')}`,
    url: `${window.location.origin}/services/${vendor.full_slug || `vendor/${vendor.id}`}`
  }
  
  await share(shareData, { 
    fallbackToClipboard: true, 
    showSuccessMessage: true 
  })
}

// Close mobile filters when clicking on results
const closeFilters = () => {
  showFilters.value = false
}
</script>

<style scoped>
/* Glassmorphism effects */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.transform:hover {
  transform: translateY(-2px);
}

/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Range slider styling */
.range-slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.range-slider::-webkit-slider-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #e5e7eb;
  border-radius: 4px;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: -8px;
}

.range-slider::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #e5e7eb;
  border-radius: 4px;
  border: none;
}

.range-slider::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Active states for better touch feedback */
.range-slider:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.range-slider:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .flex-shrink-0.w-80 {
    width: 280px;
  }
  
  /* Better spacing on mobile */
  .space-y-3 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.75rem;
  }
  
  /* Improve card hover effects on mobile */
  .group:hover {
    transform: scale(1.02);
  }
  
  /* Better text sizing for mobile */
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  /* Enhanced touch targets on mobile */
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Larger range slider thumb for mobile */
  .range-slider::-webkit-slider-thumb {
    height: 28px;
    width: 28px;
    margin-top: -10px;
  }
  
  .range-slider::-moz-range-thumb {
    height: 28px;
    width: 28px;
  }
}
</style>