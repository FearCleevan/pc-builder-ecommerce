import React from "react";
import AddProductForm from "./AddProductForm";
import styles from "./MainPage.module.css";

const AddProductMainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Add Product</h1>
        <p>
          Create products using the same MockData JSON style (`id`, `name`, `image`,
          `price`, `specs`, `stockCount`) with up to 6 product images.
        </p>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProductMainPage;
