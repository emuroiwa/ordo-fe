<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Favorites
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Services and providers you've saved for later
          </p>
        </div>
        <div class="mt-4 flex md:ml-4 md:mt-0">
          <NuxtLink
            to="/dashboard/search"
            class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Find More Services
          </NuxtLink>
        </div>
      </div>

      <!-- Filters and View Toggle -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <div class="p-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <!-- Filters -->
            <div class="flex flex-wrap items-center space-x-4">
              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">Category:</label>
                <select
                  v-model="selectedCategory"
                  class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  @change="filterFavorites"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in categories" :key="category.slug" :value="category.slug">
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="flex items-center space-x-2">
                <label class="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  v-model="sortBy"
                  class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  @change="sortFavorites"
                >
                  <option value="date_added">Recently Added</option>
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <button
                v-if="selectedCategory || sortBy !== 'date_added'"
                @click="clearFilters"
                class="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear filters
              </button>
            </div>

            <!-- View Toggle and Count -->
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">
                {{ filteredFavorites.length }} favorite{{ filteredFavorites.length !== 1 ? 's' : '' }}
              </span>
              
              <div class="flex items-center space-x-1 border border-gray-300 rounded-md">
                <button
                  :class="[
                    'p-2 rounded-l-md',
                    viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  ]"
                  @click="viewMode = 'grid'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  :class="[
                    'p-2 rounded-r-md',
                    viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  ]"
                  @click="viewMode = 'list'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Loading your favorites...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading favorites</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadFavorites"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Favorites Content -->
      <div v-else-if="filteredFavorites.length > 0">
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="favorite in filteredFavorites"
            :key="favorite.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div class="relative">
              <img
                :src="favorite.service.primary_image"
                :alt="favorite.service.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ favorite.service.category_name }}
                </span>
              </div>

              <!-- Remove from Favorites -->
              <button
                @click="removeFavorite(favorite.id)"
                class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                :disabled="removingFavorites.includes(favorite.id)"
              >
                <svg 
                  :class="[
                    'w-4 h-4 transition-colors',
                    removingFavorites.includes(favorite.id) ? 'text-gray-400' : 'text-red-500 hover:text-red-600'
                  ]"
                  fill="currentColor" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <!-- Date Added -->
              <div class="absolute bottom-3 left-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-600">
                  Added {{ formatDateAdded(favorite.created_at) }}
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-1 cursor-pointer hover:text-blue-600" @click="viewService(favorite.service)">
                  {{ favorite.service.title }}
                </h3>
                <span class="text-lg font-bold text-gray-900 ml-2">{{ formatCurrency(favorite.service.base_price) }}</span>
              </div>
              
              <p class="text-sm text-gray-600 mb-2">{{ favorite.service.provider_name }}</p>
              
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ favorite.service.location_display || 'Location not specified' }}
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ favorite.service.average_rating || 'New' }}</span>
                    <span class="text-sm text-gray-500 ml-1">({{ favorite.service.review_count || 0 }})</span>
                  </div>
                </div>
                <button
                  @click="bookService(favorite.service)"
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
            v-for="favorite in filteredFavorites"
            :key="favorite.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center space-x-4">
              <img
                :src="favorite.service.primary_image"
                :alt="favorite.service.title"
                class="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80"
                @click="viewService(favorite.service)"
              />
              
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600" @click="viewService(favorite.service)">
                      {{ favorite.service.title }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ favorite.service.provider_name }}</p>
                    <p class="text-sm text-gray-500">{{ favorite.service.category_name }}</p>
                    <p class="text-xs text-gray-500 mt-1">Added {{ formatDateAdded(favorite.created_at) }}</p>
                  </div>
                  
                  <div class="text-right ml-4 flex-shrink-0">
                    <div class="text-xl font-bold text-gray-900">{{ formatCurrency(favorite.service.base_price) }}</div>
                    <div class="flex items-center mt-1">
                      <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm text-gray-600">{{ favorite.service.average_rating || 'New' }}</span>
                      <span class="text-sm text-gray-500 ml-1">({{ favorite.service.review_count || 0 }})</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-3 flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ favorite.service.location_display || 'Location not specified' }}
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button
                      @click="removeFavorite(favorite.id)"
                      :disabled="removingFavorites.includes(favorite.id)"
                      class="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      @click="bookService(favorite.service)"
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
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
        <p class="text-gray-600 mb-4">Start exploring services and save your favorites for easy access later.</p>
        <NuxtLink
          to="/dashboard/search"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Services
        </NuxtLink>
      </div>

      <!-- Bulk Actions (when favorites selected) -->
      <div v-if="selectedFavorites.length > 0" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">{{ selectedFavorites.length }} selected</span>
          <button
            @click="bulkRemoveFavorites"
            class="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Remove Selected
          </button>
          <button
            @click="selectedFavorites = []"
            class="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Set layout and middleware
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { fetchCategories, categories } = useServices()
const { 
  favorites, 
  loading, 
  error, 
  fetchFavorites, 
  removeFavorite: removeSingleFavorite, 
  bulkRemoveFavorites: bulkRemove 
} = useFavorites()

// State
const selectedCategory = ref('')
const sortBy = ref('date_added')
const viewMode = ref('grid')
const selectedFavorites = ref([])
const removingFavorites = ref([])

// Computed
const filteredFavorites = computed(() => {
  let filtered = [...favorites.value]

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(favorite => 
      favorite.service.category?.slug === selectedCategory.value
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'name':
      filtered.sort((a, b) => a.service.title.localeCompare(b.service.title))
      break
    case 'price':
      filtered.sort((a, b) => a.service.base_price - b.service.base_price)
      break
    case 'rating':
      filtered.sort((a, b) => (b.service.average_rating || 0) - (a.service.average_rating || 0))
      break
    case 'date_added':
    default:
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }

  return filtered.map(favorite => ({
    ...favorite,
    service: {
      ...favorite.service,
      primary_image: favorite.service.primary_image?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      provider_name: favorite.service.user?.business_name || favorite.service.user?.name || 'Provider',
      category_name: favorite.service.category?.name || 'Service'
    }
  }))
})

// Methods
const loadFavorites = fetchFavorites

const filterFavorites = () => {
  // Filtering is handled by computed property
}

const sortFavorites = () => {
  // Sorting is handled by computed property
}

const clearFilters = () => {
  selectedCategory.value = ''
  sortBy.value = 'date_added'
}

const removeFavorite = async (favoriteId: string) => {
  if (removingFavorites.value.includes(favoriteId)) return

  try {
    removingFavorites.value.push(favoriteId)
    await removeSingleFavorite(favoriteId)
  } catch (error) {
    console.error('Failed to remove favorite:', error)
  } finally {
    removingFavorites.value = removingFavorites.value.filter(id => id !== favoriteId)
  }
}

const bulkRemoveFavorites = async () => {
  if (selectedFavorites.value.length === 0) return

  try {
    await bulkRemove(selectedFavorites.value)
    selectedFavorites.value = []
  } catch (error) {
    console.error('Failed to remove favorites:', error)
  }
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount)
}

const formatDateAdded = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'today'
  if (diffDays === 2) return 'yesterday'
  if (diffDays <= 7) return `${diffDays} days ago`
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`
  return date.toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })
}

// Initialize
onMounted(async () => {
  try {
    await Promise.all([
      fetchCategories().catch(() => {
        // If categories fail to load, set some mock categories
        categories.value = [
          { id: 'cat_1', name: 'Beauty & Hair', slug: 'beauty-hair' },
          { id: 'cat_2', name: 'Health & Wellness', slug: 'health-wellness' },
          { id: 'cat_3', name: 'Fitness & Training', slug: 'fitness-training' },
          { id: 'cat_4', name: 'Photography & Media', slug: 'photography-media' }
        ]
      }),
      fetchFavorites().catch(() => {
        // Error handling is already in the composable
        console.error('Failed to load favorites')
      })
    ])
  } catch (error) {
    console.error('Failed to initialize favorites page:', error)
  }
})

// Set page title
useHead({
  title: 'My Favorites - ORDO'
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