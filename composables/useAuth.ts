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
      const fetchResponse = await fetch(`${config.public.apiBase}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as LoginResponse

      if (response.token && response.user) {
        // Ensure roles is always an array
        response.user.roles = Array.isArray(response.user.roles) ? response.user.roles : []
        
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
      
      const url = `${config.public.apiBase}/api/v1/register`
      const fetchResponse = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as RegisterResponse

      if (response.token && response.user) {
        // Ensure roles is always an array
        response.user.roles = Array.isArray(response.user.roles) ? response.user.roles : []
        
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
        const url = `${config.public.apiBase}/api/v1/logout`
        await fetch(url, {
          method: 'POST',
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

      const url = `${config.public.apiBase}/api/v1/user`
      const fetchResponse = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as {user: User}

      user.value = response.user
      userCookie.value = response.user
      lastActivity.value = Date.now()
      return response.user
    } catch (error: any) {
      console.error('Fetch user error:', error)
      
      // Extract error details for better handling
      const statusCode = error?.status || error?.statusCode || error?.response?.status
      const statusMessage = error?.statusMessage || error?.message
      
      console.log(`API Error - Status: ${statusCode}, Message: ${statusMessage}`)
      
      // Only logout on authentication errors (401/403), not on network/server errors
      if (statusCode === 401 || statusCode === 403) {
        console.log('Authentication error detected, logging out user')
        await logout()
      } else if (statusCode >= 500) {
        console.log('Server error detected, keeping user logged in and will retry later')
      } else if (!statusCode) {
        console.log('Network error detected (no status code), keeping user logged in')
      } else {
        console.log(`Other error (${statusCode}), keeping user logged in`)
      }
      
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
      const url = `${config.public.apiBase}/api/v1/refresh`
      const fetchResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })
      
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }
      
      const response = await fetchResponse.json() as { token: string }

      if (response.token) {
        token.value = response.token
        tokenCookie.value = response.token
        lastActivity.value = Date.now()
        return true
      }
      
      return false
    } catch (error: any) {
      console.error('Token refresh error:', error)
      
      // Extract error details for better handling
      const statusCode = error?.status || error?.statusCode || error?.response?.status
      const statusMessage = error?.statusMessage || error?.message
      
      console.log(`Token Refresh Error - Status: ${statusCode}, Message: ${statusMessage}`)
      
      // Only logout on authentication errors (401/403), not on network/server errors
      if (statusCode === 401 || statusCode === 403) {
        console.log('Token refresh authentication error, logging out user')
        await logout()
      } else if (statusCode >= 500) {
        console.log('Server error during token refresh, keeping user logged in')
      } else if (!statusCode) {
        console.log('Network error during token refresh, will retry later')
      } else {
        console.log(`Other token refresh error (${statusCode}), keeping user logged in`)
      }
      
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