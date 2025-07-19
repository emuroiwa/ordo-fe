<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-lg border-r border-gray-200 fixed inset-y-0 left-0 z-50">
      <!-- Logo -->
      <div class="flex items-center h-16 px-6 border-b border-gray-200">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-900">ORDO</span>
      </div>
      
      <!-- User Role Toggle -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center space-x-2">
          <button 
            @click="toggleRole('customer')"
            :class="currentRole === 'customer' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'"
            class="flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"
          >
            Customer
          </button>
          <button 
            @click="toggleRole('vendor')"
            :class="currentRole === 'vendor' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'"
            class="flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"
          >
            Provider
          </button>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <a href="#" class="bg-blue-50 text-blue-600 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-blue-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
            </svg>
            Dashboard
          </a>
          
          <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Services
          </a>
          
          <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Bookings
          </a>
          
          <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Calendar
          </a>
          
          <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Analytics
          </a>
          
          <a href="#" class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            Payments
          </a>
        </div>
      </nav>
      
      <!-- User Profile -->
      <div class="absolute bottom-0 w-full px-6 py-4 border-t border-gray-200">
        <div class="flex items-center">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" class="w-10 h-10 rounded-full">
          <div class="ml-3">
            <div class="text-sm font-medium text-gray-900">Ernest Muroiwa</div>
            <div class="text-xs text-gray-500">{{ currentRole === 'vendor' ? 'Service Provider' : 'Customer' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Good Morning, Ernest!</h1>
              <p class="text-gray-600">Here's what's happening with your {{ currentRole === 'vendor' ? 'business' : 'bookings' }} today.</p>
            </div>
            
            <div class="flex items-center space-x-4">
              <!-- Search -->
              <div class="relative">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Search services, providers..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
              </div>
              
              <!-- Notifications -->
              <button class="relative p-2 text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"/>
                </svg>
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6">

      <!-- Customer Dashboard -->
      <div v-if="currentRole === 'customer'">
        <!-- Customer Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ customerStats.totalBookings }}</p>
                <p class="text-sm text-green-600">+12% vs last month</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Favorite Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ customerStats.favorites }}</p>
                <p class="text-sm text-blue-600">+3 new this week</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Spent</p>
                <p class="text-2xl font-bold text-gray-900">R{{ customerStats.totalSpent.toLocaleString() }}</p>
                <p class="text-sm text-purple-600">+R2,500 this month</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Reviews Given</p>
                <p class="text-2xl font-bold text-gray-900">{{ customerStats.reviewsGiven }}</p>
                <p class="text-sm text-yellow-600">4.8 avg rating</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                <svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <p class="font-medium text-gray-900">Find Services</p>
                <p class="text-sm text-gray-500">Browse available services</p>
              </button>
              
              <button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                <svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <p class="font-medium text-gray-900">Map Search</p>
                <p class="text-sm text-gray-500">Find services nearby</p>
              </button>
              
              <button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="font-medium text-gray-900">My Bookings</p>
                <p class="text-sm text-gray-500">View appointments</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vendor Dashboard -->
      <div v-else>
        <!-- Vendor Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ vendorStats.totalBookings }}</p>
                <p class="text-sm text-green-600">+14% vs last month</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Revenue</p>
                <p class="text-2xl font-bold text-gray-900">R{{ vendorStats.revenue.toLocaleString() }}</p>
                <p class="text-sm text-green-600">+25% completion rate</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ vendorStats.rating }}</p>
                <p class="text-sm text-yellow-600">+18 new this week</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Active Services</p>
                <p class="text-2xl font-bold text-gray-900">{{ vendorStats.activeServices }}</p>
                <p class="text-sm text-purple-600">2 pending approval</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Business Overview and Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Business Overview -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-medium text-gray-900">Business Overview</h2>
                <button class="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
              </div>
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <p class="text-gray-500">Chart Visualization</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
                <button class="text-blue-600 hover:text-blue-800 text-sm">View All</button>
              </div>
              <div class="space-y-4">
                <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-3">
                  <div :class="activity.iconColor" class="w-8 h-8 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                    <p class="text-xs text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Management -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-900">Service Management</h2>
              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Service
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button class="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <p class="font-medium text-gray-900">Create Listing</p>
                <p class="text-sm text-gray-500">Add new service</p>
              </button>
              
              <button class="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <p class="font-medium text-gray-900">Set Availability</p>
                <p class="text-sm text-gray-500">Manage calendar</p>
              </button>
              
              <button class="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
                <p class="font-medium text-gray-900">Define Pricing</p>
                <p class="text-sm text-gray-500">Set rates & packages</p>
              </button>
              
              <button class="p-4 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                <svg class="w-8 h-8 text-orange-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <p class="font-medium text-gray-900">View Analytics</p>
                <p class="text-sm text-gray-500">Performance metrics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// User role state
const currentRole = ref<'customer' | 'vendor'>('customer')

// Customer stats
const customerStats = ref({
  totalBookings: 24,
  favorites: 8,
  totalSpent: 15750,
  reviewsGiven: 18
})

// Vendor stats
const vendorStats = ref({
  totalBookings: 678,
  revenue: 89500,
  rating: 4.8,
  activeServices: 12
})

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'New booking confirmed for Hair Styling',
    time: '2 hours ago',
    iconColor: 'bg-green-500'
  },
  {
    id: 2,
    title: 'Monthly payment processed',
    time: '4 hours ago',
    iconColor: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'New service added: Beard Trim',
    time: '6 hours ago',
    iconColor: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Customer review received (5 stars)',
    time: '1 day ago',
    iconColor: 'bg-yellow-500'
  }
])

// Functions
const toggleRole = (role: 'customer' | 'vendor') => {
  currentRole.value = role
}
</script>