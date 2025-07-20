import { ref, readonly, computed, type Ref } from 'vue'

export type UserRole = 'customer' | 'vendor'

// Global state
const currentRole: Ref<UserRole> = ref('customer')

export const useRole = () => {
  const { user } = useAuth()

  const toggleRole = (role: UserRole): void => {
    if (hasRole(role)) {
      currentRole.value = role
    }
  }

  const setRole = (role: UserRole): void => {
    if (hasRole(role)) {
      currentRole.value = role
    }
  }

  const hasRole = (role: UserRole): boolean => {
    return user.value?.roles?.includes(role) || false
  }

  const hasMultipleRoles = computed(() => {
    const userRoles = user.value?.roles || []
    const hasMultiple = userRoles.includes('customer') && userRoles.includes('vendor')
    console.log('hasMultipleRoles debug:', { userRoles, hasMultiple, user: user.value })
    return hasMultiple
  })

  const primaryRole = computed(() => {
    const userRoles = user.value?.roles || ['customer']
    if (userRoles.includes('vendor')) return 'vendor'
    return 'customer'
  })

  const isCustomer = computed(() => currentRole.value === 'customer')
  const isVendor = computed(() => currentRole.value === 'vendor')

  // Auto-set role based on user's roles
  const initializeRole = () => {
    if (user.value?.roles) {
      if (user.value.roles.includes('vendor') && user.value.roles.includes('customer')) {
        // User has both roles, keep current selection or default to vendor
        if (!hasRole(currentRole.value)) {
          currentRole.value = 'vendor'
        }
      } else if (user.value.roles.includes('vendor')) {
        currentRole.value = 'vendor'
      } else {
        currentRole.value = 'customer'
      }
    }
  }

  return {
    // State
    currentRole: readonly(currentRole),
    
    // Computed
    isCustomer,
    isVendor,
    hasMultipleRoles,
    primaryRole,
    
    // Actions
    toggleRole,
    setRole,
    hasRole,
    initializeRole
  }
}