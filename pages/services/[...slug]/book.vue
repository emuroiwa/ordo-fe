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
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center bg-white rounded-lg p-8 shadow-lg">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading booking calendar...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-4 bg-white rounded-lg p-8 shadow-lg">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
        <p class="text-sm text-gray-600 mb-4">{{ error }}</p>
        <NuxtLink
          to="/search"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Browse Services
        </NuxtLink>
      </div>
    </div>

    <!-- Booking Calendar -->
    <div v-else-if="service" class="relative z-10 pt-16">
      <!-- Breadcrumb -->
      <div class="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="flex py-4 text-sm" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="text-gray-500 hover:text-blue-600 transition-colors">Home</NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <NuxtLink to="/search" class="text-gray-500 hover:text-blue-600 transition-colors">Services</NuxtLink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <NuxtLink :to="`/services/${fullSlug}`" class="text-gray-500 hover:text-blue-600 transition-colors">{{ service.title }}</NuxtLink>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-900 font-medium">Book Appointment</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Service Info -->
          <div class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <img 
                  v-if="service.primary_image"
                  :src="service.primary_image.url" 
                  :alt="service.title"
                  class="w-16 h-16 rounded-lg object-cover"
                >
                <div v-else class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ service.title }}</h1>
                <p class="text-gray-600 mb-2">{{ service.short_description }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ service.formatted_price }}</span>
                  <span>{{ service.duration_minutes }} minutes</span>
                  <span>{{ service.location_display }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Calendar Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Calendar -->
            <div class="lg:col-span-2">
              <div class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20">
                <!-- Calendar Header -->
                <div class="p-6 border-b border-gray-200">
                  <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-900">Select Date & Time</h2>
                    <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
                      <button
                        @click="calendarView = 'week'"
                        :class="[
                          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                          calendarView === 'week' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        ]"
                      >
                        Week
                      </button>
                      <button
                        @click="calendarView = 'month'"
                        :class="[
                          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                          calendarView === 'month' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        ]"
                      >
                        Month
                      </button>
                      <button
                        @click="calendarView = 'day'"
                        :class="[
                          'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                          calendarView === 'day' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        ]"
                      >
                        Day
                      </button>
                    </div>
                  </div>
                  
                  <!-- Navigation -->
                  <div class="flex items-center justify-between mt-4">
                    <button
                      @click="previousPeriod"
                      class="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <h3 class="text-lg font-medium text-gray-900">{{ currentPeriodLabel }}</h3>
                    <button
                      @click="nextPeriod"
                      class="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Calendar Content -->
                <div class="p-6">
                  <!-- Week View -->
                  <div v-if="calendarView === 'week'" class="space-y-4">
                    <div v-for="day in weekDays" :key="day.date" class="border-b border-gray-100 pb-4 last:border-b-0">
                      <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center space-x-3">
                          <div class="text-lg font-semibold text-gray-900">{{ day.dayName }}</div>
                          <div class="text-sm text-gray-500">{{ day.formatted }}</div>
                        </div>
                        <div v-if="!day.hasSlots" class="text-sm text-gray-400">No availability</div>
                      </div>
                      <div v-if="day.hasSlots" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        <button
                          v-for="slot in day.slots"
                          :key="slot.time"
                          @click="selectTimeSlot(slot)"
                          :class="[
                            'px-3 py-2 text-sm font-medium rounded-md border transition-colors',
                            selectedSlot?.id === slot.id
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                          ]"
                        >
                          {{ slot.time }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Month View -->
                  <div v-else-if="calendarView === 'month'" class="grid grid-cols-7 gap-1">
                    <!-- Month calendar implementation -->
                    <div class="text-center text-sm font-medium text-gray-500 py-2" v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
                      {{ day }}
                    </div>
                    <!-- Calendar days would go here -->
                    <div class="text-center text-sm text-gray-600 p-2">Month view coming soon...</div>
                  </div>

                  <!-- Day View -->
                  <div v-else-if="calendarView === 'day'" class="space-y-2">
                    <!-- Day view implementation -->
                    <div class="text-center text-sm text-gray-600 p-8">Day view coming soon...</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Booking Summary -->
            <div class="lg:col-span-1">
              <div class="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl border border-white/20 p-6 sticky top-24">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <!-- Service Details -->
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Service</span>
                    <span class="font-medium">{{ service.title }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Duration</span>
                    <span class="font-medium">{{ service.duration_minutes }} min</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Price</span>
                    <span class="font-medium">{{ service.formatted_price }}</span>
                  </div>
                </div>

                <!-- Selected Time -->
                <div v-if="selectedSlot" class="border-t border-gray-200 pt-4 mb-6">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Date & Time</span>
                    <div class="text-right">
                      <div class="font-medium">{{ selectedSlot.date }}</div>
                      <div class="text-sm text-gray-500">{{ selectedSlot.time }}</div>
                    </div>
                  </div>
                </div>

                <!-- Guest Form or Continue Button -->
                <div v-if="selectedSlot">
                  <!-- Show form for non-authenticated users -->
                  <div v-if="!isAuthenticated" class="space-y-4 mb-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        v-model="guestInfo.email"
                        type="email"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        v-model="guestInfo.phone"
                        type="tel"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+27 xxx xxx xxxx"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        v-model="guestInfo.name"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      >
                    </div>
                  </div>

                  <!-- Continue Button -->
                  <button
                    @click="proceedToPayment"
                    :disabled="!canProceed || isProcessing"
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <svg v-if="isProcessing" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isProcessing ? 'Processing...' : 'Continue to Payment' }}
                  </button>
                </div>
                
                <div v-else class="text-center text-gray-500 text-sm">
                  Select a time slot to continue
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
const { isAuthenticated } = useAuth()
const { createBooking } = useBooking()
const route = useRoute()
const router = useRouter()

// State
const calendarView = ref('week')
const currentDate = ref(new Date())
const selectedSlot = ref(null)
const isProcessing = ref(false)
const guestInfo = ref({
  email: '',
  phone: '',
  name: ''
})

// Mock availability data (replace with real API call)
const availabilitySlots = ref([
  // Sample data structure
  { id: 1, date: '2025-07-21', time: '09:00', available: true },
  { id: 2, date: '2025-07-21', time: '10:00', available: true },
  { id: 3, date: '2025-07-21', time: '11:00', available: true },
  { id: 4, date: '2025-07-22', time: '09:00', available: true },
  { id: 5, date: '2025-07-22', time: '14:00', available: true },
  { id: 6, date: '2025-07-22', time: '15:00', available: true },
])

// Computed
const fullSlug = computed(() => {
  const slugArray = route.params.slug as string[]
  return slugArray.slice(0, -1).join('/') // Remove 'book' from the end
})

const currentPeriodLabel = computed(() => {
  if (calendarView.value === 'week') {
    const start = getWeekStart(currentDate.value)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  } else if (calendarView.value === 'month') {
    return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  } else {
    return currentDate.value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }
})

const weekDays = computed(() => {
  const start = getWeekStart(currentDate.value)
  const days = []
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    
    const daySlots = availabilitySlots.value.filter(slot => slot.date === dateStr && slot.available)
    
    days.push({
      date: dateStr,
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
      formatted: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      slots: daySlots,
      hasSlots: daySlots.length > 0
    })
  }
  
  return days
})

const canProceed = computed(() => {
  if (!selectedSlot.value) return false
  
  if (!isAuthenticated.value) {
    return guestInfo.value.email && guestInfo.value.phone && guestInfo.value.name
  }
  
  return true
})

// Methods
const getWeekStart = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

const previousPeriod = () => {
  const newDate = new Date(currentDate.value)
  if (calendarView.value === 'week') {
    newDate.setDate(newDate.getDate() - 7)
  } else if (calendarView.value === 'month') {
    newDate.setMonth(newDate.getMonth() - 1)
  } else {
    newDate.setDate(newDate.getDate() - 1)
  }
  currentDate.value = newDate
}

const nextPeriod = () => {
  const newDate = new Date(currentDate.value)
  if (calendarView.value === 'week') {
    newDate.setDate(newDate.getDate() + 7)
  } else if (calendarView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + 1)
  } else {
    newDate.setDate(newDate.getDate() + 1)
  }
  currentDate.value = newDate
}

const selectTimeSlot = (slot: any) => {
  selectedSlot.value = slot
}

const proceedToPayment = async () => {
  if (!canProceed.value || !selectedSlot.value) return
  
  isProcessing.value = true
  
  try {
    // Prepare booking data
    const bookingData = {
      service_id: service.value.id,
      scheduled_at: `${selectedSlot.value.date}T${selectedSlot.value.time}:00`,
      duration_minutes: service.value.duration_minutes,
      location_type: service.value.location_type,
      // Add guest info if not authenticated
      ...(isAuthenticated.value ? {} : {
        guest_email: guestInfo.value.email,
        guest_phone: guestInfo.value.phone,
        guest_name: guestInfo.value.name
      })
    }
    
    // Create booking
    const booking = await createBooking(bookingData)
    
    // Redirect to payment page
    await router.push(`/booking/payment/${booking.id}`)
    
  } catch (err) {
    console.error('Failed to create booking:', err)
    // Handle error (show toast, etc.)
  } finally {
    isProcessing.value = false
  }
}

// Head
useHead({
  title: computed(() => service.value ? `Book ${service.value.title} - ORDO` : 'Book Service - ORDO'),
  meta: [
    {
      name: 'description',
      content: computed(() => `Book ${service.value?.title || 'service'} appointment online. Select your preferred date and time.`)
    }
  ]
})

// Fetch service on mount
onMounted(async () => {
  console.log('Booking page loading for slug:', fullSlug.value)
  try {
    await fetchService(fullSlug.value)
    console.log('Service loaded successfully')
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