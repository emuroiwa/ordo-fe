export type MiddlewareKey = "admin" | "auth" | "guest" | "vendor-verified"
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}