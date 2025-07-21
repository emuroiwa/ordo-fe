import { ref, type Ref } from 'vue'

// Type definitions
export interface Review {
  id: string
  user_id: string
  service_id: string
  booking_id: string
  rating: number
  title: string
  comment: string
  vendor_response?: string
  vendor_response_at?: string
  is_verified: boolean
  is_featured: boolean
  helpful_count: number
  status: string
  metadata?: any
  created_at: string
  updated_at: string
  formatted_created_at: string
  time_ago: string
  has_response: boolean
  rating_stars: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  service: {
    id: string
    title: string
    slug: string
  }
  booking?: {
    id: string
    status: string
  }
}

export interface ReviewAnalytics {
  overview: {
    total_reviews: number
    average_rating: number
    recent_reviews: number
    response_rate: number
    reviews_needing_response: number
  }
  rating_distribution: Record<string, number>
  monthly_trends: Array<{
    month: string
    label: string
    count: number
    average_rating: number
  }>
  needing_response: Review[]
  keywords: Array<{
    word: string
    count: number
  }>
  service_breakdown: Array<{
    service_title: string
    review_count: number
    average_rating: number
  }>
}

export interface ServiceOption {
  id: string
  title: string
  reviews_count: number
}

export interface ReviewFilters {
  rating?: number
  has_response?: boolean
  service_id?: string
  search?: string
  sort?: 'newest' | 'oldest' | 'rating_high' | 'rating_low' | 'helpful'
  per_page?: number
  page?: number
}

export interface ReviewResponse {
  response: string
}

export interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export const useReviews = () => {
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
  const reviews: Ref<Review[]> = ref([])
  const analytics: Ref<ReviewAnalytics | null> = ref(null)
  const services: Ref<ServiceOption[]> = ref([])
  const pagination: Ref<PaginationData | null> = ref(null)
  const loading = ref(false)
  const analyticsLoading = ref(false)
  const servicesLoading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch reviews with filters
  const fetchReviews = async (filters: ReviewFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const response = await makeApiCall(`/api/v1/reviews?${queryParams.toString()}`)
      
      if (response.success) {
        reviews.value = response.data
        pagination.value = response.pagination
      } else {
        throw new Error(response.message || 'Failed to fetch reviews')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch reviews'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch review analytics
  const fetchAnalytics = async () => {
    analyticsLoading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/reviews/analytics')
      
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
      analyticsLoading.value = false
    }
  }

  // Fetch services for filtering
  const fetchServices = async () => {
    servicesLoading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/reviews/services')
      
      if (response.success) {
        services.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch services')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch services'
      throw err
    } finally {
      servicesLoading.value = false
    }
  }

  // Respond to a review
  const respondToReview = async (reviewId: string, responseData: ReviewResponse): Promise<Review> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/reviews/${reviewId}/respond`, {
        method: 'POST',
        body: JSON.stringify(responseData)
      })
      
      if (response.success) {
        // Update the review in the local state
        const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
        if (reviewIndex !== -1) {
          reviews.value[reviewIndex] = response.data
        }
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to respond to review')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to respond to review'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update a vendor response
  const updateResponse = async (reviewId: string, responseData: ReviewResponse): Promise<Review> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/reviews/${reviewId}/response`, {
        method: 'PUT',
        body: JSON.stringify(responseData)
      })
      
      if (response.success) {
        // Update the review in the local state
        const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
        if (reviewIndex !== -1) {
          reviews.value[reviewIndex] = response.data
        }
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update response')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to update response'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete a vendor response
  const deleteResponse = async (reviewId: string): Promise<Review> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/reviews/${reviewId}/response`, {
        method: 'DELETE'
      })
      
      if (response.success) {
        // Update the review in the local state
        const reviewIndex = reviews.value.findIndex(r => r.id === reviewId)
        if (reviewIndex !== -1) {
          reviews.value[reviewIndex] = response.data
        }
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to delete response')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to delete response'
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

  // Helper function to get rating stars
  const getRatingStars = (rating: number): string => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  // Helper function to get rating color
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return 'text-green-600'
    if (rating >= 3.5) return 'text-yellow-600'
    if (rating >= 2.5) return 'text-orange-600'
    return 'text-red-600'
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Helper function to get time ago
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  return {
    // State
    reviews,
    analytics,
    services,
    pagination,
    loading,
    analyticsLoading,
    servicesLoading,
    error,

    // Methods
    fetchReviews,
    fetchAnalytics,
    fetchServices,
    respondToReview,
    updateResponse,
    deleteResponse,

    // Helpers
    formatCurrency,
    formatPercentage,
    getRatingStars,
    getRatingColor,
    formatDate,
    getTimeAgo
  }
}