<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="border-b border-gray-200 pb-4">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-600">Manage vendor verifications and platform oversight</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Verifications</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending Review</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.pending || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Approved</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.approved || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Rejected</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.rejected || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Verifications -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Recent Verifications</h3>
              <NuxtLink 
                to="/admin/vendor-verifications" 
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </NuxtLink>
            </div>
          </div>
          <div class="p-6">
            <div v-if="loading" class="space-y-3">
              <div v-for="i in 3" :key="i" class="animate-pulse">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="recentVerifications.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p class="text-gray-500">No recent verifications</p>
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="verification in recentVerifications" 
                :key="verification.id"
                class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      v-if="verification.user.avatar_url" 
                      :src="verification.user.avatar_url" 
                      :alt="verification.user.name"
                      class="w-full h-full object-cover"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-bold">
                      {{ verification.user.name.charAt(0).toUpperCase() }}
                    </div>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ verification.user.name }}</p>
                    <p class="text-sm text-gray-500">{{ verification.user.business_name || verification.user.email }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span 
                    :class="getStatusColor(verification.status)"
                    class="px-2 py-1 text-xs font-medium rounded-full"
                  >
                    {{ getStatusText(verification.status) }}
                  </span>
                  <NuxtLink 
                    :to="`/admin/vendor-verifications/${verification.id}`"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Review
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Activity -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Today's Activity</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">New Submissions</span>
                <span class="font-semibold text-gray-900">{{ stats?.today_submissions || 0 }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Average Processing Time</span>
                <span class="font-semibold text-gray-900">{{ Math.round(stats?.avg_processing_time || 0) }}h</span>
              </div>
              <div class="pt-4 border-t border-gray-200">
                <NuxtLink 
                  to="/admin/vendor-verifications?status=pending"
                  class="inline-flex items-center justify-center w-full px-4 py-2 border border-blue-300 rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  Review Pending Verifications
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted, computed } from 'vue'

// Middleware
definePageMeta({
  middleware: ['auth', 'admin']
})

// Composables
const { isAdmin } = useRole()
const { 
  verifications, 
  stats, 
  loading, 
  fetchVerifications, 
  fetchStats,
  getStatusColor,
  getStatusText 
} = useAdminVerification()

// Redirect non-admin users
if (!isAdmin.value) {
  throw createError({
    statusCode: 403,
    statusMessage: 'Access Denied - Admin role required'
  })
}

// Computed
const recentVerifications = computed(() => {
  return verifications.value.slice(0, 5) // Show first 5 verifications
})

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchStats(),
    fetchVerifications(1)
  ])
})
</script>