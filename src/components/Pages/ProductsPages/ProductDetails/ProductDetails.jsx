import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
import ProductCard from "../ProductCard/ProductCard";
import { formatPrice } from "../../../MockData/formatPrice";
import { getProductById, productsCatalog } from "../../../MockData/productsCatalog";
import styles from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const product = useMemo(() => getProductById(id), [id]);
  const stockCount =
    typeof product?.stockCount === "number" ? product.stockCount : 10;
  const stockLabel = stockCount <= 0 ? "Out of stock" : "In stock";
  const isOutOfStock = stockCount <= 0;

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return productsCatalog
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category &&
          (item.subcategory === product.subcategory ||
            item.series === product.series)
      )
      .slice(0, 4);
  }, [product]);

  const pricingPlans = useMemo(() => {
    if (!product) return [];

    const basePrice = Number(product.price || 0);
    const threeMonthPrice = basePrice * 0.93;
    const cashPrice = basePrice * 0.88;

    return [
      {
        price: basePrice,
        label: `12 Months 0% Credit Card ( ${formatPrice(basePrice / 12)} / Mo.)`,
      },
      {
        price: threeMonthPrice,
        label: `3 Months 0% Credit Card ( ${formatPrice(threeMonthPrice / 3)} / Mo.)`,
      },
      {
        price: cashPrice,
        label: "Cash Price / Straight",
      },
    ];
  }, [product]);

  const productSpecs = useMemo(() => {
    if (!product?.specs) return [];
    return Object.entries(product.specs);
  }, [product]);

  const updateCart = (selectedProduct, selectedQuantity) => {
    const existing = JSON.parse(localStorage.getItem("tb_cart") || "[]");
    const existingIndex = existing.findIndex(
      (item) => String(item.productId) === String(selectedProduct.id)
    );

    if (existingIndex >= 0) {
      existing[existingIndex].quantity += selectedQuantity;
    } else {
      existing.push({
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: selectedQuantity,
        category: selectedProduct.category,
        subcategory: selectedProduct.subcategory,
      });
    }

    localStorage.setItem("tb_cart", JSON.stringify(existing));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    updateCart(product, quantity);
    setStatusMessage(`${quantity} item(s) added to cart.`);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;
    updateCart(product, quantity);
    setStatusMessage("Added to cart. Checkout flow can be connected next.");
  };

  const handleAddToBuild = () => {
    if (!product || isOutOfStock) return;

    const buildQueue = JSON.parse(localStorage.getItem("tb_build_queue") || "[]");
    buildQueue.push({
      productId: product.id,
      name: product.name,
      quantity,
      category: product.category,
      subcategory: product.subcategory,
      specs: product.specs || {},
    });
    localStorage.setItem("tb_build_queue", JSON.stringify(buildQueue));
    navigate("/pc-builder", {
      state: {
        prefillProduct: product,
        quantity,
      },
    });
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <button className={styles.backButton} onClick={() => navigate("/products")}>
            <FaArrowLeft />
            Back to Products
          </button>
          <div className={styles.notFound}>
            <h2>Product not found</h2>
            <p>The selected product does not exist in the current catalog.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/products"))}
        >
          <FaArrowLeft />
          Back
        </button>

        <section className={styles.hero}>
          <div className={styles.imageCard}>
            <img src={product.img} alt={product.name} className={styles.productImage} />
          </div>

          <div className={styles.detailsCard}>
            <p className={styles.brand}>{product.brand}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.metaRow}>
              <span className={styles.metaBadge}>
                Stock: {stockLabel} ({stockCount})
              </span>
            </div>

            <div className={styles.priceSection}>
              {pricingPlans.map((plan, index) => (
                <div className={styles.priceLine} key={index}>
                  <span className={styles.price}>{formatPrice(plan.price)}</span>
                  <span className={styles.priceLabel}>{plan.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.actionRow}>
              <div className={styles.quantityBox}>
                <button
                  type="button"
                  className={styles.qtyButton}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={isOutOfStock}
                >
                  <FaMinus />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  type="button"
                  className={styles.qtyButton}
                  onClick={() => handleQuantityChange(1)}
                  disabled={isOutOfStock}
                >
                  <FaPlus />
                </button>
              </div>

              <button
                type="button"
                className={styles.cartButton}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
              <button
                type="button"
                className={styles.buyButton}
                onClick={handleBuyNow}
                disabled={isOutOfStock}
              >
                Buy Now
              </button>
              <button
                type="button"
                className={styles.buildButton}
                onClick={handleAddToBuild}
                disabled={isOutOfStock}
              >
                Add to Build
              </button>
            </div>

            {statusMessage && <p className={styles.status}>{statusMessage}</p>}
          </div>
        </section>

        <section className={styles.specsSection}>
          <h2>Specifications</h2>
          {productSpecs.length > 0 ? (
            <div className={styles.specGrid}>
              {productSpecs.map(([label, value]) => (
                <div className={styles.specItem} key={label}>
                  <span className={styles.specLabel}>{label}</span>
                  <span className={styles.specValue}>{String(value)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noSpecs}>No detailed specifications available yet.</p>
          )}
        </section>

        <section className={styles.relatedSection}>
          <h2>Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className={styles.relatedGrid}>
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className={styles.noSpecs}>No related products found.</p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
