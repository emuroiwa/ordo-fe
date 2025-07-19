import { _ as __nuxt_component_0 } from "./nuxt-link-D-nrCqmf.js";
import { ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderDynamicModel, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc, u as useRoute } from "../server.mjs";
import { u as useHead } from "./v3-2ml_FOLh.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      password: "",
      confirmPassword: ""
    });
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const passwordReset = ref(false);
    const tokenError = ref(false);
    const formError = ref("");
    const route = useRoute();
    route.query.token;
    const isFormValid = computed(() => {
      return form.value.password && form.value.confirmPassword && form.value.password === form.value.confirmPassword && form.value.password.length >= 8;
    });
    const passwordStrength = computed(() => {
      const password = form.value.password;
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
      if (/\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      return strength;
    });
    const passwordStrengthText = computed(() => {
      const strength = passwordStrength.value;
      if (strength === 0) return "Too weak";
      if (strength === 1) return "Weak";
      if (strength === 2) return "Good";
      return "Strong";
    });
    useHead({
      title: "Reset Password - ORDO"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-bd0b1aab><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-bd0b1aab><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-bd0b1aab></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-bd0b1aab></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-bd0b1aab><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-bd0b1aab><div class="flex items-center justify-between h-16" data-v-bd0b1aab><template><div class="flex items-center space-x-8" data-v-bd0b1aab>`);
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
      _push(`<nav class="hidden md:flex space-x-8" data-v-bd0b1aab>`);
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
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-bd0b1aab>`);
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
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-bd0b1aab><div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-v-bd0b1aab><div class="max-w-md w-full space-y-8" data-v-bd0b1aab><template><div class="text-center" data-v-bd0b1aab><svg class="mx-auto h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" data-v-bd0b1aab></path></svg><h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent" data-v-bd0b1aab> Reset Your Password </h2><p class="mt-2 text-sm text-gray-600" data-v-bd0b1aab>`);
      if (!passwordReset.value) {
        _push(`<span data-v-bd0b1aab>Enter your new password below</span>`);
      } else {
        _push(`<span data-v-bd0b1aab>Your password has been successfully reset!</span>`);
      }
      _push(`</p></div></template><template><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg" data-v-bd0b1aab>`);
      if (tokenError.value) {
        _push(`<div class="text-center space-y-6" data-v-bd0b1aab><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto" data-v-bd0b1aab><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bd0b1aab></path></svg></div><div data-v-bd0b1aab><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-bd0b1aab>Invalid or Expired Link</h3><p class="text-gray-600 mb-4" data-v-bd0b1aab> This password reset link is invalid or has expired. Please request a new one. </p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/forgot-password",
          class: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Request New Reset Link `);
            } else {
              return [
                createTextVNode(" Request New Reset Link ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (!passwordReset.value) {
        _push(`<form class="space-y-6" data-v-bd0b1aab><div data-v-bd0b1aab><label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-v-bd0b1aab> New Password </label><div class="relative" data-v-bd0b1aab><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.value.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500" placeholder="Enter new password" data-v-bd0b1aab><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center" data-v-bd0b1aab>`);
        if (showPassword.value) {
          _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-bd0b1aab></path></svg>`);
        } else {
          _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-bd0b1aab></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-bd0b1aab></path></svg>`);
        }
        _push(`</button></div><div class="mt-2 text-sm text-gray-500" data-v-bd0b1aab> Password must be at least 8 characters long </div></div><div data-v-bd0b1aab><label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2" data-v-bd0b1aab> Confirm New Password </label><div class="relative" data-v-bd0b1aab><input id="confirmPassword"${ssrRenderDynamicModel(showConfirmPassword.value ? "text" : "password", form.value.confirmPassword, null)}${ssrRenderAttr("type", showConfirmPassword.value ? "text" : "password")} required class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500" placeholder="Confirm new password" data-v-bd0b1aab><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center" data-v-bd0b1aab>`);
        if (showConfirmPassword.value) {
          _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-bd0b1aab></path></svg>`);
        } else {
          _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-bd0b1aab></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-bd0b1aab></path></svg>`);
        }
        _push(`</button></div></div>`);
        if (formError.value) {
          _push(`<div class="text-sm text-red-600 bg-red-50 p-3 rounded-lg" data-v-bd0b1aab>${ssrInterpolate(formError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.value.password) {
          _push(`<div class="space-y-2" data-v-bd0b1aab><div class="text-sm text-gray-600" data-v-bd0b1aab>Password strength:</div><div class="flex space-x-1" data-v-bd0b1aab><div class="${ssrRenderClass([passwordStrength.value >= 1 ? "bg-red-500" : "bg-gray-200", "h-2 flex-1 rounded-full"])}" data-v-bd0b1aab></div><div class="${ssrRenderClass([passwordStrength.value >= 2 ? "bg-yellow-500" : "bg-gray-200", "h-2 flex-1 rounded-full"])}" data-v-bd0b1aab></div><div class="${ssrRenderClass([passwordStrength.value >= 3 ? "bg-green-500" : "bg-gray-200", "h-2 flex-1 rounded-full"])}" data-v-bd0b1aab></div></div><div class="text-xs text-gray-500" data-v-bd0b1aab>${ssrInterpolate(passwordStrengthText.value)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div data-v-bd0b1aab><button type="submit"${ssrIncludeBooleanAttr(isLoading.value || !isFormValid.value) ? " disabled" : ""} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300" data-v-bd0b1aab>`);
        if (isLoading.value) {
          _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-bd0b1aab><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-bd0b1aab></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-bd0b1aab></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(isLoading.value ? "Updating Password..." : "Update Password")}</button></div></form>`);
      } else {
        _push(`<div class="text-center space-y-6" data-v-bd0b1aab><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto" data-v-bd0b1aab><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd0b1aab><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-bd0b1aab></path></svg></div><div data-v-bd0b1aab><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-bd0b1aab>Password Updated!</h3><p class="text-gray-600 mb-4" data-v-bd0b1aab> Your password has been successfully updated. You can now login with your new password. </p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to Login `);
            } else {
              return [
                createTextVNode(" Go to Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></template></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd0b1aab"]]);
export {
  resetPassword as default
};
//# sourceMappingURL=reset-password-Ct7XXVEA.js.map
