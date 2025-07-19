import { defineComponent, ref, reactive, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { u as useHead } from './v3-2ml_FOLh.mjs';
import { u as useProfile } from './useProfile-CVDZmB6A.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Profile Settings - Dashboard"
    });
    const {
      user,
      stats,
      loading,
      uploading,
      error,
      profileCompletion,
      displayName,
      userInitials
    } = useProfile();
    ref();
    const successMessage = ref("");
    const profileForm = reactive({
      name: "",
      email: "",
      phone: "",
      business_name: "",
      service_category: "",
      roles: ["customer"]
    });
    const passwordForm = reactive({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    watch(user, (newUser) => {
      if (newUser) {
        profileForm.name = newUser.name;
        profileForm.email = newUser.email;
        profileForm.phone = newUser.phone || "";
        profileForm.business_name = newUser.business_name || "";
        profileForm.service_category = newUser.service_category || "";
        profileForm.roles = [...newUser.roles];
      }
    }, { immediate: true });
    watch(error, (newError) => {
      if (newError) {
        setTimeout(() => {
          error.value = null;
        }, 5e3);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="bg-white shadow-sm border-b"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1><p class="mt-1 text-sm text-gray-600"> Manage your account settings and preferences </p></div>`);
      if (unref(user)) {
        _push(`<div class="text-right"><div class="text-sm text-gray-600 mb-1">Profile completion</div><div class="flex items-center gap-2"><div class="w-16 bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(profileCompletion)}%` })}"></div></div><span class="text-sm font-medium text-gray-900">${ssrInterpolate(unref(profileCompletion))}%</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (unref(loading) && !unref(user)) {
        _push(`<div class="flex items-center justify-center py-12"><div class="text-center"><svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p class="text-gray-600">Loading profile...</p></div></div>`);
      } else if (unref(user)) {
        _push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow-sm border p-6 mb-6"><div class="text-center"><div class="relative inline-block"><div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto mb-4 relative">`);
        if (unref(user).avatar_url) {
          _push(`<img${ssrRenderAttr("src", unref(user).avatar_url)}${ssrRenderAttr("alt", unref(user).name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">${ssrInterpolate(unref(userInitials))}</div>`);
        }
        if (unref(uploading)) {
          _push(`<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><svg class="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><label class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><input type="file" accept="image/*" class="hidden"></label></div><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(unref(displayName))}</h3><p class="text-gray-600">${ssrInterpolate(unref(user).email)}</p><div class="flex gap-2 justify-center mt-3"><!--[-->`);
        ssrRenderList(unref(user).roles, (role) => {
          _push(`<span class="${ssrRenderClass([role === "vendor" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(role.charAt(0).toUpperCase() + role.slice(1))}</span>`);
        });
        _push(`<!--]--></div>`);
        if (unref(user).avatar) {
          _push(`<div class="mt-4"><button class="text-sm text-red-600 hover:text-red-700"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}> Remove avatar </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(stats)) {
          _push(`<div class="bg-white rounded-lg shadow-sm border p-6"><h4 class="text-lg font-semibold text-gray-900 mb-4">Profile Stats</h4><div class="space-y-4">`);
          if (unref(user).is_vendor) {
            _push(`<div class="flex justify-between"><span class="text-gray-600">Services</span><span class="font-medium">${ssrInterpolate(unref(stats).services_count)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(user).is_vendor) {
            _push(`<div class="flex justify-between"><span class="text-gray-600">Active Services</span><span class="font-medium">${ssrInterpolate(unref(stats).active_services_count)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex justify-between"><span class="text-gray-600">Member Since</span><span class="font-medium">${ssrInterpolate(unref(stats).member_since)}</span></div><div class="flex justify-between"><span class="text-gray-600">Profile Complete</span><span class="font-medium">${ssrInterpolate(unref(stats).profile_completion)}%</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-lg shadow-sm border"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Personal Information</h3></div><form class="p-6 space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="name" class="block text-sm font-medium text-gray-700 mb-2"> Full Name * </label><input id="name"${ssrRenderAttr("value", unref(profileForm).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email Address * </label><input id="email"${ssrRenderAttr("value", unref(profileForm).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label for="phone" class="block text-sm font-medium text-gray-700 mb-2"> Phone Number </label><input id="phone"${ssrRenderAttr("value", unref(profileForm).phone)} type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div>`);
        if (unref(user).is_vendor) {
          _push(`<div><label for="business_name" class="block text-sm font-medium text-gray-700 mb-2"> Business Name </label><input id="business_name"${ssrRenderAttr("value", unref(profileForm).business_name)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(user).is_vendor) {
          _push(`<div class="md:col-span-2"><label for="service_category" class="block text-sm font-medium text-gray-700 mb-2"> Service Category </label><input id="service_category"${ssrRenderAttr("value", unref(profileForm).service_category)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Web Development, Photography, Consulting"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-2"> Account Type </label><div class="flex gap-4"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).roles) ? ssrLooseContain(unref(profileForm).roles, "customer") : unref(profileForm).roles) ? " checked" : ""} type="checkbox" value="customer" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="ml-2 text-sm text-gray-700">Customer</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(profileForm).roles) ? ssrLooseContain(unref(profileForm).roles, "vendor") : unref(profileForm).roles) ? " checked" : ""} type="checkbox" value="vendor" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="ml-2 text-sm text-gray-700">Service Provider</span></label></div></div></div><div class="flex justify-end pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (unref(loading)) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Updating... </span>`);
        } else {
          _push(`<span>Update Profile</span>`);
        }
        _push(`</button></div></form></div><div class="bg-white rounded-lg shadow-sm border"><div class="px-6 py-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900">Change Password</h3></div><form class="p-6 space-y-4"><div><label for="current_password" class="block text-sm font-medium text-gray-700 mb-2"> Current Password </label><input id="current_password"${ssrRenderAttr("value", unref(passwordForm).current_password)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="password" class="block text-sm font-medium text-gray-700 mb-2"> New Password </label><input id="password"${ssrRenderAttr("value", unref(passwordForm).password)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><div><label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2"> Confirm New Password </label><input id="password_confirmation"${ssrRenderAttr("value", unref(passwordForm).password_confirmation)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div></div><div class="flex justify-end pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (unref(loading)) {
          _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Changing... </span>`);
        } else {
          _push(`<span>Change Password</span>`);
        }
        _push(`</button></div></form></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(successMessage)) {
        _push(`<div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">${ssrInterpolate(unref(successMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BaeMWMxp.mjs.map
