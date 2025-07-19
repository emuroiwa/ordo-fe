<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p class="mt-1 text-sm text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>
          
          <!-- Profile Completion -->
          <div v-if="user" class="text-right">
            <div class="text-sm text-gray-600 mb-1">Profile completion</div>
            <div class="flex items-center gap-2">
              <div class="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${profileCompletion}%` }"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900">{{ profileCompletion }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !user" class="flex items-center justify-center py-12">
      <div class="text-center">
        <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600">Loading profile...</p>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="user" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Avatar & Stats -->
        <div class="lg:col-span-1">
          <!-- Avatar Section -->
          <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div class="text-center">
              <div class="relative inline-block">
                <!-- Avatar -->
                <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4 relative">
                  <img
                    v-if="user.avatar_url"
                    :src="user.avatar_url"
                    :alt="user.name"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
                    {{ userInitials }}
                  </div>
                  
                  <!-- Upload Overlay -->
                  <div v-if="uploading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <svg class="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>

                <!-- Avatar Upload Button -->
                <label class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    ref="avatarInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleAvatarUpload"
                  >
                </label>
              </div>

              <h3 class="text-lg font-semibold text-gray-900">{{ displayName }}</h3>
              <p class="text-gray-600">{{ user.email }}</p>
              
              <!-- Role Badges -->
              <div class="flex gap-2 justify-center mt-3">
                <span
                  v-for="role in user.roles"
                  :key="role"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="role === 'vendor' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                >
                  {{ role.charAt(0).toUpperCase() + role.slice(1) }}
                </span>
              </div>

              <!-- Avatar Actions -->
              <div v-if="user.avatar" class="mt-4">
                <button
                  @click="handleDeleteAvatar"
                  class="text-sm text-red-600 hover:text-red-700"
                  :disabled="loading"
                >
                  Remove avatar
                </button>
              </div>
            </div>
          </div>

          <!-- Profile Stats -->
          <div v-if="stats" class="bg-white rounded-lg shadow-sm border p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h4>
            <div class="space-y-4">
              <div v-if="user.is_vendor" class="flex justify-between">
                <span class="text-gray-600">Services</span>
                <span class="font-medium">{{ stats.services_count }}</span>
              </div>
              <div v-if="user.is_vendor" class="flex justify-between">
                <span class="text-gray-600">Active Services</span>
                <span class="font-medium">{{ stats.active_services_count }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Member Since</span>
                <span class="font-medium">{{ stats.member_since }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Profile Complete</span>
                <span class="font-medium">{{ stats.profile_completion }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Forms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>
            <form @submit.prevent="handleUpdateProfile" class="p-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    v-model="profileForm.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    v-model="profileForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    v-model="profileForm.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <!-- Business Name (for vendors) -->
                <div v-if="user.is_vendor">
                  <label for="business_name" class="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    id="business_name"
                    v-model="profileForm.business_name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <!-- Service Category (for vendors) -->
                <div v-if="user.is_vendor" class="md:col-span-2">
                  <label for="service_category" class="block text-sm font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <input
                    id="service_category"
                    v-model="profileForm.service_category"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Web Development, Photography, Consulting"
                  >
                </div>

                <!-- Role Toggle -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div class="flex gap-4">
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.roles"
                        type="checkbox"
                        value="customer"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      >
                      <span class="ml-2 text-sm text-gray-700">Customer</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.roles"
                        type="checkbox"
                        value="vendor"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      >
                      <span class="ml-2 text-sm text-gray-700">Service Provider</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="loading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                  <span v-else>Update Profile</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Password Change -->
          <div class="bg-white rounded-lg shadow-sm border">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900">Change Password</h3>
            </div>
            <form @submit.prevent="handleUpdatePassword" class="p-6 space-y-4">
              <div>
                <label for="current_password" class="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  id="current_password"
                  v-model="passwordForm.current_password"
                  type="password"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="password"
                    v-model="passwordForm.password"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>

                <div>
                  <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="password_confirmation"
                    v-model="passwordForm.password_confirmation"
                    type="password"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
              </div>

              <div class="flex justify-end pt-4">
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="loading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Changing...
                  </span>
                  <span v-else>Change Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="successMessage"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50"
    >
      {{ successMessage }}
    </div>

    <div
      v-if="error"
      class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfileForm, PasswordForm } from '~/composables/useProfile'

// Meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// Head
useHead({
  title: 'Profile Settings - Dashboard'
})

// Composables
const {
  user,
  stats,
  loading,
  uploading,
  error,
  profileCompletion,
  displayName,
  userInitials,
  fetchProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
  deleteAvatar,
  fetchStats
} = useProfile()

// State
const avatarInput = ref<HTMLInputElement>()
const successMessage = ref('')

const profileForm = reactive<ProfileForm>({
  name: '',
  email: '',
  phone: '',
  business_name: '',
  service_category: '',
  roles: ['customer']
})

const passwordForm = reactive<PasswordForm>({
  current_password: '',
  password: '',
  password_confirmation: ''
})

// Watch for user data and populate form
watch(user, (newUser) => {
  if (newUser) {
    profileForm.name = newUser.name
    profileForm.email = newUser.email
    profileForm.phone = newUser.phone || ''
    profileForm.business_name = newUser.business_name || ''
    profileForm.service_category = newUser.service_category || ''
    profileForm.roles = [...newUser.roles]
  }
}, { immediate: true })

// Methods
const handleUpdateProfile = async () => {
  try {
    await updateProfile(profileForm)
    showSuccessMessage('Profile updated successfully!')
  } catch (err) {
    console.error('Failed to update profile:', err)
  }
}

const handleUpdatePassword = async () => {
  try {
    await updatePassword(passwordForm)
    showSuccessMessage('Password updated successfully!')
    
    // Clear password form
    passwordForm.current_password = ''
    passwordForm.password = ''
    passwordForm.password_confirmation = ''
  } catch (err) {
    console.error('Failed to update password:', err)
  }
}

const handleAvatarUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return

  try {
    await uploadAvatar(file)
    showSuccessMessage('Avatar updated successfully!')
  } catch (err) {
    console.error('Failed to upload avatar:', err)
  }

  // Clear input
  input.value = ''
}

const handleDeleteAvatar = async () => {
  if (confirm('Are you sure you want to remove your avatar?')) {
    try {
      await deleteAvatar()
      showSuccessMessage('Avatar removed successfully!')
    } catch (err) {
      console.error('Failed to delete avatar:', err)
    }
  }
}

const showSuccessMessage = (message: string) => {
  successMessage.value = message
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

// Clear error messages after 5 seconds
watch(error, (newError) => {
  if (newError) {
    setTimeout(() => {
      error.value = null
    }, 5000)
  }
})

// Fetch data on mount
onMounted(async () => {
  try {
    await Promise.all([
      fetchProfile(),
      fetchStats()
    ])
  } catch (err) {
    console.error('Failed to load profile data:', err)
  }
})
</script>