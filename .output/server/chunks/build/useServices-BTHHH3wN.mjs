import { a as useRuntimeConfig } from './server.mjs';
import { u as useCookie } from './cookie-DrsL3lQs.mjs';
import { ref } from 'vue';

const useServices = () => {
  const config = useRuntimeConfig();
  const makeApiCall = async (url, options = {}) => {
    const tokenCookie = useCookie("auth-token");
    const headers = {
      "Accept": "application/json",
      ...options.headers
    };
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    if (tokenCookie.value) {
      headers["Authorization"] = `Bearer ${tokenCookie.value}`;
    }
    return await $fetch(url, {
      ...options,
      baseURL: config.public.apiBase,
      headers
    });
  };
  const services = ref([]);
  const service = ref(null);
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 12,
    total: 0
  });
  const fetchServices = async (filters = {}) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== void 0 && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
      const response = await makeApiCall(`/api/v1/services?${queryParams.toString()}`);
      services.value = response.data;
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      };
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch services";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchService = async (fullSlug) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const slugParts = fullSlug.split("/");
      if (slugParts.length === 2) {
        const [userSlug, serviceSlug] = slugParts;
        service.value = await makeApiCall(`/api/v1/services/${userSlug}/${serviceSlug}`);
      } else {
        throw new Error("Invalid service slug format");
      }
      return service.value;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch service";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchServiceById = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      service.value = await makeApiCall(`/api/v1/services/${id}/edit`);
      return service.value;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch service";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchCategories = async () => {
    var _a;
    try {
      categories.value = await makeApiCall("/api/v1/service-categories");
      return categories.value;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch categories";
      throw err;
    }
  };
  const createService = async (serviceData) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      Object.entries(serviceData).forEach(([key, value]) => {
        if (key === "images") return;
        if (key === "tags" || key === "requirements") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== void 0 && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (serviceData.images) {
        Array.from(serviceData.images).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      }
      const newService = await makeApiCall("/api/v1/services", {
        method: "POST",
        body: formData
      });
      if (services.value.length > 0) {
        services.value.unshift(newService.service);
      }
      return newService;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to create service";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateService = async (id, serviceData) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      Object.entries(serviceData).forEach(([key, value]) => {
        if (key === "images") return;
        if (key === "tags" || key === "requirements") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== void 0 && value !== null) {
          formData.append(key, String(value));
        }
      });
      if (serviceData.images) {
        Array.from(serviceData.images).forEach((file, index2) => {
          formData.append(`images[${index2}]`, file);
        });
      }
      const updatedService = await makeApiCall(`/api/v1/services/${id}`, {
        method: "POST",
        // Laravel expects POST with _method=PUT for file uploads
        body: formData
      });
      const index = services.value.findIndex((s) => s.id === id);
      if (index !== -1) {
        services.value[index] = updatedService.service;
      }
      if (((_a = service.value) == null ? void 0 : _a.id) === id) {
        service.value = updatedService.service;
      }
      return updatedService;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || "Failed to update service";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const deleteService = async (id) => {
    var _a, _b;
    loading.value = true;
    error.value = null;
    try {
      await makeApiCall(`/api/v1/services/${id}`, {
        method: "DELETE"
      });
      services.value = services.value.filter((s) => s.id !== id);
      if (((_a = service.value) == null ? void 0 : _a.id) === id) {
        service.value = null;
      }
      return true;
    } catch (err) {
      error.value = ((_b = err.data) == null ? void 0 : _b.message) || "Failed to delete service";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const searchServices = async (query, filters = {}) => {
    return await fetchServices({ ...filters, q: query });
  };
  const fetchMyServices = async (filters = {}) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== void 0 && value !== null && value !== "") {
          queryParams.append(key, String(value));
        }
      });
      const response = await makeApiCall(`/api/v1/services/my-services?${queryParams.toString()}`);
      services.value = response.data;
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      };
      return response;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch my services";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchServiceAnalytics = async (serviceId) => {
    var _a;
    try {
      return await makeApiCall(`/api/v1/services/${serviceId}/analytics`);
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || "Failed to fetch analytics";
      throw err;
    }
  };
  const formatPrice = (price, currency = "ZAR") => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  };
  const getOptimizedImageUrl = (image, size = "medium") => {
    var _a;
    if ((_a = image.thumbnail_urls) == null ? void 0 : _a[size]) {
      return image.thumbnail_urls[size];
    }
    return image.url;
  };
  return {
    // State
    services,
    service,
    categories,
    loading,
    error,
    pagination,
    // Methods
    fetchServices,
    fetchService,
    fetchServiceById,
    fetchCategories,
    createService,
    updateService,
    deleteService,
    searchServices,
    fetchMyServices,
    fetchServiceAnalytics,
    // Helpers
    formatPrice,
    getOptimizedImageUrl
  };
};

export { useServices as u };
//# sourceMappingURL=useServices-BTHHH3wN.mjs.map
