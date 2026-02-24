import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../../../utils/cartStorage";
import styles from "./CartPage.module.css";

const paymentOptions = [
  { id: "visa", label: "Visa / Mastercard" },
  { id: "psbank", label: "PSBank Online Banking" },
  { id: "bdo", label: "BDO Online Banking" },
  { id: "bpi", label: "BPI Online Banking" },
  { id: "gcash", label: "GCash" },
  { id: "cod", label: "Cash On Delivery" },
];

const initialCheckout = {
  fullName: "",
  email: "",
  phone: "",
  addressLine: "",
  barangay: "",
  city: "",
  province: "",
  postalCode: "",
  paymentMethod: "visa",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  accountName: "",
  accountReference: "",
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(Number(value || 0));

const CartPage = () => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [checkoutForm, setCheckoutForm] = useState(initialCheckout);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0),
    [cartItems]
  );
  const shippingFee = subtotal > 0 ? (checkoutForm.paymentMethod === "cod" ? 180 : 120) : 0;
  const total = subtotal + shippingFee;

  const refreshCart = () => {
    setCartItems(getCartItems());
  };

  const handleRemove = (itemId) => {
    removeCartItem(itemId);
    refreshCart();
  };

  const handleQtyChange = (itemId, nextQty) => {
    updateCartItemQuantity(itemId, nextQty);
    refreshCart();
  };

  const validateCheckout = () => {
    const nextErrors = {};
    const required = [
      "fullName",
      "email",
      "phone",
      "addressLine",
      "barangay",
      "city",
      "province",
      "postalCode",
    ];

    required.forEach((field) => {
      if (!checkoutForm[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkoutForm.email && !emailPattern.test(checkoutForm.email)) {
      nextErrors.email = "Invalid email format.";
    }

    if (checkoutForm.paymentMethod === "visa") {
      if (!checkoutForm.cardName.trim()) nextErrors.cardName = "Card name is required.";
      if (!checkoutForm.cardNumber.trim()) nextErrors.cardNumber = "Card number is required.";
      if (!checkoutForm.expiry.trim()) nextErrors.expiry = "Expiry is required.";
      if (!checkoutForm.cvv.trim()) nextErrors.cvv = "CVV is required.";
    }

    if (["psbank", "bdo", "bpi", "gcash"].includes(checkoutForm.paymentMethod)) {
      if (!checkoutForm.accountName.trim()) {
        nextErrors.accountName = "Account name is required.";
      }
      if (!checkoutForm.accountReference.trim()) {
        nextErrors.accountReference = "Account number/reference is required.";
      }
    }

    if (cartItems.length === 0) {
      nextErrors.cart = "Your cart is empty.";
    }

    return nextErrors;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const validation = validateCheckout();
    setErrors(validation);
    setStatus("");

    if (Object.keys(validation).length > 0) return;

    const payload = {
      customer: {
        fullName: checkoutForm.fullName,
        email: checkoutForm.email,
        phone: checkoutForm.phone,
      },
      address: {
        addressLine: checkoutForm.addressLine,
        barangay: checkoutForm.barangay,
        city: checkoutForm.city,
        province: checkoutForm.province,
        postalCode: checkoutForm.postalCode,
      },
      payment: {
        method: checkoutForm.paymentMethod,
        details:
          checkoutForm.paymentMethod === "visa"
            ? {
                cardName: checkoutForm.cardName,
                cardNumber: checkoutForm.cardNumber,
                expiry: checkoutForm.expiry,
                cvv: checkoutForm.cvv,
              }
            : {
                accountName: checkoutForm.accountName,
                accountReference: checkoutForm.accountReference,
              },
      },
      items: cartItems,
      pricing: { subtotal, shippingFee, total },
    };

    // Backend ready: replace with API call.
    console.log("Checkout payload:", payload);
    setStatus("Order request is prepared. Connect this flow to your backend payment API.");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <header className={styles.titleBlock}>
          <h1>Cart & Checkout</h1>
          <p>Review your build and product orders, then select a payment method.</p>
        </header>

        <section className={styles.layout}>
          <div className={styles.cartColumn}>
            <h2>Cart Items</h2>
            {errors.cart && <p className={styles.error}>{errors.cart}</p>}

            {cartItems.length === 0 ? (
              <div className={styles.empty}>No items in cart yet.</div>
            ) : (
              <div className={styles.cartList}>
                {cartItems.map((item) =>
                  item.type === "build" ? (
                    <article key={item.id} className={styles.buildItem}>
                      <div className={styles.itemHeader}>
                        <h3>{item.name}</h3>
                        <span className={styles.typeTag}>Complete Build</span>
                      </div>
                      <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                      <div className={styles.specGrid}>
                        {item.components.map((component) => {
                          const specEntries = Object.entries(component.specs || {}).slice(0, 2);
                          return (
                            <div key={`${item.id}-${component.category}`} className={styles.specCard}>
                              <h4>{component.category}</h4>
                              <p>{component.name}</p>
                              {specEntries.length > 0 && (
                                <ul>
                                  {specEntries.map(([key, value]) => (
                                    <li key={key}>
                                      {key}: {String(value)}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <button type="button" onClick={() => handleRemove(item.id)} className={styles.removeButton}>
                        Remove Build
                      </button>
                    </article>
                  ) : (
                    <article key={item.id} className={styles.productItem}>
                      <div className={styles.itemHeader}>
                        <h3>{item.name}</h3>
                        <span className={styles.typeTagProduct}>Product</span>
                      </div>
                      <p className={styles.meta}>
                        {item.category} / {item.subcategory}
                      </p>
                      <div className={styles.productBottom}>
                        <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                        <div className={styles.qtyBox}>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, Number(item.quantity || 1) - 1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, Number(item.quantity || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button type="button" onClick={() => handleRemove(item.id)} className={styles.removeButton}>
                          Remove
                        </button>
                      </div>
                    </article>
                  )
                )}
              </div>
            )}
          </div>

          <form className={styles.checkoutColumn} onSubmit={handlePlaceOrder}>
            <h2>Checkout & Payment</h2>

            <div className={styles.grid2}>
              <label>
                Full Name
                <input
                  value={checkoutForm.fullName}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, fullName: event.target.value }))
                  }
                />
                {errors.fullName && <small>{errors.fullName}</small>}
              </label>
              <label>
                Email
                <input
                  value={checkoutForm.email}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                />
                {errors.email && <small>{errors.email}</small>}
              </label>
            </div>

            <div className={styles.grid2}>
              <label>
                Mobile Number
                <input
                  value={checkoutForm.phone}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, phone: event.target.value }))
                  }
                />
                {errors.phone && <small>{errors.phone}</small>}
              </label>
              <label>
                Postal Code
                <input
                  value={checkoutForm.postalCode}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, postalCode: event.target.value }))
                  }
                />
                {errors.postalCode && <small>{errors.postalCode}</small>}
              </label>
            </div>

            <label>
              Street / Building
              <input
                value={checkoutForm.addressLine}
                onChange={(event) =>
                  setCheckoutForm((prev) => ({ ...prev, addressLine: event.target.value }))
                }
              />
              {errors.addressLine && <small>{errors.addressLine}</small>}
            </label>

            <div className={styles.grid3}>
              <label>
                Barangay
                <input
                  value={checkoutForm.barangay}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, barangay: event.target.value }))
                  }
                />
                {errors.barangay && <small>{errors.barangay}</small>}
              </label>
              <label>
                City
                <input
                  value={checkoutForm.city}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, city: event.target.value }))
                  }
                />
                {errors.city && <small>{errors.city}</small>}
              </label>
              <label>
                Province
                <input
                  value={checkoutForm.province}
                  onChange={(event) =>
                    setCheckoutForm((prev) => ({ ...prev, province: event.target.value }))
                  }
                />
                {errors.province && <small>{errors.province}</small>}
              </label>
            </div>

            <fieldset className={styles.paymentMethods}>
              <legend>Select Payment Method</legend>
              {paymentOptions.map((option) => (
                <label key={option.id} className={styles.radioRow}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={checkoutForm.paymentMethod === option.id}
                    onChange={() =>
                      setCheckoutForm((prev) => ({ ...prev, paymentMethod: option.id }))
                    }
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </fieldset>

            {checkoutForm.paymentMethod === "visa" && (
              <div className={styles.paymentDetail}>
                <div className={styles.grid2}>
                  <label>
                    Cardholder Name
                    <input
                      value={checkoutForm.cardName}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({ ...prev, cardName: event.target.value }))
                      }
                    />
                    {errors.cardName && <small>{errors.cardName}</small>}
                  </label>
                  <label>
                    Card Number
                    <input
                      value={checkoutForm.cardNumber}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({ ...prev, cardNumber: event.target.value }))
                      }
                    />
                    {errors.cardNumber && <small>{errors.cardNumber}</small>}
                  </label>
                </div>
                <div className={styles.grid2}>
                  <label>
                    Expiry (MM/YY)
                    <input
                      value={checkoutForm.expiry}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({ ...prev, expiry: event.target.value }))
                      }
                    />
                    {errors.expiry && <small>{errors.expiry}</small>}
                  </label>
                  <label>
                    CVV
                    <input
                      value={checkoutForm.cvv}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({ ...prev, cvv: event.target.value }))
                      }
                    />
                    {errors.cvv && <small>{errors.cvv}</small>}
                  </label>
                </div>
              </div>
            )}

            {["psbank", "bdo", "bpi", "gcash"].includes(checkoutForm.paymentMethod) && (
              <div className={styles.paymentDetail}>
                <div className={styles.grid2}>
                  <label>
                    Account Name
                    <input
                      value={checkoutForm.accountName}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({ ...prev, accountName: event.target.value }))
                      }
                    />
                    {errors.accountName && <small>{errors.accountName}</small>}
                  </label>
                  <label>
                    Account Number / Reference
                    <input
                      value={checkoutForm.accountReference}
                      onChange={(event) =>
                        setCheckoutForm((prev) => ({
                          ...prev,
                          accountReference: event.target.value,
                        }))
                      }
                    />
                    {errors.accountReference && <small>{errors.accountReference}</small>}
                  </label>
                </div>
              </div>
            )}

            {checkoutForm.paymentMethod === "cod" && (
              <p className={styles.codNote}>
                Cash on Delivery selected. Prepare exact amount upon delivery.
              </p>
            )}

            <div className={styles.summary}>
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>{formatPrice(shippingFee)}</strong>
              </div>
              <div className={styles.total}>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <button type="submit" className={styles.placeOrderButton}>
              Place Order
            </button>

            {status && <p className={styles.status}>{status}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
