import { ref, readonly } from 'vue'

export interface VendorAvailability {
  id: string
  vendor_id: string
  day_of_week: string
  start_time: string
  end_time: string
  break_times: Array<{ start: string; end: string }> | null
  default_duration: number
  buffer_time: number
  effective_from: string | null
  effective_until: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AvailabilityData {
  working_days: string[]
  working_hours: {
    start: string
    end: string
  }
  break_times: Array<{ start: string; end: string }>
  default_duration: number
  buffer_time: number
  apply_to: 'ongoing' | 'dateRange'
  date_range?: {
    start: string
    end: string
  }
}

export interface TimeSlot {
  start: string
  end: string
  duration: number
}

export interface WeeklyAvailability {
  id: string
  title: string
  start: string
  end: string
  type: string
  backgroundColor: string
  borderColor: string
  classNames: string[]
}

const availabilities = ref<VendorAvailability[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export const useAvailability = () => {
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

    if (options.method !== 'GET' && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  const fetchAvailabilities = async (filters: any = {}) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      
      if (filters.date) {
        params.append('date', filters.date)
      }
      
      if (filters.day_of_week) {
        params.append('day_of_week', filters.day_of_week)
      }

      const url = `/api/v1/availability${params.toString() ? '?' + params.toString() : ''}`
      const response = await makeApiCall(url)

      if (response.success) {
        availabilities.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Failed to fetch availabilities')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch availabilities'
      console.error('Fetch availabilities error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createAvailability = async (data: AvailabilityData) => {
    try {
      loading.value = true
      error.value = null

      const response = await makeApiCall('/api/v1/availability', {
        method: 'POST',
        body: JSON.stringify(data)
      })

      if (response.success) {
        // Add new availabilities to the list
        if (Array.isArray(response.data)) {
          availabilities.value.push(...response.data)
        } else {
          availabilities.value.push(response.data)
        }
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create availability')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create availability'
      console.error('Create availability error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateAvailability = async (id: string, data: Partial<VendorAvailability>) => {
    try {
      loading.value = true
      error.value = null

      const response = await makeApiCall(`/api/v1/availability/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      if (response.success) {
        // Update the availability in the list
        const index = availabilities.value.findIndex(a => a.id === id)
        if (index !== -1) {
          availabilities.value[index] = response.data
        }
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update availability')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update availability'
      console.error('Update availability error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAvailability = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await makeApiCall(`/api/v1/availability/${id}`, {
        method: 'DELETE'
      })

      if (response.success) {
        // Remove from the list
        availabilities.value = availabilities.value.filter(a => a.id !== id)
        return true
      } else {
        throw new Error(response.message || 'Failed to delete availability')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to delete availability'
      console.error('Delete availability error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTimeSlots = async (date: string, serviceId?: string) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams({ date })
      if (serviceId) {
        params.append('service_id', serviceId)
      }

      const response = await makeApiCall(`/api/v1/availability/time-slots?${params.toString()}`)

      if (response.success) {
        return {
          slots: response.data as TimeSlot[],
          meta: response.meta
        }
      } else {
        throw new Error(response.message || 'Failed to get time slots')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to get time slots'
      console.error('Get time slots error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getWeeklyOverview = async (startDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const params = new URLSearchParams()
      if (startDate) {
        params.append('start_date', startDate)
      }

      const url = `/api/v1/availability/weekly-overview${params.toString() ? '?' + params.toString() : ''}`
      const response = await makeApiCall(url)

      if (response.success) {
        return {
          events: response.data as WeeklyAvailability[],
          meta: response.meta
        }
      } else {
        throw new Error(response.message || 'Failed to get weekly overview')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to get weekly overview'
      console.error('Get weekly overview error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkUpdateAvailabilities = async (availabilityIds: string[], action: 'activate' | 'deactivate' | 'delete', data?: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await makeApiCall('/api/v1/availability/bulk-update', {
        method: 'POST',
        body: JSON.stringify({
          availability_ids: availabilityIds,
          action,
          data
        })
      })

      if (response.success) {
        // Refresh the availabilities list
        await fetchAvailabilities()
        return response.data
      } else {
        throw new Error(response.message || 'Failed to perform bulk update')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to perform bulk update'
      console.error('Bulk update error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const isDateAvailable = (date: string | Date, availabilityList?: VendorAvailability[]) => {
    const targetDate = new Date(date)
    const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dateString = targetDate.toISOString().split('T')[0]
    
    const availabilityData = availabilityList || availabilities.value
    
    const dayAvailability = availabilityData.find(availability => {
      if (availability.day_of_week !== dayName || !availability.is_active) {
        return false
      }
      
      // Check if the date falls within the effective range
      if (availability.effective_from && dateString < availability.effective_from) {
        return false
      }
      
      if (availability.effective_until && dateString > availability.effective_until) {
        return false
      }
      
      return true
    })
    
    return !!dayAvailability
  }

  const getAvailabilityForDate = (date: string | Date, availabilityList?: VendorAvailability[]) => {
    const targetDate = new Date(date)
    const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const dateString = targetDate.toISOString().split('T')[0]
    
    const availabilityData = availabilityList || availabilities.value
    
    return availabilityData.find(availability => {
      if (availability.day_of_week !== dayName || !availability.is_active) {
        return false
      }
      
      // Check if the date falls within the effective range
      if (availability.effective_from && dateString < availability.effective_from) {
        return false
      }
      
      if (availability.effective_until && dateString > availability.effective_until) {
        return false
      }
      
      return true
    })
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    availabilities: readonly(availabilities),
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    fetchAvailabilities,
    createAvailability,
    updateAvailability,
    deleteAvailability,
    getTimeSlots,
    getWeeklyOverview,
    bulkUpdateAvailabilities,

    // Utilities
    isDateAvailable,
    getAvailabilityForDate,
    clearError
  }
}