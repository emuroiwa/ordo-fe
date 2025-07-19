import { defineComponent, createElementBlock, shallowRef, getCurrentInstance, provide, cloneVNode, h, ref, computed, readonly } from "vue";
import { b as useNuxtApp, a as useRuntimeConfig } from "../server.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/hookable/dist/index.mjs";
import { parse } from "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/h3/dist/index.mjs";
import destr from "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/destr/dist/index.mjs";
import { isEqual } from "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/ohash/dist/index.mjs";
import { klona } from "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/klona/dist/index.mjs";
import "/home/payfastdeveloper/Documents/projects/ordo/fe/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a;
      if (mounted.value) {
        const vnodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const user = ref(null);
const token = ref(null);
const isLoading = ref(false);
const lastActivity = ref(Date.now());
const useAuth = () => {
  const tokenCookie = useCookie("auth-token", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    // 30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: false
    // Must be false for client-side access
  });
  const userCookie = useCookie("auth-user", {
    default: () => null,
    maxAge: 60 * 60 * 24 * 30,
    // 30 days
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: false
    // Must be false for client-side access
  });
  if (tokenCookie.value) {
    token.value = tokenCookie.value;
  }
  if (userCookie.value) {
    user.value = userCookie.value;
  }
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const login = async (credentials) => {
    var _a;
    try {
      isLoading.value = true;
      const config = useRuntimeConfig();
      const response = await $fetch("/api/v1/login", {
        method: "POST",
        baseURL: config.public.apiBase,
        body: credentials,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (response.token && response.user) {
        token.value = response.token;
        user.value = response.user;
        tokenCookie.value = response.token;
        userCookie.value = response.user;
        lastActivity.value = Date.now();
        return { success: true, user: response.user, token: response.token };
      }
      return { success: false, error: "Invalid response format" };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Login failed. Please check your credentials."
      };
    } finally {
      isLoading.value = false;
    }
  };
  const register = async (userData) => {
    var _a;
    try {
      isLoading.value = true;
      const config = useRuntimeConfig();
      const response = await $fetch("/api/v1/register", {
        method: "POST",
        baseURL: config.public.apiBase,
        body: userData,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      if (response.token && response.user) {
        token.value = response.token;
        user.value = response.user;
        tokenCookie.value = response.token;
        userCookie.value = response.user;
        lastActivity.value = Date.now();
        return { success: true, user: response.user, token: response.token };
      }
      return { success: false, error: "Invalid response format" };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Registration failed. Please try again."
      };
    } finally {
      isLoading.value = false;
    }
  };
  const logout = async () => {
    try {
      isLoading.value = true;
      const config = useRuntimeConfig();
      if (token.value) {
        await $fetch("/api/v1/logout", {
          method: "POST",
          baseURL: config.public.apiBase,
          headers: {
            "Authorization": `Bearer ${token.value}`,
            "Accept": "application/json"
          }
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      token.value = null;
      user.value = null;
      tokenCookie.value = null;
      userCookie.value = null;
      isLoading.value = false;
    }
  };
  const fetchUser = async () => {
    try {
      isLoading.value = true;
      const config = useRuntimeConfig();
      if (!token.value) {
        return null;
      }
      const response = await $fetch("/api/v1/user", {
        baseURL: config.public.apiBase,
        headers: {
          "Authorization": `Bearer ${token.value}`,
          "Accept": "application/json"
        }
      });
      user.value = response;
      userCookie.value = response;
      lastActivity.value = Date.now();
      return response;
    } catch (error) {
      console.error("Fetch user error:", error);
      await logout();
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const updateLastActivity = () => {
    lastActivity.value = Date.now();
  };
  const isTokenExpired = () => {
    if (!token.value) return true;
    const maxAge = 24 * 60 * 60 * 1e3;
    return Date.now() - lastActivity.value > maxAge;
  };
  const refreshToken = async () => {
    try {
      if (!token.value) return false;
      const config = useRuntimeConfig();
      const response = await $fetch("/api/v1/refresh", {
        method: "POST",
        baseURL: config.public.apiBase,
        headers: {
          "Authorization": `Bearer ${token.value}`,
          "Accept": "application/json"
        }
      });
      if (response.token) {
        token.value = response.token;
        tokenCookie.value = response.token;
        lastActivity.value = Date.now();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      await logout();
      return false;
    }
  };
  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    lastActivity: readonly(lastActivity),
    // Computed
    isAuthenticated,
    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateLastActivity,
    isTokenExpired,
    refreshToken
  };
};
export {
  useAuth as u
};
//# sourceMappingURL=useAuth-DYBaK23E.js.map
