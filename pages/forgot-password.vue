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
          <!-- Back Button -->
          <Transition name="slide-right" appear>
            <div class="flex items-center mb-4">
              <NuxtLink to="/login" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </NuxtLink>
            </div>
          </Transition>

          <Transition name="scale-up" appear>
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Forgot Password?
              </h2>
              <p class="mt-2 text-sm text-gray-600">
                <span v-if="!emailSent">No worries! Enter your email and we'll send you a reset link</span>
                <span v-else>Check your email for password reset instructions</span>
              </p>
            </div>
          </Transition>

          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
              <!-- Email Form -->
              <form v-if="!emailSent" class="space-y-6" @submit.prevent="handleForgotPassword">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    required
                    class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email address"
                  />
                  <p v-if="emailError" class="mt-2 text-sm text-red-600">{{ emailError }}</p>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="isLoading || !form.email"
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
                    {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
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
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Email Sent!</h3>
                  <p class="text-gray-600 mb-4">
                    We've sent a password reset link to <strong>{{ form.email }}</strong>
                  </p>
                  <p class="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="resendEmail"
                    :disabled="resendCooldown > 0"
                    class="flex-1 backdrop-blur-sm bg-white/50 border border-white/30 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-white/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email' }}
                  </button>
                  <NuxtLink
                    to="/login"
                    class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Back to Login
                  </NuxtLink>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Help Section -->
          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Password reset not working?</p>
                    <p class="text-sm text-gray-600">Make sure to check your spam folder and try again.</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-gray-900">Still having trouble?</p>
                    <p class="text-sm text-gray-600">Contact our support team at <a href="mailto:support@ordo.com" class="text-blue-600 hover:text-blue-800">support@ordo.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// Form state
const form = ref({
  email: ''
})

const isLoading = ref(false)
const emailSent = ref(false)
const emailError = ref('')
const resendCooldown = ref(0)

let cooldownTimer = null

// Handle forgot password
const handleForgotPassword = async () => {
  if (!form.value.email) return
  
  isLoading.value = true
  emailError.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.value.email)) {
      emailError.value = 'Please enter a valid email address'
      return
    }
    
    // Success - show confirmation
    emailSent.value = true
    startResendCooldown()
    
    console.log('Password reset email sent to:', form.value.email)
  } catch (error) {
    console.error('Forgot password failed', error)
    emailError.value = 'Failed to send reset email. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Handle resend email
const resendEmail = async () => {
  if (resendCooldown.value > 0) return
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    startResendCooldown()
    console.log('Password reset email resent to:', form.value.email)
  } catch (error) {
    console.error('Resend failed', error)
  } finally {
    isLoading.value = false
  }
}

// Start resend cooldown timer
const startResendCooldown = () => {
  resendCooldown.value = 60 // 60 seconds
  
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

// Cleanup timer on unmount
onUnmounted(() => {
  if (cooldownTimer) {
    clearInterval(cooldownTimer)
  }
})

// Set page title
useHead({
  title: 'Forgot Password - ORDO'
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