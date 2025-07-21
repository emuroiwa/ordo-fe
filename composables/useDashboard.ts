import { ref, type Ref } from 'vue'

// Type definitions
export interface VendorStats {
  total_bookings: number
  revenue: number
  rating: number
  active_services: number
  growth_percentage: number
  completion_rate: number
}

export interface CustomerStats {
  total_bookings: number
  total_spent: number
  favorites: number
  reviews_given: number
  growth_percentage: number
  avg_rating_given: number
}

export interface QuickStats {
  total_services: number
  total_views: number
  pending_bookings: number
  this_month_earnings: number
}

export interface Activity {
  id: string
  type: string
  title: string
  time: string
  icon_color: string
  service_id?: string
  created_at: string
}

export interface PerformanceTrend {
  date: string
  bookings: number
  views: number
  revenue: number
  label: string
}

export interface TopService {
  id: string
  title: string
  bookings: number
  revenue: number
  rating: number
  views: number
}

export interface ServiceBreakdown {
  by_status: Record<string, number>
  by_category: Record<string, number>
}

export interface UpcomingBooking {
  id: string
  service_name: string
  provider_name: string
  date: string
  time: string
  price: number
}

export interface FavoriteService {
  id: string
  title: string
  provider: string
  rating: number
  price: number
}

export interface ServiceRecommendation {
  id: string
  title: string
  provider: string
  rating: number
  price: number
  category: string
}

export interface VendorDashboardData {
  role: 'vendor'
  stats: VendorStats
  quick_stats: QuickStats
  recent_activities: Activity[]
  performance_trends: PerformanceTrend[]
  top_services: TopService[]
  service_breakdown: ServiceBreakdown
}

export interface CustomerDashboardData {
  role: 'customer'
  stats: CustomerStats
  recent_activities: Activity[]
  upcoming_bookings: UpcomingBooking[]
  favorite_services: FavoriteService[]
  recommendations: ServiceRecommendation[]
}

export type DashboardData = VendorDashboardData | CustomerDashboardData

export const useDashboard = () => {
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
  const dashboardData: Ref<DashboardData | null> = ref(null)
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch dashboard data
  const fetchDashboard = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/dashboard')
      
      if (response.success) {
        dashboardData.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard data')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch dashboard data'
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

  // Helper function to get growth direction
  const getGrowthDirection = (percentage: number): 'up' | 'down' | 'stable' => {
    if (percentage > 2) return 'up'
    if (percentage < -2) return 'down'
    return 'stable'
  }

  // Helper function to get activity icon
  const getActivityIcon = (type: string): string => {
    switch (type) {
      case 'booking':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      case 'payment':
        return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
      case 'review':
        return 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
      case 'view':
        return 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      case 'service':
        return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      case 'favorite':
        return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      case 'search':
        return 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  }

  // Helper function to format time for charts
  const formatChartTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Helper function to calculate max value for charts
  const getMaxValue = (data: PerformanceTrend[], key: keyof PerformanceTrend): number => {
    return Math.max(...data.map(item => Number(item[key])))
  }

  // Helper function to get rating stars
  const getRatingStars = (rating: number): string => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(5 - Math.ceil(rating))
  }

  return {
    // State
    dashboardData,
    loading,
    error,

    // Methods
    fetchDashboard,

    // Helpers
    formatCurrency,
    formatPercentage,
    formatNumber,
    getGrowthDirection,
    getActivityIcon,
    formatChartTime,
    getMaxValue,
    getRatingStars
  }
}