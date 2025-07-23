<template>
  <div class="space-y-4">
    <!-- Address Search Input -->
    <div>
      <label for="address-search" class="block text-sm font-medium text-gray-700 mb-2">
        {{ label }} *
      </label>
      <div class="relative">
        <input
          id="address-search"
          ref="addressInput"
          v-model="searchValue"
          type="text"
          :placeholder="placeholder"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @input="onInputChange"
        >
        <div v-if="loading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg class="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
      <p v-else class="mt-1 text-xs text-gray-500">Enter a specific address (e.g., "123 Long Street, Cape Town") and select from suggestions</p>
    </div>

    <!-- Selected Address Display -->
    <div v-if="selectedAddress" class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h4 class="font-medium text-green-900">Selected Address:</h4>
          <p class="text-sm text-green-800 mt-1">{{ selectedAddress.formatted_address }}</p>
          <div class="mt-2 text-xs text-green-700 space-y-1">
            <p><span class="font-medium">City:</span> {{ selectedAddress.city }}</p>
            <p><span class="font-medium">Province:</span> {{ selectedAddress.province }}</p>
            <p><span class="font-medium">Country:</span> {{ selectedAddress.country }}</p>
            <p><span class="font-medium">Coordinates:</span> {{ selectedAddress.latitude }}, {{ selectedAddress.longitude }}</p>
          </div>
        </div>
        <button
          @click="clearSelection"
          class="ml-4 p-1 text-green-600 hover:text-green-800"
          title="Clear selection"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface GeocodeResult {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: {
    location: {
      lat(): number
      lng(): number
    }
  }
  place_id: string
}

interface ParsedAddress {
  formatted_address: string
  street_address: string
  city: string
  province: string
  postal_code: string
  country: string
  latitude: number
  longitude: number
  place_id: string
}

interface Props {
  label?: string
  placeholder?: string
  modelValue?: ParsedAddress | null
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Address',
  placeholder: 'Enter address or location',
  modelValue: null,
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: ParsedAddress | null]
}>()

// State
const addressInput = ref<HTMLInputElement>()
const searchValue = ref('')
const loading = ref(false)
const error = ref('')
const selectedAddress = ref<ParsedAddress | null>(props.modelValue)
const autocompleteService = ref<google.maps.places.AutocompleteService>()
const placesService = ref<google.maps.places.PlacesService>()
const geocoder = ref<google.maps.Geocoder>()

// Initialize Google Maps
const initGoogleMaps = async () => {
  try {
    const config = useRuntimeConfig()
    const apiKey = config.public.googleMapsApiKey
    
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured')
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places']
    })

    await loader.load()
    
    // Initialize services
    autocompleteService.value = new google.maps.places.AutocompleteService()
    geocoder.value = new google.maps.Geocoder()
    
    // Create a temporary div for PlacesService (required by Google Maps API)
    const tempDiv = document.createElement('div')
    placesService.value = new google.maps.places.PlacesService(tempDiv)
    
    // Initialize Places Autocomplete on the input element
    initPlacesAutocomplete()
    
  } catch (err: any) {
    error.value = `Failed to load Google Maps: ${err.message}`
    console.error('Google Maps initialization error:', err)
  }
}

// Initialize Places Autocomplete for better address suggestions
const initPlacesAutocomplete = () => {
  if (!addressInput.value) return
  
  const autocomplete = new google.maps.places.Autocomplete(addressInput.value, {
    componentRestrictions: { country: 'za' },
    fields: ['address_components', 'formatted_address', 'geometry', 'place_id'],
    types: ['address'] // Focus on specific addresses, not just cities
  })
  
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    
    if (!place.geometry || !place.geometry.location) {
      error.value = 'Please select a valid address from the suggestions'
      return
    }
    
    handlePlaceSelection(place)
  })
}

// Handle place selection from autocomplete
const handlePlaceSelection = (place: google.maps.places.PlaceResult) => {
  try {
    error.value = ''
    
    const parsed = parseAddressComponents(place.address_components || [])
    
    const addressData: ParsedAddress = {
      formatted_address: place.formatted_address || '',
      street_address: parsed.street_address || '',
      city: parsed.city || '',
      province: parsed.province || '',
      postal_code: parsed.postal_code || '',
      country: parsed.country || 'South Africa',
      latitude: place.geometry!.location!.lat(),
      longitude: place.geometry!.location!.lng(),
      place_id: place.place_id || ''
    }
    
    selectedAddress.value = addressData
    searchValue.value = place.formatted_address || ''
    emit('update:modelValue', addressData)
    
  } catch (err: any) {
    error.value = 'Error processing selected address'
    console.error('Place selection error:', err)
  }
}

// Parse address components
const parseAddressComponents = (addressComponents: AddressComponent[]): Partial<ParsedAddress> => {
  const result: Partial<ParsedAddress> = {}
  
  for (const component of addressComponents) {
    const types = component.types
    
    if (types.includes('street_number') || types.includes('route')) {
      if (!result.street_address) result.street_address = ''
      result.street_address = `${result.street_address} ${component.long_name}`.trim()
    } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
      result.city = component.long_name
    } else if (types.includes('administrative_area_level_1')) {
      result.province = component.long_name
    } else if (types.includes('postal_code')) {
      result.postal_code = component.long_name
    } else if (types.includes('country')) {
      result.country = component.long_name
    }
  }
  
  return result
}

// Handle address selection via geocoding
const selectAddress = async (description: string) => {
  if (!geocoder.value) return
  
  try {
    loading.value = true
    error.value = ''
    
    const response = await new Promise<google.maps.GeocoderResponse>((resolve, reject) => {
      geocoder.value!.geocode(
        { 
          address: description,
          region: 'za', // Bias results to South Africa
          componentRestrictions: {
            country: 'ZA' // Restrict to South Africa
          }
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve({ results: results || [] })
          } else {
            reject(new Error(`Geocoding failed: ${status}`))
          }
        }
      )
    })
    
    if (response.results && response.results.length > 0) {
      const result = response.results[0]
      const parsed = parseAddressComponents(result.address_components)
      
      const addressData: ParsedAddress = {
        formatted_address: result.formatted_address,
        street_address: parsed.street_address || '',
        city: parsed.city || '',
        province: parsed.province || '',
        postal_code: parsed.postal_code || '',
        country: parsed.country || 'South Africa',
        latitude: result.geometry.location.lat(),
        longitude: result.geometry.location.lng(),
        place_id: result.place_id || ''
      }
      
      selectedAddress.value = addressData
      searchValue.value = result.formatted_address
      emit('update:modelValue', addressData)
    } else {
      error.value = 'No results found for this address'
    }
  } catch (err: any) {
    const errorMessage = err.message.toLowerCase()
    if (errorMessage.includes('zero_results')) {
      error.value = 'No locations found. Try being more specific (e.g., "Cape Town, Western Cape") or use manual entry below.'
    } else if (errorMessage.includes('over_query_limit')) {
      error.value = 'Search limit reached. Please try again in a moment or use manual entry.'
    } else if (errorMessage.includes('request_denied')) {
      error.value = 'Google Maps access denied. Please use manual entry below.'
    } else if (errorMessage.includes('invalid_request')) {
      error.value = 'Invalid search. Please enter a valid address or use manual entry.'
    } else {
      error.value = 'Address search unavailable. Please use manual entry below.'
    }
    console.error('Geocoding error:', err)
  } finally {
    loading.value = false
  }
}

// Handle input changes with debouncing
let searchTimeout: NodeJS.Timeout
const onInputChange = () => {
  clearTimeout(searchTimeout)
  
  // Clear previous selection if user is typing
  if (selectedAddress.value && searchValue.value !== selectedAddress.value.formatted_address) {
    clearSelection()
  }
  
  // Note: We're now using Places Autocomplete which handles suggestions automatically
  // The geocoding fallback is still available if autocomplete fails
  if (!searchValue.value || searchValue.value.length < 3) {
    error.value = ''
  }
}

// Clear selection
const clearSelection = () => {
  selectedAddress.value = null
  searchValue.value = ''
  emit('update:modelValue', null)
  error.value = ''
}

// Watch for external model value changes
watch(() => props.modelValue, (newValue) => {
  selectedAddress.value = newValue
  if (newValue) {
    searchValue.value = newValue.formatted_address
  } else {
    searchValue.value = ''
  }
}, { immediate: true })

// Initialize on mount
onMounted(() => {
  nextTick(() => {
    initGoogleMaps()
  })
})
</script>