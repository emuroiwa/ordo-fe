<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Create New Service</h1>
            <p class="mt-1 text-sm text-gray-600">
              Add a new service to your portfolio and start receiving bookings
            </p>
          </div>
          
          <NuxtLink
            to="/dashboard/services"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Form Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ServiceForm
        :categories="categories"
        :loading="loading"
        :error="error"
        @submit="handleCreateService"
        @cancel="handleCancel"
      />
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeSuccessModal"
    >
      <div class="bg-white rounded-lg p-6 max-w-md mx-4" @click.stop>
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 class="text-lg font-medium text-gray-900 mb-2">Service Created!</h3>
          <p class="text-sm text-gray-600 mb-6">
            Your service has been created successfully. It's now live and ready to receive bookings.
          </p>
          
          <div class="flex space-x-3">
            <button
              @click="viewService"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Service
            </button>
            <button
              @click="createAnother"
              class="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceForm } from '~/composables/useServices'

// Meta
definePageMeta({
  layout: 'dashboard',
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

// Redirect if not vendor
watch(currentRole, (role) => {
  if (role === 'customer') {
    router.push('/dashboard')
  }
}, { immediate: true })

// Fetch categories on mount
onMounted(async () => {
  try {
    categories.value = await fetchCategories()
  } catch (err) {
    console.error('Failed to fetch categories:', err)
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
</script>