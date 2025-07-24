<template>
  <NuxtLayout name="dashboard">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Business Verification</h1>
        <p class="text-lg text-gray-600">Upload your business registration and tax documents</p>
      </div>

      <!-- Progress Indicator -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Step 4 of 4</h2>
          <NuxtLink to="/vendor/verification" class="text-blue-600 hover:text-blue-800">
            ← Back to Overview
          </NuxtLink>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
        </div>
      </div>

      <!-- Upload Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <form @submit.prevent="uploadDocuments">
          <!-- Business Registration Document -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Business Registration Document</h3>
            
            <div 
              @drop="(e) => onDrop(e, 'registration')"
              @dragover="onDragOver"
              @dragleave="onDragLeave"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              ]"
            >
              <input
                ref="registrationInput"
                type="file"
                accept="image/*,.pdf"
                @change="(e) => onFileSelect(e, 'registration')"
                class="hidden"
                required
              >
              
              <div v-if="!documents.registration">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <p class="text-gray-600 mb-2">
                  <button 
                    type="button"
                    @click="$refs.registrationInput.click()"
                    class="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Click to upload
                  </button>
                  or drag and drop
                </p>
                <p class="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
              
              <div v-else class="flex items-center justify-center space-x-4">
                <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">{{ documents.registration.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatFileSize(documents.registration.size) }}</p>
                </div>
                <button 
                  type="button"
                  @click="removeFile('registration')"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Tax Compliance Certificate -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Tax Compliance Certificate</h3>
            
            <div 
              @drop="(e) => onDrop(e, 'tax')"
              @dragover="onDragOver"
              @dragleave="onDragLeave"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              ]"
            >
              <input
                ref="taxInput"
                type="file"
                accept="image/*,.pdf"
                @change="(e) => onFileSelect(e, 'tax')"
                class="hidden"
                required
              >
              
              <div v-if="!documents.tax">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <p class="text-gray-600 mb-2">
                  <button 
                    type="button"
                    @click="$refs.taxInput.click()"
                    class="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Click to upload
                  </button>
                  or drag and drop
                </p>
                <p class="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
              
              <div v-else class="flex items-center justify-center space-x-4">
                <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">{{ documents.tax.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatFileSize(documents.tax.size) }}</p>
                </div>
                <button 
                  type="button"
                  @click="removeFile('tax')"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Optional: VAT Registration -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-2">VAT Registration Certificate (Optional)</h3>
            <p class="text-sm text-gray-600 mb-4">Only required if your business is VAT registered</p>
            
            <div 
              @drop="(e) => onDrop(e, 'vat')"
              @dragover="onDragOver"
              @dragleave="onDragLeave"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              ]"
            >
              <input
                ref="vatInput"
                type="file"
                accept="image/*,.pdf"
                @change="(e) => onFileSelect(e, 'vat')"
                class="hidden"
              >
              
              <div v-if="!documents.vat">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
                <p class="text-gray-600 mb-2">
                  <button 
                    type="button"
                    @click="$refs.vatInput.click()"
                    class="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Click to upload
                  </button>
                  or drag and drop
                </p>
                <p class="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </div>
              
              <div v-else class="flex items-center justify-center space-x-4">
                <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <p class="font-medium text-gray-900">{{ documents.vat.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatFileSize(documents.vat.size) }}</p>
                </div>
                <button 
                  type="button"
                  @click="removeFile('vat')"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-between">
            <NuxtLink 
              to="/vendor/verification"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </NuxtLink>
            <button
              type="submit"
              :disabled="uploading || !documents.registration || !documents.tax"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ uploading ? 'Uploading...' : 'Upload Documents' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Requirements -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-medium text-blue-900 mb-4">Document Requirements</h3>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            All documents must be current and valid
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Documents must be clear and legible
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Business name must match your profile information
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Supported formats: PNG, JPG, PDF (max 10MB each)
          </li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Middleware
definePageMeta({
  middleware: 'auth',
  ssr: false
})

// Composables
const { user } = useAuth()
const { isVendor, initializeRole } = useRole()

// State
const loading = ref(false)
const uploading = ref(false)
const isDragging = ref(false)

const documents = reactive({
  registration: null,
  tax: null,
  vat: null
})

// Check vendor access
const checkVendorAccess = () => {
  if (process.client && user.value && !isVendor.value) {
    throw createError({
      statusCode: 403,
      statusMessage: 'This page is only accessible to vendors'
    })
  }
}

// File handling
const onFileSelect = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file, type)
  }
}

const onDrop = (event, type) => {
  event.preventDefault()
  isDragging.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    validateAndSetFile(files[0], type)
  }
}

const onDragOver = (event) => {
  event.preventDefault()
  isDragging.value = true
}

const onDragLeave = (event) => {
  event.preventDefault()
  isDragging.value = false
}

const validateAndSetFile = (file, type) => {
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    alert('File size must be less than 10MB')
    return
  }
  
  // Check file type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    alert('Only PNG, JPG, and PDF files are allowed')
    return
  }
  
  documents[type] = file
}

const removeFile = (type) => {
  documents[type] = null
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Upload documents
const uploadDocuments = async () => {
  if (!documents.registration || !documents.tax) return
  
  uploading.value = true
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    
    // Upload business registration document
    const registrationFormData = new FormData()
    registrationFormData.append('document', documents.registration)
    registrationFormData.append('document_type', 'business_registration')
    
    await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/business-document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: registrationFormData
    })
    
    // Upload tax certificate
    const taxFormData = new FormData()
    taxFormData.append('document', documents.tax)
    taxFormData.append('document_type', 'tax_certificate')
    
    await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/business-document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: taxFormData
    })
    
    // Upload VAT certificate if provided
    if (documents.vat) {
      const vatFormData = new FormData()
      vatFormData.append('document', documents.vat)
      vatFormData.append('document_type', 'professional_license')
      
      await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/business-document`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
        },
        body: vatFormData
      })
    }
    
    // Redirect back to verification overview after all uploads complete
    await navigateTo('/vendor/verification')
  } catch (error) {
    console.error('Failed to upload documents:', error)
    
    // Show specific error message if available
    if (error.data?.message) {
      alert(error.data.message)
    } else if (error.data?.errors) {
      const errorMessages = Object.values(error.data.errors).flat()
      alert(errorMessages.join('\n'))
    } else {
      alert('Failed to upload documents. Please try again.')
    }
  } finally {
    uploading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  try {
    // Initialize role
    initializeRole()
    
    // Check vendor access
    checkVendorAccess()
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load page:', error)
    loading.value = false
  }
})
</script>