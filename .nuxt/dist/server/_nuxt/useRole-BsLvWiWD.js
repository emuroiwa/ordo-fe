import { computed, ref, readonly } from "vue";
const currentRole = ref("customer");
const useRole = () => {
  const toggleRole = (role) => {
    currentRole.value = role;
  };
  const setRole = (role) => {
    currentRole.value = role;
  };
  const isCustomer = computed(() => currentRole.value === "customer");
  const isVendor = computed(() => currentRole.value === "vendor");
  return {
    // State
    currentRole: readonly(currentRole),
    // Computed
    isCustomer,
    isVendor,
    // Actions
    toggleRole,
    setRole
  };
};
export {
  useRole as u
};
//# sourceMappingURL=useRole-BsLvWiWD.js.map
