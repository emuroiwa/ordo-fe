import { _ as __nuxt_component_0 } from './nuxt-link-D-nrCqmf.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
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
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedLocation = ref("");
    const priceRange = ref([0, 5e3]);
    const availabilityFilter = ref([]);
    const sortBy = ref("name");
    const vendors = ref([
      {
        id: 1,
        name: "Premium Cuts Barber",
        category: "barber",
        location: "Johannesburg",
        price: 150,
        rating: 4.8,
        reviews: 127,
        image: "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=400&h=300&fit=crop",
        availability: ["today", "weekend"]
      },
      {
        id: 2,
        name: "Elegant Weddings",
        category: "wedding",
        location: "Cape Town",
        price: 2500,
        rating: 4.9,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
        availability: ["weekend"]
      },
      {
        id: 3,
        name: "Pro Equipment Rental",
        category: "equipment",
        location: "Durban",
        price: 300,
        rating: 4.6,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        availability: ["today", "evening"]
      },
      {
        id: 4,
        name: "Studio Flash Photography",
        category: "photography",
        location: "Pretoria",
        price: 800,
        rating: 4.7,
        reviews: 73,
        image: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400&h=300&fit=crop",
        availability: ["weekend", "evening"]
      },
      {
        id: 5,
        name: "Gourmet Catering Co.",
        category: "catering",
        location: "Cape Town",
        price: 1200,
        rating: 4.5,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
        availability: ["weekend"]
      },
      {
        id: 6,
        name: "Style & Shave",
        category: "barber",
        location: "Port Elizabeth",
        price: 120,
        rating: 4.4,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=400&h=300&fit=crop",
        availability: ["today", "evening"]
      }
    ]);
    const filteredVendors = computed(() => {
      let filtered = vendors.value.filter((vendor) => {
        const matchesSearch = !searchQuery.value || vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || vendor.category.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || vendor.category === selectedCategory.value;
        const matchesLocation = !selectedLocation.value || vendor.location.toLowerCase().includes(selectedLocation.value.toLowerCase());
        const matchesPrice = vendor.price >= priceRange.value[0] && vendor.price <= priceRange.value[1];
        const matchesAvailability = availabilityFilter.value.length === 0 || availabilityFilter.value.some((filter) => vendor.availability.includes(filter));
        return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesAvailability;
      });
      if (sortBy.value === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy.value === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sortBy.value === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white" }, _attrs))}><header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex items-center justify-between h-16"><div class="flex items-center space-x-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ORDO`);
          } else {
            return [
              createTextVNode("ORDO")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex space-x-8">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "text-blue-600 border-b-2 border-blue-600 pb-2 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Search`);
          } else {
            return [
              createTextVNode("Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/map-search",
        class: "text-gray-700 hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Map Search`);
          } else {
            return [
              createTextVNode("Map Search")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/how-it-works",
        class: "text-gray-700 hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`How it Works`);
          } else {
            return [
              createTextVNode("How it Works")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-gray-700 hover:text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About us`);
          } else {
            return [
              createTextVNode("About us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-blue-600 hover:text-blue-800 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login`);
          } else {
            return [
              createTextVNode("Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "backdrop-blur-sm bg-white/20 border border-white/30 px-4 py-2 rounded-xl font-medium text-gray-700 hover:bg-white/30 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Register`);
          } else {
            return [
              createTextVNode("Register")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"> List a Service </button></div></div></div></header><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 lg:grid-cols-4 gap-8"><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow-sm p-6 sticky top-6"><h2 class="text-lg font-semibold text-gray-900 mb-4">Filters</h2><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Search</label><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search vendors or services..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Category</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>All Categories</option><option value="barber"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "barber") : ssrLooseEqual(selectedCategory.value, "barber")) ? " selected" : ""}>Barber</option><option value="wedding"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "wedding") : ssrLooseEqual(selectedCategory.value, "wedding")) ? " selected" : ""}>Wedding</option><option value="equipment"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "equipment") : ssrLooseEqual(selectedCategory.value, "equipment")) ? " selected" : ""}>Equipment</option><option value="photography"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "photography") : ssrLooseEqual(selectedCategory.value, "photography")) ? " selected" : ""}>Photography</option><option value="catering"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "catering") : ssrLooseEqual(selectedCategory.value, "catering")) ? " selected" : ""}>Catering</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Location</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "") : ssrLooseEqual(selectedLocation.value, "")) ? " selected" : ""}>All Locations</option><option value="johannesburg"${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "johannesburg") : ssrLooseEqual(selectedLocation.value, "johannesburg")) ? " selected" : ""}>Johannesburg</option><option value="cape-town"${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "cape-town") : ssrLooseEqual(selectedLocation.value, "cape-town")) ? " selected" : ""}>Cape Town</option><option value="durban"${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "durban") : ssrLooseEqual(selectedLocation.value, "durban")) ? " selected" : ""}>Durban</option><option value="pretoria"${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "pretoria") : ssrLooseEqual(selectedLocation.value, "pretoria")) ? " selected" : ""}>Pretoria</option><option value="port-elizabeth"${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "port-elizabeth") : ssrLooseEqual(selectedLocation.value, "port-elizabeth")) ? " selected" : ""}>Port Elizabeth</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label><div class="space-y-2"><input${ssrRenderAttr("value", priceRange.value[0])} type="range" min="0" max="5000" step="100" class="w-full"><div class="flex justify-between text-sm text-gray-600"><span>R${ssrInterpolate(priceRange.value[0])}</span><span>R${ssrInterpolate(priceRange.value[1])}+</span></div></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Availability</label><div class="space-y-2"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(availabilityFilter.value) ? ssrLooseContain(availabilityFilter.value, "today") : availabilityFilter.value) ? " checked" : ""} type="checkbox" value="today" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Available Today</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(availabilityFilter.value) ? ssrLooseContain(availabilityFilter.value, "weekend") : availabilityFilter.value) ? " checked" : ""} type="checkbox" value="weekend" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Weekend Available</span></label><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(availabilityFilter.value) ? ssrLooseContain(availabilityFilter.value, "evening") : availabilityFilter.value) ? " checked" : ""} type="checkbox" value="evening" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"><span class="ml-2 text-sm text-gray-700">Evening Hours</span></label></div></div><button class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"> Clear Filters </button></div></div></div><div class="lg:col-span-3"><div class="flex justify-between items-center mb-6"><p class="text-gray-600">${ssrInterpolate(filteredVendors.value.length)} results found</p><select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value="name"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "name") : ssrLooseEqual(sortBy.value, "name")) ? " selected" : ""}>Sort by Name</option><option value="price"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "price") : ssrLooseEqual(sortBy.value, "price")) ? " selected" : ""}>Sort by Price</option><option value="rating"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "rating") : ssrLooseEqual(sortBy.value, "rating")) ? " selected" : ""}>Sort by Rating</option><option value="distance"${ssrIncludeBooleanAttr(Array.isArray(sortBy.value) ? ssrLooseContain(sortBy.value, "distance") : ssrLooseEqual(sortBy.value, "distance")) ? " selected" : ""}>Sort by Distance</option></select></div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(filteredVendors.value, (vendor) => {
        _push(`<div class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"><div class="relative"><img${ssrRenderAttr("src", vendor.image)}${ssrRenderAttr("alt", vendor.name)} class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"><button class="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"><svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button><div class="absolute top-3 left-3"><span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">${ssrInterpolate(vendor.category)}</span></div></div><div class="p-4"><div class="flex items-center justify-between mb-2"><span class="text-xl font-bold text-gray-900">R ${ssrInterpolate(vendor.price.toLocaleString())}</span><button class="text-gray-400 hover:text-gray-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg></button></div><h3 class="font-semibold text-gray-900 mb-1">${ssrInterpolate(vendor.name)}</h3><p class="text-sm text-gray-600 mb-2">${ssrInterpolate(vendor.category)} \u2022 ${ssrInterpolate(vendor.reviews)} reviews</p><div class="flex items-center text-sm text-gray-500 mb-3"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${ssrInterpolate(vendor.location)}</div><div class="flex items-center justify-between"><div class="flex items-center"><svg class="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg><span class="text-sm text-gray-600">${ssrInterpolate(vendor.rating)}</span></div><span class="text-xs text-gray-500">Available Today</span></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (filteredVendors.value.length === 0) {
        _push(`<div class="text-center py-12"><div class="text-gray-400 mb-4"><svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.562M12 9l3 3-3 3m0-6l-3 3 3 3"></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2">No vendors found</h3><p class="text-gray-600">Try adjusting your filters to find more results.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-De8GHBAj.mjs.map
