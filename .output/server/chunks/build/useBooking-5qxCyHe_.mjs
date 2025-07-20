import { ref } from 'vue';
import { c as useNuxtApp, a as useRuntimeConfig } from './server.mjs';
import { u as useCookie } from './cookie-DrsL3lQs.mjs';

const useBooking = () => {
  const bookings = ref([]);
  const currentBooking = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const config = useRuntimeConfig();
  const makeApiCall = async (url, options = {}) => {
    const tokenCookie = useCookie("auth-token");
    const headers = {
      "Accept": "application/json",
      ...options.headers
    };
    if (tokenCookie.value) {
      headers["Authorization"] = `Bearer ${tokenCookie.value}`;
    }
    let fetchFn = globalThis.$fetch;
    if (!fetchFn) {
      try {
        const nuxtApp = useNuxtApp();
        fetchFn = nuxtApp.$fetch;
      } catch (error2) {
        console.error("Unable to access $fetch:", error2);
        throw new Error("$fetch is not available");
      }
    }
    return await fetchFn(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    });
  };
  const fetchBookings = async (filters = {}) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall("/api/v1/bookings", {
        method: "GET",
        query: filters
      });
      bookings.value = response.data || [];
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to fetch bookings";
      console.error("Error fetching bookings:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchBooking = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      let response;
      try {
        response = await makeApiCall(`/api/v1/bookings/${id}`, {
          method: "GET"
        });
      } catch (authError) {
        if (authError.status === 401 || authError.status === 403) {
          response = await makeApiCall(`/api/v1/bookings/${id}/public`, {
            method: "GET"
          });
        } else {
          throw authError;
        }
      }
      currentBooking.value = response.booking;
      return response.booking;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to fetch booking";
      console.error("Error fetching booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const createBooking = async (bookingData) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall("/api/v1/bookings", {
        method: "POST",
        body: bookingData,
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.booking) {
        bookings.value.unshift(response.booking);
      }
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Failed to create booking";
      console.error("Error creating booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateBooking = async (id, updateData) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}`, {
        method: "PUT",
        body: updateData,
        headers: {
          "Content-Type": "application/json"
        }
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to update booking";
      console.error("Error updating booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const cancelBooking = async (id, reason) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/cancel`, {
        method: "POST",
        body: { reason },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to cancel booking";
      console.error("Error cancelling booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const confirmBooking = async (id) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/confirm`, {
        method: "POST"
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to confirm booking";
      console.error("Error confirming booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const markInProgress = async (id) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/in-progress`, {
        method: "POST"
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to update booking status";
      console.error("Error marking booking in progress:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const completeBooking = async (id) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/complete`, {
        method: "POST"
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to complete booking";
      console.error("Error completing booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const rescheduleBooking = async (id, newDateTime) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/reschedule`, {
        method: "POST",
        body: { scheduled_at: newDateTime },
        headers: {
          "Content-Type": "application/json"
        }
      });
      const index = bookings.value.findIndex((b) => b.id === id);
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking;
      }
      if (((_a = currentBooking.value) == null ? void 0 : _a.id) === id && response.booking) {
        currentBooking.value = response.booking;
      }
      return response;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to reschedule booking";
      console.error("Error rescheduling booking:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getBookingStatus = (booking) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      in_progress: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return {
      color: statusColors[booking.status] || "bg-gray-100 text-gray-800",
      text: booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")
    };
  };
  const formatBookingTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
    };
  };
  const canCancelBooking = (booking) => {
    if (booking.status === "cancelled" || booking.status === "completed") {
      return false;
    }
    const now = /* @__PURE__ */ new Date();
    const bookingTime = new Date(booking.scheduled_at);
    const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1e3 * 60 * 60);
    return hoursUntilBooking > 0;
  };
  const canRescheduleBooking = (booking) => {
    if (booking.status !== "pending" && booking.status !== "confirmed") {
      return false;
    }
    const now = /* @__PURE__ */ new Date();
    const bookingTime = new Date(booking.scheduled_at);
    const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1e3 * 60 * 60);
    return hoursUntilBooking > 24;
  };
  return {
    // State
    bookings,
    currentBooking,
    loading,
    error,
    // Actions
    fetchBookings,
    fetchBooking,
    createBooking,
    updateBooking,
    cancelBooking,
    confirmBooking,
    markInProgress,
    completeBooking,
    rescheduleBooking,
    // Utilities
    getBookingStatus,
    formatBookingTime,
    canCancelBooking,
    canRescheduleBooking
  };
};

export { useBooking as u };
//# sourceMappingURL=useBooking-5qxCyHe_.mjs.map
