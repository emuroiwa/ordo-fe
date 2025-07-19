import { ref, computed } from 'vue'
import { useCookie } from '#app'

const user = ref(null)
const token = ref(null)
const isLoading = ref(false)
const lastActivity = ref(Date.now())

export const useAuth = () => {
  const tokenCookie = useCookie('auth-token', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: false // Must be false for client-side access
  })

  const userCookie = useCookie('auth-user', {
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

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (credentials) => {
    try {
      const config = useRuntimeConfig()
      const response = await $fetch('/api/v1/login', {
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
        
        return { success: true, user: response.user }
      }
      
      return { success: false, error: 'Invalid response format' }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Login failed. Please check your credentials.' 
      }
    }
  }

  const register = async (userData) => {
    try {
      const config = useRuntimeConfig()
      const response = await $fetch('/api/v1/register', {
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
        
        return { success: true, user: response.user }
      }
      
      return { success: false, error: 'Invalid response format' }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Registration failed. Please try again.' 
      }
    }
  }

  const logout = async () => {
    try {
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
    }
  }

  const fetchUser = async () => {
    try {
      const config = useRuntimeConfig()
      
      if (!token.value) {
        return null
      }

      const response = await $fetch('/api/v1/user', {
        baseURL: config.public.apiBase,
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Accept': 'application/json'
        }
      })

      user.value = response
      userCookie.value = response
      return response
    } catch (error) {
      console.error('Fetch user error:', error)
      // If token is invalid, clear auth state
      await logout()
      return null
    }
  }

  return {
    user: user,
    token: token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser
  }
}