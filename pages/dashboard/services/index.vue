<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Customer View: Browse Services -->
      <div v-if="currentRole === 'customer'">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Find Services</h2>
            <p class="text-gray-600">Discover services near you</p>
          </div>
          <div class="flex items-center space-x-4">
            <button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              Map View
            </button>
          </div>
        </div>

        <!-- Mobile-First Filters -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <!-- Mobile: Collapsible Filters -->
          <div class="md:hidden">
            <button 
              @click="showMobileFilters = !showMobileFilters"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4 touch-target"
            >
              <span class="font-medium text-gray-900">Filters</span>
              <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': showMobileFilters }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div v-show="showMobileFilters" class="space-y-4">
              <!-- Mobile Category Filter -->
              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Category</label>
                <div class="space-y-2">
                  <button
                    @click="filters.category = ''"
                    :class="[
                      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 touch-target',
                      filters.category === '' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">All Categories</span>
                      <div v-if="filters.category === ''" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    v-for="category in categories"
                    :key="category.id"
                    @click="filters.category = category.slug"
                    :class="[
                      'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 touch-target',
                      filters.category === category.slug 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-medium">{{ category.name }}</span>
                      <div v-if="filters.category === category.slug" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              
              <!-- Mobile Price Range -->
              <div>
                <label class="block text-base font-medium text-gray-700 mb-3">Price Range</label>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="price in [['', 'Any Price'], ['0-50', 'R0 - R50'], ['50-100', 'R50 - R100'], ['100-200', 'R100 - R200'], ['200+', 'R200+']]"
                    :key="price[0]"
                    @click="filters.priceRange = price[0]"
                    :class="[
                      'p-3 text-center rounded-xl border-2 transition-all duration-200 touch-target',
                      filters.priceRange === price[0] 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    {{ price[1] }}
                  </button>
                </div>
              </div>
              
              <!-- Mobile Distance & Rating -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                  <select v-model="filters.distance" class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 touch-target">
                    <option value="">Any</option>
                    <option value="5">5km</option>
                    <option value="10">10km</option>
                    <option value="25">25km</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select v-model="filters.rating" class="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 touch-target">
                    <option value="">Any</option>
                    <option value="4">4+</option>
                    <option value="4.5">4.5+</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Desktop: Traditional Layout -->
          <div class="hidden md:grid md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="filters.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" :disabled="loading">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.slug">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select v-model="filters.priceRange" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Any Price</option>
                <option value="0-50">R0 - R50</option>
                <option value="50-100">R50 - R100</option>
                <option value="100-200">R100 - R200</option>
                <option value="200+">R200+</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Distance</label>
              <select v-model="filters.distance" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Any Distance</option>
                <option value="5">Within 5km</option>
                <option value="10">Within 10km</option>
                <option value="25">Within 25km</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select v-model="filters.rating" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
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
            <p class="text-gray-600">Loading services...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p class="text-lg font-medium">Error loading services</p>
            <p class="text-sm text-gray-600">{{ error }}</p>
          </div>
        </div>

        <!-- Mobile-First Services Grid -->
        <div v-else-if="services.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div 
            v-for="service in services" 
            :key="service.id" 
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 active:scale-95 sm:hover:scale-[1.02]"
          >
            <div class="relative">
              <img 
                :src="service.primary_image?.url || '/placeholder-service.jpg'" 
                :alt="service.title" 
                class="w-full h-44 sm:h-48 object-cover"
              >
              <button class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all touch-target">
                <svg class="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
            
            <div class="p-4 sm:p-5">
              <div class="mb-3">
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{{ service.title }}</h3>
                <p class="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">{{ service.short_description || service.description }}</p>
              </div>
              
              <!-- Mobile: Simplified info layout -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <div class="flex items-center space-x-3">
                  <div class="flex items-center">
                    <span class="text-yellow-400 text-lg">★</span>
                    <span class="text-sm text-gray-600 ml-1 font-medium">{{ service.average_rating }}</span>
                    <span class="text-xs text-gray-500 ml-1">({{ service.review_count }})</span>
                  </div>
                  <div class="text-xs text-gray-500 truncate">{{ service.location_display }}</div>
                </div>
                <div class="text-xl sm:text-2xl font-bold text-gray-900">{{ service.formatted_price }}</div>
              </div>
              
              <NuxtLink 
                :to="`/services/${service.full_slug}`" 
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 touch-target text-center block"
              >
                Book Now
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No services found</h3>
          <p class="text-gray-600">Try adjusting your filters to find more services.</p>
        </div>
      </div>

      <!-- Vendor View: My Services -->
      <div v-else>
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">My Services</h2>
            <p class="text-gray-600">Manage your service offerings</p>
          </div>
          <NuxtLink to="/dashboard/services/create" class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Service
          </NuxtLink>
        </div>

        <!-- Mobile-First Service Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <p class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total Services</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ myServices.length }}</p>
            </div>
          </div>
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Active Services</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ activeServices }}</p>
            </div>
          </div>
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <p class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Avg Rating</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ averageRating }}</p>
            </div>
          </div>
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-3 sm:mb-4">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <p class="text-xs sm:text-sm font-medium text-gray-500 mb-1">Total Bookings</p>
              <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ totalBookings }}</p>
            </div>
          </div>
        </div>

        <!-- My Services List -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Your Services</h3>
          </div>
          
          <!-- Loading State -->
          <div v-if="myServicesLoading || loading" class="flex items-center justify-center py-12">
            <div class="text-center">
              <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Loading your services...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="myServicesError || error" class="text-center py-12">
            <div class="text-red-600 mb-4">
              <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p class="text-lg font-medium">Error loading services</p>
              <p class="text-sm text-gray-600">{{ myServicesError || error }}</p>
            </div>
          </div>

          <!-- Mobile-First Services List -->
          <div v-else-if="myServices.length > 0">
            <!-- Mobile: Card Layout -->
            <div class="md:hidden space-y-4 p-4">
              <div 
                v-for="service in myServices" 
                :key="service.id"
                class="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <div class="flex items-start space-x-4 mb-4">
                  <img 
                    class="h-16 w-16 rounded-xl object-cover flex-shrink-0" 
                    :src="service.primary_image?.url || '/placeholder-service.jpg'" 
                    :alt="service.title"
                  >
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 mb-1 truncate">{{ service.title }}</h4>
                    <p class="text-sm text-gray-600 line-clamp-2 mb-2">{{ service.short_description || service.description }}</p>
                    <div class="flex items-center space-x-3 text-sm">
                      <span class="text-gray-500">{{ service.category?.name }}</span>
                      <span class="font-semibold text-gray-900">{{ service.formatted_price }}</span>
                    </div>
                  </div>
                  <span 
                    :class="service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" 
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize flex-shrink-0"
                  >
                    {{ service.status }}
                  </span>
                </div>
                
                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div class="flex items-center space-x-4 text-sm">
                    <div class="flex items-center">
                      <span class="text-yellow-400 mr-1">★</span>
                      <span class="text-gray-600">{{ service.average_rating }} ({{ service.review_count }})</span>
                    </div>
                    <div class="text-gray-500">
                      {{ service.booking_count || 0 }} bookings
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <NuxtLink 
                      :to="`/services/${service.full_slug}`" 
                      class="px-3 py-2 text-xs font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors touch-target"
                    >
                      View
                    </NuxtLink>
                    <NuxtLink 
                      :to="`/dashboard/services/${service.id}/edit`" 
                      class="px-3 py-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors touch-target"
                    >
                      Edit
                    </NuxtLink>
                    <button 
                      @click="deleteServiceHandler(service.id)" 
                      class="px-3 py-2 text-xs font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors touch-target"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Desktop: Table Layout -->
            <div class="hidden md:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="service in myServices" :key="service.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img class="h-10 w-10 rounded-lg object-cover" :src="service.primary_image?.url || '/placeholder-service.jpg'" :alt="service.title">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                          <div class="text-sm text-gray-500">{{ (service.short_description || service.description || '').substring(0, 50) }}...</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.category?.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.formatted_price }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize">
                        {{ service.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div class="flex items-center">
                        <span class="text-yellow-400">★</span>
                        <span class="ml-1">{{ service.average_rating }} ({{ service.review_count }})</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.booking_count || 0 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center space-x-2">
                        <NuxtLink :to="`/services/${service.full_slug}`" class="text-green-600 hover:text-green-900">View</NuxtLink>
                        <NuxtLink :to="`/dashboard/services/${service.id}/edit`" class="text-blue-600 hover:text-blue-900">Edit</NuxtLink>
                        <button @click="deleteServiceHandler(service.id)" class="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p class="text-gray-600 mb-4">Start by creating your first service offering.</p>
            <NuxtLink to="/dashboard/services/create" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create Your First Service
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// Set page meta
definePageMeta({
  layout: false,
  middleware: ['auth', 'vendor-verified']
})

// Use composables
const { currentRole } = useRole()
const { 
  services,
  deleteService, 
  fetchCategories, 
  fetchMyServices, 
  fetchServices,
  categories, 
  loading,
  error,
  pagination
} = useServices()

// Customer filters
const filters = ref({
  category: '',
  priceRange: '',
  distance: '',
  rating: ''
})

// Mobile filters state
const showMobileFilters = ref(false)

// Vendor services (real data from API)
const myServices = computed(() => services.value)
const myServicesLoading = ref(false)
const myServicesError = ref(null)

// Computed values for vendor stats
const activeServices = computed(() => myServices.value.filter(s => s.status === 'active').length)
const averageRating = computed(() => {
  if (myServices.value.length === 0) return '0.0'
  const totalRating = myServices.value.reduce((sum, service) => sum + parseFloat(service.average_rating || 0), 0)
  return (totalRating / myServices.value.length).toFixed(1)
})
const totalBookings = computed(() => myServices.value.reduce((sum, service) => sum + (service.booking_count || 0), 0))

// Methods
const deleteServiceHandler = async (serviceId: string) => {
  if (confirm('Are you sure you want to delete this service?')) {
    try {
      console.log('Attempting to delete service:', serviceId)
      await deleteService(serviceId)
      console.log('Service deleted successfully')
      
      // Reload services after deletion
      if (currentRole.value === 'vendor') {
        await loadMyServices()
      }
      
      // Show success message
      alert('Service deleted successfully!')
    } catch (error) {
      console.error('Failed to delete service:', error)
      
      // Show more detailed error
      const errorMessage = error?.data?.message || error?.message || 'Failed to delete service. Please try again.'
      alert(`Error: ${errorMessage}`)
    }
  }
}

const loadMyServices = async () => {
  myServicesLoading.value = true
  myServicesError.value = null
  
  try {
    await fetchMyServices()
  } catch (err) {
    myServicesError.value = err.message || 'Failed to load services'
    console.error('Error loading my services:', err)
  } finally {
    myServicesLoading.value = false
  }
}

const loadCustomerServices = async () => {
  try {
    const filterParams = {}
    
    // Convert filter values to API parameters
    if (filters.value.category) {
      filterParams.category = filters.value.category
    }
    
    if (filters.value.priceRange) {
      const [min, max] = filters.value.priceRange.includes('+') 
        ? [filters.value.priceRange.replace('+', ''), null]
        : filters.value.priceRange.split('-')
      if (min) filterParams.price_min = parseInt(min)
      if (max) filterParams.price_max = parseInt(max)
    }
    
    if (filters.value.distance) {
      filterParams.radius = parseInt(filters.value.distance)
    }
    
    if (filters.value.rating) {
      filterParams.min_rating = parseFloat(filters.value.rating)
    }
    
    await fetchServices(filterParams)
  } catch (err) {
    console.error('Error loading customer services:', err)
  }
}

// Watch filters for customer view
watch(filters, () => {
  if (currentRole.value === 'customer') {
    loadCustomerServices()
  }
}, { deep: true })

// Load data on mount
onMounted(async () => {
  try {
    // Always load categories
    await fetchCategories()
    
    // Load appropriate services based on role
    if (currentRole.value === 'vendor') {
      await loadMyServices()
    } else {
      await loadCustomerServices()
    }
  } catch (error) {
    console.error('Error loading initial data:', error)
  }
})

// Set page title
useHead({
  title: computed(() => currentRole.value === 'customer' ? 'Find Services - ORDO' : 'My Services - ORDO')
})
</script>

<style scoped>
/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Mobile-specific enhancements */
@media (max-width: 768px) {
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Better text sizing */
  .text-xs {
    font-size: 0.75rem;
    line-height: 1.4;
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  /* Enhanced spacing */
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  /* Better card shadows on mobile */
  .shadow-sm {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
</style>