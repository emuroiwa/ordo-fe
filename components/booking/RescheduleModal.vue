<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Reschedule Booking
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 class="font-medium text-gray-900 mb-2">Current Booking</h4>
            <div class="text-sm text-gray-600">
              <p><strong>Service:</strong> {{ booking.service?.title }}</p>
              <p><strong>Current Date:</strong> {{ formatDateTime(booking.scheduled_at) }}</p>
              <p><strong>Duration:</strong> {{ booking.duration_minutes }} minutes</p>
            </div>
          </div>

          <!-- New Date Selection -->
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="new-date" class="block text-sm font-medium text-gray-700 mb-2">
                  Select New Date
                </label>
                <input
                  id="new-date"
                  v-model="selectedDate"
                  type="date"
                  :min="minDate"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label for="new-time" class="block text-sm font-medium text-gray-700 mb-2">
                  Select New Time
                </label>
                <select
                  id="new-time"
                  v-model="selectedTime"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a time</option>
                  <option v-for="slot in availableTimeSlots" :key="slot.value" :value="slot.value">
                    {{ slot.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Reason for Rescheduling -->
            <div>
              <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">
                Reason for Rescheduling (Optional)
              </label>
              <textarea
                id="reason"
                v-model="reason"
                rows="3"
                placeholder="Please provide a reason for rescheduling..."
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <!-- New Booking Summary -->
            <div v-if="selectedDate && selectedTime" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-medium text-blue-900 mb-2">New Booking Details</h4>
              <div class="text-sm text-blue-800">
                <p><strong>New Date:</strong> {{ formatNewDateTime() }}</p>
                <p><strong>Duration:</strong> {{ booking.duration_minutes }} minutes</p>
                <p class="mt-2 text-xs text-blue-600">
                  ⚠️ The service provider will need to confirm this new time slot.
                </p>
              </div>
            </div>

            <!-- Warning -->
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" />
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-yellow-800">
                    Important Notice
                  </h3>
                  <div class="mt-2 text-sm text-yellow-700">
                    <ul class="list-disc list-inside space-y-1">
                      <li>Rescheduling must be done at least 24 hours before the original booking time</li>
                      <li>The service provider must approve the new time slot</li>
                      <li>You may be charged a rescheduling fee depending on the service terms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="$emit('close')"
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            @click="confirmReschedule"
            :disabled="!selectedDate || !selectedTime || isLoading"
            type="button"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Rescheduling...' : 'Reschedule Booking' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  booking: any
}>()

const emit = defineEmits<{
  close: []
  reschedule: [booking: any, newDateTime: string]
}>()

// Reactive state
const selectedDate = ref('')
const selectedTime = ref('')
const reason = ref('')
const isLoading = ref(false)

// Computed properties
const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const availableTimeSlots = computed(() => {
  if (!selectedDate.value) return []
  
  // Generate time slots from 8 AM to 6 PM in 30-minute intervals
  const slots = []
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 0) break // Stop at 6:00 PM
      
      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayMinute = minute.toString().padStart(2, '0')
      
      slots.push({
        value: timeValue,
        label: `${displayHour}:${displayMinute} ${period}`
      })
    }
  }
  
  return slots
})

// Methods
const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatNewDateTime = () => {
  if (!selectedDate.value || !selectedTime.value) return ''
  
  const date = new Date(`${selectedDate.value}T${selectedTime.value}`)
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const confirmReschedule = async () => {
  if (!selectedDate.value || !selectedTime.value) return
  
  isLoading.value = true
  
  try {
    const newDateTime = `${selectedDate.value}T${selectedTime.value}:00`
    emit('reschedule', props.booking, newDateTime)
  } finally {
    isLoading.value = false
  }
}

// Initialize with current date + 1 day
onMounted(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  selectedDate.value = tomorrow.toISOString().split('T')[0]
})
</script>