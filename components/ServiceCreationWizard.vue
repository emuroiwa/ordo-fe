<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Progress -->
    <div class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between mb-3">
          <button 
            @click="goBack"
            class="p-2 -ml-2 text-gray-600 hover:text-gray-900 touch-target"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-lg font-semibold text-gray-900">Create Your Service</h1>
          <button 
            @click="$emit('close')"
            class="p-2 -mr-2 text-gray-600 hover:text-gray-900 touch-target"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div class="flex items-center space-x-2">
          <div class="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <span class="text-sm font-medium text-gray-600">{{ currentStep }}/{{ totalSteps }}</span>
        </div>
      </div>
    </div>

    <!-- Step Content -->
    <div class="px-4 py-6">
      <!-- Step 1: Service Basics -->
      <div v-if="currentStep === 1" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">What service do you offer?</h2>
          <p class="text-gray-600">Tell us what you do in simple words</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
            <input
              v-model="formData.title"
              type="text"
              placeholder="e.g., Hair Styling, House Cleaning, Math Tutoring"
              class="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-target"
              maxlength="50"
            />
            <div class="flex justify-between mt-1">
              <p class="text-xs text-gray-500">Keep it simple and clear</p>
              <p class="text-xs text-gray-400">{{ formData.title.length }}/50</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What type of service?</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="category in popularCategories"
                :key="category.id"
                @click="selectCategory(category)"
                class="p-4 border-2 rounded-xl text-center transition-all touch-target"
                :class="formData.category_id === category.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="text-2xl mb-1">{{ category.emoji }}</div>
                <div class="text-sm font-medium">{{ category.name }}</div>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Describe your service</label>
            <textarea
              v-model="formData.short_description"
              placeholder="Tell customers what you do and why you're great at it..."
              rows="4"
              class="w-full px-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxlength="150"
            ></textarea>
            <div class="flex justify-between mt-1">
              <p class="text-xs text-gray-500">This appears in search results</p>
              <p class="text-xs text-gray-400">{{ formData.short_description.length }}/150</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Photos -->
      <div v-if="currentStep === 2" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Add photos of your work</h2>
          <p class="text-gray-600">Photos help customers trust and choose you</p>
        </div>

        <!-- Photo Upload Area -->
        <div class="space-y-4">
          <div 
            @click="!processingImages && triggerFileInput()"
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            class="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
            :class="processingImages 
              ? 'border-blue-400 bg-blue-50 cursor-wait' 
              : 'border-gray-300 cursor-pointer hover:border-blue-400'"
          >
            <svg v-if="!processingImages" class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <div v-else class="flex justify-center items-center mb-4">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ processingImages ? 'Processing images...' : 'Take or choose photos' }}
            </h3>
            <p class="text-gray-600">
              {{ processingImages ? 'Please wait while we optimize your images' : 'Tap to take a photo or select from gallery' }}
            </p>
          </div>

          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*"
            capture="environment"
            @change="handleFileSelect"
            class="hidden"
          />

          <!-- Photo Preview Grid -->
          <div v-if="photos.length > 0" class="grid grid-cols-2 gap-3">
            <div
              v-for="(photo, index) in photos"
              :key="index"
              class="relative aspect-square bg-gray-100 rounded-xl overflow-hidden"
            >
              <img :src="photo.preview" alt="Service photo" class="w-full h-full object-cover" />
              <button
                @click="removePhoto(index)"
                class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Photo Tips -->
          <div class="bg-blue-50 rounded-xl p-4">
            <h4 class="font-medium text-blue-900 mb-2">📸 Photo Tips</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Show your best work examples</li>
              <li>• Use good lighting (natural light is best)</li>
              <li>• Include before/after photos if relevant</li>
              <li>• Add 3-5 photos minimum</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 3: Pricing -->
      <div v-if="currentStep === 3" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">How much do you charge?</h2>
          <p class="text-gray-600">Set your price to attract customers</p>
        </div>

        <div class="space-y-6">
          <!-- Pricing Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">How do you charge?</label>
            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                     :class="formData.price_type === 'fixed' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                <input v-model="formData.price_type" type="radio" value="fixed" class="sr-only" />
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">💰</div>
                    <div>
                      <div class="font-medium text-gray-900">Fixed Price</div>
                      <div class="text-sm text-gray-600">One price for the complete service</div>
                    </div>
                  </div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                     :class="formData.price_type === 'hourly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                <input v-model="formData.price_type" type="radio" value="hourly" class="sr-only" />
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">⏰</div>
                    <div>
                      <div class="font-medium text-gray-900">Per Hour</div>
                      <div class="text-sm text-gray-600">Charge by the hour</div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Price Input -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ formData.price_type === 'hourly' ? 'Price per hour' : 'Starting price' }}
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-semibold text-gray-600">R</span>
              <input
                v-model="formData.base_price"
                type="number"
                step="10"
                min="0"
                placeholder="0"
                class="w-full pl-12 pr-4 py-4 text-xl font-semibold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-target"
              />
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ formData.price_type === 'hourly' ? 'This is what you charge per hour' : 'Customers will see "Starting from R' + formData.base_price + '"' }}
            </p>
          </div>

          <!-- Pricing Tips -->
          <div class="bg-yellow-50 rounded-xl p-4">
            <h4 class="font-medium text-yellow-900 mb-2">💡 Pricing Tips</h4>
            <ul class="text-sm text-yellow-800 space-y-1">
              <li>• Research what others charge in your area</li>
              <li>• Start competitive, raise prices as you get reviews</li>
              <li>• Consider your costs (travel, materials, time)</li>
              <li>• You can always change your price later</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Step 4: Location -->
      <div v-if="currentStep === 4" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Where do you work?</h2>
          <p class="text-gray-600">Help customers find you</p>
        </div>

        <div class="space-y-6">
          <!-- Location Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Where do you provide your service?</label>
            <div class="space-y-3">
              <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                     :class="formData.location_type === 'client_location' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                <input v-model="formData.location_type" type="radio" value="client_location" class="sr-only" />
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">🚗</div>
                    <div>
                      <div class="font-medium text-gray-900">I go to customers</div>
                      <div class="text-sm text-gray-600">You travel to provide the service</div>
                    </div>
                  </div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                     :class="formData.location_type === 'service_location' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                <input v-model="formData.location_type" type="radio" value="service_location" class="sr-only" />
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">🏠</div>
                    <div>
                      <div class="font-medium text-gray-900">Customers come to me</div>
                      <div class="text-sm text-gray-600">You have a shop, salon, or office</div>
                    </div>
                  </div>
                </div>
              </label>
              
              <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                     :class="formData.location_type === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'">
                <input v-model="formData.location_type" type="radio" value="online" class="sr-only" />
                <div class="flex-1">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">💻</div>
                    <div>
                      <div class="font-medium text-gray-900">Online service</div>
                      <div class="text-sm text-gray-600">Video calls, remote work, digital services</div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Location Input -->
          <div v-if="formData.location_type !== 'online'">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ formData.location_type === 'client_location' ? 'What area do you serve?' : 'Where is your business located?' }}
              </label>
              <p class="text-sm text-gray-600 mb-4">
                {{ formData.location_type === 'client_location' 
                  ? 'Enter your service area - this helps customers find you' 
                  : 'Enter your business address - this is where customers will come to you' 
                }}
              </p>
            </div>
            
            <!-- Google Maps Address Input -->
            <div class="mobile-address-input">
              <GoogleMapsAddressAutocomplete
                v-model="selectedAddress"
                :label="formData.location_type === 'client_location' ? 'Service Area Address' : 'Business Address'"
                :placeholder="formData.location_type === 'client_location' 
                  ? 'e.g., Sandton, Johannesburg or 123 Main Street, Cape Town' 
                  : 'e.g., 123 Main Street, Cape Town, Western Cape'"
                class="mobile-friendly-autocomplete"
              />
            </div>

            <!-- Alternative: Use Current Location -->
            <div class="mt-4">
              <button
                @click="useCurrentLocation"
                :disabled="gettingLocation"
                class="w-full flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors touch-target"
              >
                <svg class="w-5 h-5" :class="{ 'animate-spin': gettingLocation }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ gettingLocation ? 'Getting your location...' : 'Use my current location' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 5: Final Details -->
      <div v-if="currentStep === 5" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Almost done!</h2>
          <p class="text-gray-600">A few final touches</p>
        </div>

        <div class="space-y-6">
          <!-- Duration -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">How long does your service typically take?</label>
            <select
              v-model="formData.duration_minutes"
              class="w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-target"
            >
              <option value="">Select duration</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
              <option value="180">3 hours</option>
              <option value="240">4 hours</option>
              <option value="480">Full day (8 hours)</option>
            </select>
          </div>

          <!-- Instant Booking -->
          <div>
            <label class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all touch-target"
                   :class="formData.instant_booking ? 'border-green-500 bg-green-50' : 'border-gray-200'">
              <input v-model="formData.instant_booking" type="checkbox" class="sr-only" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3">⚡</div>
                    <div>
                      <div class="font-medium text-gray-900">Allow instant booking</div>
                      <div class="text-sm text-gray-600">Customers can book immediately without waiting for approval</div>
                    </div>
                  </div>
                  <div class="w-6 h-6 rounded border-2 flex items-center justify-center"
                       :class="formData.instant_booking ? 'border-green-500 bg-green-500' : 'border-gray-300'">
                    <svg v-if="formData.instant_booking" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <!-- Full Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tell customers more about your service (optional)</label>
            <textarea
              v-model="formData.description"
              placeholder="Include details about your experience, what's included, what customers should expect..."
              rows="4"
              class="w-full px-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxlength="500"
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">{{ formData.description.length }}/500</p>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Add keywords to help customers find you</label>
            <div class="space-y-3">
              <!-- Tag Input -->
              <div class="flex space-x-2">
                <input
                  v-model="newTag"
                  @keydown.enter.prevent="addTag"
                  @keydown.comma.prevent="addTag"
                  type="text"
                  placeholder="e.g., experienced, affordable, quick..."
                  class="flex-1 px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-target"
                  maxlength="20"
                />
                <button
                  @click="addTag"
                  :disabled="!newTag.trim() || formData.tags.length >= 5"
                  class="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed touch-target"
                >
                  Add
                </button>
              </div>
              
              <!-- Current Tags -->
              <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {{ tag }}
                  <button
                    @click="removeTag(index)"
                    class="ml-2 w-4 h-4 text-blue-600 hover:text-blue-800"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
              
              <!-- Tag Suggestions -->
              <div v-if="formData.tags.length === 0" class="flex flex-wrap gap-2">
                <button
                  v-for="suggestion in tagSuggestions"
                  :key="suggestion"
                  @click="addSuggestedTag(suggestion)"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {{ suggestion }}
                </button>
              </div>
              
              <p class="text-xs text-gray-500">
                {{ formData.tags.length }}/5 tags • Press Enter or comma to add
              </p>
            </div>
          </div>

          <!-- Requirements -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">What should customers bring or know? (optional)</label>
            <div class="space-y-3">
              <!-- Requirement Input -->
              <div class="flex space-x-2">
                <input
                  v-model="newRequirement"
                  @keydown.enter.prevent="addRequirement"
                  type="text"
                  placeholder="e.g., bring cleaning supplies, have WiFi available..."
                  class="flex-1 px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-target"
                  maxlength="50"
                />
                <button
                  @click="addRequirement"
                  :disabled="!newRequirement.trim() || formData.requirements.length >= 5"
                  class="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:bg-gray-300 disabled:cursor-not-allowed touch-target"
                >
                  Add
                </button>
              </div>
              
              <!-- Current Requirements -->
              <div v-if="formData.requirements.length > 0" class="space-y-2">
                <div
                  v-for="(requirement, index) in formData.requirements"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <span class="text-sm text-gray-700">{{ requirement }}</span>
                  <button
                    @click="removeRequirement(index)"
                    class="w-6 h-6 text-gray-400 hover:text-red-500"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <p class="text-xs text-gray-500">
                {{ formData.requirements.length }}/5 requirements • Press Enter to add
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Review Step -->
      <div v-if="currentStep === 6" class="space-y-6">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 mb-2">Review your service</h2>
          <p class="text-gray-600">Make sure everything looks good</p>
        </div>

        <!-- Service Preview -->
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <!-- Photo Carousel -->
          <div v-if="photos.length > 0" class="relative h-48 bg-gray-100">
            <img :src="photos[currentPhotoIndex].preview" alt="Service photo" class="w-full h-full object-cover" />
            <div v-if="photos.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div
                v-for="(photo, index) in photos"
                :key="index"
                class="w-2 h-2 rounded-full"
                :class="index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'"
              ></div>
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ formData.title }}</h3>
            <p class="text-gray-600 mb-3">{{ formData.short_description }}</p>
            
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ locationDisplay }}
              </div>
              <div class="text-lg font-bold text-green-600">
                {{ formData.price_type === 'hourly' ? `R${formData.base_price}/hour` : `From R${formData.base_price}` }}
              </div>
            </div>
            
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>⏱️ {{ durationDisplay }}</span>
              <span v-if="formData.instant_booking" class="text-green-600">⚡ Instant booking</span>
            </div>
            
            <!-- Tags and Requirements -->
            <div v-if="formData.tags.length > 0 || formData.requirements.length > 0" class="pt-3 border-t border-gray-100">
              <!-- Tags -->
              <div v-if="formData.tags.length > 0" class="mb-3">
                <div class="text-sm font-medium text-gray-700 mb-2">Keywords</div>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in formData.tags"
                    :key="tag"
                    class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- Requirements -->
              <div v-if="formData.requirements.length > 0">
                <div class="text-sm font-medium text-gray-700 mb-2">Customer Requirements</div>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li v-for="requirement in formData.requirements" :key="requirement" class="flex items-start">
                    <span class="text-blue-600 mr-2">•</span>
                    {{ requirement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="currentStep = 1"
            class="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors touch-target"
          >
            Edit Details
          </button>
          <button
            @click="currentStep = 2"
            class="p-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors touch-target"
          >
            Edit Photos
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div class="flex space-x-3">
        <button
          v-if="currentStep > 1"
          @click="previousStep"
          class="px-6 py-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors touch-target"
        >
          Back
        </button>
        <button
          @click="nextStep"
          :disabled="!canProceed"
          class="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-target"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          </span>
          <span v-else>{{ currentStep === 6 ? 'Publish Service' : 'Continue' }}</span>
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Service Published! 🎉</h3>
        <p class="text-gray-600 mb-6">Your service is now live and customers can find and book it.</p>
        <div class="space-y-3">
          <button
            @click="viewService"
            class="w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors touch-target"
          >
            View My Service
          </button>
          <button
            @click="$emit('close')"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors touch-target"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import GoogleMapsAddressAutocomplete from './GoogleMapsAddressAutocomplete.vue'

const emit = defineEmits(['close', 'success'])

// Composables
const { createService, fetchCategories, categories, loading, error } = useServices()

// State
const currentStep = ref(1)
const totalSteps = 6
const photos = ref([])
const currentPhotoIndex = ref(0)
const fileInput = ref()
const gettingLocation = ref(false)
const showSuccess = ref(false)
const createdService = ref(null)
const processingImages = ref(false)
const newTag = ref('')
const newRequirement = ref('')
const selectedAddress = ref(null)

// Form data
// Form persistence key
const FORM_STORAGE_KEY = 'ordo_service_creation_draft'

// Load saved form data from localStorage
const loadSavedFormData = () => {
  if (process.client) {
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY)
      if (saved) {
        const parsedData = JSON.parse(saved)
        // Validate the data structure before using it
        if (parsedData && typeof parsedData === 'object') {
          return {
            title: parsedData.title || '',
            description: parsedData.description || '',
            short_description: parsedData.short_description || '',
            category_id: parsedData.category_id || '',
            price_type: parsedData.price_type || 'fixed',
            base_price: parsedData.base_price || 0,
            currency: parsedData.currency || 'ZAR',
            duration_minutes: parsedData.duration_minutes || 60,
            location_type: parsedData.location_type || 'client_location',
            address: parsedData.address || null,
            latitude: parsedData.latitude || null,
            longitude: parsedData.longitude || null,
            tags: parsedData.tags || [],
            requirements: parsedData.requirements || [],
            instant_booking: parsedData.instant_booking !== false,
            images: null // Don't persist images
          }
        }
      }
    } catch (error) {
      console.error('Error loading saved form data:', error)
    }
  }
  
  // Default form data
  return {
    title: '',
    description: '',
    short_description: '',
    category_id: '',
    price_type: 'fixed',
    base_price: 0,
    currency: 'ZAR',
    duration_minutes: 60,
    location_type: 'client_location',
    address: null,
    latitude: null,
    longitude: null,
    tags: [],
    requirements: [],
    instant_booking: false,
    images: null
  }
}

const formData = ref(loadSavedFormData())

const simpleLocation = ref({
  city: '',
  province: ''
})

// Auto-save form data
const saveFormData = () => {
  if (process.client) {
    try {
      const dataToSave = { ...formData.value }
      delete dataToSave.images // Don't save images
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (error) {
      console.error('Error saving form data:', error)
    }
  }
}

// Clear saved form data
const clearSavedFormData = () => {
  if (process.client) {
    try {
      localStorage.removeItem(FORM_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing saved form data:', error)
    }
  }
}

// Analytics tracking
const trackEvent = (event, properties = {}) => {
  if (process.client) {
    try {
      // Basic event tracking - could be enhanced with Google Analytics, Mixpanel, etc.
      const eventData = {
        event,
        timestamp: new Date().toISOString(),
        step: currentStep.value,
        formData: {
          hasTitle: !!formData.value.title,
          hasDescription: !!formData.value.short_description,
          category: formData.value.category_id,
          priceType: formData.value.price_type,
          locationType: formData.value.location_type,
          photoCount: photos.value.length
        },
        ...properties
      }
      
      console.log('Analytics Event:', eventData)
      
      // Store events in localStorage for later batch sending
      const events = JSON.parse(localStorage.getItem('ordo_analytics_events') || '[]')
      events.push(eventData)
      
      // Keep only last 50 events to prevent storage overflow
      if (events.length > 50) {
        events.splice(0, events.length - 50)
      }
      
      localStorage.setItem('ordo_analytics_events', JSON.stringify(events))
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }
}

// Watch for form changes and auto-save
watch(formData, saveFormData, { deep: true })
watch(simpleLocation, saveFormData, { deep: true })

// Track step changes
watch(currentStep, (newStep, oldStep) => {
  if (oldStep) {
    trackEvent('wizard_step_completed', { fromStep: oldStep, toStep: newStep })
  }
})

// Track photo additions
watch(photos, (newPhotos, oldPhotos) => {
  if (newPhotos.length > (oldPhotos?.length || 0)) {
    trackEvent('photo_added', { photoCount: newPhotos.length })
  }
})

// Watch for address selection
watch(selectedAddress, (newAddress) => {
  if (newAddress) {
    handleAddressSelected(newAddress)
  } else {
    handleAddressClear()
  }
})

// Initialize wizard start time on mount
onMounted(() => {
  if (process.client && !localStorage.getItem('ordo_wizard_start_time')) {
    localStorage.setItem('ordo_wizard_start_time', Date.now().toString())
    trackEvent('wizard_started')
  }
})

// Track wizard exit
onUnmounted(() => {
  if (process.client) {
    trackEvent('wizard_exited', { 
      completedSteps: currentStep.value,
      totalSteps: totalSteps
    })
  }
})

// Popular categories with emojis for better UX
const popularCategories = ref([
  { id: '1', name: 'Beauty', emoji: '💄' },
  { id: '2', name: 'Cleaning', emoji: '🧹' },
  { id: '3', name: 'Tutoring', emoji: '📚' },
  { id: '4', name: 'Repair', emoji: '🔧' },
  { id: '5', name: 'Fitness', emoji: '💪' },
  { id: '6', name: 'Food', emoji: '🍳' }
])

// Tag suggestions
const tagSuggestions = ref([
  'Professional', 'Experienced', 'Affordable', 'Quick', 'Reliable', 
  'Certified', 'Friendly', 'Quality', 'Local', 'Mobile'
])

// Computed properties
const progress = computed(() => (currentStep.value / totalSteps) * 100)

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.title.trim() && formData.value.category_id && formData.value.short_description.trim()
    case 2:
      return photos.value.length > 0
    case 3:
      return formData.value.base_price > 0
    case 4:
      return formData.value.location_type === 'online' || (formData.value.address && formData.value.address.city && formData.value.latitude && formData.value.longitude)
    case 5:
      return true
    case 6:
      return true
    default:
      return false
  }
})

const locationDisplay = computed(() => {
  if (formData.value.location_type === 'online') {
    return 'Online service'
  } else if (formData.value.address && formData.value.address.formatted_address) {
    return formData.value.address.formatted_address
  } else if (simpleLocation.value.city && simpleLocation.value.province) {
    return `${simpleLocation.value.city}, ${simpleLocation.value.province}`
  } else {
    return 'Location not set'
  }
})

const durationDisplay = computed(() => {
  if (!formData.value.duration_minutes) return 'Duration not set'
  const hours = Math.floor(formData.value.duration_minutes / 60)
  const minutes = formData.value.duration_minutes % 60
  if (hours === 0) return `${minutes} minutes`
  if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return `${hours}h ${minutes}m`
})

// Methods
const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    emit('close')
  }
}

const nextStep = async () => {
  // Validate current step before proceeding
  if (!validateCurrentStep()) {
    return
  }
  
  if (currentStep.value < totalSteps) {
    currentStep.value++
  } else {
    await publishService()
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const selectCategory = (category) => {
  formData.value.category_id = category.id
}

// Photo handling
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addPhotos(files)
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  addPhotos(files.filter(file => file.type.startsWith('image/')))
}

const optimizeImage = async (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (max 1200px on longest side)
      const maxSize = 1200
      let { width, height } = img
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          const optimizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          resolve(optimizedFile)
        },
        'image/jpeg',
        0.85 // 85% quality
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

const addPhotos = async (files) => {
  if (files.length === 0) return
  
  processingImages.value = true
  
  try {
    for (const file of files) {
      if (photos.value.length >= 10) break
      
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select only image files')
          continue
        }
        
        // Validate file size (max 10MB before compression)
        if (file.size > 10 * 1024 * 1024) {
          alert('Image is too large. Please select images under 10MB.')
          continue
        }
        
        const optimizedFile = await optimizeImage(file)
        const preview = URL.createObjectURL(optimizedFile)
        
        photos.value.push({ 
          file: optimizedFile, 
          preview,
          originalSize: file.size,
          compressedSize: optimizedFile.size
        })
        
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Failed to process image. Please try another image.')
      }
    }
  } finally {
    processingImages.value = false
  }
}

const removePhoto = (index) => {
  URL.revokeObjectURL(photos.value[index].preview)
  photos.value.splice(index, 1)
  if (currentPhotoIndex.value >= photos.value.length) {
    currentPhotoIndex.value = Math.max(0, photos.value.length - 1)
  }
}

// Tag handling functions
const addTag = () => {
  const tag = newTag.value.trim().toLowerCase()
  if (tag && !formData.value.tags.includes(tag) && formData.value.tags.length < 5) {
    formData.value.tags.push(tag)
    newTag.value = ''
  }
}

const addSuggestedTag = (tag) => {
  if (!formData.value.tags.includes(tag.toLowerCase()) && formData.value.tags.length < 5) {
    formData.value.tags.push(tag.toLowerCase())
  }
}

const removeTag = (index) => {
  formData.value.tags.splice(index, 1)
}

// Requirement handling functions
const addRequirement = () => {
  const requirement = newRequirement.value.trim()
  if (requirement && !formData.value.requirements.includes(requirement) && formData.value.requirements.length < 5) {
    formData.value.requirements.push(requirement)
    newRequirement.value = ''
  }
}

const removeRequirement = (index) => {
  formData.value.requirements.splice(index, 1)
}

// Address handling functions
const handleAddressSelected = (addressData) => {
  if (addressData) {
    // Set the complete address object
    formData.value.address = {
      formatted_address: addressData.formatted_address,
      street_address: addressData.street_address,
      city: addressData.city,
      province: addressData.province,
      postal_code: addressData.postal_code,
      country: addressData.country,
      place_id: addressData.place_id
    }
    
    // Set coordinates
    formData.value.latitude = addressData.latitude
    formData.value.longitude = addressData.longitude
    
    // Update simple location for backward compatibility and display
    simpleLocation.value.city = addressData.city || ''
    simpleLocation.value.province = addressData.province || ''
    
    console.log('Address selected:', addressData)
  }
}

const handleAddressClear = () => {
  formData.value.address = null
  formData.value.latitude = null
  formData.value.longitude = null
  simpleLocation.value.city = ''
  simpleLocation.value.province = ''
}

// Location handling
const useCurrentLocation = async () => {
  if (!navigator.geolocation) {
    alert('Location access is not supported on this device')
    return
  }

  gettingLocation.value = true
  
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000
      })
    })

    // Simple reverse geocoding using a public API
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
    )
    
    if (response.ok) {
      const data = await response.json()
      const city = data.city || data.locality || ''
      const province = data.principalSubdivision || ''
      
      // Create a full address object similar to Google Maps format
      const currentLocationAddress = {
        formatted_address: `${city}, ${province}, South Africa`,
        street_address: '',
        city: city,
        province: province,
        postal_code: data.postcode || '',
        country: 'South Africa',
        place_id: `current_location_${Date.now()}`
      }
      
      // Set the address data
      formData.value.address = currentLocationAddress
      formData.value.latitude = position.coords.latitude
      formData.value.longitude = position.coords.longitude
      
      // Update simple location for backward compatibility
      simpleLocation.value.city = city
      simpleLocation.value.province = province
      
      console.log('Current location set:', currentLocationAddress)
    }
  } catch (error) {
    alert('Could not get your location. Please enter it manually.')
  } finally {
    gettingLocation.value = false
  }
}

// Enhanced form validation
const validateCurrentStep = () => {
  switch (currentStep.value) {
    case 1:
      if (!formData.value.title.trim()) {
        showValidationError('Please enter a service name')
        return false
      }
      if (formData.value.title.length < 5) {
        showValidationError('Service name must be at least 5 characters long')
        return false
      }
      if (!formData.value.category_id) {
        showValidationError('Please select a service category')
        return false
      }
      if (!formData.value.short_description.trim()) {
        showValidationError('Please describe your service')
        return false
      }
      if (formData.value.short_description.length < 20) {
        showValidationError('Description must be at least 20 characters long')
        return false
      }
      return true
      
    case 2:
      if (photos.value.length === 0) {
        showValidationError('Please add at least one photo of your work')
        return false
      }
      return true
      
    case 3:
      if (!formData.value.base_price || formData.value.base_price <= 0) {
        showValidationError('Please set a valid price')
        return false
      }
      if (formData.value.base_price < 10) {
        showValidationError('Minimum price is R10')
        return false
      }
      return true
      
    case 4:
      if (formData.value.location_type === 'online') {
        return true
      }
      if (!formData.value.address || !formData.value.address.city) {
        showValidationError('Please select a complete address from the suggestions')
        return false
      }
      if (!formData.value.latitude || !formData.value.longitude) {
        showValidationError('Please ensure your address has valid coordinates')
        return false
      }
      return true
      
    case 5:
    case 6:
      return true
      
    default:
      return false
  }
}

const showValidationError = (message) => {
  if (process.client) {
    const errorElement = document.createElement('div')
    errorElement.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm'
    errorElement.textContent = message
    document.body.appendChild(errorElement)
    
    setTimeout(() => {
      if (errorElement.parentNode) {
        errorElement.parentNode.removeChild(errorElement)
      }
    }, 3000)
  }
}

// Service creation with enhanced error handling
const publishService = async () => {
  try {
    // Final validation before submission
    if (!validateCurrentStep()) {
      return
    }
    
    // Validate all required fields
    if (!formData.value.title.trim()) {
      throw new Error('Service title is required')
    }
    if (!formData.value.category_id) {
      throw new Error('Please select a category')
    }
    if (!formData.value.base_price || formData.value.base_price <= 0) {
      throw new Error('Please set a valid price')
    }
    if (photos.value.length === 0) {
      throw new Error('Please add at least one photo')
    }
    
    // Prepare form data
    const serviceData = { ...formData.value }
    
    // Set address from Google Maps selection
    if (formData.value.location_type !== 'online') {
      if (!formData.value.address || !formData.value.address.city) {
        throw new Error('Please select a complete address')
      }
      
      // Use the full address object from Google Maps
      serviceData.address = formData.value.address
    }

    // Convert photos to File array
    if (photos.value.length > 0) {
      serviceData.images = photos.value.map(photo => photo.file)
    }

    // Set description if empty
    if (!serviceData.description.trim()) {
      serviceData.description = serviceData.short_description
    }

    // Validate file sizes (already optimized, but double-check)
    if (serviceData.images) {
      for (const image of serviceData.images) {
        if (image.size > 5 * 1024 * 1024) { // 5MB limit after optimization
          throw new Error(`Image "${image.name}" is too large. Please try taking a new photo.`)
        }
      }
    }

    const result = await createService(serviceData)
    
    if (!result || !result.service) {
      throw new Error('Service was created but no data was returned')
    }
    
    createdService.value = result.service
    
    // Track successful service creation
    trackEvent('service_created', {
      serviceId: result.service.id,
      category: formData.value.category_id,
      priceType: formData.value.price_type,
      locationType: formData.value.location_type,
      photoCount: photos.value.length,
      timeToComplete: Date.now() - (JSON.parse(localStorage.getItem('ordo_wizard_start_time') || Date.now()))
    })
    
    // Clear saved form data on successful submission
    clearSavedFormData()
    
    showSuccess.value = true
    
  } catch (err) {
    console.error('Failed to create service:', err)
    
    // Enhanced error messaging
    let errorMessage = 'Failed to create service. Please try again.'
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.data?.message) {
      errorMessage = err.data.message
    } else if (err.message) {
      errorMessage = err.message
    }
    
    // Handle specific error cases
    if (errorMessage.includes('validation')) {
      errorMessage = 'Please check your information and try again.'
    } else if (errorMessage.includes('network') || errorMessage.includes('Network')) {
      errorMessage = 'Network error. Please check your connection and try again.'
    } else if (errorMessage.includes('file') || errorMessage.includes('image')) {
      errorMessage = 'There was an issue with your photos. Please try uploading different images.'
    }
    
    showValidationError(errorMessage)
  }
}

const viewService = () => {
  if (createdService.value?.full_slug) {
    navigateTo(`/services/${createdService.value.full_slug}`)
  } else {
    navigateTo('/dashboard/services')
  }
}

// Load categories on mount
onMounted(async () => {
  try {
    await fetchCategories()
    // Map real categories to popular ones
    if (categories.value.length > 0) {
      popularCategories.value = categories.value.slice(0, 6).map(cat => ({
        id: cat.id,
        name: cat.name,
        emoji: getEmojiForCategory(cat.name)
      }))
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
})

const getEmojiForCategory = (name) => {
  const emojiMap = {
    'beauty': '💄', 'health': '💄', 'wellness': '💄',
    'cleaning': '🧹', 'maintenance': '🧹', 'housekeeping': '🧹',
    'education': '📚', 'tutoring': '📚', 'teaching': '📚',
    'repair': '🔧', 'handyman': '🔧', 'technical': '🔧',
    'fitness': '💪', 'sports': '💪', 'training': '💪',
    'food': '🍳', 'catering': '🍳', 'cooking': '🍳',
    'design': '🎨', 'creative': '🎨', 'art': '🎨',
    'technology': '💻', 'it': '💻', 'tech': '💻'
  }
  
  const key = name.toLowerCase()
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (key.includes(keyword)) return emoji
  }
  return '⭐'
}

// Cleanup on unmount
onUnmounted(() => {
  photos.value.forEach(photo => URL.revokeObjectURL(photo.preview))
})
</script>

<style scoped>
.touch-target {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Mobile-friendly address autocomplete */
.mobile-address-input :deep(.address-search input) {
  font-size: 16px; /* Prevents zoom on iOS */
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  min-height: 48px;
}

.mobile-address-input :deep(.address-search input:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.mobile-address-input :deep(.selected-address) {
  border-radius: 12px;
  padding: 16px;
}

/* Custom scrollbar for mobile */
::-webkit-scrollbar {
  width: 3px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
</style>