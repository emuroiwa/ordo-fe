import { ref, type Ref } from 'vue'

// Type definitions
export interface EarningsOverview {
  total_earnings: number
  available_balance: number
  pending_payouts: number
  total_payouts: number
  earnings_this_month: number
  growth_percentage: number
  average_order_value: number
  completion_rate: number
}

export interface EarningsTrendData {
  date: string
  value: number
  label: string
}

export interface MonthlyBreakdown {
  month: string
  label: string
  earnings: number
  bookings: number
  commission: number
}

export interface Transaction {
  id: string
  type: 'earning' | 'payout'
  amount: number
  description: string
  status: 'completed' | 'pending' | 'processing' | 'failed'
  date: string
  service_name?: string
}

export interface ServiceEarning {
  service_id: string
  service_name: string
  bookings: number
  gross_earnings: number
  net_earnings: number
  commission: number
}

export interface PayoutMethod {
  id: string
  name: string
  description: string
  processing_time: string
  fee_percentage: number
  minimum_amount: number
  maximum_amount: number
  available: boolean
}

export interface PayoutRequest {
  amount: number
  payout_method: string
  bank_details?: {
    account_number: string
    account_holder: string
    bank_name: string
    branch_code: string
  }
}

export interface PayoutResponse {
  success: boolean
  payout_id: string
  amount: number
  processing_fee: number
  net_amount: number
  estimated_arrival: string
  status: string
}

export interface EarningsData {
  overview: EarningsOverview
  trends: {
    earnings: EarningsTrendData[]
    monthly: MonthlyBreakdown[]
  }
  transactions: {
    recent: Transaction[]
    total_count: number
  }
  services: {
    earnings_breakdown: ServiceEarning[]
    top_earning: ServiceEarning[]
  }
  period: {
    start_date: string
    end_date: string
  }
}

export interface DateRange {
  start_date?: string
  end_date?: string
}

export interface TransactionFilters {
  type?: 'earning' | 'payout' | 'all'
  status?: 'completed' | 'pending' | 'processing' | 'failed'
  start_date?: string
  end_date?: string
  per_page?: number
  page?: number
}

export const useEarnings = () => {
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
  const earnings: Ref<EarningsData | null> = ref(null)
  const summary: Ref<EarningsOverview | null> = ref(null)
  const transactions: Ref<Transaction[]> = ref([])
  const payoutMethods: Ref<PayoutMethod[]> = ref([])
  const loading = ref(false)
  const error: Ref<string | null> = ref(null)
  const transactionsPagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0
  })

  // Fetch comprehensive earnings data
  const fetchEarnings = async (dateRange: DateRange = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(dateRange).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(`/api/v1/earnings?${queryParams.toString()}`)
      
      if (response.success) {
        earnings.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch earnings')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch earnings'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch earnings summary for dashboard widgets
  const fetchSummary = async () => {
    try {
      const response = await makeApiCall('/api/v1/earnings/summary')
      
      if (response.success) {
        summary.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch earnings summary')
      }

      return response.data
    } catch (err: any) {
      console.error('Failed to fetch earnings summary:', err)
      throw err
    }
  }

  // Fetch transaction history with filtering
  const fetchTransactions = async (filters: TransactionFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const queryParams = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })

      const response = await makeApiCall(`/api/v1/earnings/transactions?${queryParams.toString()}`)
      
      if (response.success) {
        transactions.value = response.data
        transactionsPagination.value = response.pagination
      } else {
        throw new Error(response.message || 'Failed to fetch transactions')
      }

      return response.data
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch transactions'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch available payout methods
  const fetchPayoutMethods = async () => {
    try {
      const response = await makeApiCall('/api/v1/earnings/payout-methods')
      
      if (response.success) {
        payoutMethods.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch payout methods')
      }

      return response.data
    } catch (err: any) {
      console.error('Failed to fetch payout methods:', err)
      throw err
    }
  }

  // Request a payout
  const requestPayout = async (payoutData: PayoutRequest): Promise<PayoutResponse> => {
    loading.value = true
    error.value = null

    try {
      const response = await makeApiCall('/api/v1/earnings/request-payout', {
        method: 'POST',
        body: JSON.stringify(payoutData)
      })

      if (response.success) {
        // Refresh earnings data after successful payout request
        await fetchEarnings()
        return response.data
      } else {
        throw new Error(response.message || 'Failed to request payout')
      }
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to request payout'
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

  // Helper function to format large numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // Helper function to get transaction status color
  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Helper function to get transaction type icon
  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
      case 'payout':
        return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
      default:
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  }

  // Helper function to calculate growth direction
  const getGrowthDirection = (percentage: number): 'up' | 'down' | 'stable' => {
    if (percentage > 2) return 'up'
    if (percentage < -2) return 'down'
    return 'stable'
  }

  return {
    // State
    earnings,
    summary,
    transactions,
    payoutMethods,
    loading,
    error,
    transactionsPagination,

    // Methods
    fetchEarnings,
    fetchSummary,
    fetchTransactions,
    fetchPayoutMethods,
    requestPayout,

    // Helpers
    formatCurrency,
    formatPercentage,
    formatNumber,
    getTransactionStatusColor,
    getTransactionTypeIcon,
    getGrowthDirection
  }
}