<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Cancel Booking
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Warning Icon and Message -->
        <div class="mt-6 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
          </div>
          
          <h3 class="mt-4 text-lg font-medium text-gray-900">
            Are you sure you want to cancel this booking?
          </h3>
          
          <p class="mt-2 text-sm text-gray-500">
            This action cannot be undone. 
            {{ userRole === 'customer' ? 'You may be charged a cancellation fee.' : 'The customer will be notified of the cancellation.' }}
          </p>
        </div>

        <!-- Booking Details -->
        <div class="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-2">Booking Details</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <p><strong>Service:</strong> {{ booking.service?.title }}</p>
            <p><strong>Date:</strong> {{ formatDateTime(booking.scheduled_at) }}</p>
            <p><strong>Total Amount:</strong> R{{ booking.total_amount.toFixed(2) }}</p>
            <p><strong>{{ userRole === 'vendor' ? 'Customer' : 'Provider' }}:</strong> 
              {{ userRole === 'vendor' ? booking.customer?.name : booking.vendor?.name }}
            </p>
          </div>
        </div>

        <!-- Cancellation Reason -->
        <div class="mt-6">
          <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">
            Reason for Cancellation {{ userRole === 'vendor' ? '(Required)' : '(Optional)' }}
          </label>
          <select
            v-if="userRole === 'vendor'"
            v-model="selectedReason"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
            required
          >
            <option value="">Select a reason</option>
            <option value="scheduling_conflict">Scheduling Conflict</option>
            <option value="emergency">Emergency</option>
            <option value="illness">Illness</option>
            <option value="technical_issues">Technical Issues</option>
            <option value="customer_request">Customer Request</option>
            <option value="other">Other</option>
          </select>
          
          <textarea
            v-else
            v-model="customReason"
            id="reason"
            rows="3"
            placeholder="Please provide a reason for cancelling (optional)..."
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></textarea>
          
          <!-- Custom reason input for vendors when "other" is selected -->
          <textarea
            v-if="userRole === 'vendor' && selectedReason === 'other'"
            v-model="customReason"
            placeholder="Please specify the reason..."
            rows="3"
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          ></textarea>
        </div>

        <!-- Cancellation Policy -->
        <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 class="font-medium text-yellow-800 mb-2">Cancellation Policy</h4>
          <div class="text-sm text-yellow-700 space-y-1">
            <template v-if="userRole === 'customer'">
              <p>• Free cancellation up to 24 hours before the service</p>
              <p>• 50% refund for cancellations within 24 hours</p>
              <p>• No refund for cancellations within 2 hours of service time</p>
            </template>
            <template v-else>
              <p>• Customer will be automatically refunded based on timing</p>
              <p>• Multiple cancellations may affect your provider rating</p>
              <p>• Emergency cancellations are exempt from rating penalties</p>
            </template>
          </div>
        </div>

        <!-- Refund Information (for customers) -->
        <div v-if="userRole === 'customer'" class="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="font-medium text-blue-800 mb-2">Refund Information</h4>
          <p class="text-sm text-blue-700">
            <strong>Expected Refund:</strong> {{ getRefundInfo() }}
          </p>
          <p class="text-sm text-blue-600 mt-1">
            Refunds typically process within 3-5 business days.
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            @click="$emit('close')"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Keep Booking
          </button>
          
          <button
            @click="confirmCancel"
            :disabled="(userRole === 'vendor' && !selectedReason) || isLoading"
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="mr-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </span>
            {{ isLoading ? 'Cancelling...' : 'Cancel Booking' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  booking: any
  userRole: 'customer' | 'vendor'
}>()

const emit = defineEmits<{
  close: []
  cancel: [booking: any, reason: string]
}>()

// Reactive state
const selectedReason = ref('')
const customReason = ref('')
const isLoading = ref(false)
const error = ref('')

// Computed properties
const finalReason = computed(() => {
  if (props.userRole === 'vendor') {
    return selectedReason.value === 'other' ? customReason.value : selectedReason.value
  }
  return customReason.value
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

const getRefundInfo = () => {
  const now = new Date()
  const bookingTime = new Date(props.booking.scheduled_at)
  const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  if (hoursUntilBooking >= 24) {
    return `Full refund (R${props.booking.total_amount.toFixed(2)})`
  } else if (hoursUntilBooking >= 2) {
    const refundAmount = props.booking.total_amount * 0.5
    return `50% refund (R${refundAmount.toFixed(2)})`
  } else {
    return 'No refund available'
  }
}

const confirmCancel = async () => {
  if (props.userRole === 'vendor' && !selectedReason.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    // Use the booking composable to handle the cancellation directly
    const { cancelBooking } = useBooking()
    await cancelBooking(props.booking.id, finalReason.value)
    
    // Emit success to parent
    emit('cancel', props.booking, finalReason.value)
  } catch (err) {
    error.value = err.data?.message || err.message || 'Failed to cancel booking. Please try again.'
    console.error('Cancel booking error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>