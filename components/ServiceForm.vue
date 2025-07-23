<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title -->
        <div class="md:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Service Title *
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            maxlength="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Professional Website Design"
          >
          <p class="mt-1 text-xs text-gray-500">{{ form.title.length }}/100 characters</p>
        </div>

        <!-- Category -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            v-model="form.category_id"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Duration -->
        <div>
          <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            id="duration"
            v-model.number="form.duration_minutes"
            type="number"
            min="15"
            max="1440"
            step="15"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 60"
          >
        </div>

        <!-- Short Description -->
        <div class="md:col-span-2">
          <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            id="short_description"
            v-model="form.short_description"
            required
            maxlength="200"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary of your service (used in listings)"
          ></textarea>
          <p class="mt-1 text-xs text-gray-500">{{ form.short_description.length }}/200 characters</p>
        </div>

        <!-- Full Description -->
        <div class="md:col-span-2">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Full Description *
          </label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="6"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of your service, what's included, your experience, etc."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Price Type -->
        <div>
          <label for="price_type" class="block text-sm font-medium text-gray-700 mb-2">
            Price Type *
          </label>
          <select
            id="price_type"
            v-model="form.price_type"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="fixed">Fixed Price</option>
            <option value="hourly">Hourly Rate</option>
            <option value="negotiable">Negotiable</option>
          </select>
        </div>

        <!-- Base Price -->
        <div>
          <label for="base_price" class="block text-sm font-medium text-gray-700 mb-2">
            {{ form.price_type === 'hourly' ? 'Hourly Rate' : 'Starting Price' }} *
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
            <input
              id="base_price"
              v-model.number="form.base_price"
              type="number"
              required
              min="0"
              step="0.01"
              class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            >
          </div>
        </div>

        <!-- Max Price -->
        <div v-if="form.price_type === 'fixed'">
          <label for="max_price" class="block text-sm font-medium text-gray-700 mb-2">
            Maximum Price (optional)
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span>
            <input
              id="max_price"
              v-model.number="form.max_price"
              type="number"
              min="0"
              step="0.01"
              class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Location -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Service Location</h3>
      
      <div class="space-y-4">
        <!-- Location Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Where do you provide this service? *
          </label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-blue-500 bg-blue-50': form.location_type === 'client_location' }">
              <input
                v-model="form.location_type"
                type="radio"
                value="client_location"
                class="sr-only"
              >
              <div class="flex-1 text-center">
                <div class="text-2xl mb-2">🏠</div>
                <div class="font-medium">Client's Location</div>
                <div class="text-sm text-gray-500">I travel to client</div>
              </div>
            </label>
            
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-blue-500 bg-blue-50': form.location_type === 'service_location' }">
              <input
                v-model="form.location_type"
                type="radio"
                value="service_location"
                class="sr-only"
              >
              <div class="flex-1 text-center">
                <div class="text-2xl mb-2">🏢</div>
                <div class="font-medium">My Location</div>
                <div class="text-sm text-gray-500">Client comes to me</div>
              </div>
            </label>
            
            <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50" :class="{ 'border-blue-500 bg-blue-50': form.location_type === 'online' }">
              <input
                v-model="form.location_type"
                type="radio"
                value="online"
                class="sr-only"
              >
              <div class="flex-1 text-center">
                <div class="text-2xl mb-2">💻</div>
                <div class="font-medium">Online Service</div>
                <div class="text-sm text-gray-500">Remote/Virtual</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Address (if not online) -->
        <div v-if="form.location_type !== 'online'">
          <GoogleMapsAddressAutocomplete
            v-model="selectedGoogleAddress"
            :label="form.location_type === 'client_location' ? 'Service Area (where you travel to)' : 'Your Business Address'"
            :placeholder="form.location_type === 'client_location' ? 'Enter city or area you serve' : 'Enter your business address'"
            :required="true"
          />
          
          <!-- Fallback manual entry -->
          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-medium text-gray-900">Manual Entry (if needed)</h4>
              <button
                type="button"
                @click="showManualEntry = !showManualEntry"
                class="text-sm text-blue-600 hover:text-blue-800"
              >
                {{ showManualEntry ? 'Hide' : 'Show' }} Manual Entry
              </button>
            </div>
            
            <div v-if="showManualEntry" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="manual-city" class="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  id="manual-city"
                  v-model="manualAddressForm.city"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Cape Town"
                >
              </div>
              
              <div>
                <label for="manual-province" class="block text-sm font-medium text-gray-700 mb-2">
                  Province
                </label>
                <select
                  id="manual-province"
                  v-model="manualAddressForm.province"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Province</option>
                  <option value="Western Cape">Western Cape</option>
                  <option value="Eastern Cape">Eastern Cape</option>
                  <option value="Northern Cape">Northern Cape</option>
                  <option value="Free State">Free State</option>
                  <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                  <option value="North West">North West</option>
                  <option value="Gauteng">Gauteng</option>
                  <option value="Mpumalanga">Mpumalanga</option>
                  <option value="Limpopo">Limpopo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Service Images</h3>
      <ImageUpload
        v-model="form.images"
        label="Upload images of your work, service setup, or results"
        :multiple="true"
        :max-files="10"
        :required="!isEditing"
        @error="handleImageError"
      />
    </div>

    <!-- Additional Details -->
    <div class="bg-white p-6 rounded-lg shadow-sm border">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
      
      <div class="space-y-4">
        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., design, responsive, mobile-friendly"
          >
          <p class="mt-1 text-xs text-gray-500">Add relevant keywords to help customers find your service</p>
        </div>

        <!-- Requirements -->
        <div>
          <label for="requirements" class="block text-sm font-medium text-gray-700 mb-2">
            Requirements from Client
          </label>
          <textarea
            id="requirements"
            v-model="requirementsInput"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What do you need from the client? (one requirement per line)"
          ></textarea>
        </div>

        <!-- Options -->
        <div class="flex items-center space-x-6">
          <label class="flex items-center">
            <input
              v-model="form.instant_booking"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            >
            <span class="ml-2 text-sm text-gray-700">Allow instant booking (no approval needed)</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-between items-center pt-6 border-t">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
      
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>
          {{ isEditing ? 'Update Service' : 'Create Service' }}
        </span>
      </button>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ServiceForm, ServiceCategory, Service } from '~/composables/useServices'

interface Props {
  service?: Service
  categories: ServiceCategory[]
  loading?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: ''
})

const emit = defineEmits<{
  submit: [data: ServiceForm]
  cancel: []
}>()

// Form state
const form = reactive<ServiceForm>({
  title: '',
  description: '',
  short_description: '',
  category_id: '',
  price_type: 'fixed',
  base_price: 0,
  max_price: undefined,
  currency: 'ZAR',
  duration_minutes: undefined,
  location_type: 'client_location',
  address: undefined,
  latitude: undefined,
  longitude: undefined,
  tags: [],
  requirements: [],
  instant_booking: false,
  images: undefined
})

const addressForm = reactive({
  city: '',
  province: '',
  street_address: ''
})

const manualAddressForm = reactive({
  city: '',
  province: '',
  street_address: ''
})

const selectedGoogleAddress = ref(null)
const showManualEntry = ref(false)

const tagsInput = ref('')
const requirementsInput = ref('')

// Computed
const isEditing = computed(() => !!props.service)

const isFormValid = computed(() => {
  const hasValidAddress = form.location_type === 'online' || 
                         selectedGoogleAddress.value || 
                         (manualAddressForm.city && manualAddressForm.province)
  
  return form.title.trim() !== '' &&
         form.description.trim() !== '' &&
         form.short_description.trim() !== '' &&
         form.category_id !== '' &&
         form.base_price > 0 &&
         hasValidAddress
})

// Watchers
watch(() => props.service, (service) => {
  if (service) {
    populateForm(service)
  }
}, { immediate: true })

watch([tagsInput], () => {
  form.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
})

watch([requirementsInput], () => {
  form.requirements = requirementsInput.value
    .split('\n')
    .map(req => req.trim())
    .filter(req => req.length > 0)
})

// Watch for Google Maps address selection
watch([selectedGoogleAddress], () => {
  if (selectedGoogleAddress.value && form.location_type !== 'online') {
    const googleAddr = selectedGoogleAddress.value
    form.address = {
      formatted_address: googleAddr.formatted_address,
      street_address: googleAddr.street_address,
      city: googleAddr.city,
      province: googleAddr.province,
      postal_code: googleAddr.postal_code,
      country: googleAddr.country,
      place_id: googleAddr.place_id
    }
    form.latitude = googleAddr.latitude
    form.longitude = googleAddr.longitude
    
    // Update addressForm for backwards compatibility
    addressForm.city = googleAddr.city
    addressForm.province = googleAddr.province
    addressForm.street_address = googleAddr.street_address
  }
}, { deep: true })

// Watch for manual address entry
watch([manualAddressForm], () => {
  if (!selectedGoogleAddress.value && form.location_type !== 'online') {
    if (manualAddressForm.city || manualAddressForm.province) {
      form.address = {
        city: manualAddressForm.city,
        province: manualAddressForm.province,
        street_address: manualAddressForm.street_address,
        country: 'South Africa'
      }
      // Clear coordinates for manual entry since we don't have exact location
      form.latitude = undefined
      form.longitude = undefined
      
      // Update addressForm for backwards compatibility
      addressForm.city = manualAddressForm.city
      addressForm.province = manualAddressForm.province
      addressForm.street_address = manualAddressForm.street_address
    }
  }
}, { deep: true })

// Watch for location type changes
watch(() => form.location_type, (newType) => {
  if (newType === 'online') {
    form.address = undefined
    form.latitude = undefined
    form.longitude = undefined
    selectedGoogleAddress.value = null
  }
})

// Methods
const populateForm = (service: Service) => {
  form.title = service.title
  form.description = service.description
  form.short_description = service.short_description || ''
  form.category_id = service.category_id
  form.price_type = service.price_type
  form.base_price = service.base_price
  form.max_price = service.max_price
  form.currency = service.currency
  form.duration_minutes = service.duration_minutes
  form.location_type = service.location_type
  form.tags = service.tags || []
  form.requirements = service.requirements || []
  form.instant_booking = service.instant_booking
  
  // Populate address and coordinates
  if (service.address) {
    addressForm.city = service.address.city || ''
    addressForm.province = service.address.province || ''
    addressForm.street_address = service.address.street_address || ''
    form.address = service.address
    
    // If we have coordinates and a formatted address, populate Google Maps selection
    if (service.latitude && service.longitude && service.address.formatted_address) {
      selectedGoogleAddress.value = {
        formatted_address: service.address.formatted_address,
        street_address: service.address.street_address || '',
        city: service.address.city || '',
        province: service.address.province || '',
        postal_code: service.address.postal_code || '',
        country: service.address.country || 'South Africa',
        latitude: service.latitude,
        longitude: service.longitude,
        place_id: service.address.place_id || ''
      }
    } else {
      // Fallback to manual entry for existing services without coordinates
      manualAddressForm.city = service.address.city || ''
      manualAddressForm.province = service.address.province || ''
      manualAddressForm.street_address = service.address.street_address || ''
      showManualEntry.value = true
    }
  }
  
  // Populate coordinates
  form.latitude = service.latitude
  form.longitude = service.longitude
  
  // Populate tags and requirements inputs
  tagsInput.value = form.tags.join(', ')
  requirementsInput.value = form.requirements.join('\n')
}

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  emit('submit', { ...form })
}

const handleImageError = (error: string) => {
  console.error('Image upload error:', error)
}
</script>