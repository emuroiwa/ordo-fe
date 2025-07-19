<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loadingService" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading service...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-4">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
        <p class="text-sm text-gray-600 mb-4">
          The service you're looking for doesn't exist or you don't have permission to edit it.
        </p>
        <NuxtLink
          to="/dashboard/services"
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Services
        </NuxtLink>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="service">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Edit Service</h1>
              <p class="mt-1 text-sm text-gray-600">
                Update your service details and settings
              </p>
            </div>
            
            <div class="flex items-center space-x-3">
              <!-- Service Status -->
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(service.status)"
              >
                {{ service.status.charAt(0).toUpperCase() + service.status.slice(1) }}
              </span>

              <!-- View Service -->
              <NuxtLink
                :to="`/services/${service.full_slug}`"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live
              </NuxtLink>

              <!-- Back Button -->
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
      </div>

      <!-- Form Container -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceForm
          :service="service"
          :categories="categories"
          :loading="loading"
          :error="error"
          @submit="handleUpdateService"
          @cancel="handleCancel"
        />
      </div>

      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50"
      >
        <div class="flex items-center">
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Service updated successfully!
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

// Composables
const { fetchServiceById, updateService, fetchCategories, service, error, loading } = useServices()
const { currentRole } = useRole()
const route = useRoute()
const router = useRouter()

// State
const categories = ref([])
const loadingService = ref(true)
const fetchError = ref('')
const showSuccessMessage = ref(false)

// Head
useHead({
  title: computed(() => service.value ? `Edit ${service.value.title} - Dashboard` : 'Edit Service - Dashboard')
})

// Redirect if not vendor
watch(currentRole, (role) => {
  if (role === 'customer') {
    router.push('/dashboard')
  }
}, { immediate: true })

// Fetch service and categories on mount
onMounted(async () => {
  try {
    const serviceId = route.params.id as string
    
    // Fetch both in parallel
    await Promise.all([
      fetchServiceById(serviceId).catch(err => {
        fetchError.value = err.data?.message || 'Service not found'
        throw err
      }),
      fetchCategories().then(result => {
        categories.value = result
      }).catch(err => {
        console.error('Failed to fetch categories:', err)
      })
    ])
  } catch (err) {
    console.error('Failed to fetch service:', err)
  } finally {
    loadingService.value = false
  }
})

// Methods
const handleUpdateService = async (serviceData: ServiceForm) => {
  try {
    const serviceId = route.params.id as string
    await updateService(serviceId, serviceData)
    
    // Show success message
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
    // Scroll to top
    window.scrollTo(0, 0)
  } catch (err) {
    console.error('Failed to update service:', err)
    // Error is handled by the composable and shown in the form
  }
}

const handleCancel = () => {
  router.push('/dashboard/services')
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    case 'paused':
      return 'bg-yellow-100 text-yellow-800'
    case 'archived':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>