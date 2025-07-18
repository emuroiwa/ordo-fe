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
                <NuxtLink to="/map-search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Map Search</NuxtLink>
                <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</NuxtLink>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-4">
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
              <NuxtLink to="/register" class="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300">Register</NuxtLink>
              <NuxtLink to="/register">
                <button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                   List a Service
                </button>
              </NuxtLink> 
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
                <!-- <span class="typing-text">{{ displayedText }}</span>
                <span class="typing-cursor" :class="{ 'animate-blink': showCursor }">|</span>
                <br> -->
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
          <!-- First Row - Services You May Like -->
          <Transition name="fade-up" appear>
            <div class="mb-16">
              <div class="flex items-center justify-between mb-8">
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

              <div class="overflow-x-auto scrollbar-hide" ref="featuredScrollContainer" @scroll="updateFeaturedDots">
                <div class="flex space-x-6 pb-4" style="width: max-content;">
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
              
              <!-- Pagination Dots for Featured Services -->
              <div class="flex justify-center mt-6">
                <div class="flex space-x-2">
                  <button
                    v-for="(dot, index) in featuredDots"
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
                <div class="flex space-x-6 pb-4 pt-4" style="width: max-content;">
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
                        <button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300">
                          <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                          <span class="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
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
                          <span class="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full font-medium">
                            {{ vendor.bookingsToday }}+ booked today
                          </span>
                        </div>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
              
              <!-- Pagination Dots for High Demand Services -->
              <div class="flex justify-center mt-6">
                <div class="flex space-x-2">
                  <button
                    v-for="(dot, index) in highDemandDots"
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
import { ref, h, onMounted, onUnmounted } from 'vue'

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
  },
  {
    id: 5,
    name: 'Urban Cuts',
    category: 'Barber',
    details: '3 Services • 2 Locations',
    price: 180,
    rating: 4.6,
    location: 'Rosebank, Johannesburg',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
    timeAgo: '1 day ago'
  },
  {
    id: 6,
    name: 'Luxury Events',
    category: 'Event Planning',
    details: '8 Services • 4 Locations',
    price: 3500,
    rating: 4.9,
    location: 'Waterfront, Cape Town',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    timeAgo: '3 days ago'
  }
])

// High demand vendors data
const highDemandVendors = ref([
  {
    id: 11,
    name: 'Elite Barber Co',
    category: 'Barber',
    details: '4 Services • 2 Locations',
    price: 200,
    rating: 4.9,
    location: 'Hyde Park, Johannesburg',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop',
    bookingsToday: 15
  },
  {
    id: 12,
    name: 'Dream Weddings',
    category: 'Wedding',
    details: '10 Services • 6 Locations',
    price: 4500,
    rating: 5.0,
    location: 'Melrose, Johannesburg',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
    bookingsToday: 8
  },
  {
    id: 13,
    name: 'Pro Audio Rentals',
    category: 'Equipment',
    details: '15 Items • Instant Delivery',
    price: 450,
    rating: 4.8,
    location: 'Fourways, Johannesburg',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    bookingsToday: 22
  },
  {
    id: 14,
    name: 'Capture Moments',
    category: 'Photography',
    details: '6 Packages • Same Day Edit',
    price: 1200,
    rating: 4.9,
    location: 'Bryanston, Johannesburg',
    image: 'https://images.unsplash.com/photo-1606914469633-5fe06c9e8fcc?w=400&h=300&fit=crop',
    bookingsToday: 12
  },
  {
    id: 15,
    name: 'Gourmet Caterers',
    category: 'Catering',
    details: '12 Menus • 500+ Reviews',
    price: 1800,
    rating: 4.8,
    location: 'Randburg, Johannesburg',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    bookingsToday: 18
  },
  {
    id: 16,
    name: 'Skilled Barbers',
    category: 'Barber',
    details: '5 Services • Walk-ins Welcome',
    price: 120,
    rating: 4.7,
    location: 'Midrand, Johannesburg',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop',
    bookingsToday: 25
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
  navigateTo(`/vendor/${vendorId}`)
}

const searchCategory = (category) => {
  navigateTo(`/search?category=${category}`)
}

// Lifecycle hooks
onMounted(() => {
  // Start typing animation after a small delay
  setTimeout(() => {
    startTypingAnimation()
    startCursorBlink()
  }, 500)
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
</style>