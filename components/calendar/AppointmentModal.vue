<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-medium text-gray-900">Appointment Details</h3>
          <p class="text-sm text-gray-500">{{ formatDateTime }}</p>
        </div>
        <button
          @click="emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Status -->
        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <span 
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(appointment.status)
              ]"
            >
              {{ getStatusText(appointment.status) }}
            </span>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              v-if="appointment.status === 'pending'"
              @click="updateStatus('confirmed')"
              :disabled="loading"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckIcon class="w-4 h-4 mr-1" />
              {{ loading ? 'Confirming...' : 'Confirm' }}
            </button>
            
            <button
              v-if="appointment.status === 'confirmed'"
              @click="updateStatus('in_progress')"
              :disabled="loading"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayIcon class="w-4 h-4 mr-1" />
              {{ loading ? 'Starting...' : 'Start' }}
            </button>
            
            <button
              v-if="appointment.status === 'in_progress'"
              @click="updateStatus('completed')"
              :disabled="loading"
              class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircleIcon class="w-4 h-4 mr-1" />
              {{ loading ? 'Completing...' : 'Complete' }}
            </button>
          </div>
        </div>

        <!-- Customer Information -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Name</label>
                <div class="font-medium">{{ appointment.customer?.name }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Email</label>
                <div>{{ appointment.customer?.email }}</div>
              </div>
              <div v-if="appointment.customer?.phone">
                <label class="block text-xs text-gray-500 mb-1">Phone</label>
                <div>{{ appointment.customer?.phone }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Customer Since</label>
                <div>{{ formatDate(appointment.customer?.created_at) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Information -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-3">Service Information</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Service</label>
                <div class="font-medium">{{ appointment.service?.title }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Duration</label>
                <div>{{ appointment.duration }} minutes</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Price</label>
                <div class="font-medium">R{{ appointment.service?.price }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Location</label>
                <div>{{ getLocationText(appointment.location_type) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Location Details -->
        <div v-if="appointment.customer_address || appointment.meeting_link">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Location Details</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-if="appointment.customer_address">
              <label class="block text-xs text-gray-500 mb-1">Customer Address</label>
              <div>{{ appointment.customer_address }}</div>
            </div>
            <div v-if="appointment.meeting_link">
              <label class="block text-xs text-gray-500 mb-1">Meeting Link</label>
              <a 
                :href="appointment.meeting_link" 
                target="_blank"
                class="text-blue-600 hover:text-blue-700 underline"
              >
                {{ appointment.meeting_link }}
              </a>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="appointment.customer_notes || appointment.vendor_notes">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Notes</h4>
          <div class="space-y-3">
            <div v-if="appointment.customer_notes" class="bg-blue-50 rounded-lg p-4">
              <label class="block text-xs text-blue-700 mb-1">Customer Notes</label>
              <div class="text-blue-900">{{ appointment.customer_notes }}</div>
            </div>
            <div v-if="appointment.vendor_notes" class="bg-purple-50 rounded-lg p-4">
              <label class="block text-xs text-purple-700 mb-1">Your Notes</label>
              <div class="text-purple-900">{{ appointment.vendor_notes }}</div>
            </div>
          </div>
        </div>

        <!-- Edit Notes -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-3">Add/Edit Notes</h4>
          <textarea
            v-model="editNotes"
            rows="3"
            placeholder="Add notes about this appointment..."
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <!-- Booking Details -->
        <div>
          <h4 class="text-sm font-medium text-gray-900 mb-3">Booking Details</h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Booking Reference</label>
                <div class="font-mono">{{ appointment.booking_reference }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Created</label>
                <div>{{ formatDate(appointment.created_at) }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Total Amount</label>
                <div class="font-medium">R{{ appointment.total_amount }}</div>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Payment Status</label>
                <span 
                  :class="[
                    'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                    appointment.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ appointment.payment_status || 'pending' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-3">
            <button
              @click="showRescheduleModal = true"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ClockIcon class="w-4 h-4 mr-2" />
              Reschedule
            </button>
            
            <button
              @click="confirmCancel"
              class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
            >
              <XMarkIcon class="w-4 h-4 mr-2" />
              Cancel Appointment
            </button>
          </div>
          
          <div class="flex items-center space-x-3">
            <button
              @click="emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Close
            </button>
            
            <button
              @click="saveChanges"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Reschedule Modal -->
      <RescheduleModal
        v-if="showRescheduleModal"
        :booking="appointment"
        @close="showRescheduleModal = false"
        @reschedule="handleReschedule"
      />

      <!-- Cancel Confirmation -->
      <div v-if="showCancelConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Cancel Appointment</h3>
          <p class="text-gray-600 mb-4">Are you sure you want to cancel this appointment? This action cannot be undone.</p>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Cancellation Reason</label>
            <select
              v-model="cancelReason"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a reason</option>
              <option value="provider_unavailable">Provider unavailable</option>
              <option value="emergency">Emergency</option>
              <option value="customer_request">Customer requested</option>
              <option value="weather">Weather conditions</option>
              <option value="other">Other</option>
            </select>
            
            <!-- Error message -->
            <div v-if="cancelError" class="mt-2 text-sm text-red-600">
              {{ cancelError }}
            </div>
          </div>
          
          <div class="flex items-center justify-end space-x-3">
            <button
              @click="showCancelConfirm = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Keep Appointment
            </button>
            <button
              @click="handleCancel"
              :disabled="cancelling"
              class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <div v-if="cancelling" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ cancelling ? 'Cancelling...' : 'Cancel Appointment' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  XMarkIcon, 
  CheckIcon, 
  PlayIcon, 
  CheckCircleIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline'
import RescheduleModal from '~/components/booking/RescheduleModal.vue'

// Use booking composable for proper API calls
const {
  confirmBooking,
  markInProgress,
  completeBooking,
  updateBooking,
  cancelBooking: cancelBookingAction,
  loading
} = useBooking()

// Props
const props = defineProps<{
  appointment: any
}>()

// Emits
const emit = defineEmits<{
  close: []
  update: [appointment: any]
  delete: [appointmentId: string]
}>()

// Reactive state
const editNotes = ref(props.appointment.vendor_notes || '')
const showRescheduleModal = ref(false)
const showCancelConfirm = ref(false)
const cancelReason = ref('')
const cancelError = ref('')
const cancelling = ref(false)

// Computed
const formatDateTime = computed(() => {
  const date = new Date(props.appointment.scheduled_at)
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

// Methods
const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  const texts = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
  return texts[status] || status
}

const getLocationText = (locationType: string) => {
  const locationMap = {
    'vendor_location': 'Provider Location',
    'customer_location': 'Customer Location',
    'online': 'Online/Virtual'
  }
  return locationMap[locationType] || locationType
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const updateStatus = async (newStatus: string) => {
  try {
    let result
    
    // Use the appropriate composable method based on the new status
    switch (newStatus) {
      case 'confirmed':
        result = await confirmBooking(props.appointment.id)
        break
      case 'in_progress':
        result = await markInProgress(props.appointment.id)
        break
      case 'completed':
        result = await completeBooking(props.appointment.id)
        break
      default:
        // For other status updates, use the general update method
        result = await updateBooking(props.appointment.id, { 
          status: newStatus,
          vendor_notes: editNotes.value 
        })
    }
    
    // Emit the updated appointment data
    emit('update', result.booking || result)
  } catch (error) {
    console.error('Failed to update appointment status:', error)
    // You could add a toast notification here to show the error to the user
  }
}

const saveChanges = async () => {
  try {
    const result = await updateBooking(props.appointment.id, {
      vendor_notes: editNotes.value
    })
    
    // Emit the updated appointment data
    emit('update', result.booking || result)
  } catch (error) {
    console.error('Failed to save appointment changes:', error)
    // You could add a toast notification here to show the error to the user
  }
}

const confirmCancel = () => {
  cancelError.value = ''
  cancelReason.value = ''
  showCancelConfirm.value = true
}

const handleCancel = async () => {
  if (!cancelReason.value) {
    cancelError.value = 'Please select a cancellation reason'
    return
  }
  
  cancelling.value = true
  cancelError.value = ''
  
  try {
    await cancelBookingAction(props.appointment.id, cancelReason.value)
    showCancelConfirm.value = false
    emit('update', { ...props.appointment, status: 'cancelled' })
  } catch (error) {
    console.error('Failed to cancel appointment:', error)
    cancelError.value = error.data?.message || error.message || 'Failed to cancel appointment. Please try again.'
  } finally {
    cancelling.value = false
  }
}

const handleReschedule = (newDateTime: string) => {
  const updatedAppointment = {
    ...props.appointment,
    scheduled_at: newDateTime
  }
  emit('update', updatedAppointment)
  showRescheduleModal.value = false
}
</script>