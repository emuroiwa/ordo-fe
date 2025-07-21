<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {{ currentRole === 'vendor' ? 'Payments' : 'Payment History' }}
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            {{ currentRole === 'vendor' 
              ? 'Track your earnings and payment transactions' 
              : 'View your payment history and manage payment methods' 
            }}
          </p>
        </div>
        <div class="mt-4 flex md:ml-4 md:mt-0">
          <button
            @click="showPaymentMethodModal = true"
            class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg class="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Payment Method
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
          <p class="text-gray-600">Loading payments data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading payments data</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadPaymentsData"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="paymentsData">
        <!-- Overview Stats -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <!-- Revenue/Spending -->
          <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      {{ currentRole === 'vendor' ? 'This Month Revenue' : 'This Month Spent' }}
                    </dt>
                    <dd class="text-2xl font-bold text-gray-900">
                      {{ formatCurrency(currentRole === 'vendor' ? vendorData?.overview.this_month_revenue || 0 : customerData?.overview.this_month_spent || 0) }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex items-center text-sm">
                  <span 
                    :class="getGrowthColor(growthPercentage)"
                    class="font-medium"
                  >
                    {{ getGrowthDirection(growthPercentage) }}{{ formatPercentage(Math.abs(growthPercentage)) }}
                  </span>
                  <span class="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Payments -->
          <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">This Month Payments</dt>
                    <dd class="text-2xl font-bold text-gray-900">
                      {{ paymentsData.overview.this_month_payments || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Payments -->
          <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                    <dd class="text-2xl font-bold text-gray-900">
                      {{ paymentsData.overview.pending_payments || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div class="p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Payment Methods</dt>
                    <dd class="text-2xl font-bold text-gray-900">
                      {{ paymentMethods.length }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Recent Payments -->
          <div class="bg-white shadow-sm rounded-lg border border-gray-200">
            <div class="px-6 py-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Payments</h3>
                <button
                  @click="showPaymentHistory = true"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All
                </button>
              </div>
              
              <div v-if="paymentsData.recent_payments?.length > 0" class="space-y-3">
                <div 
                  v-for="payment in paymentsData.recent_payments" 
                  :key="payment.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        {{ currentRole === 'vendor' ? payment.customer?.name : payment.vendor?.name }}
                      </p>
                      <p class="text-xs text-gray-500">{{ payment.service?.title }}</p>
                      <p class="text-xs text-gray-500">{{ getTimeAgo(payment.created_at) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">
                      {{ formatCurrency(currentRole === 'vendor' ? payment.vendor_amount : payment.amount) }}
                    </p>
                    <span 
                      :class="getPaymentStatusColor(payment.status)"
                      class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    >
                      {{ payment.status }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 9l-7 7-4-4"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No payments yet</h3>
                <p class="mt-1 text-sm text-gray-500">Payments will appear here once you start transacting.</p>
              </div>
            </div>
          </div>

          <!-- Payment Methods -->
          <div class="bg-white shadow-sm rounded-lg border border-gray-200">
            <div class="px-6 py-5">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Payment Methods</h3>
                <button
                  @click="showPaymentMethodModal = true"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  Add New
                </button>
              </div>
              
              <div v-if="paymentMethods.length > 0" class="space-y-3">
                <div 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ method.display_name }}</p>
                      <p v-if="method.formatted_expiry" class="text-xs text-gray-500">Expires {{ method.formatted_expiry }}</p>
                      <span v-if="method.is_default" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      v-if="!method.is_default"
                      @click="setDefaultMethod(method.id)"
                      class="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Set Default
                    </button>
                    <button
                      @click="confirmDeleteMethod(method)"
                      class="text-xs text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                <p class="mt-1 text-sm text-gray-500">Add a payment method to get started.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Trends Chart -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200 mb-8">
          <div class="px-6 py-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              {{ currentRole === 'vendor' ? 'Monthly Revenue' : 'Monthly Spending' }}
            </h3>
            
            <div class="h-64 flex items-end justify-between space-x-1">
              <div
                v-for="(data, index) in monthlyData"
                :key="index"
                class="bg-blue-500 rounded-t flex-1 min-w-0 hover:bg-blue-600 transition-colors cursor-pointer"
                :style="{ height: `${getChartHeight(data)}%` }"
                :title="`${data.label}: ${formatCurrency(getDataValue(data))}`"
              ></div>
            </div>
            
            <div class="flex justify-between mt-2 text-xs text-gray-500">
              <span>{{ monthlyData[0]?.label || '' }}</span>
              <span>{{ monthlyData[monthlyData.length - 1]?.label || '' }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Method Breakdown -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <div class="px-6 py-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Payment Method Breakdown</h3>
            
            <div v-if="paymentsData.payment_methods?.length > 0" class="space-y-4">
              <div 
                v-for="method in paymentsData.payment_methods" 
                :key="method.payment_method"
                class="flex items-center justify-between"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ method.payment_method.replace('_', ' ') }}
                  </span>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ formatCurrency(method.total) }}</p>
                  <p class="text-xs text-gray-500">{{ method.count }} payments</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <p class="text-sm text-gray-500">No payment data available yet.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method Modal -->
      <div v-if="showPaymentMethodModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closePaymentMethodModal"></div>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Add Payment Method</h3>
                  
                  <form @submit.prevent="addPaymentMethodSubmit" class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Type</label>
                      <select v-model="newPaymentMethod.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="card">Credit/Debit Card</option>
                        <option value="bank_account">Bank Account</option>
                        <option value="wallet">Digital Wallet</option>
                      </select>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Last Four Digits</label>
                      <input 
                        v-model="newPaymentMethod.last_four" 
                        type="text" 
                        maxlength="4"
                        pattern="[0-9]{4}"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="1234"
                        required
                      >
                    </div>
                    
                    <div v-if="newPaymentMethod.type === 'card'">
                      <label class="block text-sm font-medium text-gray-700">Brand</label>
                      <select v-model="newPaymentMethod.brand" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="amex">American Express</option>
                        <option value="discover">Discover</option>
                      </select>
                    </div>
                    
                    <div v-if="newPaymentMethod.type === 'bank_account'">
                      <label class="block text-sm font-medium text-gray-700">Bank Name</label>
                      <input 
                        v-model="newPaymentMethod.bank_name" 
                        type="text" 
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="First National Bank"
                      >
                    </div>
                    
                    <div>
                      <label class="flex items-center">
                        <input v-model="newPaymentMethod.is_default" type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        <span class="ml-2 text-sm text-gray-700">Set as default payment method</span>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="addPaymentMethodSubmit"
                :disabled="paymentMethodsLoading || !newPaymentMethod.last_four"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ paymentMethodsLoading ? 'Adding...' : 'Add Payment Method' }}
              </button>
              <button
                @click="closePaymentMethodModal"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'

// Set layout and middleware
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { 
  paymentsData, 
  paymentMethods, 
  loading, 
  paymentMethodsLoading,
  error,
  fetchPaymentsData,
  fetchPaymentMethods,
  addPaymentMethod,
  setDefaultPaymentMethod,
  deletePaymentMethod,
  formatCurrency,
  formatPercentage,
  getPaymentStatusColor,
  getTimeAgo
} = usePayments()

// State
const showPaymentMethodModal = ref(false)
const showPaymentHistory = ref(false)
const newPaymentMethod = reactive({
  type: 'card' as 'card' | 'bank_account' | 'wallet',
  last_four: '',
  brand: 'visa',
  bank_name: '',
  is_default: false
})

// Computed properties
const vendorData = computed(() => {
  return currentRole.value === 'vendor' ? paymentsData.value as any : null
})

const customerData = computed(() => {
  return currentRole.value === 'customer' ? paymentsData.value as any : null
})

const growthPercentage = computed(() => {
  return paymentsData.value?.overview?.growth_percentage || 0
})

const monthlyData = computed(() => {
  if (currentRole.value === 'vendor') {
    return vendorData.value?.monthly_revenue || []
  } else {
    return customerData.value?.monthly_spending || []
  }
})

// Methods
const loadPaymentsData = async () => {
  try {
    await fetchPaymentsData()
    await fetchPaymentMethods()
  } catch (err) {
    console.error('Failed to load payments data:', err)
  }
}

const getGrowthDirection = (percentage: number): string => {
  if (percentage > 0) return '↗ +'
  if (percentage < 0) return '↘ '
  return '→ '
}

const getGrowthColor = (percentage: number): string => {
  if (percentage > 0) return 'text-green-600'
  if (percentage < 0) return 'text-red-600'
  return 'text-gray-600'
}

const getDataValue = (data: any): number => {
  return currentRole.value === 'vendor' ? data.revenue || 0 : data.amount || 0
}

const getChartHeight = (data: any): number => {
  const maxValue = Math.max(...monthlyData.value.map(getDataValue))
  if (maxValue === 0) return 0
  return (getDataValue(data) / maxValue) * 100
}

const closePaymentMethodModal = () => {
  showPaymentMethodModal.value = false
  // Reset form
  Object.assign(newPaymentMethod, {
    type: 'card',
    last_four: '',
    brand: 'visa',
    bank_name: '',
    is_default: false
  })
}

const addPaymentMethodSubmit = async () => {
  if (!newPaymentMethod.last_four) return

  try {
    await addPaymentMethod({
      type: newPaymentMethod.type,
      last_four: newPaymentMethod.last_four,
      brand: newPaymentMethod.type === 'card' ? newPaymentMethod.brand : undefined,
      bank_name: newPaymentMethod.type === 'bank_account' ? newPaymentMethod.bank_name : undefined,
      is_default: newPaymentMethod.is_default
    })
    
    closePaymentMethodModal()
  } catch (err) {
    console.error('Failed to add payment method:', err)
  }
}

const setDefaultMethod = async (paymentMethodId: string) => {
  try {
    await setDefaultPaymentMethod(paymentMethodId)
  } catch (err) {
    console.error('Failed to set default payment method:', err)
  }
}

const confirmDeleteMethod = async (method: any) => {
  if (!confirm(`Are you sure you want to delete ${method.display_name}?`)) return

  try {
    await deletePaymentMethod(method.id)
  } catch (err) {
    console.error('Failed to delete payment method:', err)
  }
}

// Load data on mount
onMounted(() => {
  loadPaymentsData()
})

// Set page title
useHead({
  title: 'Payments - ORDO'
})
</script>