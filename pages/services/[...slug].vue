<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading service...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
        <p class="text-sm text-gray-600 mb-4">
          The service you're looking for doesn't exist or is no longer available.
        </p>
        <NuxtLink
          to="/services"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse Services
        </NuxtLink>
      </div>
    </div>

    <!-- Service Detail -->
    <div v-else-if="service" class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Breadcrumb -->
          <nav class="flex py-4 text-sm" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">
                  Home
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <NuxtLink to="/services" class="text-gray-500 hover:text-gray-700">
                    Services
                  </NuxtLink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-900 font-medium">{{ service.title }}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <!-- Left Column - Service Details -->
          <div class="lg:col-span-2">
            <!-- Service Images -->
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div v-if="service.service_images?.length" class="relative">
                <!-- Main Image -->
                <div class="aspect-w-16 aspect-h-9">
                  <img
                    :src="mainImage.url"
                    :alt="service.title"
                    class="w-full h-96 object-cover"
                  >
                </div>
                
                <!-- Image Gallery -->
                <div v-if="service.service_images.length > 1" class="flex gap-2 p-4 overflow-x-auto">
                  <button
                    v-for="(image, index) in service.service_images"
                    :key="image.id"
                    @click="setMainImage(image)"
                    class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors"
                    :class="image.id === mainImage.id ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'"
                  >
                    <img
                      :src="getOptimizedImageUrl(image, 'thumb')"
                      :alt="`${service.title} ${index + 1}`"
                      class="w-full h-full object-cover"
                    >
                  </button>
                </div>
              </div>
              
              <!-- Placeholder if no images -->
              <div v-else class="w-full h-96 bg-gray-200 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <svg class="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>No images available</p>
                </div>
              </div>
            </div>

            <!-- Service Information -->
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ service.title }}</h1>
                  <div class="flex items-center gap-4 text-sm text-gray-600">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {{ service.location_display }}
                    </div>
                    <div v-if="service.category" class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {{ service.category.name }}
                    </div>
                  </div>
                </div>
                
                <!-- Service Rating -->
                <div v-if="service.average_rating > 0" class="text-right">
                  <div class="flex items-center justify-end mb-1">
                    <div class="flex items-center">
                      <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= service.average_rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="ml-2 text-sm font-medium text-gray-900">{{ service.average_rating.toFixed(1) }}</span>
                  </div>
                  <p class="text-xs text-gray-500">{{ service.review_count }} {{ service.review_count === 1 ? 'review' : 'reviews' }}</p>
                </div>
              </div>

              <!-- Description -->
              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed">{{ service.description }}</p>
              </div>

              <!-- Tags -->
              <div v-if="service.tags?.length" class="mt-6">
                <h3 class="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in service.tags"
                    :key="tag"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Requirements -->
              <div v-if="service.requirements?.length" class="mt-6">
                <h3 class="text-sm font-medium text-gray-900 mb-2">What I need from you</h3>
                <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li v-for="requirement in service.requirements" :key="requirement">
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column - Booking Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <!-- Provider Info -->
              <div class="flex items-center mb-6">
                <img
                  :src="service.user?.avatar_url || '/default-avatar.png'"
                  :alt="service.user?.name"
                  class="w-12 h-12 rounded-full object-cover mr-4"
                >
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ service.user?.business_name || service.user?.name }}</h3>
                  <p class="text-sm text-gray-600">Service Provider</p>
                </div>
              </div>

              <!-- Pricing -->
              <div class="mb-6">
                <div class="text-3xl font-bold text-gray-900 mb-1">
                  {{ service.formatted_price }}
                </div>
                <p v-if="service.price_type === 'hourly'" class="text-sm text-gray-600">per hour</p>
                <p v-else-if="service.price_type === 'fixed'" class="text-sm text-gray-600">fixed price</p>
                <p v-else class="text-sm text-gray-600">price negotiable</p>
                
                <div v-if="service.duration_minutes" class="text-sm text-gray-600 mt-1">
                  Duration: {{ Math.floor(service.duration_minutes / 60) }}h {{ service.duration_minutes % 60 }}m
                </div>
              </div>

              <!-- Service Features -->
              <div class="mb-6 space-y-2">
                <div v-if="service.instant_booking" class="flex items-center text-sm text-green-600">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Instant booking available
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick response time
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="space-y-3">
                <button
                  class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Book Now
                </button>
                <button
                  class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Contact Provider
                </button>
                <button
                  class="w-full text-gray-600 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                >
                  Add to Favorites
                </button>
              </div>

              <!-- Safety Note -->
              <div class="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-yellow-800">Safety Tip</p>
                    <p class="text-xs text-yellow-700 mt-1">Always communicate and pay through our platform for your protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  layout: 'default'
})

// Composables
const { fetchService, service, loading, error, getOptimizedImageUrl } = useServices()
const route = useRoute()

// State
const mainImage = ref(null)

// Computed
const fullSlug = computed(() => {
  const slugArray = route.params.slug as string[]
  return slugArray.join('/')
})

// Head
useHead({
  title: computed(() => service.value ? `${service.value.title} - ORDO` : 'Service - ORDO'),
  meta: [
    {
      name: 'description',
      content: computed(() => service.value?.short_description || service.value?.description || 'Professional service on ORDO')
    }
  ]
})

// Methods
const setMainImage = (image: any) => {
  mainImage.value = image
}

// Fetch service on mount
onMounted(async () => {
  try {
    await fetchService(fullSlug.value)
    
    // Set first image as main image
    if (service.value?.service_images?.length) {
      const primaryImage = service.value.service_images.find(img => img.is_primary)
      mainImage.value = primaryImage || service.value.service_images[0]
    }
  } catch (err) {
    console.error('Failed to fetch service:', err)
  }
})
</script>