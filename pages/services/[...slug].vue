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

    <!-- Loading State -->
    <div v-if="loading" class="relative z-10 pt-16 flex items-center justify-center min-h-screen">
      <div class="text-center backdrop-blur-sm bg-white/80 rounded-2xl p-8 shadow-xl">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading service...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative z-10 pt-16 flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-4 backdrop-blur-sm bg-white/80 rounded-2xl p-8 shadow-xl">
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
          to="/"
          class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>

    <!-- Service Detail -->
    <div v-else-if="service" class="relative z-10 pt-16">
      <!-- Breadcrumb -->
      <div class="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex py-4 text-sm" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="text-gray-500 hover:text-blue-600 transition-colors">
                  Home
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <NuxtLink to="/search" class="text-gray-500 hover:text-blue-600 transition-colors">
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
      <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <!-- Left Column - Service Details -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Service Images -->
              <div class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div v-if="service.service_images?.length || service.primary_image" class="relative">
                  <!-- Main Image -->
                  <div class="aspect-w-16 aspect-h-9">
                    <img
                      :src="mainImage?.url || mainImage?.cdn_url || service.primary_image?.url || service.primary_image?.cdn_url || (service.service_images?.[0]?.url || service.service_images?.[0]?.cdn_url)"
                      :alt="mainImage?.alt_text || service.primary_image?.alt || service.title"
                      class="w-full h-96 object-cover"
                      @error="handleImageError"
                    >
                  </div>
                  
                  <!-- Image Gallery -->
                  <div v-if="service.service_images?.length > 1" class="flex gap-2 p-4 overflow-x-auto">
                    <button
                      v-for="(image, index) in service.service_images"
                      :key="image.id || index"
                      @click="setMainImage(image)"
                      class="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200"
                      :class="(image.id === mainImage?.id) || (index === 0 && !mainImage) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-white/30 hover:border-blue-300'"
                    >
                      <img
                        :src="image.url || image.cdn_url"
                        :alt="image.alt_text || `${service.title} ${index + 1}`"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      >
                    </button>
                  </div>
                </div>
                <div v-else class="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center h-96">
                  <div class="text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-lg font-medium">No images available</p>
                  </div>
                </div>
              </div>

              <!-- Service Information -->
              <div class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6">
                <!-- Title and Provider -->
                <div class="mb-6">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ service.title }}</h1>
                      <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {{ service.category?.name }}
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                          {{ service.location_display }}
                        </div>
                        <div v-if="service.duration_minutes" class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                          </svg>
                          {{ service.duration_minutes }} minutes
                        </div>
                        <div v-if="service.price_type" class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M12 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0 2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 4c0-1.105.895-2 2-2h10c1.105 0 2 .895 2 2v2H5v-2z"/>
                          </svg>
                          {{ service.price_type }} pricing
                        </div>
                      </div>
                      <!-- Status and Featured Badges -->
                      <div class="flex items-center space-x-2 mb-4">
                        <span v-if="service.status === 'active'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <span v-if="service.is_featured" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Featured
                        </span>
                        <span v-if="service.instant_booking" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Instant Booking
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <div v-if="service.average_rating > 0" class="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-sm font-medium text-gray-900">{{ service.average_rating }}</span>
                        <span class="text-xs text-gray-500 ml-1">({{ service.review_count }})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Provider Info -->
                <div class="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                  <img
                    :src="service.user?.avatar_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNCA0IEM2LjIxIDQgOCA1Ljc5IDggOFMxMC4yMSAxMiAxMiAxMloiIGZpbGw9IiM5Q0EzQUYiLz4KPHN0cm9rZSBkPSJNMTIgMTRWMjJIM2MwIDIuNzYgNC40NSA1IDkgNVM5Ljc5IDEyIDEyIDEyWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+Cjwvc3ZnPgo='"
                    :alt="service.user?.name"
                    class="w-12 h-12 rounded-full mr-4 object-cover"
                  >
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900">{{ service.user?.name }}</h3>
                    <p class="text-sm text-gray-600">{{ service.user?.business_name || 'Service Provider' }}</p>
                    <div v-if="service.user?.created_at" class="text-xs text-gray-500 mt-1">
                      Member since {{ new Date(service.user.created_at).getFullYear() }}
                    </div>
                  </div>
                  <div v-if="service.user?.slug" class="ml-4">
                    <NuxtLink :to="`/providers/${service.user.slug}`" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Profile
                    </NuxtLink>
                  </div>
                </div>

                <!-- Short Description -->
                <div v-if="service.short_description" class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Quick Overview</h3>
                  <p class="text-gray-700 leading-relaxed font-medium">{{ service.short_description }}</p>
                </div>

                <!-- Full Description -->
                <div v-if="service.description && service.description !== service.short_description" class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">About this service</h3>
                  <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ service.description }}</p>
                </div>

                <!-- Service Details Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <!-- Duration -->
                  <div v-if="service.duration_minutes" class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <div class="font-medium text-gray-900">Duration</div>
                        <div class="text-sm text-gray-600">{{ service.duration_minutes }} minutes</div>
                      </div>
                    </div>
                  </div>

                  <!-- Location Type -->
                  <div class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <div class="font-medium text-gray-900">Service Type</div>
                        <div class="text-sm text-gray-600 capitalize">{{ service.location_type }} service</div>
                      </div>
                    </div>
                  </div>

                  <!-- Advance Booking -->
                  <div v-if="service.advance_booking_days" class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <div class="font-medium text-gray-900">Advance Booking</div>
                        <div class="text-sm text-gray-600">{{ service.advance_booking_days }} days minimum</div>
                      </div>
                    </div>
                  </div>

                  <!-- Cancellation Policy -->
                  <div v-if="service.cancellation_hours" class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-center">
                      <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <div class="font-medium text-gray-900">Cancellation</div>
                        <div class="text-sm text-gray-600">{{ service.cancellation_hours }} hours notice required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Address -->
                <div v-if="service.address && service.location_type !== 'online'" class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Service Location</h3>
                  <div class="bg-gray-50 rounded-xl p-4">
                    <div class="flex items-start">
                      <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <div v-if="service.address.street" class="text-gray-900">{{ service.address.street }}</div>
                        <div class="text-gray-600">
                          {{ service.address.city }}<span v-if="service.address.province">, {{ service.address.province }}</span>
                          <span v-if="service.address.postal_code"> {{ service.address.postal_code }}</span>
                        </div>
                        <div v-if="service.address.country" class="text-gray-500 text-sm">{{ service.address.country }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Requirements -->
                <div v-if="service.requirements?.length" class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                  <ul class="space-y-2">
                    <li v-for="requirement in service.requirements" :key="requirement" class="flex items-center text-gray-700">
                      <svg class="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      {{ requirement }}
                    </li>
                  </ul>
                </div>

                <!-- Tags -->
                <div v-if="service.tags?.length" class="mb-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tag in service.tags" 
                      :key="tag"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Meta Information -->
                <div v-if="service.created_at" class="border-t border-gray-200 pt-4">
                  <div class="text-sm text-gray-500">
                    Service listed on {{ new Date(service.created_at).toLocaleDateString() }}
                    <span v-if="service.updated_at && service.updated_at !== service.created_at">
                      • Last updated {{ new Date(service.updated_at).toLocaleDateString() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Booking Card -->
            <div class="lg:col-span-1 mt-6 lg:mt-0">
              <div class="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-white/20 p-6 sticky top-24">
                <!-- Price -->
                <div class="mb-6">
                  <div class="flex items-baseline">
                    <span class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {{ service.formatted_price }}
                    </span>
                    <span v-if="service.price_type === 'hourly'" class="text-gray-500 ml-1">/hour</span>
                    <span v-else-if="service.price_type === 'per_project'" class="text-gray-500 ml-1">/project</span>
                    <span v-else-if="service.price_type === 'negotiable'" class="text-gray-500 ml-2 text-sm">negotiable</span>
                  </div>
                  
                  <!-- Price Range Details -->
                  <div v-if="service.base_price && service.max_price && service.base_price !== service.max_price" class="mt-2">
                    <div class="text-sm text-gray-600">
                      Starting from R{{ service.base_price }} up to R{{ service.max_price }}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      Final price may vary based on requirements
                    </div>
                  </div>
                  
                  <!-- Currency -->
                  <div v-if="service.currency && service.currency !== 'ZAR'" class="text-xs text-gray-500 mt-1">
                    Prices in {{ service.currency }}
                  </div>
                  
                  <div class="flex items-center text-sm text-gray-600 mt-2">
                    <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span v-if="service.instant_booking">Instant booking available</span>
                    <span v-else>Quick response time</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-3">
                  <button
                    @click="handleBookNow"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Book Now
                  </button>
                  <button
                    class="w-full border border-white/30 backdrop-blur-sm bg-white/20 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
                  >
                    Contact Provider
                  </button>
                  <button
                    class="w-full border border-white/30 backdrop-blur-sm bg-white/20 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Favorites
                  </button>
                </div>

                <!-- Safety Tip -->
                <div class="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                  <div class="flex">
                    <svg class="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <h4 class="text-sm font-medium text-amber-800">Safety Tip</h4>
                      <p class="text-sm text-amber-700 mt-1">Always communicate and pay through our platform for your protection.</p>
                    </div>
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
  layout: false // Don't use any layout since we're implementing our own
})

// Composables
const { fetchService, service, loading, error } = useServices()
const route = useRoute()

// State
const mainImage = ref(null)

// Computed
const fullSlug = computed(() => {
  const slugArray = route.params.slug as string[]
  return slugArray.join('/')
})

// Methods
const setMainImage = (image: any) => {
  mainImage.value = image
}

const handleBookNow = async () => {
  if (service.value) {
    const bookingUrl = `/services/${fullSlug.value}/book`
    console.log('Navigating to booking page:', bookingUrl)
    console.log('Full slug:', fullSlug.value)
    console.log('Service data:', service.value)
    
    try {
      await navigateTo(bookingUrl)
      console.log('Navigation successful')
    } catch (error) {
      console.error('Navigation failed:', error)
    }
  } else {
    console.error('No service data available for booking')
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Use inline SVG data URL to avoid network requests
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo='
}

// Head
useHead({
  title: computed(() => service.value ? `${service.value.title} - ORDO` : 'Service - ORDO'),
  meta: [
    {
      name: 'description',
      content: computed(() => service.value?.short_description || service.value?.description || 'Professional service on ORDO')
    },
    {
      property: 'og:title',
      content: computed(() => service.value ? `${service.value.title} - ORDO` : 'Service - ORDO')
    },
    {
      property: 'og:description',
      content: computed(() => service.value?.short_description || service.value?.description || 'Professional service on ORDO')
    },
    {
      property: 'og:image',
      content: computed(() => service.value?.primary_image?.url || '')
    }
  ]
})

// Fetch service on mount
onMounted(async () => {
  try {
    console.log('Fetching service with slug:', fullSlug.value)
    await fetchService(fullSlug.value)
    
    console.log('Service data:', service.value)
    
    // Set first image as main image
    if (service.value?.service_images?.length) {
      const primaryImage = service.value.service_images.find(img => img.is_primary)
      mainImage.value = primaryImage || service.value.service_images[0]
      console.log('Main image set:', mainImage.value)
    }
  } catch (err) {
    console.error('Failed to fetch service:', err)
  }
})
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
</style>