<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900">Earnings Overview</h3>
      <NuxtLink 
        to="/dashboard/earnings" 
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
      <p class="text-sm text-red-600">Failed to load earnings</p>
    </div>

    <!-- Earnings Content -->
    <div v-else-if="summary" class="space-y-4">
      <!-- Top Row: Balance and This Month -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="text-sm text-green-600 font-medium">Available Balance</div>
          <div class="text-xl font-bold text-green-700">{{ formatCurrency(summary.available_balance) }}</div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="text-sm text-blue-600 font-medium">This Month</div>
          <div class="text-xl font-bold text-blue-700">{{ formatCurrency(summary.earnings_this_month) }}</div>
          <div class="text-xs mt-1" :class="getGrowthDirection(summary.growth_percentage) === 'up' ? 'text-green-600' : getGrowthDirection(summary.growth_percentage) === 'down' ? 'text-red-600' : 'text-gray-600'">
            <span v-if="getGrowthDirection(summary.growth_percentage) === 'up'">↗ +</span>
            <span v-else-if="getGrowthDirection(summary.growth_percentage) === 'down'">↘ </span>
            <span v-else>→ </span>
            {{ formatPercentage(Math.abs(summary.growth_percentage)) }}
          </div>
        </div>
      </div>

      <!-- Bottom Row: Metrics -->
      <div class="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
        <div class="text-center">
          <div class="text-lg font-bold text-gray-900">{{ formatCurrency(summary.average_order_value) }}</div>
          <div class="text-xs text-gray-500">Avg Order</div>
        </div>
        
        <div class="text-center">
          <div class="text-lg font-bold text-gray-900">{{ formatPercentage(summary.completion_rate * 100) }}</div>
          <div class="text-xs text-gray-500">Success Rate</div>
        </div>
      </div>

      <!-- Payout Button -->
      <div class="pt-2">
        <NuxtLink
          to="/dashboard/earnings"
          :class="summary.available_balance >= 10 ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          class="w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          {{ summary.available_balance >= 10 ? 'Request Payout' : `Min R10 Required` }}
        </NuxtLink>
      </div>
    </div>

    <!-- No Data State -->
    <div v-else class="text-center py-8">
      <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
      <p class="text-gray-500 text-sm">No earnings data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Use earnings composable
const { summary, loading, error, fetchSummary, formatCurrency, formatPercentage, getGrowthDirection } = useEarnings()

// Load summary on mount
onMounted(async () => {
  try {
    await fetchSummary()
  } catch (err) {
    console.error('Failed to load earnings summary:', err)
  }
})
</script>