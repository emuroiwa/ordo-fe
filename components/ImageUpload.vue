<template>
  <div class="image-upload">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      
      <!-- Upload Area -->
      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
        :class="{ 'border-blue-500 bg-blue-50': isDragOver }"
        @drop="handleDrop"
        @dragover.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        @click="openFileDialog"
      >
        <input
          ref="fileInput"
          type="file"
          :multiple="multiple"
          accept="image/jpeg,image/png,image/webp"
          class="hidden"
          @change="handleFileSelect"
        >
        
        <div v-if="!hasImages" class="text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="text-lg font-medium">{{ multiple ? 'Upload images' : 'Upload image' }}</p>
          <p class="text-sm">Drag and drop or click to select</p>
          <p class="text-xs mt-2">JPEG, PNG, or WebP up to 10MB</p>
          <p v-if="multiple" class="text-xs">Maximum {{ maxFiles }} images</p>
        </div>
      </div>
    </div>

    <!-- Image Previews -->
    <div v-if="hasImages" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in imageList"
        :key="index"
        class="relative group"
      >
        <!-- Image Preview -->
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            :src="image.preview"
            :alt="`Preview ${index + 1}`"
            class="w-full h-full object-cover"
            @load="() => revokeObjectURL(image.preview)"
          >
          
          <!-- Loading Overlay -->
          <div
            v-if="image.uploading"
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div class="text-white text-center">
              <svg class="animate-spin h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-sm">Processing...</span>
            </div>
          </div>
        </div>

        <!-- Image Controls -->
        <div class="absolute top-2 right-2 flex gap-1">
          <!-- Primary Badge -->
          <button
            v-if="multiple && !image.isPrimary"
            @click="setPrimary(index)"
            class="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 text-gray-600 hover:text-blue-600 transition-colors"
            title="Set as primary image"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          
          <!-- Primary Star -->
          <div
            v-else-if="multiple && image.isPrimary"
            class="bg-yellow-500 rounded-full p-1 text-white"
            title="Primary image"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>

          <!-- Remove Button -->
          <button
            @click="removeImage(index)"
            class="bg-red-500 bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 text-white transition-colors"
            title="Remove image"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- File Info -->
        <div class="mt-2 text-xs text-gray-500">
          <p class="truncate">{{ image.file.name }}</p>
          <p>{{ formatFileSize(image.file.size) }}</p>
          <p v-if="image.error" class="text-red-500">{{ image.error }}</p>
        </div>
      </div>

      <!-- Add More Button -->
      <div
        v-if="multiple && imageList.length < maxFiles"
        class="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        @click="openFileDialog"
      >
        <div class="text-center text-gray-500">
          <svg class="h-8 w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-sm">Add more</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </div>

    <!-- Upload Progress -->
    <div v-if="isUploading" class="mt-4">
      <div class="flex justify-between text-sm text-gray-600 mb-1">
        <span>Uploading images...</span>
        <span>{{ uploadProgress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface ImageItem {
  file: File
  preview: string
  isPrimary: boolean
  uploading: boolean
  error?: string
}

interface Props {
  modelValue?: File[] | FileList | null
  label?: string
  required?: boolean
  multiple?: boolean
  maxFiles?: number
  maxFileSize?: number // in MB
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Images',
  required: false,
  multiple: true,
  maxFiles: 10,
  maxFileSize: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: File[] | null]
  'error': [error: string]
  'upload-start': []
  'upload-complete': [files: File[]]
}>()

// State
const fileInput = ref<HTMLInputElement>()
const imageList = ref<ImageItem[]>([])
const isDragOver = ref(false)
const errorMessage = ref('')
const isUploading = ref(false)
const uploadProgress = ref(0)

// Computed
const hasImages = computed(() => imageList.value.length > 0)

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    imageList.value = []
    return
  }

  // Convert FileList or File[] to ImageItem[]
  const files = Array.from(newValue)
  imageList.value = files.map((file, index) => ({
    file,
    preview: URL.createObjectURL(file),
    isPrimary: index === 0,
    uploading: false
  }))
}, { immediate: true })

// Methods
const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    processFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  if (event.dataTransfer?.files) {
    processFiles(Array.from(event.dataTransfer.files))
  }
}

const processFiles = async (files: File[]) => {
  errorMessage.value = ''
  
  // Validate files
  const validFiles: File[] = []
  
  for (const file of files) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      errorMessage.value = 'Only image files are allowed'
      continue
    }
    
    // Check file size
    if (file.size > props.maxFileSize * 1024 * 1024) {
      errorMessage.value = `File size must be less than ${props.maxFileSize}MB`
      continue
    }
    
    // Check total file count
    if (imageList.value.length + validFiles.length >= props.maxFiles) {
      errorMessage.value = `Maximum ${props.maxFiles} images allowed`
      break
    }
    
    validFiles.push(file)
  }
  
  if (validFiles.length === 0) return
  
  // Add valid files to image list
  const newImages: ImageItem[] = validFiles.map((file, index) => ({
    file,
    preview: URL.createObjectURL(file),
    isPrimary: imageList.value.length === 0 && index === 0, // First image is primary
    uploading: false
  }))
  
  if (props.multiple) {
    imageList.value.push(...newImages)
  } else {
    // Single image mode - replace existing
    if (imageList.value.length > 0) {
      URL.revokeObjectURL(imageList.value[0].preview)
    }
    imageList.value = [newImages[0]]
  }
  
  // Emit updated files
  emitFiles()
  
  // Start optimization process
  await optimizeImages(newImages)
}

const removeImage = (index: number) => {
  const image = imageList.value[index]
  URL.revokeObjectURL(image.preview)
  
  const wasPrimary = image.isPrimary
  imageList.value.splice(index, 1)
  
  // Set new primary if removed image was primary
  if (wasPrimary && imageList.value.length > 0) {
    imageList.value[0].isPrimary = true
  }
  
  emitFiles()
}

const setPrimary = (index: number) => {
  imageList.value.forEach((image, i) => {
    image.isPrimary = i === index
  })
}

const emitFiles = () => {
  const files = imageList.value.map(item => item.file)
  emit('update:modelValue', files.length > 0 ? files : null)
}

const optimizeImages = async (images: ImageItem[]) => {
  isUploading.value = true
  uploadProgress.value = 0
  emit('upload-start')
  
  try {
    const optimizedFiles: File[] = []
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      image.uploading = true
      
      try {
        // Client-side optimization
        const optimizedFile = await optimizeImage(image.file)
        
        // Replace original file with optimized version
        const imageIndex = imageList.value.findIndex(item => item.file === image.file)
        if (imageIndex !== -1) {
          imageList.value[imageIndex].file = optimizedFile
          optimizedFiles.push(optimizedFile)
        }
        
        image.uploading = false
        uploadProgress.value = Math.round(((i + 1) / images.length) * 100)
        
      } catch (error) {
        image.error = 'Optimization failed'
        image.uploading = false
        console.error('Image optimization failed:', error)
      }
    }
    
    emit('upload-complete', optimizedFiles)
    emitFiles()
    
  } finally {
    isUploading.value = false
  }
}

const optimizeImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate optimal dimensions
      const maxWidth = 1920
      const maxHeight = 1280
      let { width, height } = img
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(optimizedFile)
          } else {
            reject(new Error('Canvas optimization failed'))
          }
        },
        'image/jpeg',
        0.85 // 85% quality
      )
    }
    
    img.onerror = () => reject(new Error('Image load failed'))
    img.src = URL.createObjectURL(file)
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const revokeObjectURL = (url: string) => {
  URL.revokeObjectURL(url)
}

// Cleanup on unmount
onUnmounted(() => {
  imageList.value.forEach(image => {
    URL.revokeObjectURL(image.preview)
  })
})
</script>

<style scoped>
.image-upload {
  @apply w-full;
}
</style>