import { _ as __nuxt_component_0 } from './nuxt-link-D-nrCqmf.mjs';
import { ref, h, computed, mergeProps, withCtx, createTextVNode, createVNode, unref, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
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
    ref("");
    ref(true);
    const popularTags = ref([
      "Weddings",
      "Barbers",
      "Equipment",
      "Photography",
      "Catering",
      "Events"
    ]);
    const featuredVendors = ref([
      {
        id: 1,
        name: "Premium Cuts",
        category: "Barber",
        details: "2 Services \u2022 1 Location",
        price: 150,
        rating: 4.8,
        location: "Sandton, Johannesburg",
        image: "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=400&h=300&fit=crop",
        timeAgo: "2 days ago"
      },
      {
        id: 2,
        name: "Elegant Weddings",
        category: "Wedding",
        details: "5 Services \u2022 3 Locations",
        price: 2500,
        rating: 4.9,
        location: "Camps Bay, Cape Town",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
        timeAgo: "1 week ago"
      },
      {
        id: 3,
        name: "Pro Equipment",
        category: "Equipment",
        details: "10 Items \u2022 Same Day",
        price: 300,
        rating: 4.6,
        location: "Umhlanga, Durban",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        timeAgo: "3 days ago"
      },
      {
        id: 4,
        name: "Studio Flash",
        category: "Photography",
        details: "3 Packages \u2022 Weekend",
        price: 800,
        rating: 4.7,
        location: "Hatfield, Pretoria",
        image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&h=300&fit=crop",
        timeAgo: "5 days ago"
      },
      {
        id: 5,
        name: "Urban Cuts",
        category: "Barber",
        details: "3 Services \u2022 2 Locations",
        price: 180,
        rating: 4.6,
        location: "Rosebank, Johannesburg",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop",
        timeAgo: "1 day ago"
      },
      {
        id: 6,
        name: "Luxury Events",
        category: "Event Planning",
        details: "8 Services \u2022 4 Locations",
        price: 3500,
        rating: 4.9,
        location: "Waterfront, Cape Town",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
        timeAgo: "3 days ago"
      }
    ]);
    const highDemandVendors = ref([
      {
        id: 11,
        name: "Elite Barber Co",
        category: "Barber",
        details: "4 Services \u2022 2 Locations",
        price: 200,
        rating: 4.9,
        location: "Hyde Park, Johannesburg",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop",
        bookingsToday: 15
      },
      {
        id: 12,
        name: "Dream Weddings",
        category: "Wedding",
        details: "10 Services \u2022 6 Locations",
        price: 4500,
        rating: 5,
        location: "Melrose, Johannesburg",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
        bookingsToday: 8
      },
      {
        id: 13,
        name: "Pro Audio Rentals",
        category: "Equipment",
        details: "15 Items \u2022 Instant Delivery",
        price: 450,
        rating: 4.8,
        location: "Fourways, Johannesburg",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        bookingsToday: 22
      },
      {
        id: 14,
        name: "Capture Moments",
        category: "Photography",
        details: "6 Packages \u2022 Same Day Edit",
        price: 1200,
        rating: 4.9,
        location: "Bryanston, Johannesburg",
        image: "https://images.unsplash.com/photo-1606914469633-5fe06c9e8fcc?w=400&h=300&fit=crop",
        bookingsToday: 12
      },
      {
        id: 15,
        name: "Gourmet Caterers",
        category: "Catering",
        details: "12 Menus \u2022 500+ Reviews",
        price: 1800,
        rating: 4.8,
        location: "Randburg, Johannesburg",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
        bookingsToday: 18
      },
      {
        id: 16,
        name: "Skilled Barbers",
        category: "Barber",
        details: "5 Services \u2022 Walk-ins Welcome",
        price: 120,
        rating: 4.7,
        location: "Midrand, Johannesburg",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop",
        bookingsToday: 25
      }
    ]);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-d80b7659><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-d80b7659><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-d80b7659></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-d80b7659></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-d80b7659><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-d80b7659><div class="flex items-center justify-between h-16" data-v-d80b7659><template><div class="flex items-center space-x-8" data-v-d80b7659><div class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-d80b7659> ORDO </div><nav class="hidden md:flex space-x-8" data-v-d80b7659><a href="#" class="text-blue-600 font-medium relative" data-v-d80b7659> Search <div class="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" data-v-d80b7659></div></a>`);
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
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-d80b7659>`);
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
            _push2(`<button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300" data-v-d80b7659${_scopeId}> List a Service </button>`);
          } else {
            return [
              createVNode("button", { class: "glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300" }, " List a Service ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-d80b7659><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-d80b7659><div class="max-w-7xl mx-auto text-center" data-v-d80b7659><template><div class="mb-12" data-v-d80b7659><h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight" data-v-d80b7659> Find a new service in <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-d80b7659> South Africa </span></h1><p class="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto" data-v-d80b7659> Discover trusted vendors while you stay at home </p></div></template><template><div class="glass-card max-w-5xl mx-auto mb-8" data-v-d80b7659><div class="flex flex-col md:flex-row gap-4" data-v-d80b7659><div class="flex-1" data-v-d80b7659><input type="text" placeholder="Enter Location, Project or Landmark" class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-d80b7659></div><div class="flex-1" data-v-d80b7659><select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-d80b7659><option data-v-d80b7659>Service Type</option><option data-v-d80b7659>Barber</option><option data-v-d80b7659>Wedding</option><option data-v-d80b7659>Equipment</option></select></div><div class="flex-1" data-v-d80b7659><select class="glass-input w-full px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" data-v-d80b7659><option data-v-d80b7659>Budget</option><option data-v-d80b7659>R100 - R500</option><option data-v-d80b7659>R500 - R2000</option><option data-v-d80b7659>R2000+</option></select></div><button class="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105" data-v-d80b7659> Search </button></div><div class="flex flex-wrap gap-3 mt-8 justify-center" data-v-d80b7659><span class="text-gray-600 font-medium" data-v-d80b7659>Popular:</span><!--[-->`);
      ssrRenderList(popularTags.value, (tag) => {
        _push(`<button class="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-600 hover:bg-white/70 transition-all duration-200 hover:scale-105" data-v-d80b7659>${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div></div></template></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-d80b7659><div class="max-w-7xl mx-auto" data-v-d80b7659><template><div class="mb-16" data-v-d80b7659><div class="flex items-center justify-between mb-8" data-v-d80b7659><h2 class="text-3xl md:text-4xl font-bold text-gray-900" data-v-d80b7659> Services You May Like in <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-d80b7659> Johannesburg </span></h2><button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300" data-v-d80b7659><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-d80b7659></path></svg></button></div><div class="overflow-x-auto scrollbar-hide" data-v-d80b7659><div class="flex space-x-6 pb-4" style="${ssrRenderStyle({ "width": "max-content" })}" data-v-d80b7659><!--[-->`);
      ssrRenderList(featuredVendors.value, (vendor, index2) => {
        _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.1 + "s" })}" class="glass-card-hover group cursor-pointer flex-shrink-0 w-80" data-v-d80b7659><div class="relative overflow-hidden rounded-2xl" data-v-d80b7659><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" data-v-d80b7659><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-d80b7659></div><button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-d80b7659><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-d80b7659></path></svg></button></div><div class="p-6" data-v-d80b7659><div class="flex items-center justify-between mb-3" data-v-d80b7659><span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-d80b7659> R ${ssrInterpolate(vendor.price.toLocaleString())}</span><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-d80b7659><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-d80b7659></path></svg></button></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-d80b7659>${ssrInterpolate(vendor.name)}</h3><p class="text-sm text-gray-600 mb-3" data-v-d80b7659>${ssrInterpolate(vendor.category)} \u2022 ${ssrInterpolate(vendor.details)}</p><div class="flex items-center text-sm text-gray-500 mb-4" data-v-d80b7659><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-d80b7659></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-d80b7659></path></svg> ${ssrInterpolate(vendor.location)}</div><div class="flex items-center justify-between" data-v-d80b7659><div class="flex items-center" data-v-d80b7659><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-d80b7659><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-d80b7659></path></svg><span class="text-sm font-medium text-gray-700" data-v-d80b7659>${ssrInterpolate(vendor.rating)}</span></div><span class="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full" data-v-d80b7659> Available Today </span></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-center mt-6" data-v-d80b7659><div class="flex space-x-2" data-v-d80b7659><!--[-->`);
      ssrRenderList(unref(featuredDots), (dot, index2) => {
        _push(`<button class="${ssrRenderClass([featuredActiveDot.value === index2 ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6" : "bg-gray-300 hover:bg-gray-400", "w-2 h-2 rounded-full transition-all duration-300"])}" data-v-d80b7659></button>`);
      });
      _push(`<!--]--></div></div></div></template><template><div class="mb-16" data-v-d80b7659><div class="flex items-center justify-between mb-8" data-v-d80b7659><h2 class="text-3xl md:text-4xl font-bold text-gray-900" data-v-d80b7659> Services in High Demand in <span class="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent" data-v-d80b7659> Johannesburg </span></h2><button class="glass-button p-3 rounded-full hover:shadow-lg transition-all duration-300" data-v-d80b7659><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-d80b7659></path></svg></button></div><div class="overflow-x-auto scrollbar-hide" data-v-d80b7659><div class="flex space-x-6 pb-4 pt-4" style="${ssrRenderStyle({ "width": "max-content" })}" data-v-d80b7659><!--[-->`);
      ssrRenderList(highDemandVendors.value, (vendor, index2) => {
        _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.1 + "s" })}" class="glass-card-hover group cursor-pointer flex-shrink-0 w-80 relative" data-v-d80b7659><div class="absolute -top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg" data-v-d80b7659> \u{1F525} HIGH DEMAND </div><div class="relative overflow-hidden rounded-2xl" data-v-d80b7659><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" data-v-d80b7659><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-d80b7659></div><button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-d80b7659><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-d80b7659></path></svg></button></div><div class="p-6" data-v-d80b7659><div class="flex items-center justify-between mb-3" data-v-d80b7659><span class="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent" data-v-d80b7659> R ${ssrInterpolate(vendor.price.toLocaleString())}</span><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-d80b7659><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-d80b7659></path></svg></button></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-d80b7659>${ssrInterpolate(vendor.name)}</h3><p class="text-sm text-gray-600 mb-3" data-v-d80b7659>${ssrInterpolate(vendor.category)} \u2022 ${ssrInterpolate(vendor.details)}</p><div class="flex items-center text-sm text-gray-500 mb-4" data-v-d80b7659><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d80b7659><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-d80b7659></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-d80b7659></path></svg> ${ssrInterpolate(vendor.location)}</div><div class="flex items-center justify-between" data-v-d80b7659><div class="flex items-center" data-v-d80b7659><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-d80b7659><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-d80b7659></path></svg><span class="text-sm font-medium text-gray-700" data-v-d80b7659>${ssrInterpolate(vendor.rating)}</span></div><span class="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full font-medium" data-v-d80b7659>${ssrInterpolate(vendor.bookingsToday)}+ booked today </span></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-center mt-6" data-v-d80b7659><div class="flex space-x-2" data-v-d80b7659><!--[-->`);
      ssrRenderList(unref(highDemandDots), (dot, index2) => {
        _push(`<button class="${ssrRenderClass([highDemandActiveDot.value === index2 ? "bg-gradient-to-r from-red-600 to-pink-600 w-6" : "bg-gray-300 hover:bg-gray-400", "w-2 h-2 rounded-full transition-all duration-300"])}" data-v-d80b7659></button>`);
      });
      _push(`<!--]--></div></div></div></template></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-d80b7659><div class="max-w-7xl mx-auto" data-v-d80b7659><template><div class="text-center mb-16" data-v-d80b7659><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-v-d80b7659>Why Choose ORDO</h2><p class="text-xl text-gray-600 max-w-2xl mx-auto" data-v-d80b7659> We make it easy to find, book, and manage your service appointments </p></div></template><div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-v-d80b7659><!--[-->`);
      ssrRenderList(features.value, (feature, index2) => {
        _push(`<div style="${ssrRenderStyle({ "--delay": index2 * 0.2 + "s" })}" class="glass-card text-center group hover:scale-105 transition-all duration-300" data-v-d80b7659><div class="glass-icon mb-6 mx-auto" data-v-d80b7659>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(feature.icon), { class: "w-8 h-8 text-blue-600" }, null), _parent);
        _push(`</div><h3 class="text-xl font-semibold text-gray-900 mb-4" data-v-d80b7659>${ssrInterpolate(feature.title)}</h3><p class="text-gray-600" data-v-d80b7659>${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" data-v-d80b7659><div class="max-w-4xl mx-auto text-center" data-v-d80b7659><template><div class="glass-card" data-v-d80b7659><h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-v-d80b7659> Ready to Get Started? </h2><p class="text-xl text-gray-600 mb-8" data-v-d80b7659> Join thousands of satisfied customers who trust our platform </p>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d80b7659"]]);

export { index as default };
//# sourceMappingURL=index-y6WuQzdG.mjs.map
