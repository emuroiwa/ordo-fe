import { _ as __nuxt_component_0 } from "./nuxt-link-D-nrCqmf.js";
import { _ as _sfc_main$1 } from "./ServiceForm-C0MOoWaH.js";
import { defineComponent, ref, watch, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-2ml_FOLh.js";
import { u as useServices } from "./useServices-CAZdAQTN.js";
import { u as useRole } from "./useRole-BsLvWiWD.js";
import { e as useRouter } from "../server.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Create Service - Dashboard"
    });
    const { createService, error, loading } = useServices();
    const { currentRole } = useRole();
    const router = useRouter();
    const categories = ref([]);
    const showSuccessModal = ref(false);
    const createdService = ref(null);
    watch(currentRole, (role) => {
      if (role === "customer") {
        router.push("/dashboard");
      }
    }, { immediate: true });
    const handleCreateService = async (serviceData) => {
      try {
        const result = await createService(serviceData);
        createdService.value = result.service;
        showSuccessModal.value = true;
      } catch (err) {
        console.error("Failed to create service:", err);
      }
    };
    const handleCancel = () => {
      router.push("/dashboard/services");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ServiceForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white shadow-sm border-b"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Create New Service</h1><p class="mt-1 text-sm text-gray-600"> Add a new service to your portfolio and start receiving bookings </p></div>`);
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
      _push(`</div></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      _push(ssrRenderComponent(_component_ServiceForm, {
        categories: unref(categories),
        loading: unref(loading),
        error: unref(error),
        onSubmit: handleCreateService,
        onCancel: handleCancel
      }, null, _parent));
      _push(`</div>`);
      if (unref(showSuccessModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-md mx-4"><div class="text-center"><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"><svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">Service Created!</h3><p class="text-sm text-gray-600 mb-6"> Your service has been created successfully. It&#39;s now live and ready to receive bookings. </p><div class="flex space-x-3"><button class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"> View Service </button><button class="flex-1 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"> Create Another </button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/services/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-DSlrU3NL.js.map
