import { _ as __nuxt_component_0 } from './nuxt-layout-C4LaSk2R.mjs';
import { ref, mergeProps, withCtx, unref, createVNode, createBlock, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useRole } from './useRole-BsLvWiWD.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentRole } = useRole();
    const customerStats = ref({
      totalBookings: 24,
      favorites: 8,
      totalSpent: 15750,
      reviewsGiven: 18
    });
    const vendorStats = ref({
      totalBookings: 678,
      revenue: 89500,
      rating: 4.8,
      activeServices: 12
    });
    const recentActivities = ref([
      {
        id: 1,
        title: "New booking confirmed for Hair Styling",
        time: "2 hours ago",
        iconColor: "bg-green-500"
      },
      {
        id: 2,
        title: "Monthly payment processed",
        time: "4 hours ago",
        iconColor: "bg-blue-500"
      },
      {
        id: 3,
        title: "New service added: Beard Trim",
        time: "6 hours ago",
        iconColor: "bg-purple-500"
      },
      {
        id: 4,
        title: "Customer review received (5 stars)",
        time: "1 day ago",
        iconColor: "bg-yellow-500"
      }
    ]);
    useHead({
      title: "Dashboard - ORDO"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (unref(currentRole) === "customer") {
              _push2(`<div${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Bookings</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(customerStats.value.totalBookings)}</p><p class="text-sm text-green-600"${_scopeId}>+12% vs last month</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Favorite Services</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(customerStats.value.favorites)}</p><p class="text-sm text-blue-600"${_scopeId}>+3 new this week</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Spent</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>R${ssrInterpolate(customerStats.value.totalSpent.toLocaleString())}</p><p class="text-sm text-purple-600"${_scopeId}>+R2,500 this month</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Reviews Given</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(customerStats.value.reviewsGiven)}</p><p class="text-sm text-yellow-600"${_scopeId}>4.8 avg rating</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"${_scopeId}><div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Quick Actions</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"${_scopeId}><svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>Find Services</p><p class="text-sm text-gray-500"${_scopeId}>Browse available services</p></button><button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"${_scopeId}><svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>Map Search</p><p class="text-sm text-gray-500"${_scopeId}>Find services nearby</p></button><button class="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"${_scopeId}><svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>My Bookings</p><p class="text-sm text-gray-500"${_scopeId}>View appointments</p></button></div></div></div></div>`);
            } else {
              _push2(`<div${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"${_scopeId}><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Bookings</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(vendorStats.value.totalBookings)}</p><p class="text-sm text-green-600"${_scopeId}>+14% vs last month</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Revenue</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>R${ssrInterpolate(vendorStats.value.revenue.toLocaleString())}</p><p class="text-sm text-green-600"${_scopeId}>+25% completion rate</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Rating</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(vendorStats.value.rating)}</p><p class="text-sm text-yellow-600"${_scopeId}>+18 new this week</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Active Services</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(vendorStats.value.activeServices)}</p><p class="text-sm text-purple-600"${_scopeId}>2 pending approval</p></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"${_scopeId}><div class="bg-white rounded-lg shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Business Overview</h2><button class="text-blue-600 hover:text-blue-800 text-sm"${_scopeId}>View Details</button></div><div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center"${_scopeId}><div class="text-center"${_scopeId}><svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg><p class="text-gray-500"${_scopeId}>Chart Visualization</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Recent Activity</h2><button class="text-blue-600 hover:text-blue-800 text-sm"${_scopeId}>View All</button></div><div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(recentActivities.value, (activity) => {
                _push2(`<div class="flex items-center space-x-3"${_scopeId}><div class="${ssrRenderClass([activity.iconColor, "w-8 h-8 rounded-full flex items-center justify-center"])}"${_scopeId}><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div><div class="flex-1"${_scopeId}><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(activity.title)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(activity.time)}</p></div></div>`);
              });
              _push2(`<!--]--></div></div></div></div><div class="bg-white rounded-lg shadow-sm"${_scopeId}><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}>Service Management</h2><button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"${_scopeId}> Add Service </button></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><button class="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"${_scopeId}><svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>Create Listing</p><p class="text-sm text-gray-500"${_scopeId}>Add new service</p></button><button class="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"${_scopeId}><svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>Set Availability</p><p class="text-sm text-gray-500"${_scopeId}>Manage calendar</p></button><button class="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"${_scopeId}><svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>Define Pricing</p><p class="text-sm text-gray-500"${_scopeId}>Set rates &amp; packages</p></button><button class="p-4 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"${_scopeId}><svg class="w-8 h-8 text-orange-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg><p class="font-medium text-gray-900"${_scopeId}>View Analytics</p><p class="text-sm text-gray-500"${_scopeId}>Performance metrics</p></button></div></div></div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                unref(currentRole) === "customer" ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-blue-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Bookings"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(customerStats.value.totalBookings), 1),
                          createVNode("p", { class: "text-sm text-green-600" }, "+12% vs last month")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-green-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Favorite Services"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(customerStats.value.favorites), 1),
                          createVNode("p", { class: "text-sm text-blue-600" }, "+3 new this week")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-purple-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Spent"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, "R" + toDisplayString(customerStats.value.totalSpent.toLocaleString()), 1),
                          createVNode("p", { class: "text-sm text-purple-600" }, "+R2,500 this month")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-yellow-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Reviews Given"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(customerStats.value.reviewsGiven), 1),
                          createVNode("p", { class: "text-sm text-yellow-600" }, "4.8 avg rating")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 mb-8" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("h2", { class: "text-lg font-medium text-gray-900 mb-4" }, "Quick Actions"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("button", { class: "p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-blue-600 mx-auto mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            })
                          ])),
                          createVNode("p", { class: "font-medium text-gray-900" }, "Find Services"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Browse available services")
                        ]),
                        createVNode("button", { class: "p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-purple-600 mx-auto mb-2",
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
                          createVNode("p", { class: "font-medium text-gray-900" }, "Map Search"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Find services nearby")
                        ]),
                        createVNode("button", { class: "p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-green-600 mx-auto mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ])),
                          createVNode("p", { class: "font-medium text-gray-900" }, "My Bookings"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "View appointments")
                        ])
                      ])
                    ])
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-blue-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Bookings"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(vendorStats.value.totalBookings), 1),
                          createVNode("p", { class: "text-sm text-green-600" }, "+14% vs last month")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-green-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Revenue"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, "R" + toDisplayString(vendorStats.value.revenue.toLocaleString()), 1),
                          createVNode("p", { class: "text-sm text-green-600" }, "+25% completion rate")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-yellow-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Rating"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(vendorStats.value.rating), 1),
                          createVNode("p", { class: "text-sm text-yellow-600" }, "+18 new this week")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-purple-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", { d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" })
                            ]))
                          ])
                        ]),
                        createVNode("div", { class: "ml-5 w-full" }, [
                          createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Active Services"),
                          createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(vendorStats.value.activeServices), 1),
                          createVNode("p", { class: "text-sm text-purple-600" }, "2 pending approval")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Business Overview"),
                          createVNode("button", { class: "text-blue-600 hover:text-blue-800 text-sm" }, "View Details")
                        ]),
                        createVNode("div", { class: "h-64 bg-gray-50 rounded-lg flex items-center justify-center" }, [
                          createVNode("div", { class: "text-center" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-16 h-16 text-gray-400 mx-auto mb-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              })
                            ])),
                            createVNode("p", { class: "text-gray-500" }, "Chart Visualization")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm" }, [
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Recent Activity"),
                          createVNode("button", { class: "text-blue-600 hover:text-blue-800 text-sm" }, "View All")
                        ]),
                        createVNode("div", { class: "space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(recentActivities.value, (activity) => {
                            return openBlock(), createBlock("div", {
                              key: activity.id,
                              class: "flex items-center space-x-3"
                            }, [
                              createVNode("div", {
                                class: [activity.iconColor, "w-8 h-8 rounded-full flex items-center justify-center"]
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-4 h-4 text-white",
                                  fill: "currentColor",
                                  viewBox: "0 0 20 20"
                                }, [
                                  createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                                ]))
                              ], 2),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(activity.title), 1),
                                createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(activity.time), 1)
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm" }, [
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h2", { class: "text-lg font-medium text-gray-900" }, "Service Management"),
                        createVNode("button", { class: "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" }, " Add Service ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("button", { class: "p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-blue-600 mx-auto mb-2",
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
                          createVNode("p", { class: "font-medium text-gray-900" }, "Create Listing"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Add new service")
                        ]),
                        createVNode("button", { class: "p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-purple-600 mx-auto mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            })
                          ])),
                          createVNode("p", { class: "font-medium text-gray-900" }, "Set Availability"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Manage calendar")
                        ]),
                        createVNode("button", { class: "p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-green-600 mx-auto mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            })
                          ])),
                          createVNode("p", { class: "font-medium text-gray-900" }, "Define Pricing"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Set rates & packages")
                        ]),
                        createVNode("button", { class: "p-4 border border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-8 h-8 text-orange-600 mx-auto mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            })
                          ])),
                          createVNode("p", { class: "font-medium text-gray-900" }, "View Analytics"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Performance metrics")
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CU_pqVUP.mjs.map
