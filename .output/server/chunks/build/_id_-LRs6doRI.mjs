import { _ as __nuxt_component_0 } from './nuxt-link-D-nrCqmf.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, createBlock, createVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc, u as useRoute } from './server.mjs';
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

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const vendorId = route.params.id;
    const vendor = ref({
      id: vendorId,
      name: "Premium Cuts Barber",
      description: "Professional barber services with over 10 years of experience",
      category: "Barber",
      location: "Sandton, Johannesburg",
      price: 150,
      rating: 4.8,
      reviews: 127,
      responseTime: "Usually responds within 1 hour",
      images: [
        "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop"
      ],
      services: [
        {
          id: 1,
          name: "Classic Haircut",
          description: "Traditional haircut with styling",
          price: 150,
          duration: "45 minutes"
        },
        {
          id: 2,
          name: "Beard Trim",
          description: "Professional beard shaping and trimming",
          price: 80,
          duration: "30 minutes"
        },
        {
          id: 3,
          name: "Hair Wash & Style",
          description: "Complete hair washing and styling service",
          price: 120,
          duration: "60 minutes"
        },
        {
          id: 4,
          name: "Premium Package",
          description: "Haircut + beard trim + wash + style",
          price: 280,
          duration: "90 minutes"
        }
      ],
      customerReviews: [
        {
          id: 1,
          name: "John Smith",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          rating: 5,
          date: "2 weeks ago",
          comment: "Excellent service! The barber was very skilled and the place has a great atmosphere. Will definitely be back."
        },
        {
          id: 2,
          name: "Mike Johnson",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
          rating: 4,
          date: "1 month ago",
          comment: "Great haircut and professional service. The booking system is very convenient."
        },
        {
          id: 3,
          name: "David Wilson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          rating: 5,
          date: "1 month ago",
          comment: "Best barber in Sandton! Always consistent quality and friendly service."
        }
      ]
    });
    const similarServices = ref([
      {
        id: 5,
        name: "Urban Cuts",
        category: "Barber",
        price: 180,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        name: "Elite Barber Co",
        category: "Barber",
        price: 200,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop"
      },
      {
        id: 7,
        name: "Skilled Barbers",
        category: "Barber",
        price: 120,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop"
      }
    ]);
    const currentImage = ref(vendor.value.images[0]);
    const selectedDate = ref("");
    const selectedTime = ref("");
    const specialRequests = ref("");
    const selectedService = ref(vendor.value.services[0]);
    const availableTimes = ref([
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00"
    ]);
    const selectedServicePrice = computed(() => {
      var _a;
      return ((_a = selectedService.value) == null ? void 0 : _a.price) || vendor.value.price;
    });
    useHead({
      title: `${vendor.value.name} - ORDO`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen relative overflow-hidden" }, _attrs))} data-v-95c2714c><div class="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" data-v-95c2714c><div class="absolute inset-0 bg-[url(&#39;https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;auto=format&amp;q=80&#39;)] bg-cover bg-center opacity-10" data-v-95c2714c></div><div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5" data-v-95c2714c></div></div><header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm" data-v-95c2714c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-95c2714c><div class="flex items-center justify-between h-16" data-v-95c2714c><template><div class="flex items-center space-x-8" data-v-95c2714c>`);
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
      _push(`<nav class="hidden md:flex space-x-8" data-v-95c2714c>`);
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
      _push(`</nav></div></template><template><div class="flex items-center space-x-4" data-v-95c2714c><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-95c2714c><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-95c2714c></path></svg></button><button class="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-95c2714c><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-95c2714c></path></svg></button>`);
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
      _push(`</div></template></div></div></header><main class="relative z-10 pt-16" data-v-95c2714c><section class="py-6 px-4 sm:px-6 lg:px-8" data-v-95c2714c><div class="max-w-7xl mx-auto" data-v-95c2714c><template>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "glass-button inline-flex items-center space-x-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-95c2714c${_scopeId}></path></svg><span class="text-gray-700" data-v-95c2714c${_scopeId}>Back to Services</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 text-gray-600",
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
              createVNode("span", { class: "text-gray-700" }, "Back to Services")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</template></div></section><section class="py-8 px-4 sm:px-6 lg:px-8" data-v-95c2714c><div class="max-w-7xl mx-auto" data-v-95c2714c><div class="grid grid-cols-1 lg:grid-cols-2 gap-12" data-v-95c2714c><template><div class="space-y-6" data-v-95c2714c><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-0 overflow-hidden shadow-lg" data-v-95c2714c><div class="relative" data-v-95c2714c><img${ssrRenderAttr("src", currentImage.value)}${ssrRenderAttr("alt", vendor.value.name)} class="w-full h-96 object-cover" data-v-95c2714c><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-95c2714c></div><div class="absolute top-4 right-4 flex space-x-2" data-v-95c2714c><button class="backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-95c2714c><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-95c2714c></path></svg></button><button class="backdrop-blur-sm bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-95c2714c><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" data-v-95c2714c></path></svg></button></div></div></div><div class="flex space-x-4 overflow-x-auto scrollbar-hide" data-v-95c2714c><!--[-->`);
      ssrRenderList(vendor.value.images, (image, index) => {
        _push(`<button class="${ssrRenderClass([currentImage.value === image ? "ring-2 ring-blue-500 scale-105 bg-white/80" : "hover:scale-105", "backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-0 overflow-hidden flex-shrink-0 w-24 h-24 transition-all duration-300 hover:bg-white/80"])}" data-v-95c2714c><img${ssrRenderAttr("src", image)}${ssrRenderAttr("alt", `${vendor.value.name} ${index + 1}`)} class="w-full h-full object-cover" data-v-95c2714c></button>`);
      });
      _push(`<!--]--></div></div></template><template><div class="space-y-8" data-v-95c2714c><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg" data-v-95c2714c><div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4" data-v-95c2714c><div class="flex-1 mb-4 lg:mb-0" data-v-95c2714c><h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-v-95c2714c>${ssrInterpolate(vendor.value.name)}</h1><p class="text-lg text-gray-600 mb-3" data-v-95c2714c>${ssrInterpolate(vendor.value.description)}</p><div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-500" data-v-95c2714c><div class="flex items-center" data-v-95c2714c><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-95c2714c></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-95c2714c></path></svg> ${ssrInterpolate(vendor.value.location)}</div><div class="flex items-center" data-v-95c2714c><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-95c2714c></path></svg> ${ssrInterpolate(vendor.value.responseTime)}</div></div></div><div class="text-left lg:text-right" data-v-95c2714c><div class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2" data-v-95c2714c> R ${ssrInterpolate(vendor.value.price.toLocaleString())}</div><div class="flex items-center lg:justify-end mb-2" data-v-95c2714c><svg class="w-5 h-5 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-95c2714c><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-95c2714c></path></svg><span class="text-lg font-medium text-gray-700" data-v-95c2714c>${ssrInterpolate(vendor.value.rating)}</span><span class="text-sm text-gray-500 ml-1" data-v-95c2714c>(${ssrInterpolate(vendor.value.reviews)} reviews)</span></div><span class="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full" data-v-95c2714c> Available Today </span></div></div></div><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg" data-v-95c2714c><h3 class="text-xl font-semibold text-gray-900 mb-6" data-v-95c2714c>Services Offered</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-95c2714c><!--[-->`);
      ssrRenderList(vendor.value.services, (service) => {
        var _a;
        _push(`<div class="${ssrRenderClass([((_a = selectedService.value) == null ? void 0 : _a.id) === service.id ? "ring-2 ring-blue-500 bg-white/80" : "", "backdrop-blur-sm bg-white/60 border border-white/30 rounded-xl p-4 cursor-pointer group hover:bg-white/80 hover:shadow-md transition-all duration-300"])}" data-v-95c2714c><div class="flex justify-between items-start mb-2" data-v-95c2714c><h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors" data-v-95c2714c>${ssrInterpolate(service.name)}</h4><span class="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-95c2714c> R ${ssrInterpolate(service.price.toLocaleString())}</span></div><p class="text-sm text-gray-600 mb-2" data-v-95c2714c>${ssrInterpolate(service.description)}</p><div class="flex items-center text-xs text-gray-500" data-v-95c2714c><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-95c2714c></path></svg> ${ssrInterpolate(service.duration)}</div></div>`);
      });
      _push(`<!--]--></div></div><div class="backdrop-blur-xl bg-white/70 border border-white/20 rounded-2xl p-6 shadow-lg" data-v-95c2714c><h3 class="text-xl font-semibold text-gray-900 mb-6" data-v-95c2714c>Book Now</h3><div class="space-y-4" data-v-95c2714c><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-95c2714c><div data-v-95c2714c><label class="block text-sm font-medium text-gray-700 mb-2" data-v-95c2714c>Select Date</label><input type="date"${ssrRenderAttr("value", selectedDate.value)} class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900" data-v-95c2714c></div><div data-v-95c2714c><label class="block text-sm font-medium text-gray-700 mb-2" data-v-95c2714c>Select Time</label><select class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900" data-v-95c2714c><option value="" data-v-95c2714c${ssrIncludeBooleanAttr(Array.isArray(selectedTime.value) ? ssrLooseContain(selectedTime.value, "") : ssrLooseEqual(selectedTime.value, "")) ? " selected" : ""}>Choose time</option><!--[-->`);
      ssrRenderList(availableTimes.value, (time) => {
        _push(`<option${ssrRenderAttr("value", time)} data-v-95c2714c${ssrIncludeBooleanAttr(Array.isArray(selectedTime.value) ? ssrLooseContain(selectedTime.value, time) : ssrLooseEqual(selectedTime.value, time)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
      });
      _push(`<!--]--></select></div></div><div data-v-95c2714c><label class="block text-sm font-medium text-gray-700 mb-2" data-v-95c2714c>Special Requests</label><textarea rows="3" placeholder="Any special requests or notes..." class="backdrop-blur-sm bg-white/50 border border-white/30 w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 text-gray-900 placeholder-gray-500" data-v-95c2714c>${ssrInterpolate(specialRequests.value)}</textarea></div><div class="flex flex-col sm:flex-row gap-4" data-v-95c2714c><button class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0" data-v-95c2714c> Book Service - R ${ssrInterpolate(selectedServicePrice.value.toLocaleString())}</button><button class="backdrop-blur-sm bg-white/20 border border-white/30 px-6 py-3 rounded-xl font-medium text-gray-700 hover:bg-white/30 hover:shadow-lg transition-all duration-300" data-v-95c2714c> Message </button></div></div></div></div></template></div></div></section><section class="py-16 px-4 sm:px-6 lg:px-8" data-v-95c2714c><div class="max-w-7xl mx-auto" data-v-95c2714c><template><div class="glass-card" data-v-95c2714c><div class="flex items-center justify-between mb-8" data-v-95c2714c><h2 class="text-2xl font-bold text-gray-900" data-v-95c2714c>Customer Reviews</h2><button class="glass-button px-4 py-2 rounded-xl font-medium text-gray-700 hover:shadow-lg transition-all duration-300" data-v-95c2714c> Write a Review </button></div><div class="space-y-6" data-v-95c2714c><!--[-->`);
      ssrRenderList(vendor.value.customerReviews, (review) => {
        _push(`<div class="glass-card-hover p-6 transition-all duration-300" data-v-95c2714c><div class="flex items-start space-x-4" data-v-95c2714c><img${ssrRenderAttr("src", review.avatar)}${ssrRenderAttr("alt", review.name)} class="w-12 h-12 rounded-full object-cover" data-v-95c2714c><div class="flex-1" data-v-95c2714c><div class="flex items-center justify-between mb-2" data-v-95c2714c><div data-v-95c2714c><h4 class="font-medium text-gray-900" data-v-95c2714c>${ssrInterpolate(review.name)}</h4><div class="flex items-center mt-1" data-v-95c2714c><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<svg class="${ssrRenderClass([i <= review.rating ? "text-yellow-400" : "text-gray-300", "w-4 h-4"])}" fill="currentColor" viewBox="0 0 20 20" data-v-95c2714c><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-95c2714c></path></svg>`);
        });
        _push(`<!--]--></div></div><span class="text-sm text-gray-500" data-v-95c2714c>${ssrInterpolate(review.date)}</span></div><p class="text-gray-700" data-v-95c2714c>${ssrInterpolate(review.comment)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></template></div></section><section class="py-16 px-4 sm:px-6 lg:px-8" data-v-95c2714c><div class="max-w-7xl mx-auto" data-v-95c2714c><template><div class="flex items-center justify-between mb-8" data-v-95c2714c><h2 class="text-2xl font-bold text-gray-900" data-v-95c2714c> Similar Services in <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-95c2714c>${ssrInterpolate(vendor.value.location.split(",")[1])}</span></h2></div></template><div class="overflow-x-auto scrollbar-hide" data-v-95c2714c><div class="flex space-x-6 pb-4" style="${ssrRenderStyle({ "width": "max-content" })}" data-v-95c2714c><!--[-->`);
      ssrRenderList(similarServices.value, (similar, index) => {
        _push(`<div style="${ssrRenderStyle({ "--delay": index * 0.1 + "s" })}" class="glass-card-hover group cursor-pointer flex-shrink-0 w-80" data-v-95c2714c><div class="relative overflow-hidden rounded-2xl" data-v-95c2714c><img${ssrRenderAttr("src", similar.image)}${ssrRenderAttr("alt", similar.name)} class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" data-v-95c2714c><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-95c2714c></div><button class="absolute top-4 right-4 glass-button p-2 rounded-full hover:scale-110 transition-all duration-300" data-v-95c2714c><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-95c2714c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-95c2714c></path></svg></button></div><div class="p-6" data-v-95c2714c><div class="flex items-center justify-between mb-3" data-v-95c2714c><span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-95c2714c> R ${ssrInterpolate(similar.price.toLocaleString())}</span></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-95c2714c>${ssrInterpolate(similar.name)}</h3><p class="text-sm text-gray-600 mb-3" data-v-95c2714c>${ssrInterpolate(similar.category)}</p><div class="flex items-center justify-between" data-v-95c2714c><div class="flex items-center" data-v-95c2714c><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-95c2714c><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-v-95c2714c></path></svg><span class="text-sm font-medium text-gray-700" data-v-95c2714c>${ssrInterpolate(similar.rating)}</span></div><span class="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded-full" data-v-95c2714c> Available </span></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></section></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vendor/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-95c2714c"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-LRs6doRI.mjs.map
