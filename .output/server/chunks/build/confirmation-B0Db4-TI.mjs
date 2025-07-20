import { _ as __nuxt_component_0 } from './nuxt-link-xZuWyqv4.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "confirmation",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const bookingId = computed(() => route.query.booking);
    useHead({
      title: "Booking Confirmed - ORDO",
      meta: [
        {
          name: "description",
          content: "Your booking has been confirmed successfully"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center" }, _attrs))}><div class="max-w-md mx-auto text-center"><div class="bg-white rounded-lg shadow-lg p-8"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"><svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h1 class="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1><p class="text-gray-600 mb-6"> Your booking has been successfully created and payment processed. </p>`);
      if (unref(bookingId)) {
        _push(`<div class="bg-gray-50 rounded-lg p-4 mb-6"><p class="text-sm text-gray-600">Booking Reference</p><p class="font-mono font-medium text-gray-900">${ssrInterpolate(unref(bookingId))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-left mb-6"><h3 class="font-semibold text-gray-900 mb-2">What&#39;s Next?</h3><ul class="text-sm text-gray-600 space-y-1"><li>\u2022 Confirmation email sent to your address</li><li>\u2022 Service provider will confirm your booking</li><li>\u2022 You&#39;ll receive updates via email</li></ul></div><div class="space-y-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/bookings",
        class: "w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors inline-block text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View My Bookings `);
          } else {
            return [
              createTextVNode(" View My Bookings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors inline-block text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back to Home `);
          } else {
            return [
              createTextVNode(" Back to Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/booking/confirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=confirmation-B0Db4-TI.mjs.map
