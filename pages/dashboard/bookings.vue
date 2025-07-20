<template>
  <NuxtLayout name="dashboard">
    <div>
    <!-- Role Toggle (if user has both roles) -->
    <div v-if="hasMultipleRoles" class="mb-6 flex items-center justify-end">
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">View as:</span>
        <div class="bg-gray-100 p-1 rounded-lg flex">
          <button
            @click="setRole('customer')"
            :class="[
              'px-3 py-1 text-sm font-medium rounded-md transition-colors',
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
              'px-3 py-1 text-sm font-medium rounded-md transition-colors',
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

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <CalendarIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Bookings</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Completed</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <CurrencyDollarIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">
              {{ userRole === 'vendor' ? 'Revenue' : 'Spent' }}
            </p>
            <p class="text-2xl font-bold text-gray-900">R{{ stats.revenue }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            @change="filterBookings"
            class="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <!-- Date Filter -->
          <select
            v-model="selectedTimeframe"
            @change="filterBookings"
            class="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        <!-- Search -->
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="filterBookings"
            type="text"
            placeholder="Search bookings..."
            class="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredBookings.length === 0" class="text-center py-12">
      <CalendarIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ userRole === 'vendor' 
          ? 'Your services haven\'t been booked yet.' 
          : 'You haven\'t made any bookings yet.' 
        }}
      </p>
      <div class="mt-6">
        <NuxtLink
          :to="userRole === 'vendor' ? '/dashboard/services' : '/search'"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ userRole === 'vendor' ? 'Create Service' : 'Browse Services' }}
        </NuxtLink>
      </div>
    </div>

    <!-- Bookings List -->
    <div v-else class="space-y-4">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Booking Header -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ booking.service?.title || 'Service' }}
                    </h3>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getBookingStatus(booking).color
                      ]"
                    >
                      {{ getBookingStatus(booking).text }}
                    </span>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Booking #{{ booking.booking_reference }}</p>
                    <p class="text-lg font-semibold text-gray-900">
                      R{{ booking.total_amount.toFixed(2) }}
                    </p>
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ userRole === 'vendor' ? 'Customer' : 'Provider' }}
                    </p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ userRole === 'vendor' ? booking.customer?.name : booking.vendor?.name }}
                    </p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Date & Time</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ formatBookingTime(booking.scheduled_at).date }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ formatBookingTime(booking.scheduled_at).time }}
                    </p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Duration</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ booking.duration_minutes }} minutes
                    </p>
                  </div>
                  
                  <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <p class="text-sm font-medium text-gray-900">
                      {{ getLocationText(booking.location_type) }}
                    </p>
                  </div>
                </div>

                <!-- Notes -->
                <div v-if="booking.customer_notes || booking.vendor_notes" class="mb-4">
                  <div v-if="booking.customer_notes" class="mb-2">
                    <p class="text-sm text-gray-500">Customer Notes:</p>
                    <p class="text-sm text-gray-700">{{ booking.customer_notes }}</p>
                  </div>
                  <div v-if="booking.vendor_notes">
                    <p class="text-sm text-gray-500">Provider Notes:</p>
                    <p class="text-sm text-gray-700">{{ booking.vendor_notes }}</p>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap items-center gap-2">
                  <!-- Customer Actions -->
                  <template v-if="userRole === 'customer'">
                    <button
                      v-if="canRescheduleBooking(booking)"
                      @click="handleReschedule(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ClockIcon class="w-4 h-4 mr-1" />
                      Reschedule
                    </button>
                    
                    <button
                      v-if="canCancelBooking(booking)"
                      @click="handleCancel(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XMarkIcon class="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </template>

                  <!-- Vendor Actions -->
                  <template v-if="userRole === 'vendor'">
                    <button
                      v-if="booking.status === 'pending'"
                      @click="handleConfirm(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <CheckCircleIcon class="w-4 h-4 mr-1" />
                      Confirm
                    </button>
                    
                    <button
                      v-if="booking.status === 'confirmed'"
                      @click="handleStartService(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlayIcon class="w-4 h-4 mr-1" />
                      Start Service
                    </button>
                    
                    <button
                      v-if="booking.status === 'in_progress'"
                      @click="handleComplete(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <CheckIcon class="w-4 h-4 mr-1" />
                      Complete
                    </button>
                    
                    <button
                      v-if="canCancelBooking(booking)"
                      @click="handleCancel(booking)"
                      class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <XMarkIcon class="w-4 h-4 mr-1" />
                      Cancel
                    </button>
                  </template>

                  <!-- View Details -->
                  <button
                    @click="viewBookingDetails(booking)"
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <EyeIcon class="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.total > pagination.per_page" class="mt-8">
      <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div class="hidden sm:block">
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
        <div class="flex-1 flex justify-between sm:justify-end">
          <button
            @click="previousPage"
            :disabled="pagination.current_page <= 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="pagination.current_page >= pagination.last_page"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
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