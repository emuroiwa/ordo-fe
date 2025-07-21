import { ref, type Ref } from 'vue'

// Type definitions
export interface AnalyticsOverview {
  total_services: number
  active_services: number
  total_views: number
  total_bookings: number
  total_revenue: number
  average_rating: number
  conversion_rate: number
}

export interface TrendData {
  date: string
  value: number
  label: string
}

export interface TopService {
  id: string
  title: string
  bookings: number
  views: number
  revenue: number
  rating: number
  conversion_rate: number
}

export interface ServiceBreakdown {
  by_status: Record<string, number>
  by_category: Record<string, number>
}

export interface AnalyticsData {
  overview: AnalyticsOverview
  trends: {
    views: TrendData[]
    bookings: TrendData[]
    revenue: TrendData[]
  }
  services: {
    top_performing: TopService[]
    breakdown: ServiceBreakdown
  }
  period: {
    start_date: string
    end_date: string
  }
}

export interface DateRange {
  start_date?: string
  end_date?: string
}

export const useAnalytics = () => {
  const config = useRuntimeConfig()
  
  // Helper function to make API calls with proper error handling
  const makeApiCall = async (url: string, options: any = {}) => {
    // Get auth token from cookie
    const tokenCookie = useCookie('auth-token')
    
    // Prepare headers with authentication
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...options.headers
    }
    
    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    
    // Add authorization header if token exists
    if (tokenCookie.value) {
      headers['Authorization'] = `Bearer ${tokenCookie.value}`
    } else {
      throw new Error('Authentication token not found')
    }
    
    // Use global $fetch that should be available in Nuxt 3
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  // State
  const analytics: Ref<AnalyticsData | null> = ref(null)
  const summary: Ref<AnalyticsOverview | null> = ref(null)
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch comprehensive analytics
  const fetchAnalytics = async (dateRange: DateRange = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(dateRange).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(`/api/v1/analytics?${queryParams.toString()}`)
      
      if (response.success) {
        analytics.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch analytics')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch analytics'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch analytics summary for dashboard widgets
  const fetchSummary = async () => {
    try {
      const response = await makeApiCall('/api/v1/analytics/summary')
      
      if (response.success) {
        summary.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch analytics summary')
      }

      return response.data
    } catch (err: any) {
      console.error('Failed to fetch analytics summary:', err)
      throw err
    }
  }

  // Export analytics data
  const exportAnalytics = async (format: 'csv' | 'json' | 'pdf', dateRange: DateRange = {}) => {
    loading.value = true
    error.value = null

    try {
      const body = {
        format,
        ...dateRange
      }

      const response = await makeApiCall('/api/v1/analytics/export', {
        method: 'POST',
        body: JSON.stringify(body)
      })

      if (response.success) {
        if (format === 'json') {
          // For JSON format, return the data directly
          return response.data
        } else {
          // For CSV/PDF, return download URL
          return response.download_url
        }
      } else {
        throw new Error(response.message || 'Failed to export analytics')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to export analytics'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helper function to format currency
  const formatCurrency = (amount: number, currency = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Helper function to format percentage
  const formatPercentage = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`
  }

  // Helper function to format large numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // Helper function to calculate growth percentage
  const calculateGrowth = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  // Helper function to get trend direction
  const getTrendDirection = (data: TrendData[]): 'up' | 'down' | 'stable' => {
    if (data.length < 2) return 'stable'
    
    const recent = data.slice(-7) // Last 7 data points
    const firstValue = recent[0].value
    const lastValue = recent[recent.length - 1].value
    
    const change = ((lastValue - firstValue) / firstValue) * 100
    
    if (change > 5) return 'up'
    if (change < -5) return 'down'
    return 'stable'
  }

  return {
    // State
    analytics,
    summary,
    loading,
    error,

    // Methods
    fetchAnalytics,
    fetchSummary,
    exportAnalytics,

    // Helpers
    formatCurrency,
    formatPercentage,
    formatNumber,
    calculateGrowth,
    getTrendDirection
  }
}