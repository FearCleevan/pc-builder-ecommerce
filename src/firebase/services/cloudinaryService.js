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

  static extractProductInfo(productName) {
    if (!productName) {
      return { brand: "unknown", socket: "unknown", normalizedName: "" };
    }

    // Normalize product name for matching
    const normalized = productName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Extract brand and socket information
    let brand = "unknown";
    let socket = "unknown";

    // Detect AMD processors
    // Insert/replace this block where you detect AMD/RYZEN and decide socket.
    // It uses arrays of normalized substrings derived from your screenshots (am4 and am5 folders).
    if (normalized.includes("amd") || normalized.includes("ryzen")) {
      brand = "amd";

      // quick explicit token checks (keep any direct am*/strx4/am3 tokens)
      if (normalized.includes("am5")) socket = "am5";
      else if (normalized.includes("am4")) socket = "am4";
      else if (normalized.includes("am3")) socket = "am3";
      else if (normalized.includes("strx4")) socket = "strx4";
      else {
        // Lists derived from the image file names you provided.
        // All entries are lowercased / normalized substrings to match `normalized`.
        const am4Models = [
          "ryzen 5 3600",
          "ryzen 5 4500",
          "ryzen 5 5500",
          "ryzen 5 5500gt",
          "ryzen 5 5600",
          "ryzen 5 5600g",
          "ryzen 5 5600gt",
          "ryzen 5 5600x-1",
          "ryzen 5 5600x",
          "ryzen 5 5600xt",
          "ryzen 7 1700",
          "ryzen 7 1700x",
          "ryzen 7 2700",
          "ryzen 7 2700x",
          "ryzen 7 3700x",
          "ryzen 7 3800x",
          "ryzen 7 5700",
          "ryzen 7 5700g",
          "ryzen 7 5700x",
          "ryzen 7 5700x3d",
          "ryzen 7 5800x",
          "ryzen 7 5800x3d",
          "ryzen 9 3900x",
          "ryzen 9 3900xt",
          "ryzen 9 5900x",
          "ryzen 9 5950x",
        ];

        const am5Models = [
          "ryzen 5 7400f",
          "ryzen 5 7500f",
          "ryzen 5 7500x3d",
          "ryzen 5 7600",
          "ryzen 5 7600x",
          "ryzen 5 7600x3d",
          "ryzen 5 8400f",
          "ryzen 5 8500g",
          "ryzen 5 8600g",
          "ryzen 5 9600",
          "ryzen 5 9600x",
          "ryzen 7 7700",
          "ryzen 7 7700x",
          "ryzen 7 7800x3d",
          "ryzen 7 8700f",
          "ryzen 7 8700g",
          "ryzen 7 9700x",
          "ryzen 7 9800x3d",
          "ryzen 9 7900",
          "ryzen 9 7900x",
          "ryzen 9 7900x3d",
          "ryzen 9 7950x",
          "ryzen 9 7950x3d",
          "ryzen 9 9900x",
          "ryzen 9 9900x3d",
          "ryzen 9 9950x",
          "ryzen 9 9950x3d",
        ];

        // If any am5 model substring is present -> AM5
        if (am5Models.some((m) => normalized.includes(m))) {
          socket = "am5";
        }
        // Else if any am4 model substring is present -> AM4
        else if (am4Models.some((m) => normalized.includes(m))) {
          socket = "am4";
        }
        // Fallback: preserve your original heuristic for common Ryzen strings
        else {
          // Default socket based on Ryzen generation (keeps original checks)
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
    // Detect Intel processors
    else if (
      normalized.includes("intel") ||
      normalized.includes("core i") ||
      normalized.includes("xeon") ||
      normalized.includes("pentium")
    ) {
      brand = "intel";

      // Explicit socket detection
      if (normalized.includes("lga1700") || normalized.includes("lga 1700"))
        socket = "lga1700";
      else if (
        normalized.includes("lga1200") ||
        normalized.includes("lga 1200")
      )
        socket = "lga1200";
      else if (normalized.includes("lga4189")) socket = "lga4189";
      else {
        // ============================
        // AUTO-DETECT SOCKET BASED ON CPU MODEL NUMBERS
        // ============================

        // -------- LGA 1700 MODELS --------
        if (
          // i3 12th/13th/14th gen
          normalized.includes("12100") ||
          normalized.includes("12100f") ||
          normalized.includes("13100") ||
          normalized.includes("13100f") ||
          normalized.includes("14100") ||
          normalized.includes("14100f") ||
          // i5 12th–14th gen
          normalized.includes("12400") ||
          normalized.includes("12400f") ||
          normalized.includes("12600") ||
          normalized.includes("12600k") ||
          normalized.includes("12600kf") ||
          normalized.includes("13400") ||
          normalized.includes("13400f") ||
          normalized.includes("13600") ||
          normalized.includes("13600k") ||
          normalized.includes("13600kf") ||
          normalized.includes("14400") ||
          normalized.includes("14400f") ||
          // i7 12th–14th gen
          normalized.includes("12700") ||
          normalized.includes("12700f") ||
          normalized.includes("12700k") ||
          normalized.includes("12700kf") ||
          normalized.includes("13700") ||
          normalized.includes("13700f") ||
          normalized.includes("13700k") ||
          normalized.includes("13700kf") ||
          normalized.includes("14700") ||
          normalized.includes("14700f") ||
          normalized.includes("14700k") ||
          normalized.includes("14700kf") ||
          // i9 12th–14th gen
          normalized.includes("12900") ||
          normalized.includes("12900k") ||
          normalized.includes("13900") ||
          normalized.includes("13900kf") ||
          normalized.includes("14900k") ||
          normalized.includes("14900ks")
        ) {
          socket = "lga1700";
        }

        // -------- LGA 1200 MODELS --------
        else if (
          // i3 10th gen
          normalized.includes("10100") ||
          normalized.includes("10100f") ||
          normalized.includes("10105") ||
          normalized.includes("10105f") ||
          normalized.includes("10320") ||
          // i5 10th/11th gen
          normalized.includes("10400") ||
          normalized.includes("10400f") ||
          normalized.includes("10500") ||
          normalized.includes("10600") ||
          normalized.includes("10600k") ||
          normalized.includes("10600kf") ||
          normalized.includes("11400") ||
          normalized.includes("11400f") ||
          normalized.includes("11500") ||
          normalized.includes("11600") ||
          normalized.includes("11600k") ||
          normalized.includes("11600kf") ||
          // i7 10th/11th gen
          normalized.includes("10700") ||
          normalized.includes("10700f") ||
          normalized.includes("10700k") ||
          normalized.includes("10700kf") ||
          normalized.includes("11700") ||
          normalized.includes("11700f") ||
          normalized.includes("11700k") ||
          normalized.includes("11700kf") ||
          // i9 10th/11th gen
          normalized.includes("10850k") ||
          normalized.includes("10900") ||
          normalized.includes("10900f") ||
          normalized.includes("10900k") ||
          normalized.includes("10900kf") ||
          normalized.includes("11900") ||
          normalized.includes("11900f") ||
          normalized.includes("11900k") ||
          normalized.includes("11900kf")
        ) {
          socket = "lga1200";
        }
      }
    }

    return {
      brand,
      socket,
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
        this.extractProductInfo(productName);

      if (!normalizedName) {
        console.warn("❌ Empty normalized name for product:", productName);
        return null;
      }

      // Try the exact path first
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
}

export default CloudinaryService;
