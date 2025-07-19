import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})