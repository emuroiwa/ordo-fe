export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()
  const { isAdmin } = useRole()

  // Check if user is authenticated
  if (!user.value) {
    return navigateTo('/login')
  }

  // Check if user has admin role
  if (!isAdmin.value) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access Denied - Administrator privileges required'
    })
  }
})