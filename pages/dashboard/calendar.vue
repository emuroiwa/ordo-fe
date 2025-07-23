<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Calendar Header -->
      <div class="mb-6">
        <!-- Mobile: Stack layout -->
        <div class="md:flex md:items-center md:justify-between space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Calendar</h1>
            <p class="text-gray-600 text-sm sm:text-base">Manage your appointments and availability</p>
          </div>
          
          <!-- Mobile: Actions First -->
          <div class="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <!-- Mobile: Quick Actions (Priority) -->
            <div class="flex space-x-3 order-1 md:order-2">
              <button
                @click="showAvailabilityModal = true"
                class="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-3 md:py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target"
              >
                <ClockIcon class="w-4 h-4 mr-2" />
                <span class="hidden sm:inline">Set Availability</span>
                <span class="sm:hidden">Availability</span>
              </button>
              
              <button
                @click="showBookingModal = true"
                class="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-3 md:py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target"
              >
                <PlusIcon class="w-4 h-4 mr-2" />
                <span class="hidden sm:inline">New Appointment</span>
                <span class="sm:hidden">Add</span>
              </button>
            </div>
            
            <!-- Mobile: View Toggle (Secondary) -->
            <div class="bg-gray-100 p-1 rounded-xl flex order-2 md:order-1">
              <button
                @click="currentView = 'month'"
                :class="[
                  'flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors touch-target',
                  currentView === 'month' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Month
              </button>
              <button
                @click="currentView = 'week'"
                :class="[
                  'flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors touch-target',
                  currentView === 'week' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Week
              </button>
              <button
                @click="currentView = 'day'"
                :class="[
                  'flex-1 md:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-colors touch-target',
                  currentView === 'day' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Day
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendar Navigation -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 md:space-x-4">
            <button
              @click="navigateCalendar('prev')"
              class="p-3 md:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors touch-target"
            >
              <ChevronLeftIcon class="w-6 h-6 md:w-5 md:h-5" />
            </button>
            
            <h2 class="text-base sm:text-lg font-semibold text-gray-900 min-w-0 flex-1 text-center md:text-left truncate">
              {{ formatCurrentPeriod }}
            </h2>
            
            <button
              @click="navigateCalendar('next')"
              class="p-3 md:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors touch-target"
            >
              <ChevronRightIcon class="w-6 h-6 md:w-5 md:h-5" />
            </button>
          </div>
          
          <button
            @click="goToToday"
            class="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium rounded-xl transition-colors touch-target"
          >
            Today
          </button>
        </div>
      </div>

      <!-- Calendar Content -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Month View -->
        <div v-if="currentView === 'month'" class="p-3 sm:p-6">
          <!-- Days of Week Header -->
          <div class="grid grid-cols-7 gap-1 mb-4">
            <div 
              v-for="(day, index) in daysOfWeek" 
              :key="day"
              class="p-2 text-center text-xs sm:text-sm font-medium text-gray-500"
            >
              <!-- Mobile: Show only first letter on very small screens -->
              <span class="sm:hidden">{{ day.charAt(0) }}</span>
              <span class="hidden sm:inline">{{ day }}</span>
            </div>
          </div>
          
          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="(day, index) in calendarDays"
              :key="`${day.date}-${index}`"
              :class="[
                'min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] p-2 border border-gray-100 cursor-pointer transition-colors touch-target',
                day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400',
                day.isToday ? 'bg-blue-50 border-blue-200' : '',
                day.isSelected ? 'bg-blue-100 border-blue-300' : ''
              ]"
              @click="selectDate(day)"
            >
              <div class="flex items-center justify-between mb-1">
                <span 
                  :class="[
                    'text-sm font-medium',
                    day.isToday ? 'text-blue-600' : '',
                    !day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                  ]"
                >
                  {{ day.date }}
                </span>
                
                <!-- Availability Indicator -->
                <div 
                  v-if="day.isAvailable && day.isCurrentMonth"
                  class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"
                  title="Available"
                ></div>
              </div>
              
              <!-- Appointments for this day -->
              <div class="space-y-1 overflow-hidden">
                <!-- Mobile: Show appointment count if more than 1 -->
                <div v-if="day.appointments.length > 1" class="sm:hidden">
                  <div class="text-xs p-1 rounded bg-blue-100 text-blue-800 text-center touch-target">
                    {{ day.appointments.length }} appts
                  </div>
                </div>
                
                <!-- Desktop: Show individual appointments -->
                <div v-else-if="day.appointments.length === 1" class="sm:space-y-1">
                  <div
                    v-for="appointment in day.appointments.slice(0, 2)"
                    :key="appointment.id"
                    :class="[
                      'text-xs p-1 rounded truncate cursor-pointer touch-target',
                      getAppointmentColor(appointment.status)
                    ]"
                    @click.stop="viewAppointment(appointment)"
                    :title="`${appointment.time} - ${appointment.service?.title}`"
                  >
                    <!-- Mobile: Show time only -->
                    <span class="sm:hidden">{{ appointment.time }}</span>
                    <!-- Desktop: Show full info -->
                    <span class="hidden sm:inline">{{ appointment.time }} {{ appointment.customer?.name }}</span>
                  </div>
                  
                  <!-- Show +N more indicator if there are more appointments -->
                  <div v-if="day.appointments.length > 2" class="hidden sm:block text-xs text-gray-500 text-center">
                    +{{ day.appointments.length - 2 }} more
                  </div>
                </div>
                
                <!-- Multiple appointments on mobile -->
                <div v-else class="hidden sm:block space-y-1">
                  <div
                    v-for="appointment in day.appointments.slice(0, 3)"
                    :key="appointment.id"
                    :class="[
                      'text-xs p-1 rounded truncate cursor-pointer touch-target',
                      getAppointmentColor(appointment.status)
                    ]"
                    @click.stop="viewAppointment(appointment)"
                    :title="`${appointment.time} - ${appointment.service?.title}`"
                  >
                    {{ appointment.time }} {{ appointment.customer?.name }}
                  </div>
                  
                  <div v-if="day.appointments.length > 3" class="text-xs text-gray-500 text-center">
                    +{{ day.appointments.length - 3 }} more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Week View -->
        <div v-else-if="currentView === 'week'" class="p-3 sm:p-6 overflow-x-auto">
          <!-- Mobile: Horizontal scroll wrapper -->
          <div class="min-w-[600px] sm:min-w-0">
            <div class="grid grid-cols-8 gap-1">
              <!-- Time Column -->
              <div class="space-y-1">
                <div class="h-12 sm:h-16"></div> <!-- Header spacer -->
                <div
                  v-for="hour in dayHours"
                  :key="hour"
                  class="h-12 sm:h-16 text-xs text-gray-500 pr-1 sm:pr-2 text-right flex items-center justify-end"
                >
                  {{ formatHour(hour) }}
                </div>
              </div>
              
              <!-- Days -->
              <div
                v-for="day in weekDays"
                :key="day.date"
                class="border-l border-gray-200 min-w-[70px] sm:min-w-0"
              >
                <!-- Day Header -->
                <div 
                  :class="[
                    'h-12 sm:h-16 p-1 sm:p-2 text-center border-b border-gray-200',
                    day.isToday ? 'bg-blue-50' : 'bg-gray-50'
                  ]"
                >
                  <div class="text-xs text-gray-500">{{ day.dayName }}</div>
                  <div 
                    :class="[
                      'text-sm font-medium',
                      day.isToday ? 'text-blue-600' : 'text-gray-900'
                    ]"
                  >
                    {{ day.date }}
                  </div>
                </div>
                
                <!-- Time Slots -->
                <div class="relative">
                  <div
                    v-for="hour in dayHours"
                    :key="hour"
                    class="h-12 sm:h-16 border-b border-gray-100 hover:bg-gray-50 cursor-pointer touch-target"
                    @click="createAppointment(day, hour)"
                  ></div>
                  
                  <!-- Appointments -->
                  <div
                    v-for="appointment in day.appointments"
                    :key="appointment.id"
                    :class="[
                      'absolute left-0.5 right-0.5 sm:left-1 sm:right-1 p-1 rounded text-xs cursor-pointer z-10 touch-target',
                      getAppointmentColor(appointment.status)
                    ]"
                    :style="getAppointmentStyle(appointment)"
                    @click="viewAppointment(appointment)"
                  >
                    <div class="font-medium truncate">{{ appointment.customer?.name }}</div>
                    <div class="truncate">{{ appointment.service?.title }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Day View -->
        <div v-else-if="currentView === 'day'" class="p-3 sm:p-6">
          <!-- Mobile: Stack layout -->
          <div class="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <!-- Time Slots -->
            <div class="order-2 lg:order-1">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                {{ formatSelectedDate }}
              </h3>
              
              <div class="space-y-2">
                <div
                  v-for="hour in dayHours"
                  :key="hour"
                  :class="[
                    'flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer transition-colors touch-target',
                    isHourAvailable(hour) ? 'hover:bg-gray-50' : 'bg-gray-100 cursor-not-allowed'
                  ]"
                  @click="isHourAvailable(hour) && createAppointment(selectedDay, hour)"
                >
                  <span class="font-medium text-base">{{ formatHour(hour) }}</span>
                  
                  <div v-if="getAppointmentForHour(hour)" class="flex items-center space-x-2">
                    <div class="text-right flex-1">
                      <div class="text-sm font-medium text-gray-900">{{ getAppointmentForHour(hour).customer?.name }}</div>
                      <div class="text-xs text-gray-500">{{ getAppointmentForHour(hour).service?.title }}</div>
                    </div>
                    <span 
                      :class="[
                        'px-2 py-1 rounded-lg text-xs font-medium',
                        getAppointmentColor(getAppointmentForHour(hour).status)
                      ]"
                    >
                      {{ getAppointmentForHour(hour).status }}
                    </span>
                  </div>
                  
                  <div v-else-if="isHourAvailable(hour)" class="text-sm text-green-600 font-medium">
                    Available
                  </div>
                  
                  <div v-else class="text-sm text-gray-500">
                    Unavailable
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Day Summary -->
            <div class="order-1 lg:order-2">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Day Summary</h3>
              
              <div class="space-y-6">
                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div class="text-2xl font-bold text-blue-600">{{ dayStats.totalAppointments }}</div>
                    <div class="text-sm text-blue-600 font-medium">Appointments</div>
                  </div>
                  <div class="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div class="text-2xl font-bold text-green-600">{{ dayStats.availableSlots }}</div>
                    <div class="text-sm text-green-600 font-medium">Available Slots</div>
                  </div>
                </div>
                
                <!-- Upcoming Appointments -->
                <div v-if="dayAppointments.length > 0">
                  <h4 class="font-medium text-gray-900 mb-3">Today's Appointments</h4>
                  <div class="space-y-3">
                    <div
                      v-for="appointment in dayAppointments"
                      :key="appointment.id"
                      class="p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors touch-target"
                      @click="viewAppointment(appointment)"
                    >
                      <div class="flex items-start justify-between">
                        <div class="flex-1 min-w-0">
                          <div class="font-medium text-gray-900">{{ appointment.time }}</div>
                          <div class="text-sm text-gray-600 truncate">{{ appointment.customer?.name }}</div>
                          <div class="text-sm text-gray-500 truncate">{{ appointment.service?.title }}</div>
                        </div>
                        <span 
                          :class="[
                            'px-3 py-1 rounded-lg text-xs font-medium ml-3 flex-shrink-0',
                            getAppointmentColor(appointment.status)
                          ]"
                        >
                          {{ appointment.status }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="text-center py-8 text-gray-500">
                  <CalendarIcon class="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p class="text-sm">No appointments scheduled for this day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <AvailabilityModal
        v-if="showAvailabilityModal"
        @close="showAvailabilityModal = false"
        @save="handleAvailabilitySave"
      />

      <BookingModal
        v-if="showBookingModal"
        :selected-date="selectedDate"
        :selected-time="selectedTime"
        @close="showBookingModal = false"
        @save="handleBookingSave"
      />

      <AppointmentModal
        v-if="selectedAppointment"
        :appointment="selectedAppointment"
        @close="selectedAppointment = null"
        @update="handleAppointmentUpdate"
        @delete="handleAppointmentDelete"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  CalendarIcon,
  ClockIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

// Explicit imports for calendar components
import AvailabilityModal from '~/components/calendar/AvailabilityModal.vue'
import BookingModal from '~/components/calendar/BookingModal.vue'
import AppointmentModal from '~/components/calendar/AppointmentModal.vue'

// Page meta
definePageMeta({
  middleware: 'auth'
})

// Page head
useHead({
  title: 'Calendar - ORDO Dashboard',
  meta: [
    { name: 'description', content: 'Manage your appointments and availability' }
  ]
})

// Composables
const { user } = useAuth()
const { currentRole } = useRole()
const { 
  bookings, 
  loading, 
  fetchBookings,
  createBooking,
  updateBooking,
  cancelBooking
} = useBooking()
const {
  availabilities,
  fetchAvailabilities,
  isDateAvailable,
  getAvailabilityForDate,
  loading: availabilityLoading
} = useAvailability()

// Reactive state
const currentView = ref<'month' | 'week' | 'day'>('month')
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const selectedTime = ref<string | null>(null)
const selectedAppointment = ref(null)
const showAvailabilityModal = ref(false)
const showBookingModal = ref(false)

// Calendar constants
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Working hours (can be made configurable)
const workingHours = { start: 8, end: 18 } // 8 AM to 6 PM
const dayHours = Array.from({ length: workingHours.end - workingHours.start }, (_, i) => workingHours.start + i)

// Computed properties
const formatCurrentPeriod = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  if (currentView.value === 'month') {
    return `${monthNames[month]} ${year}`
  } else if (currentView.value === 'week') {
    const startOfWeek = getStartOfWeek(currentDate.value)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
      return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${year}`
    } else {
      return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${year}`
    }
  } else {
    const day = currentDate.value.getDate()
    return `${monthNames[month]} ${day}, ${year}`
  }
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const dayData = {
      date: date.getDate(),
      fullDate: new Date(date),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isSelected: selectedDate.value && isSameDay(date, selectedDate.value),
      isAvailable: isDateAvailableLocal(date),
      appointments: getAppointmentsForDate(date)
    }
    
    days.push(dayData)
  }
  
  return days
})

const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(currentDate.value)
  const days = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    
    days.push({
      date: date.getDate(),
      fullDate: new Date(date),
      dayName: daysOfWeek[date.getDay()],
      isToday: isSameDay(date, today),
      appointments: getAppointmentsForDate(date)
    })
  }
  
  return days
})

const selectedDay = computed(() => {
  return selectedDate.value || currentDate.value
})

const formatSelectedDate = computed(() => {
  const date = selectedDay.value
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
})

const dayAppointments = computed(() => {
  return getAppointmentsForDate(selectedDay.value)
})

const dayStats = computed(() => {
  const appointments = dayAppointments.value
  const totalSlots = dayHours.length
  const bookedSlots = appointments.length
  
  return {
    totalAppointments: appointments.length,
    availableSlots: totalSlots - bookedSlots
  }
})

// Methods
const navigateCalendar = (direction: 'prev' | 'next') => {
  const newDate = new Date(currentDate.value)
  
  if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
  } else {
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
  }
  
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

const selectDate = (day: any) => {
  selectedDate.value = day.fullDate
  if (currentView.value === 'month') {
    currentView.value = 'day'
  }
}

const getStartOfWeek = (date: Date) => {
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  return start
}

const isSameDay = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear()
}

const isDateAvailableLocal = (date: Date) => {
  // Check if date is not in the past
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (date < today) {
    return false
  }
  
  // Use the availability composable to check if date is available
  return isDateAvailable(date, availabilities.value)
}

const getAppointmentsForDate = (date: Date) => {
  // Filter bookings for the specific date
  return bookings.value.filter(booking => {
    const bookingDate = new Date(booking.scheduled_at)
    return isSameDay(bookingDate, date)
  }).map(booking => ({
    id: booking.id,
    time: formatTime(new Date(booking.scheduled_at)),
    duration: booking.duration_minutes,
    status: booking.status,
    customer: booking.customer,
    service: booking.service,
    scheduled_at: booking.scheduled_at
  }))
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

const formatHour = (hour: number) => {
  const time = new Date()
  time.setHours(hour, 0, 0, 0)
  return formatTime(time)
}

const getAppointmentColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
    in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getAppointmentStyle = (appointment: any) => {
  const startTime = new Date(appointment.scheduled_at)
  const hour = startTime.getHours()
  const minutes = startTime.getMinutes()
  const duration = appointment.duration || 60
  
  const topOffset = ((hour - workingHours.start) * 64) + (minutes * 64 / 60)
  const height = (duration * 64 / 60)
  
  return {
    top: `${topOffset}px`,
    height: `${height}px`
  }
}

const isHourAvailable = (hour: number) => {
  const appointment = getAppointmentForHour(hour)
  return !appointment && isDateAvailableLocal(selectedDay.value)
}

const getAppointmentForHour = (hour: number) => {
  return dayAppointments.value.find(apt => {
    const aptTime = new Date(apt.scheduled_at)
    return aptTime.getHours() === hour
  })
}

const createAppointment = (day: any, hour: number) => {
  const appointmentDate = new Date(day.fullDate || day)
  appointmentDate.setHours(hour, 0, 0, 0)
  
  selectedDate.value = appointmentDate
  selectedTime.value = formatHour(hour)
  showBookingModal.value = true
}

const viewAppointment = (appointment: any) => {
  selectedAppointment.value = appointment
}

const handleAvailabilitySave = async (availability: any) => {
  // Availability is automatically saved by the modal
  // Refresh calendar data to show new availability
  await loadCalendarData()
  showAvailabilityModal.value = false
}

const handleBookingSave = async (response: any) => {
  try {
    console.log('handleBookingSave called with:', response)
    // The modal now handles the booking creation, we just need to refresh the calendar
    await loadCalendarData()
    // Don't close the modal here - the modal will close itself after showing success
  } catch (error) {
    console.error('Failed to refresh calendar after booking creation:', error)
  }
}

const handleAppointmentUpdate = async (appointmentData: any) => {
  try {
    await updateBooking(appointmentData.id, appointmentData)
    await loadCalendarData()
    selectedAppointment.value = null
  } catch (error) {
    console.error('Failed to update appointment:', error)
  }
}

const handleAppointmentDelete = async (appointmentId: string, reason?: string) => {
  try {
    // Use cancelBooking instead of deleteBooking for proper cancellation flow
    await cancelBooking(appointmentId, reason || 'Cancelled by provider')
    await loadCalendarData()
    selectedAppointment.value = null
  } catch (error) {
    console.error('Failed to cancel appointment:', error)
  }
}

const loadCalendarData = async () => {
  try {
    const startDate = new Date(currentDate.value)
    startDate.setDate(1) // First day of month
    
    const endDate = new Date(currentDate.value)
    endDate.setMonth(endDate.getMonth() + 1, 0) // Last day of month
    
    // Load both bookings and availabilities in parallel
    await Promise.all([
      fetchBookings({
        type: 'vendor',
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        per_page: 100
      }),
      fetchAvailabilities({
        // Can add date filters if needed
      })
    ])
  } catch (error) {
    console.error('Failed to load calendar data:', error)
  }
}

// Watch for date changes to reload data
watch([currentDate, currentView], () => {
  loadCalendarData()
})

// Initial load
onMounted(() => {
  selectedDate.value = new Date()
  loadCalendarData()
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

/* Calendar Grid Responsiveness */
.grid-cols-7 > div {
  position: relative;
}

/* Mobile: Better spacing for calendar cells */
@media (max-width: 640px) {
  .touch-target {
    min-height: 48px;
  }
  
  /* Improve calendar day cells on mobile */
  .grid-cols-7 > div {
    min-height: 80px;
  }
  
  /* Better text sizing on mobile */
  .text-xs {
    font-size: 0.75rem;
  }
  
  /* Improve button spacing */
  .space-x-3 > * + * {
    margin-left: 0.75rem;
  }
  
  /* Optimize week view scrolling */
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .grid-cols-7 > div {
    min-height: 100px;
  }
}

/* Desktop optimizations */
@media (min-width: 1025px) {
  .grid-cols-7 > div {
    min-height: 120px;
  }
  
  .touch-target {
    min-height: 40px;
  }
}

/* Appointment status colors - enhanced for mobile */
.bg-yellow-100 {
  background-color: rgb(254 249 195);
}

.bg-blue-100 {
  background-color: rgb(219 234 254);
}

.bg-green-100 {
  background-color: rgb(220 252 231);
}

.bg-purple-100 {
  background-color: rgb(243 232 255);
}

.bg-red-100 {
  background-color: rgb(254 226 226);
}

/* Mobile week view improvements */
.min-w-\[600px\] {
  min-width: 600px;
}

.min-w-\[70px\] {
  min-width: 70px;
}

/* Enhanced focus states for touch devices */
@media (pointer: coarse) {
  .hover\:bg-gray-50:hover {
    background-color: rgb(249 250 251);
    transition: background-color 0.2s ease;
  }
  
  .hover\:bg-blue-50:hover {
    background-color: rgb(239 246 255);
    transition: background-color 0.2s ease;
  }
}

/* Smooth transitions for mobile interactions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>