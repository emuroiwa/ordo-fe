import { computed, ref, readonly } from 'vue';
import { u as useAuth } from './useAuth-DCe-ZuTK.mjs';

const currentRole = ref("customer");
const useRole = () => {
  const { user } = useAuth();
  const toggleRole = (role) => {
    if (hasRole(role)) {
      currentRole.value = role;
    }
  };
  const setRole = (role) => {
    if (hasRole(role)) {
      currentRole.value = role;
    }
  };
  const hasRole = (role) => {
    var _a, _b;
    return ((_b = (_a = user.value) == null ? void 0 : _a.roles) == null ? void 0 : _b.includes(role)) || false;
  };
  const hasMultipleRoles = computed(() => {
    var _a;
    const userRoles = ((_a = user.value) == null ? void 0 : _a.roles) || [];
    const hasMultiple = userRoles.includes("customer") && userRoles.includes("vendor");
    console.log("hasMultipleRoles debug:", { userRoles, hasMultiple, user: user.value });
    return hasMultiple;
  });
  const primaryRole = computed(() => {
    var _a;
    const userRoles = ((_a = user.value) == null ? void 0 : _a.roles) || ["customer"];
    if (userRoles.includes("vendor")) return "vendor";
    return "customer";
  });
  const isCustomer = computed(() => currentRole.value === "customer");
  const isVendor = computed(() => currentRole.value === "vendor");
  const initializeRole = () => {
    var _a;
    if ((_a = user.value) == null ? void 0 : _a.roles) {
      if (user.value.roles.includes("vendor") && user.value.roles.includes("customer")) {
        if (!hasRole(currentRole.value)) {
          currentRole.value = "vendor";
        }
      } else if (user.value.roles.includes("vendor")) {
        currentRole.value = "vendor";
      } else {
        currentRole.value = "customer";
      }
    }
  };
  return {
    // State
    currentRole: readonly(currentRole),
    // Computed
    isCustomer,
    isVendor,
    hasMultipleRoles,
    primaryRole,
    // Actions
    toggleRole,
    setRole,
    hasRole,
    initializeRole
  };
};

export { useRole as u };
//# sourceMappingURL=useRole-BcbisXkr.mjs.map
