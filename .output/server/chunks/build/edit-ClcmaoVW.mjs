import { _ as __nuxt_component_0 } from './nuxt-link-D-nrCqmf.mjs';
import { _ as _sfc_main$1 } from './ServiceForm-C0MOoWaH.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useServices } from './useServices-CAZdAQTN.mjs';
import { u as useRole } from './useRole-BsLvWiWD.mjs';
import { u as useRoute, e as useRouter } from './server.mjs';
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
  __name: "edit",
  __ssrInlineRender: true,
  setup(__props) {
    const { updateService, service, error, loading } = useServices();
    const { currentRole } = useRole();
    const route = useRoute();
    const router = useRouter();
    const categories = ref([]);
    const loadingService = ref(true);
    const fetchError = ref("");
    const showSuccessMessage = ref(false);
    useHead({
      title: computed(() => service.value ? `Edit ${service.value.title} - Dashboard` : "Edit Service - Dashboard")
    });
    watch(currentRole, (role) => {
      if (role === "customer") {
        router.push("/dashboard");
      }
    }, { immediate: true });
    const handleUpdateService = async (serviceData) => {
      try {
        const serviceId = route.params.id;
        await updateService(serviceId, serviceData);
        showSuccessMessage.value = true;
        setTimeout(() => {
          showSuccessMessage.value = false;
        }, 3e3);
        (void 0).scrollTo(0, 0);
      } catch (err) {
        console.error("Failed to update service:", err);
      }
    };
    const handleCancel = () => {
      router.push("/dashboard/services");
    };
    const getStatusClass = (status) => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800";
        case "draft":
          return "bg-gray-100 text-gray-800";
        case "paused":
          return "bg-yellow-100 text-yellow-800";
        case "archived":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ServiceForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      if (unref(loadingService)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p class="text-gray-600">Loading service...</p></div></div>`);
      } else if (unref(fetchError)) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center max-w-md mx-4"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3><p class="text-sm text-gray-600 mb-4"> The service you&#39;re looking for doesn&#39;t exist or you don&#39;t have permission to edit it. </p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/services",
          class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Services `);
            } else {
              return [
                createTextVNode(" Back to Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(service)) {
        _push(`<div><div class="bg-white shadow-sm border-b"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Edit Service</h1><p class="mt-1 text-sm text-gray-600"> Update your service details and settings </p></div><div class="flex items-center space-x-3"><span class="${ssrRenderClass([getStatusClass(unref(service).status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(unref(service).status.charAt(0).toUpperCase() + unref(service).status.slice(1))}</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/services/${unref(service).full_slug}`,
          class: "inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
          target: "_blank"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg> View Live `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  })
                ])),
                createTextVNode(" View Live ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/services",
          class: "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg> Back to Services `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                  })
                ])),
                createTextVNode(" Back to Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
        _push(ssrRenderComponent(_component_ServiceForm, {
          service: unref(service),
          categories: unref(categories),
          loading: unref(loading),
          error: unref(error),
          onSubmit: handleUpdateService,
          onCancel: handleCancel
        }, null, _parent));
        _push(`</div>`);
        if (unref(showSuccessMessage)) {
          _push(`<div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50"><div class="flex items-center"><svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Service updated successfully! </div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/services/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-ClcmaoVW.mjs.map
