<template>
  <div class="relative w-full h-full">
    <!-- Loading State -->
    <div v-if="loading" class="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading map...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
      <div class="text-center p-6">
        <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="text-red-600 font-medium mb-2">Map Loading Failed</p>
        <p class="text-gray-600 text-sm mb-4">{{ error }}</p>
        <button
          @click="initMap"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>

    <!-- Custom Info Window -->
    <div
      v-if="selectedService && showInfoWindow"
      ref="infoWindow"
      class="absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm"
      :style="infoWindowStyle"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="font-semibold text-gray-900">{{ selectedService.name }}</h3>
        <button
          @click="closeInfoWindow"
          class="text-gray-400 hover:text-gray-600 ml-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-2">
        <p class="text-sm text-gray-600">{{ selectedService.categoryName }}</p>
        <div class="flex items-center text-sm text-gray-500">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ selectedService.location }}
          <span v-if="selectedService.distance !== null" class="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {{ selectedService.distance.toFixed(1) }}km away
          </span>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-sm text-gray-600">{{ selectedService.rating }}</span>
          </div>
          <span class="font-semibold text-lg text-gray-900">R{{ selectedService.price }}</span>
        </div>
        <button
          @click="viewService"
          class="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          View Service
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'

interface ServiceLocation {
  id: string
  name: string
  categoryName: string
  location: string
  latitude: number
  longitude: number
  price: number
  rating: number
  distance?: number
  full_slug?: string
}

interface Props {
  services?: ServiceLocation[]
  center?: { lat: number; lng: number }
  zoom?: number
  customerLocation?: { latitude: number; longitude: number } | null
}

const props = withDefaults(defineProps<Props>(), {
  services: () => [],
  center: () => ({ lat: -26.2041, lng: 28.0473 }), // Johannesburg default
  zoom: 10,
  customerLocation: null
})

const emit = defineEmits<{
  'service-selected': [service: ServiceLocation]
  'map-click': [event: google.maps.MapMouseEvent]
}>()

// State
const mapContainer = ref<HTMLDivElement>()
const infoWindow = ref<HTMLDivElement>()
const loading = ref(true)
const error = ref('')
const map = ref<google.maps.Map>()
const markers = ref<google.maps.Marker[]>([])
const selectedService = ref<ServiceLocation | null>(null)
const showInfoWindow = ref(false)
const infoWindowStyle = ref({})

// Initialize Google Maps
const initMap = async () => {
  try {
    loading.value = true
    error.value = ''

    const config = useRuntimeConfig()
    const apiKey = config.public.googleMapsApiKey
    
    if (!apiKey) {
      throw new Error('Google Maps API key is not configured')
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: []
    })

    await loader.load()

    if (!mapContainer.value) {
      throw new Error('Map container not found')
    }

    // Create map
    map.value = new google.maps.Map(mapContainer.value, {
      center: props.center,
      zoom: props.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi.business',
          stylers: [{ visibility: 'off' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: true
    })

    // Add click listener to close info window
    map.value.addListener('click', (event: google.maps.MapMouseEvent) => {
      closeInfoWindow()
      emit('map-click', event)
    })

    // Add customer location marker if available
    if (props.customerLocation) {
      addCustomerLocationMarker()
    }

    // Add service markers
    addServiceMarkers()

  } catch (err: any) {
    error.value = err.message
    console.error('Map initialization error:', err)
  } finally {
    loading.value = false
  }
}

// Add customer location marker
const addCustomerLocationMarker = () => {
  if (!map.value || !props.customerLocation) return

  const customerMarker = new google.maps.Marker({
    position: {
      lat: props.customerLocation.latitude,
      lng: props.customerLocation.longitude
    },
    map: map.value,
    icon: {
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="#3B82F6" stroke="white" stroke-width="4"/>
          <circle cx="16" cy="16" r="4" fill="white"/>
        </svg>
      `),
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16)
    },
    title: 'Your Location',
    zIndex: 1000
  })
}

// Add service markers to map
const addServiceMarkers = () => {
  if (!map.value) return

  // Clear existing markers
  markers.value.forEach(marker => marker.setMap(null))
  markers.value = []

  props.services.forEach(service => {
    if (!service.latitude || !service.longitude) return

    const marker = new google.maps.Marker({
      position: { lat: service.latitude, lng: service.longitude },
      map: map.value,
      icon: {
        url: getMarkerIcon(service.categoryName),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 40)
      },
      title: service.name
    })

    marker.addListener('click', () => {
      selectService(service, marker)
    })

    markers.value.push(marker)
  })
}

// Get marker icon based on category
const getMarkerIcon = (category: string) => {
  const color = getCategoryColor(category)
  return `data:image/svg+xml;base64,` + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2C28.284 2 35 8.716 35 17C35 25.284 20 38 20 38C20 38 5 25.284 5 17C5 8.716 11.716 2 20 2Z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="20" cy="17" r="6" fill="white"/>
    </svg>
  `)
}

// Get category color
const getCategoryColor = (category: string) => {
  const colors = {
    'Technology': '#3B82F6',
    'Design': '#8B5CF6',
    'Marketing': '#10B981',
    'Consulting': '#F59E0B',
    'Health': '#EF4444',
    'Education': '#6366F1',
    'Finance': '#059669',
    'Legal': '#7C2D12'
  }
  return colors[category] || '#6B7280'
}

// Select service and show info window
const selectService = (service: ServiceLocation, marker: google.maps.Marker) => {
  selectedService.value = service
  showInfoWindow.value = true
  
  // Position info window
  nextTick(() => {
    if (!map.value || !infoWindow.value) return

    const projection = map.value.getProjection()
    if (!projection) return

    const position = marker.getPosition()
    if (!position) return

    const point = projection.fromLatLngToPoint(position)
    const bounds = map.value.getBounds()
    if (!point || !bounds) return

    const ne = projection.fromLatLngToPoint(bounds.getNorthEast())
    const sw = projection.fromLatLngToPoint(bounds.getSouthWest())
    
    if (!ne || !sw) return

    const scale = 1 << map.value.getZoom()
    const worldPoint = new google.maps.Point(
      (point.x - sw.x) * scale,
      (point.y - ne.y) * scale
    )

    const mapDiv = mapContainer.value
    if (!mapDiv) return

    const x = (worldPoint.x / (ne.x - sw.x)) * mapDiv.offsetWidth
    const y = (worldPoint.y / (sw.y - ne.y)) * mapDiv.offsetHeight

    infoWindowStyle.value = {
      left: Math.max(10, Math.min(x - 150, mapDiv.offsetWidth - 320)) + 'px',
      top: Math.max(10, y - 40) + 'px'
    }
  })

  emit('service-selected', service)
}

// Close info window
const closeInfoWindow = () => {
  selectedService.value = null
  showInfoWindow.value = false
}

// View selected service
const viewService = () => {
  if (!selectedService.value) return
  
  const service = selectedService.value
  if (service.full_slug) {
    navigateTo(`/services/${service.full_slug}`)
  } else {
    navigateTo(`/vendor/${service.id}`)
  }
}

// Watch for prop changes
watch(() => props.services, () => {
  if (map.value) {
    addServiceMarkers()
  }
}, { deep: true })

watch(() => props.center, (newCenter) => {
  if (map.value && newCenter) {
    map.value.setCenter(newCenter)
  }
}, { deep: true })

watch(() => props.customerLocation, () => {
  if (map.value) {
    addCustomerLocationMarker()
  }
}, { deep: true })

// Initialize map on mount
onMounted(() => {
  nextTick(() => {
    initMap()
  })
})

// Cleanup on unmount
onUnmounted(() => {
  markers.value.forEach(marker => marker.setMap(null))
  markers.value = []
})
</script>