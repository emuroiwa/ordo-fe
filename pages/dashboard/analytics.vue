<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
          <p class="text-gray-600">Track your service performance and insights</p>
        </div>
        
        <div class="flex items-center space-x-3">
          <!-- Date Range Picker -->
          <div class="flex items-center space-x-2">
            <input
              v-model="dateRange.start_date"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :max="dateRange.end_date || today"
            >
            <span class="text-gray-500">to</span>
            <input
              v-model="dateRange.end_date"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :min="dateRange.start_date"
              :max="today"
            >
          </div>
          
          <!-- Export Button -->
          <div class="relative">
            <button
              @click="showExportMenu = !showExportMenu"
              class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              :disabled="loading"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            
            <!-- Export Menu -->
            <div
              v-if="showExportMenu"
              class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              <button
                @click="handleExport('json')"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
              >
                Export as JSON
              </button>
              <button
                @click="handleExport('csv')"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Export as CSV
              </button>
              <button
                @click="handleExport('pdf')"
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Loading analytics...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading analytics</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadAnalytics"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Analytics Content -->
      <div v-else-if="analytics" class="space-y-6">
        <!-- Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ analytics.overview.total_services }}</p>
                <p class="text-xs text-gray-600">{{ analytics.overview.active_services }} active</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Views</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatNumber(analytics.overview.total_views) }}</p>
                <p class="text-xs" :class="getViewsTrend() === 'up' ? 'text-green-600' : getViewsTrend() === 'down' ? 'text-red-600' : 'text-gray-600'">
                  <span v-if="getViewsTrend() === 'up'">↗</span>
                  <span v-else-if="getViewsTrend() === 'down'">↘</span>
                  <span v-else>→</span>
                  {{ getViewsTrend() === 'up' ? 'Trending up' : getViewsTrend() === 'down' ? 'Trending down' : 'Stable' }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ analytics.overview.total_bookings }}</p>
                <p class="text-xs text-gray-600">{{ formatPercentage(analytics.overview.conversion_rate) }} conversion</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(analytics.overview.total_revenue) }}</p>
                <p class="text-xs text-gray-600">{{ formatNumber(analytics.overview.average_rating) }} avg rating</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Views Trend Chart -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Views Trend</h3>
            <div class="h-64 flex items-end justify-between space-x-1">
              <div
                v-for="(point, index) in analytics.trends.views.slice(-14)"
                :key="index"
                class="bg-blue-500 rounded-t flex-1 min-w-0 hover:bg-blue-600 transition-colors cursor-pointer"
                :style="{ height: `${(point.value / Math.max(...analytics.trends.views.map(p => p.value))) * 100}%` }"
                :title="`${point.label}: ${point.value} views`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>{{ analytics.trends.views[analytics.trends.views.length - 14]?.label || '' }}</span>
              <span>{{ analytics.trends.views[analytics.trends.views.length - 1]?.label || '' }}</span>
            </div>
          </div>

          <!-- Revenue Trend Chart -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
            <div class="h-64 flex items-end justify-between space-x-1">
              <div
                v-for="(point, index) in analytics.trends.revenue.slice(-14)"
                :key="index"
                class="bg-green-500 rounded-t flex-1 min-w-0 hover:bg-green-600 transition-colors cursor-pointer"
                :style="{ height: `${(point.value / Math.max(...analytics.trends.revenue.map(p => p.value))) * 100}%` }"
                :title="`${point.label}: ${formatCurrency(point.value)}`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>{{ analytics.trends.revenue[analytics.trends.revenue.length - 14]?.label || '' }}</span>
              <span>{{ analytics.trends.revenue[analytics.trends.revenue.length - 1]?.label || '' }}</span>
            </div>
          </div>
        </div>

        <!-- Service Performance -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Top Performing Services -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Top Performing Services</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="service in analytics.services.top_performing" :key="service.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatNumber(service.views) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ service.bookings }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(service.revenue) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatPercentage(service.conversion_rate) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Service Breakdown -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Service Status</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="(count, status) in analytics.services.breakdown.by_status" :key="status" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full mr-3" :class="getStatusColor(status)"></div>
                    <span class="text-sm text-gray-600 capitalize">{{ status }}</span>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { DateRange } from '~/composables/useAnalytics'

// Set page meta
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { 
  analytics, 
  loading, 
  error, 
  fetchAnalytics, 
  exportAnalytics,
  formatCurrency,
  formatPercentage,
  formatNumber,
  getTrendDirection
} = useAnalytics()

// Redirect if not vendor
watch(currentRole, (role) => {
  if (role === 'customer') {
    navigateTo('/dashboard')
  }
}, { immediate: true })

// State
const showExportMenu = ref(false)
const today = new Date().toISOString().split('T')[0]
const dateRange = ref<DateRange>({
  start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
  end_date: today
})

// Methods
const loadAnalytics = async () => {
  try {
    await fetchAnalytics(dateRange.value)
  } catch (err) {
    console.error('Failed to load analytics:', err)
  }
}

const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
  try {
    showExportMenu.value = false
    const result = await exportAnalytics(format, dateRange.value)
    
    if (format === 'json') {
      // For JSON, trigger download
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // For CSV/PDF, show success message (in real app, would handle download URL)
      alert(`${format.toUpperCase()} export prepared! Download URL: ${result}`)
    }
  } catch (err) {
    console.error('Export failed:', err)
    alert('Export failed. Please try again.')
  }
}

const getViewsTrend = () => {
  if (!analytics.value?.trends.views) return 'stable'
  return getTrendDirection(analytics.value.trends.views)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500'
    case 'draft': return 'bg-gray-500'
    case 'paused': return 'bg-yellow-500'
    case 'archived': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

// Watch date range changes
watch(dateRange, () => {
  loadAnalytics()
}, { deep: true })

// Load analytics on mount
onMounted(() => {
  if (currentRole.value === 'vendor') {
    loadAnalytics()
  }
})

// Close export menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (showExportMenu.value && !(e.target as Element).closest('.relative')) {
      showExportMenu.value = false
    }
  })
})

// Set page title
useHead({
  title: 'Analytics - ORDO Dashboard'
})
</script>