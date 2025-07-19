<template>
  <NuxtLayout name="dashboard">
    <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-full">
            <p class="text-sm font-medium text-gray-500">Total Notifications</p>
            <p class="text-2xl font-bold text-gray-900">{{ notifications.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-full">
            <p class="text-sm font-medium text-gray-500">Unread</p>
            <p class="text-2xl font-bold text-gray-900">{{ unreadCount }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-5 w-full">
            <p class="text-sm font-medium text-gray-500">Read</p>
            <p class="text-2xl font-bold text-gray-900">{{ readNotifications.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-end space-x-4 mb-6">
      <button
        v-if="hasUnreadNotifications"
        @click="markAllAsRead"
        :disabled="isLoading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        Mark all as read
      </button>
      
      <!-- Test Notification Button (Development) -->
      <button
        @click="createTestNotification"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Test Notification
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Filters</h3>
      </div>
      <div class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              v-model="filters.status"
              @change="applyFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select 
              v-model="filters.type"
              @change="applyFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="welcome">Welcome</option>
              <option value="booking_confirmed">Booking Confirmed</option>
              <option value="booking_cancelled">Booking Cancelled</option>
              <option value="payment_received">Payment Received</option>
              <option value="payment_failed">Payment Failed</option>
              <option value="new_review">New Review</option>
              <option value="profile_updated">Profile Updated</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select 
              v-model="filters.priority"
              @change="applyFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <!-- Per Page -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Per Page</label>
            <select 
              v-model="filters.perPage"
              @change="applyFilters"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Bulk Actions -->
    <div v-if="selectedNotifications.length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">
          {{ selectedNotifications.length }} notification(s) selected
        </span>
        <div class="flex items-center space-x-2">
          <button
            @click="performBulkAction('mark_read')"
            class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark as Read
          </button>
          <button
            @click="performBulkAction('mark_unread')"
            class="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
          >
            Mark as Unread
          </button>
          <button
            @click="performBulkAction('delete')"
            class="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            @click="clearSelection"
            class="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">All Notifications</h3>
          <div class="flex items-center space-x-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleSelectAll"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
              <span class="ml-2 text-sm text-gray-600">Select All</span>
            </label>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="p-8 text-center">
        <div class="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p class="text-sm text-gray-500 mt-4">Loading notifications...</p>
      </div>

      <div v-else-if="notifications.length === 0" class="p-8 text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"/>
        </svg>
        <p class="text-lg text-gray-500 mb-2">No notifications found</p>
        <p class="text-sm text-gray-400">You're all caught up!</p>
      </div>

      <div v-else>{{ notifications.length }} notifications found
        <div v-for="notification in notifications" :key="notification.id" class="border-b border-gray-100 last:border-b-0">
          <div class="flex items-start p-4 hover:bg-gray-50">
            <!-- Checkbox -->
            <div class="flex-shrink-0 mr-3 pt-1">
              <input
                type="checkbox"
                :checked="selectedNotifications.includes(notification.id)"
                @change="toggleNotificationSelection(notification.id)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
            </div>

            <!-- Notification Item -->
            <div class="flex-1">
              <NotificationItem
                :notification="notification"
                @click="handleNotificationClick"
                @mark-read="markAsRead"
                @mark-unread="markAsUnread"
                @delete="deleteNotification"
                class="border-0"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="meta.last_page > 1" class="p-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Showing {{ ((meta.current_page - 1) * meta.per_page) + 1 }} to 
            {{ Math.min(meta.current_page * meta.per_page, meta.total) }} of 
            {{ meta.total }} notifications
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(meta.current_page - 1)"
              :disabled="meta.current_page <= 1"
              class="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            <span class="text-sm text-gray-600">
              Page {{ meta.current_page }} of {{ meta.last_page }}
            </span>
            <button
              @click="goToPage(meta.current_page + 1)"
              :disabled="meta.current_page >= meta.last_page"
              class="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Set layout
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// Use auth and notification composables
const { user, logout } = useAuth()
const {
  notifications,
  unreadCount,
  isLoading,
  hasUnreadNotifications,
  unreadNotifications,
  readNotifications,
  fetchNotifications,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  deleteNotification,
  bulkAction,
  createNotification
} = useNotifications()

// Local state
const selectedNotifications = ref([])
const meta = ref({
  current_page: 1,
  last_page: 1,
  per_page: 25,
  total: 0
})

const filters = ref({
  status: '',
  type: '',
  priority: '',
  perPage: 25
})

// Computed
const allSelected = computed(() => {
  return notifications.value.length > 0 && 
         selectedNotifications.value.length === notifications.value.length
})

// Methods
const handleLogout = async () => {
  await logout()
  await navigateTo('/')
}

const handleNotificationClick = async (notification) => {
  // Mark as read if unread
  if (!notification.read_at) {
    await markAsRead(notification.id)
  }
  
  // Navigate to action URL if available
  const actionUrl = notification.metadata?.action_url
  if (actionUrl) {
    await navigateTo(actionUrl)
  }
}

const toggleNotificationSelection = (notificationId) => {
  const index = selectedNotifications.value.indexOf(notificationId)
  if (index > -1) {
    selectedNotifications.value.splice(index, 1)
  } else {
    selectedNotifications.value.push(notificationId)
  }
}

const toggleSelectAll = () => {
  if (allSelected.value) {
    selectedNotifications.value = []
  } else {
    selectedNotifications.value = notifications.value.map(n => n.id)
  }
}

const clearSelection = () => {
  selectedNotifications.value = []
}

const performBulkAction = async (action) => {
  if (selectedNotifications.value.length === 0) return
  
  const success = await bulkAction(action, selectedNotifications.value)
  if (success) {
    clearSelection()
  }
}

const applyFilters = async () => {
  const options = {
    perPage: filters.value.perPage,
    unreadOnly: filters.value.status === 'unread',
    type: filters.value.type || undefined,
    priority: filters.value.priority || undefined
  }
  
  const response = await fetchNotifications(options)
  console.log(response);
  meta.value = response.meta || meta.value
}

const goToPage = async (page) => {
  if (page < 1 || page > meta.value.last_page) return
  
  const options = {
    page,
    perPage: filters.value.perPage,
    unreadOnly: filters.value.status === 'unread',
    type: filters.value.type || undefined,
    priority: filters.value.priority || undefined
  }
  
  const response = await fetchNotifications(options)
  meta.value = response.meta || meta.value
}

const createTestNotification = async () => {
  try {
    const config = useRuntimeConfig()
    const { token } = useAuth()
    
    await $fetch('/api/v1/notifications/test-samples', {
      method: 'POST',
      baseURL: config.public.apiBase,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    
    // Refresh notifications after creating samples
    await applyFilters()
  } catch (error) {
    console.error('Failed to create test notifications:', error)
  }
}

// Initialize
onMounted(async () => {
  const response = await fetchNotifications({ perPage: filters.value.perPage })
  meta.value = response.meta || meta.value
})

// Set page title
useHead({
  title: 'Notifications - ORDO Dashboard'
})
</script>