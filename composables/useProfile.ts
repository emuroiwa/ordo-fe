import type { Ref } from 'vue'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  business_name?: string
  slug?: string
  service_category?: string
  roles: string[]
  is_vendor: boolean
  is_customer: boolean
  is_active: boolean
  avatar?: string
  avatar_url: string
  email_verified_at?: string
  phone_verified_at?: string
  last_login_at?: string
  created_at: string
  updated_at: string
  unread_notifications_count?: number
  stats?: {
    services_count: number
    active_services_count: number
  }
}

export interface ProfileForm {
  name: string
  email: string
  phone?: string
  business_name?: string
  service_category?: string
  roles: string[]
}

export interface PasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

export interface ProfileStats {
  services_count: number
  active_services_count: number
  total_bookings: number
  total_reviews: number
  average_rating: number
  member_since: string
  profile_completion: number
}

export const useProfile = () => {
  // State
  const { $fetch } = useNuxtApp()
  const user: Ref<User | null> = ref(null)
  const stats: Ref<ProfileStats | null> = ref(null)
  const loading = ref(false)
  const uploading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch user profile
  const fetchProfile = async () => {
    // Don't attempt to fetch if we're already loading or in SSR
    if (loading.value || process.server) {
      return user.value
    }

    loading.value = true
    error.value = null

    try {
      
      user.value = await $fetch('/api/v1/profile', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      return user.value
    } catch (err: any) {
      console.error('Profile fetch error:', err)
      error.value = err.data?.message || err.message || 'Failed to fetch profile'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update profile
  const updateProfile = async (profileData: Partial<ProfileForm>) => {
    loading.value = true
    error.value = null

    try {
      const formData = new FormData()

      // Add profile fields
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item)
            })
          } else {
            formData.append(key, String(value))
          }
        }
      })

      const { $fetch } = useNuxtApp()
      const response = await $fetch('/api/v1/profile', {
        method: 'PUT',
        body: formData
      })

      user.value = response.user
      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update profile'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update password
  const updatePassword = async (passwordData: PasswordForm) => {
    loading.value = true
    error.value = null

    try {
      const { $fetch } = useNuxtApp()
      const response = await $fetch('/api/v1/profile/password', {
        method: 'PUT',
        body: passwordData
      })

      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to update password'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Upload avatar
  const uploadAvatar = async (file: File) => {
    uploading.value = true
    error.value = null

    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const { $fetch } = useNuxtApp()
      const response = await $fetch('/api/v1/profile/avatar', {
        method: 'POST',
        body: formData
      })

      // Update user avatar URL
      if (user.value) {
        user.value.avatar_url = response.avatar_url
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to upload avatar'
      throw err
    } finally {
      uploading.value = false
    }
  }

  // Delete avatar
  const deleteAvatar = async () => {
    loading.value = true
    error.value = null

    try {
      const { $fetch } = useNuxtApp()
      const response = await $fetch('/api/v1/profile/avatar', {
        method: 'DELETE'
      })

      // Update user avatar URL
      if (user.value) {
        user.value.avatar_url = response.avatar_url
        user.value.avatar = undefined
      }

      return response
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to delete avatar'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch profile statistics
  const fetchStats = async () => {
    try {
      // const { $fetch } = useNuxtApp()
      // stats.value = await $fetch('/api/v1/profile/stats')
      // return stats.value
      return [];
    } catch (err: any) {
      error.value = err.data?.message || 'Failed to fetch profile stats'
      throw err
    }
  }

  // Toggle role between customer and vendor
  const toggleRole = async (role: 'customer' | 'vendor') => {
    if (!user.value) return

    const currentRoles = user.value.roles || ['customer']
    let newRoles: string[]

    if (role === 'vendor') {
      // Add vendor role if not present
      newRoles = currentRoles.includes('vendor') 
        ? currentRoles 
        : [...currentRoles, 'vendor']
    } else {
      // Remove vendor role, keep customer
      newRoles = currentRoles.filter(r => r !== 'vendor')
      if (!newRoles.includes('customer')) {
        newRoles.push('customer')
      }
    }

    return await updateProfile({ roles: newRoles })
  }

  // Check if profile is complete
  const isProfileComplete = computed(() => {
    if (!user.value) return false

    const requiredFields = ['name', 'email']
    const vendorFields = user.value.is_vendor ? ['business_name', 'service_category'] : []
    const allRequiredFields = [...requiredFields, ...vendorFields]

    return allRequiredFields.every(field => {
      const value = user.value![field as keyof User]
      return value !== null && value !== undefined && value !== ''
    })
  })

  // Calculate profile completion percentage
  const profileCompletion = computed(() => {
    if (!user.value) return 0

    const fields = {
      name: !!user.value.name,
      email: !!user.value.email,
      phone: !!user.value.phone,
      business_name: !!user.value.business_name,
      service_category: !!user.value.service_category,
      avatar: !!user.value.avatar,
    }

    const completed = Object.values(fields).filter(Boolean).length
    const total = Object.keys(fields).length

    return Math.round((completed / total) * 100)
  })

  // Get display name (business name or regular name)
  const displayName = computed(() => {
    if (!user.value) return ''
    return user.value.business_name || user.value.name
  })

  // Get user initials for avatar fallback
  const userInitials = computed(() => {
    if (!user.value?.name) return 'U'
    return user.value.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  return {
    // State
    user,
    stats,
    loading,
    uploading,
    error,

    // Computed
    isProfileComplete,
    profileCompletion,
    displayName,
    userInitials,

    // Methods
    fetchProfile,
    updateProfile,
    updatePassword,
    uploadAvatar,
    deleteAvatar,
    fetchStats,
    toggleRole
  }
}