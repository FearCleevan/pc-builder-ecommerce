class CloudinaryService {
  static cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  static uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  static async uploadImage(file, folder = "pc-builder/admin-products") {
    if (!file) {
      throw new Error("No file selected for upload.");
    }

    if (!this.cloudName || !this.uploadPreset) {
      throw new Error("Cloudinary config missing. Check env variables.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.uploadPreset);
    if (folder) {
      formData.append("folder", folder);
    }

    const endpoint = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const uploadOnce = async (body) => {
      const response = await fetch(endpoint, { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) {
        const apiError = payload?.error?.message || "Cloudinary upload failed.";
        throw new Error(apiError);
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
