import { ref, type Ref } from 'vue'

// Type definitions
export interface Payment {
  id: string
  booking_id: string
  customer_id: string
  vendor_id: string
  service_id: string
  amount: number
  platform_fee: number
  vendor_amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'disputed'
  payment_method: 'card' | 'bank_transfer' | 'wallet' | 'cash'
  payment_provider?: string
  provider_payment_id?: string
  provider_customer_id?: string
  processed_at?: string
  refunded_at?: string
  refund_amount?: number
  refund_reason?: string
  metadata?: any
  provider_response?: any
  created_at: string
  updated_at: string
  formatted_amount: string
  formatted_created_at: string
  time_ago: string
  status_color: string
  is_refundable: boolean
  customer?: {
    id: string
    name: string
    email: string
  }
  vendor?: {
    id: string
    name: string
    email: string
  }
  service?: {
    id: string
    title: string
    slug: string
  }
  booking?: {
    id: string
    status: string
  }
}

export interface Transaction {
  id: string
  user_id: string
  payment_id?: string
  type: 'payment' | 'refund' | 'payout' | 'fee' | 'adjustment'
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  reference: string
  description: string
  metadata?: any
  processed_at?: string
  created_at: string
  updated_at: string
  formatted_amount: string
  formatted_created_at: string
  time_ago: string
  status_color: string
  type_color: string
  payment?: Payment
}

export interface PaymentMethod {
  id: string
  user_id: string
  type: 'card' | 'bank_account' | 'wallet'
  provider?: string
  provider_method_id?: string
  is_default: boolean
  last_four?: string
  brand?: string
  account_holder_name?: string
  bank_name?: string
  exp_month?: number
  exp_year?: number
  metadata?: any
  is_active: boolean
  verified_at?: string
  created_at: string
  updated_at: string
  display_name: string
  is_expired: boolean
  formatted_expiry?: string
  type_icon: string
}

export interface VendorPaymentsOverview {
  this_month_revenue: number
  this_month_payments: number
  pending_payments: number
  growth_percentage: number
}

export interface CustomerPaymentsOverview {
  this_month_spent: number
  this_month_payments: number
  pending_payments: number
  growth_percentage: number
}

export interface PaymentMethodBreakdown {
  payment_method: string
  count: number
  total: number
}

export interface MonthlyData {
  month: string
  label: string
  revenue?: number
  amount?: number
}

export interface VendorPaymentsData {
  overview: VendorPaymentsOverview
  recent_payments: Payment[]
  monthly_revenue: MonthlyData[]
  payment_methods: PaymentMethodBreakdown[]
}

export interface CustomerPaymentsData {
  overview: CustomerPaymentsOverview
  recent_payments: Payment[]
  monthly_spending: MonthlyData[]
  payment_methods: PaymentMethodBreakdown[]
}

export type PaymentsData = VendorPaymentsData | CustomerPaymentsData

export interface PaymentFilters {
  status?: string
  payment_method?: string
  start_date?: string
  end_date?: string
  search?: string
  per_page?: number
  page?: number
}

export interface TransactionFilters {
  type?: string
  status?: string
  start_date?: string
  end_date?: string
  per_page?: number
  page?: number
}

export interface PaymentMethodData {
  type: 'card' | 'bank_account' | 'wallet'
  provider?: string
  provider_method_id?: string
  last_four: string
  brand?: string
  account_holder_name?: string
  bank_name?: string
  exp_month?: number
  exp_year?: number
  is_default?: boolean
}

export interface PaginationData {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export const usePayments = () => {
  const config = useRuntimeConfig()
  
  // Helper function to make API calls with proper error handling
  const makeApiCall = async (url: string, options: any = {}) => {
    // Get auth token from cookie
    const tokenCookie = useCookie('auth-token')
    
    // Prepare headers with authentication
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...options.headers
    }
    
    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    
    // Add authorization header if token exists
    if (tokenCookie.value) {
      headers['Authorization'] = `Bearer ${tokenCookie.value}`
    } else {
      throw new Error('Authentication token not found')
    }
    
    // Use global $fetch that should be available in Nuxt 3
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    })
  }

  // State
  const paymentsData: Ref<PaymentsData | null> = ref(null)
  const payments: Ref<Payment[]> = ref([])
  const transactions: Ref<Transaction[]> = ref([])
  const paymentMethods: Ref<PaymentMethod[]> = ref([])
  const paymentsPagination: Ref<PaginationData | null> = ref(null)
  const transactionsPagination: Ref<PaginationData | null> = ref(null)
  const loading = ref(false)
  const paymentsLoading = ref(false)
  const transactionsLoading = ref(false)
  const paymentMethodsLoading = ref(false)
  const error: Ref<string | null> = ref(null)

  // Fetch payments dashboard data
  const fetchPaymentsData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/payments')
      
      if (response.success) {
        paymentsData.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch payments data')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch payments data'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch payment history with filters
  const fetchPaymentHistory = async (filters: PaymentFilters = {}) => {
    paymentsLoading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const response = await makeApiCall(`/api/v1/payments/history?${queryParams.toString()}`)
      
      if (response.success) {
        payments.value = response.data
        paymentsPagination.value = response.pagination
      } else {
        throw new Error(response.message || 'Failed to fetch payment history')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch payment history'
      throw err
    } finally {
      paymentsLoading.value = false
    }
  }

  // Fetch transaction history with filters
  const fetchTransactionHistory = async (filters: TransactionFilters = {}) => {
    transactionsLoading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })

      const response = await makeApiCall(`/api/v1/payments/transactions?${queryParams.toString()}`)
      
      if (response.success) {
        transactions.value = response.data
        transactionsPagination.value = response.pagination
      } else {
        throw new Error(response.message || 'Failed to fetch transaction history')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch transaction history'
      throw err
    } finally {
      transactionsLoading.value = false
    }
  }

  // Fetch payment methods
  const fetchPaymentMethods = async () => {
    paymentMethodsLoading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/payments/payment-methods')
      
      if (response.success) {
        paymentMethods.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch payment methods')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch payment methods'
      throw err
    } finally {
      paymentMethodsLoading.value = false
    }
  }

  // Add payment method
  const addPaymentMethod = async (paymentMethodData: PaymentMethodData): Promise<PaymentMethod> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/payments/payment-methods', {
        method: 'POST',
        body: JSON.stringify(paymentMethodData)
      })
      
      if (response.success) {
        // Add to local state
        paymentMethods.value.push(response.data)
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to add payment method')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to add payment method'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Set default payment method
  const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<PaymentMethod> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/payments/payment-methods/${paymentMethodId}/default`, {
        method: 'PUT'
      })
      
      if (response.success) {
        // Update local state
        paymentMethods.value = paymentMethods.value.map(pm => ({
          ...pm,
          is_default: pm.id === paymentMethodId
        }))
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to set default payment method')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to set default payment method'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete payment method
  const deletePaymentMethod = async (paymentMethodId: string): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall(`/api/v1/payments/payment-methods/${paymentMethodId}`, {
        method: 'DELETE'
      })
      
      if (response.success) {
        // Remove from local state
        paymentMethods.value = paymentMethods.value.filter(pm => pm.id !== paymentMethodId)
      } else {
        throw new Error(response.message || 'Failed to delete payment method')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to delete payment method'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Helper function to format currency
  const formatCurrency = (amount: number, currency = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Helper function to format percentage
  const formatPercentage = (value: number, decimals = 1) => {
    return `${value.toFixed(decimals)}%`
  }

  // Helper function to get payment status color
  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'refunded': return 'text-gray-600 bg-gray-100'
      case 'disputed': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Helper function to get transaction type color
  const getTransactionTypeColor = (type: string): string => {
    switch (type) {
      case 'payment': return 'text-green-600'
      case 'refund': return 'text-blue-600'
      case 'payout': return 'text-purple-600'
      case 'fee': return 'text-red-600'
      case 'adjustment': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  // Helper function to get payment method icon
  const getPaymentMethodIcon = (method: string): string => {
    switch (method) {
      case 'card': return 'credit-card'
      case 'bank_transfer': return 'building-library'
      case 'wallet': return 'wallet'
      case 'cash': return 'banknotes'
      default: return 'banknotes'
    }
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Helper function to get time ago
  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  return {
    // State
    paymentsData,
    payments,
    transactions,
    paymentMethods,
    paymentsPagination,
    transactionsPagination,
    loading,
    paymentsLoading,
    transactionsLoading,
    paymentMethodsLoading,
    error,

    // Methods
    fetchPaymentsData,
    fetchPaymentHistory,
    fetchTransactionHistory,
    fetchPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,

    // Helpers
    formatCurrency,
    formatPercentage,
    getPaymentStatusColor,
    getTransactionTypeColor,
    getPaymentMethodIcon,
    formatDate,
    getTimeAgo
  }
}