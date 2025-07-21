<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900">Quick Analytics</h3>
      <NuxtLink 
        to="/dashboard/analytics" 
        class="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        View Details →
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4">
      <p class="text-sm text-red-600">Failed to load analytics</p>
    </div>

    <!-- Analytics Content -->
    <div v-else-if="summary" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ formatNumber(summary.total_views) }}</div>
        <div class="text-xs text-gray-500">Total Views</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ summary.total_bookings }}</div>
        <div class="text-xs text-gray-500">Bookings</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ formatCurrency(summary.total_revenue) }}</div>
        <div class="text-xs text-gray-500">Revenue</div>
      </div>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ summary.average_rating }}★</div>
        <div class="text-xs text-gray-500">Avg Rating</div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else class="text-center py-8">
      <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <p class="text-gray-500 text-sm">No analytics data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Use analytics composable
const { summary, loading, error, fetchSummary, formatCurrency, formatNumber } = useAnalytics()

// Load summary on mount
onMounted(async () => {
  try {
    await fetchSummary()
  } catch (err) {
    console.error('Failed to load analytics summary:', err)
  }
})
</script>