<template>
  <div class="availability-calendar">
    <div class="calendar-header">
      <button
        @click="previousMonth"
        :disabled="loading"
        class="nav-button"
        aria-label="Previous month"
      >
        <ChevronLeftIcon class="w-5 h-5" />
      </button>
      
      <h3 class="month-year">
        {{ formatMonthYear(currentDate) }}
      </h3>
      
      <button
        @click="nextMonth"
        :disabled="loading"
        class="nav-button"
        aria-label="Next month"
      >
        <ChevronRightIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="calendar-grid">
      <!-- Day headers -->
      <div
        v-for="day in dayHeaders"
        :key="day"
        class="day-header"
      >
        {{ day }}
      </div>

      <!-- Calendar days -->
      <div
        v-for="day in calendarDays"
        :key="`${day.date.toISOString()}-${day.isCurrentMonth}`"
        :class="[
          'calendar-day',
          {
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'selected': day.isSelected,
            'unavailable': !day.isAvailable,
            'has-slots': day.availableSlots.length > 0
          }
        ]"
        @click="day.isAvailable && selectDate(day)"
      >
        <span class="day-number">{{ day.date.getDate() }}</span>
        <div v-if="day.availableSlots.length > 0" class="slot-indicators">
          <div
            v-for="slot in day.availableSlots.slice(0, 3)"
            :key="slot.id"
            class="slot-indicator"
            :title="`${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`"
          ></div>
          <span v-if="day.availableSlots.length > 3" class="more-slots">
            +{{ day.availableSlots.length - 3 }}
          </span>
        </div>
      </div>
    </div>

    <!-- Time slots for selected date -->
    <div v-if="selectedDate && availableTimeSlots.length > 0" class="time-slots">
      <h4 class="time-slots-title">
        Available times for {{ formatSelectedDate(selectedDate) }}
      </h4>
      
      <div class="time-slots-grid">
        <button
          v-for="slot in availableTimeSlots"
          :key="slot.id"
          :class="[
            'time-slot',
            {
              'selected': selectedTimeSlot?.id === slot.id,
              'booked': slot.isBooked
            }
          ]"
          :disabled="slot.isBooked || loading"
          @click="selectTimeSlot(slot)"
        >
          <span class="time">{{ formatTime(slot.start_time) }}</span>
          <span class="duration">{{ slot.duration }}min</span>
          <span v-if="slot.isBooked" class="status">Booked</span>
        </button>
      </div>
    </div>

    <!-- No availability message -->
    <div v-else-if="selectedDate && availableTimeSlots.length === 0" class="no-availability">
      <p>No available time slots for {{ formatSelectedDate(selectedDate) }}</p>
      <p class="text-sm text-gray-500">Please select another date.</p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading availability...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

interface AvailabilitySlot {
  id: string
  day_of_week: number
  start_time: string
  end_time: string
  duration: number
  is_available: boolean
  isBooked?: boolean
}

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isAvailable: boolean
  availableSlots: AvailabilitySlot[]
}

interface Props {
  serviceId: string
  selectedDate?: Date | null
  selectedTimeSlot?: AvailabilitySlot | null
  minDate?: Date
  maxMonthsAhead?: number
}

interface Emits {
  (event: 'dateSelected', date: Date): void
  (event: 'timeSlotSelected', slot: AvailabilitySlot): void
  (event: 'availabilityLoaded', slots: AvailabilitySlot[]): void
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: null,
  selectedTimeSlot: null,
  minDate: () => new Date(),
  maxMonthsAhead: 3
})

const emit = defineEmits<Emits>()

const { $fetch } = useNuxtApp()

// Reactive state
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(props.selectedDate)
const selectedTimeSlot = ref<AvailabilitySlot | null>(props.selectedTimeSlot)
const availabilityData = ref<AvailabilitySlot[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Day headers
const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Computed properties
const calendarDays = computed((): CalendarDay[] => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const days: CalendarDay[] = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    const isCurrentMonth = date.getMonth() === month
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate.value ? date.toDateString() === selectedDate.value.toDateString() : false
    const isPast = date < props.minDate
    const isTooFar = date > new Date(today.getFullYear(), today.getMonth() + props.maxMonthsAhead, today.getDate())
    
    // Get available slots for this date
    const dayOfWeek = date.getDay()
    const availableSlots = availabilityData.value.filter(slot => 
      slot.day_of_week === dayOfWeek && slot.is_available
    )
    
    const isAvailable = isCurrentMonth && !isPast && !isTooFar && availableSlots.length > 0
    
    days.push({
      date,
      isCurrentMonth,
      isToday,
      isSelected,
      isAvailable,
      availableSlots
    })
  }
  
  return days
})

const availableTimeSlots = computed((): AvailabilitySlot[] => {
  if (!selectedDate.value) return []
  
  const dayOfWeek = selectedDate.value.getDay()
  return availabilityData.value.filter(slot => 
    slot.day_of_week === dayOfWeek && slot.is_available
  )
})

// Methods
const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

const formatSelectedDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const date = new Date()
  date.setHours(parseInt(hours), parseInt(minutes))
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })
}

const previousMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  
  // Don't go before current month
  const today = new Date()
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  if (newDate >= currentMonth) {
    currentDate.value = newDate
  }
}

const nextMonth = (): void => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  
  // Don't go beyond max months ahead
  const today = new Date()
  const maxMonth = new Date(today.getFullYear(), today.getMonth() + props.maxMonthsAhead, 1)
  if (newDate <= maxMonth) {
    currentDate.value = newDate
  }
}

const selectDate = (day: CalendarDay): void => {
  if (!day.isAvailable) return
  
  selectedDate.value = day.date
  selectedTimeSlot.value = null
  emit('dateSelected', day.date)
}

const selectTimeSlot = (slot: AvailabilitySlot): void => {
  if (slot.isBooked) return
  
  selectedTimeSlot.value = slot
  emit('timeSlotSelected', slot)
}

const fetchAvailability = async (): Promise<void> => {
  if (!props.serviceId) return
  
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch(`/api/v1/services/${props.serviceId}/availability`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    
    availabilityData.value = response.availability_slots || []
    emit('availabilityLoaded', availabilityData.value)
  } catch (err: any) {
    error.value = err.message || 'Failed to load availability'
    console.error('Error fetching availability:', err)
  } finally {
    loading.value = false
  }
}

const checkBookedSlots = async (): Promise<void> => {
  if (!selectedDate.value || !props.serviceId) return
  
  try {
    const response = await $fetch(`/api/v1/services/${props.serviceId}/booked-slots`, {
      method: 'GET',
      query: {
        date: selectedDate.value.toISOString().split('T')[0]
      },
      headers: {
        'Accept': 'application/json'
      }
    })
    
    // Mark slots as booked
    const bookedSlotIds = response.booked_slots || []
    availableTimeSlots.value.forEach(slot => {
      slot.isBooked = bookedSlotIds.includes(slot.id)
    })
  } catch (err) {
    console.error('Error checking booked slots:', err)
  }
}

// Watchers
watch(() => props.serviceId, fetchAvailability, { immediate: true })
watch(() => props.selectedDate, (newDate) => {
  selectedDate.value = newDate
})
watch(() => props.selectedTimeSlot, (newSlot) => {
  selectedTimeSlot.value = newSlot
})
watch(selectedDate, checkBookedSlots)

// Lifecycle
onMounted(() => {
  // Set current date to today if not already set
  if (currentDate.value < props.minDate) {
    currentDate.value = new Date(props.minDate)
  }
})
</script>

<style scoped>
.availability-calendar {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md mx-auto;
}

.calendar-header {
  @apply flex items-center justify-between mb-6;
}

.nav-button {
  @apply p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed;
}

.month-year {
  @apply text-lg font-semibold text-gray-900;
}

.calendar-grid {
  @apply grid grid-cols-7 gap-1 mb-6;
}

.day-header {
  @apply text-center text-sm font-medium text-gray-500 py-2;
}

.calendar-day {
  @apply relative aspect-square flex flex-col items-center justify-center text-sm border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors;
}

.calendar-day.other-month {
  @apply text-gray-300 cursor-not-allowed;
}

.calendar-day.today {
  @apply bg-blue-50 border-blue-200 text-blue-600 font-medium;
}

.calendar-day.selected {
  @apply bg-blue-500 text-white border-blue-500;
}

.calendar-day.unavailable {
  @apply text-gray-300 cursor-not-allowed bg-gray-50;
}

.calendar-day.has-slots {
  @apply border-green-200 bg-green-50;
}

.calendar-day.has-slots.selected {
  @apply bg-blue-500 border-blue-500;
}

.day-number {
  @apply mb-1;
}

.slot-indicators {
  @apply flex items-center gap-1;
}

.slot-indicator {
  @apply w-1 h-1 bg-green-400 rounded-full;
}

.more-slots {
  @apply text-xs text-green-600;
}

.time-slots {
  @apply border-t border-gray-200 pt-6;
}

.time-slots-title {
  @apply text-sm font-medium text-gray-900 mb-4;
}

.time-slots-grid {
  @apply grid grid-cols-2 gap-2;
}

.time-slot {
  @apply flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}

.time-slot.selected {
  @apply border-blue-500 bg-blue-50 text-blue-600;
}

.time-slot.booked {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.time {
  @apply text-sm font-medium;
}

.duration {
  @apply text-xs text-gray-500;
}

.status {
  @apply text-xs text-red-500 mt-1;
}

.no-availability {
  @apply text-center py-8 text-gray-500;
}

.loading-overlay {
  @apply absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center;
}

.spinner {
  @apply w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-2;
}
</style>