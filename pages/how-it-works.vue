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
                <NuxtLink to="/how-it-works" class="text-blue-600 font-medium relative">
                  How it Works
                  <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </NuxtLink>
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
      <!-- Hero Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="mb-12">
              <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                How ORDO Works
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                Discover, book, and manage services with ease in just a few simple steps
              </p>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Steps Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TransitionGroup name="step-stagger" appear>
              <div
                v-for="(step, index) in steps"
                :key="step.id"
                :style="{ '--delay': index * 0.2 + 's' }"
                class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div class="relative mb-8">
                  <div class="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <component :is="step.icon" class="w-10 h-10 text-white" />
                  </div>
                  <div class="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span class="text-sm font-bold text-blue-600">{{ index + 1 }}</span>
                  </div>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
                <p class="text-gray-600 text-lg mb-6">{{ step.description }}</p>
                <div class="space-y-2">
                  <div v-for="detail in step.details" :key="detail" class="flex items-center text-sm text-gray-500">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ detail }}
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ORDO</span>?
              </h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                We make service booking simple, secure, and convenient for everyone
              </p>
            </div>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TransitionGroup name="feature-stagger" appear>
              <div
                v-for="(feature, index) in features"
                :key="feature.id"
                :style="{ '--delay': index * 0.1 + 's' }"
                class="backdrop-blur-sm bg-white/60 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/70 transition-all duration-300"
              >
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <component :is="feature.icon" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
                    <p class="text-gray-600">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- User Types Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Perfect for Everyone
              </h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                Whether you're a customer or service provider, ORDO has you covered
              </p>
            </div>
          </Transition>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TransitionGroup name="user-type-stagger" appear>
              <div
                v-for="(userType, index) in userTypes"
                :key="userType.id"
                :style="{ '--delay': index * 0.3 + 's' }"
                class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div class="flex items-center mb-6">
                  <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <component :is="userType.icon" class="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900">{{ userType.title }}</h3>
                    <p class="text-gray-600">{{ userType.subtitle }}</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div v-for="benefit in userType.benefits" :key="benefit" class="flex items-start">
                    <svg class="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-gray-700">{{ benefit }}</span>
                  </div>
                </div>
                <div class="mt-8">
                  <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    {{ userType.cta }}
                  </button>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-12 shadow-lg">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Get Started?
              </h2>
              <p class="text-xl text-gray-600 mb-8">
                Join thousands of satisfied customers and service providers on ORDO
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink
                  to="/register"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Create Account
                </NuxtLink>
                <NuxtLink
                  to="/search"
                  class="backdrop-blur-sm bg-white/50 border border-white/30 px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-white/70 transition-all duration-300"
                >
                  Browse Services
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

// Steps data
const steps = ref([
  {
    id: 1,
    title: 'Search & Discover',
    description: 'Find the perfect service provider for your needs',
    icon: h('svg', { class: 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
    ]),
    details: [
      'Browse by category or location',
      'Filter by price, rating, and availability',
      'View detailed profiles and reviews'
    ]
  },
  {
    id: 2,
    title: 'Book & Schedule',
    description: 'Select your preferred time and confirm your booking',
    icon: h('svg', { class: 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ]),
    details: [
      'Choose available time slots',
      'Add special requests or notes',
      'Secure payment processing'
    ]
  },
  {
    id: 3,
    title: 'Enjoy & Review',
    description: 'Experience the service and share your feedback',
    icon: h('svg', { class: 'w-10 h-10', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ]),
    details: [
      'Get reminders and updates',
      'Track your booking status',
      'Rate and review your experience'
    ]
  }
])

// Features data
const features = ref([
  {
    id: 1,
    title: 'Verified Providers',
    description: 'All service providers are thoroughly vetted and verified',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
    ])
  },
  {
    id: 2,
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with multiple options',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
    ])
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for any questions',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l5.657 5.657M12 21.056l-5.657-5.657' })
    ])
  },
  {
    id: 4,
    title: 'Easy Rescheduling',
    description: 'Flexible booking management and rescheduling options',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })
    ])
  },
  {
    id: 5,
    title: 'Real-time Updates',
    description: 'Get instant notifications about your bookings',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8' })
    ])
  },
  {
    id: 6,
    title: 'Quality Guarantee',
    description: 'Satisfaction guaranteed or your money back',
    icon: h('svg', { class: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
    ])
  }
])

// User types data
const userTypes = ref([
  {
    id: 1,
    title: 'For Customers',
    subtitle: 'Find and book services easily',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
    ]),
    benefits: [
      'Browse thousands of verified service providers',
      'Read reviews and ratings from other customers',
      'Book appointments instantly with secure payment',
      'Get reminders and updates about your bookings',
      'Reschedule or cancel with flexible policies',
      'Access to exclusive deals and discounts'
    ],
    cta: 'Start Booking Services'
  },
  {
    id: 2,
    title: 'For Service Providers',
    subtitle: 'Grow your business with ORDO',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
    ]),
    benefits: [
      'Reach thousands of potential customers',
      'Manage your calendar and bookings effortlessly',
      'Set your own prices and availability',
      'Get paid securely and on time',
      'Build your reputation with customer reviews',
      'Access business analytics and insights'
    ],
    cta: 'Join as Service Provider'
  }
])

// Set page title
useHead({
  title: 'How It Works - ORDO'
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

/* Staggered Animations */
.step-stagger-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.step-stagger-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.feature-stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.feature-stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.user-type-stagger-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.user-type-stagger-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
</style>