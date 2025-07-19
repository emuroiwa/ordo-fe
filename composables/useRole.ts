import { ref, readonly, computed, type Ref } from 'vue'

export type UserRole = 'customer' | 'vendor'

// Global state
const currentRole: Ref<UserRole> = ref('customer')

export const useRole = () => {
  const toggleRole = (role: UserRole): void => {
    currentRole.value = role
  }

  const setRole = (role: UserRole): void => {
    currentRole.value = role
  }

  const isCustomer = computed(() => currentRole.value === 'customer')
  const isVendor = computed(() => currentRole.value === 'vendor')

  return {
    // State
    currentRole: readonly(currentRole),
    
    // Computed
    isCustomer,
    isVendor,
    
    // Actions
    toggleRole,
    setRole
  }
}