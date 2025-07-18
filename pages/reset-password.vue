<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Gradient -->
    <div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80')] bg-cover bg-center opacity-10"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5"></div>
    </div>

    <!-- Glassmorphism Header -->
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <Transition name="slide-right" appear>
            <div class="flex items-center space-x-8">
              <NuxtLink to="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ORDO
              </NuxtLink>
              <nav class="hidden md:flex space-x-8">
                <NuxtLink to="/search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Search</NuxtLink>
                <NuxtLink to="/map-search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Map Search</NuxtLink>
                <NuxtLink to="/how-it-works" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">How it Works</NuxtLink>
                <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">About us</NuxtLink>
              </nav>
            </div>
          </Transition>
          
          <Transition name="slide-left" appear>
            <div class="flex items-center space-x-4">
              <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">Login</NuxtLink>
              <NuxtLink to="/register" class="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300">Register</NuxtLink>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative z-10 pt-16">
      <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <Transition name="scale-up" appear>
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Reset Your Password
              </h2>
              <p class="mt-2 text-sm text-gray-600">
                <span v-if="!passwordReset">Enter your new password below</span>
                <span v-else>Your password has been successfully reset!</span>
              </p>
            </div>
          </Transition>

          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
              <!-- Invalid/Expired Token -->
              <div v-if="tokenError" class="text-center space-y-6">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Invalid or Expired Link</h3>
                  <p class="text-gray-600 mb-4">
                    This password reset link is invalid or has expired. Please request a new one.
                  </p>
                </div>

                <NuxtLink
                  to="/forgot-password"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center block"
                >
                  Request New Reset Link
                </NuxtLink>
              </div>

              <!-- Reset Password Form -->
              <form v-else-if="!passwordReset" class="space-y-6" @submit.prevent="handleResetPassword">
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div class="relative">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      required
                      class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        v-if="showPassword"
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  <div class="mt-2 text-sm text-gray-500">
                    Password must be at least 8 characters long
                  </div>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div class="relative">
                    <input
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      required
                      class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        v-if="showConfirmPassword"
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div v-if="formError" class="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {{ formError }}
                </div>

                <!-- Password Strength Indicator -->
                <div v-if="form.password" class="space-y-2">
                  <div class="text-sm text-gray-600">Password strength:</div>
                  <div class="flex space-x-1">
                    <div class="h-2 flex-1 rounded-full" :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"></div>
                    <div class="h-2 flex-1 rounded-full" :class="passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'"></div>
                    <div class="h-2 flex-1 rounded-full" :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'"></div>
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ passwordStrengthText }}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="isLoading || !isFormValid"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg
                      v-if="isLoading"
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ isLoading ? 'Updating Password...' : 'Update Password' }}
                  </button>
                </div>
              </form>

              <!-- Success Message -->
              <div v-else class="text-center space-y-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Password Updated!</h3>
                  <p class="text-gray-600 mb-4">
                    Your password has been successfully updated. You can now login with your new password.
                  </p>
                </div>

                <NuxtLink
                  to="/login"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center block"
                >
                  Go to Login
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Form state
const form = ref({
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const passwordReset = ref(false)
const tokenError = ref(false)
const formError = ref('')

// Get reset token from URL query
const route = useRoute()
const resetToken = route.query.token

// Form validation
const isFormValid = computed(() => {
  return form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.password.length >= 8
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.value.password
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++
  if (/\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
  
  return strength
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return 'Too weak'
  if (strength === 1) return 'Weak'
  if (strength === 2) return 'Good'
  return 'Strong'
})

// Handle password reset
const handleResetPassword = async () => {
  if (!isFormValid.value) return
  
  formError.value = ''
  
  if (form.value.password !== form.value.confirmPassword) {
    formError.value = 'Passwords do not match'
    return
  }
  
  if (form.value.password.length < 8) {
    formError.value = 'Password must be at least 8 characters long'
    return
  }
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate password reset
    console.log('Password reset successful with token:', resetToken)
    
    passwordReset.value = true
  } catch (error) {
    console.error('Password reset failed', error)
    formError.value = 'Failed to reset password. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Check token validity on mount
onMounted(() => {
  if (!resetToken) {
    tokenError.value = true
    return
  }
  
  // Simulate token validation
  // In a real app, you'd validate the token with your backend
  console.log('Validating reset token:', resetToken)
})

// Set page title
useHead({
  title: 'Reset Password - ORDO'
})
</script>

<style scoped>
/* Transition Animations */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.scale-up-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-up-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.slide-right-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>