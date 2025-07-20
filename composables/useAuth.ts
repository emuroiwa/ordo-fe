import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { useCookie } from '#app'

// Type definitions
export interface User {
  id: string
  name: string
  email: string
  email_verified_at?: string | null
  avatar?: string | null
  avatar_url?: string | null
  phone?: string | null
  roles?: string[]
  business_name?: string | null
  slug?: string | null
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  token: string
  user: User
}

// Global state
const user: Ref<User | null> = ref(null)
const token: Ref<string | null> = ref(null)
const isLoading: Ref<boolean> = ref(false)
const lastActivity: Ref<number> = ref(Date.now())

export const useAuth = () => {
  const tokenCookie = useCookie<string | null>('auth-token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: false // Must be false for client-side access
  })

  const userCookie = useCookie<User | null>('auth-user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: false // Must be false for client-side access
  })

  // Initialize from cookies
  if (tokenCookie.value) {
    token.value = tokenCookie.value
  }
  if (userCookie.value) {
    user.value = userCookie.value
  }

  const isAuthenticated: ComputedRef<boolean> = computed(() => !!token.value && !!user.value)

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      
      const response = await $fetch<LoginResponse>('/api/v1/login', {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: credentials,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.token && response.user) {
        token.value = response.token
        user.value = response.user
        tokenCookie.value = response.token
        userCookie.value = response.user
        lastActivity.value = Date.now()
        
        return { success: true, user: response.user, token: response.token }
      }
      
      return { success: false, error: 'Invalid response format' }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Login failed. Please check your credentials.' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      
      const response = await $fetch<RegisterResponse>('/api/v1/register', {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: userData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      if (response.token && response.user) {
        token.value = response.token
        user.value = response.user
        tokenCookie.value = response.token
        userCookie.value = response.user
        lastActivity.value = Date.now()
        
        return { success: true, user: response.user, token: response.token }
      }
      
      return { success: false, error: 'Invalid response format' }
    } catch (error: any) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Registration failed. Please try again.' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      
      if (token.value) {
        await $fetch('/api/v1/logout', {
          method: 'POST',
          baseURL: config.public.apiBase,
          headers: {
            'Authorization': `Bearer ${token.value}`,
            'Accept': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear state regardless of API call success
      token.value = null
      user.value = null
      tokenCookie.value = null
      userCookie.value = null
      isLoading.value = false
    }
  }

  const fetchUser = async (): Promise<User | null> => {
    try {
      isLoading.value = true
      const config = useRuntimeConfig()
      
      if (!token.value) {
        return null
      }

      const response = await $fetch<{user: User}>('/api/v1/user', {
        baseURL: config.public.apiBase,
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })

      user.value = response.user
      userCookie.value = response.user
      lastActivity.value = Date.now()
      return response.user
    } catch (error) {
      console.error('Fetch user error:', error)
      // If token is invalid, clear auth state
      await logout()
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateLastActivity = (): void => {
    lastActivity.value = Date.now()
  }

  const isTokenExpired = (): boolean => {
    if (!token.value) return true
    
    // Check if last activity was more than 24 hours ago
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    return Date.now() - lastActivity.value > maxAge
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!token.value) return false
      
      const config = useRuntimeConfig()
      const response = await $fetch<{ token: string }>('/api/v1/refresh', {
        method: 'POST',
        baseURL: config.public.apiBase,
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })

      if (response.token) {
        token.value = response.token
        tokenCookie.value = response.token
        lastActivity.value = Date.now()
        return true
      }
      
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      await logout()
      return false
    }
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    lastActivity: readonly(lastActivity),
    
    // Computed
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateLastActivity,
    isTokenExpired,
    refreshToken
  }
}