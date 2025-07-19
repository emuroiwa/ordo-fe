// Nuxt auto-imports type declarations
declare global {
  const useRuntimeConfig: typeof import('#app').useRuntimeConfig
  const $fetch: typeof import('#app').$fetch
  const navigateTo: typeof import('#app').navigateTo
  const useAuth: () => ReturnType<typeof import('~/composables/useAuth').useAuth>
  const useRole: () => ReturnType<typeof import('~/composables/useRole').useRole>
  const useNotifications: () => ReturnType<typeof import('~/composables/useNotifications').useNotifications>
  const computed: typeof import('vue').computed
  const readonly: typeof import('vue').readonly
}

export {}