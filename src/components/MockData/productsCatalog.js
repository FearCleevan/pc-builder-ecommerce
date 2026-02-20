import { accessoriesProducts } from "./accessoriesProducts";
import { pcBuilderProducts } from "./pcBuilderProducts";

export const productsCatalog = [...pcBuilderProducts, ...accessoriesProducts];

export const getProductById = (id) =>
  productsCatalog.find((product) => String(product.id) === String(id));

