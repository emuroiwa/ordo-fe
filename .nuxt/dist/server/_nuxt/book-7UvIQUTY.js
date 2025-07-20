import { _ as __nuxt_component_0 } from "./nuxt-link-xZuWyqv4.js";
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { u as useServices } from "./useServices-BTHHH3wN.js";
import { u as useAuth } from "./useAuth-DCe-ZuTK.js";
import { u as useBooking } from "./useBooking-5qxCyHe_.js";
import { u as useRoute, b as useRouter } from "../server.mjs";
import { u as useHead } from "./v3-2ml_FOLh.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "./cookie-DrsL3lQs.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "ofetch";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "book",
  __ssrInlineRender: true,
  setup(__props) {
    const { service, loading, error } = useServices();
    const { isAuthenticated } = useAuth();
    useBooking();
    const route = useRoute();
    useRouter();
    const calendarView = ref("week");
    const currentDate = ref(/* @__PURE__ */ new Date());
    const selectedSlot = ref(null);
    const isProcessing = ref(false);
    const guestInfo = ref({
      email: "",
      phone: "",
      name: ""
    });
    const availabilitySlots = ref([
      // Sample data structure
      { id: 1, date: "2025-07-21", time: "09:00", available: true },
      { id: 2, date: "2025-07-21", time: "10:00", available: true },
      { id: 3, date: "2025-07-21", time: "11:00", available: true },
      { id: 4, date: "2025-07-22", time: "09:00", available: true },
      { id: 5, date: "2025-07-22", time: "14:00", available: true },
      { id: 6, date: "2025-07-22", time: "15:00", available: true }
    ]);
    const fullSlug = computed(() => {
      const slugArray = route.params.slug;
      return slugArray.slice(0, -1).join("/");
    });
    const currentPeriodLabel = computed(() => {
      if (calendarView.value === "week") {
        const start = getWeekStart(currentDate.value);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
      } else if (calendarView.value === "month") {
        return currentDate.value.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      } else {
        return currentDate.value.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
      }
    });
    const weekDays = computed(() => {
      const start = getWeekStart(currentDate.value);
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        const daySlots = availabilitySlots.value.filter((slot) => slot.date === dateStr && slot.available);
        days.push({
          date: dateStr,
          dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
          formatted: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          slots: daySlots,
          hasSlots: daySlots.length > 0
        });
      }
      return days;
    });
    const canProceed = computed(() => {
      if (!selectedSlot.value) return false;
      if (!isAuthenticated.value) {
        return guestInfo.value.email && guestInfo.value.phone && guestInfo.value.name;
      }
      return true;
    });
    const getWeekStart = (date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day;
      return new Date(d.setDate(diff));
    };
    useHead({
      title: computed(() => service.value ? `Book ${service.value.title} - ORDO` : "Book Service - ORDO"),
      meta: [
        {
          name: "description",
          content: computed(() => {
            var _a;
            return `Book ${((_a = service.value) == null ? void 0 : _a.title) || "service"} appointment online. Select your preferred date and time.`;
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p class="text-gray-600">Loading booking calendar...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center max-w-md mx-4"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3><p class="text-sm text-gray-600 mb-4">${ssrInterpolate(unref(error))}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/services",
          class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Browse Services `);
            } else {
              return [
                createTextVNode(" Browse Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(service)) {
        _push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-8"><nav class="flex mb-4 text-sm" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1 md:space-x-3"><li class="inline-flex items-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li><div class="flex items-center"><svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/services",
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Services`);
            } else {
              return [
                createTextVNode("Services")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></li><li><div class="flex items-center"><svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/services/${unref(fullSlug)}`,
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(service).title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(service).title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></li><li><div class="flex items-center"><svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg><span class="text-gray-900 font-medium">Book Appointment</span></div></li></ol></nav><div class="bg-white rounded-lg shadow-sm p-6 mb-6"><div class="flex items-start space-x-4"><div class="flex-shrink-0">`);
        if (unref(service).primary_image) {
          _push(`<img${ssrRenderAttr("src", unref(service).primary_image.url)}${ssrRenderAttr("alt", unref(service).title)} class="w-16 h-16 rounded-lg object-cover">`);
        } else {
          _push(`<div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`);
        }
        _push(`</div><div class="flex-1 min-w-0"><h1 class="text-2xl font-bold text-gray-900 mb-2">${ssrInterpolate(unref(service).title)}</h1><p class="text-gray-600 mb-2">${ssrInterpolate(unref(service).short_description)}</p><div class="flex items-center space-x-4 text-sm text-gray-500"><span>${ssrInterpolate(unref(service).formatted_price)}</span><span>${ssrInterpolate(unref(service).duration_minutes)} minutes</span><span>${ssrInterpolate(unref(service).location_display)}</span></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="bg-white rounded-lg shadow-sm"><div class="p-6 border-b border-gray-200"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Select Date &amp; Time</h2><div class="flex space-x-1 bg-gray-100 rounded-lg p-1"><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium rounded-md transition-colors",
          unref(calendarView) === "week" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
        ])}"> Week </button><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium rounded-md transition-colors",
          unref(calendarView) === "month" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
        ])}"> Month </button><button class="${ssrRenderClass([
          "px-3 py-1 text-sm font-medium rounded-md transition-colors",
          unref(calendarView) === "day" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
        ])}"> Day </button></div></div><div class="flex items-center justify-between mt-4"><button class="p-2 hover:bg-gray-100 rounded-md transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button><h3 class="text-lg font-medium text-gray-900">${ssrInterpolate(unref(currentPeriodLabel))}</h3><button class="p-2 hover:bg-gray-100 rounded-md transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div><div class="p-6">`);
        if (unref(calendarView) === "week") {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(weekDays), (day) => {
            _push(`<div class="border-b border-gray-100 pb-4 last:border-b-0"><div class="flex items-center justify-between mb-3"><div class="flex items-center space-x-3"><div class="text-lg font-semibold text-gray-900">${ssrInterpolate(day.dayName)}</div><div class="text-sm text-gray-500">${ssrInterpolate(day.formatted)}</div></div>`);
            if (!day.hasSlots) {
              _push(`<div class="text-sm text-gray-400">No availability</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
            if (day.hasSlots) {
              _push(`<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"><!--[-->`);
              ssrRenderList(day.slots, (slot) => {
                var _a;
                _push(`<button class="${ssrRenderClass([
                  "px-3 py-2 text-sm font-medium rounded-md border transition-colors",
                  ((_a = unref(selectedSlot)) == null ? void 0 : _a.id) === slot.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                ])}">${ssrInterpolate(slot.time)}</button>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else if (unref(calendarView) === "month") {
          _push(`<div class="grid grid-cols-7 gap-1"><!--[-->`);
          ssrRenderList(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], (day) => {
            _push(`<div class="text-center text-sm font-medium text-gray-500 py-2">${ssrInterpolate(day)}</div>`);
          });
          _push(`<!--]--><div class="text-center text-sm text-gray-600 p-2">Month view coming soon...</div></div>`);
        } else if (unref(calendarView) === "day") {
          _push(`<div class="space-y-2"><div class="text-center text-sm text-gray-600 p-8">Day view coming soon...</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow-sm p-6 sticky top-8"><h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3><div class="space-y-3 mb-6"><div class="flex justify-between"><span class="text-gray-600">Service</span><span class="font-medium">${ssrInterpolate(unref(service).title)}</span></div><div class="flex justify-between"><span class="text-gray-600">Duration</span><span class="font-medium">${ssrInterpolate(unref(service).duration_minutes)} min</span></div><div class="flex justify-between"><span class="text-gray-600">Price</span><span class="font-medium">${ssrInterpolate(unref(service).formatted_price)}</span></div></div>`);
        if (unref(selectedSlot)) {
          _push(`<div class="border-t border-gray-200 pt-4 mb-6"><div class="flex justify-between"><span class="text-gray-600">Date &amp; Time</span><div class="text-right"><div class="font-medium">${ssrInterpolate(unref(selectedSlot).date)}</div><div class="text-sm text-gray-500">${ssrInterpolate(unref(selectedSlot).time)}</div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(selectedSlot)) {
          _push(`<div>`);
          if (!unref(isAuthenticated)) {
            _push(`<div class="space-y-4 mb-6"><div><label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input${ssrRenderAttr("value", unref(guestInfo).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="your@email.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input${ssrRenderAttr("value", unref(guestInfo).phone)} type="tel" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="+27 xxx xxx xxxx"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input${ssrRenderAttr("value", unref(guestInfo).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe"></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button${ssrIncludeBooleanAttr(!unref(canProceed) || unref(isProcessing)) ? " disabled" : ""} class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center">`);
          if (unref(isProcessing)) {
            _push(`<svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(unref(isProcessing) ? "Processing..." : "Continue to Payment")}</button></div>`);
        } else {
          _push(`<div class="text-center text-gray-500 text-sm"> Select a time slot to continue </div>`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[...slug]/book.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=book-7UvIQUTY.js.map
