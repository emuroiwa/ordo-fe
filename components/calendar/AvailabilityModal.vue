<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">Set Availability</h3>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <form @submit.prevent="handleSave">
        <!-- Working Days -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Working Days</label>
          <div class="grid grid-cols-7 gap-2">
            <div
              v-for="(day, index) in daysOfWeek"
              :key="day.value"
              class="text-center"
            >
              <label class="block text-xs text-gray-500 mb-1">{{ day.label }}</label>
              <input
                v-model="workingDays"
                :value="day.value"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              >
            </div>
          </div>
        </div>

        <!-- Working Hours -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Working Hours</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Start Time</label>
              <select
                v-model="startTime"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                  {{ time.label }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">End Time</label>
              <select
                v-model="endTime"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                  {{ time.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Break Times -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Break Times</label>
          <div class="space-y-3">
            <div
              v-for="(breakTime, index) in breakTimes"
              :key="index"
              class="flex items-center space-x-3"
            >
              <select
                v-model="breakTime.start"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                  {{ time.label }}
                </option>
              </select>
              <span class="text-gray-500">to</span>
              <select
                v-model="breakTime.end"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                  {{ time.label }}
                </option>
              </select>
              <button
                type="button"
                @click="removeBreakTime(index)"
                class="text-red-600 hover:text-red-700"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
            
            <button
              type="button"
              @click="addBreakTime"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <PlusIcon class="w-4 h-4 mr-2" />
              Add Break Time
            </button>
          </div>
        </div>

        <!-- Appointment Duration -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Default Appointment Duration</label>
          <select
            v-model="defaultDuration"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <!-- Buffer Time -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Buffer Time Between Appointments</label>
          <select
            v-model="bufferTime"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0">No buffer</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>

        <!-- Date Range -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Apply Settings To</label>
          <div class="space-y-3">
            <label class="flex items-center">
              <input
                v-model="applyTo"
                value="ongoing"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">All future dates</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="applyTo"
                value="dateRange"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Specific date range</span>
            </label>
          </div>
          
          <div v-if="applyTo === 'dateRange'" class="mt-3 grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                v-model="startDate"
                type="date"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                v-model="endDate"
                type="date"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="saveError || error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-700">{{ saveError || error }}</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3">
          <button
            type="button"
            @click="emit('close')"
            :disabled="loading"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {{ loading ? 'Saving...' : 'Save Availability' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'

// Emits
const emit = defineEmits<{
  close: []
  save: [availability: any]
}>()

// Composables
const { createAvailability, loading, error, clearError } = useAvailability()

// Reactive state
const workingDays = ref(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])
const startTime = ref('09:00')
const endTime = ref('17:00')
const breakTimes = ref([
  { start: '12:00', end: '13:00' }
])
const defaultDuration = ref('60')
const bufferTime = ref('15')
const applyTo = ref('ongoing')
const startDate = ref('')
const endDate = ref('')
const saveError = ref('')

// Constants
const daysOfWeek = [
  { value: 'sunday', label: 'Sun' },
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' }
]

const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = (i % 2) * 30
  const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  const display = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  return { value: time, label: display }
})

// Methods
const addBreakTime = () => {
  breakTimes.value.push({ start: '12:00', end: '13:00' })
}

const removeBreakTime = (index: number) => {
  breakTimes.value.splice(index, 1)
}

const handleSave = async () => {
  try {
    clearError()
    saveError.value = ''

    const availabilityData = {
      working_days: workingDays.value,
      working_hours: {
        start: startTime.value,
        end: endTime.value
      },
      break_times: breakTimes.value.filter(bt => bt.start && bt.end),
      default_duration: parseInt(defaultDuration.value),
      buffer_time: parseInt(bufferTime.value),
      apply_to: applyTo.value,
      date_range: applyTo.value === 'dateRange' ? {
        start: startDate.value,
        end: endDate.value
      } : undefined
    }

    const result = await createAvailability(availabilityData)
    
    // Emit success
    emit('save', result)
    emit('close')
  } catch (err: any) {
    saveError.value = err.message || 'Failed to save availability'
    console.error('Save availability error:', err)
  }
}

// Set default dates
const today = new Date()
startDate.value = today.toISOString().split('T')[0]
const nextMonth = new Date(today)
nextMonth.setMonth(today.getMonth() + 1)
endDate.value = nextMonth.toISOString().split('T')[0]
</script>