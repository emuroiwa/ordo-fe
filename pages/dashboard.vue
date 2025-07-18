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
            
            <!-- Role Toggle (if user has multiple roles) -->
            <div v-if="user.roles.length > 1" class="flex items-center space-x-2">
              <button
                @click="currentRole = 'customer'"
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                :class="currentRole === 'customer' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'"
              >
                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer
              </button>
              <button
                @click="currentRole = 'vendor'"
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
                :class="currentRole === 'vendor' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'"
              >
                <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Provider
              </button>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="backdrop-blur-sm bg-white/20 border border-white/30 p-2 rounded-full hover:bg-white/30 transition-all duration-300">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8" />
              </svg>
            </button>
            
            <!-- Profile -->
            <div class="flex items-center space-x-2">
              <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-full object-cover" />
              <span class="text-sm font-medium text-gray-700">{{ user.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <!-- Welcome Section -->
      <section class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  Welcome back, {{ user.firstName }}!
                </h1>
                <p class="text-gray-600 mt-1">
                  <span v-if="currentRole === 'customer'">Find and book amazing services</span>
                  <span v-else>Manage your services and bookings</span>
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-center">
                  <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ currentRole === 'customer' ? stats.bookings : stats.services }}
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ currentRole === 'customer' ? 'Bookings' : 'Services' }}
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {{ currentRole === 'customer' ? stats.favorites : stats.clients }}
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ currentRole === 'customer' ? 'Favorites' : 'Clients' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Customer Dashboard -->
      <section v-if="currentRole === 'customer'" class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Quick Actions -->
          <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NuxtLink to="/search" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div class="font-medium text-gray-900">Find Services</div>
                <div class="text-sm text-gray-600">Browse available services</div>
              </NuxtLink>
              
              <NuxtLink to="/map-search" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div class="font-medium text-gray-900">Map Search</div>
                <div class="text-sm text-gray-600">Find services nearby</div>
              </NuxtLink>
              
              <button class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="font-medium text-gray-900">My Bookings</div>
                <div class="text-sm text-gray-600">View your appointments</div>
              </button>
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
            <div class="space-y-3">
              <div v-for="booking in customerBookings" :key="booking.id" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <img :src="booking.serviceImage" :alt="booking.serviceName" class="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div class="font-medium text-gray-900">{{ booking.serviceName }}</div>
                      <div class="text-sm text-gray-600">{{ booking.providerName }}</div>
                      <div class="text-xs text-gray-500">{{ booking.date }} at {{ booking.time }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(booking.status)">
                      {{ booking.status }}
                    </span>
                    <button class="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vendor Dashboard -->
      <section v-if="currentRole === 'vendor'" class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto space-y-8">
          <!-- Vendor Onboarding (if needed) -->
          <div v-if="showOnboarding" class="backdrop-blur-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Complete Your Business Profile</h2>
                <p class="text-gray-600 mt-1">Set up your services and start receiving bookings</p>
              </div>
              <button @click="completeOnboarding" class="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                Complete Setup
              </button>
            </div>
          </div>

          <!-- Vendor Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center">
              <div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {{ vendorStats.totalBookings }}
              </div>
              <div class="text-sm text-gray-600">Total Bookings</div>
            </div>
            
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center">
              <div class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                R{{ vendorStats.totalEarnings.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-600">Total Earnings</div>
            </div>
            
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center">
              <div class="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                {{ vendorStats.rating }}
              </div>
              <div class="text-sm text-gray-600">Average Rating</div>
            </div>
            
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center">
              <div class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {{ vendorStats.activeServices }}
              </div>
              <div class="text-sm text-gray-600">Active Services</div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <div class="font-medium text-gray-900">Add Service</div>
              </button>
              
              <button class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="font-medium text-gray-900">Manage Calendar</div>
              </button>
              
              <button class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div class="font-medium text-gray-900">View Analytics</div>
              </button>
              
              <button class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4 hover:bg-white/70 transition-all duration-300 text-center">
                <svg class="w-8 h-8 mx-auto mb-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <div class="font-medium text-gray-900">Messages</div>
              </button>
            </div>
          </div>

          <!-- Recent Bookings -->
          <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h2>
            <div class="space-y-3">
              <div v-for="booking in vendorBookings" :key="booking.id" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <img :src="booking.customerAvatar" :alt="booking.customerName" class="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div class="font-medium text-gray-900">{{ booking.serviceName }}</div>
                      <div class="text-sm text-gray-600">{{ booking.customerName }}</div>
                      <div class="text-xs text-gray-500">{{ booking.date }} at {{ booking.time }}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(booking.status)">
                      {{ booking.status }}
                    </span>
                    <div class="text-lg font-semibold text-gray-900">R{{ booking.amount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Mock user data with multiple roles
const user = ref({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  roles: ['customer', 'vendor'], // User has both roles
  businessName: 'John\'s Barber Shop',
  serviceCategory: 'barber'
})

// Current role state
const currentRole = ref('customer')
const showOnboarding = ref(false)

// Stats
const stats = ref({
  bookings: 12,
  favorites: 8,
  services: 4,
  clients: 45
})

// Vendor stats
const vendorStats = ref({
  totalBookings: 127,
  totalEarnings: 15750,
  rating: 4.8,
  activeServices: 4
})

// Customer bookings
const customerBookings = ref([
  {
    id: '1',
    serviceName: 'Premium Haircut',
    providerName: 'Elite Barber Co',
    serviceImage: 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=100&h=100&fit=crop',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 180
  },
  {
    id: '2',
    serviceName: 'Spa Treatment',
    providerName: 'Luxury Spa',
    serviceImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&h=100&fit=crop',
    date: '2024-01-22',
    time: '2:00 PM',
    status: 'completed',
    amount: 350
  }
])

// Vendor bookings
const vendorBookings = ref([
  {
    id: '1',
    serviceName: 'Classic Haircut',
    customerName: 'Mike Johnson',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-25',
    time: '11:00 AM',
    status: 'confirmed',
    amount: 150
  },
  {
    id: '2',
    serviceName: 'Beard Trim',
    customerName: 'David Wilson',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    date: '2024-01-25',
    time: '3:00 PM',
    status: 'pending',
    amount: 80
  }
])

// Functions
const getStatusClass = (status) => {
  const classes = {
    'confirmed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const completeOnboarding = () => {
  showOnboarding.value = false
  // Navigate to onboarding flow
}

// Check URL parameters on mount
onMounted(() => {
  const route = useRoute()
  
  // Set current role from URL
  if (route.query.tab && user.value.roles.includes(route.query.tab)) {
    currentRole.value = route.query.tab
  } else {
    // Default to first role
    currentRole.value = user.value.roles[0]
  }
  
  // Show onboarding if needed
  if (route.query.onboarding === 'true' && currentRole.value === 'vendor') {
    showOnboarding.value = true
  }
})

// Watch for role changes and update URL
watch(currentRole, (newRole) => {
  navigateTo(`/dashboard?tab=${newRole}`, { replace: true })
})

// Set page title
useHead({
  title: 'Dashboard - ORDO'
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
</style>