import React, { useEffect, useMemo, useState } from "react";
import { addAdminProduct } from "../../../../firebase/services/productService";
import CloudinaryService from "../../../../firebase/services/cloudinaryService";
import {
  getComponentOptions,
  getComponentTemplate,
} from "../shared/mockDataRegistry";
import styles from "./AddProductForm.module.css";

const MAX_IMAGES = 6;
const IMAGE_FALLBACK = "/src/assets/Laptop1.png";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const inferComponentKey = (item = {}, fallback = "cpu") => {
  if (item.componentType) return String(item.componentType).toLowerCase();
  const id = String(item.id || "").toLowerCase();
  if (id.startsWith("gpu-")) return "gpu";
  if (id.startsWith("cpu-")) return "cpu";
  if (id.startsWith("case-")) return "case";
  if (id.startsWith("fan-")) return "case-fan";
  if (id.startsWith("cooler-")) return "cpu-cooler";
  if (id.startsWith("motherboard-")) return "motherboard";
  if (id.startsWith("ram-")) return "ram";
  if (id.startsWith("storage-")) return "storage";
  if (id.startsWith("psu-")) return "power-supply";
  if (id.startsWith("monitor-")) return "monitor";
  if (id.startsWith("keyboard-")) return "keyboard";
  if (id.startsWith("mouse-")) return "mouse";
  if (id.startsWith("headphones-")) return "headphones";
  if (id.startsWith("speaker-")) return "speaker";
  if (id.startsWith("microphone-")) return "microphone";
  if (id.startsWith("webcam-")) return "webcam";
  return fallback;
};

const toInitialState = (componentKey) => {
  const template = getComponentTemplate(componentKey);
  return {
    componentKey,
    id: `${template.idPrefix}-${Date.now()}`,
    name: "",
    price: "",
    stockCount: 10,
    type: template.includeType ? "case" : "",
    specs: { ...template.defaultSpecs },
    imageFiles: [],
    imagePreviews: [],
    mainImageIndex: 0,
  };
};

const buildProductPayload = ({ item, componentKey }) => {
  const template = getComponentTemplate(componentKey);
  const specs = { ...(item.specs || {}) };
  const id = slugify(item.id || `${template.idPrefix}-${Date.now()}`) || `${template.idPrefix}-${Date.now()}`;
  const stockCount = Number(item.stockCount ?? item.stock ?? 0);
  const images = Array.isArray(item.images)
    ? item.images.filter(Boolean).slice(0, MAX_IMAGES)
    : item.image
      ? [item.image]
      : [];
  const image = item.image || images[0] || IMAGE_FALLBACK;

  const payload = {
    id,
    name: String(item.name || "").trim() || "Untitled Product",
    image,
    images: images.length ? images : [image],
    price: Number(item.price || 0),
    specs,
    stockCount,
    stock: stockCount,
    stockStatus: stockCount > 0 ? "in_stock" : "out_of_stock",
    category: template.label,
    subcategory: specs["Form Factor"] || specs.Type || template.label,
    brand: specs.Manufacturer || specs.Brand || "Generic",
    description: Object.entries(specs)
      .slice(0, 4)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" | "),
    short_description: Object.entries(specs)
      .slice(0, 2)
      .map(([key, value]) => `${key}: ${value}`)
      .join(" | "),
    sku: String(item.sku || id).toUpperCase(),
    currency: "PHP",
    specifications: { general: specs },
    componentType: componentKey,
  };

  if (template.includeType) {
    payload.type = item.type || "case";
  }

  return payload;
};

const parseJsonToItems = (text) => {
  const trimmed = text.trim();
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    const arrayMatch = trimmed.match(/\[[\s\S]*\]/);
    if (!arrayMatch) {
      throw new Error("Invalid JSON file format.");
    }
    parsed = JSON.parse(arrayMatch[0]);
  }

  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed.products)) return parsed.products;
  return [parsed];
};

const AddProductForm = ({ onSuccess, onCancel }) => {
  const componentOptions = useMemo(() => getComponentOptions(), []);
  const [mode, setMode] = useState("single");
  const [form, setForm] = useState(() => toInitialState(componentOptions[0]?.value || "cpu"));
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [jsonItems, setJsonItems] = useState([]);
  const [jsonFileName, setJsonFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const template = useMemo(() => getComponentTemplate(form.componentKey), [form.componentKey]);

  useEffect(
    () => () => {
      form.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    },
    [form.imagePreviews]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleComponentChange = (event) => {
    const componentKey = event.target.value;
    setForm(toInitialState(componentKey));
    setMessage("");
    setError("");
  };

  const handleSpecChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value,
      },
    }));
  };

  const addCustomSpec = () => {
    const trimmedKey = newSpecKey.trim();
    const trimmedValue = newSpecValue.trim();
    if (!trimmedKey || !trimmedValue) return;
    handleSpecChange(trimmedKey, trimmedValue);
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const removeSpec = (key) => {
    setForm((prev) => {
      const updatedSpecs = { ...prev.specs };
      delete updatedSpecs[key];
      return { ...prev, specs: updatedSpecs };
    });
  };

  const handleImagesChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []).slice(0, MAX_IMAGES);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      imageFiles: selectedFiles,
      imagePreviews: previews,
      mainImageIndex: 0,
    }));
  };

  const handleJsonFile = async (event) => {
    setError("");
    setMessage("");
    const file = event.target.files?.[0];
    if (!file) return;
    setJsonFileName(file.name);

    try {
      const text = await file.text();
      const parsed = parseJsonToItems(text);
      setJsonItems(parsed);
      setMessage(`${parsed.length} product(s) parsed from ${file.name}.`);
    } catch (parseError) {
      setJsonItems([]);
      setError(parseError.message || "Failed to parse JSON file.");
    }
  };

  const submitSingleProduct = async () => {
    if (!form.name.trim()) throw new Error("Product name is required.");
    if (Number(form.price) <= 0) throw new Error("Price must be greater than 0.");

    let uploadedUrls = [];
    let uploadWarning = "";

    if (form.imageFiles.length > 0) {
      try {
        const folder = `pc-builder/admin-products/${form.componentKey}`;
        uploadedUrls = await CloudinaryService.uploadImages(form.imageFiles, folder);
      } catch (uploadError) {
        uploadWarning =
          uploadError.message ||
          "Image upload failed. Product was saved without Cloudinary images.";
      }
    }

    const orderedUrls = [...uploadedUrls];
    const selectedMain = orderedUrls[form.mainImageIndex] || orderedUrls[0];
    if (selectedMain && orderedUrls[0] !== selectedMain) {
      const selectedIndex = orderedUrls.indexOf(selectedMain);
      orderedUrls.splice(selectedIndex, 1);
      orderedUrls.unshift(selectedMain);
    }

    const productPayload = buildProductPayload({
      item: {
        ...form,
        image: orderedUrls[0] || IMAGE_FALLBACK,
        images: orderedUrls,
      },
      componentKey: form.componentKey,
    });

    await addAdminProduct(productPayload);
    setForm(toInitialState(form.componentKey));
    setMessage(
      uploadWarning
        ? `Product added. ${uploadWarning}`
        : "Product added successfully."
    );
  };

  const submitBulkProducts = async () => {
    if (!jsonItems.length) {
      throw new Error("Upload a valid JSON file with product items first.");
    }

    const payloads = jsonItems.map((item, index) => {
      const componentKey = inferComponentKey(item, form.componentKey);
      const prepared = {
        ...item,
        id: item.id || `${getComponentTemplate(componentKey).idPrefix}-${Date.now()}-${index}`,
      };
      delete prepared.has3D;
      return buildProductPayload({ item: prepared, componentKey });
    });

    await Promise.all(payloads.map((payload) => addAdminProduct(payload)));
    setJsonItems([]);
    setJsonFileName("");
    setMessage(`${payloads.length} products uploaded successfully.`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (mode === "bulk") {
        await submitBulkProducts();
      } else {
        await submitSingleProduct();
      }
      if (onSuccess) onSuccess();
    } catch (submitError) {
      setError(submitError.message || "Failed to add product.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.modeSwitch}>
        <button
          type="button"
          className={`${styles.modeButton} ${mode === "single" ? styles.modeActive : ""}`}
          onClick={() => setMode("single")}
        >
          Single Product
        </button>
        <button
          type="button"
          className={`${styles.modeButton} ${mode === "bulk" ? styles.modeActive : ""}`}
          onClick={() => setMode("bulk")}
        >
          JSON Bulk Upload
        </button>
      </div>

      {mode === "single" && (
        <>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Component Setup</h2>
            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Component Type</span>
                <select
                  value={form.componentKey}
                  onChange={handleComponentChange}
                  className={styles.input}
                >
                  {componentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span>Product ID</span>
                <input
                  className={styles.input}
                  value={form.id}
                  onChange={(event) => updateField("id", slugify(event.target.value))}
                  placeholder={`${template.idPrefix}-1`}
                  required
                />
              </label>
            </div>

            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Product Name</span>
                <input
                  className={styles.input}
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                <span>Price (PHP)</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={styles.input}
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  required
                />
              </label>
            </div>

            <div className={styles.gridTwo}>
              <label className={styles.field}>
                <span>Stock Count</span>
                <input
                  type="number"
                  min="0"
                  className={styles.input}
                  value={form.stockCount}
                  onChange={(event) => updateField("stockCount", event.target.value)}
                />
              </label>

              {template.includeType ? (
                <label className={styles.field}>
                  <span>Type</span>
                  <input
                    className={styles.input}
                    value={form.type}
                    onChange={(event) => updateField("type", event.target.value)}
                    placeholder="case"
                  />
                </label>
              ) : (
                <div />
              )}
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Images (Optional, Max 6)</h2>
            <p className={styles.helper}>
              If upload fails, product still saves and you can attach image URLs later in Edit.
            </p>
            <label className={styles.field}>
              <span>Upload Product Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className={styles.input}
              />
            </label>

            {form.imagePreviews.length > 0 && (
              <div className={styles.imageGrid}>
                {form.imagePreviews.map((preview, index) => (
                  <button
                    key={preview}
                    type="button"
                    className={`${styles.previewCard} ${
                      form.mainImageIndex === index ? styles.previewCardActive : ""
                    }`}
                    onClick={() => updateField("mainImageIndex", index)}
                  >
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <span>
                      {form.mainImageIndex === index ? "Main Image" : `Image ${index + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Specifications</h2>
            <div className={styles.specList}>
              {Object.entries(form.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <input className={styles.input} value={key} disabled />
                  <input
                    className={styles.input}
                    value={String(value ?? "")}
                    onChange={(event) => handleSpecChange(key, event.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeSpec(key)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.specAddRow}>
              <input
                className={styles.input}
                placeholder="Spec Key"
                value={newSpecKey}
                onChange={(event) => setNewSpecKey(event.target.value)}
              />
              <input
                className={styles.input}
                placeholder="Spec Value"
                value={newSpecValue}
                onChange={(event) => setNewSpecValue(event.target.value)}
              />
              <button type="button" className={styles.addButton} onClick={addCustomSpec}>
                Add Spec
              </button>
            </div>
          </section>
        </>
      )}

      {mode === "bulk" && (
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>JSON Bulk Upload</h2>
          <p className={styles.helper}>
            Upload a `.json` file containing an array of products using MockData-like fields.
            `has3D` is ignored automatically.
          </p>
          <div className={styles.gridTwo}>
            <label className={styles.field}>
              <span>Default Component Type (fallback)</span>
              <select
                value={form.componentKey}
                onChange={handleComponentChange}
                className={styles.input}
              >
                {componentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>JSON File</span>
              <input
                type="file"
                accept=".json,application/json,text/plain"
                className={styles.input}
                onChange={handleJsonFile}
              />
            </label>
          </div>
          {jsonFileName && (
            <p className={styles.helper}>
              File: <strong>{jsonFileName}</strong> | Parsed items: <strong>{jsonItems.length}</strong>
            </p>
          )}
        </section>
      )}

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting
            ? "Saving..."
            : mode === "bulk"
              ? "Upload JSON Products"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
