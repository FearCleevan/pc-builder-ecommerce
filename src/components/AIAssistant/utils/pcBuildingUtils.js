//client/src/components/AIAssistant/utils/pcBuildingUtils.js
/**
 * Generates PC part recommendations based on type, budget, and purpose
 * @param {string} componentType - Type of component (cpu, gpu, etc.)
 * @param {number} budget - Budget for the component
 * @param {string} purpose - Intended use (gaming, workstation, etc.)
 * @param {object} componentData - All component data
 * @returns {array} Recommended components
 */
export const generatePCPartRecommendation = (componentType, budget, purpose, componentData) => {
  let components = [];

  switch (componentType.toLowerCase()) {
    case 'cpu':
      components = [...componentData.cpuData];
      break;
    case 'gpu':
    case 'graphics card':
      components = [...componentData.gpuData];
      break;
    case 'motherboard':
      components = [...componentData.motherboardData];
      break;
    case 'ram':
    case 'memory':
      components = [...componentData.ramData];
      break;
    case 'storage':
      components = [...componentData.storageData];
      break;
    case 'power supply':
    case 'psu':
      components = [...componentData.powerSupplyData];
      break;
    case 'case':
      components = [...componentData.caseData];
      break;
    case 'cooler':
    case 'cpu cooler':
      components = [...componentData.cpuCoolerData];
      break;
    default:
      return [];
  }

  // Filter by budget
  if (budget) {
    components = components.filter(comp => comp.price <= budget);
  }

  // Filter by purpose
  if (purpose === 'gaming') {
    components = components.filter(comp =>
      comp.specs?.series?.toLowerCase().includes('gaming') ||
      comp.description?.toLowerCase().includes('gaming')
    );
  } else if (purpose === 'workstation') {
    components = components.filter(comp =>
      comp.specs?.series?.toLowerCase().includes('workstation') ||
      comp.description?.toLowerCase().includes('professional')
    );
  }

  return components
    .sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.price - b.price)
    .slice(0, 3);
};

/**
 * Builds a complete PC based on budget and purpose
 * @param {number} budget - Total budget for the PC
 * @param {string} purpose - Intended use (gaming, workstation, etc.)
 * @param {object} componentData - All component data
 * @returns {object} PC build object with components and total price
 */
export const buildCompletePC = (budget, purpose, componentData) => {
  const budgetAllocation = {
    cpu: purpose === 'gaming' ? 0.25 : 0.3,
    gpu: purpose === 'gaming' ? 0.35 : purpose === 'creative' ? 0.4 : 0.2,
    motherboard: 0.1,
    ram: 0.05,
    storage: 0.1,
    powerSupply: 0.05,
    case: 0.05,
    cooler: 0.05
  };

  const build = {};
  let totalPrice = 0;

  // Select components based on budget allocation
  Object.keys(budgetAllocation).forEach(componentType => {
    const componentBudget = budget * budgetAllocation[componentType];
    const recommendations = generatePCPartRecommendation(componentType, componentBudget, purpose, componentData);

    if (recommendations.length > 0) {
      build[componentType] = recommendations[0];
      totalPrice += recommendations[0].price;
    }
  });

  return { build, totalPrice };
};

/**
 * Creates a PC build card object
 * @param {object} build - PC build object
 * @param {number} totalPrice - Total price of the build
 * @param {string} purpose - Intended use of the build
 * @returns {object} PC build card object
 */
export const generatePCBuildCard = (build, totalPrice, purpose) => {
  return {
    type: 'pcBuild',
    build: build,
    totalPrice: totalPrice,
    purpose: purpose,
    timestamp: new Date()
  };
};

/**
 * Checks compatibility of a PC build
 * @param {object} build - PC build object
 * @returns {object} Compatibility check result with issues and compatibility status
 */
export const checkBuildCompatibility = (build) => {
  const issues = [];

  // Check CPU and motherboard compatibility
  if (build.cpu && build.motherboard) {
    const cpuSocket = build.cpu.specs?.socket;
    const moboSocket = build.motherboard.specs?.socket;
    if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
      issues.push(`⚠️ CPU socket (${cpuSocket}) doesn't match motherboard socket (${moboSocket})`);
    }
  }

  // Check RAM compatibility
  if (build.ram && build.motherboard) {
    const ramType = build.ram.specs?.type;
    const moboRamType = build.motherboard.specs?.memoryType;
    if (ramType && moboRamType && ramType !== moboRamType) {
      issues.push(`⚠️ RAM type (${ramType}) doesn't match motherboard support (${moboRamType})`);
    }
  }

  // Check power supply wattage
  if (build.powerSupply) {
    const psuWattage = parseInt(build.powerSupply.specs?.wattage) || 0;
    const estimatedPower = Object.values(build).reduce((total, component) => {
      return total + (component.specs?.tdp || component.specs?.powerConsumption || 0);
    }, 0);

    if (psuWattage < estimatedPower * 1.2) {
      issues.push(`⚠️ Power supply (${psuWattage}W) may be insufficient for estimated load (${Math.round(estimatedPower)}W)`);
    }
  }

  return { issues, isCompatible: issues.length === 0 };
};