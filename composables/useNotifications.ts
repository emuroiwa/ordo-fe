import { ref, computed, readonly, onUnmounted, type ComputedRef } from 'vue'

// Nuxt auto-imports (explicit for TypeScript)
declare global {
  const useRuntimeConfig: () => any
  const useAuth: () => any
  const navigateTo: (to: string) => Promise<void>
}

// Type definitions
export interface NotificationData {
  title: string
  message: string
  icon?: string
  action_url?: string
}

export interface NotificationMetadata {
  icon?: string
  action_url?: string
  [key: string]: any
}

export interface Notification {
  id: string
  type: string
  notifiable_type: string
  notifiable_id: string
  data: NotificationData
  metadata?: NotificationMetadata
  read_at: string | null
  priority: 'low' | 'normal' | 'high' | 'urgent'
  expires_at?: string | null
  created_at: string
  updated_at: string
  // Helper methods (optional)
  getIcon?(): string
  getTitle?(): string
  getMessage?(): string
  getActionUrl?(): string | null
}

export interface NotificationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
  unread_count: number
}

export interface NotificationResponse {
  notifications: Notification[]
  meta: NotificationMeta
}

export interface FetchNotificationsOptions {
  page?: number
  perPage?: number
  unreadOnly?: boolean
  type?: string
  priority?: string
  append?: boolean
}

export interface BulkActionPayload {
  action: 'mark_read' | 'mark_unread' | 'delete'
  notification_ids: string[]
}

export interface CreateNotificationPayload {
  type: string
  notifiable_type: string
  notifiable_id: string
  data: NotificationData
  metadata?: NotificationMetadata
  priority?: 'low' | 'normal' | 'high' | 'urgent'
  expires_at?: string
}

// Global state
const notifications = ref<Notification[]>([])
const unreadCount = ref<number>(0)
const isLoading = ref<boolean>(false)
const isDropdownOpen = ref<boolean>(false)

export const useNotifications = () => {
  const config = useRuntimeConfig()
  const { token } = useAuth()

  // Get API headers with authentication
  const getHeaders = (): Record<string, string> => ({
    'Authorization': `Bearer ${token.value}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })

  // Fetch all notifications with pagination
  const fetchNotifications = async (options: FetchNotificationsOptions = {}): Promise<NotificationResponse> => {
    if (!token.value) return { notifications: [], meta: {} as NotificationMeta }
    
    isLoading.value = true
    
    try {
      const queryParams = new URLSearchParams({
        page: (options.page || 1).toString(),
        per_page: (options.perPage || 15).toString(),
        ...(options.unreadOnly && { unread_only: 'true' }),
        ...(options.type && { type: options.type }),
        ...(options.priority && { priority: options.priority }),
      })

      const fetchResponse = await fetch(`${config.public.apiBase}/api/v1/notifications?${queryParams}`, {
        method: 'GET',
        headers: getHeaders(),
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as NotificationResponse

      if (options.append) {
        notifications.value = [...notifications.value, ...response.notifications]
      } else {
        notifications.value = response.notifications
      }
      
      unreadCount.value = response.meta.unread_count

      return response
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
      return { notifications: [], meta: {} as NotificationMeta }
    } finally {
      isLoading.value = false
    }
  }

  // Fetch recent notifications for dropdown
  const fetchRecentNotifications = async (limit: number = 5): Promise<Notification[]> => {
    if (!token.value) return []
    
    try {
      const fetchResponse = await fetch(`${config.public.apiBase}/api/v1/notifications/recent?limit=${limit}`, {
        method: 'GET',
        headers: getHeaders(),
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as { notifications: Notification[], unread_count: number }

      notifications.value = response.notifications
      unreadCount.value = response.unread_count

      return response.notifications
    } catch (error) {
      console.error('Failed to fetch recent notifications:', error)
      return []
    }
  }

  // Fetch unread count only
  const fetchUnreadCount = async (): Promise<number> => {
    if (!token.value) return 0
    
    try {
      const response = await $fetch<{ unread_count: number }>('/api/v1/notifications/unread-count', {
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5000
      })

      unreadCount.value = response.unread_count
      return response.unread_count
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
      return 0
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string): Promise<boolean> => {
    if (!token.value) return false
    
    try {
      const fetchResponse = await fetch(`${config.public.apiBase}/api/v1/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: getHeaders(),
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }

      // Update local state
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && !notification.read_at) {
        notification.read_at = new Date().toISOString()
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }

      return true
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
      return false
    }
  }

  // Mark notification as unread
  const markAsUnread = async (notificationId: string): Promise<boolean> => {
    if (!token.value) return false
    
    try {
      await $fetch(`/api/v1/notifications/${notificationId}/unread`, {
        method: 'PATCH',
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5000
      })

      // Update local state
      const notification = notifications.value.find(n => n.id === notificationId)
      if (notification && notification.read_at) {
        notification.read_at = null
        unreadCount.value += 1
      }

      return true
    } catch (error) {
      console.error('Failed to mark notification as unread:', error)
      return false
    }
  }

  // Mark all notifications as read
  const markAllAsRead = async (): Promise<boolean> => {
    if (!token.value) return false
    
    try {
      const fetchResponse = await fetch(`${config.public.apiBase}/api/v1/notifications/mark-all-read`, {
        method: 'POST',
        headers: getHeaders(),
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }

      // Update local state
      notifications.value.forEach(notification => {
        if (!notification.read_at) {
          notification.read_at = new Date().toISOString()
        }
      })
      unreadCount.value = 0

      return true
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
      return false
    }
  }

  // Delete notification
  const deleteNotification = async (notificationId: string): Promise<boolean> => {
    if (!token.value) return false
    
    try {
      await $fetch(`/api/v1/notifications/${notificationId}`, {
        method: 'DELETE',
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5000
      })

      // Update local state
      const index = notifications.value.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        const notification = notifications.value[index]
        if (!notification.read_at) {
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
        notifications.value.splice(index, 1)
      }

      return true
    } catch (error) {
      console.error('Failed to delete notification:', error)
      return false
    }
  }

  // Bulk actions
  const bulkAction = async (action: 'mark_read' | 'mark_unread' | 'delete', notificationIds: string[]): Promise<any> => {
    if (!token.value || !notificationIds.length) return false
    
    try {
      const response = await $fetch('/api/v1/notifications/bulk-action', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        body: {
          action,
          notification_ids: notificationIds
        } as BulkActionPayload,
        timeout: 10000
      })

      // Update local state based on action
      notificationIds.forEach(id => {
        const notification = notifications.value.find(n => n.id === id)
        if (!notification) return

        switch (action) {
          case 'mark_read':
            if (!notification.read_at) {
              notification.read_at = new Date().toISOString()
              unreadCount.value = Math.max(0, unreadCount.value - 1)
            }
            break
          case 'mark_unread':
            if (notification.read_at) {
              notification.read_at = null
              unreadCount.value += 1
            }
            break
          case 'delete':
            const index = notifications.value.findIndex(n => n.id === id)
            if (index !== -1) {
              if (!notification.read_at) {
                unreadCount.value = Math.max(0, unreadCount.value - 1)
              }
              notifications.value.splice(index, 1)
            }
            break
        }
      })

      return response
    } catch (error) {
      console.error('Failed to perform bulk action:', error)
      return false
    }
  }

  // Create a new notification (for testing)
  const createNotification = async (notificationData: CreateNotificationPayload): Promise<Notification | null> => {
    if (!token.value) return null
    
    try {
      const response = await $fetch<{ notification: Notification }>('/api/v1/notifications', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        body: notificationData,
        timeout: 5000
      })

      // Add to local state
      notifications.value.unshift(response.notification)
      if (!response.notification.read_at) {
        unreadCount.value += 1
      }

      return response.notification
    } catch (error) {
      console.error('Failed to create notification:', error)
      return null
    }
  }

  // Helper functions
  const getNotificationIcon = (notification: Notification): string => {
    return notification.metadata?.icon || notification.getIcon?.() || 'bell'
  }

  const getNotificationTitle = (notification: Notification): string => {
    return notification.data?.title || notification.getTitle?.() || 'Notification'
  }

  const getNotificationMessage = (notification: Notification): string => {
    return notification.data?.message || notification.getMessage?.() || ''
  }

  const getNotificationActionUrl = (notification: Notification): string | null => {
    return notification.metadata?.action_url || notification.getActionUrl?.() || null
  }

  const isNotificationUnread = (notification: Notification): boolean => {
    return !notification.read_at
  }

  const getNotificationPriorityClass = (notification: Notification): string => {
    const priority = notification.priority || 'normal'
    return {
      low: 'text-gray-600',
      normal: 'text-blue-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    }[priority] || 'text-blue-600'
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

  // Auto-refresh unread count
  let refreshInterval: NodeJS.Timeout | null = null
  
  const startAutoRefresh = (intervalMs: number = 60000): void => {
    if (refreshInterval) clearInterval(refreshInterval)
    
    refreshInterval = setInterval(() => {
      if (token.value) {
        fetchUnreadCount()
      }
    }, intervalMs)
  }

  const stopAutoRefresh = (): void => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  // Computed values
  const hasUnreadNotifications: ComputedRef<boolean> = computed(() => unreadCount.value > 0)
  const unreadNotifications: ComputedRef<Notification[]> = computed(() => 
    notifications.value.filter(n => !n.read_at)
  )
  const readNotifications: ComputedRef<Notification[]> = computed(() => 
    notifications.value.filter(n => n.read_at)
  )

  // Toggle dropdown
  const toggleDropdown = (): void => {
    isDropdownOpen.value = !isDropdownOpen.value
    
    if (isDropdownOpen.value) {
      fetchRecentNotifications()
    }
  }

  const closeDropdown = (): void => {
    isDropdownOpen.value = false
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopAutoRefresh()
  })

  return {
    // State
    notifications: readonly(notifications),
    unreadCount: readonly(unreadCount),
    isLoading: readonly(isLoading),
    isDropdownOpen: readonly(isDropdownOpen),
    
    // Computed
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    
    // Actions
    fetchNotifications,
    fetchRecentNotifications,
    fetchUnreadCount,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    bulkAction,
    createNotification,
    
    // UI Actions
    toggleDropdown,
    closeDropdown,
    
    // Helpers
    getNotificationIcon,
    getNotificationTitle,
    getNotificationMessage,
    getNotificationActionUrl,
    isNotificationUnread,
    getNotificationPriorityClass,
    formatNotificationTime,
    
    // Auto-refresh
    startAutoRefresh,
    stopAutoRefresh
  }
}