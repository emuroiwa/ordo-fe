import { _ as __nuxt_component_0 } from "./nuxt-link-D-nrCqmf.js";
import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderDynamicModel } from "vue/server-renderer";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { u as useAuth } from "./useAuth-DYBaK23E.js";
import { u as useHead } from "./v3-2ml_FOLh.js";
import { _ as _export_sfc } from "../server.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      roles: [],
      // Array of roles: ['customer', 'vendor']
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      // Vendor-specific fields
      businessName: "",
      serviceCategory: ""
    });
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const isLoading = ref(false);
    const errorMessage = ref("");
    useAuth();
    const isFormValid = computed(() => {
      const baseValidation = form.value.roles.length > 0 && form.value.firstName.trim().length >= 2 && form.value.lastName.trim().length >= 2 && isValidEmail(form.value.email) && isValidPhone(form.value.phone) && isValidPassword(form.value.password) && form.value.password === form.value.confirmPassword && form.value.acceptTerms;
      if (form.value.roles.includes("vendor")) {
        return baseValidation && form.value.businessName.trim().length >= 2 && form.value.serviceCategory;
      }
      return baseValidation;
    });
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const isValidPhone = (phone) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(phone.replace(/\s/g, ""));
    };
    const isValidPassword = (password) => {
      return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    };
    const validationErrors = computed(() => {
      const errors = {};
      if (form.value.firstName && form.value.firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters";
      }
      if (form.value.lastName && form.value.lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters";
      }
      if (form.value.email && !isValidEmail(form.value.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (form.value.phone && !isValidPhone(form.value.phone)) {
        errors.phone = "Please enter a valid phone number";
      }
      if (form.value.password && !isValidPassword(form.value.password)) {
        errors.password = "Password must be at least 8 characters with uppercase, lowercase, number and symbol";
      }
      if (form.value.confirmPassword && form.value.password !== form.value.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      if (form.value.roles.includes("vendor") && form.value.businessName && form.value.businessName.trim().length < 2) {
        errors.businessName = "Business name must be at least 2 characters";
      }
      return errors;
    });
    useHead({
      title: "Register - ORDO"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-e8bedeb0><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-e8bedeb0><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-e8bedeb0></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-e8bedeb0></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-e8bedeb0><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-e8bedeb0><div class="flex items-center justify-between h-16" data-v-e8bedeb0><template><div class="flex items-center space-x-8" data-v-e8bedeb0>`);
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
      _push(`<nav class="hidden md:flex space-x-8" data-v-e8bedeb0>`);
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
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-e8bedeb0>`);
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
        class: "backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-blue-600 bg-white/50 relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Register <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" data-v-e8bedeb0${_scopeId}></div>`);
          } else {
            return [
              createTextVNode(" Register "),
              createVNode("div", { class: "absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-e8bedeb0><div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" data-v-e8bedeb0><div class="max-w-md w-full space-y-8" data-v-e8bedeb0><template><div class="text-center" data-v-e8bedeb0><h2 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent" data-v-e8bedeb0> Create Account </h2><p class="mt-2 text-sm text-gray-600" data-v-e8bedeb0> Join ORDO to book amazing services </p></div></template><template><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-8 shadow-lg" data-v-e8bedeb0>`);
      if (errorMessage.value) {
        _push(`<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" data-v-e8bedeb0><div class="flex" data-v-e8bedeb0><svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" data-v-e8bedeb0><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" data-v-e8bedeb0></path></svg><div class="ml-3" data-v-e8bedeb0><p class="text-sm text-red-800" data-v-e8bedeb0>${ssrInterpolate(errorMessage.value)}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-6" data-v-e8bedeb0><div data-v-e8bedeb0><label class="block text-sm font-medium text-gray-700 mb-4" data-v-e8bedeb0> How do you want to use ORDO? (You can do both!) </label><div class="space-y-3" data-v-e8bedeb0><button type="button" class="${ssrRenderClass([form.value.roles.includes("customer") ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500" : "bg-white/50 hover:bg-white/70", "backdrop-blur-sm border border-white/30 p-4 rounded-xl transition-all duration-300 text-left w-full"])}" data-v-e8bedeb0><div class="flex items-center justify-between" data-v-e8bedeb0><div class="flex items-center" data-v-e8bedeb0><svg class="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-e8bedeb0></path></svg><div data-v-e8bedeb0><span class="font-medium text-gray-900" data-v-e8bedeb0>Book Services</span><p class="text-sm text-gray-600" data-v-e8bedeb0>Find and book services from providers</p></div></div><div class="flex items-center" data-v-e8bedeb0>`);
      if (form.value.roles.includes("customer")) {
        _push(`<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" data-v-e8bedeb0><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-e8bedeb0></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-e8bedeb0></path></svg>`);
      }
      _push(`</div></div></button><button type="button" class="${ssrRenderClass([form.value.roles.includes("vendor") ? "bg-purple-50 border-purple-500 ring-2 ring-purple-500" : "bg-white/50 hover:bg-white/70", "backdrop-blur-sm border border-white/30 p-4 rounded-xl transition-all duration-300 text-left w-full"])}" data-v-e8bedeb0><div class="flex items-center justify-between" data-v-e8bedeb0><div class="flex items-center" data-v-e8bedeb0><svg class="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-e8bedeb0></path></svg><div data-v-e8bedeb0><span class="font-medium text-gray-900" data-v-e8bedeb0>Offer Services</span><p class="text-sm text-gray-600" data-v-e8bedeb0>Provide services and manage bookings</p></div></div><div class="flex items-center" data-v-e8bedeb0>`);
      if (form.value.roles.includes("vendor")) {
        _push(`<svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" data-v-e8bedeb0><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-e8bedeb0></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-e8bedeb0></path></svg>`);
      }
      _push(`</div></div></button>`);
      if (form.value.roles.length === 0) {
        _push(`<div class="text-center py-2" data-v-e8bedeb0><p class="text-sm text-gray-500" data-v-e8bedeb0>Please select at least one option to continue</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-2 gap-4" data-v-e8bedeb0><div data-v-e8bedeb0><label for="firstName" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> First Name </label><input id="firstName"${ssrRenderAttr("value", form.value.firstName)} type="text" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.firstName ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="First name" data-v-e8bedeb0>`);
      if (validationErrors.value.firstName) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.firstName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e8bedeb0><label for="lastName" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Last Name </label><input id="lastName"${ssrRenderAttr("value", form.value.lastName)} type="text" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.lastName ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="Last name" data-v-e8bedeb0>`);
      if (validationErrors.value.lastName) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.lastName)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (form.value.roles.includes("vendor")) {
        _push(`<div class="space-y-4" data-v-e8bedeb0><div data-v-e8bedeb0><label for="businessName" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Business Name </label><input id="businessName"${ssrRenderAttr("value", form.value.businessName)} type="text" required class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500" placeholder="Enter your business name" data-v-e8bedeb0></div><div data-v-e8bedeb0><label for="serviceCategory" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Service Category </label><select id="serviceCategory" required class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900" data-v-e8bedeb0><option value="" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "") : ssrLooseEqual(form.value.serviceCategory, "")) ? " selected" : ""}>Select category</option><option value="barber" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "barber") : ssrLooseEqual(form.value.serviceCategory, "barber")) ? " selected" : ""}>Barber &amp; Hair</option><option value="beauty" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "beauty") : ssrLooseEqual(form.value.serviceCategory, "beauty")) ? " selected" : ""}>Beauty &amp; Spa</option><option value="fitness" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "fitness") : ssrLooseEqual(form.value.serviceCategory, "fitness")) ? " selected" : ""}>Fitness &amp; Wellness</option><option value="home" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "home") : ssrLooseEqual(form.value.serviceCategory, "home")) ? " selected" : ""}>Home Services</option><option value="automotive" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "automotive") : ssrLooseEqual(form.value.serviceCategory, "automotive")) ? " selected" : ""}>Automotive</option><option value="events" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "events") : ssrLooseEqual(form.value.serviceCategory, "events")) ? " selected" : ""}>Events &amp; Photography</option><option value="other" data-v-e8bedeb0${ssrIncludeBooleanAttr(Array.isArray(form.value.serviceCategory) ? ssrLooseContain(form.value.serviceCategory, "other") : ssrLooseEqual(form.value.serviceCategory, "other")) ? " selected" : ""}>Other</option></select></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-e8bedeb0><label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Email address </label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" autocomplete="email" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.email ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="Enter your email" data-v-e8bedeb0>`);
      if (validationErrors.value.email) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e8bedeb0><label for="phone" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Phone Number </label><input id="phone"${ssrRenderAttr("value", form.value.phone)} type="tel" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.phone ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="Enter your phone number" data-v-e8bedeb0>`);
      if (validationErrors.value.phone) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e8bedeb0><label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Password </label><div class="relative" data-v-e8bedeb0><input id="password"${ssrRenderDynamicModel(showPassword.value ? "text" : "password", form.value.password, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} autocomplete="new-password" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.password ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="Create a password" data-v-e8bedeb0><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center" data-v-e8bedeb0>`);
      if (showPassword.value) {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-e8bedeb0></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-e8bedeb0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-e8bedeb0></path></svg>`);
      }
      _push(`</button></div>`);
      if (validationErrors.value.password) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e8bedeb0><label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2" data-v-e8bedeb0> Confirm Password </label><div class="relative" data-v-e8bedeb0><input id="confirmPassword"${ssrRenderDynamicModel(showConfirmPassword.value ? "text" : "password", form.value.confirmPassword, null)}${ssrRenderAttr("type", showConfirmPassword.value ? "text" : "password")} autocomplete="new-password" required class="${ssrRenderClass([
        "backdrop-blur-sm bg-white/50 w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-500",
        validationErrors.value.confirmPassword ? "border-red-300 focus:ring-red-500/50" : "border-white/30 focus:ring-blue-500/50"
      ])}" placeholder="Confirm your password" data-v-e8bedeb0><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center" data-v-e8bedeb0>`);
      if (showConfirmPassword.value) {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-e8bedeb0></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-e8bedeb0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-e8bedeb0></path></svg>`);
      }
      _push(`</button></div>`);
      if (validationErrors.value.confirmPassword) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-e8bedeb0>${ssrInterpolate(validationErrors.value.confirmPassword)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center" data-v-e8bedeb0><input id="terms"${ssrIncludeBooleanAttr(Array.isArray(form.value.acceptTerms) ? ssrLooseContain(form.value.acceptTerms, null) : form.value.acceptTerms) ? " checked" : ""} type="checkbox" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" data-v-e8bedeb0><label for="terms" class="ml-2 block text-sm text-gray-700" data-v-e8bedeb0> I agree to the <a href="#" class="text-blue-600 hover:text-blue-500" data-v-e8bedeb0>Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-500" data-v-e8bedeb0>Privacy Policy</a></label></div><div data-v-e8bedeb0><button type="submit"${ssrIncludeBooleanAttr(isLoading.value || !isFormValid.value) ? " disabled" : ""} class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300" data-v-e8bedeb0>`);
      if (isLoading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-e8bedeb0><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-e8bedeb0></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-e8bedeb0></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Creating account..." : "Create account")}</button></div></form><div class="mt-6" data-v-e8bedeb0><div class="relative" data-v-e8bedeb0><div class="absolute inset-0 flex items-center" data-v-e8bedeb0><div class="w-full border-t border-gray-300" data-v-e8bedeb0></div></div><div class="relative flex justify-center text-sm" data-v-e8bedeb0><span class="px-2 bg-white text-gray-500" data-v-e8bedeb0>Or sign up with</span></div></div><div class="mt-6 grid grid-cols-2 gap-3" data-v-e8bedeb0><button type="button" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white/70 transition-all duration-300" data-v-e8bedeb0><svg class="w-5 h-5 mx-auto" viewBox="0 0 24 24" data-v-e8bedeb0><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-v-e8bedeb0></path><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-v-e8bedeb0></path><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-v-e8bedeb0></path><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-v-e8bedeb0></path></svg></button><button type="button" class="backdrop-blur-sm bg-white/50 border border-white/30 rounded-xl px-4 py-2 text-sm font-medium text-gray-500 hover:bg-white/70 transition-all duration-300" data-v-e8bedeb0><svg class="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" data-v-e8bedeb0><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" data-v-e8bedeb0></path></svg></button></div></div><div class="text-center mt-6" data-v-e8bedeb0><span class="text-sm text-gray-600" data-v-e8bedeb0> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "font-medium text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></template></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e8bedeb0"]]);
export {
  register as default
};
//# sourceMappingURL=register-I438shiw.js.map
