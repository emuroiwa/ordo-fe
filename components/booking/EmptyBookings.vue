<template>
  <div class="text-center py-12">
    <CalendarIcon class="mx-auto h-12 w-12 text-gray-400" />
    <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
    <p class="mt-1 text-sm text-gray-500">
      {{ userRole === 'vendor' 
        ? 'Your services haven\'t been booked yet.' 
        : 'You haven\'t made any bookings yet.' 
      }}
    </p>
    <div class="mt-6">
      <NuxtLink
        :to="userRole === 'vendor' ? '/dashboard/services' : '/search'"
        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ userRole === 'vendor' ? 'Create Service' : 'Browse Services' }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from '@heroicons/vue/24/outline'

defineProps<{
  userRole: 'customer' | 'vendor'
}>()
</script>