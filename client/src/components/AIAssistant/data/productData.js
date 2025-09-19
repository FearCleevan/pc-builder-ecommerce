//client/src/components/AIAssistant/data/productData.js

// Import all product data
import { allProducts } from '../../MockData/allProducts';
import { laptopProducts } from '../../MockData/laptopProducts';
import { desktopProducts } from '../../MockData/desktopProducts';
import { otherProducts } from '../../MockData/otherProducts';
import { accessoriesProducts } from '../../MockData/accessoriesProducts';

// Import PC building components data
import { caseData } from '../../PCBuilder/Modal/MockData/Case/Case';
import { cpuData } from '../../PCBuilder/Modal/MockData/CPU/CPU';
import { motherboardData } from '../../PCBuilder/Modal/MockData/Motherboard/Motherboard';
import { gpuData } from '../../PCBuilder/Modal/MockData/GPU/GPU';
import { ramData } from '../../PCBuilder/Modal/MockData/RAM/Ram';
import { cpuCoolerData } from '../../PCBuilder/Modal/MockData/CPU Cooler/CPUCooler';
import { storageData } from '../../PCBuilder/Modal/MockData/Storage/Storage';
import { caseFanData } from '../../PCBuilder/Modal/MockData/Case Fan/CaseFan';
import { powerSupplyData } from '../../PCBuilder/Modal/MockData/Power Suppy/PowerSupply';
import { monitorData } from '../../PCBuilder/Modal/MockData/Monitor/Monitor';
import { mouseData } from '../../PCBuilder/Modal/MockData/Mouse/Mouse';
import { keyboardData } from '../../PCBuilder/Modal/MockData/Keyboard/Keyboard';
import { speakerData } from '../../PCBuilder/Modal/MockData/Speaker/Speaker';
import { headphonesData } from '../../PCBuilder/Modal/MockData/Headphones/Headphones';
import { microphoneData } from '../../PCBuilder/Modal/MockData/Microphone/Microphone';
import { webcamData } from '../../PCBuilder/Modal/MockData/Webcam/Webcam';

// Combine all products into a single array
export const allItems = [
  ...allProducts,
  ...laptopProducts,
  ...desktopProducts,
  ...otherProducts,
  ...accessoriesProducts,
  ...caseData,
  ...cpuData,
  ...motherboardData,
  ...gpuData,
  ...ramData,
  ...cpuCoolerData,
  ...storageData,
  ...caseFanData,
  ...powerSupplyData,
  ...monitorData,
  ...mouseData,
  ...keyboardData,
  ...speakerData,
  ...headphonesData,
  ...microphoneData,
  ...webcamData
];

export default allItems;