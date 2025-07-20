import { _ as __nuxt_component_0 } from './nuxt-link-xZuWyqv4.mjs';
import { ref, computed, h, mergeProps, withCtx, createTextVNode, createVNode, unref, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { u as useServices } from './useServices-BTHHH3wN.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      categories,
      loading,
      formatPrice,
      getOptimizedImageUrl
    } = useServices();
    ref("");
    ref(true);
    const popularTags = computed(() => {
      return categories.value.filter((cat) => cat.is_active && cat.services_count > 0).slice(0, 6).map((cat) => cat.name);
    });
    const featuredServices = ref([]);
    const highDemandServices = ref([]);
    const transformServiceForDisplay = (service) => {
      var _a;
      return {
        id: service.id,
        name: service.title,
        category: ((_a = service.category) == null ? void 0 : _a.name) || "Service",
        details: `${service.duration_minutes ? service.duration_minutes + " min" : ""} \u2022 ${service.location_display || "Various locations"}`,
        price: service.base_price,
        rating: service.average_rating || 4.5,
        location: service.location_display || "Location not specified",
        image: service.primary_image ? getOptimizedImageUrl(service.primary_image, "medium") : "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        timeAgo: formatTimeAgo(service.created_at),
        bookingsToday: service.booking_count || Math.floor(Math.random() * 30) + 5,
        // Mock for now
        slug: service.full_slug,
        vendor: service.user
      };
    };
    const featuredVendors = computed(() => {
      return featuredServices.value.map(transformServiceForDisplay);
    });
    const highDemandVendors = computed(() => {
      return highDemandServices.value.map(transformServiceForDisplay);
    });
    const formatTimeAgo = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInHours = Math.floor((now - date) / (1e3 * 60 * 60));
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      } else if (diffInHours < 168) {
        const days = Math.floor(diffInHours / 24);
        return `${days} ${days === 1 ? "day" : "days"} ago`;
      } else {
        const weeks = Math.floor(diffInHours / 168);
        return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
      }
    };
    const features = ref([
      {
        title: "Easy Search",
        description: "Find the perfect vendor with our advanced search and filter system",
        icon: h("svg", { class: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" })
        ])
      },
      {
        title: "Instant Booking",
        description: "Book appointments instantly and manage them from your dashboard",
        icon: h("svg", { class: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" })
        ])
      },
      {
        title: "Trusted Vendors",
        description: "All vendors are verified and rated by our community",
        icon: h("svg", { class: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
          h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
        ])
      }
    ]);
    ref(null);
    ref(null);
    const featuredActiveDot = ref(0);
    const highDemandActiveDot = ref(0);
    const featuredDots = computed(() => {
      const itemsPerView = 3;
      return Math.ceil(featuredVendors.value.length / itemsPerView);
    });
    const highDemandDots = computed(() => {
      const itemsPerView = 3;
      return Math.ceil(highDemandVendors.value.length / itemsPerView);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-38b21ea0><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-38b21ea0><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-38b21ea0></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-38b21ea0></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-38b21ea0><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-38b21ea0><div class="flex items-center justify-between h-16" data-v-38b21ea0><template><div class="flex items-center space-x-8" data-v-38b21ea0><div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-38b21ea0> ORDO </div><nav class="hidden md:flex space-x-8" data-v-38b21ea0><a href="#" class="text-blue-600 font-medium relative" data-v-38b21ea0> Search <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" data-v-38b21ea0></div></a>`);
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
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-38b21ea0>`);
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
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/register" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300" data-v-38b21ea0${_scopeId}> List a Service </button>`);
          } else {
            return [
              createVNode("button", { class: "glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300" }, " List a Service ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-38b21ea0><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-38b21ea0><div class="max-w-7xl mx-auto text-center" data-v-38b21ea0><template><div class="mb-12" data-v-38b21ea0><h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight" data-v-38b21ea0> Find a new service in <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-38b21ea0> South Africa </span></h1><p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto" data-v-38b21ea0> Discover trusted vendors while you stay at home </p></div></template><template><div class="glass-card max-w-5xl mx-auto mb-8" data-v-38b21ea0><div class="flex flex-col md:flex-row gap-4" data-v-38b21ea0><div class="flex-1" data-v-38b21ea0><input type="text" placeholder="Enter Location, Project or Landmark" class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-38b21ea0></div><div class="flex-1" data-v-38b21ea0><select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-38b21ea0><option value="" data-v-38b21ea0>Service Type</option><!--[-->`);
      ssrRenderList(unref(categories).slice(0, 10), (category) => {
        _push(`<option${ssrRenderAttr("value", category.slug)} data-v-38b21ea0>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex-1" data-v-38b21ea0><select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-38b21ea0><option data-v-38b21ea0>Budget</option><option data-v-38b21ea0>R100 - R500</option><option data-v-38b21ea0>R500 - R2000</option><option data-v-38b21ea0>R2000+</option></select></div><button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105" data-v-38b21ea0> Search </button></div><div class="flex flex-wrap gap-3 mt-8 justify-center" data-v-38b21ea0><span class="text-gray-600 font-medium" data-v-38b21ea0>Popular:</span><!--[-->`);
      ssrRenderList(popularTags.value, (tag) => {
        _push(`<button class="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 hover:bg-white/70 transition-all duration-200 hover:scale-105" data-v-38b21ea0>${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div></div></template></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-38b21ea0><div class="max-w-7xl mx-auto" data-v-38b21ea0><template><div class="mb-16" data-v-38b21ea0><div class="flex items-center justify-between mb-8" data-v-38b21ea0><h2 class="text-3xl md:text-4xl font-bold text-gray-900" data-v-38b21ea0> Services You May Like in <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-38b21ea0> Johannesburg </span></h2><button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300" data-v-38b21ea0><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-38b21ea0></path></svg></button></div><div class="overflow-x-auto scrollbar-hide" data-v-38b21ea0>`);
      if (unref(loading)) {
        _push(`<div class="flex space-x-6 pb-4" data-v-38b21ea0><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="glass-card flex-shrink-0 w-80 animate-pulse" data-v-38b21ea0><div class="bg-gray-200 h-48 rounded-2xl mb-4" data-v-38b21ea0></div><div class="p-6" data-v-38b21ea0><div class="bg-gray-200 h-6 rounded mb-2" data-v-38b21ea0></div><div class="bg-gray-200 h-4 rounded mb-4" data-v-38b21ea0></div><div class="bg-gray-200 h-4 rounded w-3/4" data-v-38b21ea0></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="flex space-x-6 pb-4" style="${ssrRenderStyle({ "width": "max-content" })}" data-v-38b21ea0><!--[-->`);
        ssrRenderList(featuredVendors.value, (vendor, index2) => {
          _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.1 + "s" })}" class="glass-card-hover group cursor-pointer flex-shrink-0 w-80" data-v-38b21ea0><div class="relative overflow-hidden rounded-2xl" data-v-38b21ea0><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" data-v-38b21ea0><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-38b21ea0></div><button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-38b21ea0><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-38b21ea0></path></svg></button></div><div class="p-6" data-v-38b21ea0><div class="flex items-center justify-between mb-3" data-v-38b21ea0><span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-38b21ea0>${ssrInterpolate(unref(formatPrice)(vendor.price, "ZAR"))}</span><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-38b21ea0><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-38b21ea0></path></svg></button></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-38b21ea0>${ssrInterpolate(vendor.name)}</h3><p class="text-sm text-gray-600 mb-3" data-v-38b21ea0>${ssrInterpolate(vendor.category)} \u2022 ${ssrInterpolate(vendor.details)}</p><div class="flex items-center text-sm text-gray-500 mb-4" data-v-38b21ea0><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-38b21ea0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-38b21ea0></path></svg> ${ssrInterpolate(vendor.location)}</div><div class="flex items-center justify-between" data-v-38b21ea0><div class="flex items-center" data-v-38b21ea0><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-38b21ea0><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-38b21ea0></path></svg><span class="text-sm font-medium text-gray-700" data-v-38b21ea0>${ssrInterpolate(vendor.rating)}</span></div><span class="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full" data-v-38b21ea0> Available Today </span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (!unref(loading) && featuredVendors.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-38b21ea0><div class="glass-card max-w-md mx-auto" data-v-38b21ea0><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-38b21ea0>No Featured Services</h3><p class="text-gray-600" data-v-38b21ea0>Check back later for featured services in your area.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-center mt-6" data-v-38b21ea0><div class="flex space-x-2" data-v-38b21ea0><!--[-->`);
      ssrRenderList(featuredDots.value, (_, index2) => {
        _push(`<button class="${ssrRenderClass([featuredActiveDot.value === index2 ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6" : "bg-gray-300 hover:bg-gray-400", "w-2 h-2 rounded-full transition-all duration-300"])}" data-v-38b21ea0></button>`);
      });
      _push(`<!--]--></div></div></div></template><template><div class="mb-16" data-v-38b21ea0><div class="flex items-center justify-between mb-8" data-v-38b21ea0><h2 class="text-3xl md:text-4xl font-bold text-gray-900" data-v-38b21ea0> Services in High Demand in <span class="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent" data-v-38b21ea0> Johannesburg </span></h2><button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300" data-v-38b21ea0><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-38b21ea0></path></svg></button></div><div class="overflow-x-auto scrollbar-hide" data-v-38b21ea0>`);
      if (unref(loading)) {
        _push(`<div class="flex space-x-6 pb-4 pt-4" data-v-38b21ea0><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="glass-card flex-shrink-0 w-80 animate-pulse" data-v-38b21ea0><div class="bg-gray-200 h-48 rounded-2xl mb-4" data-v-38b21ea0></div><div class="p-6" data-v-38b21ea0><div class="bg-gray-200 h-6 rounded mb-2" data-v-38b21ea0></div><div class="bg-gray-200 h-4 rounded mb-4" data-v-38b21ea0></div><div class="bg-gray-200 h-4 rounded w-3/4" data-v-38b21ea0></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="flex space-x-6 pb-4 pt-4" style="${ssrRenderStyle({ "width": "max-content" })}" data-v-38b21ea0><!--[-->`);
        ssrRenderList(highDemandVendors.value, (vendor, index2) => {
          _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.1 + "s" })}" class="glass-card-hover group cursor-pointer flex-shrink-0 w-80 relative" data-v-38b21ea0><div class="absolute -top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg" data-v-38b21ea0> \u{1F525} HIGH DEMAND </div><div class="relative overflow-hidden rounded-2xl" data-v-38b21ea0><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" data-v-38b21ea0><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-38b21ea0></div><button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-38b21ea0><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-38b21ea0></path></svg></button></div><div class="p-6" data-v-38b21ea0><div class="flex items-center justify-between mb-3" data-v-38b21ea0><span class="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent" data-v-38b21ea0>${ssrInterpolate(unref(formatPrice)(vendor.price, "ZAR"))}</span><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-38b21ea0><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-38b21ea0></path></svg></button></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-38b21ea0>${ssrInterpolate(vendor.name)}</h3><p class="text-sm text-gray-600 mb-3" data-v-38b21ea0>${ssrInterpolate(vendor.category)} \u2022 ${ssrInterpolate(vendor.details)}</p><div class="flex items-center text-sm text-gray-500 mb-4" data-v-38b21ea0><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-38b21ea0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-38b21ea0></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-38b21ea0></path></svg> ${ssrInterpolate(vendor.location)}</div><div class="flex items-center justify-between" data-v-38b21ea0><div class="flex items-center" data-v-38b21ea0><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-38b21ea0><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-38b21ea0></path></svg><span class="text-sm font-medium text-gray-700" data-v-38b21ea0>${ssrInterpolate(vendor.rating)}</span></div><span class="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full font-medium" data-v-38b21ea0>${ssrInterpolate(vendor.bookingsToday)}+ booked today </span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (!unref(loading) && highDemandVendors.value.length === 0) {
        _push(`<div class="text-center py-12" data-v-38b21ea0><div class="glass-card max-w-md mx-auto" data-v-38b21ea0><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-38b21ea0>No High Demand Services</h3><p class="text-gray-600" data-v-38b21ea0>Check back later for popular services in your area.</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex justify-center mt-6" data-v-38b21ea0><div class="flex space-x-2" data-v-38b21ea0><!--[-->`);
      ssrRenderList(highDemandDots.value, (_, index2) => {
        _push(`<button class="${ssrRenderClass([highDemandActiveDot.value === index2 ? "bg-gradient-to-r from-red-600 to-pink-600 w-6" : "bg-gray-300 hover:bg-gray-400", "w-2 h-2 rounded-full transition-all duration-300"])}" data-v-38b21ea0></button>`);
      });
      _push(`<!--]--></div></div></div></template></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-38b21ea0><div class="max-w-7xl mx-auto" data-v-38b21ea0><template><div class="text-center mb-16" data-v-38b21ea0><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-v-38b21ea0>Why Choose ORDO</h2><p class="text-xl text-gray-600 max-w-2xl mx-auto" data-v-38b21ea0> We make it easy to find, book, and manage your service appointments </p></div></template><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-38b21ea0><!--[-->`);
      ssrRenderList(features.value, (feature, index2) => {
        _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.2 + "s" })}" class="glass-card text-center group hover:scale-105 transition-all duration-300" data-v-38b21ea0><div class="glass-icon mb-6 mx-auto" data-v-38b21ea0>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feature.icon), { class: "w-8 h-8 text-blue-600" }, null), _parent);
        _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-4" data-v-38b21ea0>${ssrInterpolate(feature.title)}</h3><p class="text-gray-600" data-v-38b21ea0>${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-38b21ea0><div class="max-w-4xl mx-auto text-center" data-v-38b21ea0><template><div class="glass-card" data-v-38b21ea0><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-v-38b21ea0> Ready to Get Started? </h2><p class="text-xl text-gray-600 mb-8" data-v-38b21ea0> Join thousands of satisfied customers who trust our platform </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start Searching `);
          } else {
            return [
              createTextVNode(" Start Searching ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template></div></section></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38b21ea0"]]);

export { index as default };
//# sourceMappingURL=index-BMSAPQ3N.mjs.map
