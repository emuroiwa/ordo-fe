export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8001'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8001/api',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  // Hybrid SSR/SPA configuration
  ssr: true,
  routeRules: {
    // Marketing pages - SSR for SEO
    '/': { ssr: true },
    '/about': { ssr: true },
    '/search': { ssr: true },
    '/map-search': { ssr: true },
    '/how-it-works': { ssr: true },
    
    // Dashboard - SPA for performance
    '/dashboard/**': { ssr: false },
    
    // Auth pages - SPA for better UX
    '/login': { ssr: false },
    '/register': { ssr: false },
    '/forgot-password': { ssr: false },
    '/reset-password': { ssr: false }
  }
})