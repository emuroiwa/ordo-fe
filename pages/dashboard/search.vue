<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Search Services
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Find and book services from verified providers
          </p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Search Input -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search services, providers, or skills..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  @input="debouncedSearch"
                />
              </div>
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                v-model="selectedCategory"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                @change="handleFilterChange"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.slug">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Location Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                v-model="selectedLocation"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                @change="handleFilterChange"
              >
                <option value="">All Locations</option>
                <option value="johannesburg">Johannesburg</option>
                <option value="cape-town">Cape Town</option>
                <option value="durban">Durban</option>
                <option value="pretoria">Pretoria</option>
                <option value="port-elizabeth">Port Elizabeth</option>
                <option value="bloemfontein">Bloemfontein</option>
              </select>
            </div>
          </div>

          <!-- Advanced Filters -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Price Range -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: R{{ priceRange[0] }} - R{{ priceRange[1] }}+
                </label>
                <div class="flex space-x-2">
                  <input
                    v-model="priceRange[0]"
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    class="flex-1"
                    @input="handleFilterChange"
                  />
                  <input
                    v-model="priceRange[1]"
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    class="flex-1"
                    @input="handleFilterChange"
                  />
                </div>
              </div>

              <!-- Sort By -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  v-model="sortBy"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  @change="handleFilterChange"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <!-- Quick Filters -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="filter in quickFilters"
                    :key="filter.value"
                    :class="[
                      'px-3 py-1 text-xs rounded-full border transition-colors',
                      selectedQuickFilters.includes(filter.value)
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    ]"
                    @click="toggleQuickFilter(filter.value)"
                  >
                    {{ filter.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Clear Filters -->
            <div class="mt-4 flex justify-end">
              <button
                @click="clearFilters"
                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <p class="text-sm text-gray-600">
            <span v-if="loading">Searching...</span>
            <span v-else>{{ filteredServices.length }} service{{ filteredServices.length !== 1 ? 's' : '' }} found</span>
          </p>
        </div>
        
        <!-- View Toggle -->
        <div class="flex items-center space-x-2">
          <button
            :class="[
              'p-2 rounded-md',
              viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
            ]"
            @click="viewMode = 'grid'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            :class="[
              'p-2 rounded-md',
              viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
            ]"
            @click="viewMode = 'list'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Searching services...</p>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-else-if="filteredServices.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            @click="viewService(service)"
          >
            <div class="relative">
              <img
                :src="service.primary_image"
                :alt="service.title"
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ service.category_name }}
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <button
                  @click.stop="handleToggleFavorite(service)"
                  :disabled="favoritesLoading"
                  class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <svg 
                    :class="[
                      'w-4 h-4',
                      service.is_favorited ? 'text-red-500 fill-current' : 'text-gray-400'
                    ]"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ service.title }}</h3>
                <span class="text-lg font-bold text-gray-900 ml-2">{{ formatCurrency(service.base_price) }}</span>
              </div>
              
              <p class="text-sm text-gray-600 mb-2">{{ service.provider_name }}</p>
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ service.location_display || 'Location not specified' }}
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ service.average_rating || 'New' }}</span>
                    <span class="text-sm text-gray-500 ml-1">({{ service.review_count || 0 }})</span>
                  </div>
                </div>
                <button
                  @click.stop="bookService(service)"
                  class="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="service in filteredServices"
            :key="service.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            @click="viewService(service)"
          >
            <div class="flex items-center space-x-4">
              <img
                :src="service.primary_image"
                :alt="service.title"
                class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900">{{ service.title }}</h3>
                    <p class="text-sm text-gray-600">{{ service.provider_name }}</p>
                    <p class="text-sm text-gray-500">{{ service.category_name }}</p>
                  </div>
                  
                  <div class="text-right ml-4">
                    <div class="text-xl font-bold text-gray-900">{{ formatCurrency(service.base_price) }}</div>
                    <div class="flex items-center mt-1">
                      <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ service.average_rating || 'New' }}</span>
                      <span class="text-sm text-gray-500 ml-1">({{ service.review_count || 0 }})</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-2 flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ service.location_display || 'Location not specified' }}
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button
                      @click.stop="handleToggleFavorite(service)"
                      :disabled="favoritesLoading"
                      class="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <svg 
                        :class="[
                          'w-5 h-5',
                          service.is_favorited ? 'text-red-500 fill-current' : 'text-gray-400'
                        ]"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      @click.stop="bookService(service)"
                      class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No services found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search criteria or filters to find more results.</p>
        <button
          @click="clearFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Set layout and middleware
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const route = useRoute()
const { fetchServices, fetchCategories, categories, loading } = useServices()
const { toggleFavorite, isFavorited, loading: favoritesLoading } = useFavorites()

// State
const services = ref([])
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedLocation = ref('')
const priceRange = ref([0, 5000])
const sortBy = ref('relevance')
const selectedQuickFilters = ref([])
const viewMode = ref('grid')

// Quick filters
const quickFilters = [
  { label: 'Available Today', value: 'available_today' },
  { label: 'Highly Rated', value: 'highly_rated' },
  { label: 'New Services', value: 'new_services' },
  { label: 'Instant Booking', value: 'instant_booking' },
  { label: 'Weekend Available', value: 'weekend_available' }
]

// Search debounce
let searchTimeout: NodeJS.Timeout | null = null
const debouncedSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadServices()
  }, 500)
}

// Load data
const loadServices = async () => {
  try {
    const params: any = {
      per_page: 50,
      sort: sortBy.value
    }

    if (searchQuery.value) {
      params.q = searchQuery.value
    }

    if (selectedCategory.value) {
      params.category = selectedCategory.value
    }

    if (selectedLocation.value) {
      params.location = selectedLocation.value
    }

    if (priceRange.value[0] > 0 || priceRange.value[1] < 5000) {
      params.price_min = priceRange.value[0]
      params.price_max = priceRange.value[1]
    }

    const response = await fetchServices(params)
    services.value = response.data || []
  } catch (error) {
    console.error('Error loading services:', error)
    services.value = []
  }
}

// Computed
const filteredServices = computed(() => {
  let filtered = [...services.value]

  // Apply quick filters
  if (selectedQuickFilters.value.includes('highly_rated')) {
    filtered = filtered.filter(service => (service.average_rating || 0) >= 4.5)
  }

  if (selectedQuickFilters.value.includes('new_services')) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    filtered = filtered.filter(service => new Date(service.created_at) > thirtyDaysAgo)
  }

  if (selectedQuickFilters.value.includes('instant_booking')) {
    filtered = filtered.filter(service => service.instant_booking)
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'price_low':
      filtered.sort((a, b) => a.base_price - b.base_price)
      break
    case 'price_high':
      filtered.sort((a, b) => b.base_price - a.base_price)
      break
    case 'rating':
      filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
      break
    case 'reviews':
      filtered.sort((a, b) => (b.review_count || 0) - (a.review_count || 0))
      break
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }

  return filtered.map(service => ({
    ...service,
    primary_image: service.primary_image?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    provider_name: service.user?.name || 'Provider',
    category_name: service.category?.name || 'Service',
    is_favorited: isFavorited(service.id)
  }))
})

// Methods
const handleFilterChange = () => {
  loadServices()
}

const toggleQuickFilter = (filter: string) => {
  const index = selectedQuickFilters.value.indexOf(filter)
  if (index > -1) {
    selectedQuickFilters.value.splice(index, 1)
  } else {
    selectedQuickFilters.value.push(filter)
  }
  loadServices()
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedLocation.value = ''
  priceRange.value = [0, 5000]
  sortBy.value = 'relevance'
  selectedQuickFilters.value = []
  loadServices()
}

const viewService = (service: any) => {
  if (service.full_slug) {
    navigateTo(`/services/${service.full_slug}`)
  } else {
    navigateTo(`/services/${service.id}`)
  }
}

const bookService = (service: any) => {
  if (service.full_slug) {
    navigateTo(`/services/${service.full_slug}?book=true`)
  } else {
    navigateTo(`/services/${service.id}?book=true`)
  }
}

const handleToggleFavorite = async (service: any) => {
  if (favoritesLoading.value) return
  
  try {
    await toggleFavorite(service.id)
    // Update local state for immediate UI feedback
    service.is_favorited = !service.is_favorited
  } catch (error) {
    console.error('Failed to toggle favorite:', error)
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount)
}

// Initialize
onMounted(async () => {
  // Set initial values from route query
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
  if (route.query.location) {
    selectedLocation.value = route.query.location as string
  }

  // Load categories and services
  await fetchCategories()
  await loadServices()
})

// Watch for route changes
watch(() => route.query, (newQuery) => {
  if (newQuery.search && newQuery.search !== searchQuery.value) {
    searchQuery.value = newQuery.search as string
    loadServices()
  }
}, { deep: true })

// Set page title
useHead({
  title: 'Search Services - ORDO'
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>