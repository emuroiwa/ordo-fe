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
                <NuxtLink to="/about" class="text-blue-600 font-medium relative">
                  About us
                  <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </NuxtLink>
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
                About ORDO
              </h1>
              <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Connecting people with premium services through innovation, trust, and seamless experiences
              </p>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Transition name="slide-right" appear>
              <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
                <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p class="text-lg text-gray-600 mb-6">
                  At ORDO, we believe that finding and booking quality services should be simple, secure, and stress-free. Our mission is to bridge the gap between service providers and customers, creating a platform where trust, quality, and convenience come together.
                </p>
                <p class="text-lg text-gray-600">
                  We're committed to empowering local businesses to grow while helping customers discover amazing services in their area. Every interaction on our platform is designed to build lasting relationships and deliver exceptional experiences.
                </p>
              </div>
            </Transition>

            <Transition name="slide-left" appear>
              <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-0 overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80"
                  alt="Team collaboration"
                  class="w-full h-80 object-cover"
                />
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TransitionGroup name="value-stagger" appear>
              <div
                v-for="(value, index) in values"
                :key="value.id"
                :style="{ '--delay': index * 0.2 + 's' }"
                class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <component :is="value.icon" class="w-8 h-8 text-white" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
                <p class="text-gray-600">{{ value.description }}</p>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- Story Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
              <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
              
              <div class="space-y-6 text-lg text-gray-600">
                <p>
                  ORDO was born from a simple frustration: finding and booking quality services was unnecessarily complicated. Whether it was finding a skilled barber, booking a wedding photographer, or renting equipment for an event, the process was fragmented, unreliable, and time-consuming.
                </p>
                
                <p>
                  Founded in 2024, we set out to create a platform that would change how people connect with service providers. We envisioned a world where customers could easily discover, compare, and book services with confidence, while service providers could focus on what they do best – delivering exceptional experiences.
                </p>
                
                <p>
                  Today, ORDO serves thousands of customers and hundreds of service providers across South Africa. We've facilitated countless successful bookings, helped businesses grow, and made service discovery a delightful experience for everyone involved.
                </p>
                
                <p>
                  But we're just getting started. Our vision extends beyond just bookings – we're building a comprehensive ecosystem that supports the entire service economy, from discovery to delivery to long-term relationships.
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- Team Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="text-center mb-12">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate people building the future of service discovery
              </p>
            </div>
          </Transition>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TransitionGroup name="team-stagger" appear>
              <div
                v-for="(member, index) in team"
                :key="member.id"
                :style="{ '--delay': index * 0.15 + 's' }"
                class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  :src="member.avatar"
                  :alt="member.name"
                  class="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
                <p class="text-blue-600 font-medium mb-3">{{ member.role }}</p>
                <p class="text-gray-600 text-sm">{{ member.bio }}</p>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div v-for="stat in stats" :key="stat.id">
                  <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {{ stat.value }}
                  </div>
                  <div class="text-gray-600 font-medium">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <Transition name="fade-up" appear>
            <div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-12 shadow-lg">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Join Our Journey
              </h2>
              <p class="text-xl text-gray-600 mb-8">
                Be part of the future of service discovery. Whether you're a customer or service provider, we'd love to have you on board.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink
                  to="/register"
                  class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                </NuxtLink>
                <NuxtLink
                  to="/how-it-works"
                  class="backdrop-blur-sm bg-white/50 border border-white/30 px-8 py-4 rounded-xl font-semibold text-gray-700 hover:bg-white/70 transition-all duration-300"
                >
                  Learn More
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

// Values data
const values = ref([
  {
    id: 1,
    title: 'Trust & Security',
    description: 'Every service provider is verified and every transaction is secure, giving you peace of mind with every booking.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
    ])
  },
  {
    id: 2,
    title: 'Quality Excellence',
    description: 'We maintain high standards through rigorous vetting processes and continuous quality monitoring.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' })
    ])
  },
  {
    id: 3,
    title: 'Innovation First',
    description: 'We continuously evolve our platform with cutting-edge technology to enhance user experience.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ])
  },
  {
    id: 4,
    title: 'Customer Focus',
    description: 'Every decision we make is guided by what creates the best experience for our customers.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
    ])
  },
  {
    id: 5,
    title: 'Community Impact',
    description: 'We support local businesses and communities by providing them with tools to grow and thrive.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
    ])
  },
  {
    id: 6,
    title: 'Transparency',
    description: 'We believe in open, honest communication with clear pricing and no hidden fees.',
    icon: h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
    ])
  }
])

// Team data
const team = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Passionate about connecting people with quality services. 10+ years in tech and business development.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b282?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack developer with expertise in scalable platforms. Former Google engineer with a love for innovation.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Head of Customer Success',
    bio: 'Dedicated to ensuring every customer has an amazing experience. Background in hospitality and customer service.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Product Manager',
    bio: 'Focuses on building intuitive user experiences. Former UX consultant with a passion for design thinking.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    bio: 'Creative storyteller who helps businesses connect with their audience. 8+ years in digital marketing.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Operations Manager',
    bio: 'Ensures smooth operations and quality standards. Background in logistics and business operations.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
  }
])

// Stats data
const stats = ref([
  {
    id: 1,
    value: '10,000+',
    label: 'Happy Customers'
  },
  {
    id: 2,
    value: '1,500+',
    label: 'Service Providers'
  },
  {
    id: 3,
    value: '50,000+',
    label: 'Successful Bookings'
  },
  {
    id: 4,
    value: '4.9',
    label: 'Average Rating'
  }
])

// Set page title
useHead({
  title: 'About Us - ORDO'
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
.value-stagger-enter-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.value-stagger-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.9);
}

.team-stagger-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--delay);
}

.team-stagger-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>