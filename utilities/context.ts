import React from "react";

export const AppContext = React.createContext<{
  products: { ean: string; quantity: number; score?: number }[];
  setProducts: (
    products: { ean: string; quantity: number; score?: number }[]
  ) => void;
  addProduct: (ean: string, quantity: number, score?: number) => void;
  updateProduct: (ean: string, quantity: number, score?: number) => void;
  removeProduct: (ean: string) => void;
}>({
  products: [],
  setProducts: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
});
