<template>
  <NuxtLayout name="dashboard">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading verification status...</p>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Vendor Verification</h1>
        <p class="text-lg text-gray-600">Complete your verification to start offering services on ORDO</p>
      </div>

      <!-- Verification Status Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Verification Status</h2>
          <span 
            :class="getStatusBadgeClass()" 
            class="px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ getStatusText() }}
          </span>
        </div>
        
        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{{ completedSteps }}/{{ totalSteps }} steps completed</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>

        <!-- Rejection Message -->
        <div v-if="verificationStatus === 'rejected'" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Verification Rejected</h3>
              <p class="text-sm text-red-700 mt-1">{{ rejectionReasonFromAPI || 'Please review and resubmit your documents.' }}</p>
            </div>
          </div>
        </div>

        <!-- Verification Steps -->
        <div class="space-y-4">
          <!-- Email Verification -->
          <div class="flex items-center p-4 border rounded-lg" :class="getStepBorderClass('email')">
            <div class="flex-shrink-0">
              <div :class="getStepIconClass('email')" class="w-10 h-10 rounded-full flex items-center justify-center">
                <svg v-if="verificationData?.steps?.email || verificationData?.email_verified_at" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-sm font-medium text-gray-900">Email Verification</h3>
              <p class="text-sm text-gray-500">
                {{ (verificationData?.steps?.email || verificationData?.email_verified_at) ? 'Email verified' : 'Verify your email address' }}
              </p>
            </div>
            <div v-if="!(verificationData?.steps?.email || verificationData?.email_verified_at)" class="ml-4">
              <button 
                @click="resendEmailVerification"
                :disabled="emailResending"
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {{ emailResending ? 'Sending...' : 'Resend Email' }}
              </button>
            </div>
          </div>

          <!-- Identity Verification -->
          <div class="flex items-center p-4 border rounded-lg" :class="getStepBorderClass('identity')">
            <div class="flex-shrink-0">
              <div :class="getStepIconClass('identity')" class="w-10 h-10 rounded-full flex items-center justify-center">
                <svg v-if="verificationData?.steps?.identity || verificationData?.identity_verified_at" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-sm font-medium text-gray-900">Identity Document</h3>
              <p class="text-sm text-gray-500">
                {{ (verificationData?.steps?.identity || verificationData?.identity_verified_at) ? 'Identity verified' : 'Upload your ID or passport' }}
              </p>
            </div>
            <div v-if="!(verificationData?.steps?.identity || verificationData?.identity_verified_at) && (verificationData?.steps?.email || verificationData?.email_verified_at)" class="ml-4">
              <NuxtLink 
                to="/vendor/verification/identity"
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Upload Document
              </NuxtLink>
            </div>
          </div>

          <!-- Liveness Verification -->
          <div class="flex items-center p-4 border rounded-lg" :class="getStepBorderClass('liveness')">
            <div class="flex-shrink-0">
              <div :class="getStepIconClass('liveness')" class="w-10 h-10 rounded-full flex items-center justify-center">
                <svg v-if="verificationData?.steps?.liveness || verificationData?.liveness_verified_at" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-sm font-medium text-gray-900">Liveness Check</h3>
              <p class="text-sm text-gray-500">
                {{ (verificationData?.steps?.liveness || verificationData?.liveness_verified_at) ? 'Liveness verified' : 'Take a selfie to verify your identity' }}
              </p>
            </div>
            <div v-if="!(verificationData?.steps?.liveness || verificationData?.liveness_verified_at) && (verificationData?.steps?.identity || verificationData?.identity_verified_at)" class="ml-4">
              <NuxtLink 
                to="/vendor/verification/liveness"
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Take Selfie
              </NuxtLink>
            </div>
          </div>

          <!-- Business Verification -->
          <div class="flex items-center p-4 border rounded-lg" :class="getStepBorderClass('business')">
            <div class="flex-shrink-0">
              <div :class="getStepIconClass('business')" class="w-10 h-10 rounded-full flex items-center justify-center">
                <svg v-if="verificationData?.steps?.business || verificationData?.business_verified_at" class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-sm font-medium text-gray-900">Business Documents</h3>
              <p class="text-sm text-gray-500">
                {{ (verificationData?.steps?.business || verificationData?.business_verified_at) ? 'Business verified' : 'Upload business registration and tax documents' }}
              </p>
            </div>
            <div v-if="!(verificationData?.steps?.business || verificationData?.business_verified_at) && (verificationData?.steps?.liveness || verificationData?.liveness_verified_at)" class="ml-4">
              <NuxtLink 
                to="/vendor/verification/business"
                class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Upload Documents
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Final Submission -->
        <div v-if="canSubmitForReview" class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-blue-900">Ready for Review</h3>
              <p class="text-sm text-blue-700">All verification steps completed. Submit for admin review.</p>
            </div>
            <button 
              @click="submitForReview"
              :disabled="submitting"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Submit for Review' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Help Section -->
      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-medium text-gray-900">Verification Requirements</h4>
            <ul class="mt-2 text-sm text-gray-600 space-y-1">
              <li>• Valid government-issued ID</li>
              <li>• Clear, recent selfie photo</li>
              <li>• Business registration documents</li>
              <li>• Tax compliance certificates</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Processing Time</h4>
            <p class="mt-2 text-sm text-gray-600">
              Verification typically takes 1-3 business days after submission. 
              You'll receive email updates on your verification status.
            </p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Have questions? Contact our support team at 
            <a href="mailto:support@ordo.co.za" class="text-blue-600 hover:text-blue-800">support@ordo.co.za</a>
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Middleware
definePageMeta({
  middleware: 'auth',
  ssr: false // Disable SSR for this page to avoid role check issues
})

// Composables
const { user, fetchUser } = useAuth()
const { isVendor, initializeRole } = useRole()

// State
const emailResending = ref(false)
const submitting = ref(false)
const loading = ref(true)
const verificationData = ref(null)
const documents = ref([])

// Check vendor role after component is mounted (client-side only)
const checkVendorAccess = () => {
  if (process.client && user.value && !isVendor.value) {
    throw createError({
      statusCode: 403,
      statusMessage: 'This page is only accessible to vendors'
    })
  }
}

// Computed
const verificationStatus = computed(() => verificationData.value?.status || user.value?.vendor_verification_status || 'unverified')

const completedSteps = computed(() => {
  if (!verificationData.value) return 0
  
  // Check if the API returns a 'completed' field directly
  if (verificationData.value.completed !== undefined) {
    return verificationData.value.completed
  }
  
  // Fallback to checking individual verification fields
  let count = 0
  if (verificationData.value.email_verified_at) count++
  if (verificationData.value.identity_verified_at) count++
  if (verificationData.value.liveness_verified_at) count++
  if (verificationData.value.business_verified_at) count++
  return count
})

const totalSteps = computed(() => verificationData.value?.total || 4)
const progressPercentage = computed(() => (completedSteps.value / totalSteps.value) * 100)

const canSubmitForReview = computed(() => {
  return completedSteps.value === totalSteps.value && 
         verificationStatus.value !== 'approved' && 
         verificationStatus.value !== 'pending'
})

const rejectionReasonFromAPI = computed(() => verificationData.value?.rejection_reason || '')

// Methods
const getStatusText = () => {
  const status = verificationStatus.value
  const statusMap = {
    unverified: 'Not Started',
    pending: 'Under Review',
    in_progress: 'In Progress',
    approved: 'Approved',
    rejected: 'Rejected',
    suspended: 'Suspended'
  }
  return statusMap[status] || 'Unknown'
}

const getStatusBadgeClass = () => {
  const status = verificationStatus.value
  const classMap = {
    unverified: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    suspended: 'bg-red-100 text-red-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getStepBorderClass = (step) => {
  const isCompleted = verificationData.value?.steps?.[step] || verificationData.value?.[`${step}_verified_at`]
  return isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
}

const getStepIconClass = (step) => {
  const isCompleted = verificationData.value?.steps?.[step] || verificationData.value?.[`${step}_verified_at`]
  return isCompleted ? 'bg-green-500' : 'bg-gray-100'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const resendEmailVerification = async () => {
  emailResending.value = true
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    const result = await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/resend-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    
    // Show success message
    if (result.success) {
      console.log('Email sent successfully:', result.message)
      // Refresh verification data
      await fetchVerificationStatus()
    }
  } catch (error) {
    console.error('Failed to resend email:', error)
  } finally {
    emailResending.value = false
  }
}

const submitForReview = async () => {
  submitting.value = true
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // Refresh both user and verification data
    await Promise.all([
      fetchUser(),
      fetchVerificationStatus()
    ])
  } catch (error) {
    console.error('Failed to submit for review:', error)
  } finally {
    submitting.value = false
  }
}

// API Functions
const fetchVerificationStatus = async () => {
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    const result = await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/status`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    // The API returns { success: true, data: {...} }, so we need to extract the data
    verificationData.value = result.data || result
  } catch (error) {
    console.error('Failed to fetch verification status:', error)
  }
}

const fetchDocuments = async () => {
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    const result = await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/documents`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json'
      }
    })
    documents.value = result.documents || []
  } catch (error) {
    console.error('Failed to fetch documents:', error)
  }
}

// Lifecycle
onMounted(async () => {
  try {
    // Refresh user data to get latest verification status
    await fetchUser()
    
    // Initialize role based on user data
    initializeRole()
    
    // Check vendor access after user data is loaded
    checkVendorAccess()
    
    // Fetch detailed verification data
    await Promise.all([
      fetchVerificationStatus(),
      fetchDocuments()
    ])
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load verification data:', error)
    loading.value = false
  }
})
</script>