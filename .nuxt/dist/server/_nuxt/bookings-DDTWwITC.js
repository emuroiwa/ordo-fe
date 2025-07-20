import { _ as __nuxt_component_0 } from "./nuxt-layout-C7uhEWd0.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-xZuWyqv4.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext, ref, watch, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, withDirectives, vModelSelect, vModelText, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { XMarkIcon, CalendarIcon, MapPinIcon, UserIcon, ClockIcon, CheckCircleIcon, PlayIcon, CheckIcon, CurrencyDollarIcon, MagnifyingGlassIcon, EyeIcon } from "@heroicons/vue/24/outline";
import { u as useAuth } from "./useAuth-DCe-ZuTK.js";
import { u as useRole } from "./useRole-BcbisXkr.js";
import { u as useBooking } from "./useBooking-5qxCyHe_.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-2ml_FOLh.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "./cookie-DrsL3lQs.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BookingDetailsModal",
  __ssrInlineRender: true,
  props: {
    booking: {},
    userRole: {}
  },
  emits: ["close", "action"],
  setup(__props) {
    const props = __props;
    const canCancel = computed(() => {
      return props.booking.status !== "cancelled" && props.booking.status !== "completed" && new Date(props.booking.scheduled_at) > /* @__PURE__ */ new Date();
    });
    const canReschedule = computed(() => {
      return (props.booking.status === "pending" || props.booking.status === "confirmed") && new Date(props.booking.scheduled_at) > new Date(Date.now() + 24 * 60 * 60 * 1e3);
    });
    const getLocationText = (locationType) => {
      const locationMap = {
        "vendor_location": "Provider Location",
        "customer_location": "Customer Location",
        "online": "Online"
      };
      return locationMap[locationType] || locationType;
    };
    const getBookingStatusColor = (status) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-blue-100 text-blue-800",
        in_progress: "bg-green-100 text-green-800",
        completed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return statusColors[status] || "bg-gray-100 text-gray-800";
    };
    const formatStatus = (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between pb-4 border-b border-gray-200"><h3 class="text-lg font-medium text-gray-900"> Booking Details </h3><button class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "h-6 w-6" }, null, _parent));
      _push(`</button></div><div class="mt-6 space-y-6"><div class="bg-gray-50 rounded-lg p-4"><div class="flex items-center justify-between mb-4"><h4 class="text-lg font-medium text-gray-900">${ssrInterpolate((_a = _ctx.booking.service) == null ? void 0 : _a.title)}</h4><span class="${ssrRenderClass([
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getBookingStatusColor(_ctx.booking.status)
      ])}">${ssrInterpolate(formatStatus(_ctx.booking.status))}</span></div><div class="grid grid-cols-2 gap-4 text-sm"><div><span class="text-gray-500">Booking Reference:</span><p class="font-medium">#${ssrInterpolate(_ctx.booking.booking_reference)}</p></div><div><span class="text-gray-500">Total Amount:</span><p class="font-medium">R${ssrInterpolate(_ctx.booking.total_amount.toFixed(2))}</p></div><div><span class="text-gray-500">Payment Status:</span><p class="font-medium capitalize">${ssrInterpolate(_ctx.booking.payment_status)}</p></div><div><span class="text-gray-500">Duration:</span><p class="font-medium">${ssrInterpolate(_ctx.booking.duration_minutes)} minutes</p></div></div></div><div><h4 class="text-md font-medium text-gray-900 mb-3">Schedule</h4><div class="bg-blue-50 rounded-lg p-4"><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(unref(CalendarIcon), { class: "h-5 w-5 text-blue-600" }, null, _parent));
      _push(`<div><p class="font-medium text-gray-900">${ssrInterpolate(formatDate(_ctx.booking.scheduled_at))}</p><p class="text-sm text-gray-600">${ssrInterpolate(formatTime(_ctx.booking.scheduled_at))}</p></div></div><div class="mt-3 flex items-center space-x-3">`);
      _push(ssrRenderComponent(unref(MapPinIcon), { class: "h-5 w-5 text-blue-600" }, null, _parent));
      _push(`<p class="text-sm text-gray-700">${ssrInterpolate(getLocationText(_ctx.booking.location_type))}</p></div></div></div><div><h4 class="text-md font-medium text-gray-900 mb-3">Participants</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="border rounded-lg p-4"><h5 class="font-medium text-gray-900 mb-2">Customer</h5><div class="flex items-center space-x-3"><div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(UserIcon), { class: "h-6 w-6 text-gray-600" }, null, _parent));
      _push(`</div><div><p class="font-medium">${ssrInterpolate((_b = _ctx.booking.customer) == null ? void 0 : _b.name)}</p><p class="text-sm text-gray-500">${ssrInterpolate((_c = _ctx.booking.customer) == null ? void 0 : _c.email)}</p></div></div></div><div class="border rounded-lg p-4"><h5 class="font-medium text-gray-900 mb-2">Service Provider</h5><div class="flex items-center space-x-3"><div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">`);
      _push(ssrRenderComponent(unref(UserIcon), { class: "h-6 w-6 text-gray-600" }, null, _parent));
      _push(`</div><div><p class="font-medium">${ssrInterpolate((_d = _ctx.booking.vendor) == null ? void 0 : _d.name)}</p><p class="text-sm text-gray-500">${ssrInterpolate((_e = _ctx.booking.vendor) == null ? void 0 : _e.email)}</p></div></div></div></div></div>`);
      if (_ctx.booking.service) {
        _push(`<div><h4 class="text-md font-medium text-gray-900 mb-3">Service Details</h4><div class="border rounded-lg p-4"><h5 class="font-medium text-gray-900">${ssrInterpolate(_ctx.booking.service.title)}</h5><p class="text-sm text-gray-600 mt-1">${ssrInterpolate(_ctx.booking.service.short_description)}</p><div class="mt-3 flex items-center space-x-4 text-sm text-gray-500"><span>Category: ${ssrInterpolate((_f = _ctx.booking.service.category) == null ? void 0 : _f.name)}</span><span>•</span><span>Price: R${ssrInterpolate(_ctx.booking.service.base_price)}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.booking.customer_notes || _ctx.booking.vendor_notes) {
        _push(`<div><h4 class="text-md font-medium text-gray-900 mb-3">Notes</h4><div class="space-y-3">`);
        if (_ctx.booking.customer_notes) {
          _push(`<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><h5 class="text-sm font-medium text-yellow-800">Customer Notes</h5><p class="text-sm text-yellow-700 mt-1">${ssrInterpolate(_ctx.booking.customer_notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.booking.vendor_notes) {
          _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-3"><h5 class="text-sm font-medium text-blue-800">Provider Notes</h5><p class="text-sm text-blue-700 mt-1">${ssrInterpolate(_ctx.booking.vendor_notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.booking.service_address) {
        _push(`<div><h4 class="text-md font-medium text-gray-900 mb-3">Address</h4><div class="bg-gray-50 rounded-lg p-4"><div class="flex items-start space-x-3">`);
        _push(ssrRenderComponent(unref(MapPinIcon), { class: "h-5 w-5 text-gray-600 mt-0.5" }, null, _parent));
        _push(`<div><p class="text-sm text-gray-900">${ssrInterpolate(_ctx.booking.service_address.address_line_1)}</p>`);
        if (_ctx.booking.service_address.address_line_2) {
          _push(`<p class="text-sm text-gray-900">${ssrInterpolate(_ctx.booking.service_address.address_line_2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="text-sm text-gray-600">${ssrInterpolate(_ctx.booking.service_address.city)}, ${ssrInterpolate(_ctx.booking.service_address.province)} ${ssrInterpolate(_ctx.booking.service_address.postal_code)}</p></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><h4 class="text-md font-medium text-gray-900 mb-3">Payment Information</h4><div class="bg-gray-50 rounded-lg p-4"><div class="grid grid-cols-2 gap-4 text-sm"><div><span class="text-gray-500">Total Amount:</span><p class="font-medium">R${ssrInterpolate(_ctx.booking.total_amount.toFixed(2))}</p></div><div><span class="text-gray-500">Deposit:</span><p class="font-medium">R${ssrInterpolate(_ctx.booking.deposit_amount.toFixed(2))}</p></div><div><span class="text-gray-500">Payment Status:</span><p class="${ssrRenderClass([
        "font-medium capitalize",
        _ctx.booking.payment_status === "paid" ? "text-green-600" : _ctx.booking.payment_status === "partial" ? "text-yellow-600" : "text-red-600"
      ])}">${ssrInterpolate(_ctx.booking.payment_status)}</p></div><div><span class="text-gray-500">Currency:</span><p class="font-medium">${ssrInterpolate(_ctx.booking.currency)}</p></div></div></div></div></div><div class="mt-8 flex items-center justify-between pt-4 border-t border-gray-200"><div class="text-xs text-gray-500"> Created: ${ssrInterpolate(formatDate(_ctx.booking.created_at))}</div><div class="flex space-x-3">`);
      if (_ctx.userRole === "customer") {
        _push(`<!--[-->`);
        if (canReschedule.value) {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">`);
          _push(ssrRenderComponent(unref(ClockIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Reschedule </button>`);
        } else {
          _push(`<!---->`);
        }
        if (canCancel.value) {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">`);
          _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Cancel Booking </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.userRole === "vendor") {
        _push(`<!--[-->`);
        if (_ctx.booking.status === "pending") {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">`);
          _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Confirm </button>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.booking.status === "confirmed") {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">`);
          _push(ssrRenderComponent(unref(PlayIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Start Service </button>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.booking.status === "in_progress") {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">`);
          _push(ssrRenderComponent(unref(CheckIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Complete </button>`);
        } else {
          _push(`<!---->`);
        }
        if (canCancel.value) {
          _push(`<button class="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">`);
          _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
          _push(` Cancel </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Close </button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/booking/BookingDetailsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bookings",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const { currentRole, setRole, hasMultipleRoles: hasMultipleRolesFn } = useRole();
    const {
      bookings,
      loading,
      fetchBookings,
      confirmBooking,
      markInProgress,
      completeBooking,
      rescheduleBooking: rescheduleBookingAction,
      getBookingStatus,
      formatBookingTime,
      canCancelBooking,
      canRescheduleBooking
    } = useBooking();
    useHead({
      title: "Bookings - ORDO Dashboard",
      meta: [
        { name: "description", content: "Manage your service bookings and appointments" }
      ]
    });
    const selectedStatus = ref("");
    const selectedTimeframe = ref("all");
    const searchQuery = ref("");
    const currentPage = ref(1);
    const selectedBooking = ref(null);
    const rescheduleBooking = ref(null);
    const cancelBooking = ref(null);
    const userRole = computed(() => {
      if (!user.value) return "customer";
      const userRoles = user.value.roles || ["customer"];
      if (userRoles.includes("vendor") && userRoles.includes("customer")) {
        return currentRole.value;
      }
      return userRoles.includes("vendor") ? "vendor" : "customer";
    });
    const hasMultipleRoles = computed(() => {
      return hasMultipleRolesFn.value;
    });
    const filteredBookings = computed(() => {
      let filtered = [...bookings.value];
      if (selectedStatus.value) {
        filtered = filtered.filter((booking) => booking.status === selectedStatus.value);
      }
      if (selectedTimeframe.value !== "all") {
        const now = /* @__PURE__ */ new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filtered = filtered.filter((booking) => {
          const bookingDate = new Date(booking.scheduled_at);
          switch (selectedTimeframe.value) {
            case "today":
              return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1e3);
            case "week":
              const weekStart = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1e3);
              const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1e3);
              return bookingDate >= weekStart && bookingDate < weekEnd;
            case "month":
              const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
              const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);
              return bookingDate >= monthStart && bookingDate < monthEnd;
            case "upcoming":
              return bookingDate >= now;
            default:
              return true;
          }
        });
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((booking) => {
          var _a, _b, _c, _d, _e;
          return booking.booking_reference.toLowerCase().includes(query) || ((_b = (_a = booking.service) == null ? void 0 : _a.title) == null ? void 0 : _b.toLowerCase().includes(query)) || ((_e = userRole.value === "vendor" ? (_c = booking.customer) == null ? void 0 : _c.name : (_d = booking.vendor) == null ? void 0 : _d.name) == null ? void 0 : _e.toLowerCase().includes(query));
        });
      }
      return filtered;
    });
    const stats = computed(() => {
      const total = bookings.value.length;
      const pending = bookings.value.filter((b) => b.status === "pending").length;
      const completed = bookings.value.filter((b) => b.status === "completed").length;
      const revenue = bookings.value.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.total_amount, 0);
      return { total, pending, completed, revenue: revenue.toFixed(2) };
    });
    const pagination = computed(() => {
      const total = filteredBookings.value.length;
      const perPage = 10;
      const totalPages = Math.ceil(total / perPage);
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return {
        current_page: currentPage.value,
        last_page: totalPages,
        per_page: perPage,
        total,
        from: start + 1,
        to: Math.min(end, total)
      };
    });
    const filterBookings = async () => {
      currentPage.value = 1;
      await loadBookings();
    };
    const loadBookings = async () => {
      try {
        const filters = {
          type: userRole.value,
          per_page: 50
          // Load more for client-side filtering
        };
        if (selectedStatus.value) {
          filters.status = selectedStatus.value;
        }
        await fetchBookings(filters);
      } catch (err) {
        console.error("Failed to load bookings:", err);
      }
    };
    const getLocationText = (locationType) => {
      const locationMap = {
        "vendor_location": "Provider Location",
        "customer_location": "Customer Location",
        "online": "Online"
      };
      return locationMap[locationType] || locationType;
    };
    const viewBookingDetails = (booking) => {
      selectedBooking.value = booking;
    };
    const handleReschedule = (booking) => {
      rescheduleBooking.value = booking;
    };
    const handleCancel = (booking) => {
      cancelBooking.value = booking;
    };
    const handleConfirm = async (booking) => {
      try {
        await confirmBooking(booking.id);
        await loadBookings();
      } catch (err) {
        console.error("Failed to confirm booking:", err);
      }
    };
    const handleStartService = async (booking) => {
      try {
        await markInProgress(booking.id);
        await loadBookings();
      } catch (err) {
        console.error("Failed to start service:", err);
      }
    };
    const handleComplete = async (booking) => {
      try {
        await completeBooking(booking.id);
        await loadBookings();
      } catch (err) {
        console.error("Failed to complete booking:", err);
      }
    };
    const handleRescheduleConfirm = async (booking, newDateTime) => {
      try {
        await rescheduleBookingAction(booking.id, newDateTime);
        rescheduleBooking.value = null;
        await loadBookings();
      } catch (err) {
        console.error("Failed to reschedule booking:", err);
      }
    };
    const handleCancelConfirm = async (booking, reason) => {
      cancelBooking.value = null;
      await loadBookings();
      console.log("Booking cancelled successfully");
    };
    const handleBookingAction = async (action, booking) => {
      switch (action) {
        case "confirm":
          await handleConfirm(booking);
          break;
        case "start":
          await handleStartService(booking);
          break;
        case "complete":
          await handleComplete(booking);
          break;
        case "cancel":
          handleCancel(booking);
          break;
        case "reschedule":
          handleReschedule(booking);
          break;
      }
      selectedBooking.value = null;
    };
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (currentPage.value < pagination.value.last_page) {
        currentPage.value++;
      }
    };
    watch(userRole, () => {
      loadBookings();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_BookingDetailsModal = _sfc_main$1;
      const _component_RescheduleModal = resolveComponent("RescheduleModal");
      const _component_CancelModal = resolveComponent("CancelModal");
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (hasMultipleRoles.value) {
              _push2(`<div class="mb-6 flex items-center justify-end"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>View as:</span><div class="bg-gray-100 p-1 rounded-lg flex"${_scopeId}><button class="${ssrRenderClass([
                "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                userRole.value === "customer" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              ])}"${_scopeId}> Customer </button><button class="${ssrRenderClass([
                "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                userRole.value === "vendor" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
              ])}"${_scopeId}> Provider </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"${_scopeId}><div class="bg-white rounded-lg shadow p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="p-2 bg-blue-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CalendarIcon), { class: "w-6 h-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Bookings</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(stats.value.total)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="p-2 bg-yellow-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ClockIcon), { class: "w-6 h-6 text-yellow-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Pending</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(stats.value.pending)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="p-2 bg-green-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Completed</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(stats.value.completed)}</p></div></div></div><div class="bg-white rounded-lg shadow p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="p-2 bg-purple-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-purple-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>${ssrInterpolate(userRole.value === "vendor" ? "Revenue" : "Spent")}</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>R${ssrInterpolate(stats.value.revenue)}</p></div></div></div></div><div class="bg-white rounded-lg shadow p-6 mb-8"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0"${_scopeId}><div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"${_scopeId}><select class="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "") : ssrLooseEqual(selectedStatus.value, "")) ? " selected" : ""}${_scopeId}>All Status</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "pending") : ssrLooseEqual(selectedStatus.value, "pending")) ? " selected" : ""}${_scopeId}>Pending</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "confirmed") : ssrLooseEqual(selectedStatus.value, "confirmed")) ? " selected" : ""}${_scopeId}>Confirmed</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "in_progress") : ssrLooseEqual(selectedStatus.value, "in_progress")) ? " selected" : ""}${_scopeId}>In Progress</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "completed") : ssrLooseEqual(selectedStatus.value, "completed")) ? " selected" : ""}${_scopeId}>Completed</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(selectedStatus.value) ? ssrLooseContain(selectedStatus.value, "cancelled") : ssrLooseEqual(selectedStatus.value, "cancelled")) ? " selected" : ""}${_scopeId}>Cancelled</option></select><select class="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(selectedTimeframe.value) ? ssrLooseContain(selectedTimeframe.value, "all") : ssrLooseEqual(selectedTimeframe.value, "all")) ? " selected" : ""}${_scopeId}>All Time</option><option value="today"${ssrIncludeBooleanAttr(Array.isArray(selectedTimeframe.value) ? ssrLooseContain(selectedTimeframe.value, "today") : ssrLooseEqual(selectedTimeframe.value, "today")) ? " selected" : ""}${_scopeId}>Today</option><option value="week"${ssrIncludeBooleanAttr(Array.isArray(selectedTimeframe.value) ? ssrLooseContain(selectedTimeframe.value, "week") : ssrLooseEqual(selectedTimeframe.value, "week")) ? " selected" : ""}${_scopeId}>This Week</option><option value="month"${ssrIncludeBooleanAttr(Array.isArray(selectedTimeframe.value) ? ssrLooseContain(selectedTimeframe.value, "month") : ssrLooseEqual(selectedTimeframe.value, "month")) ? " selected" : ""}${_scopeId}>This Month</option><option value="upcoming"${ssrIncludeBooleanAttr(Array.isArray(selectedTimeframe.value) ? ssrLooseContain(selectedTimeframe.value, "upcoming") : ssrLooseEqual(selectedTimeframe.value, "upcoming")) ? " selected" : ""}${_scopeId}>Upcoming</option></select></div><div class="relative"${_scopeId}><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search bookings..." class="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-5 w-5 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
            if (unref(loading)) {
              _push2(`<div class="flex justify-center items-center py-12"${_scopeId}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"${_scopeId}></div></div>`);
            } else if (filteredBookings.value.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CalendarIcon), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No bookings found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(userRole.value === "vendor" ? "Your services haven't been booked yet." : "You haven't made any bookings yet.")}</p><div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: userRole.value === "vendor" ? "/dashboard/services" : "/search",
                class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(userRole.value === "vendor" ? "Create Service" : "Browse Services")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(userRole.value === "vendor" ? "Create Service" : "Browse Services"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(filteredBookings.value, (booking) => {
                var _a, _b, _c;
                _push2(`<div class="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a = booking.service) == null ? void 0 : _a.title) || "Service")}</h3><span class="${ssrRenderClass([
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  unref(getBookingStatus)(booking).color
                ])}"${_scopeId}>${ssrInterpolate(unref(getBookingStatus)(booking).text)}</span></div><div class="text-right"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Booking #${ssrInterpolate(booking.booking_reference)}</p><p class="text-lg font-semibold text-gray-900"${_scopeId}> R${ssrInterpolate(booking.total_amount.toFixed(2))}</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(userRole.value === "vendor" ? "Customer" : "Provider")}</p><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(userRole.value === "vendor" ? (_b = booking.customer) == null ? void 0 : _b.name : (_c = booking.vendor) == null ? void 0 : _c.name)}</p></div><div${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Date &amp; Time</p><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(unref(formatBookingTime)(booking.scheduled_at).date)}</p><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(unref(formatBookingTime)(booking.scheduled_at).time)}</p></div><div${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Duration</p><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(booking.duration_minutes)} minutes </p></div><div${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Location</p><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(getLocationText(booking.location_type))}</p></div></div>`);
                if (booking.customer_notes || booking.vendor_notes) {
                  _push2(`<div class="mb-4"${_scopeId}>`);
                  if (booking.customer_notes) {
                    _push2(`<div class="mb-2"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Customer Notes:</p><p class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(booking.customer_notes)}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (booking.vendor_notes) {
                    _push2(`<div${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Provider Notes:</p><p class="text-sm text-gray-700"${_scopeId}>${ssrInterpolate(booking.vendor_notes)}</p></div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex flex-wrap items-center gap-2"${_scopeId}>`);
                if (userRole.value === "customer") {
                  _push2(`<!--[-->`);
                  if (unref(canRescheduleBooking)(booking)) {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(ClockIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Reschedule </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (unref(canCancelBooking)(booking)) {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(XMarkIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Cancel </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                if (userRole.value === "vendor") {
                  _push2(`<!--[-->`);
                  if (booking.status === "pending") {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Confirm </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (booking.status === "confirmed") {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(PlayIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Start Service </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (booking.status === "in_progress") {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(CheckIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Complete </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (unref(canCancelBooking)(booking)) {
                    _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"${_scopeId}>`);
                    _push2(ssrRenderComponent(unref(XMarkIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                    _push2(` Cancel </button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(EyeIcon), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
                _push2(` View Details </button></div></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (pagination.value.total > pagination.value.per_page) {
              _push2(`<div class="mt-8"${_scopeId}><nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow"${_scopeId}><div class="hidden sm:block"${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(pagination.value.from)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(pagination.value.to)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(pagination.value.total)}</span> results </p></div><div class="flex-1 flex justify-between sm:justify-end"${_scopeId}><button${ssrIncludeBooleanAttr(pagination.value.current_page <= 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Previous </button><button${ssrIncludeBooleanAttr(pagination.value.current_page >= pagination.value.last_page) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}> Next </button></div></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (selectedBooking.value) {
              _push2(ssrRenderComponent(_component_BookingDetailsModal, {
                booking: selectedBooking.value,
                "user-role": userRole.value,
                onClose: ($event) => selectedBooking.value = null,
                onAction: handleBookingAction
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (rescheduleBooking.value) {
              _push2(ssrRenderComponent(_component_RescheduleModal, {
                booking: rescheduleBooking.value,
                onClose: ($event) => rescheduleBooking.value = null,
                onReschedule: handleRescheduleConfirm
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (cancelBooking.value) {
              _push2(ssrRenderComponent(_component_CancelModal, {
                booking: cancelBooking.value,
                "user-role": userRole.value,
                onClose: ($event) => cancelBooking.value = null,
                onCancel: handleCancelConfirm
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                hasMultipleRoles.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 flex items-center justify-end"
                }, [
                  createVNode("div", { class: "flex items-center space-x-2" }, [
                    createVNode("span", { class: "text-sm text-gray-500" }, "View as:"),
                    createVNode("div", { class: "bg-gray-100 p-1 rounded-lg flex" }, [
                      createVNode("button", {
                        onClick: ($event) => unref(setRole)("customer"),
                        class: [
                          "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                          userRole.value === "customer" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        ]
                      }, " Customer ", 10, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => unref(setRole)("vendor"),
                        class: [
                          "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                          userRole.value === "vendor" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        ]
                      }, " Provider ", 10, ["onClick"])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-2 bg-blue-100 rounded-lg" }, [
                        createVNode(unref(CalendarIcon), { class: "w-6 h-6 text-blue-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Bookings"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(stats.value.total), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-2 bg-yellow-100 rounded-lg" }, [
                        createVNode(unref(ClockIcon), { class: "w-6 h-6 text-yellow-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Pending"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(stats.value.pending), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-2 bg-green-100 rounded-lg" }, [
                        createVNode(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Completed"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(stats.value.completed), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow p-6" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-2 bg-purple-100 rounded-lg" }, [
                        createVNode(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-purple-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, toDisplayString(userRole.value === "vendor" ? "Revenue" : "Spent"), 1),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, "R" + toDisplayString(stats.value.revenue), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow p-6 mb-8" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => selectedStatus.value = $event,
                        onChange: filterBookings,
                        class: "block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      }, [
                        createVNode("option", { value: "" }, "All Status"),
                        createVNode("option", { value: "pending" }, "Pending"),
                        createVNode("option", { value: "confirmed" }, "Confirmed"),
                        createVNode("option", { value: "in_progress" }, "In Progress"),
                        createVNode("option", { value: "completed" }, "Completed"),
                        createVNode("option", { value: "cancelled" }, "Cancelled")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, selectedStatus.value]
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => selectedTimeframe.value = $event,
                        onChange: filterBookings,
                        class: "block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      }, [
                        createVNode("option", { value: "all" }, "All Time"),
                        createVNode("option", { value: "today" }, "Today"),
                        createVNode("option", { value: "week" }, "This Week"),
                        createVNode("option", { value: "month" }, "This Month"),
                        createVNode("option", { value: "upcoming" }, "Upcoming")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, selectedTimeframe.value]
                      ])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                        onInput: filterBookings,
                        type: "text",
                        placeholder: "Search bookings...",
                        class: "block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchQuery.value]
                      ]),
                      createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                        createVNode(unref(MagnifyingGlassIcon), { class: "h-5 w-5 text-gray-400" })
                      ])
                    ])
                  ])
                ]),
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex justify-center items-center py-12"
                }, [
                  createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" })
                ])) : filteredBookings.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-center py-12"
                }, [
                  createVNode(unref(CalendarIcon), { class: "mx-auto h-12 w-12 text-gray-400" }),
                  createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No bookings found"),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500" }, toDisplayString(userRole.value === "vendor" ? "Your services haven't been booked yet." : "You haven't made any bookings yet."), 1),
                  createVNode("div", { class: "mt-6" }, [
                    createVNode(_component_NuxtLink, {
                      to: userRole.value === "vendor" ? "/dashboard/services" : "/search",
                      class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(userRole.value === "vendor" ? "Create Service" : "Browse Services"), 1)
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 3,
                  class: "space-y-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredBookings.value, (booking) => {
                    var _a, _b, _c;
                    return openBlock(), createBlock("div", {
                      key: booking.id,
                      class: "bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                    }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-start justify-between" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("div", { class: "flex items-center space-x-3" }, [
                                createVNode("h3", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_a = booking.service) == null ? void 0 : _a.title) || "Service"), 1),
                                createVNode("span", {
                                  class: [
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                    unref(getBookingStatus)(booking).color
                                  ]
                                }, toDisplayString(unref(getBookingStatus)(booking).text), 3)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Booking #" + toDisplayString(booking.booking_reference), 1),
                                createVNode("p", { class: "text-lg font-semibold text-gray-900" }, " R" + toDisplayString(booking.total_amount.toFixed(2)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(userRole.value === "vendor" ? "Customer" : "Provider"), 1),
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(userRole.value === "vendor" ? (_b = booking.customer) == null ? void 0 : _b.name : (_c = booking.vendor) == null ? void 0 : _c.name), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Date & Time"),
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(unref(formatBookingTime)(booking.scheduled_at).date), 1),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(unref(formatBookingTime)(booking.scheduled_at).time), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Duration"),
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(booking.duration_minutes) + " minutes ", 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Location"),
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(getLocationText(booking.location_type)), 1)
                              ])
                            ]),
                            booking.customer_notes || booking.vendor_notes ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mb-4"
                            }, [
                              booking.customer_notes ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mb-2"
                              }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Customer Notes:"),
                                createVNode("p", { class: "text-sm text-gray-700" }, toDisplayString(booking.customer_notes), 1)
                              ])) : createCommentVNode("", true),
                              booking.vendor_notes ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, "Provider Notes:"),
                                createVNode("p", { class: "text-sm text-gray-700" }, toDisplayString(booking.vendor_notes), 1)
                              ])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                              userRole.value === "customer" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                unref(canRescheduleBooking)(booking) ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => handleReschedule(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                }, [
                                  createVNode(unref(ClockIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Reschedule ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canCancelBooking)(booking) ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => handleCancel(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                }, [
                                  createVNode(unref(XMarkIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Cancel ")
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ], 64)) : createCommentVNode("", true),
                              userRole.value === "vendor" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                                booking.status === "pending" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => handleConfirm(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                }, [
                                  createVNode(unref(CheckCircleIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Confirm ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                booking.status === "confirmed" ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => handleStartService(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                }, [
                                  createVNode(unref(PlayIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Start Service ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                booking.status === "in_progress" ? (openBlock(), createBlock("button", {
                                  key: 2,
                                  onClick: ($event) => handleComplete(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                }, [
                                  createVNode(unref(CheckIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Complete ")
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                unref(canCancelBooking)(booking) ? (openBlock(), createBlock("button", {
                                  key: 3,
                                  onClick: ($event) => handleCancel(booking),
                                  class: "inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                }, [
                                  createVNode(unref(XMarkIcon), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Cancel ")
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ], 64)) : createCommentVNode("", true),
                              createVNode("button", {
                                onClick: ($event) => viewBookingDetails(booking),
                                class: "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              }, [
                                createVNode(unref(EyeIcon), { class: "w-4 h-4 mr-1" }),
                                createTextVNode(" View Details ")
                              ], 8, ["onClick"])
                            ])
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ])),
                pagination.value.total > pagination.value.per_page ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "mt-8"
                }, [
                  createVNode("nav", { class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow" }, [
                    createVNode("div", { class: "hidden sm:block" }, [
                      createVNode("p", { class: "text-sm text-gray-700" }, [
                        createTextVNode(" Showing "),
                        createVNode("span", { class: "font-medium" }, toDisplayString(pagination.value.from), 1),
                        createTextVNode(" to "),
                        createVNode("span", { class: "font-medium" }, toDisplayString(pagination.value.to), 1),
                        createTextVNode(" of "),
                        createVNode("span", { class: "font-medium" }, toDisplayString(pagination.value.total), 1),
                        createTextVNode(" results ")
                      ])
                    ]),
                    createVNode("div", { class: "flex-1 flex justify-between sm:justify-end" }, [
                      createVNode("button", {
                        onClick: previousPage,
                        disabled: pagination.value.current_page <= 1,
                        class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      }, " Previous ", 8, ["disabled"]),
                      createVNode("button", {
                        onClick: nextPage,
                        disabled: pagination.value.current_page >= pagination.value.last_page,
                        class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      }, " Next ", 8, ["disabled"])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                selectedBooking.value ? (openBlock(), createBlock(_component_BookingDetailsModal, {
                  key: 5,
                  booking: selectedBooking.value,
                  "user-role": userRole.value,
                  onClose: ($event) => selectedBooking.value = null,
                  onAction: handleBookingAction
                }, null, 8, ["booking", "user-role", "onClose"])) : createCommentVNode("", true),
                rescheduleBooking.value ? (openBlock(), createBlock(_component_RescheduleModal, {
                  key: 6,
                  booking: rescheduleBooking.value,
                  onClose: ($event) => rescheduleBooking.value = null,
                  onReschedule: handleRescheduleConfirm
                }, null, 8, ["booking", "onClose"])) : createCommentVNode("", true),
                cancelBooking.value ? (openBlock(), createBlock(_component_CancelModal, {
                  key: 7,
                  booking: cancelBooking.value,
                  "user-role": userRole.value,
                  onClose: ($event) => cancelBooking.value = null,
                  onCancel: handleCancelConfirm
                }, null, 8, ["booking", "user-role", "onClose"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/bookings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=bookings-DDTWwITC.js.map
