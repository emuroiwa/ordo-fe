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
              <NuxtLink to="/register" class="backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-blue-600 bg-white/50 relative">
                Register
                <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </NuxtLink>
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
              <h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p class="mt-2 text-sm text-gray-600">
                Join ORDO to book amazing services
              </p>
            </div>
          </Transition>

          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
              <!-- Error Message -->
              <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex">
                  <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-3">
                    <p class="text-sm text-red-800">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>

              <form class="space-y-6" @submit.prevent="handleRegister">
                <!-- Account Type Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-4">
                    How do you want to use ORDO? (You can do both!)
                  </label>
                  <div class="space-y-3">
                    <button
                      type="button"
                      @click="toggleRole('customer')"
                      class="backdrop-blur-sm border border-white/30 p-4 rounded-xl transition-all duration-300 text-left w-full"
                      :class="form.roles.includes('customer') ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500' : 'bg-white/50 hover:bg-white/70'"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <span class="font-medium text-gray-900">Book Services</span>
                            <p class="text-sm text-gray-600">Find and book services from providers</p>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <svg v-if="form.roles.includes('customer')" class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      @click="toggleRole('vendor')"
                      class="backdrop-blur-sm border border-white/30 p-4 rounded-xl transition-all duration-300 text-left w-full"
                      :class="form.roles.includes('vendor') ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500' : 'bg-white/50 hover:bg-white/70'"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <div>
                            <span class="font-medium text-gray-900">Offer Services</span>
                            <p class="text-sm text-gray-600">Provide services and manage bookings</p>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <svg v-if="form.roles.includes('vendor')" class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                          <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    <div v-if="form.roles.length === 0" class="text-center py-2">
                      <p class="text-sm text-gray-500">Please select at least one option to continue</p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      required
                      :class="[
                        'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                        validationErrors.firstName ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                      ]"
                      placeholder="First name"
                    />
                    <p v-if="validationErrors.firstName" class="mt-1 text-sm text-red-600">{{ validationErrors.firstName }}</p>
                  </div>

                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      required
                      :class="[
                        'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                        validationErrors.lastName ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                      ]"
                      placeholder="Last name"
                    />
                    <p v-if="validationErrors.lastName" class="mt-1 text-sm text-red-600">{{ validationErrors.lastName }}</p>
                  </div>
                </div>

                <!-- Vendor-specific fields -->
                <div v-if="form.roles.includes('vendor')" class="space-y-4">
                  <div>
                    <label for="businessName" class="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      v-model="form.businessName"
                      type="text"
                      required
                      class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div>
                    <label for="serviceCategory" class="block text-sm font-medium text-gray-700 mb-2">
                      Service Category
                    </label>
                    <select
                      id="serviceCategory"
                      v-model="form.serviceCategory"
                      required
                      :disabled="categoriesLoading"
                      class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900"
                    >
                      <option value="">{{ categoriesLoading ? 'Loading categories...' : 'Select category' }}</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>

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
                    :class="[
                      'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                      validationErrors.email ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                    ]"
                    placeholder="Enter your email"
                  />
                  <p v-if="validationErrors.email" class="mt-1 text-sm text-red-600">{{ validationErrors.email }}</p>
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    required
                    :class="[
                      'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                      validationErrors.phone ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                    ]"
                    placeholder="Enter your phone number"
                  />
                  <p v-if="validationErrors.phone" class="mt-1 text-sm text-red-600">{{ validationErrors.phone }}</p>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div class="relative">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      :class="[
                        'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                        validationErrors.password ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                      ]"
                      placeholder="Create a password"
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
                  <p v-if="validationErrors.password" class="mt-1 text-sm text-red-600">{{ validationErrors.password }}</p>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div class="relative">
                    <input
                      id="confirmPassword"
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      required
                      :class="[
                        'backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500',
                        validationErrors.confirmPassword ? 'border-red-300 focus:ring-red-500/50' : 'border-white/30 focus:ring-blue-500/50'
                      ]"
                      placeholder="Confirm your password"
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
                  <p v-if="validationErrors.confirmPassword" class="mt-1 text-sm text-red-600">{{ validationErrors.confirmPassword }}</p>
                </div>

                <div class="flex items-center">
                  <input
                    id="terms"
                    v-model="form.acceptTerms"
                    type="checkbox"
                    required
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="terms" class="ml-2 block text-sm text-gray-700">
                    I agree to the
                    <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a>
                    and
                    <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                  </label>
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
                    {{ isLoading ? 'Creating account...' : 'Create account' }}
                  </button>
                </div>
              </form>

              <div class="mt-6">
                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                    <span class="px-2 bg-white text-gray-500">Or sign up with</span>
                  </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white/70 transition-all duration-300"
                  >
                    <svg class="w-5 h-5 mx-auto" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white/70 transition-all duration-300"
                  >
                    <svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="text-center mt-6">
                <span class="text-sm text-gray-600">
                  Already have an account?
                  <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </NuxtLink>
                </span>
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

// Add guest middleware
definePageMeta({
  middleware: 'guest'
})

// Use services composable for categories
const { fetchCategories, categories, loading: categoriesLoading } = useServices()

// Load categories on mount
onMounted(async () => {
  try {
    await fetchCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  }
})

// Form state
const form = ref({
  roles: [], // Array of roles: ['customer', 'vendor']
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  // Vendor-specific fields
  businessName: '',
  serviceCategory: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Use auth composable
const { register } = useAuth()

// Toggle role function
const toggleRole = (role) => {
  const index = form.value.roles.indexOf(role)
  if (index > -1) {
    // Remove role
    form.value.roles.splice(index, 1)
    
    // Clear vendor-specific fields if vendor role is removed
    if (role === 'vendor') {
      form.value.businessName = ''
      form.value.serviceCategory = ''
    }
  } else {
    // Add role
    form.value.roles.push(role)
  }
}

// Enhanced form validation
const isFormValid = computed(() => {
  // Basic field validation
  const baseValidation = form.value.roles.length > 0 &&
                        form.value.firstName.trim().length >= 2 &&
                        form.value.lastName.trim().length >= 2 &&
                        isValidEmail(form.value.email) &&
                        isValidPhone(form.value.phone) &&
                        isValidPassword(form.value.password) &&
                        form.value.password === form.value.confirmPassword &&
                        form.value.acceptTerms

  // Additional validation for vendors
  if (form.value.roles.includes('vendor')) {
    return baseValidation &&
           form.value.businessName.trim().length >= 2 &&
           form.value.serviceCategory
  }

  return baseValidation
})

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation
const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Password validation
const isValidPassword = (password) => {
  return password.length >= 8 &&
         /[a-z]/.test(password) &&
         /[A-Z]/.test(password) &&
         /\d/.test(password) &&
         /[!@#$%^&*(),.?":{}|<>]/.test(password)
}

// Real-time validation errors
const validationErrors = computed(() => {
  const errors = {}
  
  if (form.value.firstName && form.value.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters'
  }
  
  if (form.value.lastName && form.value.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
  }
  
  if (form.value.email && !isValidEmail(form.value.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (form.value.phone && !isValidPhone(form.value.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (form.value.password && !isValidPassword(form.value.password)) {
    errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number and symbol'
  }
  
  if (form.value.confirmPassword && form.value.password !== form.value.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  
  if (form.value.roles.includes('vendor') && form.value.businessName && form.value.businessName.trim().length < 2) {
    errors.businessName = 'Business name must be at least 2 characters'
  }
  
  return errors
})

// Handle registration
const handleRegister = async () => {
  if (!isFormValid.value) return
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // Prepare registration data
    const registrationData = {
      name: `${form.value.firstName} ${form.value.lastName}`,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
      roles: form.value.roles,
      business_name: form.value.businessName || null,
      service_category: form.value.serviceCategory || null
    }
    
    const result = await register(registrationData)
    
    if (result.success) {
      // Redirect based on roles
      if (form.value.roles.includes('vendor')) {
        // If they're a vendor (with or without customer role), start with vendor onboarding
        await navigateTo('/dashboard?tab=vendor&onboarding=true')
      } else {
        // Customer only - go to dashboard
        await navigateTo('/dashboard?tab=customer')
      }
    } else {
      errorMessage.value = result.error || 'Registration failed. Please try again.'
    }
  } catch (error) {
    console.error('Registration failed', error)
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Set page title
useHead({
  title: 'Register - ORDO'
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