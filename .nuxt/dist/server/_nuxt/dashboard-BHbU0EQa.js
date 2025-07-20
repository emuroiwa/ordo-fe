import { _ as __nuxt_component_0 } from "./nuxt-link-xZuWyqv4.js";
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, ref, computed, createBlock, openBlock, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { u as useNotifications } from "./useNotifications-DV1THCSo.js";
import { n as navigateTo, u as useRoute } from "../server.mjs";
import { u as useAuth } from "./useAuth-DCe-ZuTK.js";
import { u as useRole } from "./useRole-BcbisXkr.js";
import { u as useProfile } from "./useProfile-Dggd4Bu-.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ufo/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/unctx/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/radix3/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "./cookie-DrsL3lQs.js";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NotificationDropdown",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      notifications,
      unreadCount,
      isLoading,
      isDropdownOpen,
      hasUnreadNotifications,
      markAsRead,
      markAsUnread,
      deleteNotification,
      closeDropdown
    } = useNotifications();
    const handleNotificationClick = async (notification) => {
      var _a;
      if (!notification.read_at) {
        await markAsRead(notification.id);
      }
      const actionUrl = (_a = notification.metadata) == null ? void 0 : _a.action_url;
      if (actionUrl) {
        closeDropdown();
        await navigateTo(actionUrl);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NotificationItem = resolveComponent("NotificationItem");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><button class="${ssrRenderClass([{ "text-blue-600": unref(hasUnreadNotifications) }, "relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"])}"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"></path></svg>`);
      if (unref(unreadCount) > 0) {
        _push(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">${ssrInterpolate(unref(unreadCount) > 99 ? "99+" : unref(unreadCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (unref(isDropdownOpen)) {
        _push(`<div class="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50"><div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Notifications</h3><div class="flex items-center space-x-2">`);
        if (unref(hasUnreadNotifications)) {
          _push(`<button class="text-sm text-blue-600 hover:text-blue-800 transition-colors"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}> Mark all read </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/notifications",
          onClick: unref(closeDropdown),
          class: "text-sm text-gray-600 hover:text-gray-800 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View all `);
            } else {
              return [
                createTextVNode(" View all ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="max-h-96 overflow-y-auto">`);
        if (unref(isLoading)) {
          _push(`<div class="p-4 text-center"><div class="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div><p class="text-sm text-gray-500 mt-2">Loading notifications...</p></div>`);
        } else if (unref(notifications).length === 0) {
          _push(`<div class="p-8 text-center"><svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"></path></svg><p class="text-sm text-gray-500">No notifications yet</p></div>`);
        } else {
          _push(`<div><!--[-->`);
          ssrRenderList(unref(notifications), (notification) => {
            _push(ssrRenderComponent(_component_NotificationItem, {
              key: notification.id,
              notification,
              onClick: handleNotificationClick,
              onMarkRead: unref(markAsRead),
              onMarkUnread: unref(markAsUnread),
              onDelete: unref(deleteNotification),
              class: "border-b border-gray-100 last:border-b-0"
            }, null, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
        if (unref(notifications).length > 0) {
          _push(`<div class="p-3 border-t border-gray-200 bg-gray-50">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/dashboard/notifications",
            onClick: unref(closeDropdown),
            class: "block w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` View all ${ssrInterpolate(unref(unreadCount) > 0 ? `${unref(unreadCount)} ` : "")}notifications `);
              } else {
                return [
                  createTextVNode(" View all " + toDisplayString(unref(unreadCount) > 0 ? `${unref(unreadCount)} ` : "") + "notifications ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isDropdownOpen)) {
        _push(`<div class="fixed inset-0 z-40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notifications/NotificationDropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const route = useRoute();
    const { currentRole, hasMultipleRoles } = useRole();
    const {
      user: profileUser,
      profileCompletion,
      displayName,
      userInitials
    } = useProfile();
    const showProfileMenu = ref(false);
    const pageTitle = computed(() => {
      var _a;
      const path = route.path;
      if (path === "/dashboard") return `Good Morning, ${((_a = user.value) == null ? void 0 : _a.name) || "User"}!`;
      if (path === "/dashboard/notifications") return "Notifications";
      if (path === "/dashboard/services") return "Services";
      if (path === "/dashboard/bookings") return "Bookings";
      if (path === "/dashboard/calendar") return "Calendar";
      if (path === "/dashboard/analytics") return "Analytics";
      if (path === "/dashboard/payments") return "Payments";
      if (path === "/dashboard/profile") return "Profile Settings";
      return "Dashboard";
    });
    const pageSubtitle = computed(() => {
      const path = route.path;
      if (path === "/dashboard") return `Here's what's happening with your ${currentRole.value === "vendor" ? "business" : "bookings"} today.`;
      if (path === "/dashboard/bookings") return currentRole.value === "vendor" ? "Manage your service appointments and customer bookings" : "Track your booked services and appointments";
      if (path === "/dashboard/notifications") return "Manage your notifications and stay updated";
      if (path === "/dashboard/profile") return "Manage your account settings and preferences";
      return "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NotificationsNotificationDropdown = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex" }, _attrs))}><div class="w-64 bg-white shadow-lg border-r border-gray-200 fixed inset-y-0 left-0 z-50"><div class="flex items-center h-16 px-6 border-b border-gray-200"><div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3"><svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"></path></svg></div><span class="text-xl font-bold text-gray-900">ORDO</span></div>`);
      if (unref(hasMultipleRoles)) {
        _push(`<div class="px-6 py-4 border-b border-gray-200"><div class="flex items-center space-x-2"><button class="${ssrRenderClass([unref(currentRole) === "customer" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600", "flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"])}"> Customer </button><button class="${ssrRenderClass([unref(currentRole) === "vendor" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-600", "flex-1 px-3 py-2 rounded-md text-sm font-medium text-center"])}"> Provider </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="mt-6 px-3"><div class="space-y-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        "exact-active-class": "bg-blue-50 text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="${ssrRenderClass([_ctx.$route.path === "/dashboard" ? "text-blue-500" : "", "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"${_scopeId}></path></svg> Dashboard `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: ["text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5", _ctx.$route.path === "/dashboard" ? "text-blue-500" : ""],
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                })
              ], 2)),
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(currentRole) === "customer") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/search",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg> Find Services `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                createTextVNode(" Find Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/bookings",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg> My Bookings `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" My Bookings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/favorites",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"${_scopeId}></path></svg> Favorites `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" Favorites ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/reviews",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"${_scopeId}></path></svg> My Reviews `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" My Reviews ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/services",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"${_scopeId}></path></svg> My Services `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" My Services ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/bookings",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"${_scopeId}></path></svg> Appointments `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" Appointments ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/calendar",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"${_scopeId}></path></svg> Calendar `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                createTextVNode(" Calendar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/analytics",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg> Analytics `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                createTextVNode(" Analytics ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/earnings",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg> Earnings `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                createTextVNode(" Earnings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/reviews",
          class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
          "active-class": "bg-blue-50 text-blue-600"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"${_scopeId}></path></svg> Customer Reviews `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
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
                ])),
                createTextVNode(" Customer Reviews ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/payments",
        class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        "active-class": "bg-blue-50 text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"${_scopeId}></path></svg> ${ssrInterpolate(unref(currentRole) === "customer" ? "Payment History" : "Payments")}`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                })
              ])),
              createTextVNode(" " + toDisplayString(unref(currentRole) === "customer" ? "Payment History" : "Payments"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/notifications",
        class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        "active-class": "bg-blue-50 text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"${_scopeId}></path></svg> Notifications `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"
                })
              ])),
              createTextVNode(" Notifications ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/profile",
        class: "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md",
        "active-class": "bg-blue-50 text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Profile Settings `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "text-gray-400 group-hover:text-gray-500 mr-3 h-5 w-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                })
              ])),
              createTextVNode(" Profile Settings ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav><div class="absolute bottom-0 w-full px-6 py-4 border-t border-gray-200"><button class="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 hover:border-red-300" title="Logout"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout </button></div></div><div class="flex-1 ml-64"><header class="bg-white shadow-sm border-b border-gray-200"><div class="px-6 py-4"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">${ssrInterpolate(pageTitle.value)}</h1><p class="text-gray-600">${ssrInterpolate(pageSubtitle.value)}</p></div><div class="flex items-center space-x-4"><div class="relative"><svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><input type="text" placeholder="Search services, providers..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"></div>`);
      _push(ssrRenderComponent(_component_NotificationsNotificationDropdown, null, null, _parent));
      _push(`<div class="relative" data-dropdown><button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors" title="User profile"><div class="relative"><div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">`);
      if (((_a = unref(profileUser)) == null ? void 0 : _a.avatar_url) || ((_b = unref(user)) == null ? void 0 : _b.avatar)) {
        _push(`<img${ssrRenderAttr("src", ((_c = unref(profileUser)) == null ? void 0 : _c.avatar_url) || ((_d = unref(user)) == null ? void 0 : _d.avatar) || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face")}${ssrRenderAttr("alt", ((_e = unref(profileUser)) == null ? void 0 : _e.name) || ((_f = unref(user)) == null ? void 0 : _f.name) || "User")} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">${ssrInterpolate(unref(userInitials) || (((_g = unref(user)) == null ? void 0 : _g.name) ? unref(user).name.charAt(0).toUpperCase() : "U"))}</div>`);
      }
      _push(`</div>`);
      if (unref(profileUser) && unref(profileCompletion) < 100) {
        _push(`<div class="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-orange-400 border border-white rounded-full"${ssrRenderAttr("title", `Profile ${unref(profileCompletion)}% complete`)}></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="hidden sm:block text-left"><div class="text-sm font-medium text-gray-900">${ssrInterpolate(unref(displayName) || ((_h = unref(user)) == null ? void 0 : _h.name) || "User")}</div><div class="text-xs text-gray-500">${ssrInterpolate(unref(currentRole) === "vendor" ? "Service Provider" : "Customer")}</div></div><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (showProfileMenu.value) {
        _push(`<div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/profile",
          class: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
          onClick: ($event) => showProfileMenu.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center"${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> Profile Settings </div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center" }, [
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
                      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    })
                  ])),
                  createTextVNode(" Profile Settings ")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<hr class="my-1"><button class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"><div class="flex items-center"><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Logout </div></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></header><main class="p-6">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dashboard-BHbU0EQa.js.map
