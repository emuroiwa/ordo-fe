<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            Booking Details
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Content -->
        <div class="mt-6 space-y-6">
          <!-- Booking Info -->
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-medium text-gray-900">{{ booking.service?.title }}</h4>
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getBookingStatusColor(booking.status)
                ]"
              >
                {{ formatStatus(booking.status) }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">Booking Reference:</span>
                <p class="font-medium">#{{ booking.booking_reference }}</p>
              </div>
              <div>
                <span class="text-gray-500">Total Amount:</span>
                <p class="font-medium">R{{ booking.total_amount.toFixed(2) }}</p>
              </div>
              <div>
                <span class="text-gray-500">Payment Status:</span>
                <p class="font-medium capitalize">{{ booking.payment_status }}</p>
              </div>
              <div>
                <span class="text-gray-500">Duration:</span>
                <p class="font-medium">{{ booking.duration_minutes }} minutes</p>
              </div>
            </div>
          </div>

          <!-- Schedule Info -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Schedule</h4>
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <CalendarIcon class="h-5 w-5 text-blue-600" />
                <div>
                  <p class="font-medium text-gray-900">{{ formatDate(booking.scheduled_at) }}</p>
                  <p class="text-sm text-gray-600">{{ formatTime(booking.scheduled_at) }}</p>
                </div>
              </div>
              <div class="mt-3 flex items-center space-x-3">
                <MapPinIcon class="h-5 w-5 text-blue-600" />
                <p class="text-sm text-gray-700">{{ getLocationText(booking.location_type) }}</p>
              </div>
            </div>
          </div>

          <!-- Participants -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Participants</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Customer -->
              <div class="border rounded-lg p-4">
                <h5 class="font-medium text-gray-900 mb-2">Customer</h5>
                <div class="flex items-center space-x-3">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon class="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p class="font-medium">{{ booking.customer?.name }}</p>
                    <p class="text-sm text-gray-500">{{ booking.customer?.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Vendor -->
              <div class="border rounded-lg p-4">
                <h5 class="font-medium text-gray-900 mb-2">Service Provider</h5>
                <div class="flex items-center space-x-3">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon class="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p class="font-medium">{{ booking.vendor?.name }}</p>
                    <p class="text-sm text-gray-500">{{ booking.vendor?.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Service Details -->
          <div v-if="booking.service">
            <h4 class="text-md font-medium text-gray-900 mb-3">Service Details</h4>
            <div class="border rounded-lg p-4">
              <h5 class="font-medium text-gray-900">{{ booking.service.title }}</h5>
              <p class="text-sm text-gray-600 mt-1">{{ booking.service.short_description }}</p>
              <div class="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                <span>Category: {{ booking.service.category?.name }}</span>
                <span>•</span>
                <span>Price: R{{ booking.service.base_price }}</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="booking.customer_notes || booking.vendor_notes">
            <h4 class="text-md font-medium text-gray-900 mb-3">Notes</h4>
            <div class="space-y-3">
              <div v-if="booking.customer_notes" class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h5 class="text-sm font-medium text-yellow-800">Customer Notes</h5>
                <p class="text-sm text-yellow-700 mt-1">{{ booking.customer_notes }}</p>
              </div>
              <div v-if="booking.vendor_notes" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h5 class="text-sm font-medium text-blue-800">Provider Notes</h5>
                <p class="text-sm text-blue-700 mt-1">{{ booking.vendor_notes }}</p>
              </div>
            </div>
          </div>

          <!-- Address Information -->
          <div v-if="booking.service_address">
            <h4 class="text-md font-medium text-gray-900 mb-3">Address</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <MapPinIcon class="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p class="text-sm text-gray-900">{{ booking.service_address.address_line_1 }}</p>
                  <p v-if="booking.service_address.address_line_2" class="text-sm text-gray-900">
                    {{ booking.service_address.address_line_2 }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ booking.service_address.city }}, {{ booking.service_address.province }} {{ booking.service_address.postal_code }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Payment Information</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Total Amount:</span>
                  <p class="font-medium">R{{ booking.total_amount.toFixed(2) }}</p>
                </div>
                <div>
                  <span class="text-gray-500">Deposit:</span>
                  <p class="font-medium">R{{ booking.deposit_amount.toFixed(2) }}</p>
                </div>
                <div>
                  <span class="text-gray-500">Payment Status:</span>
                  <p :class="[
                    'font-medium capitalize',
                    booking.payment_status === 'paid' ? 'text-green-600' : 
                    booking.payment_status === 'partial' ? 'text-yellow-600' : 'text-red-600'
                  ]">
                    {{ booking.payment_status }}
                  </p>
                </div>
                <div>
                  <span class="text-gray-500">Currency:</span>
                  <p class="font-medium">{{ booking.currency }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-8 flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="text-xs text-gray-500">
            Created: {{ formatDate(booking.created_at) }}
          </div>
          
          <div class="flex space-x-3">
            <!-- Customer Actions -->
            <template v-if="userRole === 'customer'">
              <button
                v-if="canReschedule"
                @click="$emit('action', 'reschedule', booking)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ClockIcon class="w-4 h-4 mr-2" />
                Reschedule
              </button>
              
              <button
                v-if="canCancel"
                @click="$emit('action', 'cancel', booking)"
                class="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XMarkIcon class="w-4 h-4 mr-2" />
                Cancel Booking
              </button>
            </template>

            <!-- Vendor Actions -->
            <template v-if="userRole === 'vendor'">
              <button
                v-if="booking.status === 'pending'"
                @click="$emit('action', 'confirm', booking)"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <CheckCircleIcon class="w-4 h-4 mr-2" />
                Confirm
              </button>
              
              <button
                v-if="booking.status === 'confirmed'"
                @click="$emit('action', 'start', booking)"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlayIcon class="w-4 h-4 mr-2" />
                Start Service
              </button>
              
              <button
                v-if="booking.status === 'in_progress'"
                @click="$emit('action', 'complete', booking)"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <CheckIcon class="w-4 h-4 mr-2" />
                Complete
              </button>
              
              <button
                v-if="canCancel"
                @click="$emit('action', 'cancel', booking)"
                class="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XMarkIcon class="w-4 h-4 mr-2" />
                Cancel
              </button>
            </template>

            <button
              @click="$emit('close')"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  XMarkIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  CheckIcon,
  PlayIcon
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  booking: any
  userRole: 'customer' | 'vendor'
}>()

defineEmits<{
  close: []
  action: [action: string, booking: any]
}>()

const canCancel = computed(() => {
  return props.booking.status !== 'cancelled' && 
         props.booking.status !== 'completed' &&
         new Date(props.booking.scheduled_at) > new Date()
})

const canReschedule = computed(() => {
  return (props.booking.status === 'pending' || props.booking.status === 'confirmed') &&
         new Date(props.booking.scheduled_at) > new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
})

const getLocationText = (locationType: string) => {
  const locationMap = {
    'vendor_location': 'Provider Location',
    'customer_location': 'Customer Location',
    'online': 'Online'
  }
  return locationMap[locationType] || locationType
}

const getBookingStatusColor = (status: string) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
</script>