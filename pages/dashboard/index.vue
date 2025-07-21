<template>
  <NuxtLayout name="dashboard">
    <div>
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Loading dashboard...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading dashboard</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadDashboard"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="dashboardData">
        <!-- Customer Dashboard -->
        <div v-if="dashboardData.role === 'customer'">
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_bookings }}</p>
                  <p class="text-xs" :class="getGrowthDirection(dashboardData.stats.growth_percentage) === 'up' ? 'text-green-600' : getGrowthDirection(dashboardData.stats.growth_percentage) === 'down' ? 'text-red-600' : 'text-gray-600'">
                    <span v-if="getGrowthDirection(dashboardData.stats.growth_percentage) === 'up'">↗ +</span>
                    <span v-else-if="getGrowthDirection(dashboardData.stats.growth_percentage) === 'down'">↘ </span>
                    <span v-else>→ </span>
                    {{ formatPercentage(Math.abs(dashboardData.stats.growth_percentage)) }} vs last month
                  </p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.favorites }}</p>
                  <p class="text-sm text-blue-600">{{ dashboardData.stats.avg_rating_given }}★ avg rating given</p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(dashboardData.stats.total_spent) }}</p>
                  <p class="text-sm text-purple-600">Lifetime value</p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.reviews_given }}</p>
                  <p class="text-sm text-yellow-600">{{ dashboardData.stats.avg_rating_given }}★ average rating</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Bookings & Favorites -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <!-- Upcoming Bookings -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Upcoming Bookings</h2>
                  <NuxtLink to="/dashboard/bookings" class="text-blue-600 hover:text-blue-800 text-sm">View All</NuxtLink>
                </div>
                <div v-if="dashboardData.upcoming_bookings?.length > 0" class="space-y-3">
                  <div v-for="booking in dashboardData.upcoming_bookings.slice(0, 3)" :key="booking.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-900">{{ booking.service_name }}</p>
                      <p class="text-sm text-gray-600">{{ booking.provider_name }}</p>
                      <p class="text-xs text-gray-500">{{ booking.date }} at {{ booking.time }}</p>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-900">{{ formatCurrency(booking.price) }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <p class="text-gray-500">No upcoming bookings</p>
                  <NuxtLink to="/dashboard/services" class="text-blue-600 hover:text-blue-800 text-sm">Browse Services</NuxtLink>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div class="space-y-3">
                  <div v-for="activity in dashboardData.recent_activities.slice(0, 4)" :key="activity.id" class="flex items-center space-x-3">
                    <div :class="activity.icon_color" class="w-8 h-8 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type)" />
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

          <!-- Service Recommendations -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-medium text-gray-900">Recommended for You</h2>
                <NuxtLink to="/dashboard/services" class="text-blue-600 hover:text-blue-800 text-sm">Browse All</NuxtLink>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="service in dashboardData.recommendations?.slice(0, 6)" :key="service.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 class="font-medium text-gray-900">{{ service.title }}</h3>
                  <p class="text-sm text-gray-600">{{ service.provider }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-sm text-gray-500">{{ service.rating }}★</span>
                    <span class="font-medium text-gray-900">{{ formatCurrency(service.price) }}</span>
                  </div>
                </div>
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.total_bookings }}</p>
                  <p class="text-xs" :class="getGrowthDirection(dashboardData.stats.growth_percentage) === 'up' ? 'text-green-600' : getGrowthDirection(dashboardData.stats.growth_percentage) === 'down' ? 'text-red-600' : 'text-gray-600'">
                    <span v-if="getGrowthDirection(dashboardData.stats.growth_percentage) === 'up'">↗ +</span>
                    <span v-else-if="getGrowthDirection(dashboardData.stats.growth_percentage) === 'down'">↘ </span>
                    <span v-else>→ </span>
                    {{ formatPercentage(Math.abs(dashboardData.stats.growth_percentage)) }} vs last month
                  </p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(dashboardData.stats.revenue) }}</p>
                  <p class="text-sm text-green-600">{{ formatPercentage(dashboardData.stats.completion_rate * 100) }} completion rate</p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.rating }}★</p>
                  <p class="text-sm text-yellow-600">{{ dashboardData.quick_stats.total_views }} total views</p>
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
                  <p class="text-2xl font-bold text-gray-900">{{ dashboardData.stats.active_services }}</p>
                  <p class="text-sm text-purple-600">{{ dashboardData.quick_stats.total_services }} total services</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Performance Overview and Recent Activity -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
            <!-- Performance Trends -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Performance Trends</h2>
                  <NuxtLink to="/dashboard/analytics" class="text-blue-600 hover:text-blue-800 text-sm">View Analytics</NuxtLink>
                </div>
                <div class="h-64 flex items-end justify-between space-x-1">
                  <div
                    v-for="(trend, index) in dashboardData.performance_trends?.slice(-14)"
                    :key="index"
                    class="bg-blue-500 rounded-t flex-1 min-w-0 hover:bg-blue-600 transition-colors cursor-pointer"
                    :style="{ height: `${(trend.bookings / getMaxValue(dashboardData.performance_trends || [], 'bookings')) * 100}%` }"
                    :title="`${trend.label}: ${trend.bookings} bookings, ${formatCurrency(trend.revenue)} revenue`"
                  ></div>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{{ dashboardData.performance_trends?.[dashboardData.performance_trends.length - 14]?.label || '' }}</span>
                  <span>{{ dashboardData.performance_trends?.[dashboardData.performance_trends.length - 1]?.label || '' }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div class="space-y-3">
                  <div v-for="activity in dashboardData.recent_activities?.slice(0, 6)" :key="activity.id" class="flex items-center space-x-3">
                    <div :class="activity.icon_color" class="w-8 h-8 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type)" />
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

          <!-- Top Services & Quick Actions -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Top Performing Services -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-medium text-gray-900">Top Performing Services</h2>
                  <NuxtLink to="/dashboard/services" class="text-blue-600 hover:text-blue-800 text-sm">Manage All</NuxtLink>
                </div>
                <div v-if="dashboardData.top_services?.length > 0" class="space-y-3">
                  <div v-for="service in dashboardData.top_services.slice(0, 4)" :key="service.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p class="font-medium text-gray-900">{{ service.title }}</p>
                      <p class="text-sm text-gray-600">{{ service.bookings }} bookings • {{ service.views }} views</p>
                    </div>
                    <div class="text-right">
                      <p class="font-medium text-gray-900">{{ formatCurrency(service.revenue) }}</p>
                      <p class="text-sm text-gray-600">{{ service.rating }}★</p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <p class="text-gray-500">No services yet</p>
                  <NuxtLink to="/dashboard/services/create" class="text-blue-600 hover:text-blue-800 text-sm">Create your first service</NuxtLink>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                <div class="grid grid-cols-2 gap-4">
                  <NuxtLink to="/dashboard/services/create" class="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                    <svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    <p class="font-medium text-gray-900">Create Service</p>
                    <p class="text-sm text-gray-500">Add new offering</p>
                  </NuxtLink>
                  
                  <NuxtLink to="/dashboard/analytics" class="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                    <svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <p class="font-medium text-gray-900">View Analytics</p>
                    <p class="text-sm text-gray-500">Performance metrics</p>
                  </NuxtLink>
                  
                  <NuxtLink to="/dashboard/earnings" class="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                    <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                    <p class="font-medium text-gray-900">Earnings</p>
                    <p class="text-sm text-gray-500">{{ formatCurrency(dashboardData.quick_stats.this_month_earnings) }} this month</p>
                  </NuxtLink>
                  
                  <NuxtLink to="/dashboard/calendar" class="p-4 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center">
                    <svg class="w-8 h-8 text-orange-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <p class="font-medium text-gray-900">Calendar</p>
                    <p class="text-sm text-gray-500">{{ dashboardData.quick_stats.pending_bookings }} pending</p>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Set layout
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { 
  dashboardData, 
  loading, 
  error, 
  fetchDashboard,
  formatCurrency,
  formatPercentage,
  getGrowthDirection,
  getActivityIcon,
  getMaxValue
} = useDashboard()

// Methods
const loadDashboard = async () => {
  try {
    await fetchDashboard()
  } catch (err) {
    console.error('Failed to load dashboard:', err)
  }
}

// Load dashboard data on mount
onMounted(() => {
  loadDashboard()
})

// Set page title
useHead({
  title: 'Dashboard - ORDO'
})
</script>