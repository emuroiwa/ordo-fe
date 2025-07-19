<template>
  <div class="relative">
    <!-- Notification Bell Button -->
    <button 
      @click="toggleDropdown"
      class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      :class="{ 'text-blue-600': hasUnreadNotifications }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"
        />
      </svg>
      
      <!-- Unread Count Badge -->
      <span 
        v-if="unreadCount > 0" 
        class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isDropdownOpen"
        class="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
          <div class="flex items-center space-x-2">
            <button
              v-if="hasUnreadNotifications"
              @click="markAllAsRead"
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              :disabled="isLoading"
            >
              Mark all read
            </button>
            <NuxtLink 
              to="/dashboard/notifications"
              @click="closeDropdown"
              class="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              View all
            </NuxtLink>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="max-h-96 overflow-y-auto">
          <div v-if="isLoading" class="p-4 text-center">
            <div class="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p class="text-sm text-gray-500 mt-2">Loading notifications...</p>
          </div>

          <div v-else-if="notifications.length === 0" class="p-8 text-center">
            <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8" />
            </svg>
            <p class="text-sm text-gray-500">No notifications yet</p>
          </div>

          <div v-else>
            <NotificationItem
              v-for="notification in notifications"
              :key="notification.id"
              :notification="notification"
              @click="handleNotificationClick"
              @mark-read="markAsRead"
              @mark-unread="markAsUnread"
              @delete="deleteNotification"
              class="border-b border-gray-100 last:border-b-0"
            />
          </div>
        </div>

        <!-- Footer -->
        <div v-if="notifications.length > 0" class="p-3 border-t border-gray-200 bg-gray-50">
          <NuxtLink 
            to="/dashboard/notifications"
            @click="closeDropdown"
            class="block w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all {{ unreadCount > 0 ? `${unreadCount} ` : '' }}notifications
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <!-- Backdrop -->
    <div 
      v-if="isDropdownOpen"
      class="fixed inset-0 z-40"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script setup>
const {
  notifications,
  unreadCount,
  isLoading,
  isDropdownOpen,
  hasUnreadNotifications,
  fetchRecentNotifications,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  deleteNotification,
  toggleDropdown,
  closeDropdown,
  startAutoRefresh,
  stopAutoRefresh
} = useNotifications()

// Auto-refresh notifications every minute
onMounted(() => {
  fetchRecentNotifications()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})

const handleNotificationClick = async (notification) => {
  // Mark as read if unread
  if (!notification.read_at) {
    await markAsRead(notification.id)
  }
  
  // Navigate to action URL if available
  const actionUrl = notification.metadata?.action_url
  if (actionUrl) {
    closeDropdown()
    await navigateTo(actionUrl)
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>