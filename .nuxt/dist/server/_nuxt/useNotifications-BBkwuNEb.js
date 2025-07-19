import { computed, ref, readonly } from "vue";
import { a as useRuntimeConfig } from "../server.mjs";
import { u as useAuth } from "./useAuth-DYBaK23E.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const notifications = ref([]);
const unreadCount = ref(0);
const isLoading = ref(false);
const isDropdownOpen = ref(false);
const useNotifications = () => {
  const config = useRuntimeConfig();
  const { token } = useAuth();
  const getHeaders = () => ({
    "Authorization": `Bearer ${token.value}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  });
  const fetchNotifications = async (options = {}) => {
    if (!token.value) return { notifications: [], meta: {} };
    isLoading.value = true;
    try {
      const queryParams = new URLSearchParams({
        page: (options.page || 1).toString(),
        per_page: (options.perPage || 15).toString(),
        ...options.unreadOnly && { unread_only: "true" },
        ...options.type && { type: options.type },
        ...options.priority && { priority: options.priority }
      });
      const response = await $fetch(`/api/v1/notifications?${queryParams}`, {
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 1e4
      });
      if (options.append) {
        notifications.value = [...notifications.value, ...response.notifications];
      } else {
        notifications.value = response.notifications;
      }
      unreadCount.value = response.meta.unread_count;
      return response;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return { notifications: [], meta: {} };
    } finally {
      isLoading.value = false;
    }
  };
  const fetchRecentNotifications = async (limit = 5) => {
    if (!token.value) return [];
    try {
      const response = await $fetch(`/api/v1/notifications/recent?limit=${limit}`, {
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      notifications.value = response.notifications;
      unreadCount.value = response.unread_count;
      return response.notifications;
    } catch (error) {
      console.error("Failed to fetch recent notifications:", error);
      return [];
    }
  };
  const fetchUnreadCount = async () => {
    if (!token.value) return 0;
    try {
      const response = await $fetch("/api/v1/notifications/unread-count", {
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      unreadCount.value = response.unread_count;
      return response.unread_count;
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
      return 0;
    }
  };
  const markAsRead = async (notificationId) => {
    if (!token.value) return false;
    try {
      await $fetch(`/api/v1/notifications/${notificationId}/read`, {
        method: "PATCH",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      const notification = notifications.value.find((n) => n.id === notificationId);
      if (notification && !notification.read_at) {
        notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
      return true;
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      return false;
    }
  };
  const markAsUnread = async (notificationId) => {
    if (!token.value) return false;
    try {
      await $fetch(`/api/v1/notifications/${notificationId}/unread`, {
        method: "PATCH",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      const notification = notifications.value.find((n) => n.id === notificationId);
      if (notification && notification.read_at) {
        notification.read_at = null;
        unreadCount.value += 1;
      }
      return true;
    } catch (error) {
      console.error("Failed to mark notification as unread:", error);
      return false;
    }
  };
  const markAllAsRead = async () => {
    if (!token.value) return false;
    try {
      await $fetch("/api/v1/notifications/mark-all-read", {
        method: "POST",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      notifications.value.forEach((notification) => {
        if (!notification.read_at) {
          notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
        }
      });
      unreadCount.value = 0;
      return true;
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      return false;
    }
  };
  const deleteNotification = async (notificationId) => {
    if (!token.value) return false;
    try {
      await $fetch(`/api/v1/notifications/${notificationId}`, {
        method: "DELETE",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        timeout: 5e3
      });
      const index = notifications.value.findIndex((n) => n.id === notificationId);
      if (index !== -1) {
        const notification = notifications.value[index];
        if (!notification.read_at) {
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
        notifications.value.splice(index, 1);
      }
      return true;
    } catch (error) {
      console.error("Failed to delete notification:", error);
      return false;
    }
  };
  const bulkAction = async (action, notificationIds) => {
    if (!token.value || !notificationIds.length) return false;
    try {
      const response = await $fetch("/api/v1/notifications/bulk-action", {
        method: "POST",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        body: {
          action,
          notification_ids: notificationIds
        },
        timeout: 1e4
      });
      notificationIds.forEach((id) => {
        const notification = notifications.value.find((n) => n.id === id);
        if (!notification) return;
        switch (action) {
          case "mark_read":
            if (!notification.read_at) {
              notification.read_at = (/* @__PURE__ */ new Date()).toISOString();
              unreadCount.value = Math.max(0, unreadCount.value - 1);
            }
            break;
          case "mark_unread":
            if (notification.read_at) {
              notification.read_at = null;
              unreadCount.value += 1;
            }
            break;
          case "delete":
            const index = notifications.value.findIndex((n) => n.id === id);
            if (index !== -1) {
              if (!notification.read_at) {
                unreadCount.value = Math.max(0, unreadCount.value - 1);
              }
              notifications.value.splice(index, 1);
            }
            break;
        }
      });
      return response;
    } catch (error) {
      console.error("Failed to perform bulk action:", error);
      return false;
    }
  };
  const createNotification = async (notificationData) => {
    if (!token.value) return null;
    try {
      const response = await $fetch("/api/v1/notifications", {
        method: "POST",
        baseURL: config.public.apiBase,
        headers: getHeaders(),
        body: notificationData,
        timeout: 5e3
      });
      notifications.value.unshift(response.notification);
      if (!response.notification.read_at) {
        unreadCount.value += 1;
      }
      return response.notification;
    } catch (error) {
      console.error("Failed to create notification:", error);
      return null;
    }
  };
  const getNotificationIcon = (notification) => {
    var _a, _b;
    return ((_a = notification.metadata) == null ? void 0 : _a.icon) || ((_b = notification.getIcon) == null ? void 0 : _b.call(notification)) || "bell";
  };
  const getNotificationTitle = (notification) => {
    var _a, _b;
    return ((_a = notification.data) == null ? void 0 : _a.title) || ((_b = notification.getTitle) == null ? void 0 : _b.call(notification)) || "Notification";
  };
  const getNotificationMessage = (notification) => {
    var _a, _b;
    return ((_a = notification.data) == null ? void 0 : _a.message) || ((_b = notification.getMessage) == null ? void 0 : _b.call(notification)) || "";
  };
  const getNotificationActionUrl = (notification) => {
    var _a, _b;
    return ((_a = notification.metadata) == null ? void 0 : _a.action_url) || ((_b = notification.getActionUrl) == null ? void 0 : _b.call(notification)) || null;
  };
  const isNotificationUnread = (notification) => {
    return !notification.read_at;
  };
  const getNotificationPriorityClass = (notification) => {
    const priority = notification.priority || "normal";
    return {
      low: "text-gray-600",
      normal: "text-blue-600",
      high: "text-orange-600",
      urgent: "text-red-600"
    }[priority] || "text-blue-600";
  };
  const formatNotificationTime = (notification) => {
    if (!notification.created_at) return "";
    const date = new Date(notification.created_at);
    const now = /* @__PURE__ */ new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 6e4);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  let refreshInterval = null;
  const startAutoRefresh = (intervalMs = 6e4) => {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval();
  };
  const stopAutoRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  };
  const hasUnreadNotifications = computed(() => unreadCount.value > 0);
  const unreadNotifications = computed(
    () => notifications.value.filter((n) => !n.read_at)
  );
  const readNotifications = computed(
    () => notifications.value.filter((n) => n.read_at)
  );
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
    if (isDropdownOpen.value) {
      fetchRecentNotifications();
    }
  };
  const closeDropdown = () => {
    isDropdownOpen.value = false;
  };
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
  };
};
export {
  useNotifications as u
};
//# sourceMappingURL=useNotifications-BBkwuNEb.js.map
