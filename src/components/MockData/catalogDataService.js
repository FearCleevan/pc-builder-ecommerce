import { getAdminProducts } from "../../firebase/services/productService";
import { productsCatalog } from "./productsCatalog";

const DEFAULT_IMAGE = "/placeholder-image.jpg";

const resolveSpecs = (product = {}) => {
  if (product.specs && typeof product.specs === "object") {
    return product.specs;
  }

  if (product.specifications?.general && typeof product.specifications.general === "object") {
    return product.specifications.general;
  }

  return {};
};

const resolveImages = (product = {}) => {
  const imageList = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  if (imageList.length > 0) return imageList;

  if (product.img) return [product.img];
  if (product.image) return [product.image];

  return [DEFAULT_IMAGE];
};

const toSlug = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const COMPONENT_FILTER_MAP = {
  cpu: {
    category: "Components",
    subcategory: (specs) => (String(specs.Manufacturer || "").toLowerCase() === "amd" ? "cpu-amd" : "cpu-intel"),
    series: (specs) =>
      String(specs.Manufacturer || "").toLowerCase() === "amd"
        ? "amd-processors-series"
        : "intel-processors-series",
  },
  gpu: { category: "Components", subcategory: "gpu", series: "graphics-series" },
  motherboard: {
    category: "Components",
    subcategory: "motherboard",
    series: "motherboards-series",
  },
  ram: { category: "Components", subcategory: "memory", series: "memory-series" },
  storage: { category: "Components", subcategory: "storage", series: "storage-series" },
  "power-supply": { category: "Components", subcategory: "psu", series: "power-series" },
  psu: { category: "Components", subcategory: "psu", series: "power-series" },
  "cpu-cooler": { category: "Components", subcategory: "cooler", series: "cooling-series" },
  "case-fan": { category: "Components", subcategory: "chassis-fan", series: "cooling-series" },
  case: { category: "Components", subcategory: "pc-case", series: "chassis-series" },
  keyboard: {
    category: "Peripherals",
    subcategory: "keyboard",
    series: "input-devices-series",
  },
  mouse: { category: "Peripherals", subcategory: "mouse", series: "input-devices-series" },
  headphones: { category: "Peripherals", subcategory: "headset", series: "audio-series" },
  monitor: { category: "Peripherals", subcategory: "monitor", series: "display-series" },
  microphone: {
    category: "Peripherals",
    subcategory: "microphone",
    series: "audio-series",
  },
  speaker: { category: "Peripherals", subcategory: "speaker", series: "audio-series" },
  webcam: {
    category: "Peripherals",
    subcategory: "web-digital-camera",
    series: "streaming-series",
  },
};

const CATEGORY_TO_COMPONENT = {
  cpu: "cpu",
  gpu: "gpu",
  motherboard: "motherboard",
  ram: "ram",
  storage: "storage",
  "power supply": "power-supply",
  "power-supply": "power-supply",
  psu: "power-supply",
  "cpu cooler": "cpu-cooler",
  "cpu-cooler": "cpu-cooler",
  "case fan": "case-fan",
  "case-fan": "case-fan",
  case: "case",
  keyboard: "keyboard",
  mouse: "mouse",
  headphones: "headphones",
  monitor: "monitor",
  microphone: "microphone",
  speaker: "speaker",
  webcam: "webcam",
};

const resolveComponentKey = (product = {}) => {
  if (product.componentType) return String(product.componentType).toLowerCase();

  const categoryKey = toSlug(product.category || "");
  return CATEGORY_TO_COMPONENT[categoryKey] || categoryKey || "component";
};

const resolveCategoryMeta = (product, specs) => {
  const componentKey = resolveComponentKey(product);
  const mapped = COMPONENT_FILTER_MAP[componentKey];

  if (mapped) {
    return {
      category: mapped.category,
      subcategory:
        typeof mapped.subcategory === "function" ? mapped.subcategory(specs) : mapped.subcategory,
      series: typeof mapped.series === "function" ? mapped.series(specs) : mapped.series,
    };
  }

  const rawCategory = String(product.category || "");
  const isTopLevelCategory = ["Components", "Peripherals", "Accessories", "OS & Softwares"].includes(
    rawCategory
  );

  return {
    category: isTopLevelCategory ? rawCategory : "Components",
    subcategory: toSlug(product.subcategory || product.category || "misc"),
    series: toSlug(product.series || "custom-series"),
  };
};

const buildDescription = (productName, specs = {}) => {
  const summary = Object.entries(specs)
    .slice(0, 6)
    .map(([key, value]) => `${key}: ${value}`)
    .join(". ");
  return summary || `${productName} product listing`;
};

const normalizeFirestoreCatalogProduct = (product = {}, index = 0) => {
  const specs = resolveSpecs(product);
  const images = resolveImages(product);
  const primaryImage = images[0] || DEFAULT_IMAGE;
  const { category, subcategory, series } = resolveCategoryMeta(product, specs);
  const productId = String(product.id || product.documentId || `firebase-product-${index}`);

  return {
    id: productId,
    name: product.name || "Untitled Product",
    brand:
      product.brand ||
      specs.Manufacturer ||
      specs.Brand ||
      specs["Keyboard Brand"] ||
      specs["Mouse Brand"] ||
      "Generic",
    description: product.description || buildDescription(product.name || "Product", specs),
    img: primaryImage,
    image: primaryImage,
    images,
    price: Number(product.price || 0),
    oldPrice: Number(product.oldPrice || 0),
    rating: Number(product.ratings?.average || product.rating || 4.5),
    reviews: Number(product.ratings?.count || product.reviews || 0),
    category,
    series,
    subcategory,
    specs,
    stockCount: Number(product.stockCount ?? product.stock ?? 0),
    stockStatus: product.stockStatus || (Number(product.stockCount ?? product.stock ?? 0) > 0 ? "in_stock" : "out_of_stock"),
    source: "firestore",
    documentId: product.documentId,
    componentType: product.componentType || resolveComponentKey(product),
  };
};

const dedupeById = (products = []) => {
  const byId = new Map();
  products.forEach((product) => {
    byId.set(String(product.id), product);
  });
  return Array.from(byId.values());
};

export const getUnifiedProductsCatalog = async () => {
  try {
    const firebaseProducts = await getAdminProducts();
    const normalizedFirebaseProducts = firebaseProducts.map((item, index) =>
      normalizeFirestoreCatalogProduct(item, index)
    );

    // Keep Firebase items first so recently added products are immediately visible.
    return dedupeById([...normalizedFirebaseProducts, ...productsCatalog]);
  } catch {
    return productsCatalog;
  }
};

