<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="closeModal">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <!-- Modal -->
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Book {{ service?.title }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ service?.formatted_price }} • {{ service?.duration_minutes }} minutes</p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Calendar -->
            <div class="lg:col-span-2">
              <div class="bg-gray-50 rounded-xl p-6">
                <!-- Calendar Header -->
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Select Date & Time</h3>
                  <div class="flex space-x-1 bg-white rounded-lg p-1">
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
                  </div>
                </div>
                
                <!-- Navigation -->
                <div class="flex items-center justify-between mb-4">
                  <button
                    @click="previousPeriod"
                    class="p-2 hover:bg-white rounded-md transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h4 class="text-lg font-medium text-gray-900">{{ currentPeriodLabel }}</h4>
                  <button
                    @click="nextPeriod"
                    class="p-2 hover:bg-white rounded-md transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Calendar Content -->
                <div class="space-y-4">
                  <!-- Loading State -->
                  <div v-if="loadingSlots" class="text-center py-8">
                    <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p class="text-gray-600">Loading available times...</p>
                  </div>

                  <!-- Week View -->
                  <div v-else-if="calendarView === 'week'">
                    <div v-if="weekDays.length === 0" class="text-center py-8 text-gray-500">
                      No availability for this week
                    </div>
                    <div v-else>
                      <div v-for="day in weekDays" :key="day.date" class="border-b border-gray-200 pb-4 last:border-b-0">
                        <div class="flex items-center justify-between mb-3">
                          <div class="flex items-center space-x-3">
                            <div class="text-lg font-semibold text-gray-900">{{ day.day_name }}</div>
                            <div class="text-sm text-gray-500">{{ day.formatted_date }}</div>
                          </div>
                          <div v-if="!day.has_slots" class="text-sm text-gray-400">No availability</div>
                        </div>
                        <div v-if="day.has_slots" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          <button
                            v-for="slot in day.slots"
                            :key="slot.id"
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
                  </div>

                  <!-- Month View -->
                  <div v-else-if="calendarView === 'month'">
                    <div v-if="monthDays.length === 0" class="text-center py-8 text-gray-500">
                      No availability for this month
                    </div>
                    <div v-else>
                      <!-- Month Calendar Grid -->
                      <div class="grid grid-cols-7 gap-1 mb-4">
                        <!-- Day headers -->
                        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" 
                             :key="day" 
                             class="text-center text-sm font-medium text-gray-500 py-2">
                          {{ day }}
                        </div>
                        
                        <!-- Calendar days -->
                        <button
                          v-for="day in monthDays"
                          :key="`${day.fullDate.getTime()}`"
                          @click="selectDate(day)"
                          :disabled="!day.isCurrentMonth || day.isPast || !day.hasSlots"
                          :class="[
                            'aspect-square p-1 text-sm rounded-md border transition-colors relative',
                            day.isCurrentMonth ? 'border-gray-200' : 'border-transparent',
                            day.isToday ? 'bg-blue-50 border-blue-300 font-semibold' : '',
                            day.hasSlots && day.isCurrentMonth && !day.isPast
                              ? 'hover:bg-blue-50 hover:border-blue-300 cursor-pointer'
                              : '',
                            !day.isCurrentMonth ? 'text-gray-300' : 
                            day.isPast ? 'text-gray-400 cursor-not-allowed' :
                            day.hasSlots ? 'text-gray-900' : 'text-gray-400',
                            selectedDate?.toDateString() === day.fullDate.toDateString()
                              ? 'bg-blue-600 text-white border-blue-600'
                              : ''
                          ]"
                        >
                          {{ day.date }}
                          <!-- Availability indicator -->
                          <div v-if="day.hasSlots && day.isCurrentMonth && !day.isPast" 
                               class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full">
                          </div>
                        </button>
                      </div>
                      
                      <!-- Selected Date Time Slots -->
                      <div v-if="selectedDate && selectedDateSlots.length > 0" id="selected-date-time-slots" class="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-blue-200 animate-fade-in">
                        <h4 class="text-lg font-medium text-gray-900 mb-3">
                          Available times for {{ selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }}
                        </h4>
                        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          <button
                            v-for="slot in selectedDateSlots"
                            :key="slot.id"
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
                      
                      <!-- Instruction for month view -->
                      <div v-else-if="!selectedDate" class="mt-6 text-center text-gray-500 text-sm">
                        Click on a date with availability (green dot) to see available times
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Booking Summary -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <!-- Service Details -->
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Service</span>
                    <span class="font-medium">{{ service?.title }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Duration</span>
                    <span class="font-medium">{{ service?.duration_minutes }} min</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Price</span>
                    <span class="font-medium">{{ service?.formatted_price }}</span>
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
                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span v-if="isProcessing" class="flex items-center justify-center">
                      <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                    <span v-else>Continue to Payment</span>
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
import { ref, computed, watch, nextTick } from 'vue'

interface Props {
  isOpen: boolean
  service: any
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Composables
const { isAuthenticated } = useAuth()
const { createBooking, fetchAvailableSlots } = useBooking()
const router = useRouter()
const route = useRoute()

// State
const calendarView = ref('week')
const currentDate = ref(new Date())
const selectedSlot = ref(null)
const isProcessing = ref(false)
const loadingSlots = ref(false)
const guestInfo = ref({
  email: '',
  phone: '',
  name: ''
})

// Available slots from API
const availabilitySlots = ref([])

// Computed
const currentPeriodLabel = computed(() => {
  if (calendarView.value === 'week') {
    const start = getWeekStart(currentDate.value)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  } else {
    return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
})

const weekDays = computed(() => {
  // Return the API data directly as it's already formatted correctly
  return availabilitySlots.value
})

const monthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // Get first day of month and how many days in month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()
  
  // Create array of all days to display (including padding days)
  const days = []
  
  // Add padding days from previous month
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(year, month - 1, daysInPrevMonth - i),
      hasSlots: false,
      slots: []
    })
  }
  
  // Add days of current month
  const today = new Date()
  for (let date = 1; date <= daysInMonth; date++) {
    const fullDate = new Date(year, month, date)
    const dateStr = fullDate.toISOString().split('T')[0]
    
    // Find if this date has available slots
    const dayWithSlots = availabilitySlots.value.find(day => day.date === dateStr)
    
    days.push({
      date,
      isCurrentMonth: true,
      isToday: fullDate.toDateString() === today.toDateString(),
      fullDate,
      hasSlots: dayWithSlots?.has_slots || false,
      slots: dayWithSlots?.slots || [],
      isPast: fullDate < today.setHours(0, 0, 0, 0)
    })
  }
  
  // Add padding days from next month
  const totalCells = 42 // 6 rows × 7 days
  const remainingCells = totalCells - days.length
  for (let date = 1; date <= remainingCells; date++) {
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      fullDate: new Date(year, month + 1, date),
      hasSlots: false,
      slots: []
    })
  }
  
  return days
})

const selectedDate = ref(null)
const selectedDateSlots = computed(() => {
  if (!selectedDate.value) return []
  const dateStr = selectedDate.value.toISOString().split('T')[0]
  const dayWithSlots = availabilitySlots.value.find(day => day.date === dateStr)
  return dayWithSlots?.slots || []
})

const canProceed = computed(() => {
  if (!selectedSlot.value) return false
  
  if (!isAuthenticated.value) {
    return guestInfo.value.email && guestInfo.value.phone && guestInfo.value.name
  }
  
  return true
})

// Methods
const closeModal = () => {
  emit('close')
}

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
  } else {
    newDate.setMonth(newDate.getMonth() - 1)
  }
  currentDate.value = newDate
}

const nextPeriod = () => {
  const newDate = new Date(currentDate.value)
  if (calendarView.value === 'week') {
    newDate.setDate(newDate.getDate() + 7)
  } else {
    newDate.setMonth(newDate.getMonth() + 1)
  }
  currentDate.value = newDate
}

const selectTimeSlot = (slot: any) => {
  selectedSlot.value = slot
}

const selectDate = (day: any) => {
  if (!day.isCurrentMonth || day.isPast || !day.hasSlots) return
  selectedDate.value = day.fullDate
  selectedSlot.value = null // Reset selected slot when changing date
  
  // Auto-scroll to time slots section after a short delay
  nextTick(() => {
    setTimeout(() => {
      const timeSlotsSection = document.querySelector('#selected-date-time-slots')
      const modalContent = document.querySelector('.modal-content')
      
      if (timeSlotsSection && modalContent) {
        // Scroll within the modal content instead of the entire page
        const sectionTop = timeSlotsSection.offsetTop
        const modalScrollTop = modalContent.scrollTop
        const modalHeight = modalContent.clientHeight
        const sectionHeight = timeSlotsSection.clientHeight
        
        // Calculate optimal scroll position
        const targetScrollTop = sectionTop - (modalHeight / 2) + (sectionHeight / 2)
        
        modalContent.scrollTo({
          top: Math.max(0, targetScrollTop),
          behavior: 'smooth'
        })
      }
    }, 100) // Small delay to ensure the time slots have rendered
  })
}

// Load available slots from API
const loadAvailableSlots = async () => {
  if (!props.service) return
  
  loadingSlots.value = true
  
  try {
    // Extract user slug and service slug from service data
    const userSlug = props.service.user?.slug
    const serviceSlug = props.service.slug
    
    if (!userSlug || !serviceSlug) {
      console.error('Missing user or service slug')
      return
    }
    
    let startDate, endDate
    
    if (calendarView.value === 'week') {
      // Get date range for current week
      startDate = getWeekStart(currentDate.value).toISOString().split('T')[0]
      const endDateObj = new Date(getWeekStart(currentDate.value))
      endDateObj.setDate(endDateObj.getDate() + 6)
      endDate = endDateObj.toISOString().split('T')[0]
    } else if (calendarView.value === 'month') {
      // Get date range for current month
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      startDate = new Date(year, month, 1).toISOString().split('T')[0]
      endDate = new Date(year, month + 1, 0).toISOString().split('T')[0]
    }
    
    const slots = await fetchAvailableSlots(userSlug, serviceSlug, {
      start_date: startDate,
      end_date: endDate,
      duration: props.service.duration_minutes || 60
    })
    
    availabilitySlots.value = slots
  } catch (error) {
    console.error('Failed to load available slots:', error)
  } finally {
    loadingSlots.value = false
  }
}

const proceedToPayment = async () => {
  if (!canProceed.value || !selectedSlot.value) return
  
  isProcessing.value = true
  
  try {
    // Prepare booking data
    const bookingData = {
      service_id: props.service.id,
      scheduled_at: selectedSlot.value.datetime,
      duration_minutes: selectedSlot.value.duration_minutes,
      location_type: props.service.location_type,
      // Add guest info if not authenticated
      ...(isAuthenticated.value ? {} : {
        guest_email: guestInfo.value.email,
        guest_phone: guestInfo.value.phone,
        guest_name: guestInfo.value.name
      })
    }
    
    // Create booking
    const booking = await createBooking(bookingData)
    
    // Close modal and redirect to payment page
    closeModal()
    await router.push(`/booking/payment/${booking.id}`)
    
  } catch (err) {
    console.error('Failed to create booking:', err)
    // Handle error (show toast, etc.)
  } finally {
    isProcessing.value = false
  }
}

// Reset form when modal opens/closes
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // Load available slots when modal opens
    loadAvailableSlots()
  } else {
    selectedSlot.value = null
    selectedDate.value = null
    guestInfo.value = { email: '', phone: '', name: '' }
    isProcessing.value = false
  }
})

// Reload slots when week/month changes
watch(currentDate, () => {
  if (props.isOpen) {
    loadAvailableSlots()
  }
})

// Reload slots when switching between week and month view
watch(calendarView, () => {
  if (props.isOpen) {
    selectedDate.value = null
    selectedSlot.value = null
    loadAvailableSlots()
  }
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Fade-in animation for selected date time slots */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>