import { defineComponent, reactive, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: { default: "Images" },
    required: { type: Boolean, default: false },
    multiple: { type: Boolean, default: true },
    maxFiles: { default: 10 },
    maxFileSize: { default: 10 }
  },
  emits: ["update:modelValue", "error", "upload-start", "upload-complete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref();
    const imageList = ref([]);
    const isDragOver = ref(false);
    const errorMessage = ref("");
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const hasImages = computed(() => imageList.value.length > 0);
    watch(() => props.modelValue, (newValue) => {
      if (!newValue) {
        imageList.value = [];
        return;
      }
      const files = Array.from(newValue);
      imageList.value = files.map((file, index) => ({
        file,
        preview: URL.createObjectURL(file),
        isPrimary: index === 0,
        uploading: false
      }));
    }, { immediate: true });
    const formatFileSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "image-upload" }, _attrs))} data-v-f4beb934><div class="mb-4" data-v-f4beb934><label class="block text-sm font-medium text-gray-700 mb-2" data-v-f4beb934>${ssrInterpolate(_ctx.label)} `);
      if (_ctx.required) {
        _push(`<span class="text-red-500" data-v-f4beb934>*</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><div class="${ssrRenderClass([{ "border-blue-500 bg-blue-50": isDragOver.value }, "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"])}" data-v-f4beb934><input type="file"${ssrIncludeBooleanAttr(_ctx.multiple) ? " multiple" : ""} accept="image/jpeg,image/png,image/webp" class="hidden" data-v-f4beb934>`);
      if (!hasImages.value) {
        _push(`<div class="text-gray-500" data-v-f4beb934><svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-f4beb934><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-f4beb934></path></svg><p class="text-lg font-medium" data-v-f4beb934>${ssrInterpolate(_ctx.multiple ? "Upload images" : "Upload image")}</p><p class="text-sm" data-v-f4beb934>Drag and drop or click to select</p><p class="text-xs mt-2" data-v-f4beb934>JPEG, PNG, or WebP up to 10MB</p>`);
        if (_ctx.multiple) {
          _push(`<p class="text-xs" data-v-f4beb934>Maximum ${ssrInterpolate(_ctx.maxFiles)} images</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (hasImages.value) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-f4beb934><!--[-->`);
        ssrRenderList(imageList.value, (image, index) => {
          _push(`<div class="relative group" data-v-f4beb934><div class="aspect-square bg-gray-100 rounded-lg overflow-hidden" data-v-f4beb934><img${ssrRenderAttr("src", image.preview)}${ssrRenderAttr("alt", `Preview ${index + 1}`)} class="w-full h-full object-cover" data-v-f4beb934>`);
          if (image.uploading) {
            _push(`<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" data-v-f4beb934><div class="text-white text-center" data-v-f4beb934><svg class="animate-spin h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" data-v-f4beb934><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-f4beb934></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-f4beb934></path></svg><span class="text-sm" data-v-f4beb934>Processing...</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="absolute top-2 right-2 flex gap-1" data-v-f4beb934>`);
          if (_ctx.multiple && !image.isPrimary) {
            _push(`<button class="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 text-gray-600 hover:text-blue-600 transition-colors" title="Set as primary image" data-v-f4beb934><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f4beb934><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-v-f4beb934></path></svg></button>`);
          } else if (_ctx.multiple && image.isPrimary) {
            _push(`<div class="bg-yellow-500 rounded-full p-1 text-white" title="Primary image" data-v-f4beb934><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" data-v-f4beb934><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-v-f4beb934></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="bg-red-500 bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 text-white transition-colors" title="Remove image" data-v-f4beb934><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f4beb934><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-f4beb934></path></svg></button></div><div class="mt-2 text-xs text-gray-500" data-v-f4beb934><p class="truncate" data-v-f4beb934>${ssrInterpolate(image.file.name)}</p><p data-v-f4beb934>${ssrInterpolate(formatFileSize(image.file.size))}</p>`);
          if (image.error) {
            _push(`<p class="text-red-500" data-v-f4beb934>${ssrInterpolate(image.error)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
        if (_ctx.multiple && imageList.value.length < _ctx.maxFiles) {
          _push(`<div class="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors" data-v-f4beb934><div class="text-center text-gray-500" data-v-f4beb934><svg class="h-8 w-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f4beb934><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-v-f4beb934></path></svg><span class="text-sm" data-v-f4beb934>Add more</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorMessage.value) {
        _push(`<div class="mt-2 text-sm text-red-600" data-v-f4beb934>${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (isUploading.value) {
        _push(`<div class="mt-4" data-v-f4beb934><div class="flex justify-between text-sm text-gray-600 mb-1" data-v-f4beb934><span data-v-f4beb934>Uploading images...</span><span data-v-f4beb934>${ssrInterpolate(uploadProgress.value)}%</span></div><div class="w-full bg-gray-200 rounded-full h-2" data-v-f4beb934><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${uploadProgress.value}%` })}" data-v-f4beb934></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageUpload.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f4beb934"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceForm",
  __ssrInlineRender: true,
  props: {
    service: {},
    categories: {},
    loading: { type: Boolean, default: false },
    error: { default: "" }
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = reactive({
      title: "",
      description: "",
      short_description: "",
      category_id: "",
      price_type: "fixed",
      base_price: 0,
      max_price: void 0,
      currency: "ZAR",
      duration_minutes: void 0,
      location_type: "client_location",
      address: void 0,
      latitude: void 0,
      longitude: void 0,
      tags: [],
      requirements: [],
      instant_booking: false,
      images: void 0
    });
    const addressForm = reactive({
      city: "",
      province: "",
      street_address: ""
    });
    const tagsInput = ref("");
    const requirementsInput = ref("");
    const isEditing = computed(() => !!props.service);
    const isFormValid = computed(() => {
      return form.title.trim() !== "" && form.description.trim() !== "" && form.short_description.trim() !== "" && form.category_id !== "" && form.base_price > 0 && (form.location_type === "online" || addressForm.city && addressForm.province);
    });
    watch(() => props.service, (service) => {
      if (service) {
        populateForm(service);
      }
    }, { immediate: true });
    watch([tagsInput], () => {
      form.tags = tagsInput.value.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0);
    });
    watch([requirementsInput], () => {
      form.requirements = requirementsInput.value.split("\n").map((req) => req.trim()).filter((req) => req.length > 0);
    });
    watch([addressForm], () => {
      if (form.location_type !== "online") {
        form.address = {
          city: addressForm.city,
          province: addressForm.province,
          street_address: addressForm.street_address,
          country: "South Africa"
        };
      } else {
        form.address = void 0;
      }
    }, { deep: true });
    const populateForm = (service) => {
      form.title = service.title;
      form.description = service.description;
      form.short_description = service.short_description || "";
      form.category_id = service.category_id;
      form.price_type = service.price_type;
      form.base_price = service.base_price;
      form.max_price = service.max_price;
      form.currency = service.currency;
      form.duration_minutes = service.duration_minutes;
      form.location_type = service.location_type;
      form.tags = service.tags || [];
      form.requirements = service.requirements || [];
      form.instant_booking = service.instant_booking;
      if (service.address) {
        addressForm.city = service.address.city || "";
        addressForm.province = service.address.province || "";
        addressForm.street_address = service.address.street_address || "";
        form.address = service.address;
      }
      tagsInput.value = form.tags.join(", ");
      requirementsInput.value = form.requirements.join("\n");
    };
    const handleImageError = (error) => {
      console.error("Image upload error:", error);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ImageUpload = __nuxt_component_0;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-6 rounded-lg shadow-sm border"><h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label for="title" class="block text-sm font-medium text-gray-700 mb-2"> Service Title * </label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required maxlength="100" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Professional Website Design"><p class="mt-1 text-xs text-gray-500">${ssrInterpolate(unref(form).title.length)}/100 characters</p></div><div><label for="category" class="block text-sm font-medium text-gray-700 mb-2"> Category * </label><select id="category" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
      ssrRenderList(_ctx.categories, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label for="duration" class="block text-sm font-medium text-gray-700 mb-2"> Duration (minutes) </label><input id="duration"${ssrRenderAttr("value", unref(form).duration_minutes)} type="number" min="15" max="1440" step="15" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., 60"></div><div class="md:col-span-2"><label for="short_description" class="block text-sm font-medium text-gray-700 mb-2"> Short Description * </label><textarea id="short_description" required maxlength="200" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Brief summary of your service (used in listings)">${ssrInterpolate(unref(form).short_description)}</textarea><p class="mt-1 text-xs text-gray-500">${ssrInterpolate(unref(form).short_description.length)}/200 characters</p></div><div class="md:col-span-2"><label for="description" class="block text-sm font-medium text-gray-700 mb-2"> Full Description * </label><textarea id="description" required rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Detailed description of your service, what&#39;s included, your experience, etc.">${ssrInterpolate(unref(form).description)}</textarea></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm border"><h3 class="text-lg font-semibold text-gray-900 mb-4">Pricing</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label for="price_type" class="block text-sm font-medium text-gray-700 mb-2"> Price Type * </label><select id="price_type" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value="fixed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).price_type) ? ssrLooseContain(unref(form).price_type, "fixed") : ssrLooseEqual(unref(form).price_type, "fixed")) ? " selected" : ""}>Fixed Price</option><option value="hourly"${ssrIncludeBooleanAttr(Array.isArray(unref(form).price_type) ? ssrLooseContain(unref(form).price_type, "hourly") : ssrLooseEqual(unref(form).price_type, "hourly")) ? " selected" : ""}>Hourly Rate</option><option value="negotiable"${ssrIncludeBooleanAttr(Array.isArray(unref(form).price_type) ? ssrLooseContain(unref(form).price_type, "negotiable") : ssrLooseEqual(unref(form).price_type, "negotiable")) ? " selected" : ""}>Negotiable</option></select></div><div><label for="base_price" class="block text-sm font-medium text-gray-700 mb-2">${ssrInterpolate(unref(form).price_type === "hourly" ? "Hourly Rate" : "Starting Price")} * </label><div class="relative"><span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span><input id="base_price"${ssrRenderAttr("value", unref(form).base_price)} type="number" required min="0" step="0.01" class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00"></div></div>`);
      if (unref(form).price_type === "fixed") {
        _push(`<div><label for="max_price" class="block text-sm font-medium text-gray-700 mb-2"> Maximum Price (optional) </label><div class="relative"><span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R</span><input id="max_price"${ssrRenderAttr("value", unref(form).max_price)} type="number" min="0" step="0.01" class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white p-6 rounded-lg shadow-sm border"><h3 class="text-lg font-semibold text-gray-900 mb-4">Service Location</h3><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-2"> Where do you provide this service? * </label><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><label class="${ssrRenderClass([{ "border-blue-500 bg-blue-50": unref(form).location_type === "client_location" }, "flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"])}"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).location_type, "client_location")) ? " checked" : ""} type="radio" value="client_location" class="sr-only"><div class="flex-1 text-center"><div class="text-2xl mb-2">\u{1F3E0}</div><div class="font-medium">Client&#39;s Location</div><div class="text-sm text-gray-500">I travel to client</div></div></label><label class="${ssrRenderClass([{ "border-blue-500 bg-blue-50": unref(form).location_type === "service_location" }, "flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"])}"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).location_type, "service_location")) ? " checked" : ""} type="radio" value="service_location" class="sr-only"><div class="flex-1 text-center"><div class="text-2xl mb-2">\u{1F3E2}</div><div class="font-medium">My Location</div><div class="text-sm text-gray-500">Client comes to me</div></div></label><label class="${ssrRenderClass([{ "border-blue-500 bg-blue-50": unref(form).location_type === "online" }, "flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"])}"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).location_type, "online")) ? " checked" : ""} type="radio" value="online" class="sr-only"><div class="flex-1 text-center"><div class="text-2xl mb-2">\u{1F4BB}</div><div class="font-medium">Online Service</div><div class="text-sm text-gray-500">Remote/Virtual</div></div></label></div></div>`);
      if (unref(form).location_type !== "online") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label for="city" class="block text-sm font-medium text-gray-700 mb-2"> City * </label><input id="city"${ssrRenderAttr("value", unref(addressForm).city)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., Cape Town"></div><div><label for="province" class="block text-sm font-medium text-gray-700 mb-2"> Province * </label><select id="province" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "") : ssrLooseEqual(unref(addressForm).province, "")) ? " selected" : ""}>Select Province</option><option value="Western Cape"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Western Cape") : ssrLooseEqual(unref(addressForm).province, "Western Cape")) ? " selected" : ""}>Western Cape</option><option value="Eastern Cape"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Eastern Cape") : ssrLooseEqual(unref(addressForm).province, "Eastern Cape")) ? " selected" : ""}>Eastern Cape</option><option value="Northern Cape"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Northern Cape") : ssrLooseEqual(unref(addressForm).province, "Northern Cape")) ? " selected" : ""}>Northern Cape</option><option value="Free State"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Free State") : ssrLooseEqual(unref(addressForm).province, "Free State")) ? " selected" : ""}>Free State</option><option value="KwaZulu-Natal"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "KwaZulu-Natal") : ssrLooseEqual(unref(addressForm).province, "KwaZulu-Natal")) ? " selected" : ""}>KwaZulu-Natal</option><option value="North West"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "North West") : ssrLooseEqual(unref(addressForm).province, "North West")) ? " selected" : ""}>North West</option><option value="Gauteng"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Gauteng") : ssrLooseEqual(unref(addressForm).province, "Gauteng")) ? " selected" : ""}>Gauteng</option><option value="Mpumalanga"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Mpumalanga") : ssrLooseEqual(unref(addressForm).province, "Mpumalanga")) ? " selected" : ""}>Mpumalanga</option><option value="Limpopo"${ssrIncludeBooleanAttr(Array.isArray(unref(addressForm).province) ? ssrLooseContain(unref(addressForm).province, "Limpopo") : ssrLooseEqual(unref(addressForm).province, "Limpopo")) ? " selected" : ""}>Limpopo</option></select></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-white p-6 rounded-lg shadow-sm border"><h3 class="text-lg font-semibold text-gray-900 mb-4">Service Images</h3>`);
      _push(ssrRenderComponent(_component_ImageUpload, {
        modelValue: unref(form).images,
        "onUpdate:modelValue": ($event) => unref(form).images = $event,
        label: "Upload images of your work, service setup, or results",
        multiple: true,
        "max-files": 10,
        required: !unref(isEditing),
        onError: handleImageError
      }, null, _parent));
      _push(`</div><div class="bg-white p-6 rounded-lg shadow-sm border"><h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3><div class="space-y-4"><div><label for="tags" class="block text-sm font-medium text-gray-700 mb-2"> Tags (comma-separated) </label><input id="tags"${ssrRenderAttr("value", unref(tagsInput))} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., design, responsive, mobile-friendly"><p class="mt-1 text-xs text-gray-500">Add relevant keywords to help customers find your service</p></div><div><label for="requirements" class="block text-sm font-medium text-gray-700 mb-2"> Requirements from Client </label><textarea id="requirements" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="What do you need from the client? (one requirement per line)">${ssrInterpolate(unref(requirementsInput))}</textarea></div><div class="flex items-center space-x-6"><label class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).instant_booking) ? ssrLooseContain(unref(form).instant_booking, null) : unref(form).instant_booking) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><span class="ml-2 text-sm text-gray-700">Allow instant booking (no approval needed)</span></label></div></div></div><div class="flex justify-between items-center pt-6 border-t"><button type="button" class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(_ctx.loading || !unref(isFormValid)) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">`);
      if (_ctx.loading) {
        _push(`<span class="flex items-center"><svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> ${ssrInterpolate(unref(isEditing) ? "Updating..." : "Creating...")}</span>`);
      } else {
        _push(`<span>${ssrInterpolate(unref(isEditing) ? "Update Service" : "Create Service")}</span>`);
      }
      _push(`</button></div>`);
      if (_ctx.error) {
        _push(`<div class="p-4 bg-red-50 border border-red-200 rounded-md"><p class="text-sm text-red-600">${ssrInterpolate(_ctx.error)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ServiceForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ServiceForm-C0MOoWaH.mjs.map
