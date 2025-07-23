<template>
  <NuxtLayout name="dashboard">
    <div>
    <!-- Mobile-First Role Toggle -->
    <div v-if="hasMultipleRoles" class="mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-3 sm:space-y-0">
        <div class="flex items-center space-x-3">
          <span class="text-sm text-gray-500 font-medium">View as:</span>
          <div class="bg-gray-100 p-1 rounded-xl flex flex-1 sm:flex-none">
            <button
              @click="setRole('customer')"
              :class="[
                'flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors touch-target',
                userRole === 'customer' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              Customer
            </button>
            <button
              @click="setRole('vendor')"
              :class="[
                'flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors touch-target',
                userRole === 'vendor' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              Provider
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile-First Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-xl flex-shrink-0">
            <CalendarIcon class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div class="ml-3 sm:ml-4 min-w-0 flex-1">
            <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Bookings</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-xl flex-shrink-0">
            <ClockIcon class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
          </div>
          <div class="ml-3 sm:ml-4 min-w-0 flex-1">
            <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">Pending</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-xl flex-shrink-0">
            <CheckCircleIcon class="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div class="ml-3 sm:ml-4 min-w-0 flex-1">
            <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">Completed</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-xl flex-shrink-0">
            <CurrencyDollarIcon class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <div class="ml-3 sm:ml-4 min-w-0 flex-1">
            <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">
              {{ userRole === 'vendor' ? 'Revenue' : 'Spent' }}
            </p>
            <p class="text-xl sm:text-2xl font-bold text-gray-900">R{{ stats.revenue }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile-First Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
      <!-- Mobile: Search First (Most Important) -->
      <div class="space-y-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="filterBookings"
            type="text"
            placeholder="Search bookings..."
            class="block w-full pl-12 pr-4 py-3 sm:py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
          >
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <!-- Mobile: Filter Toggles -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 sm:hidden">Status</label>
            <select
              v-model="selectedStatus"
              @change="filterBookings"
              class="block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Date Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2 sm:hidden">Time Period</label>
            <select
              v-model="selectedTimeframe"
              @change="filterBookings"
              class="block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-sm touch-target"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Mobile-First Empty State -->
    <div v-else-if="filteredBookings.length === 0" class="text-center py-12 px-4">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <CalendarIcon class="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
        <p class="text-gray-500 mb-8 max-w-sm mx-auto">
          {{ userRole === 'vendor' 
            ? 'Your services haven\'t been booked yet.' 
            : 'You haven\'t made any bookings yet.' 
          }}
        </p>
        <NuxtLink
          :to="userRole === 'vendor' ? '/dashboard/services' : '/search'"
          class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target"
        >
          {{ userRole === 'vendor' ? 'Create Service' : 'Browse Services' }}
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile-First Bookings List -->
    <div v-else class="space-y-4">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-4 sm:p-6">
            <!-- Mobile: Header with Status -->
            <div class="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 mb-4">
              <div class="flex-1 min-w-0">
                <div class="flex items-start space-x-3">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">
                      {{ booking.service?.title || 'Service' }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                      Booking #{{ booking.booking_reference }}
                    </p>
                  </div>
                  <div class="flex-shrink-0">
                    <span
                      :class="[
                        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                        getBookingStatus(booking).color
                      ]"
                    >
                      {{ getBookingStatus(booking).text }}
                    </span>
                  </div>
                </div>
              </div>
              
              <!-- Mobile: Price prominent -->
              <div class="text-left sm:text-right">
                <p class="text-2xl font-bold text-gray-900">
                  R{{ booking.total_amount.toFixed(2) }}
                </p>
              </div>
            </div>

            <!-- Mobile: Key Information First -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <!-- Most Important: Date & Time -->
              <div class="order-1">
                <p class="text-sm font-medium text-gray-500 mb-1">Date & Time</p>
                <p class="text-base font-semibold text-gray-900">
                  {{ formatBookingTime(booking.scheduled_at).date }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ formatBookingTime(booking.scheduled_at).time }}
                </p>
              </div>
              
              <!-- Second: Person -->
              <div class="order-2">
                <p class="text-sm font-medium text-gray-500 mb-1">
                  {{ userRole === 'vendor' ? 'Customer' : 'Provider' }}
                </p>
                <p class="text-base font-semibold text-gray-900 truncate">
                  {{ userRole === 'vendor' ? booking.customer?.name : booking.vendor?.name }}
                </p>
              </div>
              
              <!-- Third: Duration -->
              <div class="order-3 sm:order-4 lg:order-3">
                <p class="text-sm font-medium text-gray-500 mb-1">Duration</p>
                <p class="text-base font-semibold text-gray-900">
                  {{ booking.duration_minutes }} min
                </p>
              </div>
              
              <!-- Fourth: Location -->
              <div class="order-4 sm:order-3 lg:order-4">
                <p class="text-sm font-medium text-gray-500 mb-1">Location</p>
                <p class="text-base font-semibold text-gray-900 truncate">
                  {{ getLocationText(booking.location_type) }}
                </p>
              </div>
            </div>

            <!-- Notes (Collapsible on Mobile) -->
            <div v-if="booking.customer_notes || booking.vendor_notes" class="mb-4">
              <details class="group">
                <summary class="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center touch-target">
                  <svg class="w-4 h-4 mr-1 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  View Notes
                </summary>
                <div class="mt-2 pl-5 space-y-2">
                  <div v-if="booking.customer_notes">
                    <p class="text-sm font-medium text-gray-500">Customer Notes:</p>
                    <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{{ booking.customer_notes }}</p>
                  </div>
                  <div v-if="booking.vendor_notes">
                    <p class="text-sm font-medium text-gray-500">Provider Notes:</p>
                    <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{{ booking.vendor_notes }}</p>
                  </div>
                </div>
              </details>
            </div>

            <!-- Mobile-First Actions -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <!-- Primary Actions (Most Important) -->
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Customer Actions -->
                <template v-if="userRole === 'customer'">
                  <button
                    v-if="canRescheduleBooking(booking)"
                    @click="handleReschedule(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target transition-colors"
                  >
                    <ClockIcon class="w-4 h-4 mr-2" />
                    Reschedule
                  </button>
                  
                  <button
                    v-if="canCancelBooking(booking)"
                    @click="handleCancel(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-red-300 shadow-sm text-sm font-medium rounded-xl text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 touch-target transition-colors"
                  >
                    <XMarkIcon class="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </template>

                <!-- Vendor Actions -->
                <template v-if="userRole === 'vendor'">
                  <button
                    v-if="booking.status === 'pending'"
                    @click="handleConfirm(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 touch-target transition-colors"
                  >
                    <CheckCircleIcon class="w-4 h-4 mr-2" />
                    Confirm
                  </button>
                  
                  <button
                    v-if="booking.status === 'confirmed'"
                    @click="handleStartService(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target transition-colors"
                  >
                    <PlayIcon class="w-4 h-4 mr-2" />
                    Start Service
                  </button>
                  
                  <button
                    v-if="booking.status === 'in_progress'"
                    @click="handleComplete(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 touch-target transition-colors"
                  >
                    <CheckIcon class="w-4 h-4 mr-2" />
                    Complete
                  </button>
                  
                  <button
                    v-if="canCancelBooking(booking)"
                    @click="handleCancel(booking)"
                    class="flex items-center justify-center px-4 py-3 border border-red-300 shadow-sm text-sm font-medium rounded-xl text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 touch-target transition-colors"
                  >
                    <XMarkIcon class="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </template>
              </div>

              <!-- Secondary Actions -->
              <div class="flex-shrink-0">
                <button
                  @click="viewBookingDetails(booking)"
                  class="w-full sm:w-auto flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target transition-colors"
                >
                  <EyeIcon class="w-4 h-4 mr-2" />
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Mobile-First Pagination -->
    <div v-if="pagination.total > pagination.per_page" class="mt-8">
      <nav class="bg-white px-4 py-4 sm:px-6 rounded-xl shadow-sm border border-gray-200">
        <!-- Mobile: Simple pagination info -->
        <div class="text-center mb-4 sm:hidden">
          <p class="text-sm text-gray-600">
            {{ pagination.from }}-{{ pagination.to }} of {{ pagination.total }}
          </p>
        </div>
        
        <!-- Desktop: Full pagination info -->
        <div class="hidden sm:block mb-4">
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ pagination.from }}</span>
            to
            <span class="font-medium">{{ pagination.to }}</span>
            of
            <span class="font-medium">{{ pagination.total }}</span>
            results
          </p>
        </div>
        
        <!-- Mobile-First Navigation -->
        <div class="flex items-center justify-center space-x-4">
          <button
            @click="previousPage"
            :disabled="pagination.current_page <= 1"
            class="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-target transition-colors"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <!-- Page numbers (desktop only) -->
          <div class="hidden md:flex items-center space-x-2">
            <span class="text-sm text-gray-500">
              Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </span>
          </div>
          
          <button
            @click="nextPage"
            :disabled="pagination.current_page >= pagination.last_page"
            class="flex-1 sm:flex-none inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-target transition-colors"
          >
            Next
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Modals -->
    <BookingDetailsModal
      v-if="selectedBooking"
      :booking="selectedBooking"
      :user-role="userRole"
      @close="selectedBooking = null"
      @action="handleBookingAction"
    />

    <RescheduleModal
      v-if="rescheduleBooking"
      :booking="rescheduleBooking"
      @close="rescheduleBooking = null"
      @reschedule="handleRescheduleConfirm"
    />

    <CancelModal
      v-if="cancelBooking"
      :booking="cancelBooking"
      :user-role="userRole"
      @close="cancelBooking = null"
      @cancel="handleCancelConfirm"
    />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  PlayIcon
} from '@heroicons/vue/24/outline'

// Composables
const { user } = useAuth()
const { currentRole, setRole, hasMultipleRoles: hasMultipleRolesFn, initializeRole } = useRole()
const {
  bookings,
  loading,
  error,
  fetchBookings,
  confirmBooking,
  markInProgress,
  completeBooking,
  cancelBooking: cancelBookingAction,
  rescheduleBooking: rescheduleBookingAction,
  getBookingStatus,
  formatBookingTime,
  canCancelBooking,
  canRescheduleBooking
} = useBooking()

// Page meta
definePageMeta({
  middleware: 'auth'
})

// Page head
useHead({
  title: 'Bookings - ORDO Dashboard',
  meta: [
    { name: 'description', content: 'Manage your service bookings and appointments' }
  ]
})

// Reactive state
const selectedStatus = ref('')
const selectedTimeframe = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const selectedBooking = ref(null)
const rescheduleBooking = ref(null)
const cancelBooking = ref(null)

// Determine user role based on user data and role toggle
const userRole = computed(() => {
  if (!user.value) return 'customer'
  
  // Check if user has both roles
  const userRoles = user.value.roles || ['customer']
  if (userRoles.includes('vendor') && userRoles.includes('customer')) {
    return currentRole.value
  }
  
  // Single role user
  return userRoles.includes('vendor') ? 'vendor' : 'customer'
})

const hasMultipleRoles = computed(() => {
  return hasMultipleRolesFn.value
})

// Filter and search bookings
const filteredBookings = computed(() => {
  let filtered = [...bookings.value]

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(booking => booking.status === selectedStatus.value)
  }

  // Timeframe filter
  if (selectedTimeframe.value !== 'all') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(booking => {
      const bookingDate = new Date(booking.scheduled_at)
      
      switch (selectedTimeframe.value) {
        case 'today':
          return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
        case 'week':
          const weekStart = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)
          const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
          return bookingDate >= weekStart && bookingDate < weekEnd
        case 'month':
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
          const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1)
          return bookingDate >= monthStart && bookingDate < monthEnd
        case 'upcoming':
          return bookingDate >= now
        default:
          return true
      }
    })
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => {
      return (
        booking.booking_reference.toLowerCase().includes(query) ||
        booking.service?.title?.toLowerCase().includes(query) ||
        (userRole.value === 'vendor' ? booking.customer?.name : booking.vendor?.name)?.toLowerCase().includes(query)
      )
    })
  }

  return filtered
})

// Stats computation
const stats = computed(() => {
  const total = bookings.value.length
  const pending = bookings.value.filter(b => b.status === 'pending').length
  const completed = bookings.value.filter(b => b.status === 'completed').length
  const revenue = bookings.value
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.total_amount, 0)

  return { total, pending, completed, revenue: revenue.toFixed(2) }
})

// Pagination
const pagination = computed(() => {
  const total = filteredBookings.value.length
  const perPage = 10
  const totalPages = Math.ceil(total / perPage)
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage

  return {
    current_page: currentPage.value,
    last_page: totalPages,
    per_page: perPage,
    total,
    from: start + 1,
    to: Math.min(end, total)
  }
})

// Methods
const filterBookings = async () => {
  currentPage.value = 1
  await loadBookings()
}

const loadBookings = async () => {
  try {
    const filters = {
      type: userRole.value,
      per_page: 50 // Load more for client-side filtering
    }
    
    if (selectedStatus.value) {
      filters.status = selectedStatus.value
    }

    await fetchBookings(filters)
  } catch (err) {
    console.error('Failed to load bookings:', err)
  }
}

const getLocationText = (locationType: string) => {
  const locationMap = {
    'vendor_location': 'Provider Location',
    'customer_location': 'Customer Location',
    'online': 'Online'
  }
  return locationMap[locationType] || locationType
}

const viewBookingDetails = (booking) => {
  selectedBooking.value = booking
}

const handleReschedule = (booking) => {
  rescheduleBooking.value = booking
}

const handleCancel = (booking) => {
  cancelBooking.value = booking
}

const handleConfirm = async (booking) => {
  try {
    await confirmBooking(booking.id)
    await loadBookings()
  } catch (err) {
    console.error('Failed to confirm booking:', err)
  }
}

const handleStartService = async (booking) => {
  try {
    await markInProgress(booking.id)
    await loadBookings()
  } catch (err) {
    console.error('Failed to start service:', err)
  }
}

const handleComplete = async (booking) => {
  try {
    await completeBooking(booking.id)
    await loadBookings()
  } catch (err) {
    console.error('Failed to complete booking:', err)
  }
}

const handleRescheduleConfirm = async (booking, newDateTime) => {
  try {
    await rescheduleBookingAction(booking.id, newDateTime)
    rescheduleBooking.value = null
    await loadBookings()
  } catch (err) {
    console.error('Failed to reschedule booking:', err)
  }
}

const handleCancelConfirm = async (booking, reason) => {
  // The CancelModal now handles the API call directly
  // This function is called on success, so we just need to clean up
  cancelBooking.value = null
  await loadBookings()
  console.log('Booking cancelled successfully')
}

const handleBookingAction = async (action, booking) => {
  switch (action) {
    case 'confirm':
      await handleConfirm(booking)
      break
    case 'start':
      await handleStartService(booking)
      break
    case 'complete':
      await handleComplete(booking)
      break
    case 'cancel':
      handleCancel(booking)
      break
    case 'reschedule':
      handleReschedule(booking)
      break
  }
  selectedBooking.value = null
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < pagination.value.last_page) {
    currentPage.value++
  }
}

// Watch for role changes
watch(userRole, () => {
  loadBookings()
})

// Initial load
onMounted(() => {
  initializeRole()
  loadBookings()
})
</script>

<style scoped>
/* Mobile-First Touch Targets */
.touch-target {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile: Enhanced touch targets */
@media (max-width: 640px) {
  .touch-target {
    min-height: 48px;
  }
  
  /* Better spacing for mobile cards */
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  /* Improve grid spacing on mobile */
  .grid.gap-4 {
    gap: 0.75rem;
  }
  
  /* Enhanced button styling for mobile */
  .rounded-xl {
    border-radius: 0.75rem;
  }
  
  /* Better text sizing for mobile */
  .text-base {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  /* Optimize card padding */
  .p-4 {
    padding: 1rem;
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .touch-target {
    min-height: 44px;
  }
}

/* Desktop optimizations */
@media (min-width: 1025px) {
  .touch-target {
    min-height: 40px;
  }
}

/* Enhanced booking status colors */
.bg-yellow-100 {
  background-color: rgb(254 249 195);
}

.text-yellow-800 {
  color: rgb(133 77 14);
}

.bg-blue-100 {
  background-color: rgb(219 234 254);
}

.text-blue-800 {
  color: rgb(30 64 175);
}

.bg-green-100 {
  background-color: rgb(220 252 231);
}

.text-green-800 {
  color: rgb(22 101 52);
}

.bg-purple-100 {
  background-color: rgb(243 232 255);
}

.text-purple-800 {
  color: rgb(107 33 168);
}

.bg-red-100 {
  background-color: rgb(254 226 226);
}

.text-red-800 {
  color: rgb(153 27 27);
}

.bg-gray-100 {
  background-color: rgb(243 244 246);
}

.text-gray-800 {
  color: rgb(31 41 55);
}

/* Collapsible details enhancement */
details[open] summary {
  color: rgb(59 130 246);
}

details summary::-webkit-details-marker {
  display: none;
}

details summary::-moz-details-marker {
  display: none;
}

/* Smooth transitions for mobile interactions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Enhanced focus states for accessibility */
@media (pointer: coarse) {
  .hover\:bg-gray-50:hover {
    background-color: rgb(249 250 251);
  }
  
  .hover\:bg-blue-50:hover {
    background-color: rgb(239 246 255);
  }
  
  .hover\:bg-red-50:hover {
    background-color: rgb(254 242 242);
  }
  
  .hover\:bg-green-50:hover {
    background-color: rgb(240 253 244);
  }
}

/* Grid layout improvements */
.grid-cols-2 > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Text truncation for long content */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Min-width constraints for better mobile layout */
.min-w-0 {
  min-width: 0;
}

/* Enhanced shadow for better mobile visual hierarchy */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>