import { _ as __nuxt_component_0 } from './nuxt-link-xZuWyqv4.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from 'vue/server-renderer';
import { u as useBooking } from './useBooking-5qxCyHe_.mjs';
import { u as useRoute, b as useRouter } from './server.mjs';
import { u as useHead } from './v3-2ml_FOLh.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './cookie-DrsL3lQs.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentBooking: booking, loading, error } = useBooking();
    useRoute();
    useRouter();
    const paymentMethod = ref("card");
    const acceptTerms = ref(false);
    const isProcessing = ref(false);
    const canPay = computed(() => {
      return paymentMethod.value && acceptTerms.value && !isProcessing.value;
    });
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatTime = (dateStr) => {
      return new Date(dateStr).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    useHead({
      title: "Complete Payment - ORDO",
      meta: [
        {
          name: "description",
          content: "Complete your booking payment securely"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p class="text-gray-600">Loading payment details...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center max-w-md mx-4"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">Booking Not Found</h3><p class="text-sm text-gray-600 mb-4">${ssrInterpolate(unref(error))}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go Home `);
            } else {
              return [
                createTextVNode(" Go Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(booking)) {
        _push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1><p class="text-gray-600">Review your booking details and complete payment</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="bg-white rounded-lg shadow-sm p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2><div class="space-y-4 mb-6"><div class="flex items-start space-x-4"><div class="flex-shrink-0">`);
        if ((_a = unref(booking).service) == null ? void 0 : _a.primary_image) {
          _push(`<img${ssrRenderAttr("src", unref(booking).service.primary_image.url)}${ssrRenderAttr("alt", unref(booking).service.title)} class="w-16 h-16 rounded-lg object-cover">`);
        } else {
          _push(`<div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`);
        }
        _push(`</div><div class="flex-1"><h3 class="font-semibold text-gray-900">${ssrInterpolate((_b = unref(booking).service) == null ? void 0 : _b.title)}</h3><p class="text-gray-600 text-sm">${ssrInterpolate((_c = unref(booking).service) == null ? void 0 : _c.short_description)}</p><div class="flex items-center mt-2 space-x-4 text-sm text-gray-500"><span>${ssrInterpolate(unref(booking).duration_minutes)} minutes</span><span>${ssrInterpolate((_d = unref(booking).service) == null ? void 0 : _d.location_display)}</span></div></div></div></div><div class="border-t border-gray-200 pt-6 space-y-4"><div class="flex justify-between"><span class="text-gray-600">Booking Reference</span><span class="font-medium">${ssrInterpolate(unref(booking).booking_reference)}</span></div><div class="flex justify-between"><span class="text-gray-600">Date &amp; Time</span><div class="text-right"><div class="font-medium">${ssrInterpolate(formatDate(unref(booking).scheduled_at))}</div><div class="text-sm text-gray-500">${ssrInterpolate(formatTime(unref(booking).scheduled_at))}</div></div></div><div class="flex justify-between"><span class="text-gray-600">Duration</span><span class="font-medium">${ssrInterpolate(unref(booking).duration_minutes)} minutes</span></div><div class="flex justify-between"><span class="text-gray-600">Location</span><span class="font-medium">${ssrInterpolate(unref(booking).location_type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()))}</span></div></div><div class="border-t border-gray-200 pt-6 mt-6"><h4 class="font-medium text-gray-900 mb-4">Customer Information</h4><div class="space-y-2 text-sm">`);
        if (unref(booking).customer) {
          _push(`<div><span class="text-gray-600">Name:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).customer.name)}</span></div>`);
        } else if (unref(booking).guest_name) {
          _push(`<div><span class="text-gray-600">Name:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).guest_name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_e = unref(booking).customer) == null ? void 0 : _e.email) {
          _push(`<div><span class="text-gray-600">Email:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).customer.email)}</span></div>`);
        } else if (unref(booking).guest_email) {
          _push(`<div><span class="text-gray-600">Email:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).guest_email)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_f = unref(booking).customer) == null ? void 0 : _f.phone) {
          _push(`<div><span class="text-gray-600">Phone:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).customer.phone)}</span></div>`);
        } else if (unref(booking).guest_phone) {
          _push(`<div><span class="text-gray-600">Phone:</span><span class="ml-2 font-medium">${ssrInterpolate(unref(booking).guest_phone)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6"><h2 class="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2><div class="space-y-3 mb-6"><div class="flex justify-between"><span class="text-gray-600">Service Price</span><span class="font-medium">${ssrInterpolate(unref(booking).currency)} ${ssrInterpolate(unref(booking).total_amount)}</span></div><div class="flex justify-between text-sm text-gray-500"><span>Deposit Required (30%)</span><span>${ssrInterpolate(unref(booking).currency)} ${ssrInterpolate(unref(booking).deposit_amount)}</span></div><div class="border-t border-gray-200 pt-3"><div class="flex justify-between font-semibold text-lg"><span>Total to Pay Now</span><span class="text-blue-600">${ssrInterpolate(unref(booking).currency)} ${ssrInterpolate(unref(booking).deposit_amount)}</span></div></div></div><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label><div class="space-y-3"><label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(paymentMethod), "card")) ? " checked" : ""} type="radio" value="card" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"><div class="ml-3 flex items-center"><svg class="w-8 h-5 mr-2" viewBox="0 0 32 20" fill="none"><rect width="32" height="20" rx="4" fill="#1434CB"></rect><path d="M8.5 11.5V8.5H10.5V11.5H8.5Z" fill="white"></path><path d="M12.5 8.5H14.5V11.5H12.5V8.5Z" fill="white"></path><path d="M16.5 8.5H18.5V11.5H16.5V8.5Z" fill="white"></path><path d="M20.5 8.5H22.5V11.5H20.5V8.5Z" fill="white"></path></svg><span class="font-medium">Credit/Debit Card</span></div></label><label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(paymentMethod), "payfast")) ? " checked" : ""} type="radio" value="payfast" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"><div class="ml-3 flex items-center"><div class="w-8 h-5 bg-orange-500 rounded mr-2 flex items-center justify-center"><span class="text-white text-xs font-bold">PF</span></div><span class="font-medium">PayFast</span></div></label></div></div><div class="mb-6"><label class="flex items-start"><input${ssrIncludeBooleanAttr(Array.isArray(unref(acceptTerms)) ? ssrLooseContain(unref(acceptTerms), null) : unref(acceptTerms)) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"><span class="ml-2 text-sm text-gray-600"> I agree to the <a href="#" class="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a></span></label></div><button${ssrIncludeBooleanAttr(!unref(canPay) || unref(isProcessing)) ? " disabled" : ""} class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center">`);
        if (unref(isProcessing)) {
          _push(`<svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isProcessing) ? "Processing..." : `Pay ${unref(booking).currency} ${unref(booking).deposit_amount}`)}</button><div class="mt-4 flex items-center justify-center text-xs text-gray-500"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> Secured by SSL encryption </div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/payment/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CkPZ4cnY.mjs.map
