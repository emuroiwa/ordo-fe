export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side to avoid SSR issues
  if (process.server) {
    return
  }

  const { user } = useAuth()
  const { isVendor } = useRole()

  // Wait for user data to be loaded
  if (!user.value) {
    // If no user data yet, let auth middleware handle it
    return
  }

  // Only check verification for vendors
  if (!isVendor.value) {
    return
  }

  // Check if vendor is verified
  const verificationStatus = user.value.vendor_verification_status
  
  if (verificationStatus !== 'approved') {
    // Allow access to verification routes
    if (to.path.startsWith('/vendor/verification') || to.path.startsWith('/dashboard/profile')) {
      return
    }
    
    // For vendor-specific pages, redirect to verification
    const vendorOnlyPaths = [
      '/dashboard/services',
      '/dashboard/availability', 
      '/dashboard/analytics',
      '/dashboard/earnings',
      '/dashboard/calendar'
    ]
    
    if (vendorOnlyPaths.some(path => to.path.startsWith(path))) {
      return navigateTo('/vendor/verification')
    }
  }
})