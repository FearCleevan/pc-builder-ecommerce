class CloudinaryService {
  static cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  static buildCloudinaryUrl(publicId, options = {}) {
    // Validate cloud name
    if (!this.cloudName || this.cloudName === "undefined") {
      console.error("❌ Cloudinary cloud name is not configured");
      return null;
    }

    const {
      width = 400,
      height = 400,
      crop = "limit",
      quality = "auto",
      format = "auto",
      ...otherOptions
    } = options;

    // Base Cloudinary URL
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;

    // Build transformation parameters
    const transformations = [
      `c_${crop}`,
      `w_${width}`,
      `h_${height}`,
      `q_${quality}`,
      `f_${format}`,
      ...Object.entries(otherOptions).map(([key, value]) => `${key}_${value}`),
    ].join(",");

    const fullUrl = `${baseUrl}/${transformations}/${publicId}`;

    // Validate the URL
    if (!fullUrl || fullUrl.includes("undefined")) {
      console.error("❌ Invalid Cloudinary URL generated:", fullUrl);
      return null;
    }

    return fullUrl;
  }

  static extractProductInfo(productName, componentType = 'cpu') {
    if (!productName) {
      return { brand: "unknown", socket: "unknown", normalizedName: "", formFactor: "unknown" };
    }

    // Normalize product name for matching
    const normalized = productName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    let brand = "unknown";
    let socket = "unknown";
    let formFactor = "unknown";

    if (componentType === 'cpu') {
      // CPU detection logic
      if (normalized.includes("amd") || normalized.includes("ryzen")) {
        brand = "amd";

        if (normalized.includes("am5")) socket = "am5";
        else if (normalized.includes("am4")) socket = "am4";
        else if (normalized.includes("am3")) socket = "am3";
        else if (normalized.includes("strx4")) socket = "strx4";
        else {
          const am4Models = [
            "ryzen 5 3600", "ryzen 5 4500", "ryzen 5 5500", "ryzen 5 5500gt", "ryzen 5 5600",
            "ryzen 5 5600g", "ryzen 5 5600gt", "ryzen 5 5600x-1", "ryzen 5 5600x", "ryzen 5 5600xt",
            "ryzen 7 1700", "ryzen 7 1700x", "ryzen 7 2700", "ryzen 7 2700x", "ryzen 7 3700x",
            "ryzen 7 3800x", "ryzen 7 5700", "ryzen 7 5700g", "ryzen 7 5700x", "ryzen 7 5700x3d",
            "ryzen 7 5800x", "ryzen 7 5800x3d", "ryzen 9 3900x", "ryzen 9 3900xt", "ryzen 9 5900x",
            "ryzen 9 5950x",
          ];

          const am5Models = [
            "ryzen 5 7400f", "ryzen 5 7500f", "ryzen 5 7500x3d", "ryzen 5 7600", "ryzen 5 7600x",
            "ryzen 5 7600x3d", "ryzen 5 8400f", "ryzen 5 8500g", "ryzen 5 8600g", "ryzen 5 9600",
            "ryzen 5 9600x", "ryzen 7 7700", "ryzen 7 7700x", "ryzen 7 7800x3d", "ryzen 7 8700f",
            "ryzen 7 8700g", "ryzen 7 9700x", "ryzen 7 9800x3d", "ryzen 9 7900", "ryzen 9 7900x",
            "ryzen 9 7900x3d", "ryzen 9 7950x", "ryzen 9 7950x3d", "ryzen 9 9900x", "ryzen 9 9900x3d",
            "ryzen 9 9950x", "ryzen 9 9950x3d",
          ];

          if (am5Models.some((m) => normalized.includes(m))) {
            socket = "am5";
          } else if (am4Models.some((m) => normalized.includes(m))) {
            socket = "am4";
          } else {
            if (
              normalized.includes("ryzen 9 7950") ||
              normalized.includes("ryzen 7 7800") ||
              normalized.includes("ryzen 5 7600") ||
              normalized.includes("ryzen 9 7900")
            ) {
              socket = "am5";
            } else if (
              normalized.includes("ryzen 9 5950") ||
              normalized.includes("ryzen 7 5800") ||
              normalized.includes("ryzen 5 5600")
            ) {
              socket = "am4";
            }
          }
        }
      }
      else if (
        normalized.includes("intel") ||
        normalized.includes("core i") ||
        normalized.includes("xeon") ||
        normalized.includes("pentium")
      ) {
        brand = "intel";

        if (normalized.includes("lga1700") || normalized.includes("lga 1700"))
          socket = "lga1700";
        else if (normalized.includes("lga1200") || normalized.includes("lga 1200"))
          socket = "lga1200";
        else if (normalized.includes("lga4189")) socket = "lga4189";
        else {
          if (
            normalized.includes("12100") || normalized.includes("12100f") ||
            normalized.includes("13100") || normalized.includes("13100f") ||
            normalized.includes("14100") || normalized.includes("14100f") ||
            normalized.includes("12400") || normalized.includes("12400f") ||
            normalized.includes("12600") || normalized.includes("12600k") ||
            normalized.includes("12600kf") || normalized.includes("13400") ||
            normalized.includes("13400f") || normalized.includes("13600") ||
            normalized.includes("13600k") || normalized.includes("13600kf") ||
            normalized.includes("14400") || normalized.includes("14400f") ||
            normalized.includes("12700") || normalized.includes("12700f") ||
            normalized.includes("12700k") || normalized.includes("12700kf") ||
            normalized.includes("13700") || normalized.includes("13700f") ||
            normalized.includes("13700k") || normalized.includes("13700kf") ||
            normalized.includes("14600k") || normalized.includes("14700") ||
            normalized.includes("14700f") || normalized.includes("14700k") ||
            normalized.includes("14700kf") || normalized.includes("12900") ||
            normalized.includes("12900k") || normalized.includes("13900") ||
            normalized.includes("13900kf") || normalized.includes("14900k") ||
            normalized.includes("14900ks")
          ) {
            socket = "lga1700";
          }
          else if (
            normalized.includes("10100") || normalized.includes("10100f") ||
            normalized.includes("10105") || normalized.includes("10105f") ||
            normalized.includes("10320") || normalized.includes("10400") ||
            normalized.includes("10400f") || normalized.includes("10500") ||
            normalized.includes("10600") || normalized.includes("10600k") ||
            normalized.includes("10600kf") || normalized.includes("11400") ||
            normalized.includes("11400f") || normalized.includes("11500") ||
            normalized.includes("11600") || normalized.includes("11600k") ||
            normalized.includes("11600kf") || normalized.includes("10700") ||
            normalized.includes("10700f") || normalized.includes("10700k") ||
            normalized.includes("10700kf") || normalized.includes("11700") ||
            normalized.includes("11700f") || normalized.includes("11700k") ||
            normalized.includes("11700kf") || normalized.includes("10850k") ||
            normalized.includes("10900") || normalized.includes("10900f") ||
            normalized.includes("10900k") || normalized.includes("10900kf") ||
            normalized.includes("11900") || normalized.includes("11900f") ||
            normalized.includes("11900k") || normalized.includes("11900kf")
          ) {
            socket = "lga1200";
          }
        }
      }
    } else if (componentType === 'motherboard') {
      // Motherboard detection logic
      if (normalized.includes("asus")) brand = "asus";
      else if (normalized.includes("gigabyte")) brand = "gigabyte";
      else if (normalized.includes("msi")) brand = "msi";
      else if (normalized.includes("asrock")) brand = "asrock";
      else if (normalized.includes("biostar")) brand = "biostar";

      if (normalized.includes("am4")) socket = "am4";
      else if (normalized.includes("am5")) socket = "am5";
      else if (normalized.includes("lga1700") || normalized.includes("lga 1700")) socket = "lga1700";
      else if (normalized.includes("lga1200") || normalized.includes("lga 1200")) socket = "lga1200";

      if (normalized.includes("mini itx")) formFactor = "mini-itx";
      else if (normalized.includes("micro atx")) formFactor = "micro-atx";
      else if (normalized.includes("atx")) formFactor = "atx";
      else if (normalized.includes("eatx")) formFactor = "eatx";
    }

    return {
      brand,
      socket,
      formFactor,
      normalizedName: this.normalizeForCloudinary(productName),
    };
  }

  static normalizeForCloudinary(productName) {
    if (!productName) return "";

    return productName
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  static getProcessorImage(productName, options = {}) {
    try {
      const { brand, socket, normalizedName } =
        this.extractProductInfo(productName, 'cpu');

      if (!normalizedName) {
        console.warn("❌ Empty normalized name for product:", productName);
        return null;
      }

      // CPU path: pc-builder/cpu/{brand}/{socket}/{productName}
      const publicId = `pc-builder/cpu/${brand}/${socket}/${normalizedName}`;
      const url = this.buildCloudinaryUrl(publicId, options);

      if (!url) {
        console.warn("❌ Could not generate Cloudinary URL for:", productName);
        return null;
      }

      return url;
    } catch (error) {
      console.warn(
        `❌ Error generating processor image for ${productName}:`,
        error
      );
      return null;
    }
  }

  static getMotherboardImage(productName, options = {}) {
    try {
      const { formFactor, socket, normalizedName } =
        this.extractProductInfo(productName, 'motherboard');

      if (!normalizedName) {
        console.warn("❌ Empty normalized name for motherboard:", productName);
        return null;
      }

      // Motherboard path: pc-builder/motherboard/{form-factor}/{socket}/{productName}
      // Note: No brand folder for motherboards based on your structure
      const publicId = `pc-builder/motherboard/${formFactor}/${socket}/${normalizedName}`;
      const url = this.buildCloudinaryUrl(publicId, options);

      if (!url) {
        console.warn("❌ Could not generate Cloudinary URL for motherboard:", productName);
        return null;
      }

      return url;
    } catch (error) {
      console.warn(
        `❌ Error generating motherboard image for ${productName}:`,
        error
      );
      return null;
    }
  }

  static getDefaultImage(category, brand = "default", options = {}) {
    try {
      const publicId = `pc-builder/${category}/${brand}/default`;
      return this.buildCloudinaryUrl(publicId, options);
    } catch (error) {
      console.warn("❌ Error generating default image:", error);
      return null;
    }
  }

  // Method to check if image exists (for preloading)
  static async checkImageExists(imageUrl) {
    if (!imageUrl) return false;

    try {
      const response = await fetch(imageUrl, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.warn("❌ Error checking image existence:", imageUrl, error);
      return false;
    }
  }

  // Generic method to get any component image
  static getComponentImage(componentType, productName, options = {}) {
    switch (componentType) {
      case 'cpu':
        return this.getProcessorImage(productName, options);
      case 'motherboard':
        return this.getMotherboardImage(productName, options);
      // Add other component types as needed
      default:
        return this.getDefaultImage(componentType, 'default', options);
    }
  }
}

export default CloudinaryService;