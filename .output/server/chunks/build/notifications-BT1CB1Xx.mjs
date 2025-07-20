import { _ as __nuxt_component_0 } from './nuxt-layout-C7uhEWd0.mjs';
import { defineComponent, ref, computed, resolveComponent, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelSelect, createTextVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { n as navigateTo, a as useRuntimeConfig } from './server.mjs';
import { u as useAuth } from './useAuth-DCe-ZuTK.mjs';
import { u as useNotifications } from './useNotifications-DV1THCSo.mjs';
import { u as useHead } from './v3-2ml_FOLh.mjs';
import 'vue-router';
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
import './cookie-DrsL3lQs.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notifications",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const {
      notifications,
      unreadCount,
      isLoading,
      hasUnreadNotifications,
      readNotifications,
      fetchNotifications,
      markAsRead,
      markAsUnread,
      markAllAsRead,
      deleteNotification,
      bulkAction
    } = useNotifications();
    const selectedNotifications = ref([]);
    const meta = ref({
      current_page: 1,
      last_page: 1,
      per_page: 25,
      total: 0
    });
    const filters = ref({
      status: "",
      type: "",
      priority: "",
      perPage: 25
    });
    const allSelected = computed(() => {
      return notifications.value.length > 0 && selectedNotifications.value.length === notifications.value.length;
    });
    const handleNotificationClick = async (notification) => {
      var _a;
      if (!notification.read_at) {
        await markAsRead(notification.id);
      }
      const actionUrl = (_a = notification.metadata) == null ? void 0 : _a.action_url;
      if (actionUrl) {
        await navigateTo(actionUrl);
      }
    };
    const toggleNotificationSelection = (notificationId) => {
      const index = selectedNotifications.value.indexOf(notificationId);
      if (index > -1) {
        selectedNotifications.value.splice(index, 1);
      } else {
        selectedNotifications.value.push(notificationId);
      }
    };
    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedNotifications.value = [];
      } else {
        selectedNotifications.value = notifications.value.map((n) => n.id);
      }
    };
    const clearSelection = () => {
      selectedNotifications.value = [];
    };
    const performBulkAction = async (action) => {
      if (selectedNotifications.value.length === 0) return;
      const success = await bulkAction(action, selectedNotifications.value);
      if (success) {
        clearSelection();
      }
    };
    const applyFilters = async () => {
      const options = {
        perPage: filters.value.perPage,
        unreadOnly: filters.value.status === "unread",
        type: filters.value.type || void 0,
        priority: filters.value.priority || void 0
      };
      const response = await fetchNotifications(options);
      console.log(response);
      meta.value = response.meta || meta.value;
    };
    const goToPage = async (page) => {
      if (page < 1 || page > meta.value.last_page) return;
      const options = {
        page,
        perPage: filters.value.perPage,
        unreadOnly: filters.value.status === "unread",
        type: filters.value.type || void 0,
        priority: filters.value.priority || void 0
      };
      const response = await fetchNotifications(options);
      meta.value = response.meta || meta.value;
    };
    const createTestNotification = async () => {
      try {
        const config = useRuntimeConfig();
        const { token } = useAuth();
        await $fetch("/api/v1/notifications/test-samples", {
          method: "POST",
          baseURL: config.public.apiBase,
          headers: {
            "Authorization": `Bearer ${token.value}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        await applyFilters();
      } catch (error) {
        console.error("Failed to create test notifications:", error);
      }
    };
    useHead({
      title: "Notifications - ORDO Dashboard"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NotificationItem = resolveComponent("NotificationItem");
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "dashboard" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"${_scopeId}><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Total Notifications</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(notifications).length)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Unread</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(unreadCount))}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div></div><div class="ml-5 w-full"${_scopeId}><p class="text-sm font-medium text-gray-500"${_scopeId}>Read</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(readNotifications).length)}</p></div></div></div></div><div class="flex items-center justify-end space-x-4 mb-6"${_scopeId}>`);
            if (unref(hasUnreadNotifications)) {
              _push2(`<button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"${_scopeId}> Mark all as read </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"${_scopeId}> Test Notification </button></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6"${_scopeId}><div class="p-4 border-b border-gray-200"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Filters</h3></div><div class="p-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "") : ssrLooseEqual(filters.value.status, "")) ? " selected" : ""}${_scopeId}>All</option><option value="unread"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "unread") : ssrLooseEqual(filters.value.status, "unread")) ? " selected" : ""}${_scopeId}>Unread</option><option value="read"${ssrIncludeBooleanAttr(Array.isArray(filters.value.status) ? ssrLooseContain(filters.value.status, "read") : ssrLooseEqual(filters.value.status, "read")) ? " selected" : ""}${_scopeId}>Read</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "") : ssrLooseEqual(filters.value.type, "")) ? " selected" : ""}${_scopeId}>All Types</option><option value="welcome"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "welcome") : ssrLooseEqual(filters.value.type, "welcome")) ? " selected" : ""}${_scopeId}>Welcome</option><option value="booking_confirmed"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "booking_confirmed") : ssrLooseEqual(filters.value.type, "booking_confirmed")) ? " selected" : ""}${_scopeId}>Booking Confirmed</option><option value="booking_cancelled"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "booking_cancelled") : ssrLooseEqual(filters.value.type, "booking_cancelled")) ? " selected" : ""}${_scopeId}>Booking Cancelled</option><option value="payment_received"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "payment_received") : ssrLooseEqual(filters.value.type, "payment_received")) ? " selected" : ""}${_scopeId}>Payment Received</option><option value="payment_failed"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "payment_failed") : ssrLooseEqual(filters.value.type, "payment_failed")) ? " selected" : ""}${_scopeId}>Payment Failed</option><option value="new_review"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "new_review") : ssrLooseEqual(filters.value.type, "new_review")) ? " selected" : ""}${_scopeId}>New Review</option><option value="profile_updated"${ssrIncludeBooleanAttr(Array.isArray(filters.value.type) ? ssrLooseContain(filters.value.type, "profile_updated") : ssrLooseEqual(filters.value.type, "profile_updated")) ? " selected" : ""}${_scopeId}>Profile Updated</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Priority</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, "") : ssrLooseEqual(filters.value.priority, "")) ? " selected" : ""}${_scopeId}>All Priorities</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, "low") : ssrLooseEqual(filters.value.priority, "low")) ? " selected" : ""}${_scopeId}>Low</option><option value="normal"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, "normal") : ssrLooseEqual(filters.value.priority, "normal")) ? " selected" : ""}${_scopeId}>Normal</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, "high") : ssrLooseEqual(filters.value.priority, "high")) ? " selected" : ""}${_scopeId}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(filters.value.priority) ? ssrLooseContain(filters.value.priority, "urgent") : ssrLooseEqual(filters.value.priority, "urgent")) ? " selected" : ""}${_scopeId}>Urgent</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Per Page</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"${_scopeId}><option value="10"${ssrIncludeBooleanAttr(Array.isArray(filters.value.perPage) ? ssrLooseContain(filters.value.perPage, "10") : ssrLooseEqual(filters.value.perPage, "10")) ? " selected" : ""}${_scopeId}>10</option><option value="25"${ssrIncludeBooleanAttr(Array.isArray(filters.value.perPage) ? ssrLooseContain(filters.value.perPage, "25") : ssrLooseEqual(filters.value.perPage, "25")) ? " selected" : ""}${_scopeId}>25</option><option value="50"${ssrIncludeBooleanAttr(Array.isArray(filters.value.perPage) ? ssrLooseContain(filters.value.perPage, "50") : ssrLooseEqual(filters.value.perPage, "50")) ? " selected" : ""}${_scopeId}>50</option><option value="100"${ssrIncludeBooleanAttr(Array.isArray(filters.value.perPage) ? ssrLooseContain(filters.value.perPage, "100") : ssrLooseEqual(filters.value.perPage, "100")) ? " selected" : ""}${_scopeId}>100</option></select></div></div></div></div>`);
            if (selectedNotifications.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(selectedNotifications.value.length)} notification(s) selected </span><div class="flex items-center space-x-2"${_scopeId}><button class="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"${_scopeId}> Mark as Read </button><button class="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"${_scopeId}> Mark as Unread </button><button class="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"${_scopeId}> Delete </button><button class="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"${_scopeId}> Clear Selection </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="p-4 border-b border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>All Notifications</h3><div class="flex items-center space-x-2"${_scopeId}><label class="flex items-center"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(allSelected.value) ? " checked" : ""} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"${_scopeId}><span class="ml-2 text-sm text-gray-600"${_scopeId}>Select All</span></label></div></div></div>`);
            if (unref(isLoading)) {
              _push2(`<div class="p-8 text-center"${_scopeId}><div class="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"${_scopeId}></div><p class="text-sm text-gray-500 mt-4"${_scopeId}>Loading notifications...</p></div>`);
            } else if (unref(notifications).length === 0) {
              _push2(`<div class="p-8 text-center"${_scopeId}><svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"${_scopeId}></path></svg><p class="text-lg text-gray-500 mb-2"${_scopeId}>No notifications found</p><p class="text-sm text-gray-400"${_scopeId}>You&#39;re all caught up!</p></div>`);
            } else {
              _push2(`<div${_scopeId}>${ssrInterpolate(unref(notifications).length)} notifications found <!--[-->`);
              ssrRenderList(unref(notifications), (notification) => {
                _push2(`<div class="border-b border-gray-100 last:border-b-0"${_scopeId}><div class="flex items-start p-4 hover:bg-gray-50"${_scopeId}><div class="flex-shrink-0 mr-3 pt-1"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(selectedNotifications.value.includes(notification.id)) ? " checked" : ""} class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"${_scopeId}></div><div class="flex-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NotificationItem, {
                  notification,
                  onClick: handleNotificationClick,
                  onMarkRead: unref(markAsRead),
                  onMarkUnread: unref(markAsUnread),
                  onDelete: unref(deleteNotification),
                  class: "border-0"
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            if (meta.value.last_page > 1) {
              _push2(`<div class="p-4 border-t border-gray-200"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-600"${_scopeId}> Showing ${ssrInterpolate((meta.value.current_page - 1) * meta.value.per_page + 1)} to ${ssrInterpolate(Math.min(meta.value.current_page * meta.value.per_page, meta.value.total))} of ${ssrInterpolate(meta.value.total)} notifications </div><div class="flex items-center space-x-2"${_scopeId}><button${ssrIncludeBooleanAttr(meta.value.current_page <= 1) ? " disabled" : ""} class="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"${_scopeId}> Previous </button><span class="text-sm text-gray-600"${_scopeId}> Page ${ssrInterpolate(meta.value.current_page)} of ${ssrInterpolate(meta.value.last_page)}</span><button${ssrIncludeBooleanAttr(meta.value.current_page >= meta.value.last_page) ? " disabled" : ""} class="px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"${_scopeId}> Next </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" }, [
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
                              d: "M15 17h5l-5 5v-5zM4 12v7a2 2 0 002 2h5m0-9h4m-4-4h8m-8-4h8"
                            })
                          ]))
                        ])
                      ]),
                      createVNode("div", { class: "ml-5 w-full" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Total Notifications"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(notifications).length), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white p-6 rounded-lg shadow-sm border border-gray-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode("div", { class: "w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6 text-orange-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ]))
                        ])
                      ]),
                      createVNode("div", { class: "ml-5 w-full" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Unread"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(unreadCount)), 1)
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
                        createVNode("p", { class: "text-sm font-medium text-gray-500" }, "Read"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(unref(readNotifications).length), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex items-center justify-end space-x-4 mb-6" }, [
                  unref(hasUnreadNotifications) ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: unref(markAllAsRead),
                    disabled: unref(isLoading),
                    class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  }, " Mark all as read ", 8, ["onClick", "disabled"])) : createCommentVNode("", true),
                  createVNode("button", {
                    onClick: createTestNotification,
                    class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  }, " Test Notification ")
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 mb-6" }, [
                  createVNode("div", { class: "p-4 border-b border-gray-200" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Filters")
                  ]),
                  createVNode("div", { class: "p-4" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.status = $event,
                          onChange: applyFilters,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "All"),
                          createVNode("option", { value: "unread" }, "Unread"),
                          createVNode("option", { value: "read" }, "Read")
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.status]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Type"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.type = $event,
                          onChange: applyFilters,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "All Types"),
                          createVNode("option", { value: "welcome" }, "Welcome"),
                          createVNode("option", { value: "booking_confirmed" }, "Booking Confirmed"),
                          createVNode("option", { value: "booking_cancelled" }, "Booking Cancelled"),
                          createVNode("option", { value: "payment_received" }, "Payment Received"),
                          createVNode("option", { value: "payment_failed" }, "Payment Failed"),
                          createVNode("option", { value: "new_review" }, "New Review"),
                          createVNode("option", { value: "profile_updated" }, "Profile Updated")
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.type]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Priority"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.priority = $event,
                          onChange: applyFilters,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "All Priorities"),
                          createVNode("option", { value: "low" }, "Low"),
                          createVNode("option", { value: "normal" }, "Normal"),
                          createVNode("option", { value: "high" }, "High"),
                          createVNode("option", { value: "urgent" }, "Urgent")
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.priority]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Per Page"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filters.value.perPage = $event,
                          onChange: applyFilters,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "10" }, "10"),
                          createVNode("option", { value: "25" }, "25"),
                          createVNode("option", { value: "50" }, "50"),
                          createVNode("option", { value: "100" }, "100")
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, filters.value.perPage]
                        ])
                      ])
                    ])
                  ])
                ]),
                selectedNotifications.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4"
                }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(selectedNotifications.value.length) + " notification(s) selected ", 1),
                    createVNode("div", { class: "flex items-center space-x-2" }, [
                      createVNode("button", {
                        onClick: ($event) => performBulkAction("mark_read"),
                        class: "px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      }, " Mark as Read ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => performBulkAction("mark_unread"),
                        class: "px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                      }, " Mark as Unread ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: ($event) => performBulkAction("delete"),
                        class: "px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      }, " Delete ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: clearSelection,
                        class: "px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                      }, " Clear Selection ")
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200" }, [
                  createVNode("div", { class: "p-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "All Notifications"),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          createVNode("input", {
                            type: "checkbox",
                            checked: allSelected.value,
                            onChange: toggleSelectAll,
                            class: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          }, null, 40, ["checked"]),
                          createVNode("span", { class: "ml-2 text-sm text-gray-600" }, "Select All")
                        ])
                      ])
                    ])
                  ]),
                  unref(isLoading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-8 text-center"
                  }, [
                    createVNode("div", { class: "animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto" }),
                    createVNode("p", { class: "text-sm text-gray-500 mt-4" }, "Loading notifications...")
                  ])) : unref(notifications).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-8 text-center"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-16 h-16 text-gray-300 mx-auto mb-4",
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
                    createVNode("p", { class: "text-lg text-gray-500 mb-2" }, "No notifications found"),
                    createVNode("p", { class: "text-sm text-gray-400" }, "You're all caught up!")
                  ])) : (openBlock(), createBlock("div", { key: 2 }, [
                    createTextVNode(toDisplayString(unref(notifications).length) + " notifications found ", 1),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(notifications), (notification) => {
                      return openBlock(), createBlock("div", {
                        key: notification.id,
                        class: "border-b border-gray-100 last:border-b-0"
                      }, [
                        createVNode("div", { class: "flex items-start p-4 hover:bg-gray-50" }, [
                          createVNode("div", { class: "flex-shrink-0 mr-3 pt-1" }, [
                            createVNode("input", {
                              type: "checkbox",
                              checked: selectedNotifications.value.includes(notification.id),
                              onChange: ($event) => toggleNotificationSelection(notification.id),
                              class: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            }, null, 40, ["checked", "onChange"])
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_NotificationItem, {
                              notification,
                              onClick: handleNotificationClick,
                              onMarkRead: unref(markAsRead),
                              onMarkUnread: unref(markAsUnread),
                              onDelete: unref(deleteNotification),
                              class: "border-0"
                            }, null, 8, ["notification", "onMarkRead", "onMarkUnread", "onDelete"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])),
                  meta.value.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "p-4 border-t border-gray-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-gray-600" }, " Showing " + toDisplayString((meta.value.current_page - 1) * meta.value.per_page + 1) + " to " + toDisplayString(Math.min(meta.value.current_page * meta.value.per_page, meta.value.total)) + " of " + toDisplayString(meta.value.total) + " notifications ", 1),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode("button", {
                          onClick: ($event) => goToPage(meta.value.current_page - 1),
                          disabled: meta.value.current_page <= 1,
                          class: "px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                        }, " Previous ", 8, ["onClick", "disabled"]),
                        createVNode("span", { class: "text-sm text-gray-600" }, " Page " + toDisplayString(meta.value.current_page) + " of " + toDisplayString(meta.value.last_page), 1),
                        createVNode("button", {
                          onClick: ($event) => goToPage(meta.value.current_page + 1),
                          disabled: meta.value.current_page >= meta.value.last_page,
                          class: "px-3 py-1 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                        }, " Next ", 8, ["onClick", "disabled"])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=notifications-BT1CB1Xx.mjs.map
