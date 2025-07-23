<template>
  <div class="space-y-4">
    <!-- Location Status Banner -->
    <div 
      v-if="currentLocation" 
      class="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
    >
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div>
          <p class="text-sm font-medium text-green-900">{{ currentLocation.formatted_address }}</p>
          <p class="text-xs text-green-700">Showing services within {{ radiusKm }}km</p>
        </div>
      </div>
      <button
        @click="clearLocation"
        class="text-green-600 hover:text-green-800 p-1"
        title="Clear location"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Location Input Section -->
    <div v-else class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Find services near you</h3>
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ radiusKm }}km radius</span>
        </div>
      </div>

      <!-- Quick Location Options -->
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="getCurrentLocation"
          :disabled="gettingLocation"
          class="flex items-center justify-center space-x-2 p-3 border border-blue-300 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg 
            class="w-5 h-5 text-blue-600" 
            :class="{ 'animate-spin': gettingLocation }" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path v-if="!gettingLocation" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path v-if="!gettingLocation" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            <circle v-if="gettingLocation" class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path v-if="gettingLocation" class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span class="text-blue-600 font-medium">
            {{ gettingLocation ? 'Getting location...' : 'Use my location' }}
          </span>
        </button>

        <button
          @click="showAddressInput = true"
          class="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span class="text-gray-600 font-medium">Enter address</span>
        </button>
      </div>

      <!-- Address Input -->
      <div v-if="showAddressInput" class="mt-4">
        <GoogleMapsAddressAutocomplete
          v-model="selectedAddress"
          label="Your location"
          placeholder="Enter your address to find nearby services"
          @update:modelValue="handleAddressSelection"
        />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>
    </div>

    <!-- Radius Selector -->
    <div v-if="currentLocation" class="flex items-center space-x-4">
      <label class="text-sm font-medium text-gray-700">Search radius:</label>
      <div class="flex space-x-2">
        <button
          v-for="radius in radiusOptions"
          :key="radius"
          @click="updateRadius(radius)"
          :class="[
            'px-3 py-1 text-sm rounded-md transition-colors',
            radiusKm === radius
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ radius }}km
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LocationData {
  formatted_address: string
  latitude: number
  longitude: number
  city?: string
  province?: string
}

interface Props {
  modelValue?: LocationData | null
  defaultRadius?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  defaultRadius: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: LocationData | null]
  'update:radius': [radius: number]
}>()

// State
const currentLocation = ref<LocationData | null>(props.modelValue)
const selectedAddress = ref(null)
const showAddressInput = ref(false)
const gettingLocation = ref(false)
const error = ref('')
const radiusKm = ref(props.defaultRadius)

// Constants
const radiusOptions = [5, 10, 25, 50, 100]

// Get user's current location using browser geolocation
const getCurrentLocation = async () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser'
    return
  }

  gettingLocation.value = true
  error.value = ''

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      })
    })

    // Reverse geocode to get address
    await reverseGeocode(position.coords.latitude, position.coords.longitude)

  } catch (err: any) {
    if (err.code === 1) {
      error.value = 'Location access denied. Please enter your address manually.'
    } else if (err.code === 2) {
      error.value = 'Location unavailable. Please enter your address manually.'
    } else if (err.code === 3) {
      error.value = 'Location request timed out. Please try again.'
    } else {
      error.value = 'Failed to get your location. Please enter your address manually.'
    }
    showAddressInput.value = true
  } finally {
    gettingLocation.value = false
  }
}

// Reverse geocode coordinates to get formatted address
const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const config = useRuntimeConfig()
    const apiKey = config.public.googleMapsApiKey
    
    if (!apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    )
    
    if (!response.ok) {
      throw new Error('Geocoding request failed')
    }

    const data = await response.json()
    
    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0]
      const locationData: LocationData = {
        formatted_address: result.formatted_address,
        latitude: lat,
        longitude: lng
      }
      
      // Extract city and province from address components
      for (const component of result.address_components) {
        if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
          locationData.city = component.long_name
        } else if (component.types.includes('administrative_area_level_1')) {
          locationData.province = component.long_name
        }
      }

      setCurrentLocation(locationData)
    } else {
      throw new Error('No address found for your location')
    }
  } catch (err: any) {
    error.value = `Failed to get address: ${err.message}`
    console.error('Reverse geocoding error:', err)
  }
}

// Handle address selection from GoogleMapsAddressAutocomplete
const handleAddressSelection = (address: any) => {
  if (address) {
    const locationData: LocationData = {
      formatted_address: address.formatted_address,
      latitude: address.latitude,
      longitude: address.longitude,
      city: address.city,
      province: address.province
    }
    setCurrentLocation(locationData)
    showAddressInput.value = false
  }
}

// Set current location and emit to parent
const setCurrentLocation = (location: LocationData) => {
  currentLocation.value = location
  emit('update:modelValue', location)
  emit('update:radius', radiusKm.value)
}

// Clear current location
const clearLocation = () => {
  currentLocation.value = null
  selectedAddress.value = null
  showAddressInput.value = false
  error.value = ''
  emit('update:modelValue', null)
}

// Update search radius
const updateRadius = (radius: number) => {
  radiusKm.value = radius
  emit('update:radius', radius)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  currentLocation.value = newValue
}, { immediate: true })

// Auto-load location on mount if none selected
onMounted(() => {
  if (!currentLocation.value) {
    // Try to get location from localStorage
    const savedLocation = localStorage.getItem('user-location')
    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation)
        setCurrentLocation(location)
      } catch {
        // Invalid saved location, ignore
      }
    }
  }
})

// Save location to localStorage when changed
watch(currentLocation, (newLocation) => {
  if (newLocation) {
    localStorage.setItem('user-location', JSON.stringify(newLocation))
  } else {
    localStorage.removeItem('user-location')
  }
}, { deep: true })
</script>