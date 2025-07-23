<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="border-b border-gray-200 pb-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Vendor Verifications</h1>
            <p class="text-gray-600">Review and manage vendor verification requests</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              v-if="selectedVerifications.length > 0"
              @click="showBulkApprovalModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Bulk Approve ({{ selectedVerifications.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Name, email, business..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="filters.status"
              @change="updateFilters({ status: filters.status })"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="email_verified">Email Verified</option>
              <option value="documents_uploaded">Documents Uploaded</option>
              <option value="identity_verified">Identity Verified</option>
              <option value="liveness_verified">Liveness Verified</option>
              <option value="business_verified">Business Verified</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <!-- Service Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="filters.service_category"
              @change="updateFilters({ service_category: filters.service_category })"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="beauty">Beauty & Wellness</option>
              <option value="home_services">Home Services</option>
              <option value="automotive">Automotive</option>
              <option value="technology">Technology</option>
              <option value="fitness">Fitness & Health</option>
              <option value="events">Events & Entertainment</option>
              <option value="business">Business Services</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Clear Filters -->
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Verifications List -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Verifications ({{ pagination.total }})
            </h3>
            <div class="flex items-center space-x-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  @change="toggleSelectAll"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <span class="ml-2 text-sm text-gray-600">Select All</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="loading" class="p-6">
          <div class="space-y-4">
            <div v-for="i in 5" :key="i" class="animate-pulse">
              <div class="flex items-center space-x-4">
                <div class="w-4 h-4 bg-gray-200 rounded"></div>
                <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div class="flex-1">
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div class="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="filteredVerifications.length === 0" class="p-12 text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
          <p class="text-gray-500">Try adjusting your filters or check back later.</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="verification in filteredVerifications"
            :key="verification.id"
            class="p-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <!-- Checkbox -->
              <input
                type="checkbox"
                :value="verification.id"
                v-model="selectedVerifications"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >

              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img 
                  v-if="verification.user.avatar_url" 
                  :src="verification.user.avatar_url" 
                  :alt="verification.user.name"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold">
                  {{ verification.user.name.charAt(0).toUpperCase() }}
                </div>
              </div>

              <!-- User Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <h4 class="text-lg font-semibold text-gray-900">{{ verification.user.name }}</h4>
                    <p class="text-sm text-gray-600">{{ verification.user.email }}</p>
                    <p v-if="verification.user.business_name" class="text-sm text-gray-500">
                      {{ verification.user.business_name }}
                    </p>
                    <p v-if="verification.user.service_category" class="text-xs text-gray-400 mt-1">
                      {{ verification.user.service_category }}
                    </p>
                  </div>
                  <div class="text-right">
                    <span 
                      :class="getStatusColor(verification.status)"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ getStatusText(verification.status) }}
                    </span>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ formatDate(verification.created_at) }}
                    </p>
                  </div>
                </div>

                <!-- Progress Indicators -->
                <div class="mt-3 flex items-center space-x-4 text-xs">
                  <div class="flex items-center">
                    <div :class="verification.email_verified_at ? 'text-green-600' : 'text-gray-400'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <span class="ml-1 text-gray-600">Email</span>
                  </div>
                  <div class="flex items-center">
                    <div :class="verification.identity_verified_at ? 'text-green-600' : 'text-gray-400'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2h6v1H7V4zm0 3h6v1H7V7zm0 3h6v1H7v-1z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="ml-1 text-gray-600">ID</span>
                  </div>
                  <div class="flex items-center">
                    <div :class="verification.liveness_verified_at ? 'text-green-600' : 'text-gray-400'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="ml-1 text-gray-600">Face</span>
                  </div>
                  <div class="flex items-center">
                    <div :class="verification.business_verified_at ? 'text-green-600' : 'text-gray-400'">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h2v4H7V6zm2 6H7v2h2v-2zm2-6h2v4h-2V6zm2 6h-2v2h2v-2z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="ml-1 text-gray-600">Business</span>
                  </div>
                </div>

                <!-- Documents Count -->
                <div class="mt-2 text-xs text-gray-500">
                  {{ verification.documents?.length || 0 }} documents uploaded
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2">
                <NuxtLink
                  :to="`/admin/vendor-verifications/${verification.id}`"
                  class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Review
                </NuxtLink>
                <button
                  v-if="verification.status !== 'approved' && verification.status !== 'rejected'"
                  @click="quickApprove(verification.id)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.total_pages > 1" class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ ((pagination.page - 1) * pagination.per_page) + 1 }} to 
              {{ Math.min(pagination.page * pagination.per_page, pagination.total) }} of 
              {{ pagination.total }} results
            </div>
            <div class="flex space-x-2">
              <button
                @click="changePage(pagination.page - 1)"
                :disabled="pagination.page <= 1"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="changePage(pagination.page + 1)"
                :disabled="pagination.page >= pagination.total_pages"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bulk Approval Modal -->
      <div v-if="showBulkApprovalModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Bulk Approve Verifications</h3>
            <p class="text-sm text-gray-600 mb-4">
              Are you sure you want to approve {{ selectedVerifications.length }} verifications?
            </p>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
              <textarea
                v-model="bulkApprovalNotes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes for these approvals..."
              ></textarea>
            </div>
            <div class="flex space-x-3">
              <button
                @click="handleBulkApprove"
                :disabled="bulkApproving"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {{ bulkApproving ? 'Approving...' : 'Approve All' }}
              </button>
              <button
                @click="showBulkApprovalModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
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

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Middleware
definePageMeta({
  middleware: ['auth', 'admin']
})

// Composables
const { isAdmin } = useRole()
const { 
  verifications,
  loading,
  filters,
  pagination,
  filteredVerifications,
  fetchVerifications,
  updateFilters,
  clearFilters,
  getStatusColor,
  getStatusText,
  approveVerification,
  bulkApprove
} = useAdminVerification()

// Admin middleware will handle access control

// Local state
const searchQuery = ref('')
const selectedVerifications = ref([])
const showBulkApprovalModal = ref(false)
const bulkApprovalNotes = ref('')
const bulkApproving = ref(false)

// Computed
const allSelected = computed(() => {
  return filteredVerifications.value.length > 0 && 
         selectedVerifications.value.length === filteredVerifications.value.length
})

// Methods
const handleSearch = () => {
  updateFilters({ search: searchQuery.value })
}

const toggleSelectAll = (event) => {
  if (event.target.checked) {
    selectedVerifications.value = filteredVerifications.value.map(v => v.id)
  } else {
    selectedVerifications.value = []
  }
}

const changePage = (page) => {
  fetchVerifications(page)
}

const quickApprove = async (id) => {
  try {
    await approveVerification(id)
    // Remove from selected list if it was selected
    selectedVerifications.value = selectedVerifications.value.filter(selectedId => selectedId !== id)
  } catch (error) {
    // Error handling could be improved with toast notifications
    console.error('Failed to approve verification:', error)
  }
}

const handleBulkApprove = async () => {
  bulkApproving.value = true
  try {
    await bulkApprove(selectedVerifications.value, bulkApprovalNotes.value)
    selectedVerifications.value = []
    bulkApprovalNotes.value = ''
    showBulkApprovalModal.value = false
  } catch (error) {
    console.error('Failed to bulk approve verifications:', error)
  } finally {
    bulkApproving.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  fetchVerifications(1)
})

// Watch for query params
const route = useRoute()
watch(() => route.query, (newQuery) => {
  if (newQuery.status) {
    filters.status = newQuery.status
    updateFilters({ status: newQuery.status })
  }
}, { immediate: true })
</script>