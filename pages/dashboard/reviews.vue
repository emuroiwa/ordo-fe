<template>
  <NuxtLayout name="dashboard">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reviews
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Manage customer reviews and feedback for your services
          </p>
        </div>
      </div>

      <!-- Analytics Overview -->
      <div v-if="analytics" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <!-- Total Reviews -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Reviews</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ analytics.overview.total_reviews }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Average Rating -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ analytics.overview.average_rating }}★</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Recent (30d)</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ analytics.overview.recent_reviews }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Response Rate -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Response Rate</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatPercentage(analytics.overview.response_rate) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Needing Response -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Need Response</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ analytics.overview.reviews_needing_response }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <!-- Rating Filter -->
            <div>
              <label for="rating-filter" class="block text-sm font-medium text-gray-700">Rating</label>
              <select
                id="rating-filter"
                v-model="filters.rating"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <!-- Response Filter -->
            <div>
              <label for="response-filter" class="block text-sm font-medium text-gray-700">Response Status</label>
              <select
                id="response-filter"
                v-model="filters.has_response"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Reviews</option>
                <option value="true">With Response</option>
                <option value="false">No Response</option>
              </select>
            </div>

            <!-- Service Filter -->
            <div>
              <label for="service-filter" class="block text-sm font-medium text-gray-700">Service</label>
              <select
                id="service-filter"
                v-model="filters.service_id"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All Services</option>
                <option v-for="service in services" :key="service.id" :value="service.id">
                  {{ service.title }} ({{ service.reviews_count }})
                </option>
              </select>
            </div>

            <!-- Sort Filter -->
            <div>
              <label for="sort-filter" class="block text-sm font-medium text-gray-700">Sort By</label>
              <select
                id="sort-filter"
                v-model="filters.sort"
                @change="applyFilters"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating_high">Highest Rating</option>
                <option value="rating_low">Lowest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            <!-- Search -->
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
              <input
                id="search"
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="Search reviews..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
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
          <p class="text-gray-600">Loading reviews...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p class="text-lg font-medium">Error loading reviews</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
        </div>
        <button
          @click="loadReviews"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>

      <!-- Reviews List -->
      <div v-else-if="reviews.length > 0" class="space-y-4">
        <div v-for="review in reviews" :key="review.id" class="bg-white shadow rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <!-- Review Header -->
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">
                      {{ review.user.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium text-gray-900">{{ review.user.name }}</p>
                    <div class="flex items-center">
                      <span :class="getRatingColor(review.rating)" class="text-sm font-medium">
                        {{ getRatingStars(review.rating) }}
                      </span>
                      <span class="ml-1 text-sm text-gray-500">({{ review.rating }})</span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{{ review.service.title }}</span>
                    <span>•</span>
                    <span>{{ getTimeAgo(review.created_at) }}</span>
                    <span v-if="review.is_verified" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  v-if="!review.has_response"
                  @click="openResponseModal(review)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Respond
                </button>
                <div v-else class="flex items-center space-x-2">
                  <button
                    @click="editResponse(review)"
                    class="text-gray-400 hover:text-gray-600"
                    title="Edit response"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    @click="confirmDeleteResponse(review)"
                    class="text-gray-400 hover:text-red-600"
                    title="Delete response"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Review Content -->
            <div class="mt-4">
              <h4 v-if="review.title" class="text-sm font-medium text-gray-900">{{ review.title }}</h4>
              <p class="mt-1 text-sm text-gray-700">{{ review.comment }}</p>
            </div>

            <!-- Vendor Response -->
            <div v-if="review.has_response" class="mt-4 pl-4 border-l-2 border-blue-200 bg-blue-50 rounded-r-lg p-3">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-xs font-medium text-blue-900">Your Response</p>
                  <p class="mt-1 text-sm text-blue-800">{{ review.vendor_response }}</p>
                  <p class="mt-1 text-xs text-blue-600">{{ getTimeAgo(review.vendor_response_at!) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.last_page > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="changePage(pagination.current_page - 1)"
              :disabled="pagination.current_page <= 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="changePage(pagination.current_page + 1)"
              :disabled="pagination.current_page >= pagination.last_page"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (pagination.current_page - 1) * pagination.per_page + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="changePage(pagination.current_page - 1)"
                  :disabled="pagination.current_page <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  @click="changePage(pagination.current_page + 1)"
                  :disabled="pagination.current_page >= pagination.last_page"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by encouraging customers to leave reviews after their bookings.</p>
      </div>

      <!-- Response Modal -->
      <div v-if="responseModal.show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeResponseModal"></div>
          
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ responseModal.isEditing ? 'Edit Response' : 'Respond to Review' }}
                  </h3>
                  <div class="mt-2">
                    <div v-if="responseModal.review" class="bg-gray-50 rounded-lg p-3 mb-4">
                      <div class="flex items-center space-x-2 mb-2">
                        <span class="font-medium">{{ responseModal.review.user.name }}</span>
                        <span :class="getRatingColor(responseModal.review.rating)">
                          {{ getRatingStars(responseModal.review.rating) }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-700">{{ responseModal.review.comment }}</p>
                    </div>
                    <label for="response" class="block text-sm font-medium text-gray-700">Your Response</label>
                    <textarea
                      id="response"
                      v-model="responseModal.response"
                      rows="4"
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Write a professional response..."
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500">{{ responseModal.response.length }}/1000 characters</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="submitResponse"
                :disabled="!responseModal.response.trim() || responseModal.submitting"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ responseModal.submitting ? 'Submitting...' : (responseModal.isEditing ? 'Update Response' : 'Submit Response') }}
              </button>
              <button
                @click="closeResponseModal"
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
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { debounce } from 'lodash-es'

// Set layout and middleware
definePageMeta({
  layout: false,
  middleware: 'auth'
})

// Use composables
const { currentRole } = useRole()
const { 
  reviews, 
  analytics, 
  services, 
  pagination,
  loading, 
  analyticsLoading,
  servicesLoading,
  error,
  fetchReviews,
  fetchAnalytics,
  fetchServices,
  respondToReview,
  updateResponse,
  deleteResponse,
  formatPercentage,
  getRatingStars,
  getRatingColor,
  getTimeAgo
} = useReviews()

// State
const searchQuery = ref('')
const filters = reactive({
  rating: '',
  has_response: '',
  service_id: '',
  sort: 'newest',
  per_page: 20,
  page: 1
})

const responseModal = reactive({
  show: false,
  review: null as any,
  response: '',
  isEditing: false,
  submitting: false
})

// Methods
const loadReviews = async () => {
  try {
    await fetchReviews(filters)
  } catch (err) {
    console.error('Failed to load reviews:', err)
  }
}

const loadAnalytics = async () => {
  try {
    await fetchAnalytics()
  } catch (err) {
    console.error('Failed to load analytics:', err)
  }
}

const loadServices = async () => {
  try {
    await fetchServices()
  } catch (err) {
    console.error('Failed to load services:', err)
  }
}

const applyFilters = () => {
  filters.page = 1
  loadReviews()
}

const debouncedSearch = debounce(() => {
  filters.page = 1
  loadReviews()
}, 500)

const changePage = (page: number) => {
  if (page >= 1 && pagination.value && page <= pagination.value.last_page) {
    filters.page = page
    loadReviews()
  }
}

const openResponseModal = (review: any) => {
  responseModal.show = true
  responseModal.review = review
  responseModal.response = review.vendor_response || ''
  responseModal.isEditing = false
  responseModal.submitting = false
}

const editResponse = (review: any) => {
  responseModal.show = true
  responseModal.review = review
  responseModal.response = review.vendor_response || ''
  responseModal.isEditing = true
  responseModal.submitting = false
}

const closeResponseModal = () => {
  responseModal.show = false
  responseModal.review = null
  responseModal.response = ''
  responseModal.isEditing = false
  responseModal.submitting = false
}

const submitResponse = async () => {
  if (!responseModal.response.trim() || !responseModal.review) return

  responseModal.submitting = true

  try {
    if (responseModal.isEditing) {
      await updateResponse(responseModal.review.id, { response: responseModal.response })
    } else {
      await respondToReview(responseModal.review.id, { response: responseModal.response })
    }
    
    closeResponseModal()
    // Refresh analytics to update response rate
    loadAnalytics()
  } catch (err) {
    console.error('Failed to submit response:', err)
  } finally {
    responseModal.submitting = false
  }
}

const confirmDeleteResponse = async (review: any) => {
  if (!confirm('Are you sure you want to delete this response?')) return

  try {
    await deleteResponse(review.id)
    // Refresh analytics to update response rate
    loadAnalytics()
  } catch (err) {
    console.error('Failed to delete response:', err)
  }
}

// Watch search query
watch(searchQuery, () => {
  filters.search = searchQuery.value
  debouncedSearch()
})

// Load data on mount
onMounted(() => {
  loadReviews()
  loadAnalytics()
  loadServices()
})

// Set page title
useHead({
  title: 'Reviews - ORDO'
})
</script>