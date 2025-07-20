<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading payment details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Booking Not Found</h3>
        <p class="text-sm text-gray-600 mb-4">{{ error }}</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go Home
        </NuxtLink>
      </div>
    </div>

    <!-- Payment Page -->
    <div v-else-if="booking" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
        <p class="text-gray-600">Review your booking details and complete payment</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Booking Summary -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
          
          <!-- Service Details -->
          <div class="space-y-4 mb-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <img 
                  v-if="booking.service?.primary_image"
                  :src="booking.service.primary_image.url" 
                  :alt="booking.service.title"
                  class="w-16 h-16 rounded-lg object-cover"
                >
                <div v-else class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ booking.service?.title }}</h3>
                <p class="text-gray-600 text-sm">{{ booking.service?.short_description }}</p>
                <div class="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <span>{{ booking.duration_minutes }} minutes</span>
                  <span>{{ booking.service?.location_display }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Booking Details -->
          <div class="border-t border-gray-200 pt-6 space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600">Booking Reference</span>
              <span class="font-medium">{{ booking.booking_reference }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Date & Time</span>
              <div class="text-right">
                <div class="font-medium">{{ formatDate(booking.scheduled_at) }}</div>
                <div class="text-sm text-gray-500">{{ formatTime(booking.scheduled_at) }}</div>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Duration</span>
              <span class="font-medium">{{ booking.duration_minutes }} minutes</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Location</span>
              <span class="font-medium">{{ booking.location_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</span>
            </div>
          </div>

          <!-- Customer Information -->
          <div class="border-t border-gray-200 pt-6 mt-6">
            <h4 class="font-medium text-gray-900 mb-4">Customer Information</h4>
            <div class="space-y-2 text-sm">
              <div v-if="booking.customer">
                <span class="text-gray-600">Name:</span>
                <span class="ml-2 font-medium">{{ booking.customer.name }}</span>
              </div>
              <div v-else-if="booking.guest_name">
                <span class="text-gray-600">Name:</span>
                <span class="ml-2 font-medium">{{ booking.guest_name }}</span>
              </div>
              
              <div v-if="booking.customer?.email">
                <span class="text-gray-600">Email:</span>
                <span class="ml-2 font-medium">{{ booking.customer.email }}</span>
              </div>
              <div v-else-if="booking.guest_email">
                <span class="text-gray-600">Email:</span>
                <span class="ml-2 font-medium">{{ booking.guest_email }}</span>
              </div>
              
              <div v-if="booking.customer?.phone">
                <span class="text-gray-600">Phone:</span>
                <span class="ml-2 font-medium">{{ booking.customer.phone }}</span>
              </div>
              <div v-else-if="booking.guest_phone">
                <span class="text-gray-600">Phone:</span>
                <span class="ml-2 font-medium">{{ booking.guest_phone }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
          
          <!-- Pricing Breakdown -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Service Price</span>
              <span class="font-medium">{{ booking.currency }} {{ booking.total_amount }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>Deposit Required (30%)</span>
              <span>{{ booking.currency }} {{ booking.deposit_amount }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between font-semibold text-lg">
                <span>Total to Pay Now</span>
                <span class="text-blue-600">{{ booking.currency }} {{ booking.deposit_amount }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Method Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div class="space-y-3">
              <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="paymentMethod" type="radio" value="card" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <div class="ml-3 flex items-center">
                  <svg class="w-8 h-5 mr-2" viewBox="0 0 32 20" fill="none">
                    <rect width="32" height="20" rx="4" fill="#1434CB"/>
                    <path d="M8.5 11.5V8.5H10.5V11.5H8.5Z" fill="white"/>
                    <path d="M12.5 8.5H14.5V11.5H12.5V8.5Z" fill="white"/>
                    <path d="M16.5 8.5H18.5V11.5H16.5V8.5Z" fill="white"/>
                    <path d="M20.5 8.5H22.5V11.5H20.5V8.5Z" fill="white"/>
                  </svg>
                  <span class="font-medium">Credit/Debit Card</span>
                </div>
              </label>
              
              <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="paymentMethod" type="radio" value="payfast" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300">
                <div class="ml-3 flex items-center">
                  <div class="w-8 h-5 bg-orange-500 rounded mr-2 flex items-center justify-center">
                    <span class="text-white text-xs font-bold">PF</span>
                  </div>
                  <span class="font-medium">PayFast</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Terms -->
          <div class="mb-6">
            <label class="flex items-start">
              <input v-model="acceptTerms" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1">
              <span class="ml-2 text-sm text-gray-600">
                I agree to the 
                <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a> 
                and 
                <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
              </span>
            </label>
          </div>

          <!-- Payment Button -->
          <button
            @click="processPayment"
            :disabled="!canPay || isProcessing"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <svg v-if="isProcessing" class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isProcessing ? 'Processing...' : `Pay ${booking.currency} ${booking.deposit_amount}` }}
          </button>

          <!-- Security Notice -->
          <div class="mt-4 flex items-center justify-center text-xs text-gray-500">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secured by SSL encryption
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta
definePageMeta({
  layout: 'default'
})

// Composables
const { fetchBooking, currentBooking: booking, loading, error } = useBooking()
const route = useRoute()
const router = useRouter()

// State
const paymentMethod = ref('card')
const acceptTerms = ref(false)
const isProcessing = ref(false)

// Computed
const canPay = computed(() => {
  return paymentMethod.value && acceptTerms.value && !isProcessing.value
})

// Methods
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const processPayment = async () => {
  if (!canPay.value) return
  
  isProcessing.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // For now, just show success and redirect
    // In real implementation, integrate with payment provider
    await router.push({
      path: '/booking/confirmation',
      query: { booking: booking.value?.id }
    })
    
  } catch (err) {
    console.error('Payment failed:', err)
    // Handle payment error
  } finally {
    isProcessing.value = false
  }
}

// Head
useHead({
  title: 'Complete Payment - ORDO',
  meta: [
    {
      name: 'description',
      content: 'Complete your booking payment securely'
    }
  ]
})

// Fetch booking on mount
onMounted(async () => {
  try {
    const bookingId = route.params.id as string
    await fetchBooking(bookingId)
  } catch (err) {
    console.error('Failed to fetch booking:', err)
  }
})
</script>