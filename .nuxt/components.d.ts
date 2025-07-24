
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AnalyticsQuickStats': typeof import("../components/Analytics/QuickStats.vue")['default']
    'BookingModal': typeof import("../components/BookingModal.vue")['default']
    'EarningsQuickStats': typeof import("../components/Earnings/QuickStats.vue")['default']
    'GoogleMapsAddressAutocomplete': typeof import("../components/GoogleMapsAddressAutocomplete.vue")['default']
    'GoogleMapsView': typeof import("../components/GoogleMapsView.vue")['default']
    'ImageUpload': typeof import("../components/ImageUpload.vue")['default']
    'LocationSelector': typeof import("../components/LocationSelector.vue")['default']
    'ServiceCreationWizard': typeof import("../components/ServiceCreationWizard.vue")['default']
    'ServiceForm': typeof import("../components/ServiceForm.vue")['default']
    'VendorVerificationBanner': typeof import("../components/VendorVerificationBanner.vue")['default']
    'BookingAvailabilityCalendar': typeof import("../components/booking/AvailabilityCalendar.vue")['default']
    'BookingDetailsModal': typeof import("../components/booking/BookingDetailsModal.vue")['default']
    'BookingForm': typeof import("../components/booking/BookingForm.vue")['default']
    'BookingCancelModal': typeof import("../components/booking/CancelModal.vue")['default']
    'BookingEmptyBookings': typeof import("../components/booking/EmptyBookings.vue")['default']
    'BookingRescheduleModal': typeof import("../components/booking/RescheduleModal.vue")['default']
    'CalendarAppointmentModal': typeof import("../components/calendar/AppointmentModal.vue")['default']
    'CalendarAvailabilityModal': typeof import("../components/calendar/AvailabilityModal.vue")['default']
    'CalendarBookingModal': typeof import("../components/calendar/BookingModal.vue")['default']
    'NotificationsNotificationDropdown': typeof import("../components/notifications/NotificationDropdown.vue")['default']
    'NotificationsNotificationItem': typeof import("../components/notifications/NotificationItem.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
      'LazyAnalyticsQuickStats': LazyComponent<typeof import("../components/Analytics/QuickStats.vue")['default']>
    'LazyBookingModal': LazyComponent<typeof import("../components/BookingModal.vue")['default']>
    'LazyEarningsQuickStats': LazyComponent<typeof import("../components/Earnings/QuickStats.vue")['default']>
    'LazyGoogleMapsAddressAutocomplete': LazyComponent<typeof import("../components/GoogleMapsAddressAutocomplete.vue")['default']>
    'LazyGoogleMapsView': LazyComponent<typeof import("../components/GoogleMapsView.vue")['default']>
    'LazyImageUpload': LazyComponent<typeof import("../components/ImageUpload.vue")['default']>
    'LazyLocationSelector': LazyComponent<typeof import("../components/LocationSelector.vue")['default']>
    'LazyServiceCreationWizard': LazyComponent<typeof import("../components/ServiceCreationWizard.vue")['default']>
    'LazyServiceForm': LazyComponent<typeof import("../components/ServiceForm.vue")['default']>
    'LazyVendorVerificationBanner': LazyComponent<typeof import("../components/VendorVerificationBanner.vue")['default']>
    'LazyBookingAvailabilityCalendar': LazyComponent<typeof import("../components/booking/AvailabilityCalendar.vue")['default']>
    'LazyBookingDetailsModal': LazyComponent<typeof import("../components/booking/BookingDetailsModal.vue")['default']>
    'LazyBookingForm': LazyComponent<typeof import("../components/booking/BookingForm.vue")['default']>
    'LazyBookingCancelModal': LazyComponent<typeof import("../components/booking/CancelModal.vue")['default']>
    'LazyBookingEmptyBookings': LazyComponent<typeof import("../components/booking/EmptyBookings.vue")['default']>
    'LazyBookingRescheduleModal': LazyComponent<typeof import("../components/booking/RescheduleModal.vue")['default']>
    'LazyCalendarAppointmentModal': LazyComponent<typeof import("../components/calendar/AppointmentModal.vue")['default']>
    'LazyCalendarAvailabilityModal': LazyComponent<typeof import("../components/calendar/AvailabilityModal.vue")['default']>
    'LazyCalendarBookingModal': LazyComponent<typeof import("../components/calendar/BookingModal.vue")['default']>
    'LazyNotificationsNotificationDropdown': LazyComponent<typeof import("../components/notifications/NotificationDropdown.vue")['default']>
    'LazyNotificationsNotificationItem': LazyComponent<typeof import("../components/notifications/NotificationItem.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AnalyticsQuickStats: typeof import("../components/Analytics/QuickStats.vue")['default']
export const BookingModal: typeof import("../components/BookingModal.vue")['default']
export const EarningsQuickStats: typeof import("../components/Earnings/QuickStats.vue")['default']
export const GoogleMapsAddressAutocomplete: typeof import("../components/GoogleMapsAddressAutocomplete.vue")['default']
export const GoogleMapsView: typeof import("../components/GoogleMapsView.vue")['default']
export const ImageUpload: typeof import("../components/ImageUpload.vue")['default']
export const LocationSelector: typeof import("../components/LocationSelector.vue")['default']
export const ServiceCreationWizard: typeof import("../components/ServiceCreationWizard.vue")['default']
export const ServiceForm: typeof import("../components/ServiceForm.vue")['default']
export const VendorVerificationBanner: typeof import("../components/VendorVerificationBanner.vue")['default']
export const BookingAvailabilityCalendar: typeof import("../components/booking/AvailabilityCalendar.vue")['default']
export const BookingDetailsModal: typeof import("../components/booking/BookingDetailsModal.vue")['default']
export const BookingForm: typeof import("../components/booking/BookingForm.vue")['default']
export const BookingCancelModal: typeof import("../components/booking/CancelModal.vue")['default']
export const BookingEmptyBookings: typeof import("../components/booking/EmptyBookings.vue")['default']
export const BookingRescheduleModal: typeof import("../components/booking/RescheduleModal.vue")['default']
export const CalendarAppointmentModal: typeof import("../components/calendar/AppointmentModal.vue")['default']
export const CalendarAvailabilityModal: typeof import("../components/calendar/AvailabilityModal.vue")['default']
export const CalendarBookingModal: typeof import("../components/calendar/BookingModal.vue")['default']
export const NotificationsNotificationDropdown: typeof import("../components/notifications/NotificationDropdown.vue")['default']
export const NotificationsNotificationItem: typeof import("../components/notifications/NotificationItem.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const LazyAnalyticsQuickStats: LazyComponent<typeof import("../components/Analytics/QuickStats.vue")['default']>
export const LazyBookingModal: LazyComponent<typeof import("../components/BookingModal.vue")['default']>
export const LazyEarningsQuickStats: LazyComponent<typeof import("../components/Earnings/QuickStats.vue")['default']>
export const LazyGoogleMapsAddressAutocomplete: LazyComponent<typeof import("../components/GoogleMapsAddressAutocomplete.vue")['default']>
export const LazyGoogleMapsView: LazyComponent<typeof import("../components/GoogleMapsView.vue")['default']>
export const LazyImageUpload: LazyComponent<typeof import("../components/ImageUpload.vue")['default']>
export const LazyLocationSelector: LazyComponent<typeof import("../components/LocationSelector.vue")['default']>
export const LazyServiceCreationWizard: LazyComponent<typeof import("../components/ServiceCreationWizard.vue")['default']>
export const LazyServiceForm: LazyComponent<typeof import("../components/ServiceForm.vue")['default']>
export const LazyVendorVerificationBanner: LazyComponent<typeof import("../components/VendorVerificationBanner.vue")['default']>
export const LazyBookingAvailabilityCalendar: LazyComponent<typeof import("../components/booking/AvailabilityCalendar.vue")['default']>
export const LazyBookingDetailsModal: LazyComponent<typeof import("../components/booking/BookingDetailsModal.vue")['default']>
export const LazyBookingForm: LazyComponent<typeof import("../components/booking/BookingForm.vue")['default']>
export const LazyBookingCancelModal: LazyComponent<typeof import("../components/booking/CancelModal.vue")['default']>
export const LazyBookingEmptyBookings: LazyComponent<typeof import("../components/booking/EmptyBookings.vue")['default']>
export const LazyBookingRescheduleModal: LazyComponent<typeof import("../components/booking/RescheduleModal.vue")['default']>
export const LazyCalendarAppointmentModal: LazyComponent<typeof import("../components/calendar/AppointmentModal.vue")['default']>
export const LazyCalendarAvailabilityModal: LazyComponent<typeof import("../components/calendar/AvailabilityModal.vue")['default']>
export const LazyCalendarBookingModal: LazyComponent<typeof import("../components/calendar/BookingModal.vue")['default']>
export const LazyNotificationsNotificationDropdown: LazyComponent<typeof import("../components/notifications/NotificationDropdown.vue")['default']>
export const LazyNotificationsNotificationItem: LazyComponent<typeof import("../components/notifications/NotificationItem.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>

export const componentNames: string[]
