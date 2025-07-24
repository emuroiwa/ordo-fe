<template>
  <div v-if="showBanner" class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-4 mb-6">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 flex-1">
        <h3 class="text-sm font-medium text-orange-800">
          Vendor Verification Required
        </h3>
        <div class="mt-2 text-sm text-orange-700">
          <p>{{ getStatusMessage() }}</p>
        </div>
        <div class="mt-4">
          <div class="flex space-x-2">
            <NuxtLink 
              to="/vendor/verification"
              class="bg-orange-100 px-3 py-2 rounded-md text-sm font-medium text-orange-800 hover:bg-orange-200 transition-colors"
            >
              {{ getActionText() }}
            </NuxtLink>
            <button 
              v-if="canDismiss"
              @click="dismiss"
              class="bg-white px-3 py-2 rounded-md text-sm font-medium text-orange-800 hover:bg-gray-50 transition-colors border border-orange-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 ml-4">
        <button 
          @click="dismiss"
          class="bg-orange-50 rounded-md p-1.5 text-orange-400 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Progress Bar -->
    <div v-if="verificationProgress" class="mt-4">
      <div class="flex justify-between text-xs text-orange-700 mb-1">
        <span>Verification Progress</span>
        <span>{{ verificationProgress.completed }}/{{ verificationProgress.total }} steps</span>
      </div>
      <div class="w-full bg-orange-200 rounded-full h-2">
        <div 
          class="bg-orange-600 h-2 rounded-full transition-all duration-300" 
          :style="{ width: `${(verificationProgress.completed / verificationProgress.total) * 100}%` }"
        ></div>
      </div>
      <div class="flex items-center justify-between mt-2 text-xs text-orange-600">
        <div class="flex space-x-4">
          <span :class="verificationProgress.steps.email ? 'text-green-600' : 'text-gray-400'">
            ✓ Email
          </span>
          <span :class="verificationProgress.steps.identity ? 'text-green-600' : 'text-gray-400'">
            ✓ Identity
          </span>
          <span :class="verificationProgress.steps.liveness ? 'text-green-600' : 'text-gray-400'">
            ✓ Liveness
          </span>
          <span :class="verificationProgress.steps.business ? 'text-green-600' : 'text-gray-400'">
            ✓ Business
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  force: {
    type: Boolean,
    default: false
  }
})

// Composables
const { isVendor } = useRole()

// State
const dismissed = ref(false)

// Computed
const showBanner = computed(() => {
  if (dismissed.value && !props.force) return false
  if (!isVendor.value) return false
  
  const status = props.user?.vendor_verification_status
  return status !== 'approved'
})

const canDismiss = computed(() => {
  const status = props.user?.vendor_verification_status
  return status === 'pending' || status === 'in_progress'
})

const verificationProgress = computed(() => {
  if (!props.user) return null
  
  const steps = {
    email: props.user.email_verified,
    identity: props.user.identity_verified,
    liveness: props.user.liveness_verified,
    business: props.user.business_verified
  }
  
  const completed = Object.values(steps).filter(Boolean).length
  const total = 4
  
  return {
    steps,
    completed,
    total
  }
})

// Methods
const getStatusMessage = () => {
  const status = props.user?.vendor_verification_status
  
  switch (status) {
    case 'unverified':
      return 'You need to complete vendor verification before you can offer services on ORDO.'
    case 'pending':
      return 'Your verification is being processed. Complete any remaining steps to speed up the process.'
    case 'in_progress':
      return 'Complete the remaining verification steps to start offering your services.'
    case 'rejected':
      return 'Your verification was rejected. Please review the feedback and resubmit your application.'
    case 'suspended':
      return 'Your vendor account has been suspended. Please contact support for assistance.'
    default:
      return 'Please complete vendor verification to access all features.'
  }
}

const getActionText = () => {
  const status = props.user?.vendor_verification_status
  
  switch (status) {
    case 'unverified':
      return 'Start Verification'
    case 'pending':
    case 'in_progress':
      return 'Continue Verification'
    case 'rejected':
      return 'Review & Resubmit'
    case 'suspended':
      return 'Contact Support'
    default:
      return 'Complete Verification'
  }
}

const dismiss = () => {
  dismissed.value = true
}

// Auto-show for critical statuses
onMounted(() => {
  const status = props.user?.vendor_verification_status
  if (status === 'rejected' || status === 'suspended') {
    dismissed.value = false
  }
})
</script>