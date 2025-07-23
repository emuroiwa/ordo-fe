import { ref, computed, reactive } from 'vue'

export interface VerificationDocument {
  id: string
  type: 'national_id' | 'passport' | 'drivers_license' | 'business_license' | 'tax_certificate'
  original_name: string
  file_path: string
  file_size: number
  extracted_data?: any
  uploaded_at: string
}

export interface VendorVerification {
  id: string
  user_id: string
  status: 'pending' | 'email_verified' | 'documents_uploaded' | 'identity_verified' | 'liveness_verified' | 'business_verified' | 'approved' | 'rejected' | 'suspended'
  email_verified_at?: string
  identity_verified_at?: string
  liveness_verified_at?: string
  business_verified_at?: string
  approved_at?: string
  rejected_at?: string
  rejection_reason?: string
  notes?: string
  metadata?: any
  created_at: string
  updated_at: string
  user: {
    id: string
    name: string
    email: string
    business_name?: string
    service_category?: string
    avatar_url?: string
  }
  documents: VerificationDocument[]
}

export interface VerificationStats {
  total: number
  pending: number
  approved: number
  rejected: number
  in_progress: number
  today_submissions: number
  avg_processing_time: number
}

export interface VerificationFilters {
  status?: string
  search?: string
  date_range?: {
    start: string
    end: string
  }
  service_category?: string
}

export const useAdminVerification = () => {
  const { $fetch } = useNuxtApp()
  
  // State
  const verifications = ref<VendorVerification[]>([])
  const stats = ref<VerificationStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Filters
  const filters = reactive<VerificationFilters>({
    status: '',
    search: '',
    service_category: ''
  })
  
  // Pagination
  const pagination = reactive({
    page: 1,
    per_page: 20,
    total: 0,
    total_pages: 0
  })

  // Computed
  const filteredVerifications = computed(() => {
    let filtered = verifications.value
    
    if (filters.status) {
      filtered = filtered.filter(v => v.status === filters.status)
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(v => 
        v.user.name.toLowerCase().includes(search) ||
        v.user.email.toLowerCase().includes(search) ||
        v.user.business_name?.toLowerCase().includes(search)
      )
    }
    
    if (filters.service_category) {
      filtered = filtered.filter(v => v.user.service_category === filters.service_category)
    }
    
    return filtered
  })

  // Actions
  const fetchVerifications = async (page = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: pagination.per_page.toString(),
        ...filters
      })
      
      const response = await $fetch(`/api/v1/admin/vendor-verifications?${params.toString()}`)
      
      verifications.value = response.data
      pagination.page = response.current_page
      pagination.total = response.total
      pagination.total_pages = response.last_page
      
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch verifications'
      console.error('Failed to fetch verifications:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      const response = await $fetch('/api/v1/admin/vendor-verifications/statistics')
      stats.value = response
    } catch (err: any) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const getVerification = async (id: string): Promise<VendorVerification | null> => {
    loading.value = true
    error.value = null
    
    try {
      const verification = await $fetch(`/api/v1/admin/vendor-verifications/${id}`)
      return verification
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch verification'
      console.error('Failed to fetch verification:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const approveVerification = async (id: string, notes?: string) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`/api/v1/admin/vendor-verifications/${id}/approve`, {
        method: 'POST',
        body: { notes }
      })
      
      // Update local state
      const index = verifications.value.findIndex(v => v.id === id)
      if (index !== -1) {
        verifications.value[index].status = 'approved'
        verifications.value[index].approved_at = new Date().toISOString()
        verifications.value[index].notes = notes
      }
      
      // Refresh stats
      await fetchStats()
      
    } catch (err: any) {
      error.value = err.message || 'Failed to approve verification'
      console.error('Failed to approve verification:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectVerification = async (id: string, reason: string, notes?: string) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch(`/api/v1/admin/vendor-verifications/${id}/reject`, {
        method: 'POST',
        body: { reason, notes }
      })
      
      // Update local state
      const index = verifications.value.findIndex(v => v.id === id)
      if (index !== -1) {
        verifications.value[index].status = 'rejected'
        verifications.value[index].rejected_at = new Date().toISOString()
        verifications.value[index].rejection_reason = reason
        verifications.value[index].notes = notes
      }
      
      // Refresh stats
      await fetchStats()
      
    } catch (err: any) {
      error.value = err.message || 'Failed to reject verification'
      console.error('Failed to reject verification:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkApprove = async (ids: string[], notes?: string) => {
    loading.value = true
    error.value = null
    
    try {
      await $fetch('/api/v1/admin/vendor-verifications/bulk-approve', {
        method: 'POST',
        body: { verification_ids: ids, notes }
      })
      
      // Update local state
      ids.forEach(id => {
        const index = verifications.value.findIndex(v => v.id === id)
        if (index !== -1) {
          verifications.value[index].status = 'approved'
          verifications.value[index].approved_at = new Date().toISOString()
          verifications.value[index].notes = notes
        }
      })
      
      // Refresh stats
      await fetchStats()
      
    } catch (err: any) {
      error.value = err.message || 'Failed to bulk approve verifications'
      console.error('Failed to bulk approve verifications:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<VerificationFilters>) => {
    Object.assign(filters, newFilters)
    pagination.page = 1 // Reset to first page
    fetchVerifications(1)
  }

  const clearFilters = () => {
    Object.assign(filters, {
      status: '',
      search: '',
      service_category: ''
    })
    pagination.page = 1
    fetchVerifications(1)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      email_verified: 'bg-blue-100 text-blue-800',
      documents_uploaded: 'bg-indigo-100 text-indigo-800',
      identity_verified: 'bg-purple-100 text-purple-800',
      liveness_verified: 'bg-pink-100 text-pink-800',
      business_verified: 'bg-green-100 text-green-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Pending',
      email_verified: 'Email Verified',
      documents_uploaded: 'Documents Uploaded',
      identity_verified: 'Identity Verified',
      liveness_verified: 'Liveness Verified',
      business_verified: 'Business Verified',
      approved: 'Approved',
      rejected: 'Rejected',
      suspended: 'Suspended'
    }
    return texts[status] || status
  }

  return {
    // State
    verifications: readonly(verifications),
    stats: readonly(stats),
    loading: readonly(loading),
    error: readonly(error),
    filters,
    pagination,
    
    // Computed
    filteredVerifications,
    
    // Actions
    fetchVerifications,
    fetchStats,
    getVerification,
    approveVerification,
    rejectVerification,
    bulkApprove,
    updateFilters,
    clearFilters,
    
    // Utilities
    getStatusColor,
    getStatusText
  }
}