<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Earnings</h1>
          <p class="text-gray-600">Track your earnings and manage payouts</p>
        </div>
        
        <div class="flex items-center space-x-3">
          <!-- Date Range Picker -->
          <div class="flex items-center space-x-2">
            <input
              v-model="dateRange.start_date"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :max="dateRange.end_date || today"
            >
            <span class="text-gray-500">to</span>
            <input
              v-model="dateRange.end_date"
              type="date"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :min="dateRange.start_date"
              :max="today"
            >
          </div>
          
          <!-- Request Payout Button -->
          <button
            @click="showPayoutModal = true"
            :disabled="!earnings?.overview.available_balance || earnings.overview.available_balance < 10"
            class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            Request Payout
          </button>
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
        <!-- Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Available Balance -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Available Balance</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(earnings.overview.available_balance) }}</p>
                <p class="text-xs text-green-600">Ready to withdraw</p>
              </div>
            </div>
          </div>

          <!-- This Month's Earnings -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">This Month</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(earnings.overview.earnings_this_month) }}</p>
                <p class="text-xs" :class="getGrowthDirection(earnings.overview.growth_percentage) === 'up' ? 'text-green-600' : getGrowthDirection(earnings.overview.growth_percentage) === 'down' ? 'text-red-600' : 'text-gray-600'">
                  <span v-if="getGrowthDirection(earnings.overview.growth_percentage) === 'up'">↗ +</span>
                  <span v-else-if="getGrowthDirection(earnings.overview.growth_percentage) === 'down'">↘ </span>
                  <span v-else>→ </span>
                  {{ formatPercentage(Math.abs(earnings.overview.growth_percentage)) }} vs last month
                </p>
              </div>
            </div>
          </div>

          <!-- Total Earnings -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Total Earnings</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(earnings.overview.total_earnings) }}</p>
                <p class="text-xs text-gray-600">All time</p>
              </div>
            </div>
          </div>

          <!-- Pending Payouts -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-full">
                <p class="text-sm font-medium text-gray-500">Pending Payouts</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(earnings.overview.pending_payouts) }}</p>
                <p class="text-xs text-yellow-600">Processing</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Average Order Value</h3>
            <p class="text-3xl font-bold text-blue-600">{{ formatCurrency(earnings.overview.average_order_value) }}</p>
            <p class="text-sm text-gray-600 mt-1">Per booking</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Completion Rate</h3>
            <p class="text-3xl font-bold text-green-600">{{ formatPercentage(earnings.overview.completion_rate * 100) }}</p>
            <p class="text-sm text-gray-600 mt-1">Success rate</p>
          </div>
          
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Total Payouts</h3>
            <p class="text-3xl font-bold text-purple-600">{{ formatCurrency(earnings.overview.total_payouts) }}</p>
            <p class="text-sm text-gray-600 mt-1">All time withdrawals</p>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Earnings Trend Chart -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Daily Earnings Trend</h3>
            <div class="h-64 flex items-end justify-between space-x-1">
              <div
                v-for="(point, index) in earnings.trends.earnings.slice(-14)"
                :key="index"
                class="bg-green-500 rounded-t flex-1 min-w-0 hover:bg-green-600 transition-colors cursor-pointer"
                :style="{ height: `${(point.value / Math.max(...earnings.trends.earnings.map(p => p.value))) * 100}%` }"
                :title="`${point.label}: ${formatCurrency(point.value)}`"
              ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>{{ earnings.trends.earnings[earnings.trends.earnings.length - 14]?.label || '' }}</span>
              <span>{{ earnings.trends.earnings[earnings.trends.earnings.length - 1]?.label || '' }}</span>
            </div>
          </div>

          <!-- Monthly Breakdown Chart -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Breakdown</h3>
            <div class="h-64 flex items-end justify-between space-x-2">
              <div
                v-for="(month, index) in earnings.trends.monthly.slice(-6)"
                :key="index"
                class="flex-1 min-w-0 space-y-1"
              >
                <div class="text-center">
                  <div
                    class="bg-blue-500 rounded-t w-full hover:bg-blue-600 transition-colors cursor-pointer"
                    :style="{ height: `${(month.earnings / Math.max(...earnings.trends.monthly.map(m => m.earnings))) * 200}px` }"
                    :title="`${month.label}: ${formatCurrency(month.earnings)}`"
                  ></div>
                  <div class="text-xs text-gray-500 mt-1">{{ month.label.split(' ')[0] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tables Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Transactions -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">Recent Transactions</h3>
              <button
                @click="showTransactionsModal = true"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in earnings.transactions.recent.slice(0, 5)" :key="transaction.id">
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
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Top Earning Services</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Earnings</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="service in earnings.services.top_earning.slice(0, 5)" :key="service.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ service.title }}</div>
                      <div class="text-sm text-gray-500">{{ service.bookings }} bookings</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
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

    <!-- Payout Request Modal -->
    <div v-if="showPayoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full mx-4">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Request Payout</h3>
        </div>
        <form @submit.prevent="handlePayoutRequest" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
              <input
                v-model.number="payoutForm.amount"
                type="number"
                min="10"
                :max="earnings?.overview.available_balance || 0"
                step="0.01"
                class="pl-8 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter amount"
                required
              >
            </div>
            <p class="text-xs text-gray-500 mt-1">Available: {{ formatCurrency(earnings?.overview.available_balance || 0) }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payout Method</label>
            <select v-model="payoutForm.payout_method" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
              <option value="">Select method</option>
              <option v-for="method in payoutMethods.filter(m => m.available)" :key="method.id" :value="method.id">
                {{ method.name }} ({{ formatPercentage(method.fee_percentage) }} fee)
              </option>
            </select>
          </div>

          <!-- Bank Details (shown when bank_transfer is selected) -->
          <div v-if="payoutForm.payout_method === 'bank_transfer'" class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
              <input
                v-model="payoutForm.bank_details.account_holder"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                v-model="payoutForm.bank_details.account_number"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                v-model="payoutForm.bank_details.bank_name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Branch Code</label>
              <input
                v-model="payoutForm.bank_details.branch_code"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>
          </div>

          <div class="flex items-center justify-between pt-4">
            <button
              type="button"
              @click="showPayoutModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="payoutLoading"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              <span v-if="payoutLoading">Processing...</span>
              <span v-else>Request Payout</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Transactions Modal -->
    <div v-if="showTransactionsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Transaction History</h3>
          <button @click="showTransactionsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[70vh]">
          <!-- Transaction filters and list would go here -->
          <p class="text-gray-600">Full transaction history with filtering capabilities would be implemented here.</p>
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