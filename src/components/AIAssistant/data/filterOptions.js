//client/src/components/AIAssistant/data/filterOptions.js
import { categories, getSeriesItems, gpuOptions, processorOptions, screenSizeOptions, ramOptions, storageOptions } from '../../MockData/LaptopMockData';

export const filterOptions = {
  categories,
  series: getSeriesItems(),
  gpuOptions,
  processorOptions,
  screenSizeOptions,
  ramOptions,
  storageOptions
};

export default filterOptions;