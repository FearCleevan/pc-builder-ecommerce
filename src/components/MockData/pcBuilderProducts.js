import { caseData } from "../PCBuilder/Modal/MockData/Case/Case";
import { caseFanData } from "../PCBuilder/Modal/MockData/Case Fan/CaseFan";
import { cpuData } from "../PCBuilder/Modal/MockData/CPU/CPU";
import { cpuCoolerData } from "../PCBuilder/Modal/MockData/CPU Cooler/CPUCooler";
import { gpuData } from "../PCBuilder/Modal/MockData/GPU/GPU";
import { headphonesData } from "../PCBuilder/Modal/MockData/Headphones/Headphones";
import { keyboardData } from "../PCBuilder/Modal/MockData/Keyboard/Keyboard";
import { microphoneData } from "../PCBuilder/Modal/MockData/Microphone/Microphone";
import { monitorData } from "../PCBuilder/Modal/MockData/Monitor/Monitor";
import { motherboardData } from "../PCBuilder/Modal/MockData/Motherboard/Motherboard";
import { mouseData } from "../PCBuilder/Modal/MockData/Mouse/Mouse";
import { powerSupplyData } from "../PCBuilder/Modal/MockData/Power Suppy/PowerSupply";
import { ramData } from "../PCBuilder/Modal/MockData/RAM/Ram";
import { speakerData } from "../PCBuilder/Modal/MockData/Speaker/Speaker";
import { storageData } from "../PCBuilder/Modal/MockData/Storage/Storage";
import { webcamData } from "../PCBuilder/Modal/MockData/Webcam/Webcam";

const DEFAULT_RATING = 4.5;
const DEFAULT_REVIEWS = 100;

const getBrandFromSpecs = (specs = {}) => {
  return (
    specs.Manufacturer ||
    specs.Brand ||
    specs["Keyboard Brand"] ||
    specs["Mouse Brand"] ||
    "Generic"
  );
};

const createNormalizer =
  ({ category, subcategoryResolver, seriesResolver }) =>
  (product) => ({
    id: product.id,
    name: product.name,
    brand: getBrandFromSpecs(product.specs),
    description: `${product.name} with detailed specifications for comparison.`,
    img: product.image || "/src/assets/Laptop1.png",
    price: product.price || 0,
    oldPrice: 0,
    rating: DEFAULT_RATING,
    reviews: DEFAULT_REVIEWS,
    category,
    series:
      typeof seriesResolver === "function"
        ? seriesResolver(product)
        : seriesResolver,
    subcategory:
      typeof subcategoryResolver === "function"
        ? subcategoryResolver(product)
        : subcategoryResolver,
    specs: product.specs || {},
    stockCount:
      typeof product.stockCount === "number" ? product.stockCount : 10,
    type: product.type || null,
  });

const normalizeCpu = createNormalizer({
  category: "Components",
  subcategoryResolver: (product) =>
    product.specs?.Manufacturer === "AMD" ? "cpu-amd" : "cpu-intel",
  seriesResolver: (product) =>
    product.specs?.Manufacturer === "AMD"
      ? "amd-processors-series"
      : "intel-processors-series",
});

const normalizeGpu = createNormalizer({
  category: "Components",
  subcategoryResolver: "gpu",
  seriesResolver: "graphics-series",
});

const normalizeMotherboard = createNormalizer({
  category: "Components",
  subcategoryResolver: "motherboard",
  seriesResolver: "motherboards-series",
});

const normalizeRam = createNormalizer({
  category: "Components",
  subcategoryResolver: "memory",
  seriesResolver: "memory-series",
});

const normalizeStorage = createNormalizer({
  category: "Components",
  subcategoryResolver: "storage",
  seriesResolver: "storage-series",
});

const normalizePowerSupply = createNormalizer({
  category: "Components",
  subcategoryResolver: "psu",
  seriesResolver: "power-series",
});

const normalizeCpuCooler = createNormalizer({
  category: "Components",
  subcategoryResolver: "cooler",
  seriesResolver: "cooling-series",
});

const normalizeCaseFan = createNormalizer({
  category: "Components",
  subcategoryResolver: "chassis-fan",
  seriesResolver: "cooling-series",
});

const normalizeCase = createNormalizer({
  category: "Components",
  subcategoryResolver: "pc-case",
  seriesResolver: "chassis-series",
});

const normalizeHeadphones = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "headset",
  seriesResolver: "audio-series",
});

const normalizeKeyboard = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "keyboard",
  seriesResolver: "input-devices-series",
});

const normalizeMouse = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "mouse",
  seriesResolver: "input-devices-series",
});

const normalizeMonitor = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "monitor",
  seriesResolver: "display-series",
});

const normalizeSpeaker = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "speaker",
  seriesResolver: "audio-series",
});

const normalizeMicrophone = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "microphone",
  seriesResolver: "audio-series",
});

const normalizeWebcam = createNormalizer({
  category: "Peripherals",
  subcategoryResolver: "web-digital-camera",
  seriesResolver: "streaming-series",
});

export const pcBuilderProducts = [
  ...cpuData.map(normalizeCpu),
  ...gpuData.map(normalizeGpu),
  ...motherboardData.map(normalizeMotherboard),
  ...ramData.map(normalizeRam),
  ...storageData.map(normalizeStorage),
  ...powerSupplyData.map(normalizePowerSupply),
  ...cpuCoolerData.map(normalizeCpuCooler),
  ...caseFanData.map(normalizeCaseFan),
  ...caseData.map(normalizeCase),
  ...headphonesData.map(normalizeHeadphones),
  ...keyboardData.map(normalizeKeyboard),
  ...mouseData.map(normalizeMouse),
  ...monitorData.map(normalizeMonitor),
  ...speakerData.map(normalizeSpeaker),
  ...microphoneData.map(normalizeMicrophone),
  ...webcamData.map(normalizeWebcam),
];
