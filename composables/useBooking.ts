import { ref } from 'vue'

interface Booking {
  id: string
  booking_reference: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_at: string
  end_time: string
  duration_minutes: number
  total_amount: number
  deposit_amount: number
  currency: string
  customer_notes?: string
  vendor_notes?: string
  location_type: 'vendor_location' | 'customer_location' | 'online'
  service_address?: any
  payment_status: 'pending' | 'partial' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
  customer: any
  vendor: any
  service: any
}

interface BookingFilters {
  status?: string
  type?: 'all' | 'customer' | 'vendor'
  per_page?: number
  page?: number
}

export const useBooking = () => {
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const config = useRuntimeConfig()

  const makeApiCall = async (url: string, options: any = {}) => {
    const tokenCookie = useCookie('auth-token')
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...options.headers
    }
    
    if (tokenCookie.value) {
      headers['Authorization'] = `Bearer ${tokenCookie.value}`
    }

    // Check if $fetch is available, if not try to get it from Nuxt app
    let fetchFn = globalThis.$fetch
    if (!fetchFn) {
      try {
        const nuxtApp = useNuxtApp()
        fetchFn = nuxtApp.$fetch
      } catch (error) {
        console.error('Unable to access $fetch:', error)
        throw new Error('$fetch is not available')
      }
    }

    return await fetchFn(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  // Fetch user's bookings
  const fetchBookings = async (filters: BookingFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/bookings', {
        method: 'GET',
        query: filters
      })

      bookings.value = response.data || []
      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch bookings'
      console.error('Error fetching bookings:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch a single booking
  const fetchBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      // Try authenticated endpoint first, fallback to public endpoint
      let response
      try {
        response = await makeApiCall(`/api/v1/bookings/${id}`, {
          method: 'GET'
        })
      } catch (authError: any) {
        // If unauthorized, try public endpoint
        if (authError.status === 401 || authError.status === 403) {
          response = await makeApiCall(`/api/v1/bookings/${id}/public`, {
            method: 'GET'
          })
        } else {
          throw authError
        }
      }

      currentBooking.value = response.booking
      return response.booking
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch booking'
      console.error('Error fetching booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create a new booking
  const createBooking = async (bookingData: any) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/bookings', {
        method: 'POST',
        body: bookingData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Add to bookings list
      if (response.booking) {
        bookings.value.unshift(response.booking)
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to create booking'
      console.error('Error creating booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update booking
  const updateBooking = async (id: string, updateData: any) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}`, {
        method: 'PUT',
        body: updateData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Update booking in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to update booking'
      console.error('Error updating booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cancel booking
  const cancelBooking = async (id: string, reason?: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/cancel`, {
        method: 'POST',
        body: { reason },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Update booking status in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to cancel booking'
      console.error('Error cancelling booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Confirm booking (vendor only)
  const confirmBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/confirm`, {
        method: 'POST'
      })

      // Update booking status in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to confirm booking'
      console.error('Error confirming booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Mark booking as in progress (vendor only)
  const markInProgress = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/in-progress`, {
        method: 'POST'
      })

      // Update booking status in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to update booking status'
      console.error('Error marking booking in progress:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Complete booking (vendor only)
  const completeBooking = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/complete`, {
        method: 'POST'
      })

      // Update booking status in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to complete booking'
      console.error('Error completing booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Reschedule booking
  const rescheduleBooking = async (id: string, newDateTime: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/bookings/${id}/reschedule`, {
        method: 'POST',
        body: { scheduled_at: newDateTime },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // Update booking in list
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1 && response.booking) {
        bookings.value[index] = response.booking
      }

      // Update current booking if it's the same
      if (currentBooking.value?.id === id && response.booking) {
        currentBooking.value = response.booking
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to reschedule booking'
      console.error('Error rescheduling booking:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility functions
  const getBookingStatus = (booking: Booking) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    
    return {
      color: statusColors[booking.status] || 'bg-gray-100 text-gray-800',
      text: booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ')
    }
  }

  const formatBookingTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  }

  const canCancelBooking = (booking: Booking) => {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return false
    }
    
    const now = new Date()
    const bookingTime = new Date(booking.scheduled_at)
    const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    return hoursUntilBooking > 0 // Can cancel until booking time
  }

  const canRescheduleBooking = (booking: Booking) => {
    if (booking.status !== 'pending' && booking.status !== 'confirmed') {
      return false
    }
    
    const now = new Date()
    const bookingTime = new Date(booking.scheduled_at)
    const hoursUntilBooking = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    return hoursUntilBooking > 24 // Can reschedule 24+ hours before
  }

  // Fetch available slots for a service
  const fetchAvailableSlots = async (userSlug: string, serviceSlug: string, params: {
    start_date?: string
    end_date?: string
    duration?: number
  } = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(
        `/api/v1/services/${userSlug}/${serviceSlug}/available-slots?${queryParams.toString()}`
      )
      
      return response.data || []
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch available slots'
      throw err
    } finally {
      loading.value = false
    }
  }

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
    fetchAvailableSlots,

    // Utilities
    getBookingStatus,
    formatBookingTime,
    canCancelBooking,
    canRescheduleBooking
  }
}