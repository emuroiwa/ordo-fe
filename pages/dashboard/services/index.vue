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

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="filters.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="beauty">Beauty & Wellness</option>
                <option value="home">Home Services</option>
                <option value="fitness">Fitness & Health</option>
                <option value="tech">Technology</option>
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

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="service in services" :key="service.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="aspect-w-16 aspect-h-9">
              <img :src="service.image || '/placeholder-service.jpg'" :alt="service.title" class="w-full h-48 object-cover">
            </div>
            <div class="p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ service.title }}</h3>
                <button class="text-gray-400 hover:text-red-500">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
              <p class="text-gray-600 text-sm mb-3">{{ service.description }}</p>
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  <span class="text-yellow-400">★</span>
                  <span class="text-sm text-gray-600 ml-1">{{ service.rating }} ({{ service.reviewCount }})</span>
                </div>
                <span class="text-gray-400 mx-2">•</span>
                <span class="text-sm text-gray-600">{{ service.distance }}km away</span>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-gray-900">R{{ service.price }}</span>
                  <span class="text-sm text-gray-600">/{{ service.priceType }}</span>
                </div>
                <button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Book Now
                </button>
              </div>
            </div>
          </div>
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

        <!-- Service Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ myServices.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Active Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ activeServices }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Avg Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ averageRating }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalBookings }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- My Services List -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Your Services</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="service in myServices" :key="service.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img class="h-10 w-10 rounded-lg object-cover" :src="service.image || '/placeholder-service.jpg'" :alt="service.title">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                        <div class="text-sm text-gray-500">{{ service.description.substring(0, 50) }}...</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R{{ service.price }}/{{ service.priceType }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                      {{ service.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.bookingCount || 0 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <NuxtLink :to="`/dashboard/services/${service.id}/edit`" class="text-blue-600 hover:text-blue-900">Edit</NuxtLink>
                      <button @click="deleteServiceHandler(service.id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Set page meta
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { deleteService } = useServices()

// Customer filters
const filters = ref({
  category: '',
  priceRange: '',
  distance: '',
  rating: ''
})

// Mock data for services (customers view)
const services = ref([
  {
    id: '1',
    title: 'Professional Hair Styling',
    description: 'Expert hair styling and treatment services',
    category: 'Beauty & Wellness',
    price: 150,
    priceType: 'session',
    rating: 4.8,
    reviewCount: 124,
    distance: 2.3,
    image: '/placeholder-service.jpg'
  },
  {
    id: '2',
    title: 'Home Cleaning Service',
    description: 'Deep cleaning and maintenance for your home',
    category: 'Home Services',
    price: 80,
    priceType: 'hour',
    rating: 4.9,
    reviewCount: 89,
    distance: 1.5,
    image: '/placeholder-service.jpg'
  }
])

// Mock data for vendor services
const myServices = ref([
  {
    id: '1',
    title: 'Professional Hair Styling',
    description: 'Expert hair styling and treatment services for all hair types',
    category: 'Beauty & Wellness',
    price: 150,
    priceType: 'session',
    status: 'active',
    bookingCount: 45,
    image: '/placeholder-service.jpg'
  },
  {
    id: '2',
    title: 'Hair Color & Highlights',
    description: 'Professional hair coloring with premium products',
    category: 'Beauty & Wellness',
    price: 250,
    priceType: 'session',
    status: 'active',
    bookingCount: 32,
    image: '/placeholder-service.jpg'
  }
])

// Computed values for vendor stats
const activeServices = computed(() => myServices.value.filter(s => s.status === 'active').length)
const averageRating = computed(() => '4.8')
const totalBookings = computed(() => myServices.value.reduce((sum, service) => sum + (service.bookingCount || 0), 0))

// Methods
const deleteServiceHandler = async (serviceId: string) => {
  if (confirm('Are you sure you want to delete this service?')) {
    try {
      await deleteService(serviceId)
      // Remove from local state
      myServices.value = myServices.value.filter(s => s.id !== serviceId)
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }
}

// Set page title
useHead({
  title: computed(() => currentRole.value === 'customer' ? 'Find Services - ORDO' : 'My Services - ORDO')
})
</script>