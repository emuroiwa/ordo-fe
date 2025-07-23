<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
      @click="sidebarOpen = false"
    ></div>
    
    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out"
      :class="{ '-translate-x-full lg:translate-x-0': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
      <!-- Logo -->
      <div class="flex items-center h-16 px-6 border-b border-gray-200">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-900">ORDO</span>
      </div>
      
      <!-- User Role Toggle (only show if user has multiple roles or is admin) -->
      <div v-if="hasMultipleRoles || isAdmin" class="px-6 py-4 border-b border-gray-200">
        <div v-if="isAdmin && !hasMultipleRoles" class="text-center">
          <span class="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Administrator
          </span>
        </div>
        <div v-else class="flex items-center space-x-2">
          <button 
            v-if="hasRole('admin')"
            @click="toggleRole('admin')"
            :class="currentRole === 'admin' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-red-600'"
            class="flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"
          >
            Admin
          </button>
          <button 
            v-if="hasRole('customer')"
            @click="toggleRole('customer')"
            :class="currentRole === 'customer' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'"
            class="flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"
          >
            Customer
          </button>
          <button 
            v-if="hasRole('vendor')"
            @click="toggleRole('vendor')"
            :class="currentRole === 'vendor' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'"
            class="flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"
          >
            Provider
          </button>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="mt-6 px-3 pb-20 overflow-y-auto">
        <div class="space-y-1">
          <!-- Dashboard - Always shown -->
          <NuxtLink 
            to="/dashboard" 
            class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target"
            exact-active-class="bg-blue-50 text-blue-600"
            @click="closeMobileSidebar"
          >
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5 flex-shrink-0" :class="$route.path === '/dashboard' ? 'text-blue-500' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            Dashboard
          </NuxtLink>

          <!-- Customer Navigation -->
          <template v-if="currentRole === 'customer'">
            <NuxtLink to="/dashboard/search" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" active-class="bg-blue-50 text-blue-600" @click="closeMobileSidebar">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Find Services
            </NuxtLink>
            
            <NuxtLink to="/dashboard/bookings" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              My Bookings
            </NuxtLink>

            <NuxtLink to="/dashboard/favorites" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              Favorites
            </NuxtLink>

            <NuxtLink to="/dashboard/reviews" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              My Reviews
            </NuxtLink>

            <NuxtLink to="/dashboard/payments" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Payment History
            </NuxtLink>
          </template>

          <!-- Admin Navigation -->
          <template v-else-if="currentRole === 'admin'">
            <NuxtLink to="/admin" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Admin Overview
            </NuxtLink>
            
            <NuxtLink to="/admin/vendor-verifications" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Vendor Verifications
            </NuxtLink>
          </template>

          <!-- Vendor Navigation -->
          <template v-else>
            <NuxtLink to="/dashboard/services" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              My Services
            </NuxtLink>
            
            <NuxtLink to="/dashboard/bookings" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Appointments
            </NuxtLink>
            
            <NuxtLink to="/dashboard/calendar" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Calendar
            </NuxtLink>
            
            <NuxtLink to="/dashboard/analytics" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              Analytics
            </NuxtLink>

            <NuxtLink to="/dashboard/earnings" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
              Earnings
            </NuxtLink>

            <NuxtLink to="/dashboard/payments" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Payments
            </NuxtLink>

            <NuxtLink to="/dashboard/reviews" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
              <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Customer Reviews
            </NuxtLink>
          </template>

          <!-- Common Navigation Items -->
          <NuxtLink to="/dashboard/payments" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            {{ currentRole === 'customer' ? 'Payment History' : 'Payments' }}
          </NuxtLink>
          
          <NuxtLink to="/dashboard/notifications" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"/>
            </svg>
            Notifications
          </NuxtLink>
          
          <NuxtLink to="/dashboard/profile" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-3 text-sm font-medium rounded-md touch-target" @click="closeMobileSidebar" active-class="bg-blue-50 text-blue-600">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Profile Settings
          </NuxtLink>
        </div>
      </nav>
      
      <!-- Logout Button -->
      <div class="absolute bottom-0 w-full px-6 py-4 border-t border-gray-200">
        <button 
          @click="handleLogout"
          class="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 hover:border-red-300"
          title="Logout"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 lg:ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div class="px-4 sm:px-6 py-3 sm:py-4">
          <div class="flex items-center justify-between">
            <!-- Mobile menu button -->
            <div class="flex items-center space-x-4">
              <button 
                @click="sidebarOpen = !sidebarOpen"
                class="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors touch-target"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div class="hidden sm:block">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">{{ pageTitle }}</h1>
                <p class="text-gray-600 text-sm hidden md:block">{{ pageSubtitle }}</p>
              </div>
              <div class="block sm:hidden">
                <h1 class="text-lg font-bold text-gray-900 truncate">{{ mobilePageTitle }}</h1>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 sm:space-x-4">
              <!-- Search - Hidden on mobile -->
              <div class="relative hidden lg:block">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Search services, providers..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
              </div>
              
              <!-- Notifications -->
              <NotificationsNotificationDropdown />
              
              <!-- User Profile -->
              <div class="relative" data-dropdown>
                <button 
                  @click="showProfileMenu = !showProfileMenu"
                  class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors touch-target"
                  title="User profile"
                >
                  <div class="relative">
                    <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        v-if="profileUser?.avatar_url || user?.avatar" 
                        :src="profileUser?.avatar_url || user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'" 
                        :alt="profileUser?.name || user?.name || 'User'" 
                        class="w-full h-full object-cover"
                      >
                      <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">
                        {{ userInitials || (user?.name ? user.name.charAt(0).toUpperCase() : 'U') }}
                      </div>
                    </div>
                    <!-- Profile completion indicator -->
                    <div 
                      v-if="profileUser && profileCompletion < 100"
                      class="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-orange-400 border border-white rounded-full"
                      :title="`Profile ${profileCompletion}% complete`"
                    ></div>
                  </div>
                  <div class="hidden sm:block text-left">
                    <div class="text-sm font-medium text-gray-900">
                      {{ displayName || user?.name || 'User' }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ currentRole === 'admin' ? 'Administrator' : (currentRole === 'vendor' ? 'Service Provider' : 'Customer') }}
                    </div>
                  </div>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                >
                  <NuxtLink 
                    to="/dashboard/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showProfileMenu = false"
                  >
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      Profile Settings
                    </div>
                  </NuxtLink>
                  <hr class="my-1">
                  <button 
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <div class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Use auth composable
const { user, logout } = useAuth()
const route = useRoute()

// User role state
const { currentRole, toggleRole, initializeRole, hasMultipleRoles, isAdmin, hasRole } = useRole()

// Profile composable for enhanced user data
const { 
  user: profileUser, 
  profileCompletion, 
  displayName, 
  userInitials,
  fetchProfile 
} = useProfile()

// UI state
const showProfileMenu = ref(false)
const sidebarOpen = ref(false)

// Mobile page title (shorter for mobile)
const mobilePageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Dashboard'
  if (path === '/admin') return 'Admin'
  if (path.startsWith('/admin/vendor-verifications')) return 'Verifications'
  if (path === '/dashboard/notifications') return 'Notifications'
  if (path === '/dashboard/services') return 'Services'
  if (path === '/dashboard/bookings') return 'Bookings'
  if (path === '/dashboard/calendar') return 'Calendar'
  if (path === '/dashboard/analytics') return 'Analytics'
  if (path === '/dashboard/payments') return 'Payments'
  if (path === '/dashboard/profile') return 'Profile'
  return 'Dashboard'
})

// Close mobile sidebar
const closeMobileSidebar = () => {
  sidebarOpen.value = false
}

// Page title computation
const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return `Good Morning, ${user.value?.name || 'User'}!`
  if (path === '/admin') return 'Admin Dashboard'
  if (path === '/admin/vendor-verifications') return 'Vendor Verifications'
  if (path.startsWith('/admin/vendor-verifications/')) return 'Verification Review'
  if (path === '/dashboard/notifications') return 'Notifications'
  if (path === '/dashboard/services') return 'Services'
  if (path === '/dashboard/bookings') return 'Bookings'
  if (path === '/dashboard/calendar') return 'Calendar'
  if (path === '/dashboard/analytics') return 'Analytics'
  if (path === '/dashboard/payments') return 'Payments'
  if (path === '/dashboard/profile') return 'Profile Settings'
  return 'Dashboard'
})

const pageSubtitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return `Here's what's happening with your ${currentRole.value === 'vendor' ? 'business' : 'bookings'} today.`
  if (path === '/admin') return 'Platform administration and vendor verification management'
  if (path === '/admin/vendor-verifications') return 'Review and manage vendor verification requests'
  if (path.startsWith('/admin/vendor-verifications/')) return 'Review vendor verification details and documents'
  if (path === '/dashboard/bookings') return currentRole.value === 'vendor' ? 'Manage your service appointments and customer bookings' : 'Track your booked services and appointments'
  if (path === '/dashboard/notifications') return 'Manage your notifications and stay updated'
  if (path === '/dashboard/profile') return 'Manage your account settings and preferences'
  return ''
})

// Functions
const handleLogout = async () => {
  await logout()
  await navigateTo('/')
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('[data-dropdown]')) {
    showProfileMenu.value = false
  }
}

// Fetch user data on mount
onMounted(async () => {
  const { fetchUser } = useAuth()
  
  try {
    // Only fetch user data if we don't already have it
    if (!user.value) {
      console.log('No user data found, fetching from API')
      await fetchUser()
    } else {
      console.log('User data already available, skipping fetch')
    }
    
    // Only fetch profile data if we have a user authenticated
    if (user.value) {
      try {
        await fetchProfile()
        // Initialize role after we have user data
        initializeRole()
      } catch (profileError) {
        console.warn('Profile data not available:', profileError)
        // Profile fetch failed, but continue with basic user data
        initializeRole()
      }
    } else {
      // If no user after attempting to fetch, they might need to login
      console.log('No user authenticated, redirecting to login')
      await navigateTo('/login')
    }
  } catch (authError) {
    console.error('Authentication failed:', authError)
    // On authentication failure, redirect to login
    await navigateTo('/login')
  }
  
  // Add click listener for closing dropdown
  document.addEventListener('click', handleClickOutside)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  display: flex;
  align-items: center;
}

/* Mobile responsive adjustments */
@media (max-width: 1024px) {
  /* Ensure sidebar doesn't interfere with main content on mobile */
  .flex-1 {
    margin-left: 0;
  }
  
  /* Improve sidebar spacing on mobile */
  nav {
    padding-bottom: 100px; /* Extra space for logout button */
  }
  
  /* Better touch targets */
  .touch-target {
    min-height: 48px;
  }
}

@media (max-width: 768px) {
  /* Improve header spacing on mobile */
  header .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Better button spacing */
  .space-x-2 > * + * {
    margin-left: 0.5rem;
  }
  
  /* Ensure proper text truncation */
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>