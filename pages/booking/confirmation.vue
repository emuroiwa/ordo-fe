<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md mx-auto text-center">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Success Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <!-- Success Message -->
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p class="text-gray-600 mb-6">
          Your booking has been successfully created and payment processed.
        </p>
        
        <!-- Booking Reference -->
        <div v-if="bookingId" class="bg-gray-50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-600">Booking Reference</p>
          <p class="font-mono font-medium text-gray-900">{{ bookingId }}</p>
        </div>
        
        <!-- Next Steps -->
        <div class="text-left mb-6">
          <h3 class="font-semibold text-gray-900 mb-2">What's Next?</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Confirmation email sent to your address</li>
            <li>• Service provider will confirm your booking</li>
            <li>• You'll receive updates via email</li>
          </ul>
        </div>
        
        <!-- Actions -->
        <div class="space-y-3">
          <NuxtLink
            to="/dashboard/bookings"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors inline-block text-center"
          >
            View My Bookings
          </NuxtLink>
          <NuxtLink
            to="/"
            class="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors inline-block text-center"
          >
            Back to Home
          </NuxtLink>
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

// Get booking ID from query params
const route = useRoute()
const bookingId = computed(() => route.query.booking as string)

// Head
useHead({
  title: 'Booking Confirmed - ORDO',
  meta: [
    {
      name: 'description',
      content: 'Your booking has been confirmed successfully'
    }
  ]
})
</script>