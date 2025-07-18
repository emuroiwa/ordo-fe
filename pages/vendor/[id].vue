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
                <NuxtLink to="/map-search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Map Search</NuxtLink>
                <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</NuxtLink>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-4">
              <button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300">
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
              <NuxtLink to="/register" class="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300">Register</NuxtLink>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <!-- Back Button -->
      <section class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <Transition name="slide-right" appear>
            <NuxtLink to="/" class="glass-button inline-flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span class="text-gray-700">Back to Services</span>
            </NuxtLink>
          </Transition>
        </div>
      </section>

      <!-- Service Details -->
      <section class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Image Gallery -->
            <Transition name="scale-up" appear>
              <div class="space-y-6">
                <!-- Main Image -->
                <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-0 overflow-hidden shadow-lg">
                  <div class="relative">
                    <img
                      :src="currentImage"
                      :alt="vendor.name"
                      class="w-full h-96 object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div class="absolute top-4 right-4 flex space-x-2">
                      <button class="backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 p-2 rounded-full hover:scale-110 transition-all duration-300">
                        <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button class="backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 p-2 rounded-full hover:scale-110 transition-all duration-300">
                        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Thumbnail Gallery -->
                <div class="flex space-x-4 overflow-x-auto scrollbar-hide">
                  <button
                    v-for="(image, index) in vendor.images"
                    :key="index"
                    @click="currentImage = image"
                    class="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-0 overflow-hidden flex-shrink-0 w-24 h-24 transition-all duration-300 hover:bg-white/80"
                    :class="currentImage === image ? 'ring-2 ring-blue-500 scale-105 bg-white/80' : 'hover:scale-105'"
                  >
                    <img :src="image" :alt="`${vendor.name} ${index + 1}`" class="w-full h-full object-cover" />
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Service Information -->
            <Transition name="fade-up" appear>
              <div class="space-y-8">
                <!-- Title and Basic Info -->
                <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
                  <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div class="flex-1 mb-4 lg:mb-0">
                      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{{ vendor.name }}</h1>
                      <p class="text-lg text-gray-600 mb-3">{{ vendor.description }}</p>
                      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-500">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {{ vendor.location }}
                        </div>
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {{ vendor.responseTime }}
                        </div>
                      </div>
                    </div>
                    <div class="text-left lg:text-right">
                      <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        R {{ vendor.price.toLocaleString() }}
                      </div>
                      <div class="flex items-center lg:justify-end mb-2">
                        <svg class="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-lg font-medium text-gray-700">{{ vendor.rating }}</span>
                        <span class="text-sm text-gray-500 ml-1">({{ vendor.reviews }} reviews)</span>
                      </div>
                      <span class="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        Available Today
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Services Offered -->
                <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
                  <h3 class="text-xl font-semibold text-gray-900 mb-6">Services Offered</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      v-for="service in vendor.services"
                      :key="service.id"
                      class="backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-4 cursor-pointer group hover:bg-white/80 hover:shadow-md transition-all duration-300"
                      @click="selectService(service)"
                      :class="selectedService?.id === service.id ? 'ring-2 ring-blue-500 bg-white/80' : ''"
                    >
                      <div class="flex justify-between items-start mb-2">
                        <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {{ service.name }}
                        </h4>
                        <span class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          R {{ service.price.toLocaleString() }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">{{ service.description }}</p>
                      <div class="flex items-center text-xs text-gray-500">
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ service.duration }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Booking Section -->
                <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
                  <h3 class="text-xl font-semibold text-gray-900 mb-6">Book Now</h3>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                        <input
                          type="date"
                          v-model="selectedDate"
                          class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                        <select
                          v-model="selectedTime"
                          class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900"
                        >
                          <option value="">Choose time</option>
                          <option v-for="time in availableTimes" :key="time" :value="time">
                            {{ time }}
                          </option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                      <textarea
                        v-model="specialRequests"
                        rows="3"
                        placeholder="Any special requests or notes..."
                        class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      ></textarea>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4">
                      <button
                        @click="bookService"
                        class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                      >
                        Book Service - R {{ selectedServicePrice.toLocaleString() }}
                      </button>
                      <button
                        @click="contactVendor"
                        class="backdrop-blur-sm bg-white/20 border border-white/30 px-6 py-3 rounded-xl font-medium text-gray-700 hover:bg-white/30 hover:shadow-lg transition-all duration-300"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Reviews Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="glass-card">
              <div class="flex items-center justify-between mb-8">
                <h2 class="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <button class="glass-button px-4 py-2 rounded-xl font-medium text-gray-700 hover:shadow-lg transition-all duration-300">
                  Write a Review
                </button>
              </div>

              <div class="space-y-6">
                <div
                  v-for="review in vendor.customerReviews"
                  :key="review.id"
                  class="glass-card-hover p-6 transition-all duration-300"
                >
                  <div class="flex items-start space-x-4">
                    <img
                      :src="review.avatar"
                      :alt="review.name"
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <div>
                          <h4 class="font-medium text-gray-900">{{ review.name }}</h4>
                          <div class="flex items-center mt-1">
                            <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        <span class="text-sm text-gray-500">{{ review.date }}</span>
                      </div>
                      <p class="text-gray-700">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Similar Services -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold text-gray-900">
                Similar Services in 
                <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {{ vendor.location.split(',')[1] }}
                </span>
              </h2>
            </div>
          </Transition>

          <div class="overflow-x-auto scrollbar-hide">
            <div class="flex space-x-6 pb-4" style="width: max-content;">
              <TransitionGroup name="card-stagger" appear>
                <div
                  v-for="(similar, index) in similarServices"
                  :key="similar.id"
                  :style="{ '--delay': index * 0.1 + 's' }"
                  class="glass-card-hover group cursor-pointer flex-shrink-0 w-80"
                  @click="viewSimilar(similar.id)"
                >
                  <div class="relative overflow-hidden rounded-2xl">
                    <img
                      :src="similar.image"
                      :alt="similar.name"
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
                        R {{ similar.price.toLocaleString() }}
                      </span>
                    </div>
                    
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ similar.name }}</h3>
                    <p class="text-sm text-gray-600 mb-3">{{ similar.category }}</p>
                    
                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-sm font-medium text-gray-700">{{ similar.rating }}</span>
                      </div>
                      <span class="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Get vendor ID from route
const route = useRoute()
const vendorId = route.params.id

// Mock vendor data (in real app, this would come from an API)
const vendor = ref({
  id: vendorId,
  name: 'Premium Cuts Barber',
  description: 'Professional barber services with over 10 years of experience',
  category: 'Barber',
  location: 'Sandton, Johannesburg',
  price: 150,
  rating: 4.8,
  reviews: 127,
  responseTime: 'Usually responds within 1 hour',
  images: [
    'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop'
  ],
  services: [
    {
      id: 1,
      name: 'Classic Haircut',
      description: 'Traditional haircut with styling',
      price: 150,
      duration: '45 minutes'
    },
    {
      id: 2,
      name: 'Beard Trim',
      description: 'Professional beard shaping and trimming',
      price: 80,
      duration: '30 minutes'
    },
    {
      id: 3,
      name: 'Hair Wash & Style',
      description: 'Complete hair washing and styling service',
      price: 120,
      duration: '60 minutes'
    },
    {
      id: 4,
      name: 'Premium Package',
      description: 'Haircut + beard trim + wash + style',
      price: 280,
      duration: '90 minutes'
    }
  ],
  customerReviews: [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Excellent service! The barber was very skilled and the place has a great atmosphere. Will definitely be back.'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      date: '1 month ago',
      comment: 'Great haircut and professional service. The booking system is very convenient.'
    },
    {
      id: 3,
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '1 month ago',
      comment: 'Best barber in Sandton! Always consistent quality and friendly service.'
    }
  ]
})

// Similar services data
const similarServices = ref([
  {
    id: 5,
    name: 'Urban Cuts',
    category: 'Barber',
    price: 180,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Elite Barber Co',
    category: 'Barber',
    price: 200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Skilled Barbers',
    category: 'Barber',
    price: 120,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop'
  }
])

// Reactive state
const currentImage = ref(vendor.value.images[0])
const selectedDate = ref('')
const selectedTime = ref('')
const specialRequests = ref('')
const selectedService = ref(vendor.value.services[0])

// Available times
const availableTimes = ref([
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
])

// Computed properties
const selectedServicePrice = computed(() => {
  return selectedService.value?.price || vendor.value.price
})

// Functions
const selectService = (service) => {
  selectedService.value = service
}

const bookService = () => {
  // Handle booking logic
  console.log('Booking service:', {
    service: selectedService.value,
    date: selectedDate.value,
    time: selectedTime.value,
    requests: specialRequests.value
  })
}

const contactVendor = () => {
  // Handle contact logic
  console.log('Contacting vendor')
}

const viewSimilar = (id) => {
  navigateTo(`/vendor/${id}`)
}

// Set page title
useHead({
  title: `${vendor.value.name} - ORDO`
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

/* Scrollbar Styling */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .flex-shrink-0.w-80 {
    width: 280px;
  }
}
</style>