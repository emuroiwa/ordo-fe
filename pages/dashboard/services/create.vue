<template>
  <!-- Desktop View -->
  <NuxtLayout v-if="!isMobile" name="dashboard">
    <div>
      <!-- Page Header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Create New Service</h1>
            <p class="mt-1 text-sm sm:text-base text-gray-600">
              Add a new service to your portfolio and start receiving bookings
            </p>
          </div>
          
          <NuxtLink
            to="/dashboard/services"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 touch-target"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </NuxtLink>
        </div>
      </div>

      <!-- Desktop Form Container -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 sm:p-8">
          <ServiceForm
            :categories="categories"
            :loading="loading"
            :error="error"
            @submit="handleCreateService"
            @cancel="handleCancel"
          />
        </div>
      </div>

      <!-- Success Modal -->
      <div
        v-if="showSuccessModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="closeSuccessModal"
      >
        <div class="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4" @click.stop>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Service Created!</h3>
            <p class="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
              Your service has been created successfully. It's now live and ready to receive bookings.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="viewService"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium touch-target"
              >
                View Service
              </button>
              <button
                @click="createAnother"
                class="flex-1 px-4 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium touch-target"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>

  <!-- Mobile View - Full Screen Wizard -->
  <ServiceCreationWizard 
    v-else
    @close="handleCancel"
    @success="handleWizardSuccess"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ServiceForm } from '~/composables/useServices'

// Meta
definePageMeta({
  middleware: 'auth'
})

// Head
useHead({
  title: 'Create Service - Dashboard'
})

// Composables
const { createService, fetchCategories, error, loading } = useServices()
const { currentRole } = useRole()
const router = useRouter()

// State
const categories = ref([])
const showSuccessModal = ref(false)
const createdService = ref(null)
const isMobile = ref(false)

// Detect mobile device
const detectMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}

// Redirect if not vendor
watch(currentRole, (role: string) => {
  if (role === 'customer') {
    router.push('/dashboard')
  }
}, { immediate: true })

// Fetch categories on mount
onMounted(async () => {
  try {
    detectMobile()
    categories.value = await fetchCategories()
    
    // Listen for window resize to update mobile detection
    if (process.client) {
      window.addEventListener('resize', detectMobile)
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
})

// Cleanup resize listener
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', detectMobile)
  }
})

// Methods
const handleCreateService = async (serviceData: ServiceForm) => {
  try {
    const result = await createService(serviceData)
    createdService.value = result.service
    showSuccessModal.value = true
  } catch (err) {
    console.error('Failed to create service:', err)
    // Error is handled by the composable and shown in the form
  }
}

const handleCancel = () => {
  router.push('/dashboard/services')
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push('/dashboard/services')
}

const viewService = () => {
  if (createdService.value?.full_slug) {
    router.push(`/services/${createdService.value.full_slug}`)
  } else {
    router.push('/dashboard/services')
  }
}

const createAnother = () => {
  showSuccessModal.value = false
  createdService.value = null
  // Stay on the same page to create another service
  window.scrollTo(0, 0)
}

const handleWizardSuccess = (service) => {
  createdService.value = service
  // Navigate directly or show a different success state for mobile
  router.push('/dashboard/services')
}
</script>

<style scoped>
/* Touch targets for mobile */
.touch-target {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  /* Better touch targets on mobile */
  .touch-target {
    min-height: 48px;
  }
  
  /* Ensure proper spacing */
  .gap-4 > * + * {
    margin-top: 1rem;
  }
  
  /* Modal adjustments */
  .fixed.inset-0 {
    padding: 1rem;
  }
}

/* Smooth transitions */
button {
  transition: all 0.2s ease-in-out;
}

/* Focus states for accessibility */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>