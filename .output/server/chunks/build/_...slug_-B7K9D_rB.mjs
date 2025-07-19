import { _ as __nuxt_component_0 } from './nuxt-link-D-nrCqmf.mjs';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useServices } from './useServices-CAZdAQTN.mjs';
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
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const { service, loading, error, getOptimizedImageUrl } = useServices();
    const route = useRoute();
    const mainImage = ref(null);
    computed(() => {
      const slugArray = route.params.slug;
      return slugArray.join("/");
    });
    useHead({
      title: computed(() => service.value ? `${service.value.title} - ORDO` : "Service - ORDO"),
      meta: [
        {
          name: "description",
          content: computed(() => {
            var _a, _b;
            return ((_a = service.value) == null ? void 0 : _a.short_description) || ((_b = service.value) == null ? void 0 : _b.description) || "Professional service on ORDO";
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p class="text-gray-600">Loading service...</p></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center max-w-md mx-4"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3><p class="text-sm text-gray-600 mb-4"> The service you&#39;re looking for doesn&#39;t exist or is no longer available. </p>`);
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
        _push(`<div class="min-h-screen bg-gray-50"><div class="bg-white shadow-sm"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><nav class="flex py-4 text-sm" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1 md:space-x-3"><li class="inline-flex items-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Home `);
            } else {
              return [
                createTextVNode(" Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li><div class="flex items-center"><svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/services",
          class: "text-gray-500 hover:text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Services `);
            } else {
              return [
                createTextVNode(" Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></li><li><div class="flex items-center"><svg class="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg><span class="text-gray-900 font-medium">${ssrInterpolate(unref(service).title)}</span></div></li></ol></nav></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="lg:grid lg:grid-cols-3 lg:gap-8"><div class="lg:col-span-2"><div class="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">`);
        if ((_a = unref(service).service_images) == null ? void 0 : _a.length) {
          _push(`<div class="relative"><div class="aspect-w-16 aspect-h-9"><img${ssrRenderAttr("src", unref(mainImage).url)}${ssrRenderAttr("alt", unref(service).title)} class="w-full h-96 object-cover"></div>`);
          if (unref(service).service_images.length > 1) {
            _push(`<div class="flex gap-2 p-4 overflow-x-auto"><!--[-->`);
            ssrRenderList(unref(service).service_images, (image, index) => {
              _push(`<button class="${ssrRenderClass([image.id === unref(mainImage).id ? "border-blue-500" : "border-gray-200 hover:border-gray-300", "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors"])}"><img${ssrRenderAttr("src", unref(getOptimizedImageUrl)(image, "thumb"))}${ssrRenderAttr("alt", `${unref(service).title} ${index + 1}`)} class="w-full h-full object-cover"></button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="w-full h-96 bg-gray-200 flex items-center justify-center"><div class="text-center text-gray-500"><svg class="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p>No images available</p></div></div>`);
        }
        _push(`</div><div class="bg-white rounded-lg shadow-sm border p-6 mb-6"><div class="flex items-start justify-between mb-4"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">${ssrInterpolate(unref(service).title)}</h1><div class="flex items-center gap-4 text-sm text-gray-600"><div class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg> ${ssrInterpolate(unref(service).location_display)}</div>`);
        if (unref(service).category) {
          _push(`<div class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg> ${ssrInterpolate(unref(service).category.name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(service).average_rating > 0) {
          _push(`<div class="text-right"><div class="flex items-center justify-end mb-1"><div class="flex items-center"><!--[-->`);
          ssrRenderList(5, (star) => {
            _push(`<svg class="${ssrRenderClass([star <= unref(service).average_rating ? "text-yellow-400" : "text-gray-300", "w-4 h-4"])}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`);
          });
          _push(`<!--]--></div><span class="ml-2 text-sm font-medium text-gray-900">${ssrInterpolate(unref(service).average_rating.toFixed(1))}</span></div><p class="text-xs text-gray-500">${ssrInterpolate(unref(service).review_count)} ${ssrInterpolate(unref(service).review_count === 1 ? "review" : "reviews")}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="prose max-w-none"><p class="text-gray-700 leading-relaxed">${ssrInterpolate(unref(service).description)}</p></div>`);
        if ((_b = unref(service).tags) == null ? void 0 : _b.length) {
          _push(`<div class="mt-6"><h3 class="text-sm font-medium text-gray-900 mb-2">Tags</h3><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(unref(service).tags, (tag) => {
            _push(`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_c = unref(service).requirements) == null ? void 0 : _c.length) {
          _push(`<div class="mt-6"><h3 class="text-sm font-medium text-gray-900 mb-2">What I need from you</h3><ul class="list-disc list-inside text-sm text-gray-700 space-y-1"><!--[-->`);
          ssrRenderList(unref(service).requirements, (requirement) => {
            _push(`<li>${ssrInterpolate(requirement)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow-sm border p-6 sticky top-6"><div class="flex items-center mb-6"><img${ssrRenderAttr("src", ((_d = unref(service).user) == null ? void 0 : _d.avatar_url) || "/default-avatar.png")}${ssrRenderAttr("alt", (_e = unref(service).user) == null ? void 0 : _e.name)} class="w-12 h-12 rounded-full object-cover mr-4"><div><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(((_f = unref(service).user) == null ? void 0 : _f.business_name) || ((_g = unref(service).user) == null ? void 0 : _g.name))}</h3><p class="text-sm text-gray-600">Service Provider</p></div></div><div class="mb-6"><div class="text-3xl font-bold text-gray-900 mb-1">${ssrInterpolate(unref(service).formatted_price)}</div>`);
        if (unref(service).price_type === "hourly") {
          _push(`<p class="text-sm text-gray-600">per hour</p>`);
        } else if (unref(service).price_type === "fixed") {
          _push(`<p class="text-sm text-gray-600">fixed price</p>`);
        } else {
          _push(`<p class="text-sm text-gray-600">price negotiable</p>`);
        }
        if (unref(service).duration_minutes) {
          _push(`<div class="text-sm text-gray-600 mt-1"> Duration: ${ssrInterpolate(Math.floor(unref(service).duration_minutes / 60))}h ${ssrInterpolate(unref(service).duration_minutes % 60)}m </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mb-6 space-y-2">`);
        if (unref(service).instant_booking) {
          _push(`<div class="flex items-center text-sm text-green-600"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Instant booking available </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center text-sm text-gray-600"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Quick response time </div></div><div class="space-y-3"><button class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"> Book Now </button><button class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"> Contact Provider </button><button class="w-full text-gray-600 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"> Add to Favorites </button></div><div class="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"><div class="flex items-start"><svg class="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg><div><p class="text-sm font-medium text-yellow-800">Safety Tip</p><p class="text-xs text-yellow-700 mt-1">Always communicate and pay through our platform for your protection.</p></div></div></div></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-B7K9D_rB.mjs.map
