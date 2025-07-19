import { g as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-DYBaK23E.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const guest = defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated.value) {
    return navigateTo("/dashboard");
  }
});

export { guest as default };
//# sourceMappingURL=guest-DhTWuFK_.mjs.map
