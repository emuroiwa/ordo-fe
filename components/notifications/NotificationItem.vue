<template>
  <div 
    class="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
    :class="{ 'bg-blue-50 border-l-4 border-l-blue-500': isUnread }"
    @click="$emit('click', notification)"
  >
    <div class="flex items-start space-x-3">
      <!-- Debug -->
      <div class="text-xs text-blue-500 mb-2">NotificationItem: {{ notification?.id }}</div>
      
      <!-- Icon -->
      <div class="flex-shrink-0">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="iconClasses"
        >
          <component :is="iconComponent" class="w-4 h-4" />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p 
              class="text-sm font-medium text-gray-900 truncate"
              :class="{ 'font-semibold': isUnread }"
            >
              {{ getNotificationTitle(notification) }}
            </p>
            <p class="text-sm text-gray-600 mt-1 line-clamp-2">
              {{ getNotificationMessage(notification) }}
            </p>
          </div>
          
          
          <!-- Priority Indicator -->
          <div v-if="notification.priority !== 'normal'" class="flex-shrink-0 ml-2">
            <span 
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="priorityClasses"
            >
              {{ notification.priority }}
            </span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between mt-2">
          <div class="flex items-center space-x-2">
            <span class="text-xs text-gray-500">
              {{ formatNotificationTime(notification) }}
            </span>
            <span v-if="isUnread" class="w-2 h-2 bg-blue-500 rounded-full"></span>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-1" @click.stop>
            <!-- Mark as read/unread -->
            <button
              v-if="isUnread"
              @click="$emit('mark-read', notification.id)"
              class="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Mark as read"
            >
              <CheckIcon class="w-4 h-4" />
            </button>
            <button
              v-else
              @click="$emit('mark-unread', notification.id)"
              class="p-1 text-gray-400 hover:text-orange-600 transition-colors"
              title="Mark as unread"
            >
              <EyeSlashIcon class="w-4 h-4" />
            </button>

            <!-- Delete -->
            <button
              @click="$emit('delete', notification.id)"
              class="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete notification"
            >
              <TrashIcon class="w-4 h-4" />
            </button>

            <!-- Action URL indicator -->
            <div v-if="notification.metadata?.action_url" class="p-1">
              <ChevronRightIcon class="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Notification } from '~/composables/useNotifications'

// Import icons
import {
  CheckIcon,
  TrashIcon,
  ChevronRightIcon,
  EyeSlashIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  StarIcon,
  UserIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

interface Props {
  notification: Notification
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [notification: Notification]
  'mark-read': [notificationId: string]
  'mark-unread': [notificationId: string]
  delete: [notificationId: string]
}>()

// Helper functions - inline for now to avoid composable issues
const getNotificationTitle = (notification: Notification): string => {
  return notification.data?.title || 'Notification'
}

const getNotificationMessage = (notification: Notification): string => {
  return notification.data?.message || ''
}

const formatNotificationTime = (notification: Notification): string => {
  if (!notification.created_at) return ''
  
  const date = new Date(notification.created_at)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString()
}

const isNotificationUnread = (notification: Notification): boolean => {
  return !notification.read_at
}

const isUnread = computed(() => isNotificationUnread(props.notification))

// Icon mapping
const iconMap = {
  'bell': BellIcon,
  'check-circle': CheckCircleIcon,
  'x-circle': XCircleIcon,
  'credit-card': CreditCardIcon,
  'exclamation-triangle': ExclamationTriangleIcon,
  'star': StarIcon,
  'user': UserIcon,
  'heart': HeartIcon
}

const iconComponent = computed(() => {
  const iconName = props.notification.metadata?.icon || 'bell'
  return iconMap[iconName] || BellIcon
})

const iconClasses = computed(() => {
  const priority = props.notification.priority || 'normal'
  const baseClasses = 'text-white'
  
  const priorityColors = {
    low: 'bg-gray-400',
    normal: 'bg-blue-500',
    high: 'bg-orange-500',
    urgent: 'bg-red-500'
  }
  
  return `${baseClasses} ${priorityColors[priority] || priorityColors.normal}`
})

const priorityClasses = computed(() => {
  const priority = props.notification.priority
  
  const classes = {
    low: 'bg-gray-100 text-gray-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  }
  
  return classes[priority] || classes.low
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>