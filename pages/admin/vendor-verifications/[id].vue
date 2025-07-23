<template>
  <NuxtLayout name="dashboard">
    <div v-if="loading" class="space-y-6">
      <!-- Loading skeleton -->
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <div v-else-if="!verification" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Verification not found</h3>
      <p class="text-gray-500 mb-4">The verification you're looking for doesn't exist.</p>
      <NuxtLink to="/admin/vendor-verifications" class="text-blue-600 hover:text-blue-800">
        ← Back to Verifications
      </NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <NuxtLink to="/admin/vendor-verifications" class="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-block">
            ← Back to Verifications
          </NuxtLink>
          <h1 class="text-2xl font-bold text-gray-900">Verification Review</h1>
          <p class="text-gray-600">{{ verification.user.name }} - {{ verification.user.business_name || verification.user.email }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span 
            :class="getStatusColor(verification.status)"
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
          >
            {{ getStatusText(verification.status) }}
          </span>
          <div v-if="verification.status !== 'approved' && verification.status !== 'rejected'" class="flex space-x-2">
            <button
              @click="showRejectModal = true"
              class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
            <button
              @click="showApproveModal = true"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - User Info & Progress -->
        <div class="lg:col-span-1 space-y-6">
          <!-- User Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Vendor Information</h3>
            
            <div class="flex items-center space-x-4 mb-6">
              <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img 
                  v-if="verification.user.avatar_url" 
                  :src="verification.user.avatar_url" 
                  :alt="verification.user.name"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xl font-bold">
                  {{ verification.user.name.charAt(0).toUpperCase() }}
                </div>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-gray-900">{{ verification.user.name }}</h4>
                <p class="text-gray-600">{{ verification.user.email }}</p>
              </div>
            </div>

            <div class="space-y-3">
              <div v-if="verification.user.business_name">
                <label class="text-sm font-medium text-gray-700">Business Name</label>
                <p class="text-gray-900">{{ verification.user.business_name }}</p>
              </div>
              <div v-if="verification.user.service_category">
                <label class="text-sm font-medium text-gray-700">Service Category</label>
                <p class="text-gray-900">{{ verification.user.service_category }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700">Submitted</label>
                <p class="text-gray-900">{{ formatDate(verification.created_at) }}</p>
              </div>
              <div v-if="verification.updated_at !== verification.created_at">
                <label class="text-sm font-medium text-gray-700">Last Updated</label>
                <p class="text-gray-900">{{ formatDate(verification.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Verification Progress -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Verification Progress</h3>
            
            <div class="space-y-4">
              <!-- Email Verification -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div :class="verification.email_verified_at ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Email Verification</p>
                    <p class="text-sm text-gray-500">{{ verification.email_verified_at ? formatDate(verification.email_verified_at) : 'Pending' }}</p>
                  </div>
                </div>
                <div v-if="verification.email_verified_at" class="text-green-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
              </div>

              <!-- Identity Verification -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div :class="verification.identity_verified_at ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2h6v1H7V4zm0 3h6v1H7V7zm0 3h6v1H7v-1z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Identity Verification</p>
                    <p class="text-sm text-gray-500">{{ verification.identity_verified_at ? formatDate(verification.identity_verified_at) : 'Pending' }}</p>
                  </div>
                </div>
                <div v-if="verification.identity_verified_at" class="text-green-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
              </div>

              <!-- Liveness Verification -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div :class="verification.liveness_verified_at ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Liveness Check</p>
                    <p class="text-sm text-gray-500">{{ verification.liveness_verified_at ? formatDate(verification.liveness_verified_at) : 'Pending' }}</p>
                  </div>
                </div>
                <div v-if="verification.liveness_verified_at" class="text-green-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
              </div>

              <!-- Business Verification -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div :class="verification.business_verified_at ? 'text-green-600' : 'text-gray-400'">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h2v4H7V6zm2 6H7v2h2v-2zm2-6h2v4h-2V6zm2 6h-2v2h2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">Business Documents</p>
                    <p class="text-sm text-gray-500">{{ verification.business_verified_at ? formatDate(verification.business_verified_at) : 'Pending' }}</p>
                  </div>
                </div>
                <div v-if="verification.business_verified_at" class="text-green-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Admin Notes -->
          <div v-if="verification.notes || verification.rejection_reason" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3>
            <div class="space-y-3">
              <div v-if="verification.rejection_reason" class="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm font-medium text-red-800 mb-1">Rejection Reason</p>
                <p class="text-red-700">{{ verification.rejection_reason }}</p>
              </div>
              <div v-if="verification.notes" class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-sm font-medium text-blue-800 mb-1">Notes</p>
                <p class="text-blue-700">{{ verification.notes }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Documents -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Uploaded Documents</h3>
            
            <div v-if="!verification.documents || verification.documents.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p class="text-gray-500">No documents uploaded yet</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="document in verification.documents"
                :key="document.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ getDocumentTypeLabel(document.type) }}</h4>
                    <p class="text-sm text-gray-500">{{ document.original_name }}</p>
                  </div>
                  <div class="text-right">
                    <span class="text-xs text-gray-500">{{ formatFileSize(document.file_size) }}</span>
                  </div>
                </div>

                <!-- Document Preview -->
                <div class="mb-4">
                  <div v-if="isImageFile(document.original_name)" class="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      :src="getDocumentUrl(document.file_path)" 
                      :alt="document.original_name"
                      class="w-full h-full object-contain"
                      @error="onImageError"
                    >
                  </div>
                  <div v-else class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div class="text-center">
                      <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      <p class="text-sm text-gray-500">{{ getFileExtension(document.original_name).toUpperCase() }} File</p>
                    </div>
                  </div>
                </div>

                <!-- Extracted Data -->
                <div v-if="document.extracted_data" class="mb-4">
                  <h5 class="text-sm font-medium text-gray-700 mb-2">Extracted Information</h5>
                  <div class="bg-gray-50 rounded-lg p-3 text-sm">
                    <pre class="whitespace-pre-wrap text-gray-700">{{ JSON.stringify(document.extracted_data, null, 2) }}</pre>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex space-x-2">
                  <a
                    :href="getDocumentUrl(document.file_path)"
                    target="_blank"
                    class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    View
                  </a>
                  <a
                    :href="getDocumentUrl(document.file_path)"
                    :download="document.original_name"
                    class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Download
                  </a>
                </div>
                
                <div class="mt-3 text-xs text-gray-500">
                  Uploaded {{ formatDate(document.uploaded_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Approval Modal -->
      <div v-if="showApproveModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Approve Verification</h3>
            <p class="text-sm text-gray-600 mb-4">
              Are you sure you want to approve this vendor verification?
            </p>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
              <textarea
                v-model="approvalNotes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any notes for this approval..."
              ></textarea>
            </div>
            <div class="flex space-x-3">
              <button
                @click="handleApprove"
                :disabled="approving"
                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {{ approving ? 'Approving...' : 'Approve' }}
              </button>
              <button
                @click="showApproveModal = false"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rejection Modal -->
      <div v-if="showRejectModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div class="mt-3">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Reject Verification</h3>
            <p class="text-sm text-gray-600 mb-4">
              Please provide a reason for rejecting this verification.
            </p>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
              <select
                v-model="rejectionReason"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              >
                <option value="">Select a reason</option>
                <option value="invalid_documents">Invalid or unclear documents</option>
                <option value="incomplete_information">Incomplete information provided</option>
                <option value="business_verification_failed">Business verification failed</option>
                <option value="identity_mismatch">Identity verification mismatch</option>
                <option value="liveness_check_failed">Liveness check failed</option>
                <option value="other">Other (specify in notes)</option>
              </select>
              <textarea
                v-model="rejectionNotes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes or details..."
              ></textarea>
            </div>
            <div class="flex space-x-3">
              <button
                @click="handleReject"
                :disabled="rejecting || !rejectionReason"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {{ rejecting ? 'Rejecting...' : 'Reject' }}
              </button>
              <button
                @click="showRejectModal = false"
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
import { ref, onMounted } from 'vue'

// Middleware
definePageMeta({
  middleware: ['auth', 'admin']
})

// Composables
const route = useRoute()
const { isAdmin } = useRole()
const { 
  getVerification,
  approveVerification,
  rejectVerification,
  getStatusColor,
  getStatusText,
  loading
} = useAdminVerification()

// Admin middleware will handle access control

// State
const verification = ref(null)
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const approvalNotes = ref('')
const rejectionReason = ref('')
const rejectionNotes = ref('')
const approving = ref(false)
const rejecting = ref(false)

// Methods
const handleApprove = async () => {
  approving.value = true
  try {
    await approveVerification(verification.value.id, approvalNotes.value)
    verification.value.status = 'approved'
    verification.value.approved_at = new Date().toISOString()
    verification.value.notes = approvalNotes.value
    showApproveModal.value = false
    approvalNotes.value = ''
  } catch (error) {
    console.error('Failed to approve verification:', error)
  } finally {
    approving.value = false
  }
}

const handleReject = async () => {
  rejecting.value = true
  try {
    await rejectVerification(verification.value.id, rejectionReason.value, rejectionNotes.value)
    verification.value.status = 'rejected'
    verification.value.rejected_at = new Date().toISOString()
    verification.value.rejection_reason = rejectionReason.value
    verification.value.notes = rejectionNotes.value
    showRejectModal.value = false
    rejectionReason.value = ''
    rejectionNotes.value = ''
  } catch (error) {
    console.error('Failed to reject verification:', error)
  } finally {
    rejecting.value = false
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getDocumentTypeLabel = (type) => {
  const labels = {
    national_id: 'National ID',
    passport: 'Passport',
    drivers_license: "Driver's License",
    business_license: 'Business License',
    tax_certificate: 'Tax Certificate'
  }
  return labels[type] || type
}

const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  const extension = getFileExtension(filename)
  return imageExtensions.includes(extension)
}

const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

const getDocumentUrl = (filePath) => {
  // This would typically be a signed URL or proper document serving endpoint
  return `/api/v1/documents/${filePath}`
}

const onImageError = (event) => {
  event.target.style.display = 'none'
  event.target.nextElementSibling?.classList.remove('hidden')
}

// Lifecycle
onMounted(async () => {
  const verificationId = route.params.id
  if (verificationId) {
    verification.value = await getVerification(verificationId)
  }
})
</script>