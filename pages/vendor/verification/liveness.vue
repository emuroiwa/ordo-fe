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
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Liveness Verification</h1>
        <p class="text-lg text-gray-600">Take a selfie to verify your identity</p>
      </div>

      <!-- Progress Indicator -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Step 3 of 4</h2>
          <NuxtLink to="/vendor/verification" class="text-blue-600 hover:text-blue-800">
            ← Back to Overview
          </NuxtLink>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
        </div>
      </div>

      <!-- Camera/Upload Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div v-if="!selectedFile" class="text-center">
          <!-- Camera Preview -->
          <div class="mb-6">
            <div class="mx-auto w-80 h-80 rounded-lg overflow-hidden">
              <div 
                v-if="!showCamera"
                class="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg"
              >
                <div class="text-center">
                  <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p class="text-gray-600 text-lg">Camera preview will appear here</p>
                </div>
              </div>
              
              <video 
                ref="videoElement" 
                v-show="showCamera"
                autoplay 
                muted
                playsinline
                class="w-full h-full object-cover"
              ></video>
            </div>
          </div>

          <!-- Camera Controls -->
          <div class="flex flex-col items-center space-y-4">
            <button
              v-if="!showCamera"
              @click="startCamera"
              :disabled="startingCamera"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ startingCamera ? 'Starting Camera...' : 'Start Camera' }}
            </button>
            
            <div v-else class="flex space-x-4">
              <button
                @click="takePicture"
                :disabled="uploading"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                Take Photo
              </button>
              <button
                @click="stopCamera"
                class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Stop Camera
              </button>
            </div>
            
            <!-- Manual Upload Option -->
            <div class="text-gray-500 text-sm">
              <span>or</span>
            </div>
            
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="onFileSelect"
              class="hidden"
            >
            
            <button
              @click="$refs.fileInput.click()"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Upload from Device
            </button>
          </div>
        </div>

        <!-- Photo Preview -->
        <div v-else class="text-center">
          <div class="mx-auto w-80 h-80 rounded-lg overflow-hidden mb-6">
            <img 
              :src="photoPreview" 
              alt="Selfie preview"
              class="w-full h-full object-cover"
            >
          </div>
          
          <div class="flex justify-center space-x-4">
            <button
              @click="retakePhoto"
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Retake Photo
            </button>
            <button
              @click="uploadPhoto"
              :disabled="uploading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {{ uploading ? 'Uploading...' : 'Upload Photo' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-medium text-blue-900 mb-4">Photo Requirements</h3>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Face must be clearly visible and well-lit
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Look directly at the camera
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Remove sunglasses, hats, or face coverings
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            Ensure good lighting (avoid shadows)
          </li>
        </ul>
      </div>
    </div>

    <!-- Hidden canvas for photo capture -->
    <canvas ref="canvasElement" style="display: none;"></canvas>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

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
const startingCamera = ref(false)
const showCamera = ref(false)
const selectedFile = ref(null)
const photoPreview = ref('')
const stream = ref(null)

// Refs
const videoElement = ref(null)
const canvasElement = ref(null)
const fileInput = ref(null)

// Check vendor access
const checkVendorAccess = () => {
  if (process.client && user.value && !isVendor.value) {
    throw createError({
      statusCode: 403,
      statusMessage: 'This page is only accessible to vendors'
    })
  }
}

// Camera functions
const startCamera = async () => {
  startingCamera.value = true
  try {
    // Check if we're on HTTPS or localhost (required for camera access)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      throw new Error('Camera access requires HTTPS or localhost')
    }
    
    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera API not supported in this browser')
    }
    
    console.log('Requesting camera permission...')
    
    // Request camera permission and stream
    stream.value = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      },
      audio: false
    })
    
    console.log('Camera stream obtained:', stream.value)
    
    // Wait for video element to be available
    await nextTick()
    
    console.log('Video element:', videoElement.value)
    
    if (videoElement.value) {
      console.log('Setting video srcObject...')
      videoElement.value.srcObject = stream.value
      showCamera.value = true
      
      // Wait for video to be ready
      videoElement.value.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded, attempting to play...')
        videoElement.value.play().then(() => {
          console.log('Video playing successfully')
        }).catch(e => {
          console.error('Error playing video:', e)
        })
      })
      
      // Also try to play immediately
      setTimeout(() => {
        if (videoElement.value) {
          videoElement.value.play().catch(e => {
            console.log('Immediate play failed (normal):', e.message)
          })
        }
      }, 100)
    } else {
      console.error('Video element not found!')
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    
    let errorMessage = 'Unable to access camera. '
    
    if (error.name === 'NotAllowedError') {
      errorMessage += 'Camera permission denied. Please allow camera access and try again.'
    } else if (error.name === 'NotFoundError') {
      errorMessage += 'No camera found on this device.'
    } else if (error.name === 'NotSupportedError') {
      errorMessage += 'Camera not supported in this browser.'
    } else {
      errorMessage += 'Please check permissions or upload a photo manually.'
    }
    
    alert(errorMessage)
  } finally {
    startingCamera.value = false
  }
}

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  showCamera.value = false
}

const takePicture = () => {
  if (!videoElement.value || !canvasElement.value) return
  
  const canvas = canvasElement.value
  const video = videoElement.value
  
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)
  
  canvas.toBlob(blob => {
    selectedFile.value = new File([blob], 'selfie.jpg', { type: 'image/jpeg' })
    photoPreview.value = URL.createObjectURL(blob)
    stopCamera()
  }, 'image/jpeg', 0.8)
}

const onFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndSetFile(file)
  }
}

const validateAndSetFile = (file) => {
  // Check file size (5MB limit for photos)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    alert('File size must be less than 5MB')
    return
  }
  
  // Check file type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (!allowedTypes.includes(file.type)) {
    alert('Only PNG and JPG files are allowed')
    return
  }
  
  selectedFile.value = file
  photoPreview.value = URL.createObjectURL(file)
}

const retakePhoto = () => {
  selectedFile.value = null
  photoPreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Upload photo
const uploadPhoto = async () => {
  if (!selectedFile.value) return
  
  uploading.value = true
  try {
    const { token } = useAuth()
    const config = useRuntimeConfig()
    
    const formData = new FormData()
    formData.append('photo', selectedFile.value)
    
    const response = await $fetch(`${config.public.apiBase}/api/v1/vendor/verification/liveness-photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: formData
    })
    
    if (response.success) {
      // Redirect back to verification overview
      await navigateTo('/vendor/verification')
    }
  } catch (error) {
    console.error('Failed to upload photo:', error)
    alert('Failed to upload photo. Please try again.')
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

onUnmounted(() => {
  // Clean up camera stream
  stopCamera()
  
  // Clean up photo preview URL
  if (photoPreview.value) {
    URL.revokeObjectURL(photoPreview.value)
  }
})
</script>