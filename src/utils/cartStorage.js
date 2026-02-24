const CART_KEY = "tb_cart";
const CART_EVENT = "tb-cart-updated";

const emitCartUpdated = () => {
  window.dispatchEvent(new Event(CART_EVENT));
};

export const getCartItems = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => ({
      ...item,
      type: item.type || "product",
      id: item.id || `legacy-${item.productId || index}`,
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
    }));
  } catch (error) {
    console.error("Failed to parse cart data:", error);
    return [];
  }
};

export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  emitCartUpdated();
};

export const addProductToCart = (product, quantity = 1) => {
  const items = getCartItems();
  const existingIndex = items.findIndex(
    (item) => item.type === "product" && String(item.productId) === String(product.id)
  );

  if (existingIndex >= 0) {
    items[existingIndex].quantity += quantity;
  } else {
    items.push({
      id: `product-${product.id}`,
      type: "product",
      productId: product.id,
      name: product.name,
      price: Number(product.price || 0),
      quantity,
      category: product.category || "",
      subcategory: product.subcategory || "",
      image: product.img || "",
    });
  }

  saveCartItems(items);
};

export const addBuildToCart = ({ buildName, components, totalPrice }) => {
  const componentEntries = Object.entries(components || {}).filter(([, component]) => component);
  if (componentEntries.length === 0) return;
  const firstComponent = componentEntries[0]?.[1];

  const buildId = `build-${Date.now()}`;
  const items = getCartItems();

  items.push({
    id: buildId,
    type: "build",
    buildId,
    name: buildName || "Custom Build",
    quantity: 1,
    price: Number(totalPrice || 0),
    image: firstComponent?.img || "",
    createdAt: new Date().toISOString(),
    components: componentEntries.map(([category, component]) => ({
      category,
      name: component.name || category,
      price: Number(component.price || 0),
      image: component.img || "",
      specs: component.specs || {},
    })),
  });

  saveCartItems(items);
};

export const removeCartItem = (itemId) => {
  const filtered = getCartItems().filter((item) => item.id !== itemId);
  saveCartItems(filtered);
};

export const updateCartItemQuantity = (itemId, quantity) => {
  const nextQty = Math.max(1, Number(quantity) || 1);
  const items = getCartItems().map((item) =>
    item.id === itemId ? { ...item, quantity: nextQty } : item
  );
  saveCartItems(items);
};

export const getCartCount = () =>
  getCartItems().reduce((sum, item) => sum + Number(item.quantity || 0), 0);

export const getCartEventName = () => CART_EVENT;
