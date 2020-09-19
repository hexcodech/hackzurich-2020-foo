import React from "react";

export const AppContext = React.createContext<{
  products: { ean: string; quantity: number }[];
  setProducts: (products: { ean: string; quantity: number }[]) => void;
  addProduct: (ean: string, quantity: number) => void;
  updateQuantity: (ean: string, quantity: number) => void;
  removeProduct: (ean: string) => void;
}>({
  products: [],
  setProducts: () => {},
  addProduct: () => {},
  updateQuantity: () => {},
  removeProduct: () => {},
});
