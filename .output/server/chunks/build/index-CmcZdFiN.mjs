import { _ as __nuxt_component_0 } from './nuxt-layout-C7uhEWd0.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-xZuWyqv4.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useRole } from './useRole-BcbisXkr.mjs';
import { u as useServices } from './useServices-BTHHH3wN.mjs';
import { u as useHead } from './v3-2ml_FOLh.mjs';
import './server.mjs';
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
import './useAuth-DCe-ZuTK.mjs';
import './cookie-DrsL3lQs.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentRole } = useRole();
    const { deleteService, categories, loading } = useServices();
    const filters = ref({
      category: "",
      priceRange: "",
      distance: "",
      rating: ""
    });
    const services = ref([
      {
        id: "1",
        title: "Professional Hair Styling",
        description: "Expert hair styling and treatment services",
        category: "Beauty & Wellness",
        price: 150,
        priceType: "session",
        rating: 4.8,
        reviewCount: 124,
        distance: 2.3,
        image: "/placeholder-service.jpg"
      },
      {
        id: "2",
        title: "Home Cleaning Service",
        description: "Deep cleaning and maintenance for your home",
        category: "Home Services",
        price: 80,
        priceType: "hour",
        rating: 4.9,
        reviewCount: 89,
        distance: 1.5,
        image: "/placeholder-service.jpg"
      }
    ]);
    const myServices = ref([
      {
        id: "1",
        title: "Professional Hair Styling",
        description: "Expert hair styling and treatment services for all hair types",
        category: "Beauty & Wellness",
        price: 150,
        priceType: "session",
        status: "active",
        bookingCount: 45,
        image: "/placeholder-service.jpg"
      },
      {
        id: "2",
        title: "Hair Color & Highlights",
        description: "Professional hair coloring with premium products",
        category: "Beauty & Wellness",
        price: 250,
        priceType: "session",
        status: "active",
        bookingCount: 32,
        image: "/placeholder-service.jpg"
      }
    ]);
    const activeServices = computed(() => myServices.value.filter((s) => s.status === "active").length);
    const averageRating = computed(() => "4.8");
    const totalBookings = computed(() => myServices.value.reduce((sum, service) => sum + (service.bookingCount || 0), 0));
    const deleteServiceHandler = async (serviceId) => {
      if (confirm("Are you sure you want to delete this service?")) {
        try {
          await deleteService(serviceId);
          myServices.value = myServices.value.filter((s) => s.id !== serviceId);
        } catch (error) {
          console.error("Failed to delete service:", error);
        }
      }
    };
    useHead({
      title: computed(() => currentRole.value === "customer" ? "Find Services - ORDO" : "My Services - ORDO")
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (unref(currentRole) === "customer") {
              _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>Find Services</h2><p class="text-gray-600"${_scopeId}>Discover services near you</p></div><div class="flex items-center space-x-4"${_scopeId}><button class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path></svg> Map View </button></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Category</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, "") : ssrLooseEqual(filters.value.category, "")) ? " selected" : ""}${_scopeId}>All Categories</option><!--[-->`);
              ssrRenderList(unref(categories), (category) => {
                _push2(`<option${ssrRenderAttr("value", category.slug)}${ssrIncludeBooleanAttr(Array.isArray(filters.value.category) ? ssrLooseContain(filters.value.category, category.slug) : ssrLooseEqual(filters.value.category, category.slug)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
              });
              _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Price Range</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.priceRange) ? ssrLooseContain(filters.value.priceRange, "") : ssrLooseEqual(filters.value.priceRange, "")) ? " selected" : ""}${_scopeId}>Any Price</option><option value="0-50"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priceRange) ? ssrLooseContain(filters.value.priceRange, "0-50") : ssrLooseEqual(filters.value.priceRange, "0-50")) ? " selected" : ""}${_scopeId}>R0 - R50</option><option value="50-100"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priceRange) ? ssrLooseContain(filters.value.priceRange, "50-100") : ssrLooseEqual(filters.value.priceRange, "50-100")) ? " selected" : ""}${_scopeId}>R50 - R100</option><option value="100-200"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priceRange) ? ssrLooseContain(filters.value.priceRange, "100-200") : ssrLooseEqual(filters.value.priceRange, "100-200")) ? " selected" : ""}${_scopeId}>R100 - R200</option><option value="200+"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priceRange) ? ssrLooseContain(filters.value.priceRange, "200+") : ssrLooseEqual(filters.value.priceRange, "200+")) ? " selected" : ""}${_scopeId}>R200+</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Distance</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.distance) ? ssrLooseContain(filters.value.distance, "") : ssrLooseEqual(filters.value.distance, "")) ? " selected" : ""}${_scopeId}>Any Distance</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(filters.value.distance) ? ssrLooseContain(filters.value.distance, "5") : ssrLooseEqual(filters.value.distance, "5")) ? " selected" : ""}${_scopeId}>Within 5km</option><option value="10"${ssrIncludeBooleanAttr(Array.isArray(filters.value.distance) ? ssrLooseContain(filters.value.distance, "10") : ssrLooseEqual(filters.value.distance, "10")) ? " selected" : ""}${_scopeId}>Within 10km</option><option value="25"${ssrIncludeBooleanAttr(Array.isArray(filters.value.distance) ? ssrLooseContain(filters.value.distance, "25") : ssrLooseEqual(filters.value.distance, "25")) ? " selected" : ""}${_scopeId}>Within 25km</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Rating</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.rating) ? ssrLooseContain(filters.value.rating, "") : ssrLooseEqual(filters.value.rating, "")) ? " selected" : ""}${_scopeId}>Any Rating</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(filters.value.rating) ? ssrLooseContain(filters.value.rating, "4") : ssrLooseEqual(filters.value.rating, "4")) ? " selected" : ""}${_scopeId}>4+ Stars</option><option value="4.5"${ssrIncludeBooleanAttr(Array.isArray(filters.value.rating) ? ssrLooseContain(filters.value.rating, "4.5") : ssrLooseEqual(filters.value.rating, "4.5")) ? " selected" : ""}${_scopeId}>4.5+ Stars</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(filters.value.rating) ? ssrLooseContain(filters.value.rating, "5") : ssrLooseEqual(filters.value.rating, "5")) ? " selected" : ""}${_scopeId}>5 Stars</option></select></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(services.value, (service) => {
                _push2(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"${_scopeId}><div class="aspect-w-16 aspect-h-9"${_scopeId}><img${ssrRenderAttr("src", service.image || "/placeholder-service.jpg")}${ssrRenderAttr("alt", service.title)} class="w-full h-48 object-cover"${_scopeId}></div><div class="p-4"${_scopeId}><div class="flex items-start justify-between mb-2"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(service.title)}</h3><button class="text-gray-400 hover:text-red-500"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg></button></div><p class="text-gray-600 text-sm mb-3"${_scopeId}>${ssrInterpolate(service.description)}</p><div class="flex items-center mb-3"${_scopeId}><div class="flex items-center"${_scopeId}><span class="text-yellow-400"${_scopeId}>\u2605</span><span class="text-sm text-gray-600 ml-1"${_scopeId}>${ssrInterpolate(service.rating)} (${ssrInterpolate(service.reviewCount)})</span></div><span class="text-gray-400 mx-2"${_scopeId}>\u2022</span><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(service.distance)}km away</span></div><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><span class="text-lg font-bold text-gray-900"${_scopeId}>R${ssrInterpolate(service.price)}</span><span class="text-sm text-gray-600"${_scopeId}>/${ssrInterpolate(service.priceType)}</span></div><button class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"${_scopeId}> Book Now </button></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-gray-900"${_scopeId}>My Services</h2><p class="text-gray-600"${_scopeId}>Manage your service offerings</p></div>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/dashboard/services/create",
                class: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Add Service `);
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
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Add Service ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"${_scopeId}><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Services</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(myServices.value.length)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Active Services</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(activeServices.value)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Avg Rating</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(averageRating.value)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Bookings</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(totalBookings.value)}</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="px-6 py-4 border-b border-gray-200"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Your Services</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Service</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Price</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Bookings</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(myServices.value, (service) => {
                _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="flex items-center"${_scopeId}><img class="h-10 w-10 rounded-lg object-cover"${ssrRenderAttr("src", service.image || "/placeholder-service.jpg")}${ssrRenderAttr("alt", service.title)}${_scopeId}><div class="ml-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(service.title)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(service.description.substring(0, 50))}...</div></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(service.category)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>R${ssrInterpolate(service.price)}/${ssrInterpolate(service.priceType)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([service.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(service.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(service.bookingCount || 0)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/dashboard/services/${service.id}/edit`,
                  class: "text-blue-600 hover:text-blue-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Edit`);
                    } else {
                      return [
                        createTextVNode("Edit")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="text-red-600 hover:text-red-900"${_scopeId}>Delete</button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                unref(currentRole) === "customer" ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, "Find Services"),
                      createVNode("p", { class: "text-gray-600" }, "Discover services near you")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("button", { class: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" }, [
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
                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          })
                        ])),
                        createTextVNode(" Map View ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Category"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.category = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",
                          disabled: unref(loading)
                        }, [
                          createVNode("option", { value: "" }, "All Categories"),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.slug
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, filters.value.category]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Price Range"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.priceRange = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "Any Price"),
                          createVNode("option", { value: "0-50" }, "R0 - R50"),
                          createVNode("option", { value: "50-100" }, "R50 - R100"),
                          createVNode("option", { value: "100-200" }, "R100 - R200"),
                          createVNode("option", { value: "200+" }, "R200+")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.priceRange]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Distance"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.distance = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "Any Distance"),
                          createVNode("option", { value: "5" }, "Within 5km"),
                          createVNode("option", { value: "10" }, "Within 10km"),
                          createVNode("option", { value: "25" }, "Within 25km")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.distance]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Rating"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.rating = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "Any Rating"),
                          createVNode("option", { value: "4" }, "4+ Stars"),
                          createVNode("option", { value: "4.5" }, "4.5+ Stars"),
                          createVNode("option", { value: "5" }, "5 Stars")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.rating]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                      return openBlock(), createBlock("div", {
                        key: service.id,
                        class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                      }, [
                        createVNode("div", { class: "aspect-w-16 aspect-h-9" }, [
                          createVNode("img", {
                            src: service.image || "/placeholder-service.jpg",
                            alt: service.title,
                            class: "w-full h-48 object-cover"
                          }, null, 8, ["src", "alt"])
                        ]),
                        createVNode("div", { class: "p-4" }, [
                          createVNode("div", { class: "flex items-start justify-between mb-2" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(service.title), 1),
                            createVNode("button", { class: "text-gray-400 hover:text-red-500" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                })
                              ]))
                            ])
                          ]),
                          createVNode("p", { class: "text-gray-600 text-sm mb-3" }, toDisplayString(service.description), 1),
                          createVNode("div", { class: "flex items-center mb-3" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", { class: "text-yellow-400" }, "\u2605"),
                              createVNode("span", { class: "text-sm text-gray-600 ml-1" }, toDisplayString(service.rating) + " (" + toDisplayString(service.reviewCount) + ")", 1)
                            ]),
                            createVNode("span", { class: "text-gray-400 mx-2" }, "\u2022"),
                            createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(service.distance) + "km away", 1)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode("span", { class: "text-lg font-bold text-gray-900" }, "R" + toDisplayString(service.price), 1),
                              createVNode("span", { class: "text-sm text-gray-600" }, "/" + toDisplayString(service.priceType), 1)
                            ]),
                            createVNode("button", { class: "px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700" }, " Book Now ")
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, "My Services"),
                      createVNode("p", { class: "text-gray-600" }, "Manage your service offerings")
                    ]),
                    createVNode(_component_NuxtLink, {
                      to: "/dashboard/services/create",
                      class: "flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    }, {
                      default: withCtx(() => [
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
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ])),
                        createTextVNode(" Add Service ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-blue-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Services"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(myServices.value.length), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-green-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Active Services"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(activeServices.value), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-yellow-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Avg Rating"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(averageRating.value), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-purple-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Bookings"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(totalBookings.value), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Your Services")
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Service"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Category"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Price"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Bookings"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(myServices.value, (service) => {
                            return openBlock(), createBlock("tr", {
                              key: service.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("img", {
                                    class: "h-10 w-10 rounded-lg object-cover",
                                    src: service.image || "/placeholder-service.jpg",
                                    alt: service.title
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("div", { class: "ml-4" }, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(service.title), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(service.description.substring(0, 50)) + "...", 1)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(service.category), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, "R" + toDisplayString(service.price) + "/" + toDisplayString(service.priceType), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: [service.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                }, toDisplayString(service.status), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(service.bookingCount || 0), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                createVNode("div", { class: "flex items-center space-x-2" }, [
                                  createVNode(_component_NuxtLink, {
                                    to: `/dashboard/services/${service.id}/edit`,
                                    class: "text-blue-600 hover:text-blue-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Edit")
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  createVNode("button", {
                                    onClick: ($event) => deleteServiceHandler(service.id),
                                    class: "text-red-600 hover:text-red-900"
                                  }, "Delete", 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/services/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CmcZdFiN.mjs.map
