<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">Create New Appointment</h3>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <form @submit.prevent="handleSave">
        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ errorMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <button
                type="button"
                @click="clearMessages"
                class="inline-flex text-red-400 hover:text-red-600"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-700">{{ successMessage }}</p>
            </div>
            <div class="ml-auto pl-3">
              <button
                type="button"
                @click="clearMessages"
                class="inline-flex text-green-400 hover:text-green-600"
              >
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Customer Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
          <div class="relative">
            <input
              v-model="customerSearch"
              @input="searchCustomers"
              type="text"
              placeholder="Search for customer by name or email..."
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
            
            <!-- Customer Search Results -->
            <div
              v-if="showCustomerResults && customerResults.length > 0"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              <div
                v-for="customer in customerResults"
                :key="customer.id"
                @click="selectCustomer(customer)"
                class="px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <div class="font-medium">{{ customer.name }}</div>
                <div class="text-sm text-gray-500">{{ customer.email }}</div>
              </div>
            </div>
          </div>
          
          <!-- Selected Customer -->
          <div v-if="selectedCustomer" class="mt-2 p-3 bg-blue-50 rounded-md">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-blue-900">{{ selectedCustomer.name }}</div>
                <div class="text-sm text-blue-700">{{ selectedCustomer.email }}</div>
              </div>
              <button
                type="button"
                @click="clearCustomer"
                class="text-blue-600 hover:text-blue-700"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Service Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Service</label>
          <select
            v-model="selectedServiceId"
            @change="updateServiceDetails"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a service</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.title }} - {{ service.currency || 'R' }}{{ service.price }}
            </option>
          </select>
        </div>

        <!-- Quick Select for Testing -->
        <div class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div class="text-sm font-medium text-yellow-800 mb-2">Quick Select (for testing):</div>
          <div class="flex space-x-2">
            <button
              type="button"
              @click="quickSelectCustomer"
              class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200"
            >
              Select John Doe
            </button>
            <button
              type="button"
              @click="quickSelectService"
              class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200"
            >
              Select First Service
            </button>
          </div>
        </div>

        <!-- Date and Time -->
        <div class="mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                v-model="appointmentDate"
                type="date"
                :min="minDate"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <select
                v-model="appointmentTime"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select time</option>
                <option v-for="time in availableTimes" :key="time.value" :value="time.value">
                  {{ time.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Duration -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <select
            v-model="duration"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <!-- Location Type -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="locationType"
                value="vendor_location"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">At my location</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="locationType"
                value="customer_location"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">At customer's location</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="locationType"
                value="online"
                type="radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-700">Online/Virtual</span>
            </label>
          </div>
        </div>

        <!-- Customer Address (if customer location) -->
        <div v-if="locationType === 'customer_location'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer Address</label>
          <textarea
            v-model="customerAddress"
            rows="3"
            placeholder="Enter customer's address..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Meeting Link (if online) -->
        <div v-if="locationType === 'online'" class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
          <input
            v-model="meetingLink"
            type="url"
            placeholder="https://zoom.us/j/..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
        </div>

        <!-- Notes -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            v-model="notes"
            rows="3"
            placeholder="Add any special instructions or notes for this appointment..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Appointment Summary -->
        <div v-if="selectedService" class="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">Appointment Summary</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <div><strong>Service:</strong> {{ selectedService.title }}</div>
            <div><strong>Duration:</strong> {{ duration }} minutes</div>
            <div><strong>Price:</strong> R{{ selectedService.price }}</div>
            <div v-if="appointmentDate && appointmentTime">
              <strong>Date & Time:</strong> {{ formatDateTime }}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!canSave"
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
            {{ isLoading ? 'Creating...' : 'Create Appointment' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// Props
const props = defineProps<{
  selectedDate?: Date
  selectedTime?: string
}>()

// Emits
const emit = defineEmits<{
  close: []
  save: [booking: any]
}>()

// Reactive state
const customerSearch = ref('')
const customerResults = ref([])
const showCustomerResults = ref(false)
const selectedCustomer = ref(null)
const selectedServiceId = ref('')
const appointmentDate = ref('')
const appointmentTime = ref('')
const duration = ref('60')
const locationType = ref('vendor_location')
const customerAddress = ref('')
const meetingLink = ref('')
const notes = ref('')
const services = ref([])

// Error handling and loading states
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Computed
const selectedService = computed(() => {
  return services.value.find(service => service.id === selectedServiceId.value)
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const availableTimes = computed(() => {
  // Generate time slots from 8 AM to 6 PM in 30-minute intervals
  const times = []
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const display = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      times.push({ value: time, label: display })
    }
  }
  return times
})

const formatDateTime = computed(() => {
  if (!appointmentDate.value || !appointmentTime.value) return ''
  
  const date = new Date(appointmentDate.value)
  const [hours, minutes] = appointmentTime.value.split(':')
  date.setHours(parseInt(hours), parseInt(minutes))
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
})

const canSave = computed(() => {
  const hasCustomer = selectedCustomer.value && selectedCustomer.value.id
  const hasService = selectedServiceId.value && selectedServiceId.value !== ''
  const hasDate = appointmentDate.value && appointmentDate.value !== ''
  const hasTime = appointmentTime.value && appointmentTime.value !== ''
  
  const result = hasCustomer && hasService && hasDate && hasTime && !isLoading.value
  
  console.log('canSave computed:', { 
    hasCustomer, 
    hasService, 
    hasDate, 
    hasTime, 
    isLoading: isLoading.value,
    result
  })
  
  return result
})

// Methods
const searchCustomers = async () => {
  if (customerSearch.value.length < 2) {
    showCustomerResults.value = false
    return
  }
  
  try {
    // Mock customer search - replace with actual API call
    const mockCustomers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
    ]
    
    customerResults.value = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(customerSearch.value.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.value.toLowerCase())
    )
    showCustomerResults.value = true
  } catch (error) {
    console.error('Failed to search customers:', error)
  }
}

const selectCustomer = (customer) => {
  selectedCustomer.value = customer
  customerSearch.value = customer.name
  showCustomerResults.value = false
}

const clearCustomer = () => {
  selectedCustomer.value = null
  customerSearch.value = ''
}

const updateServiceDetails = () => {
  const service = selectedService.value
  if (service && service.duration) {
    duration.value = service.duration.toString()
  }
}

const loadServices = async () => {
  try {
    clearMessages()
    // Fetch vendor's services using the useServices composable
    const { fetchMyServices } = useServices()
    const response = await fetchMyServices()
    
    if (response && response.data) {
      // Map the service data to match our expected format
      services.value = response.data.map(service => ({
        id: service.id,
        title: service.title,
        price: service.base_price,
        duration: service.duration_minutes || 60,
        description: service.description,
        currency: service.currency
      }))
      
      if (services.value.length === 0) {
        errorMessage.value = 'No services found. Please create a service first before scheduling appointments.'
      }
    } else {
      services.value = []
      errorMessage.value = 'Failed to load services. Please try refreshing the page.'
    }
    
    console.log('Loaded vendor services:', services.value)
  } catch (error) {
    console.error('Failed to load services:', error)
    services.value = []
    errorMessage.value = 'Unable to load services. Please check your internet connection and try again.'
  }
}

// Clear messages
const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

// Validate form data
const validateForm = () => {
  clearMessages()
  
  if (!selectedCustomer.value || !selectedCustomer.value.id) {
    errorMessage.value = 'Please select a customer'
    return false
  }
  
  if (!selectedServiceId.value) {
    errorMessage.value = 'Please select a service'
    return false
  }
  
  if (!appointmentDate.value) {
    errorMessage.value = 'Please select an appointment date'
    return false
  }
  
  if (!appointmentTime.value) {
    errorMessage.value = 'Please select an appointment time'
    return false
  }
  
  // Validate date is not in the past
  const selectedDateTime = new Date(`${appointmentDate.value}T${appointmentTime.value}`)
  if (selectedDateTime < new Date()) {
    errorMessage.value = 'Appointment date and time cannot be in the past'
    return false
  }
  
  // Validate location-specific requirements
  if (locationType.value === 'customer_location' && !customerAddress.value.trim()) {
    errorMessage.value = 'Customer address is required for customer location appointments'
    return false
  }
  
  if (locationType.value === 'online' && !meetingLink.value.trim()) {
    errorMessage.value = 'Meeting link is required for online appointments'
    return false
  }
  
  return true
}

const handleSave = async () => {
  console.log('handleSave called')
  console.log('Form validation state:', {
    selectedCustomer: selectedCustomer.value,
    selectedServiceId: selectedServiceId.value,
    appointmentDate: appointmentDate.value,
    appointmentTime: appointmentTime.value,
    canSave: canSave.value
  })
  
  if (!validateForm()) {
    console.log('Validation failed')
    return
  }
  
  console.log('Validation passed, proceeding with save')
  
  isLoading.value = true
  clearMessages()
  
  try {
    const bookingData = {
      customer_id: selectedCustomer.value.id,
      service_id: selectedServiceId.value,
      scheduled_at: new Date(`${appointmentDate.value}T${appointmentTime.value}`).toISOString(),
      duration_minutes: parseInt(duration.value),
      location_type: locationType.value,
      customer_address: locationType.value === 'customer_location' ? customerAddress.value : null,
      meeting_link: locationType.value === 'online' ? meetingLink.value : null,
      vendor_notes: notes.value,
      status: 'confirmed'
    }
    
    console.log('Creating booking with data:', bookingData)
    
    // Use the booking composable directly to handle the API call
    const { createBooking } = useBooking()
    const response = await createBooking(bookingData)
    
    console.log('Booking created successfully:', response)
    successMessage.value = 'Appointment created successfully!'
    
    // Emit success to parent to refresh calendar and close modal
    emit('save', response)
    
    // Close modal after a short delay to show success message
    setTimeout(() => {
      emit('close')
    }, 1500)
    
  } catch (error) {
    console.error('Error creating appointment:', error)
    
    // Handle different types of errors
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.data?.message) {
      errorMessage.value = error.data.message
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Failed to create appointment. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}

// Quick select functions for testing
const quickSelectCustomer = () => {
  selectedCustomer.value = { id: '1', name: 'John Doe', email: 'john@example.com' }
  customerSearch.value = 'John Doe'
  showCustomerResults.value = false
}

const quickSelectService = () => {
  // Select the first available service
  if (services.value.length > 0) {
    selectedServiceId.value = services.value[0].id
  }
}

// Initialize data
onMounted(() => {
  loadServices()
  
  // Set initial date and time if provided
  if (props.selectedDate) {
    appointmentDate.value = props.selectedDate.toISOString().split('T')[0]
  } else {
    // Default to today if no date provided
    appointmentDate.value = new Date().toISOString().split('T')[0]
  }
  
  if (props.selectedTime) {
    appointmentTime.value = props.selectedTime
  }
  
  // Add debugging for initialization
  console.log('Modal initialized with:', {
    selectedDate: props.selectedDate,
    selectedTime: props.selectedTime,
    appointmentDate: appointmentDate.value,
    appointmentTime: appointmentTime.value
  })
})

// Reset form when modal opens/closes
const resetForm = () => {
  selectedCustomer.value = null
  customerSearch.value = ''
  showCustomerResults.value = false
  selectedServiceId.value = ''
  appointmentTime.value = ''
  duration.value = '60'
  locationType.value = 'vendor_location'
  customerAddress.value = ''
  meetingLink.value = ''
  notes.value = ''
  clearMessages()
}

// Watch for clicks outside customer search
watch(customerSearch, (newValue) => {
  if (!newValue) {
    showCustomerResults.value = false
  }
})

// Watch for modal close/open to reset form
watch(() => props, () => {
  if (props.selectedDate || props.selectedTime) {
    // Modal is opening, reset form but keep date/time
    resetForm()
  }
}, { immediate: true })
</script>