import type { Ref } from 'vue'

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  color: string
  is_active: boolean
  services_count: number
}

export interface ServiceImage {
  id: string
  url: string
  webp_url?: string
  avif_url?: string
  alt_text?: string
  blurhash?: string
  is_primary: boolean
  processing_status: 'pending' | 'processing' | 'completed' | 'failed'
  thumbnail_urls: Record<string, string>
}

export interface Service {
  id: string
  title: string
  description: string
  short_description?: string
  category_id: string
  category?: ServiceCategory
  price_type: 'fixed' | 'hourly' | 'negotiable'
  base_price: number
  max_price?: number
  currency: string
  duration_minutes?: number
  location_type: 'client_location' | 'service_location' | 'online'
  address?: any
  latitude?: number
  longitude?: number
  tags: string[]
  requirements?: string[]
  status: 'draft' | 'active' | 'paused' | 'archived'
  is_featured: boolean
  instant_booking: boolean
  slug: string
  full_slug: string
  primary_image?: ServiceImage
  service_images?: ServiceImage[]
  user?: {
    id: string
    name: string
    business_name?: string
    slug?: string
    avatar_url?: string
  }
  average_rating: number
  review_count: number
  view_count: number
  booking_count: number
  created_at: string
  formatted_price: string
  location_display: string
}

export interface ServiceFilters {
  category?: string
  price_min?: number
  price_max?: number
  latitude?: number
  longitude?: number
  radius?: number
  min_rating?: number
  location_type?: string
  featured?: boolean
  instant_booking?: boolean
  tags?: string
  sort?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular' | 'distance'
  per_page?: number
  page?: number
}

export interface ServiceForm {
  title: string
  description: string
  short_description: string
  category_id: string
  price_type: 'fixed' | 'hourly' | 'negotiable'
  base_price: number
  max_price?: number
  currency: string
  duration_minutes?: number
  location_type: 'client_location' | 'service_location' | 'online'
  address?: any
  latitude?: number
  longitude?: number
  tags: string[]
  requirements: string[]
  instant_booking: boolean
  images?: FileList | File[]
}

export const useServices = () => {
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
      console.log('Auth token found:', tokenCookie.value.substring(0, 20) + '...')
    } else {
      console.warn('No auth token found in cookies')
    }
    
    console.log('Making API call to:', url)
    console.log('With headers:', headers)
    
    // Use global $fetch that should be available in Nuxt 3
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  // State
  const services: Ref<Service[]> = ref([])
  const service: Ref<Service | null> = ref(null)
  const categories: Ref<ServiceCategory[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  })

  // Fetch services with filters
  const fetchServices = async (filters: ServiceFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(`/api/v1/services?${queryParams.toString()}`)
      
      services.value = response.data
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch services'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch single service by full slug (userSlug/serviceSlug)
  const fetchService = async (fullSlug: string) => {
    loading.value = true
    error.value = null

    try {
      const slugParts = fullSlug.split('/')
      if (slugParts.length === 2) {
        const [userSlug, serviceSlug] = slugParts
        const response = await makeApiCall(`/api/v1/services/${userSlug}/${serviceSlug}`)
        // ServiceResource returns data wrapped in a 'data' property
        service.value = response.data || response
      } else {
        throw new Error('Invalid service slug format')
      }
      return service.value
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch service'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch single service by ID (for editing)
  const fetchServiceById = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      console.log('Fetching service for editing, ID:', id)
      const response = await makeApiCall(`/api/v1/services/${id}/edit`)
      console.log('Edit service response:', response)
      
      // ServiceResource returns data wrapped in a 'data' property
      service.value = response.data || response
      return service.value
    } catch (err: any) {
      console.error('Fetch service by ID error details:', {
        status: err.status || err.statusCode,
        statusText: err.statusText,
        message: err.message,
        data: err.data,
        response: err.response
      })
      
      // Provide more specific error messages
      if (err.status === 404) {
        error.value = 'Service not found. It may have been deleted or you may not have permission to edit it.'
      } else if (err.status === 403) {
        error.value = 'You do not have permission to edit this service.'
      } else if (err.status === 401) {
        error.value = 'You must be logged in to edit services.'
      } else {
        error.value = err.data?.message || 'Failed to fetch service for editing'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch service categories
  const fetchCategories = async () => {
    try {
      categories.value = await makeApiCall('/api/v1/service-categories')
      return categories.value
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch categories'
      throw err
    }
  }

  // Create service
  const createService = async (serviceData: ServiceForm) => {
    loading.value = true
    error.value = null

    try {
      const formData = new FormData()

      // Add text fields
      Object.entries(serviceData).forEach(([key, value]) => {
        if (key === 'images') return // Handle separately
        if (key === 'tags' || key === 'requirements' || key === 'address') {
          formData.append(key, JSON.stringify(value))
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Add images
      if (serviceData.images) {
        Array.from(serviceData.images).forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })
      }

      const newService = await makeApiCall('/api/v1/services', {
        method: 'POST',
        body: formData
      })

      // Add to services list if we have it loaded
      if (services.value.length > 0) {
        services.value.unshift(newService.service)
      }

      return newService
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to create service'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update service
  const updateService = async (id: string, serviceData: Partial<ServiceForm>) => {
    loading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('_method', 'PUT')

      // Add text fields
      Object.entries(serviceData).forEach(([key, value]) => {
        if (key === 'images') return // Handle separately
        if (key === 'tags' || key === 'requirements' || key === 'address') {
          if (value !== undefined && value !== null) {
            formData.append(key, JSON.stringify(value))
          }
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      // Add images if provided
      if (serviceData.images) {
        Array.from(serviceData.images).forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })
      }

      const updatedService = await makeApiCall(`/api/v1/services/${id}`, {
        method: 'POST', // Laravel expects POST with _method=PUT for file uploads
        body: formData
      })

      // Update in services list
      const index = services.value.findIndex(s => s.id === id)
      if (index !== -1) {
        services.value[index] = updatedService.service
      }

      // Update single service if it's the same
      if (service.value?.id === id) {
        service.value = updatedService.service
      }

      return updatedService
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update service'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete service
  const deleteService = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      console.log('Deleting service with ID:', id)
      
      const response = await makeApiCall(`/api/v1/services/${id}`, {
        method: 'DELETE'
      })
      
      console.log('Delete response:', response)

      // Remove from services list
      services.value = services.value.filter(s => s.id !== id)

      // Clear single service if it's the same
      if (service.value?.id === id) {
        service.value = null
      }

      return true
    } catch (err: any) {
      console.error('Delete service error details:', {
        id,
        status: err.status || err.statusCode,
        statusText: err.statusText,
        message: err.message,
        data: err.data,
        response: err.response
      })
      
      // Provide more specific error messages
      if (err.status === 404) {
        error.value = 'Service not found. It may have already been deleted or you may not have permission to delete it.'
      } else if (err.status === 403) {
        error.value = 'You do not have permission to delete this service.'
      } else if (err.status === 401) {
        error.value = 'You must be logged in to delete services.'
      } else {
        error.value = err.data?.message || err.message || 'Failed to delete service'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  // Search services
  const searchServices = async (query: string, filters: ServiceFilters = {}) => {
    return await fetchServices({ ...filters, q: query })
  }

  // Get my services (vendor view)
  const fetchMyServices = async (filters: Partial<ServiceFilters> = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(`/api/v1/services/my-services?${queryParams.toString()}`)
      
      services.value = response.data
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch my services'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get service analytics
  const fetchServiceAnalytics = async (serviceId: string) => {
    try {
      return await makeApiCall(`/api/v1/services/${serviceId}/analytics`)
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch analytics'
      throw err
    }
  }

  // Helper function to format price
  const formatPrice = (price: number, currency = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price)
  }

  // Helper function to get optimized image URL
  const getOptimizedImageUrl = (image: ServiceImage, size = 'medium') => {
    if (image.thumbnail_urls?.[size]) {
      return image.thumbnail_urls[size]
    }
    return image.url
  }

  return {
    // State
    services,
    service,
    categories,
    loading,
    error,
    pagination,

    // Methods
    fetchServices,
    fetchService,
    fetchServiceById,
    fetchCategories,
    createService,
    updateService,
    deleteService,
    searchServices,
    fetchMyServices,
    fetchServiceAnalytics,

    // Helpers
    formatPrice,
    getOptimizedImageUrl
  }
}