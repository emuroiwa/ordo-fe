<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Mobile-First Header -->
      <div class="space-y-4 sm:space-y-6">
        <div class="text-center sm:text-left">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Earnings</h1>
          <p class="text-gray-600 text-sm sm:text-base">Track your earnings and manage payouts</p>
        </div>
        
        <!-- Mobile: Actions First -->
        <div class="space-y-4">
          <!-- Request Payout Button (Priority) -->
          <button
            @click="showPayoutModal = true"
            :disabled="!earnings?.overview.available_balance || earnings.overview.available_balance < 10"
            class="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium touch-target transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Request Payout
          </button>
          
          <!-- Date Range Picker -->
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label class="block text-xs text-gray-500 mb-1 sm:hidden">From</label>
                <input
                  v-model="dateRange.start_date"
                  type="date"
                  class="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                  :max="dateRange.end_date || today"
                >
              </div>
              <div class="flex items-center justify-center">
                <span class="text-gray-500 text-sm hidden sm:inline">to</span>
                <span class="text-gray-500 text-sm sm:hidden">↓</span>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1 sm:hidden">To</label>
                <input
                  v-model="dateRange.end_date"
                  type="date"
                  class="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                  :min="dateRange.start_date"
                  :max="today"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="text-center">
          <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600">Loading earnings...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading earnings</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadEarnings"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Earnings Content -->
      <div v-else-if="earnings" class="space-y-6">
        <!-- Mobile-First Overview Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <!-- Available Balance (Priority #1) -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl shadow-sm border border-green-200 order-1">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-5 w-full min-w-0">
                <p class="text-xs sm:text-sm font-medium text-green-700 truncate">Available Balance</p>
                <p class="text-xl sm:text-2xl font-bold text-green-900 truncate">{{ formatCurrency(earnings.overview.available_balance) }}</p>
                <p class="text-xs text-green-600">Ready to withdraw</p>
              </div>
            </div>
          </div>

          <!-- This Month's Earnings (Priority #2) -->
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 order-2">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-5 w-full min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">This Month</p>
                <p class="text-xl sm:text-2xl font-bold text-gray-900 truncate">{{ formatCurrency(earnings.overview.earnings_this_month) }}</p>
                <p class="text-xs" :class="getGrowthDirection(earnings.overview.growth_percentage) === 'up' ? 'text-green-600' : getGrowthDirection(earnings.overview.growth_percentage) === 'down' ? 'text-red-600' : 'text-gray-600'">
                  <span v-if="getGrowthDirection(earnings.overview.growth_percentage) === 'up'">↗ +</span>
                  <span v-else-if="getGrowthDirection(earnings.overview.growth_percentage) === 'down'">↘ </span>
                  <span v-else>→ </span>
                  {{ formatPercentage(Math.abs(earnings.overview.growth_percentage)) }} vs last month
                </p>
              </div>
            </div>
          </div>

          <!-- Pending Payouts (Priority #3) -->
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 order-3 sm:order-4 lg:order-3">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-5 w-full min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">Pending Payouts</p>
                <p class="text-xl sm:text-2xl font-bold text-gray-900 truncate">{{ formatCurrency(earnings.overview.pending_payouts) }}</p>
                <p class="text-xs text-yellow-600">Processing</p>
              </div>
            </div>
          </div>

          <!-- Total Earnings (Priority #4) -->
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 order-4 sm:order-3 lg:order-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div class="ml-3 sm:ml-5 w-full min-w-0">
                <p class="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Earnings</p>
                <p class="text-xl sm:text-2xl font-bold text-gray-900 truncate">{{ formatCurrency(earnings.overview.total_earnings) }}</p>
                <p class="text-xs text-gray-600">All time</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile-First Performance Metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">Average Order Value</h3>
              <p class="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{{ formatCurrency(earnings.overview.average_order_value) }}</p>
              <p class="text-sm text-gray-600">Per booking</p>
            </div>
          </div>
          
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="text-center sm:text-left">
              <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">Completion Rate</h3>
              <p class="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{{ formatPercentage(earnings.overview.completion_rate * 100) }}</p>
              <p class="text-sm text-gray-600">Success rate</p>
            </div>
          </div>
          
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
            <div class="text-center sm:text-left">
              <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">Total Payouts</h3>
              <p class="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{{ formatCurrency(earnings.overview.total_payouts) }}</p>
              <p class="text-sm text-gray-600">All time withdrawals</p>
            </div>
          </div>
        </div>

        <!-- Mobile-First Charts -->
        <div class="grid grid-cols-1 gap-6">
          <!-- Earnings Trend Chart -->
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Daily Earnings Trend</h3>
              <span class="text-xs text-gray-500">Last 14 days</span>
            </div>
            <div class="h-48 sm:h-64 flex items-end justify-between space-x-1 overflow-x-auto">
              <div
                v-for="(point, index) in earnings.trends.earnings.slice(-14)"
                :key="index"
                class="bg-green-500 rounded-t flex-shrink-0 hover:bg-green-600 transition-colors cursor-pointer touch-target"
                :style="{ height: `${(point.value / Math.max(...earnings.trends.earnings.map(p => p.value))) * 100}%`, minWidth: '20px', width: 'max(20px, calc(100% / 14))' }"
                :title="`${point.label}: ${formatCurrency(point.value)}`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>{{ earnings.trends.earnings[earnings.trends.earnings.length - 14]?.label || '' }}</span>
              <span>{{ earnings.trends.earnings[earnings.trends.earnings.length - 1]?.label || '' }}</span>
            </div>
          </div>

          <!-- Monthly Breakdown Chart -->
          <div class="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Monthly Breakdown</h3>
              <span class="text-xs text-gray-500">Last 6 months</span>
            </div>
            <div class="h-48 sm:h-64">
              <!-- Mobile: Horizontal scroll for better touch experience -->
              <div class="flex items-end justify-between space-x-3 sm:space-x-2 h-full overflow-x-auto pb-6">
                <div
                  v-for="(month, index) in earnings.trends.monthly.slice(-6)"
                  :key="index"
                  class="flex-shrink-0 space-y-2 touch-target"
                  style="min-width: 50px;"
                >
                  <div class="text-center h-full flex flex-col justify-end">
                    <div
                      class="bg-blue-500 rounded-t w-full hover:bg-blue-600 transition-colors cursor-pointer"
                      :style="{ height: `${Math.max(10, (month.earnings / Math.max(...earnings.trends.monthly.map(m => m.earnings))) * 180)}px` }"
                      :title="`${month.label}: ${formatCurrency(month.earnings)}`"
                    ></div>
                  </div>
                  <div class="text-xs text-gray-500 text-center truncate">{{ month.label.split(' ')[0] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile-First Data Tables -->
        <div class="grid grid-cols-1 gap-6">
          <!-- Recent Transactions -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Recent Transactions</h3>
              <button
                @click="showTransactionsModal = true"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium touch-target px-2 py-1 rounded"
              >
                View All
              </button>
            </div>
            
            <!-- Mobile: Card-based layout -->
            <div class="sm:hidden divide-y divide-gray-200">
              <div v-for="transaction in earnings.transactions.recent.slice(0, 5)" :key="transaction.id" class="p-4 touch-target">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <div class="flex-shrink-0">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="transaction.type === 'earning' ? 'bg-green-100' : 'bg-blue-100'">
                        <svg class="w-5 h-5" :class="transaction.type === 'earning' ? 'text-green-600' : 'text-blue-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTransactionTypeIcon(transaction.type)" />
                        </svg>
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 truncate">{{ transaction.description }}</div>
                      <div class="text-xs text-gray-500 mt-1">{{ transaction.date }}</div>
                      <div class="text-xs mt-1" :class="getTransactionStatusColor(transaction.status)">
                        {{ transaction.status }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0 ml-3">
                    <div class="text-base font-semibold" :class="transaction.type === 'earning' ? 'text-green-600' : 'text-blue-600'">
                      {{ transaction.type === 'earning' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Desktop: Table layout -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in earnings.transactions.recent.slice(0, 5)" :key="transaction.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0">
                          <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="transaction.type === 'earning' ? 'bg-green-100' : 'bg-blue-100'">
                            <svg class="w-4 h-4" :class="transaction.type === 'earning' ? 'text-green-600' : 'text-blue-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTransactionTypeIcon(transaction.type)" />
                            </svg>
                          </div>
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">{{ transaction.description }}</div>
                          <div class="text-sm text-gray-500">{{ transaction.date }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <div class="text-sm font-medium" :class="transaction.type === 'earning' ? 'text-green-600' : 'text-blue-600'">
                        {{ transaction.type === 'earning' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                      </div>
                      <div class="text-xs" :class="getTransactionStatusColor(transaction.status)">
                        {{ transaction.status }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Top Earning Services -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Top Earning Services</h3>
            </div>
            
            <!-- Mobile: Card-based layout -->
            <div class="sm:hidden divide-y divide-gray-200">
              <div v-for="(service, index) in earnings.services.top_earning.slice(0, 5)" :key="service.id" class="p-4 touch-target">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3 flex-1 min-w-0">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-sm font-semibold text-blue-600">{{ index + 1 }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 truncate">{{ service.title }}</div>
                      <div class="text-xs text-gray-500">{{ service.bookings }} bookings</div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0 ml-3">
                    <div class="text-base font-semibold text-gray-900">
                      {{ formatCurrency(service.net_earnings) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Desktop: Table layout -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Earnings</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="service in earnings.services.top_earning.slice(0, 5)" :key="service.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                      <div class="text-sm text-gray-500">{{ service.bookings }} bookings</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                      {{ formatCurrency(service.net_earnings) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile-First Payout Request Modal -->
    <div v-if="showPayoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
      <div class="bg-white rounded-t-xl sm:rounded-xl max-w-md w-full mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white px-4 sm:px-6 py-4 border-b border-gray-200 rounded-t-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Request Payout</h3>
            <button @click="showPayoutModal = false" class="p-2 hover:bg-gray-100 rounded-full touch-target">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="handlePayoutRequest" class="p-4 sm:p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Amount to Withdraw</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">R</span>
              <input
                v-model.number="payoutForm.amount"
                type="number"
                min="10"
                :max="earnings?.overview.available_balance || 0"
                step="0.01"
                class="pl-10 w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                placeholder="Enter amount"
                required
              >
            </div>
            <p class="text-sm text-gray-500 mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
              </svg>
              Available: {{ formatCurrency(earnings?.overview.available_balance || 0) }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Payout Method</label>
            <select v-model="payoutForm.payout_method" class="w-full px-4 py-4 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target" required>
              <option value="">Select payout method</option>
              <option v-for="method in payoutMethods.filter(m => m.available)" :key="method.id" :value="method.id">
                {{ method.name }} ({{ formatPercentage(method.fee_percentage) }} fee)
              </option>
            </select>
          </div>

          <!-- Bank Details (shown when bank_transfer is selected) -->
          <div v-if="payoutForm.payout_method === 'bank_transfer'" class="space-y-4 p-4 bg-gray-50 rounded-xl">
            <h4 class="font-medium text-gray-900 mb-3">Bank Details</h4>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
              <input
                v-model="payoutForm.bank_details.account_holder"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                placeholder="Full name as on bank account"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <input
                v-model="payoutForm.bank_details.account_number"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                placeholder="Account number"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <input
                v-model="payoutForm.bank_details.bank_name"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                placeholder="Bank name"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Branch Code</label>
              <input
                v-model="payoutForm.bank_details.branch_code"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
                placeholder="Branch code"
                required
              >
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              @click="showPayoutModal = false"
              class="w-full sm:w-auto px-6 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 touch-target transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="payoutLoading"
              class="w-full sm:flex-1 px-6 py-3 text-base font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 disabled:bg-gray-400 touch-target transition-colors"
            >
              <span v-if="payoutLoading">Processing...</span>
              <span v-else>Request Payout</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Mobile-First Transactions Modal -->
    <div v-if="showTransactionsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-4">
      <div class="bg-white rounded-t-xl sm:rounded-xl max-w-4xl w-full mx-0 sm:mx-4 max-h-[90vh] overflow-hidden">
        <div class="sticky top-0 bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
          <h3 class="text-lg font-semibold text-gray-900">Transaction History</h3>
          <button @click="showTransactionsModal = false" class="p-2 hover:bg-gray-100 rounded-full touch-target">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
          <div class="text-center py-12">
            <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4 class="text-lg font-medium text-gray-900 mb-2">Full Transaction History</h4>
            <p class="text-gray-600 mb-6">Complete transaction history with filtering capabilities would be implemented here.</p>
            <p class="text-sm text-gray-500">Features would include date filtering, transaction type filtering, search, and detailed transaction views.</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { DateRange, PayoutRequest } from '~/composables/useEarnings'

// Set page meta
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { 
  earnings, 
  payoutMethods,
  loading, 
  error, 
  fetchEarnings,
  fetchPayoutMethods,
  requestPayout,
  formatCurrency,
  formatPercentage,
  formatNumber,
  getTransactionStatusColor,
  getTransactionTypeIcon,
  getGrowthDirection
} = useEarnings()

// Redirect if not vendor
watch(currentRole, (role) => {
  if (role === 'customer') {
    navigateTo('/dashboard')
  }
}, { immediate: true })

// State
const showPayoutModal = ref(false)
const showTransactionsModal = ref(false)
const payoutLoading = ref(false)
const today = new Date().toISOString().split('T')[0]
const dateRange = ref<DateRange>({
  start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
  end_date: today
})

const payoutForm = ref<PayoutRequest>({
  amount: 0,
  payout_method: '',
  bank_details: {
    account_number: '',
    account_holder: '',
    bank_name: '',
    branch_code: ''
  }
})

// Methods
const loadEarnings = async () => {
  try {
    await fetchEarnings(dateRange.value)
  } catch (err) {
    console.error('Failed to load earnings:', err)
  }
}

const handlePayoutRequest = async () => {
  try {
    payoutLoading.value = true
    const result = await requestPayout(payoutForm.value)
    
    // Show success message
    alert(`Payout request submitted successfully! \nPayout ID: ${result.payout_id}\nNet Amount: ${formatCurrency(result.net_amount)}\nEstimated Arrival: ${result.estimated_arrival}`)
    
    // Reset form and close modal
    payoutForm.value = {
      amount: 0,
      payout_method: '',
      bank_details: {
        account_number: '',
        account_holder: '',
        bank_name: '',
        branch_code: ''
      }
    }
    showPayoutModal.value = false
    
  } catch (err: any) {
    alert(`Payout request failed: ${err.message}`)
  } finally {
    payoutLoading.value = false
  }
}

// Watch date range changes
watch(dateRange, () => {
  loadEarnings()
}, { deep: true })

// Load data on mount
onMounted(async () => {
  if (currentRole.value === 'vendor') {
    await Promise.all([
      loadEarnings(),
      fetchPayoutMethods()
    ])
  }
})

// Set page title
useHead({
  title: 'Earnings - ORDO Dashboard'
})
</script>

<style scoped>
/* Mobile-First Touch Targets */
.touch-target {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile: Enhanced touch targets and spacing */
@media (max-width: 640px) {
  .touch-target {
    min-height: 48px;
  }
  
  /* Better card spacing on mobile */
  .space-y-4 > * + * {
    margin-top: 1rem;
  }
  
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
  
  /* Optimize grid gaps */
  .gap-4 {
    gap: 1rem;
  }
  
  /* Enhanced border radius for modern mobile feel */
  .rounded-xl {
    border-radius: 0.75rem;
  }
  
  /* Better text sizing for mobile */
  .text-base {
    font-size: 1rem;
    line-height: 1.5;
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .touch-target {
    min-height: 44px;
  }
}

/* Desktop optimizations */
@media (min-width: 1025px) {
  .touch-target {
    min-height: 40px;
  }
}

/* Enhanced gradient background for available balance */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-green-50 {
  --tw-gradient-from: rgb(240 253 244);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(240, 253, 244, 0));
}

.to-green-100 {
  --tw-gradient-to: rgb(220 252 231);
}

/* Chart optimizations for mobile */
.h-48 {
  height: 12rem;
}

.h-64 {
  height: 16rem;
}

/* Better scrolling for mobile charts */
@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* Chart height adjustment for mobile */
  .h-48 {
    height: 10rem;
  }
}

/* Modal optimizations */
@media (max-width: 640px) {
  /* Mobile modal slides up from bottom */
  .fixed.inset-0 .bg-white {
    max-height: 90vh;
    margin-bottom: 0;
  }
  
  /* Better form inputs on mobile */
  input, select {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}

/* Enhanced status colors for better mobile contrast */
.text-green-600 {
  color: rgb(22 163 74);
}

.text-green-700 {
  color: rgb(21 128 61);
}

.text-green-900 {
  color: rgb(20 83 45);
}

.text-blue-600 {
  color: rgb(37 99 235);
}

.text-blue-700 {
  color: rgb(29 78 216);
}

.text-purple-600 {
  color: rgb(147 51 234);
}

.text-yellow-600 {
  color: rgb(217 119 6);
}

.text-red-600 {
  color: rgb(220 38 38);
}

/* Hover states optimized for touch */
@media (pointer: coarse) {
  .hover\:bg-gray-50:hover {
    background-color: rgb(249 250 251);
  }
  
  .hover\:bg-gray-100:hover {
    background-color: rgb(243 244 246);
  }
  
  .hover\:bg-green-700:hover {
    background-color: rgb(21 128 61);
  }
  
  .hover\:bg-blue-600:hover {
    background-color: rgb(37 99 235);
  }
}

/* Smooth transitions for mobile interactions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Text truncation for mobile */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Min width constraints */
.min-w-0 {
  min-width: 0;
}

/* Enhanced shadows for better mobile visual hierarchy */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.border-green-200 {
  border-color: rgb(187 247 208);
}

.bg-green-500 {
  background-color: rgb(34 197 94);
}

/* Card hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Loading and error states */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Form validation styling */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-blue-500:focus {
  --tw-ring-color: rgb(59 130 246);
}

.focus\:border-blue-500:focus {
  border-color: rgb(59 130 246);
}
</style>