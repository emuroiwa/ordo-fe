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
        <div class="flex items-center justify-between h-16 sm:h-20">
          <Transition name="slide-right" appear>
            <div class="flex items-center space-x-4 sm:space-x-8">
              <div class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ORDO
              </div>
              <nav class="hidden lg:flex space-x-6 xl:space-x-8">
                <a href="#" class="text-blue-600 font-medium relative text-sm xl:text-base">
                  Search
                  <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </a>
                <NuxtLink to="/map-search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm xl:text-base">Map Search</NuxtLink>
                <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm xl:text-base">How it Works</NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm xl:text-base">About us</NuxtLink>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Mobile menu button -->
              <button 
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors duration-200 touch-target"
                :class="{ 'bg-white/20': mobileMenuOpen }"
              >
                <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <!-- Desktop actions -->
              <NuxtLink to="/login" class="hidden sm:block text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm lg:text-base">Login</NuxtLink>
              <NuxtLink to="/register" class="hidden md:block backdrop-blur-sm bg-white/20 border border-white/30 px-3 py-2 lg:px-4 lg:py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300 text-sm lg:text-base">Register</NuxtLink>
              <NuxtLink to="/register" class="hidden sm:block">
                <button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm lg:text-base touch-target">
                   List Service
                </button>
              </NuxtLink> 
            </div>
          </Transition>
        </div>
        
        <!-- Mobile Navigation Menu -->
        <Transition name="mobile-menu">
          <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/95 border-b border-white/20 shadow-lg">
            <nav class="px-4 py-6 space-y-4">
              <a href="#" class="block text-blue-600 font-medium py-3 px-4 rounded-lg bg-blue-50/80 touch-target">
                Search
              </a>
              <NuxtLink to="/map-search" class="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/50 touch-target">Map Search</NuxtLink>
              <NuxtLink to="/how-it-works" class="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/50 touch-target">How it Works</NuxtLink>
              <NuxtLink to="/about" class="block text-gray-700 hover:text-blue-600 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/50 touch-target">About us</NuxtLink>
              
              <div class="border-t border-gray-200/50 pt-4 mt-4 space-y-3">
                <NuxtLink to="/login" class="block text-center text-blue-600 hover:text-blue-800 transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-blue-50/80 font-medium touch-target">Login</NuxtLink>
                <NuxtLink to="/register" class="block text-center backdrop-blur-sm bg-white/40 border border-white/30 py-3 px-4 rounded-xl font-medium text-gray-700 hover:bg-white/60 transition-all duration-300 touch-target">Register</NuxtLink>
                <NuxtLink to="/register" class="block">
                  <button class="w-full glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 touch-target">
                     List a Service
                  </button>
                </NuxtLink>
              </div>
            </nav>
          </div>
        </Transition>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16 sm:pt-20">
      <!-- Hero Section -->
      <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="mb-8 sm:mb-12">
              <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight px-4 sm:px-0">
                <!-- <span class="typing-text">{{ displayedText }}</span>
                <span class="typing-cursor" :class="{ 'animate-blink': showCursor }">|</span>
                <br> -->
                Find a new service in
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  South Africa
                </span>
              </h1>
              <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
                Discover trusted vendors while you stay at home
              </p>
            </div>
          </Transition>
          
          <!-- Glassmorphism Search Bar -->
          <Transition name="scale-up" appear>
            <div class="glass-card max-w-5xl mx-auto mb-6 sm:mb-8 mx-4 sm:mx-auto">
              <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div class="flex-1">
                  <input
                    v-model="searchForm.location"
                    type="text"
                    placeholder="Enter Location, Project or Landmark"
                    class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div class="flex-1">
                  <select v-model="searchForm.category" class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                    <option value="">Service Type</option>
                    <option v-for="category in categories.slice(0, 10)" :key="category.id" :value="category.slug">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="flex-1">
                  <select v-model="searchForm.budget" class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300">
                    <option value="">Budget</option>
                    <option value="100-500">R100 - R500</option>
                    <option value="500-2000">R500 - R2000</option>
                    <option value="2000+">R2000+</option>
                  </select>
                </div>
                <button type="submit" class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 touch-target">
                  Search
                </button>
              </form>
              
              <!-- Quick Links -->
              <div class="flex flex-wrap gap-3 mt-8 justify-center">
                <span class="text-gray-600 font-medium">Popular:</span>
                <button v-for="tag in popularTags" :key="tag" 
                        @click="searchByCategory(tag)"
                        class="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 hover:bg-white/70 transition-all duration-200 hover:scale-105 touch-target">
                  {{ tag }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <!-- First Row - Services You May Like -->
          <Transition name="fade-up" appear>
            <div class="mb-12 sm:mb-16">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Services You May Like in 
                  <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Johannesburg
                  </span>
                </h2>
                <button class="glass-button p-2 sm:p-3 rounded-full hover:shadow-lg transition-all duration-300 flex-shrink-0 touch-target">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Mobile: Grid layout -->
              <div class="block sm:hidden">
                <div v-if="loading" class="grid grid-cols-1 gap-4">
                  <!-- Mobile Loading skeletons -->
                  <div v-for="i in 3" :key="i" class="glass-card animate-pulse">
                    <div class="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                    <div class="p-4">
                      <div class="bg-gray-200 h-6 rounded mb-2"></div>
                      <div class="bg-gray-200 h-4 rounded mb-4"></div>
                      <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <div v-else class="grid grid-cols-1 gap-4">
                  <TransitionGroup name="card-stagger" appear>
                    <div
                      v-for="(vendor, index) in featuredVendors.slice(0, 3)"
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
                      </div>
                      
                      <div class="p-4 sm:p-6">
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {{ formatPrice(vendor.price, 'ZAR') }}
                          </span>
                          <button 
                            @click.stop="handleShare(vendor)"
                            class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300 touch-target"
                          >
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
                
                <!-- View All button for mobile -->
                <div v-if="!loading && featuredVendors.length > 3" class="mt-6 text-center">
                  <NuxtLink to="/search" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 touch-target">
                    View All Services
                    <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                </div>
                
                <!-- Empty state for featured services - Mobile -->
                <div v-if="!loading && featuredVendors.length === 0" class="text-center py-8">
                  <div class="glass-card">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No Featured Services</h3>
                    <p class="text-gray-600 text-sm">Check back later for featured services in your area.</p>
                  </div>
                </div>
              </div>

              <!-- Desktop: Horizontal scroll -->
              <div class="hidden sm:block overflow-x-auto scrollbar-hide" ref="featuredScrollContainer" @scroll="updateFeaturedDots">
                <div v-if="loading" class="flex space-x-6 pb-4">
                  <!-- Desktop Loading skeletons -->
                  <div v-for="i in 6" :key="i" class="glass-card flex-shrink-0 w-80 animate-pulse">
                    <div class="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                    <div class="p-6">
                      <div class="bg-gray-200 h-6 rounded mb-2"></div>
                      <div class="bg-gray-200 h-4 rounded mb-4"></div>
                      <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <div v-else class="flex space-x-6 pb-4" style="width: max-content;">
                  <TransitionGroup name="card-stagger" appear>
                    <div
                      v-for="(vendor, index) in featuredVendors"
                      :key="vendor.id"
                      :style="{ '--delay': index * 0.1 + 's' }"
                      class="glass-card-hover group cursor-pointer flex-shrink-0 w-80"
                      @click="viewVendor(vendor.id)"
                    >
                      <div class="relative overflow-hidden rounded-2xl">
                        <img
                          :src="vendor.image"
                          :alt="vendor.name"
                          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {{ formatPrice(vendor.price, 'ZAR') }}
                          </span>
                          <button 
                            @click.stop="handleShare(vendor)"
                            class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300"
                          >
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
                
                <!-- Empty state for featured services -->
                <div v-if="!loading && featuredVendors.length === 0" class="text-center py-12">
                  <div class="glass-card max-w-md mx-auto">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No Featured Services</h3>
                    <p class="text-gray-600">Check back later for featured services in your area.</p>
                  </div>
                </div>
              </div>
              
              <!-- Pagination Dots for Featured Services -->
              <div class="flex justify-center mt-6">
                <div class="flex space-x-2">
                  <button
                    v-for="(_, index) in featuredDots"
                    :key="index"
                    @click="scrollToFeatured(index)"
                    class="w-2 h-2 rounded-full transition-all duration-300"
                    :class="featuredActiveDot === index ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-6' : 'bg-gray-300 hover:bg-gray-400'"
                  ></button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Second Row - High Demand Services -->
          <Transition name="fade-up" appear>
            <div class="mb-16">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900">
                  Services in High Demand in 
                  <span class="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Johannesburg
                  </span>
                </h2>
                <button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </button>
              </div>

              <div class="overflow-x-auto scrollbar-hide" ref="highDemandScrollContainer" @scroll="updateHighDemandDots">
                <div v-if="loading" class="flex space-x-6 pb-4 pt-4">
                  <!-- Loading skeletons -->
                  <div v-for="i in 6" :key="i" class="glass-card flex-shrink-0 w-80 animate-pulse">
                    <div class="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                    <div class="p-6">
                      <div class="bg-gray-200 h-6 rounded mb-2"></div>
                      <div class="bg-gray-200 h-4 rounded mb-4"></div>
                      <div class="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
                <div v-else class="flex space-x-6 pb-4 pt-4" style="width: max-content;">
                  <TransitionGroup name="card-stagger" appear>
                    <div
                      v-for="(vendor, index) in highDemandVendors"
                      :key="vendor.id"
                      :style="{ '--delay': index * 0.1 + 's' }"
                      class="glass-card-hover group cursor-pointer flex-shrink-0 w-80 relative"
                      @click="viewVendor(vendor.id)"
                    >
                      <!-- High Demand Badge -->
                      <div class="absolute -top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        🔥 HIGH DEMAND
                      </div>
                      
                      <div class="relative overflow-hidden rounded-2xl">
                        <img
                          :src="vendor.image"
                          :alt="vendor.name"
                          class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      
                      <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            {{ formatPrice(vendor.price, 'ZAR') }}
                          </span>
                          <button 
                            @click.stop="handleShare(vendor)"
                            class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300"
                          >
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
                          <span class="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full font-medium">
                            {{ vendor.bookingsToday }}+ booked today
                          </span>
                        </div>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
                
                <!-- Empty state for high demand services -->
                <div v-if="!loading && highDemandVendors.length === 0" class="text-center py-12">
                  <div class="glass-card max-w-md mx-auto">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No High Demand Services</h3>
                    <p class="text-gray-600">Check back later for popular services in your area.</p>
                  </div>
                </div>
              </div>
              
              <!-- Pagination Dots for High Demand Services -->
              <div class="flex justify-center mt-6">
                <div class="flex space-x-2">
                  <button
                    v-for="(_, index) in highDemandDots"
                    :key="index"
                    @click="scrollToHighDemand(index)"
                    class="w-2 h-2 rounded-full transition-all duration-300"
                    :class="highDemandActiveDot === index ? 'bg-gradient-to-r from-red-600 to-pink-600 w-6' : 'bg-gray-300 hover:bg-gray-400'"
                  ></button>
                </div>
              </div>
            </div>
          </Transition>
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
import { ref, h, onMounted, onUnmounted, computed } from 'vue'

// Use services composable
const { 
  categories, 
  loading, 
  fetchServices, 
  fetchCategories,
  formatPrice,
  getOptimizedImageUrl 
} = useServices()

const { share } = useShare()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Search form state
const searchForm = ref({
  location: '',
  category: '',
  budget: ''
})

// Typing animation for hero text
const fullText = 'Find a new service in'
const displayedText = ref('')
const showCursor = ref(true)
const typingSpeed = 100 // milliseconds per character
const pauseAfterComplete = 2000 // pause after typing is complete

let typingTimer = null
let cursorTimer = null

const startTypingAnimation = () => {
  let currentIndex = 0
  
  const typeCharacter = () => {
    if (currentIndex < fullText.length) {
      displayedText.value = fullText.slice(0, currentIndex + 1)
      currentIndex++
      typingTimer = setTimeout(typeCharacter, typingSpeed)
    } else {
      // Hide cursor after typing is complete
      setTimeout(() => {
        showCursor.value = false
      }, pauseAfterComplete)
    }
  }
  
  typeCharacter()
}

const startCursorBlink = () => {
  cursorTimer = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}

// Popular search tags - fetch from categories
const popularTags = computed(() => {
  return categories.value
    .filter(cat => cat.is_active && cat.services_count > 0)
    .slice(0, 6)
    .map(cat => cat.name)
})

// Separate services data
const featuredServices = ref([])
const highDemandServices = ref([])

// Transform services for the frontend display
const transformServiceForDisplay = (service) => {
  return {
    id: service.id,
    name: service.title,
    category: service.category?.name || 'Service',
    details: `${service.duration_minutes ? service.duration_minutes + ' min' : ''} • ${service.location_display || 'Various locations'}`,
    price: service.base_price,
    rating: service.average_rating || 4.5,
    location: service.location_display || 'Location not specified',
    image: service.primary_image 
      ? getOptimizedImageUrl(service.primary_image, 'medium') 
      : 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    timeAgo: formatTimeAgo(service.created_at),
    bookingsToday: service.booking_count || Math.floor(Math.random() * 30) + 5, // Mock for now
    slug: service.full_slug,
    vendor: service.user
  }
}

// Computed properties for transformed services
const featuredVendors = computed(() => {
  return featuredServices.value.map(transformServiceForDisplay)
})

const highDemandVendors = computed(() => {
  return highDemandServices.value.map(transformServiceForDisplay)
})

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInHours < 168) {
    const days = Math.floor(diffInHours / 24)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else {
    const weeks = Math.floor(diffInHours / 168)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  }
}

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

// Pagination state
const featuredScrollContainer = ref(null)
const highDemandScrollContainer = ref(null)
const featuredActiveDot = ref(0)
const highDemandActiveDot = ref(0)

// Calculate dots based on screen size and number of items
const featuredDots = computed(() => {
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
  return Math.ceil(featuredVendors.value.length / itemsPerView)
})

const highDemandDots = computed(() => {
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
  return Math.ceil(highDemandVendors.value.length / itemsPerView)
})

// Scroll functions
const scrollToFeatured = (index) => {
  if (featuredScrollContainer.value) {
    const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    const scrollAmount = index * (320 * itemsPerView + 24 * (itemsPerView - 1)) // card width + gap
    featuredScrollContainer.value.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
    featuredActiveDot.value = index
  }
}

const scrollToHighDemand = (index) => {
  if (highDemandScrollContainer.value) {
    const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    const scrollAmount = index * (320 * itemsPerView + 24 * (itemsPerView - 1)) // card width + gap
    highDemandScrollContainer.value.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })
    highDemandActiveDot.value = index
  }
}

// Update dots on scroll
const updateFeaturedDots = () => {
  if (featuredScrollContainer.value) {
    const scrollLeft = featuredScrollContainer.value.scrollLeft
    const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    const cardWidth = 320 + 24 // card width + gap
    const groupWidth = cardWidth * itemsPerView
    const currentDot = Math.round(scrollLeft / groupWidth)
    featuredActiveDot.value = Math.min(currentDot, featuredDots.value - 1)
  }
}

const updateHighDemandDots = () => {
  if (highDemandScrollContainer.value) {
    const scrollLeft = highDemandScrollContainer.value.scrollLeft
    const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
    const cardWidth = 320 + 24 // card width + gap
    const groupWidth = cardWidth * itemsPerView
    const currentDot = Math.round(scrollLeft / groupWidth)
    highDemandActiveDot.value = Math.min(currentDot, highDemandDots.value - 1)
  }
}

// Navigation functions
const viewVendor = (vendorId) => {
  // Find the service by ID to get the full slug
  const service = [...featuredServices.value, ...highDemandServices.value]
    .find(s => s.id === vendorId)
  
  if (service && service.full_slug) {
    navigateTo(`/services/${service.full_slug}`)
  } else {
    // Fallback for legacy links
    navigateTo(`/vendor/${vendorId}`)
  }
}


// Load services data
const loadServicesData = async () => {
  try {
    // Load categories first
    await fetchCategories()

    // Load featured services (featured flag = true)
    const featuredResponse = await fetchServices({ 
      featured: true, 
      per_page: 6,
      sort: 'rating'
    })
    featuredServices.value = featuredResponse.data || []

    // Load high demand services (sort by booking count/popularity)
    const highDemandResponse = await fetchServices({ 
      per_page: 6,
      sort: 'popular',
      min_rating: 4.5
    })
    highDemandServices.value = highDemandResponse.data || []

  } catch (error) {
    console.error('Error loading services data:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  // Start typing animation after a small delay
  setTimeout(() => {
    startTypingAnimation()
    startCursorBlink()
  }, 500)

  // Load services data
  loadServicesData()
})

onUnmounted(() => {
  // Clean up timers
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
  if (cursorTimer) {
    clearInterval(cursorTimer)
  }
})


// Share functionality
const handleShare = async (vendor) => {
  const shareData = {
    title: `${vendor.name} - ${vendor.category}`,
    text: `Check out this ${vendor.category.toLowerCase()} service: ${vendor.name} starting from ${formatPrice(vendor.price, 'ZAR')}`,
    url: `${window.location.origin}/services/${vendor.slug || `vendor/${vendor.id}`}`
  }
  
  await share(shareData, { 
    fallbackToClipboard: true, 
    showSuccessMessage: true 
  })
}

// Search functionality
const handleSearch = async () => {
  try {
    const query = {}
    
    // Add non-empty form values to query parameters
    if (searchForm.value.location?.trim()) {
      query.location = searchForm.value.location.trim()
    }
    
    if (searchForm.value.category?.trim()) {
      query.category = searchForm.value.category.trim()
    }
    
    if (searchForm.value.budget?.trim()) {
      query.budget = searchForm.value.budget.trim()
    }
    
    // Navigate to search page with parameters
    await navigateTo({
      path: '/search',
      query
    })
  } catch (error) {
    console.error('Failed to perform search:', error)
  }
}

// Popular tags search functionality
const searchByCategory = async (categoryName) => {
  try {
    // Find the category slug from the name
    const category = categories.value.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    )
    
    const query = {
      category: category?.slug || categoryName.toLowerCase().replace(/\s+/g, '-')
    }
    
    // Navigate to search page with category filter
    await navigateTo({
      path: '/search',
      query
    })
  } catch (error) {
    console.error('Failed to search by category:', error)
  }
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

/* Scrollable Sections */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling for horizontal sections */
.overflow-x-auto {
  scroll-behavior: smooth;
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

/* Typing Animation */
.typing-text {
  display: inline-block;
  min-height: 1.2em;
}

.typing-cursor {
  display: inline-block;
  font-weight: 100;
  font-size: 1.2em;
  color: #3b82f6;
  animation: blink 1s infinite;
}

.typing-cursor.animate-blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .flex-shrink-0.w-80 {
    width: 280px;
  }
}

/* Touch targets for mobile */
.touch-target {
  @apply min-h-[44px] min-w-[44px] flex items-center justify-center;
}

/* Mobile menu animations */
.mobile-menu-enter-active {
  transition: all 0.3s ease-out;
}

.mobile-menu-leave-active {
  transition: all 0.3s ease-in;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>