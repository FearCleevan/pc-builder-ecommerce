class CloudinaryService {
  static cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "").trim();
  static uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "pcbuild-ecommerce").trim();
  static maxFileSizeBytes = 10 * 1024 * 1024;

  static async uploadImage(file, folder = "pc-builder/admin-products") {
    if (!file) {
      throw new Error("No file selected for upload.");
    }

    if (!this.cloudName || !this.uploadPreset) {
      throw new Error("Cloudinary config missing. Check env variables.");
    }

    if (file.size > this.maxFileSizeBytes) {
      throw new Error(
        `Image "${file.name}" is too large. Max allowed size is 10MB for unsigned uploads.`
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.uploadPreset);
    if (folder) {
      formData.append("folder", folder);
    }

    // Use auto/upload so supported image variants (e.g. HEIC/WebP) are accepted.
    const endpoint = `https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`;

    const uploadOnce = async (body) => {
      const response = await fetch(endpoint, { method: "POST", body });
      const rawText = await response.text();
      let payload = {};
      try {
        payload = rawText ? JSON.parse(rawText) : {};
      } catch {
        payload = { error: { message: rawText || "Cloudinary upload failed." } };
      }

      if (!response.ok) {
        const apiError = payload?.error?.message || "Cloudinary upload failed.";
        const isPresetIssue =
          /preset|unsigned|signed|not found|not enabled|invalid/i.test(apiError);
        const hint = isPresetIssue
          ? ` Check Cloudinary Upload Preset "${this.uploadPreset}" in cloud "${this.cloudName}": it must exist and be set to Unsigned.`
          : "";
        throw new Error(`${apiError}${hint}`);
      }
      return payload.secure_url;
    };

    try {
      return await uploadOnce(formData);
    } catch (firstError) {
      if (!folder) throw firstError;

      const retryForm = new FormData();
      retryForm.append("file", file);
      retryForm.append("upload_preset", this.uploadPreset);
      return uploadOnce(retryForm);
    }
  }

  static async uploadImages(files = [], folder) {
    const uploads = files.map((file) => this.uploadImage(file, folder));
    return Promise.all(uploads);
  }
}

export default CloudinaryService;
