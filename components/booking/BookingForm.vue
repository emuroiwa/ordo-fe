<template>
  <div class="booking-form">
    <form @submit.prevent="submitBooking" class="space-y-6">
      <!-- Service Information -->
      <div class="service-info">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-start space-x-4">
            <img
              v-if="service.images && service.images.length > 0"
              :src="service.images[0]"
              :alt="service.title"
              class="w-16 h-16 rounded-lg object-cover"
            />
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">{{ service.title }}</h4>
              <p class="text-sm text-gray-600">{{ service.description }}</p>
              <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span>{{ formatPrice(service.price, service.currency) }}</span>
                <span>{{ service.duration_minutes }} minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Date & Time Selection -->
      <div class="datetime-selection">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
        <AvailabilityCalendar
          :service-id="service.id"
          :selected-date="selectedDate"
          :selected-time-slot="selectedTimeSlot"
          @date-selected="onDateSelected"
          @time-slot-selected="onTimeSlotSelected"
        />
      </div>

      <!-- Duration Selection -->
      <div class="duration-selection">
        <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes)
        </label>
        <select
          id="duration"
          v-model="form.duration_minutes"
          class="form-select"
          required
        >
          <option :value="service.duration_minutes">{{ service.duration_minutes }} minutes (Standard)</option>
          <option :value="service.duration_minutes + 30">{{ service.duration_minutes + 30 }} minutes (+30 min)</option>
          <option :value="service.duration_minutes + 60">{{ service.duration_minutes + 60 }} minutes (+1 hour)</option>
        </select>
      </div>

      <!-- Location Type -->
      <div class="location-selection">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Service Location
        </label>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label class="location-option">
            <input
              type="radio"
              v-model="form.location_type"
              value="vendor_location"
              class="sr-only"
            />
            <div class="location-card">
              <div class="icon">🏢</div>
              <div class="title">Vendor Location</div>
              <div class="description">At the service provider's location</div>
            </div>
          </label>

          <label class="location-option">
            <input
              type="radio"
              v-model="form.location_type"
              value="customer_location"
              class="sr-only"
            />
            <div class="location-card">
              <div class="icon">🏠</div>
              <div class="title">Your Location</div>
              <div class="description">Service provider comes to you</div>
            </div>
          </label>

          <label class="location-option">
            <input
              type="radio"
              v-model="form.location_type"
              value="online"
              class="sr-only"
            />
            <div class="location-card">
              <div class="icon">💻</div>
              <div class="title">Online</div>
              <div class="description">Virtual session</div>
            </div>
          </label>
        </div>
      </div>

      <!-- Customer Address (if customer_location selected) -->
      <div v-if="form.location_type === 'customer_location'" class="address-section">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Service Address</h3>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label for="street" class="form-label">Street Address *</label>
            <input
              id="street"
              type="text"
              v-model="form.service_address.street"
              class="form-input"
              placeholder="123 Main Street"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="city" class="form-label">City *</label>
              <input
                id="city"
                type="text"
                v-model="form.service_address.city"
                class="form-input"
                placeholder="Cape Town"
                required
              />
            </div>
            <div>
              <label for="postal_code" class="form-label">Postal Code *</label>
              <input
                id="postal_code"
                type="text"
                v-model="form.service_address.postal_code"
                class="form-input"
                placeholder="8001"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="state" class="form-label">Province/State *</label>
              <input
                id="state"
                type="text"
                v-model="form.service_address.state"
                class="form-input"
                placeholder="Western Cape"
                required
              />
            </div>
            <div>
              <label for="country" class="form-label">Country *</label>
              <input
                id="country"
                type="text"
                v-model="form.service_address.country"
                class="form-input"
                placeholder="South Africa"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Notes -->
      <div class="notes-section">
        <label for="notes" class="form-label">Additional Notes</label>
        <textarea
          id="notes"
          v-model="form.customer_notes"
          rows="3"
          class="form-textarea"
          placeholder="Any special requests or additional information..."
        ></textarea>
      </div>

      <!-- Pricing Summary -->
      <div class="pricing-summary">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
        <div class="bg-gray-50 rounded-lg p-4 space-y-2">
          <div class="flex justify-between">
            <span>Service ({{ form.duration_minutes }} min)</span>
            <span>{{ formatPrice(calculatedTotal, service.currency) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Deposit (30%)</span>
            <span>{{ formatPrice(calculatedDeposit, service.currency) }}</span>
          </div>
          <hr class="border-gray-200" />
          <div class="flex justify-between font-semibold">
            <span>Total</span>
            <span>{{ formatPrice(calculatedTotal, service.currency) }}</span>
          </div>
          <div class="text-sm text-gray-600">
            <span>Pay {{ formatPrice(calculatedDeposit, service.currency) }} now, {{ formatPrice(calculatedTotal - calculatedDeposit, service.currency) }} after service</span>
          </div>
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div class="terms-section">
        <label class="flex items-start space-x-3">
          <input
            type="checkbox"
            v-model="agreedToTerms"
            class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <span class="text-sm text-gray-600">
            I agree to the <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>
            and <a href="#" class="text-blue-600 hover:underline">Cancellation Policy</a>.
            I understand that cancellations within 12 hours may incur fees.
          </span>
        </label>
      </div>

      <!-- Submit Button -->
      <div class="submit-section">
        <button
          type="submit"
          :disabled="!canSubmit || loading"
          class="submit-button"
        >
          <span v-if="loading" class="flex items-center">
            <div class="spinner mr-2"></div>
            Processing...
          </span>
          <span v-else>
            Book Service ({{ formatPrice(calculatedDeposit, service.currency) }} deposit)
          </span>
        </button>
        
        <p class="text-xs text-gray-500 mt-2 text-center">
          You will be redirected to payment after confirming your booking
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import AvailabilityCalendar from './AvailabilityCalendar.vue'

interface Service {
  id: string
  title: string
  description: string
  price: number
  currency: string
  duration_minutes: number
  images?: string[]
}

interface AvailabilitySlot {
  id: string
  start_time: string
  end_time: string
  duration: number
}

interface Address {
  street: string
  city: string
  state: string
  postal_code: string
  country: string
  latitude?: number
  longitude?: number
}

interface BookingForm {
  duration_minutes: number
  location_type: 'vendor_location' | 'customer_location' | 'online'
  service_address: Address
  customer_notes: string
}

interface Props {
  service: Service
}

interface Emits {
  (event: 'bookingCreated', booking: any): void
  (event: 'bookingError', error: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { $fetch } = useNuxtApp()

// Reactive state
const selectedDate = ref<Date | null>(null)
const selectedTimeSlot = ref<AvailabilitySlot | null>(null)
const agreedToTerms = ref(false)
const loading = ref(false)

const form = reactive<BookingForm>({
  duration_minutes: props.service.duration_minutes,
  location_type: 'vendor_location',
  service_address: {
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  },
  customer_notes: ''
})

// Computed properties
const calculatedTotal = computed((): number => {
  const serviceDuration = props.service.duration_minutes
  const requestedDuration = form.duration_minutes
  return (props.service.price / serviceDuration) * requestedDuration
})

const calculatedDeposit = computed((): number => {
  return calculatedTotal.value * 0.30
})

const canSubmit = computed((): boolean => {
  return !!(
    selectedDate.value &&
    selectedTimeSlot.value &&
    form.location_type &&
    agreedToTerms.value &&
    (form.location_type !== 'customer_location' || isAddressComplete.value)
  )
})

const isAddressComplete = computed((): boolean => {
  if (form.location_type !== 'customer_location') return true
  
  return !!(
    form.service_address.street &&
    form.service_address.city &&
    form.service_address.state &&
    form.service_address.postal_code &&
    form.service_address.country
  )
})

// Methods
const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency || 'ZAR'
  }).format(amount)
}

const onDateSelected = (date: Date): void => {
  selectedDate.value = date
  selectedTimeSlot.value = null
}

const onTimeSlotSelected = (slot: AvailabilitySlot): void => {
  selectedTimeSlot.value = slot
}

const submitBooking = async (): Promise<void> => {
  if (!canSubmit.value || loading.value) return

  loading.value = true

  try {
    // Combine date and time for scheduled_at
    const scheduledDateTime = new Date(selectedDate.value!)
    const [hours, minutes] = selectedTimeSlot.value!.start_time.split(':')
    scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    const bookingData = {
      service_id: props.service.id,
      scheduled_at: scheduledDateTime.toISOString(),
      duration_minutes: form.duration_minutes,
      location_type: form.location_type,
      customer_notes: form.customer_notes,
      ...(form.location_type === 'customer_location' && {
        service_address: form.service_address
      })
    }

    const response = await $fetch('/api/v1/bookings', {
      method: 'POST',
      body: bookingData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    emit('bookingCreated', response.booking)
  } catch (error: any) {
    console.error('Error creating booking:', error)
    emit('bookingError', error.data?.message || error.message || 'Failed to create booking')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.booking-form {
  @apply max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical;
}

.location-option {
  @apply cursor-pointer;
}

.location-card {
  @apply border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-300 transition-colors;
}

.location-option input:checked + .location-card {
  @apply border-blue-500 bg-blue-50;
}

.location-card .icon {
  @apply text-2xl mb-2;
}

.location-card .title {
  @apply font-medium text-gray-900 mb-1;
}

.location-card .description {
  @apply text-sm text-gray-600;
}

.submit-button {
  @apply w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}

.spinner {
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin;
}
</style>