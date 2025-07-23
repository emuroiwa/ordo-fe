import type { Ref } from 'vue'

export interface Favorite {
  id: string
  user_id: string
  service_id: string
  service: {
    id: string
    title: string
    description: string
    category_id: string
    category?: {
      id: string
      name: string
      slug: string
    }
    base_price: number
    currency: string
    location_type: string
    address?: any
    latitude?: number
    longitude?: number
    status: string
    is_featured: boolean
    instant_booking: boolean
    slug: string
    full_slug: string
    primary_image?: {
      id: string
      url: string
      alt_text?: string
    }
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
    location_display: string
  }
  created_at: string
  updated_at: string
}

export interface FavoriteCreateData {
  service_id: string
}

export const useFavorites = () => {
  const config = useRuntimeConfig()
  
  // Helper function to make API calls with proper error handling
  const makeApiCall = async (url: string, options: any = {}) => {
    // Get auth token from cookie
    const tokenCookie = useCookie('auth-token')
    
    // Prepare headers with authentication
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
    
    // Add authorization header if token exists
    if (tokenCookie.value) {
      headers['Authorization'] = `Bearer ${tokenCookie.value}`
    }
    
    // Use global $fetch that should be available in Nuxt 3
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  // State
  const favorites: Ref<Favorite[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch user's favorites
  const fetchFavorites = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/favorites')
      favorites.value = response.data || response
      return favorites.value
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch favorites'
      console.error('Failed to fetch favorites:', err)
      // Return mock data for development - comment out for production
      favorites.value = generateMockFavorites()
      return favorites.value
    } finally {
      loading.value = false
    }
  }

  // Add service to favorites
  const addFavorite = async (serviceId: string) => {
    try {
      const response = await makeApiCall('/api/v1/favorites', {
        method: 'POST',
        body: JSON.stringify({ service_id: serviceId })
      })

      // Add to local state
      if (response.favorite) {
        favorites.value.unshift(response.favorite)
      }
      
      return response
    } catch (err: any) {
      console.error('Failed to add favorite:', err)
      throw new Error(err.data?.message || 'Failed to add to favorites')
    }
  }

  // Remove service from favorites
  const removeFavorite = async (favoriteId: string) => {
    try {
      await makeApiCall(`/api/v1/favorites/${favoriteId}`, {
        method: 'DELETE'
      })

      // Remove from local state
      favorites.value = favorites.value.filter(f => f.id !== favoriteId)
      
      return true
    } catch (err: any) {
      console.error('Failed to remove favorite:', err)
      throw new Error(err.data?.message || 'Failed to remove from favorites')
    }
  }

  // Toggle favorite status
  const toggleFavorite = async (serviceId: string) => {
    const existingFavorite = favorites.value.find(f => f.service_id === serviceId)
    
    if (existingFavorite) {
      await removeFavorite(existingFavorite.id)
      return false // Removed
    } else {
      await addFavorite(serviceId)
      return true // Added
    }
  }

  // Check if service is favorited
  const isFavorited = (serviceId: string): boolean => {
    return favorites.value.some(f => f.service_id === serviceId)
  }

  // Get favorite by service ID
  const getFavoriteByServiceId = (serviceId: string): Favorite | undefined => {
    return favorites.value.find(f => f.service_id === serviceId)
  }

  // Bulk remove favorites
  const bulkRemoveFavorites = async (favoriteIds: string[]) => {
    try {
      await makeApiCall('/api/v1/favorites/bulk-delete', {
        method: 'POST',
        body: JSON.stringify({ favorite_ids: favoriteIds })
      })

      // Remove from local state
      favorites.value = favorites.value.filter(f => !favoriteIds.includes(f.id))
      
      return true
    } catch (err: any) {
      console.error('Failed to bulk remove favorites:', err)
      throw new Error(err.data?.message || 'Failed to remove favorites')
    }
  }

  // Clear all favorites
  const clearAllFavorites = async () => {
    try {
      await makeApiCall('/api/v1/favorites/clear', {
        method: 'POST'
      })

      // Clear local state
      favorites.value = []
      
      return true
    } catch (err: any) {
      console.error('Failed to clear all favorites:', err)
      throw new Error(err.data?.message || 'Failed to clear favorites')
    }
  }

  // Get favorites count
  const getFavoritesCount = (): number => {
    return favorites.value.length
  }

  // Generate mock data for development
  const generateMockFavorites = (): Favorite[] => {
    return [
      {
        id: 'fav_1',
        user_id: 'user_1',
        service_id: 'service_1',
        service: {
          id: 'service_1',
          title: 'Premium Hair Styling & Cut',
          description: 'Professional hair styling and cutting services with the latest trends and techniques.',
          category_id: 'cat_1',
          category: {
            id: 'cat_1',
            name: 'Beauty & Hair',
            slug: 'beauty-hair'
          },
          base_price: 350,
          currency: 'ZAR',
          location_type: 'service_location',
          address: { city: 'Johannesburg', area: 'Sandton' },
          status: 'active',
          is_featured: true,
          instant_booking: false,
          slug: 'premium-hair-styling-cut',
          full_slug: 'beauty-studio/premium-hair-styling-cut',
          primary_image: {
            id: 'img_1',
            url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
            alt_text: 'Hair styling service'
          },
          user: {
            id: 'user_vendor_1',
            name: 'Sarah Johnson',
            business_name: 'Elegance Hair Studio',
            slug: 'beauty-studio'
          },
          average_rating: 4.8,
          review_count: 127,
          view_count: 2341,
          booking_count: 89,
          created_at: '2024-01-15T10:00:00Z',
          location_display: 'Sandton, Johannesburg'
        },
        created_at: '2024-07-15T14:30:00Z',
        updated_at: '2024-07-15T14:30:00Z'
      },
      {
        id: 'fav_2',
        user_id: 'user_1',
        service_id: 'service_2',
        service: {
          id: 'service_2',
          title: 'Deep Tissue Massage Therapy',
          description: 'Therapeutic deep tissue massage to relieve muscle tension and stress.',
          category_id: 'cat_2',
          category: {
            id: 'cat_2',
            name: 'Health & Wellness',
            slug: 'health-wellness'
          },
          base_price: 450,
          currency: 'ZAR',
          location_type: 'client_location',
          status: 'active',
          is_featured: false,
          instant_booking: true,
          slug: 'deep-tissue-massage-therapy',
          full_slug: 'wellness-center/deep-tissue-massage-therapy',
          primary_image: {
            id: 'img_2',
            url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
            alt_text: 'Massage therapy service'
          },
          user: {
            id: 'user_vendor_2',
            name: 'Mike Wilson',
            business_name: 'Zen Wellness Center',
            slug: 'wellness-center'
          },
          average_rating: 4.9,
          review_count: 203,
          view_count: 1876,
          booking_count: 156,
          created_at: '2024-02-10T15:30:00Z',
          location_display: 'Mobile Service, Cape Town'
        },
        created_at: '2024-07-18T09:15:00Z',
        updated_at: '2024-07-18T09:15:00Z'
      },
      {
        id: 'fav_3',
        user_id: 'user_1',
        service_id: 'service_3',
        service: {
          id: 'service_3',
          title: 'Personal Training Session',
          description: 'One-on-one personal training sessions tailored to your fitness goals.',
          category_id: 'cat_3',
          category: {
            id: 'cat_3',
            name: 'Fitness & Training',
            slug: 'fitness-training'
          },
          base_price: 280,
          currency: 'ZAR',
          location_type: 'service_location',
          address: { city: 'Durban', area: 'Umhlanga' },
          status: 'active',
          is_featured: true,
          instant_booking: true,
          slug: 'personal-training-session',
          full_slug: 'fitness-pro/personal-training-session',
          primary_image: {
            id: 'img_3',
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
            alt_text: 'Personal training service'
          },
          user: {
            id: 'user_vendor_3',
            name: 'Emma Davis',
            business_name: 'FitLife Personal Training',
            slug: 'fitness-pro'
          },
          average_rating: 4.7,
          review_count: 89,
          view_count: 1234,
          booking_count: 67,
          created_at: '2024-03-05T11:00:00Z',
          location_display: 'Umhlanga, Durban'
        },
        created_at: '2024-07-20T16:45:00Z',
        updated_at: '2024-07-20T16:45:00Z'
      },
      {
        id: 'fav_4',
        user_id: 'user_1',
        service_id: 'service_4',
        service: {
          id: 'service_4',
          title: 'Professional Photography Session',
          description: 'Portrait and event photography with professional editing included.',
          category_id: 'cat_4',
          category: {
            id: 'cat_4',
            name: 'Photography & Media',
            slug: 'photography-media'
          },
          base_price: 1200,
          currency: 'ZAR',
          location_type: 'client_location',
          status: 'active',
          is_featured: false,
          instant_booking: false,
          slug: 'professional-photography-session',
          full_slug: 'photo-studio/professional-photography-session',
          primary_image: {
            id: 'img_4',
            url: 'https://images.unsplash.com/photo-1606721977440-f0a5ab68260b?w=400&h=300&fit=crop',
            alt_text: 'Photography service'
          },
          user: {
            id: 'user_vendor_4',
            name: 'James Thompson',
            business_name: 'Capture Moments Photography',
            slug: 'photo-studio'
          },
          average_rating: 4.6,
          review_count: 45,
          view_count: 987,
          booking_count: 34,
          created_at: '2024-04-12T08:30:00Z',
          location_display: 'On Location, Pretoria'
        },
        created_at: '2024-07-19T13:20:00Z',
        updated_at: '2024-07-19T13:20:00Z'
      }
    ]
  }

  return {
    // State
    favorites,
    loading,
    error,

    // Methods
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorited,
    getFavoriteByServiceId,
    bulkRemoveFavorites,
    clearAllFavorites,
    getFavoritesCount
  }
}