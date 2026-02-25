export const REQUIRED_COMPONENTS = [
  { id: "case", label: "Case" },
  { id: "cpu", label: "CPU" },
  { id: "motherboard", label: "Motherboard" },
  { id: "gpu", label: "GPU" },
  { id: "ram", label: "RAM" },
  { id: "storage", label: "Storage" },
  { id: "powerSupply", label: "Power Supply" },
];

const WATTAGE_DEFAULTS = {
  motherboard: 60,
  ram: 8,
  storage: 8,
  cpuCooler: 8,
  caseFan: 6,
  monitor: 35,
  mouse: 5,
  keyboard: 5,
  speaker: 20,
  headphones: 5,
  microphone: 3,
  webcam: 4,
  soundCard: 12,
  networkCard: 8,
  captureCard: 15,
  vrHeadset: 25,
  thermalCompound: 1,
  operatingSystem: 0,
  accessory: 5,
};

const toLower = (value) => String(value || "").trim().toLowerCase();

export const parseNumericValue = (value) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;
  const normalized = String(value).replace(/,/g, "");
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const getComponentSpec = (component, key) => component?.specs?.[key];

const normalizeSocket = (socket) => toLower(socket).replace(/\s+/g, "");

const normalizeFormFactor = (value) => {
  const normalized = toLower(value).replace(/-/g, " ");
  if (normalized.includes("mini itx")) return "mini-itx";
  if (normalized.includes("micro") && normalized.includes("atx")) return "micro-atx";
  if (normalized.includes("atx")) return "atx";
  return normalized;
};

const getCaseSupportedFormFactors = (caseComponent) => {
  const caseFormFactor = normalizeFormFactor(getComponentSpec(caseComponent, "Form Factor"));
  if (caseFormFactor.includes("mini-itx")) return ["mini-itx"];
  if (caseFormFactor.includes("micro-atx")) return ["micro-atx", "mini-itx"];
  if (caseFormFactor.includes("atx")) return ["atx", "micro-atx", "mini-itx"];
  return [];
};

const isCpuCoolerSocketCompatible = (cooler, cpu) => {
  if (!cooler || !cpu) return true;
  const socket = getComponentSpec(cpu, "Socket");
  if (!socket) return true;
  const compatibilityBlob = toLower(
    `${getComponentSpec(cooler, "Compatibility")} ${getComponentSpec(cooler, "Socket Support")}`
  );
  if (!compatibilityBlob) return true;
  return compatibilityBlob.includes(toLower(socket));
};

const getStorageWattage = (storage) => {
  const type = toLower(getComponentSpec(storage, "Type"));
  const isNvme = toLower(getComponentSpec(storage, "NVMe")) === "yes";
  if (type.includes("hdd")) return 10;
  if (isNvme) return 6;
  return 4;
};

const getCpuCoolerWattage = (cooler) => {
  const isWater = toLower(getComponentSpec(cooler, "Water Cooled")) === "yes";
  const fanCount = parseNumericValue(getComponentSpec(cooler, "Fan Quantity")) || 1;
  return isWater ? Math.max(10, fanCount * 4) : Math.max(6, fanCount * 3);
};

const getCaseFanWattage = (fan) => {
  const rpm = parseNumericValue(getComponentSpec(fan, "RPM"));
  if (rpm >= 2000) return 5;
  return 3;
};

const getRamWattage = (ram) => {
  const modules = parseNumericValue(getComponentSpec(ram, "Number of Modules")) || 2;
  return Math.max(6, modules * 4);
};

export const getMissingRequiredComponents = (selectedComponents = {}) =>
  REQUIRED_COMPONENTS.filter(({ id }) => !selectedComponents[id]);

export const getCompatibilityReport = (selectedComponents = {}) => {
  const issues = [];

  const cpu = selectedComponents.cpu;
  const motherboard = selectedComponents.motherboard;
  const ram = selectedComponents.ram;
  const pcCase = selectedComponents.case;
  const gpu = selectedComponents.gpu;
  const cpuCooler = selectedComponents.cpuCooler;
  const powerSupply = selectedComponents.powerSupply;

  if (cpu && motherboard) {
    const cpuSocket = normalizeSocket(getComponentSpec(cpu, "Socket"));
    const motherboardSocket = normalizeSocket(getComponentSpec(motherboard, "Socket"));
    if (cpuSocket && motherboardSocket && cpuSocket !== motherboardSocket) {
      issues.push({
        id: "cpu-motherboard-socket",
        level: "error",
        message: `CPU socket (${getComponentSpec(cpu, "Socket")}) does not match motherboard socket (${getComponentSpec(motherboard, "Socket")}).`,
      });
    }
  }

  if (motherboard && ram) {
    const motherboardRamType = toLower(getComponentSpec(motherboard, "RAM Type"));
    const ramType = toLower(getComponentSpec(ram, "RAM Type"));
    if (motherboardRamType && ramType && motherboardRamType !== ramType) {
      issues.push({
        id: "ram-type",
        level: "error",
        message: `RAM type (${getComponentSpec(ram, "RAM Type")}) is not supported by motherboard (${getComponentSpec(motherboard, "RAM Type")}).`,
      });
    }
  }

  if (pcCase && motherboard) {
    const motherboardFormFactor = normalizeFormFactor(getComponentSpec(motherboard, "Form Factor"));
    const supported = getCaseSupportedFormFactors(pcCase);
    if (motherboardFormFactor && supported.length > 0 && !supported.includes(motherboardFormFactor)) {
      issues.push({
        id: "motherboard-case-formfactor",
        level: "error",
        message: `Motherboard form factor (${getComponentSpec(motherboard, "Form Factor")}) is not supported by the selected case.`,
      });
    }
  }

  if (pcCase && gpu) {
    const maxGpuLength = parseNumericValue(getComponentSpec(pcCase, "Max GPU Length"));
    const gpuLength = parseNumericValue(getComponentSpec(gpu, "Card Length"));
    if (maxGpuLength > 0 && gpuLength > 0 && gpuLength > maxGpuLength) {
      issues.push({
        id: "gpu-case-length",
        level: "error",
        message: `GPU length (${gpuLength} mm) exceeds case max GPU length (${maxGpuLength} mm).`,
      });
    }
  }

  if (pcCase && cpuCooler) {
    const waterCooled = toLower(getComponentSpec(cpuCooler, "Water Cooled")) === "yes";
    if (!waterCooled) {
      const maxCoolerHeight = parseNumericValue(getComponentSpec(pcCase, "Max CPU Cooler Height"));
      const coolerHeight = parseNumericValue(getComponentSpec(cpuCooler, "Height"));
      if (maxCoolerHeight > 0 && coolerHeight > 0 && coolerHeight > maxCoolerHeight) {
        issues.push({
          id: "cooler-case-height",
          level: "error",
          message: `CPU cooler height (${coolerHeight} mm) exceeds case max CPU cooler height (${maxCoolerHeight} mm).`,
        });
      }
    }

    if (!isCpuCoolerSocketCompatible(cpuCooler, cpu)) {
      issues.push({
        id: "cooler-cpu-socket",
        level: "error",
        message: "CPU cooler socket support does not include the selected CPU socket.",
      });
    }
  }

  const wattageReport = getWattageReport(selectedComponents);
  if (powerSupply) {
    const psuWattage = parseNumericValue(getComponentSpec(powerSupply, "Wattage"));
    if (psuWattage > 0 && psuWattage < wattageReport.recommendedPsuWattage) {
      issues.push({
        id: "psu-wattage",
        level: "warning",
        message: `Power supply wattage (${psuWattage} W) is lower than recommended (${wattageReport.recommendedPsuWattage} W).`,
      });
    }
  }

  const missingRequired = getMissingRequiredComponents(selectedComponents);

  return {
    isCompatible: issues.filter((issue) => issue.level === "error").length === 0,
    issues,
    missingRequired,
  };
};

export const getWattageReport = (selectedComponents = {}) => {
  const entries = Object.entries(selectedComponents).filter(([, component]) => component);
  const breakdown = entries.map(([category, component]) => {
    let watts = 0;
    const directTdp = parseNumericValue(getComponentSpec(component, "TDP"));
    const directWattage = parseNumericValue(getComponentSpec(component, "Wattage"));

    if (category === "cpu") watts = directTdp || 95;
    else if (category === "gpu") watts = directTdp || 180;
    else if (category === "powerSupply") watts = 0;
    else if (category === "ram") watts = getRamWattage(component);
    else if (category === "storage") watts = getStorageWattage(component);
    else if (category === "cpuCooler") watts = getCpuCoolerWattage(component);
    else if (category === "caseFan") watts = getCaseFanWattage(component);
    else watts = directWattage || directTdp || WATTAGE_DEFAULTS[category] || 5;

    return {
      category,
      name: component.name || category,
      watts: Math.round(watts),
    };
  });

  const totalEstimatedWattage = breakdown.reduce((sum, item) => sum + item.watts, 0);
  const recommendedPsuWattage = Math.ceil(totalEstimatedWattage * 1.25 / 50) * 50;

  return {
    breakdown,
    totalEstimatedWattage,
    recommendedPsuWattage: Math.max(450, recommendedPsuWattage),
  };
};

export const isComponentCompatibleWithBuild = (selectedComponents, category, candidateComponent) => {
  if (!candidateComponent || !category) return true;
  const proposed = {
    ...(selectedComponents || {}),
    [category]: candidateComponent,
  };

  const cpu = proposed.cpu;
  const motherboard = proposed.motherboard;
  const ram = proposed.ram;
  const pcCase = proposed.case;
  const gpu = proposed.gpu;

  if (category === "cpu" && motherboard) {
    return normalizeSocket(getComponentSpec(candidateComponent, "Socket")) === normalizeSocket(getComponentSpec(motherboard, "Socket"));
  }

  if (category === "motherboard") {
    if (cpu && normalizeSocket(getComponentSpec(cpu, "Socket")) !== normalizeSocket(getComponentSpec(candidateComponent, "Socket"))) {
      return false;
    }
    if (ram && toLower(getComponentSpec(ram, "RAM Type")) !== toLower(getComponentSpec(candidateComponent, "RAM Type"))) {
      return false;
    }
    if (pcCase) {
      const supported = getCaseSupportedFormFactors(pcCase);
      const formFactor = normalizeFormFactor(getComponentSpec(candidateComponent, "Form Factor"));
      if (supported.length > 0 && formFactor && !supported.includes(formFactor)) return false;
    }
  }

  if (category === "ram" && motherboard) {
    return toLower(getComponentSpec(candidateComponent, "RAM Type")) === toLower(getComponentSpec(motherboard, "RAM Type"));
  }

  if (category === "case") {
    if (motherboard) {
      const supported = getCaseSupportedFormFactors(candidateComponent);
      const motherboardForm = normalizeFormFactor(getComponentSpec(motherboard, "Form Factor"));
      if (supported.length > 0 && motherboardForm && !supported.includes(motherboardForm)) return false;
    }
    if (gpu) {
      const maxGpuLength = parseNumericValue(getComponentSpec(candidateComponent, "Max GPU Length"));
      const gpuLength = parseNumericValue(getComponentSpec(gpu, "Card Length"));
      if (maxGpuLength > 0 && gpuLength > 0 && gpuLength > maxGpuLength) return false;
    }
  }

  if (category === "gpu" && pcCase) {
    const maxGpuLength = parseNumericValue(getComponentSpec(pcCase, "Max GPU Length"));
    const gpuLength = parseNumericValue(getComponentSpec(candidateComponent, "Card Length"));
    if (maxGpuLength > 0 && gpuLength > 0 && gpuLength > maxGpuLength) return false;
  }

  if (category === "cpuCooler") {
    if (cpu && !isCpuCoolerSocketCompatible(candidateComponent, cpu)) return false;
    if (pcCase && toLower(getComponentSpec(candidateComponent, "Water Cooled")) !== "yes") {
      const maxCoolerHeight = parseNumericValue(getComponentSpec(pcCase, "Max CPU Cooler Height"));
      const coolerHeight = parseNumericValue(getComponentSpec(candidateComponent, "Height"));
      if (maxCoolerHeight > 0 && coolerHeight > 0 && coolerHeight > maxCoolerHeight) return false;
    }
  }

  if (category === "powerSupply") {
    const proposedWithoutPsu = {
      ...proposed,
      powerSupply: null,
    };
    const proposedWattageReport = getWattageReport(proposedWithoutPsu);
    const psuWattage = parseNumericValue(getComponentSpec(candidateComponent, "Wattage"));
    if (psuWattage > 0 && psuWattage < proposedWattageReport.recommendedPsuWattage) return false;
  }

  if (category === "caseFan") {
    return true;
  }

  return true;
};
