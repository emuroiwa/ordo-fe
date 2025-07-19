import { ref, computed } from 'vue';
import { b as useNuxtApp } from './server.mjs';

const useProfile = () => {
  const user = ref(null);
  const stats = ref(null);
  const loading = ref(false);
  const uploading = ref(false);
  const error = ref(null);
  const fetchProfile = async () => {
    if (loading.value || true) {
      return user.value;
    }
  };
  const updateProfile = async (profileData) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
          } else {
            formData.append(key, String(value));
          }
        }
      });
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/api/v1/profile", {
        method: "PUT",
        body: formData
      });
      user.value = response.user;
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to update profile";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updatePassword = async (passwordData) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/api/v1/profile/password", {
        method: "PUT",
        body: passwordData
      });
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to update password";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const uploadAvatar = async (file) => {
    var _a;
    uploading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/api/v1/profile/avatar", {
        method: "POST",
        body: formData
      });
      if (user.value) {
        user.value.avatar_url = response.avatar_url;
      }
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to upload avatar";
      throw err;
    } finally {
      uploading.value = false;
    }
  };
  const deleteAvatar = async () => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const { $fetch } = useNuxtApp();
      const response = await $fetch("/api/v1/profile/avatar", {
        method: "DELETE"
      });
      if (user.value) {
        user.value.avatar_url = response.avatar_url;
        user.value.avatar = void 0;
      }
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to delete avatar";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchStats = async () => {
    var _a;
    try {
      const { $fetch } = useNuxtApp();
      stats.value = await $fetch("/api/v1/profile/stats");
      return stats.value;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch profile stats";
      throw err;
    }
  };
  const toggleRole = async (role) => {
    if (!user.value) return;
    const currentRoles = user.value.roles || ["customer"];
    let newRoles;
    if (role === "vendor") {
      newRoles = currentRoles.includes("vendor") ? currentRoles : [...currentRoles, "vendor"];
    } else {
      newRoles = currentRoles.filter((r) => r !== "vendor");
      if (!newRoles.includes("customer")) {
        newRoles.push("customer");
      }
    }
    return await updateProfile({ roles: newRoles });
  };
  const isProfileComplete = computed(() => {
    if (!user.value) return false;
    const requiredFields = ["name", "email"];
    const vendorFields = user.value.is_vendor ? ["business_name", "service_category"] : [];
    const allRequiredFields = [...requiredFields, ...vendorFields];
    return allRequiredFields.every((field) => {
      const value = user.value[field];
      return value !== null && value !== void 0 && value !== "";
    });
  });
  const profileCompletion = computed(() => {
    if (!user.value) return 0;
    const fields = {
      name: !!user.value.name,
      email: !!user.value.email,
      phone: !!user.value.phone,
      business_name: !!user.value.business_name,
      service_category: !!user.value.service_category,
      avatar: !!user.value.avatar
    };
    const completed = Object.values(fields).filter(Boolean).length;
    const total = Object.keys(fields).length;
    return Math.round(completed / total * 100);
  });
  const displayName = computed(() => {
    if (!user.value) return "";
    return user.value.business_name || user.value.name;
  });
  const userInitials = computed(() => {
    var _a;
    if (!((_a = user.value) == null ? void 0 : _a.name)) return "U";
    return user.value.name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase().slice(0, 2);
  });
  return {
    // State
    user,
    stats,
    loading,
    uploading,
    error,
    // Computed
    isProfileComplete,
    profileCompletion,
    displayName,
    userInitials,
    // Methods
    fetchProfile,
    updateProfile,
    updatePassword,
    uploadAvatar,
    deleteAvatar,
    fetchStats,
    toggleRole
  };
};

export { useProfile as u };
//# sourceMappingURL=useProfile-BSasby9R.mjs.map
