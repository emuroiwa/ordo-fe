import { _ as __nuxt_component_0 } from "./nuxt-layout-C7uhEWd0.js";
import { readonly, ref, defineComponent, mergeProps, unref, useSSRContext, computed, watch, withCtx, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { XMarkIcon, PlusIcon, ExclamationTriangleIcon, CheckIcon, PlayIcon, CheckCircleIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "@heroicons/vue/24/outline";
import { a as useRuntimeConfig } from "../server.mjs";
import { u as useCookie } from "./cookie-DrsL3lQs.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
import { u as useBooking } from "./useBooking-5qxCyHe_.js";
import { u as useHead } from "./v3-2ml_FOLh.js";
import { u as useAuth } from "./useAuth-DCe-ZuTK.js";
import { u as useRole } from "./useRole-BcbisXkr.js";
import "vue-router";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
const availabilities = ref([]);
const loading = ref(false);
const error = ref(null);
const useAvailability = () => {
  const config = useRuntimeConfig();
  const makeApiCall = async (url, options = {}) => {
    const tokenCookie = useCookie("auth-token");
    const headers = {
      "Accept": "application/json",
      ...options.headers
    };
    if (tokenCookie.value) {
      headers["Authorization"] = `Bearer ${tokenCookie.value}`;
    }
    if (options.method !== "GET" && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    });
  };
  const fetchAvailabilities = async (filters = {}) => {
    try {
      loading.value = true;
      error.value = null;
      const params = new URLSearchParams();
      if (filters.date) {
        params.append("date", filters.date);
      }
      if (filters.day_of_week) {
        params.append("day_of_week", filters.day_of_week);
      }
      const url = `/api/v1/availability${params.toString() ? "?" + params.toString() : ""}`;
      const response = await makeApiCall(url);
      if (response.success) {
        availabilities.value = response.data;
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch availabilities");
      }
    } catch (err) {
      error.value = err.message || "Failed to fetch availabilities";
      console.error("Fetch availabilities error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const createAvailability = async (data) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await makeApiCall("/api/v1/availability", {
        method: "POST",
        body: JSON.stringify(data)
      });
      if (response.success) {
        if (Array.isArray(response.data)) {
          availabilities.value.push(...response.data);
        } else {
          availabilities.value.push(response.data);
        }
        return response.data;
      } else {
        throw new Error(response.message || "Failed to create availability");
      }
    } catch (err) {
      error.value = err.message || "Failed to create availability";
      console.error("Create availability error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateAvailability = async (id, data) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await makeApiCall(`/api/v1/availability/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
      if (response.success) {
        const index = availabilities.value.findIndex((a) => a.id === id);
        if (index !== -1) {
          availabilities.value[index] = response.data;
        }
        return response.data;
      } else {
        throw new Error(response.message || "Failed to update availability");
      }
    } catch (err) {
      error.value = err.message || "Failed to update availability";
      console.error("Update availability error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const deleteAvailability = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await makeApiCall(`/api/v1/availability/${id}`, {
        method: "DELETE"
      });
      if (response.success) {
        availabilities.value = availabilities.value.filter((a) => a.id !== id);
        return true;
      } else {
        throw new Error(response.message || "Failed to delete availability");
      }
    } catch (err) {
      error.value = err.message || "Failed to delete availability";
      console.error("Delete availability error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getTimeSlots = async (date, serviceId) => {
    try {
      loading.value = true;
      error.value = null;
      const params = new URLSearchParams({ date });
      if (serviceId) {
        params.append("service_id", serviceId);
      }
      const response = await makeApiCall(`/api/v1/availability/time-slots?${params.toString()}`);
      if (response.success) {
        return {
          slots: response.data,
          meta: response.meta
        };
      } else {
        throw new Error(response.message || "Failed to get time slots");
      }
    } catch (err) {
      error.value = err.message || "Failed to get time slots";
      console.error("Get time slots error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const getWeeklyOverview = async (startDate) => {
    try {
      loading.value = true;
      error.value = null;
      const params = new URLSearchParams();
      if (startDate) {
        params.append("start_date", startDate);
      }
      const url = `/api/v1/availability/weekly-overview${params.toString() ? "?" + params.toString() : ""}`;
      const response = await makeApiCall(url);
      if (response.success) {
        return {
          events: response.data,
          meta: response.meta
        };
      } else {
        throw new Error(response.message || "Failed to get weekly overview");
      }
    } catch (err) {
      error.value = err.message || "Failed to get weekly overview";
      console.error("Get weekly overview error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const bulkUpdateAvailabilities = async (availabilityIds, action, data) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await makeApiCall("/api/v1/availability/bulk-update", {
        method: "POST",
        body: JSON.stringify({
          availability_ids: availabilityIds,
          action,
          data
        })
      });
      if (response.success) {
        await fetchAvailabilities();
        return response.data;
      } else {
        throw new Error(response.message || "Failed to perform bulk update");
      }
    } catch (err) {
      error.value = err.message || "Failed to perform bulk update";
      console.error("Bulk update error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const isDateAvailable = (date, availabilityList) => {
    const targetDate = new Date(date);
    const dayName = targetDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const dateString = targetDate.toISOString().split("T")[0];
    const availabilityData = availabilityList || availabilities.value;
    const dayAvailability = availabilityData.find((availability) => {
      if (availability.day_of_week !== dayName || !availability.is_active) {
        return false;
      }
      if (availability.effective_from && dateString < availability.effective_from) {
        return false;
      }
      if (availability.effective_until && dateString > availability.effective_until) {
        return false;
      }
      return true;
    });
    return !!dayAvailability;
  };
  const getAvailabilityForDate = (date, availabilityList) => {
    const targetDate = new Date(date);
    const dayName = targetDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const dateString = targetDate.toISOString().split("T")[0];
    const availabilityData = availabilityList || availabilities.value;
    return availabilityData.find((availability) => {
      if (availability.day_of_week !== dayName || !availability.is_active) {
        return false;
      }
      if (availability.effective_from && dateString < availability.effective_from) {
        return false;
      }
      if (availability.effective_until && dateString > availability.effective_until) {
        return false;
      }
      return true;
    });
  };
  const clearError = () => {
    error.value = null;
  };
  return {
    // State
    availabilities: readonly(availabilities),
    loading: readonly(loading),
    error: readonly(error),
    // Actions
    fetchAvailabilities,
    createAvailability,
    updateAvailability,
    deleteAvailability,
    getTimeSlots,
    getWeeklyOverview,
    bulkUpdateAvailabilities,
    // Utilities
    isDateAvailable,
    getAvailabilityForDate,
    clearError
  };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AvailabilityModal",
  __ssrInlineRender: true,
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const { loading: loading2, error: error2 } = useAvailability();
    const workingDays = ref(["monday", "tuesday", "wednesday", "thursday", "friday"]);
    const startTime = ref("09:00");
    const endTime = ref("17:00");
    const breakTimes = ref([
      { start: "12:00", end: "13:00" }
    ]);
    const defaultDuration = ref("60");
    const bufferTime = ref("15");
    const applyTo = ref("ongoing");
    const startDate = ref("");
    const endDate = ref("");
    const saveError = ref("");
    const daysOfWeek = [
      { value: "sunday", label: "Sun" },
      { value: "monday", label: "Mon" },
      { value: "tuesday", label: "Tue" },
      { value: "wednesday", label: "Wed" },
      { value: "thursday", label: "Thu" },
      { value: "friday", label: "Fri" },
      { value: "saturday", label: "Sat" }
    ];
    const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const minute = i % 2 * 30;
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const display = (/* @__PURE__ */ new Date(`2000-01-01T${time}`)).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      return { value: time, label: display };
    });
    const today = /* @__PURE__ */ new Date();
    startDate.value = today.toISOString().split("T")[0];
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    endDate.value = nextMonth.toISOString().split("T")[0];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"><div class="flex items-center justify-between mb-6"><h3 class="text-lg font-medium text-gray-900">Set Availability</h3><button class="text-gray-400 hover:text-gray-600 transition-colors">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><form><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Working Days</label><div class="grid grid-cols-7 gap-2"><!--[-->`);
      ssrRenderList(daysOfWeek, (day, index) => {
        _push(`<div class="text-center"><label class="block text-xs text-gray-500 mb-1">${ssrInterpolate(day.label)}</label><input${ssrIncludeBooleanAttr(Array.isArray(workingDays.value) ? ssrLooseContain(workingDays.value, day.value) : workingDays.value) ? " checked" : ""}${ssrRenderAttr("value", day.value)} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"></div>`);
      });
      _push(`<!--]--></div></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Working Hours</label><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Start Time</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
      ssrRenderList(unref(timeOptions), (time) => {
        _push(`<option${ssrRenderAttr("value", time.value)}${ssrIncludeBooleanAttr(Array.isArray(startTime.value) ? ssrLooseContain(startTime.value, time.value) : ssrLooseEqual(startTime.value, time.value)) ? " selected" : ""}>${ssrInterpolate(time.label)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-xs text-gray-500 mb-1">End Time</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
      ssrRenderList(unref(timeOptions), (time) => {
        _push(`<option${ssrRenderAttr("value", time.value)}${ssrIncludeBooleanAttr(Array.isArray(endTime.value) ? ssrLooseContain(endTime.value, time.value) : ssrLooseEqual(endTime.value, time.value)) ? " selected" : ""}>${ssrInterpolate(time.label)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Break Times</label><div class="space-y-3"><!--[-->`);
      ssrRenderList(breakTimes.value, (breakTime, index) => {
        _push(`<div class="flex items-center space-x-3"><select class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
        ssrRenderList(unref(timeOptions), (time) => {
          _push(`<option${ssrRenderAttr("value", time.value)}${ssrIncludeBooleanAttr(Array.isArray(breakTime.start) ? ssrLooseContain(breakTime.start, time.value) : ssrLooseEqual(breakTime.start, time.value)) ? " selected" : ""}>${ssrInterpolate(time.label)}</option>`);
        });
        _push(`<!--]--></select><span class="text-gray-500">to</span><select class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><!--[-->`);
        ssrRenderList(unref(timeOptions), (time) => {
          _push(`<option${ssrRenderAttr("value", time.value)}${ssrIncludeBooleanAttr(Array.isArray(breakTime.end) ? ssrLooseContain(breakTime.end, time.value) : ssrLooseEqual(breakTime.end, time.value)) ? " selected" : ""}>${ssrInterpolate(time.label)}</option>`);
        });
        _push(`<!--]--></select><button type="button" class="text-red-600 hover:text-red-700">`);
        _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--><button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Add Break Time </button></div></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Default Appointment Duration</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value="30"${ssrIncludeBooleanAttr(Array.isArray(defaultDuration.value) ? ssrLooseContain(defaultDuration.value, "30") : ssrLooseEqual(defaultDuration.value, "30")) ? " selected" : ""}>30 minutes</option><option value="60"${ssrIncludeBooleanAttr(Array.isArray(defaultDuration.value) ? ssrLooseContain(defaultDuration.value, "60") : ssrLooseEqual(defaultDuration.value, "60")) ? " selected" : ""}>1 hour</option><option value="90"${ssrIncludeBooleanAttr(Array.isArray(defaultDuration.value) ? ssrLooseContain(defaultDuration.value, "90") : ssrLooseEqual(defaultDuration.value, "90")) ? " selected" : ""}>1.5 hours</option><option value="120"${ssrIncludeBooleanAttr(Array.isArray(defaultDuration.value) ? ssrLooseContain(defaultDuration.value, "120") : ssrLooseEqual(defaultDuration.value, "120")) ? " selected" : ""}>2 hours</option></select></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Buffer Time Between Appointments</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value="0"${ssrIncludeBooleanAttr(Array.isArray(bufferTime.value) ? ssrLooseContain(bufferTime.value, "0") : ssrLooseEqual(bufferTime.value, "0")) ? " selected" : ""}>No buffer</option><option value="15"${ssrIncludeBooleanAttr(Array.isArray(bufferTime.value) ? ssrLooseContain(bufferTime.value, "15") : ssrLooseEqual(bufferTime.value, "15")) ? " selected" : ""}>15 minutes</option><option value="30"${ssrIncludeBooleanAttr(Array.isArray(bufferTime.value) ? ssrLooseContain(bufferTime.value, "30") : ssrLooseEqual(bufferTime.value, "30")) ? " selected" : ""}>30 minutes</option><option value="45"${ssrIncludeBooleanAttr(Array.isArray(bufferTime.value) ? ssrLooseContain(bufferTime.value, "45") : ssrLooseEqual(bufferTime.value, "45")) ? " selected" : ""}>45 minutes</option></select></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Apply Settings To</label><div class="space-y-3"><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(applyTo.value, "ongoing")) ? " checked" : ""} value="ongoing" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">All future dates</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(applyTo.value, "dateRange")) ? " checked" : ""} value="dateRange" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Specific date range</span></label></div>`);
      if (applyTo.value === "dateRange") {
        _push(`<div class="mt-3 grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Start Date</label><input${ssrRenderAttr("value", startDate.value)} type="date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></div><div><label class="block text-xs text-gray-500 mb-1">End Date</label><input${ssrRenderAttr("value", endDate.value)} type="date" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (saveError.value || unref(error2)) {
        _push(`<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p class="text-sm text-red-700">${ssrInterpolate(saveError.value || unref(error2))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-end space-x-3"><button type="button"${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">`);
      if (unref(loading2)) {
        _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading2) ? "Saving..." : "Save Availability")}</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/calendar/AvailabilityModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "BookingModal",
  __ssrInlineRender: true,
  props: {
    selectedDate: {},
    selectedTime: {}
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const customerSearch = ref("");
    const customerResults = ref([]);
    const showCustomerResults = ref(false);
    const selectedCustomer = ref(null);
    const selectedServiceId = ref("");
    const appointmentDate = ref("");
    const appointmentTime = ref("");
    const duration = ref("60");
    const locationType = ref("vendor_location");
    const customerAddress = ref("");
    const meetingLink = ref("");
    const notes = ref("");
    const services = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const selectedService = computed(() => {
      return services.value.find((service) => service.id === selectedServiceId.value);
    });
    const minDate = computed(() => {
      const today = /* @__PURE__ */ new Date();
      return today.toISOString().split("T")[0];
    });
    const availableTimes = computed(() => {
      const times = [];
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          const display = (/* @__PURE__ */ new Date(`2000-01-01T${time}`)).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          });
          times.push({ value: time, label: display });
        }
      }
      return times;
    });
    const formatDateTime = computed(() => {
      if (!appointmentDate.value || !appointmentTime.value) return "";
      const date = new Date(appointmentDate.value);
      const [hours, minutes] = appointmentTime.value.split(":");
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    });
    const canSave = computed(() => {
      const hasCustomer = selectedCustomer.value && selectedCustomer.value.id;
      const hasService = selectedServiceId.value && selectedServiceId.value !== "";
      const hasDate = appointmentDate.value && appointmentDate.value !== "";
      const hasTime = appointmentTime.value && appointmentTime.value !== "";
      const result = hasCustomer && hasService && hasDate && hasTime && !isLoading.value;
      console.log("canSave computed:", {
        hasCustomer,
        hasService,
        hasDate,
        hasTime,
        isLoading: isLoading.value,
        result
      });
      return result;
    });
    const clearMessages = () => {
      errorMessage.value = "";
      successMessage.value = "";
    };
    const resetForm = () => {
      selectedCustomer.value = null;
      customerSearch.value = "";
      showCustomerResults.value = false;
      selectedServiceId.value = "";
      appointmentTime.value = "";
      duration.value = "60";
      locationType.value = "vendor_location";
      customerAddress.value = "";
      meetingLink.value = "";
      notes.value = "";
      clearMessages();
    };
    watch(customerSearch, (newValue) => {
      if (!newValue) {
        showCustomerResults.value = false;
      }
    });
    watch(() => props, () => {
      if (props.selectedDate || props.selectedTime) {
        resetForm();
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white"><div class="flex items-center justify-between mb-6"><h3 class="text-lg font-medium text-gray-900">Create New Appointment</h3><button class="text-gray-400 hover:text-gray-600 transition-colors">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><form>`);
      if (errorMessage.value) {
        _push(`<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-red-700">${ssrInterpolate(errorMessage.value)}</p></div><div class="ml-auto pl-3"><button type="button" class="inline-flex text-red-400 hover:text-red-600"><svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"><div class="flex"><div class="flex-shrink-0"><svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><div class="ml-3"><p class="text-sm text-green-700">${ssrInterpolate(successMessage.value)}</p></div><div class="ml-auto pl-3"><button type="button" class="inline-flex text-green-400 hover:text-green-600"><svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Customer</label><div class="relative"><input${ssrRenderAttr("value", customerSearch.value)} type="text" placeholder="Search for customer by name or email..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">`);
      if (showCustomerResults.value && customerResults.value.length > 0) {
        _push(`<div class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"><!--[-->`);
        ssrRenderList(customerResults.value, (customer) => {
          _push(`<div class="px-3 py-2 cursor-pointer hover:bg-gray-50"><div class="font-medium">${ssrInterpolate(customer.name)}</div><div class="text-sm text-gray-500">${ssrInterpolate(customer.email)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (selectedCustomer.value) {
        _push(`<div class="mt-2 p-3 bg-blue-50 rounded-md"><div class="flex items-center justify-between"><div><div class="font-medium text-blue-900">${ssrInterpolate(selectedCustomer.value.name)}</div><div class="text-sm text-blue-700">${ssrInterpolate(selectedCustomer.value.email)}</div></div><button type="button" class="text-blue-600 hover:text-blue-700">`);
        _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-5 h-5" }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Service</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedServiceId.value) ? ssrLooseContain(selectedServiceId.value, "") : ssrLooseEqual(selectedServiceId.value, "")) ? " selected" : ""}>Select a service</option><!--[-->`);
      ssrRenderList(services.value, (service) => {
        _push(`<option${ssrRenderAttr("value", service.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedServiceId.value) ? ssrLooseContain(selectedServiceId.value, service.id) : ssrLooseEqual(selectedServiceId.value, service.id)) ? " selected" : ""}>${ssrInterpolate(service.title)} - ${ssrInterpolate(service.currency || "R")}${ssrInterpolate(service.price)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md"><div class="text-sm font-medium text-yellow-800 mb-2">Quick Select (for testing):</div><div class="flex space-x-2"><button type="button" class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200"> Select John Doe </button><button type="button" class="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 border border-yellow-300 rounded hover:bg-yellow-200"> Select First Service </button></div></div><div class="mb-6"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-2">Date</label><input${ssrRenderAttr("value", appointmentDate.value)} type="date"${ssrRenderAttr("min", minDate.value)} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Time</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(appointmentTime.value) ? ssrLooseContain(appointmentTime.value, "") : ssrLooseEqual(appointmentTime.value, "")) ? " selected" : ""}>Select time</option><!--[-->`);
      ssrRenderList(availableTimes.value, (time) => {
        _push(`<option${ssrRenderAttr("value", time.value)}${ssrIncludeBooleanAttr(Array.isArray(appointmentTime.value) ? ssrLooseContain(appointmentTime.value, time.value) : ssrLooseEqual(appointmentTime.value, time.value)) ? " selected" : ""}>${ssrInterpolate(time.label)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Duration</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value="30"${ssrIncludeBooleanAttr(Array.isArray(duration.value) ? ssrLooseContain(duration.value, "30") : ssrLooseEqual(duration.value, "30")) ? " selected" : ""}>30 minutes</option><option value="60"${ssrIncludeBooleanAttr(Array.isArray(duration.value) ? ssrLooseContain(duration.value, "60") : ssrLooseEqual(duration.value, "60")) ? " selected" : ""}>1 hour</option><option value="90"${ssrIncludeBooleanAttr(Array.isArray(duration.value) ? ssrLooseContain(duration.value, "90") : ssrLooseEqual(duration.value, "90")) ? " selected" : ""}>1.5 hours</option><option value="120"${ssrIncludeBooleanAttr(Array.isArray(duration.value) ? ssrLooseContain(duration.value, "120") : ssrLooseEqual(duration.value, "120")) ? " selected" : ""}>2 hours</option></select></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Location</label><div class="space-y-2"><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(locationType.value, "vendor_location")) ? " checked" : ""} value="vendor_location" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">At my location</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(locationType.value, "customer_location")) ? " checked" : ""} value="customer_location" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">At customer&#39;s location</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(ssrLooseEqual(locationType.value, "online")) ? " checked" : ""} value="online" type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Online/Virtual</span></label></div></div>`);
      if (locationType.value === "customer_location") {
        _push(`<div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Customer Address</label><textarea rows="3" placeholder="Enter customer&#39;s address..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(customerAddress.value)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      if (locationType.value === "online") {
        _push(`<div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label><input${ssrRenderAttr("value", meetingLink.value)} type="url" placeholder="https://zoom.us/j/..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2">Notes</label><textarea rows="3" placeholder="Add any special instructions or notes for this appointment..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(notes.value)}</textarea></div>`);
      if (selectedService.value) {
        _push(`<div class="mb-6 p-4 bg-gray-50 rounded-lg"><h4 class="font-medium text-gray-900 mb-2">Appointment Summary</h4><div class="space-y-1 text-sm text-gray-600"><div><strong>Service:</strong> ${ssrInterpolate(selectedService.value.title)}</div><div><strong>Duration:</strong> ${ssrInterpolate(duration.value)} minutes</div><div><strong>Price:</strong> R${ssrInterpolate(selectedService.value.price)}</div>`);
        if (appointmentDate.value && appointmentTime.value) {
          _push(`<div><strong>Date &amp; Time:</strong> ${ssrInterpolate(formatDateTime.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-end space-x-3"><button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(!canSave.value) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">`);
      if (isLoading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Creating..." : "Create Appointment")}</button></div></form></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/calendar/BookingModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RescheduleModal",
  __ssrInlineRender: true,
  props: {
    booking: {}
  },
  emits: ["close", "reschedule"],
  setup(__props, { emit: __emit }) {
    const selectedDate = ref("");
    const selectedTime = ref("");
    const reason = ref("");
    const isLoading = ref(false);
    const minDate = computed(() => {
      const tomorrow = /* @__PURE__ */ new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    });
    const availableTimeSlots = computed(() => {
      if (!selectedDate.value) return [];
      const slots = [];
      for (let hour = 8; hour <= 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === 18 && minute > 0) break;
          const timeValue = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
          const period = hour >= 12 ? "PM" : "AM";
          const displayMinute = minute.toString().padStart(2, "0");
          slots.push({
            value: timeValue,
            label: `${displayHour}:${displayMinute} ${period}`
          });
        }
      }
      return slots;
    });
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    };
    const formatNewDateTime = () => {
      if (!selectedDate.value || !selectedTime.value) return "";
      const date = /* @__PURE__ */ new Date(`${selectedDate.value}T${selectedTime.value}`);
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200"><h3 class="text-lg font-medium text-gray-900"> Reschedule Booking </h3><button class="text-gray-400 hover:text-gray-600 transition-colors">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "h-6 w-6" }, null, _parent));
      _push(`</button></div><div class="space-y-6"><div class="bg-gray-50 rounded-lg p-4 mb-6"><h4 class="font-medium text-gray-900 mb-2">Current Booking</h4><div class="text-sm text-gray-600"><p><strong>Service:</strong> ${ssrInterpolate((_a = _ctx.booking.service) == null ? void 0 : _a.title)}</p><p><strong>Current Date:</strong> ${ssrInterpolate(formatDateTime(_ctx.booking.scheduled_at))}</p><p><strong>Duration:</strong> ${ssrInterpolate(_ctx.booking.duration_minutes)} minutes</p></div></div><div class="space-y-6"><div class="grid grid-cols-2 gap-4"><div><label for="new-date" class="block text-sm font-medium text-gray-700 mb-2"> Select New Date </label><input id="new-date"${ssrRenderAttr("value", selectedDate.value)} type="date"${ssrRenderAttr("min", minDate.value)} class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></div><div><label for="new-time" class="block text-sm font-medium text-gray-700 mb-2"> Select New Time </label><select id="new-time" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedTime.value) ? ssrLooseContain(selectedTime.value, "") : ssrLooseEqual(selectedTime.value, "")) ? " selected" : ""}>Choose a time</option><!--[-->`);
      ssrRenderList(availableTimeSlots.value, (slot) => {
        _push(`<option${ssrRenderAttr("value", slot.value)}${ssrIncludeBooleanAttr(Array.isArray(selectedTime.value) ? ssrLooseContain(selectedTime.value, slot.value) : ssrLooseEqual(selectedTime.value, slot.value)) ? " selected" : ""}>${ssrInterpolate(slot.label)}</option>`);
      });
      _push(`<!--]--></select></div></div><div><label for="reason" class="block text-sm font-medium text-gray-700 mb-2"> Reason for Rescheduling (Optional) </label><textarea id="reason" rows="3" placeholder="Please provide a reason for rescheduling..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(reason.value)}</textarea></div>`);
      if (selectedDate.value && selectedTime.value) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><h4 class="font-medium text-blue-900 mb-2">New Booking Details</h4><div class="text-sm text-blue-800"><p><strong>New Date:</strong> ${ssrInterpolate(formatNewDateTime())}</p><p><strong>Duration:</strong> ${ssrInterpolate(_ctx.booking.duration_minutes)} minutes</p><p class="mt-2 text-xs text-blue-600"> ⚠️ The service provider will need to confirm this new time slot. </p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><div class="flex">`);
      _push(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "h-5 w-5 text-yellow-400" }, null, _parent));
      _push(`<div class="ml-3"><h3 class="text-sm font-medium text-yellow-800"> Important Notice </h3><div class="mt-2 text-sm text-yellow-700"><ul class="list-disc list-inside space-y-1"><li>Rescheduling must be done at least 24 hours before the original booking time</li><li>The service provider must approve the new time slot</li><li>You may be charged a rescheduling fee depending on the service terms</li></ul></div></div></div></div></div></div><div class="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200"><button type="button" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"> Cancel </button><button${ssrIncludeBooleanAttr(!selectedDate.value || !selectedTime.value || isLoading.value) ? " disabled" : ""} type="button" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">`);
      if (isLoading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Rescheduling..." : "Reschedule Booking")}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/booking/RescheduleModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppointmentModal",
  __ssrInlineRender: true,
  props: {
    appointment: {}
  },
  emits: ["close", "update", "delete"],
  setup(__props, { emit: __emit }) {
    const {
      loading: loading2
    } = useBooking();
    const props = __props;
    const emit = __emit;
    const editNotes = ref(props.appointment.vendor_notes || "");
    const showRescheduleModal = ref(false);
    const showCancelConfirm = ref(false);
    const cancelReason = ref("");
    const cancelError = ref("");
    const cancelling = ref(false);
    const formatDateTime = computed(() => {
      const date = new Date(props.appointment.scheduled_at);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    });
    const getStatusColor = (status) => {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-blue-100 text-blue-800",
        in_progress: "bg-purple-100 text-purple-800",
        completed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        pending: "Pending",
        confirmed: "Confirmed",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled"
      };
      return texts[status] || status;
    };
    const getLocationText = (locationType) => {
      const locationMap = {
        "vendor_location": "Provider Location",
        "customer_location": "Customer Location",
        "online": "Online/Virtual"
      };
      return locationMap[locationType] || locationType;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const handleReschedule = (newDateTime) => {
      const updatedAppointment = {
        ...props.appointment,
        scheduled_at: newDateTime
      };
      emit("update", updatedAppointment);
      showRescheduleModal.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white"><div class="flex items-center justify-between mb-6"><div><h3 class="text-lg font-medium text-gray-900">Appointment Details</h3><p class="text-sm text-gray-500">${ssrInterpolate(formatDateTime.value)}</p></div><button class="text-gray-400 hover:text-gray-600 transition-colors">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><div class="space-y-6"><div class="flex items-center justify-between"><div><label class="block text-sm font-medium text-gray-700 mb-1">Status</label><span class="${ssrRenderClass([
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        getStatusColor(_ctx.appointment.status)
      ])}">${ssrInterpolate(getStatusText(_ctx.appointment.status))}</span></div><div class="flex items-center space-x-2">`);
      if (_ctx.appointment.status === "pending") {
        _push(`<button${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(unref(CheckIcon), { class: "w-4 h-4 mr-1" }, null, _parent));
        _push(` ${ssrInterpolate(unref(loading2) ? "Confirming..." : "Confirm")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.appointment.status === "confirmed") {
        _push(`<button${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(unref(PlayIcon), { class: "w-4 h-4 mr-1" }, null, _parent));
        _push(` ${ssrInterpolate(unref(loading2) ? "Starting..." : "Start")}</button>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.appointment.status === "in_progress") {
        _push(`<button${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-4 h-4 mr-1" }, null, _parent));
        _push(` ${ssrInterpolate(unref(loading2) ? "Completing..." : "Complete")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><h4 class="text-sm font-medium text-gray-900 mb-3">Customer Information</h4><div class="bg-gray-50 rounded-lg p-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Name</label><div class="font-medium">${ssrInterpolate((_a = _ctx.appointment.customer) == null ? void 0 : _a.name)}</div></div><div><label class="block text-xs text-gray-500 mb-1">Email</label><div>${ssrInterpolate((_b = _ctx.appointment.customer) == null ? void 0 : _b.email)}</div></div>`);
      if ((_c = _ctx.appointment.customer) == null ? void 0 : _c.phone) {
        _push(`<div><label class="block text-xs text-gray-500 mb-1">Phone</label><div>${ssrInterpolate((_d = _ctx.appointment.customer) == null ? void 0 : _d.phone)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-xs text-gray-500 mb-1">Customer Since</label><div>${ssrInterpolate(formatDate((_e = _ctx.appointment.customer) == null ? void 0 : _e.created_at))}</div></div></div></div></div><div><h4 class="text-sm font-medium text-gray-900 mb-3">Service Information</h4><div class="bg-gray-50 rounded-lg p-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Service</label><div class="font-medium">${ssrInterpolate((_f = _ctx.appointment.service) == null ? void 0 : _f.title)}</div></div><div><label class="block text-xs text-gray-500 mb-1">Duration</label><div>${ssrInterpolate(_ctx.appointment.duration)} minutes</div></div><div><label class="block text-xs text-gray-500 mb-1">Price</label><div class="font-medium">R${ssrInterpolate((_g = _ctx.appointment.service) == null ? void 0 : _g.price)}</div></div><div><label class="block text-xs text-gray-500 mb-1">Location</label><div>${ssrInterpolate(getLocationText(_ctx.appointment.location_type))}</div></div></div></div></div>`);
      if (_ctx.appointment.customer_address || _ctx.appointment.meeting_link) {
        _push(`<div><h4 class="text-sm font-medium text-gray-900 mb-3">Location Details</h4><div class="bg-gray-50 rounded-lg p-4">`);
        if (_ctx.appointment.customer_address) {
          _push(`<div><label class="block text-xs text-gray-500 mb-1">Customer Address</label><div>${ssrInterpolate(_ctx.appointment.customer_address)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.appointment.meeting_link) {
          _push(`<div><label class="block text-xs text-gray-500 mb-1">Meeting Link</label><a${ssrRenderAttr("href", _ctx.appointment.meeting_link)} target="_blank" class="text-blue-600 hover:text-blue-700 underline">${ssrInterpolate(_ctx.appointment.meeting_link)}</a></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.appointment.customer_notes || _ctx.appointment.vendor_notes) {
        _push(`<div><h4 class="text-sm font-medium text-gray-900 mb-3">Notes</h4><div class="space-y-3">`);
        if (_ctx.appointment.customer_notes) {
          _push(`<div class="bg-blue-50 rounded-lg p-4"><label class="block text-xs text-blue-700 mb-1">Customer Notes</label><div class="text-blue-900">${ssrInterpolate(_ctx.appointment.customer_notes)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.appointment.vendor_notes) {
          _push(`<div class="bg-purple-50 rounded-lg p-4"><label class="block text-xs text-purple-700 mb-1">Your Notes</label><div class="text-purple-900">${ssrInterpolate(_ctx.appointment.vendor_notes)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><h4 class="text-sm font-medium text-gray-900 mb-3">Add/Edit Notes</h4><textarea rows="3" placeholder="Add notes about this appointment..." class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(editNotes.value)}</textarea></div><div><h4 class="text-sm font-medium text-gray-900 mb-3">Booking Details</h4><div class="bg-gray-50 rounded-lg p-4"><div class="grid grid-cols-2 gap-4 text-sm"><div><label class="block text-xs text-gray-500 mb-1">Booking Reference</label><div class="font-mono">${ssrInterpolate(_ctx.appointment.booking_reference)}</div></div><div><label class="block text-xs text-gray-500 mb-1">Created</label><div>${ssrInterpolate(formatDate(_ctx.appointment.created_at))}</div></div><div><label class="block text-xs text-gray-500 mb-1">Total Amount</label><div class="font-medium">R${ssrInterpolate(_ctx.appointment.total_amount)}</div></div><div><label class="block text-xs text-gray-500 mb-1">Payment Status</label><span class="${ssrRenderClass([
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        _ctx.appointment.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      ])}">${ssrInterpolate(_ctx.appointment.payment_status || "pending")}</span></div></div></div></div><div class="flex items-center justify-between pt-4 border-t border-gray-200"><div class="flex items-center space-x-3"><button class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">`);
      _push(ssrRenderComponent(unref(ClockIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Reschedule </button><button class="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">`);
      _push(ssrRenderComponent(unref(XMarkIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Cancel Appointment </button></div><div class="flex items-center space-x-3"><button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"> Close </button><button${ssrIncludeBooleanAttr(unref(loading2)) ? " disabled" : ""} class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(loading2) ? "Saving..." : "Save Changes")}</button></div></div></div>`);
      if (showRescheduleModal.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          booking: _ctx.appointment,
          onClose: ($event) => showRescheduleModal.value = false,
          onReschedule: handleReschedule
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showCancelConfirm.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"><h3 class="text-lg font-medium text-gray-900 mb-4">Cancel Appointment</h3><p class="text-gray-600 mb-4">Are you sure you want to cancel this appointment? This action cannot be undone.</p><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-2">Cancellation Reason</label><select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "") : ssrLooseEqual(cancelReason.value, "")) ? " selected" : ""}>Select a reason</option><option value="provider_unavailable"${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "provider_unavailable") : ssrLooseEqual(cancelReason.value, "provider_unavailable")) ? " selected" : ""}>Provider unavailable</option><option value="emergency"${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "emergency") : ssrLooseEqual(cancelReason.value, "emergency")) ? " selected" : ""}>Emergency</option><option value="customer_request"${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "customer_request") : ssrLooseEqual(cancelReason.value, "customer_request")) ? " selected" : ""}>Customer requested</option><option value="weather"${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "weather") : ssrLooseEqual(cancelReason.value, "weather")) ? " selected" : ""}>Weather conditions</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(cancelReason.value) ? ssrLooseContain(cancelReason.value, "other") : ssrLooseEqual(cancelReason.value, "other")) ? " selected" : ""}>Other</option></select>`);
        if (cancelError.value) {
          _push(`<div class="mt-2 text-sm text-red-600">${ssrInterpolate(cancelError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-end space-x-3"><button class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> Keep Appointment </button><button${ssrIncludeBooleanAttr(cancelling.value) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">`);
        if (cancelling.value) {
          _push(`<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(cancelling.value ? "Cancelling..." : "Cancel Appointment")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/calendar/AppointmentModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Calendar - ORDO Dashboard",
      meta: [
        { name: "description", content: "Manage your appointments and availability" }
      ]
    });
    useAuth();
    useRole();
    const {
      bookings,
      fetchBookings,
      updateBooking,
      cancelBooking
    } = useBooking();
    const {
      availabilities: availabilities2,
      fetchAvailabilities,
      isDateAvailable
    } = useAvailability();
    const currentView = ref("month");
    const currentDate = ref(/* @__PURE__ */ new Date());
    const selectedDate = ref(null);
    const selectedTime = ref(null);
    const selectedAppointment = ref(null);
    const showAvailabilityModal = ref(false);
    const showBookingModal = ref(false);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const workingHours = { start: 8, end: 18 };
    const dayHours = Array.from({ length: workingHours.end - workingHours.start }, (_, i) => workingHours.start + i);
    const formatCurrentPeriod = computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      if (currentView.value === "month") {
        return `${monthNames[month]} ${year}`;
      } else if (currentView.value === "week") {
        const startOfWeek = getStartOfWeek(currentDate.value);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${year}`;
        } else {
          return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${year}`;
        }
      } else {
        const day = currentDate.value.getDate();
        return `${monthNames[month]} ${day}, ${year}`;
      }
    });
    const calendarDays = computed(() => {
      const year = currentDate.value.getFullYear();
      const month = currentDate.value.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dayData = {
          date: date.getDate(),
          fullDate: new Date(date),
          isCurrentMonth: date.getMonth() === month,
          isToday: isSameDay(date, today),
          isSelected: selectedDate.value && isSameDay(date, selectedDate.value),
          isAvailable: isDateAvailableLocal(date),
          appointments: getAppointmentsForDate(date)
        };
        days.push(dayData);
      }
      return days;
    });
    const weekDays = computed(() => {
      const startOfWeek = getStartOfWeek(currentDate.value);
      const days = [];
      const today = /* @__PURE__ */ new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        days.push({
          date: date.getDate(),
          fullDate: new Date(date),
          dayName: daysOfWeek[date.getDay()],
          isToday: isSameDay(date, today),
          appointments: getAppointmentsForDate(date)
        });
      }
      return days;
    });
    const selectedDay = computed(() => {
      return selectedDate.value || currentDate.value;
    });
    const formatSelectedDate = computed(() => {
      const date = selectedDay.value;
      return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    });
    const dayAppointments = computed(() => {
      return getAppointmentsForDate(selectedDay.value);
    });
    const dayStats = computed(() => {
      const appointments = dayAppointments.value;
      const totalSlots = dayHours.length;
      const bookedSlots = appointments.length;
      return {
        totalAppointments: appointments.length,
        availableSlots: totalSlots - bookedSlots
      };
    });
    const navigateCalendar = (direction) => {
      const newDate = new Date(currentDate.value);
      if (currentView.value === "month") {
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      } else if (currentView.value === "week") {
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
      } else {
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
      }
      currentDate.value = newDate;
    };
    const goToToday = () => {
      currentDate.value = /* @__PURE__ */ new Date();
      selectedDate.value = /* @__PURE__ */ new Date();
    };
    const selectDate = (day) => {
      selectedDate.value = day.fullDate;
      if (currentView.value === "month") {
        currentView.value = "day";
      }
    };
    const getStartOfWeek = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start;
    };
    const isSameDay = (date1, date2) => {
      return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    };
    const isDateAvailableLocal = (date) => {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        return false;
      }
      return isDateAvailable(date, availabilities2.value);
    };
    const getAppointmentsForDate = (date) => {
      return bookings.value.filter((booking) => {
        const bookingDate = new Date(booking.scheduled_at);
        return isSameDay(bookingDate, date);
      }).map((booking) => ({
        id: booking.id,
        time: formatTime(new Date(booking.scheduled_at)),
        duration: booking.duration_minutes,
        status: booking.status,
        customer: booking.customer,
        service: booking.service,
        scheduled_at: booking.scheduled_at
      }));
    };
    const formatTime = (date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
    };
    const formatHour = (hour) => {
      const time = /* @__PURE__ */ new Date();
      time.setHours(hour, 0, 0, 0);
      return formatTime(time);
    };
    const getAppointmentColor = (status) => {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        confirmed: "bg-blue-100 text-blue-800 border-blue-200",
        in_progress: "bg-purple-100 text-purple-800 border-purple-200",
        completed: "bg-green-100 text-green-800 border-green-200",
        cancelled: "bg-red-100 text-red-800 border-red-200"
      };
      return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
    };
    const getAppointmentStyle = (appointment) => {
      const startTime = new Date(appointment.scheduled_at);
      const hour = startTime.getHours();
      const minutes = startTime.getMinutes();
      const duration = appointment.duration || 60;
      const topOffset = (hour - workingHours.start) * 64 + minutes * 64 / 60;
      const height = duration * 64 / 60;
      return {
        top: `${topOffset}px`,
        height: `${height}px`
      };
    };
    const isHourAvailable = (hour) => {
      const appointment = getAppointmentForHour(hour);
      return !appointment && isDateAvailableLocal(selectedDay.value);
    };
    const getAppointmentForHour = (hour) => {
      return dayAppointments.value.find((apt) => {
        const aptTime = new Date(apt.scheduled_at);
        return aptTime.getHours() === hour;
      });
    };
    const createAppointment = (day, hour) => {
      const appointmentDate = new Date(day.fullDate || day);
      appointmentDate.setHours(hour, 0, 0, 0);
      selectedDate.value = appointmentDate;
      selectedTime.value = formatHour(hour);
      showBookingModal.value = true;
    };
    const viewAppointment = (appointment) => {
      selectedAppointment.value = appointment;
    };
    const handleAvailabilitySave = async (availability) => {
      await loadCalendarData();
      showAvailabilityModal.value = false;
    };
    const handleBookingSave = async (response) => {
      try {
        console.log("handleBookingSave called with:", response);
        await loadCalendarData();
      } catch (error2) {
        console.error("Failed to refresh calendar after booking creation:", error2);
      }
    };
    const handleAppointmentUpdate = async (appointmentData) => {
      try {
        await updateBooking(appointmentData.id, appointmentData);
        await loadCalendarData();
        selectedAppointment.value = null;
      } catch (error2) {
        console.error("Failed to update appointment:", error2);
      }
    };
    const handleAppointmentDelete = async (appointmentId, reason) => {
      try {
        await cancelBooking(appointmentId, reason || "Cancelled by provider");
        await loadCalendarData();
        selectedAppointment.value = null;
      } catch (error2) {
        console.error("Failed to cancel appointment:", error2);
      }
    };
    const loadCalendarData = async () => {
      try {
        const startDate = new Date(currentDate.value);
        startDate.setDate(1);
        const endDate = new Date(currentDate.value);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        await Promise.all([
          fetchBookings({
            type: "vendor",
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
            per_page: 100
          }),
          fetchAvailabilities({
            // Can add date filters if needed
          })
        ]);
      } catch (error2) {
        console.error("Failed to load calendar data:", error2);
      }
    };
    watch([currentDate, currentView], () => {
      loadCalendarData();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Calendar</h1><p class="text-gray-600"${_scopeId}>Manage your appointments and availability</p></div><div class="flex items-center space-x-4"${_scopeId}><div class="bg-gray-100 p-1 rounded-lg flex"${_scopeId}><button class="${ssrRenderClass([
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              currentView.value === "month" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            ])}"${_scopeId}> Month </button><button class="${ssrRenderClass([
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              currentView.value === "week" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            ])}"${_scopeId}> Week </button><button class="${ssrRenderClass([
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              currentView.value === "day" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            ])}"${_scopeId}> Day </button></div><button class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ClockIcon), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Set Availability </button><button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` New Appointment </button></div></div></div><div class="bg-white rounded-lg shadow mb-6 p-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><button class="p-2 text-gray-400 hover:text-gray-600 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronLeftIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</button><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrentPeriod.value)}</h2><button class="p-2 text-gray-400 hover:text-gray-600 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronRightIcon), { class: "w-5 h-5" }, null, _parent2, _scopeId));
            _push2(`</button></div><button class="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"${_scopeId}> Today </button></div></div><div class="bg-white rounded-lg shadow"${_scopeId}>`);
            if (currentView.value === "month") {
              _push2(`<div class="p-6"${_scopeId}><div class="grid grid-cols-7 gap-1 mb-4"${_scopeId}><!--[-->`);
              ssrRenderList(daysOfWeek, (day) => {
                _push2(`<div class="p-2 text-center text-sm font-medium text-gray-500"${_scopeId}>${ssrInterpolate(day)}</div>`);
              });
              _push2(`<!--]--></div><div class="grid grid-cols-7 gap-1"${_scopeId}><!--[-->`);
              ssrRenderList(calendarDays.value, (day, index) => {
                _push2(`<div class="${ssrRenderClass([
                  "min-h-[120px] p-2 border border-gray-100 cursor-pointer transition-colors",
                  day.isCurrentMonth ? "bg-white hover:bg-gray-50" : "bg-gray-50 text-gray-400",
                  day.isToday ? "bg-blue-50 border-blue-200" : "",
                  day.isSelected ? "bg-blue-100 border-blue-300" : ""
                ])}"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><span class="${ssrRenderClass([
                  "text-sm font-medium",
                  day.isToday ? "text-blue-600" : "",
                  !day.isCurrentMonth ? "text-gray-400" : "text-gray-900"
                ])}"${_scopeId}>${ssrInterpolate(day.date)}</span>`);
                if (day.isAvailable && day.isCurrentMonth) {
                  _push2(`<div class="w-2 h-2 bg-green-400 rounded-full" title="Available"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(day.appointments, (appointment) => {
                  var _a, _b;
                  _push2(`<div class="${ssrRenderClass([
                    "text-xs p-1 rounded truncate cursor-pointer",
                    getAppointmentColor(appointment.status)
                  ])}"${ssrRenderAttr("title", `${appointment.time} - ${(_a = appointment.service) == null ? void 0 : _a.title}`)}${_scopeId}>${ssrInterpolate(appointment.time)} ${ssrInterpolate((_b = appointment.customer) == null ? void 0 : _b.name)}</div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else if (currentView.value === "week") {
              _push2(`<div class="p-6"${_scopeId}><div class="grid grid-cols-8 gap-1"${_scopeId}><div class="space-y-1"${_scopeId}><div class="h-12"${_scopeId}></div><!--[-->`);
              ssrRenderList(unref(dayHours), (hour) => {
                _push2(`<div class="h-16 text-xs text-gray-500 pr-2 text-right"${_scopeId}>${ssrInterpolate(formatHour(hour))}</div>`);
              });
              _push2(`<!--]--></div><!--[-->`);
              ssrRenderList(weekDays.value, (day) => {
                _push2(`<div class="border-l border-gray-200"${_scopeId}><div class="${ssrRenderClass([
                  "h-12 p-2 text-center border-b border-gray-200",
                  day.isToday ? "bg-blue-50" : "bg-gray-50"
                ])}"${_scopeId}><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(day.dayName)}</div><div class="${ssrRenderClass([
                  "text-sm font-medium",
                  day.isToday ? "text-blue-600" : "text-gray-900"
                ])}"${_scopeId}>${ssrInterpolate(day.date)}</div></div><div class="relative"${_scopeId}><!--[-->`);
                ssrRenderList(unref(dayHours), (hour) => {
                  _push2(`<div class="h-16 border-b border-gray-100"${_scopeId}></div>`);
                });
                _push2(`<!--]--><!--[-->`);
                ssrRenderList(day.appointments, (appointment) => {
                  var _a, _b;
                  _push2(`<div class="${ssrRenderClass([
                    "absolute left-1 right-1 p-1 rounded text-xs cursor-pointer z-10",
                    getAppointmentColor(appointment.status)
                  ])}" style="${ssrRenderStyle(getAppointmentStyle(appointment))}"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate((_a = appointment.customer) == null ? void 0 : _a.name)}</div><div${_scopeId}>${ssrInterpolate((_b = appointment.service) == null ? void 0 : _b.title)}</div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else if (currentView.value === "day") {
              _push2(`<div class="p-6"${_scopeId}><div class="grid grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>${ssrInterpolate(formatSelectedDate.value)}</h3><div class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(unref(dayHours), (hour) => {
                var _a;
                _push2(`<div class="${ssrRenderClass([
                  "flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors",
                  isHourAvailable(hour) ? "hover:bg-gray-50" : "bg-gray-100 cursor-not-allowed"
                ])}"${_scopeId}><span class="font-medium"${_scopeId}>${ssrInterpolate(formatHour(hour))}</span>`);
                if (getAppointmentForHour(hour)) {
                  _push2(`<div class="flex items-center space-x-2"${_scopeId}><span class="${ssrRenderClass([
                    "px-2 py-1 rounded text-xs",
                    getAppointmentColor(getAppointmentForHour(hour).status)
                  ])}"${_scopeId}>${ssrInterpolate(getAppointmentForHour(hour).status)}</span><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate((_a = getAppointmentForHour(hour).customer) == null ? void 0 : _a.name)}</span></div>`);
                } else if (isHourAvailable(hour)) {
                  _push2(`<div class="text-sm text-green-600"${_scopeId}> Available </div>`);
                } else {
                  _push2(`<div class="text-sm text-gray-500"${_scopeId}> Unavailable </div>`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div><div${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Day Summary</h3><div class="space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-blue-50 p-4 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-blue-600"${_scopeId}>${ssrInterpolate(dayStats.value.totalAppointments)}</div><div class="text-sm text-blue-600"${_scopeId}>Appointments</div></div><div class="bg-green-50 p-4 rounded-lg"${_scopeId}><div class="text-2xl font-bold text-green-600"${_scopeId}>${ssrInterpolate(dayStats.value.availableSlots)}</div><div class="text-sm text-green-600"${_scopeId}>Available Slots</div></div></div>`);
              if (dayAppointments.value.length > 0) {
                _push2(`<div${_scopeId}><h4 class="font-medium text-gray-900 mb-2"${_scopeId}>Today&#39;s Appointments</h4><div class="space-y-2"${_scopeId}><!--[-->`);
                ssrRenderList(dayAppointments.value, (appointment) => {
                  var _a, _b;
                  _push2(`<div class="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(appointment.time)}</div><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate((_a = appointment.customer) == null ? void 0 : _a.name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate((_b = appointment.service) == null ? void 0 : _b.title)}</div></div><span class="${ssrRenderClass([
                    "px-2 py-1 rounded text-xs",
                    getAppointmentColor(appointment.status)
                  ])}"${_scopeId}>${ssrInterpolate(appointment.status)}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CalendarIcon), { class: "w-12 h-12 mx-auto mb-2 text-gray-300" }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>No appointments scheduled for this day</p></div>`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showAvailabilityModal.value) {
              _push2(ssrRenderComponent(_sfc_main$4, {
                onClose: ($event) => showAvailabilityModal.value = false,
                onSave: handleAvailabilitySave
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showBookingModal.value) {
              _push2(ssrRenderComponent(_sfc_main$3, {
                "selected-date": selectedDate.value,
                "selected-time": selectedTime.value,
                onClose: ($event) => showBookingModal.value = false,
                onSave: handleBookingSave
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (selectedAppointment.value) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                appointment: selectedAppointment.value,
                onClose: ($event) => selectedAppointment.value = null,
                onUpdate: handleAppointmentUpdate,
                onDelete: handleAppointmentDelete
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Calendar"),
                      createVNode("p", { class: "text-gray-600" }, "Manage your appointments and availability")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "bg-gray-100 p-1 rounded-lg flex" }, [
                        createVNode("button", {
                          onClick: ($event) => currentView.value = "month",
                          class: [
                            "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                            currentView.value === "month" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                          ]
                        }, " Month ", 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => currentView.value = "week",
                          class: [
                            "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                            currentView.value === "week" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                          ]
                        }, " Week ", 10, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => currentView.value = "day",
                          class: [
                            "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                            currentView.value === "day" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                          ]
                        }, " Day ", 10, ["onClick"])
                      ]),
                      createVNode("button", {
                        onClick: ($event) => showAvailabilityModal.value = true,
                        class: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }, [
                        createVNode(unref(ClockIcon), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Set Availability ")
                      ], 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => showBookingModal.value = true,
                        class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }, [
                        createVNode(unref(PlusIcon), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" New Appointment ")
                      ], 8, ["onClick"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow mb-6 p-4" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("button", {
                        onClick: ($event) => navigateCalendar("prev"),
                        class: "p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      }, [
                        createVNode(unref(ChevronLeftIcon), { class: "w-5 h-5" })
                      ], 8, ["onClick"]),
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrentPeriod.value), 1),
                      createVNode("button", {
                        onClick: ($event) => navigateCalendar("next"),
                        class: "p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      }, [
                        createVNode(unref(ChevronRightIcon), { class: "w-5 h-5" })
                      ], 8, ["onClick"])
                    ]),
                    createVNode("button", {
                      onClick: goToToday,
                      class: "px-3 py-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    }, " Today ")
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow" }, [
                  currentView.value === "month" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-7 gap-1 mb-4" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(daysOfWeek, (day) => {
                        return createVNode("div", {
                          key: day,
                          class: "p-2 text-center text-sm font-medium text-gray-500"
                        }, toDisplayString(day), 1);
                      }), 64))
                    ]),
                    createVNode("div", { class: "grid grid-cols-7 gap-1" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(calendarDays.value, (day, index) => {
                        return openBlock(), createBlock("div", {
                          key: `${day.date}-${index}`,
                          class: [
                            "min-h-[120px] p-2 border border-gray-100 cursor-pointer transition-colors",
                            day.isCurrentMonth ? "bg-white hover:bg-gray-50" : "bg-gray-50 text-gray-400",
                            day.isToday ? "bg-blue-50 border-blue-200" : "",
                            day.isSelected ? "bg-blue-100 border-blue-300" : ""
                          ],
                          onClick: ($event) => selectDate(day)
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                            createVNode("span", {
                              class: [
                                "text-sm font-medium",
                                day.isToday ? "text-blue-600" : "",
                                !day.isCurrentMonth ? "text-gray-400" : "text-gray-900"
                              ]
                            }, toDisplayString(day.date), 3),
                            day.isAvailable && day.isCurrentMonth ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-2 h-2 bg-green-400 rounded-full",
                              title: "Available"
                            })) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "space-y-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(day.appointments, (appointment) => {
                              var _a, _b;
                              return openBlock(), createBlock("div", {
                                key: appointment.id,
                                class: [
                                  "text-xs p-1 rounded truncate cursor-pointer",
                                  getAppointmentColor(appointment.status)
                                ],
                                onClick: withModifiers(($event) => viewAppointment(appointment), ["stop"]),
                                title: `${appointment.time} - ${(_a = appointment.service) == null ? void 0 : _a.title}`
                              }, toDisplayString(appointment.time) + " " + toDisplayString((_b = appointment.customer) == null ? void 0 : _b.name), 11, ["onClick", "title"]);
                            }), 128))
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ])
                  ])) : currentView.value === "week" ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-8 gap-1" }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("div", { class: "h-12" }),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(dayHours), (hour) => {
                          return openBlock(), createBlock("div", {
                            key: hour,
                            class: "h-16 text-xs text-gray-500 pr-2 text-right"
                          }, toDisplayString(formatHour(hour)), 1);
                        }), 128))
                      ]),
                      (openBlock(true), createBlock(Fragment, null, renderList(weekDays.value, (day) => {
                        return openBlock(), createBlock("div", {
                          key: day.date,
                          class: "border-l border-gray-200"
                        }, [
                          createVNode("div", {
                            class: [
                              "h-12 p-2 text-center border-b border-gray-200",
                              day.isToday ? "bg-blue-50" : "bg-gray-50"
                            ]
                          }, [
                            createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(day.dayName), 1),
                            createVNode("div", {
                              class: [
                                "text-sm font-medium",
                                day.isToday ? "text-blue-600" : "text-gray-900"
                              ]
                            }, toDisplayString(day.date), 3)
                          ], 2),
                          createVNode("div", { class: "relative" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(dayHours), (hour) => {
                              return openBlock(), createBlock("div", {
                                key: hour,
                                class: "h-16 border-b border-gray-100",
                                onClick: ($event) => createAppointment(day, hour)
                              }, null, 8, ["onClick"]);
                            }), 128)),
                            (openBlock(true), createBlock(Fragment, null, renderList(day.appointments, (appointment) => {
                              var _a, _b;
                              return openBlock(), createBlock("div", {
                                key: appointment.id,
                                class: [
                                  "absolute left-1 right-1 p-1 rounded text-xs cursor-pointer z-10",
                                  getAppointmentColor(appointment.status)
                                ],
                                style: getAppointmentStyle(appointment),
                                onClick: ($event) => viewAppointment(appointment)
                              }, [
                                createVNode("div", { class: "font-medium" }, toDisplayString((_a = appointment.customer) == null ? void 0 : _a.name), 1),
                                createVNode("div", null, toDisplayString((_b = appointment.service) == null ? void 0 : _b.title), 1)
                              ], 14, ["onClick"]);
                            }), 128))
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : currentView.value === "day" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, toDisplayString(formatSelectedDate.value), 1),
                        createVNode("div", { class: "space-y-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(dayHours), (hour) => {
                            var _a;
                            return openBlock(), createBlock("div", {
                              key: hour,
                              class: [
                                "flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors",
                                isHourAvailable(hour) ? "hover:bg-gray-50" : "bg-gray-100 cursor-not-allowed"
                              ],
                              onClick: ($event) => isHourAvailable(hour) && createAppointment(selectedDay.value, hour)
                            }, [
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatHour(hour)), 1),
                              getAppointmentForHour(hour) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex items-center space-x-2"
                              }, [
                                createVNode("span", {
                                  class: [
                                    "px-2 py-1 rounded text-xs",
                                    getAppointmentColor(getAppointmentForHour(hour).status)
                                  ]
                                }, toDisplayString(getAppointmentForHour(hour).status), 3),
                                createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString((_a = getAppointmentForHour(hour).customer) == null ? void 0 : _a.name), 1)
                              ])) : isHourAvailable(hour) ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-sm text-green-600"
                              }, " Available ")) : (openBlock(), createBlock("div", {
                                key: 2,
                                class: "text-sm text-gray-500"
                              }, " Unavailable "))
                            ], 10, ["onClick"]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Day Summary"),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", { class: "bg-blue-50 p-4 rounded-lg" }, [
                              createVNode("div", { class: "text-2xl font-bold text-blue-600" }, toDisplayString(dayStats.value.totalAppointments), 1),
                              createVNode("div", { class: "text-sm text-blue-600" }, "Appointments")
                            ]),
                            createVNode("div", { class: "bg-green-50 p-4 rounded-lg" }, [
                              createVNode("div", { class: "text-2xl font-bold text-green-600" }, toDisplayString(dayStats.value.availableSlots), 1),
                              createVNode("div", { class: "text-sm text-green-600" }, "Available Slots")
                            ])
                          ]),
                          dayAppointments.value.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("h4", { class: "font-medium text-gray-900 mb-2" }, "Today's Appointments"),
                            createVNode("div", { class: "space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(dayAppointments.value, (appointment) => {
                                var _a, _b;
                                return openBlock(), createBlock("div", {
                                  key: appointment.id,
                                  class: "p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50",
                                  onClick: ($event) => viewAppointment(appointment)
                                }, [
                                  createVNode("div", { class: "flex items-center justify-between" }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(appointment.time), 1),
                                      createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString((_a = appointment.customer) == null ? void 0 : _a.name), 1),
                                      createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString((_b = appointment.service) == null ? void 0 : _b.title), 1)
                                    ]),
                                    createVNode("span", {
                                      class: [
                                        "px-2 py-1 rounded text-xs",
                                        getAppointmentColor(appointment.status)
                                      ]
                                    }, toDisplayString(appointment.status), 3)
                                  ])
                                ], 8, ["onClick"]);
                              }), 128))
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center py-8 text-gray-500"
                          }, [
                            createVNode(unref(CalendarIcon), { class: "w-12 h-12 mx-auto mb-2 text-gray-300" }),
                            createVNode("p", null, "No appointments scheduled for this day")
                          ]))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                showAvailabilityModal.value ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  onClose: ($event) => showAvailabilityModal.value = false,
                  onSave: handleAvailabilitySave
                }, null, 8, ["onClose"])) : createCommentVNode("", true),
                showBookingModal.value ? (openBlock(), createBlock(_sfc_main$3, {
                  key: 1,
                  "selected-date": selectedDate.value,
                  "selected-time": selectedTime.value,
                  onClose: ($event) => showBookingModal.value = false,
                  onSave: handleBookingSave
                }, null, 8, ["selected-date", "selected-time", "onClose"])) : createCommentVNode("", true),
                selectedAppointment.value ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 2,
                  appointment: selectedAppointment.value,
                  onClose: ($event) => selectedAppointment.value = null,
                  onUpdate: handleAppointmentUpdate,
                  onDelete: handleAppointmentDelete
                }, null, 8, ["appointment", "onClose"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/calendar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=calendar-Bwcubqk8.js.map
