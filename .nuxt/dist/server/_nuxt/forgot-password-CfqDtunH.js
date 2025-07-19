import { _ as __nuxt_component_0 } from "./nuxt-link-D-nrCqmf.js";
import { ref, mergeProps, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "./v3-2ml_FOLh.js";
import { _ as _export_sfc } from "../server.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "forgot-password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      email: ""
    });
    const isLoading = ref(false);
    const emailSent = ref(false);
    const emailError = ref("");
    const resendCooldown = ref(0);
    useHead({
      title: "Forgot Password - ORDO"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-48474741><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-48474741><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-48474741></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-48474741></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-48474741><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-48474741><div class="flex items-center justify-between h-16" data-v-48474741><template><div class="flex items-center space-x-8" data-v-48474741>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ORDO `);
          } else {
            return [
              createTextVNode(" ORDO ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex space-x-8" data-v-48474741>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "text-gray-700 hover:text-blue-600 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Search`);
          } else {
            return [
              createTextVNode("Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/map-search",
        class: "text-gray-700 hover:text-blue-600 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Map Search`);
          } else {
            return [
              createTextVNode("Map Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/how-it-works",
        class: "text-gray-700 hover:text-blue-600 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How it Works`);
          } else {
            return [
              createTextVNode("How it Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-gray-700 hover:text-blue-600 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About us`);
          } else {
            return [
              createTextVNode("About us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-48474741>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-blue-600 hover:text-blue-800 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Register`);
          } else {
            return [
              createTextVNode("Register")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-48474741><div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-v-48474741><div class="max-w-md w-full space-y-8" data-v-48474741><template><div class="flex items-center mb-4" data-v-48474741>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48474741${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-48474741${_scopeId}></path></svg> Back to Login `);
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
              createTextVNode(" Back to Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template><template><div class="text-center" data-v-48474741><svg class="mx-auto h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48474741><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-48474741></path></svg><h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent" data-v-48474741> Forgot Password? </h2><p class="mt-2 text-sm text-gray-600" data-v-48474741>`);
      if (!emailSent.value) {
        _push(`<span data-v-48474741>No worries! Enter your email and we&#39;ll send you a reset link</span>`);
      } else {
        _push(`<span data-v-48474741>Check your email for password reset instructions</span>`);
      }
      _push(`</p></div></template><template><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg" data-v-48474741>`);
      if (!emailSent.value) {
        _push(`<form class="space-y-6" data-v-48474741><div data-v-48474741><label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-v-48474741> Email address </label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" autocomplete="email" required class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500" placeholder="Enter your email address" data-v-48474741>`);
        if (emailError.value) {
          _push(`<p class="mt-2 text-sm text-red-600" data-v-48474741>${ssrInterpolate(emailError.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-48474741><button type="submit"${ssrIncludeBooleanAttr(isLoading.value || !form.value.email) ? " disabled" : ""} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300" data-v-48474741>`);
        if (isLoading.value) {
          _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-48474741><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-48474741></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-48474741></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(isLoading.value ? "Sending..." : "Send Reset Link")}</button></div></form>`);
      } else {
        _push(`<div class="text-center space-y-6" data-v-48474741><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto" data-v-48474741><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48474741><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-48474741></path></svg></div><div data-v-48474741><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-48474741>Email Sent!</h3><p class="text-gray-600 mb-4" data-v-48474741> We&#39;ve sent a password reset link to <strong data-v-48474741>${ssrInterpolate(form.value.email)}</strong></p><p class="text-sm text-gray-500" data-v-48474741> Didn&#39;t receive the email? Check your spam folder or try again. </p></div><div class="flex flex-col sm:flex-row gap-3" data-v-48474741><button${ssrIncludeBooleanAttr(resendCooldown.value > 0) ? " disabled" : ""} class="flex-1 backdrop-blur-sm bg-white/50 border border-white/30 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-white/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" data-v-48474741>${ssrInterpolate(resendCooldown.value > 0 ? `Resend in ${resendCooldown.value}s` : "Resend Email")}</button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Login `);
            } else {
              return [
                createTextVNode(" Back to Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></template><template><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg" data-v-48474741><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-48474741>Need Help?</h3><div class="space-y-3" data-v-48474741><div class="flex items-start space-x-3" data-v-48474741><svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48474741><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-48474741></path></svg><div data-v-48474741><p class="text-sm font-medium text-gray-900" data-v-48474741>Password reset not working?</p><p class="text-sm text-gray-600" data-v-48474741>Make sure to check your spam folder and try again.</p></div></div><div class="flex items-start space-x-3" data-v-48474741><svg class="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48474741><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-48474741></path></svg><div data-v-48474741><p class="text-sm font-medium text-gray-900" data-v-48474741>Still having trouble?</p><p class="text-sm text-gray-600" data-v-48474741>Contact our support team at <a href="mailto:support@ordo.com" class="text-blue-600 hover:text-blue-800" data-v-48474741>support@ordo.com</a></p></div></div></div></div></template></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48474741"]]);
export {
  forgotPassword as default
};
//# sourceMappingURL=forgot-password-CfqDtunH.js.map
