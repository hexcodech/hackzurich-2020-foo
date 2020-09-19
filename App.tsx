import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";
import { AppContext } from "./utilities/context";

export default function App() {
  const [products, setProducts] = useState<{ ean: string; quantity: number }[]>(
    []
  );

  const addProduct = useCallback(
    (ean: string, quantity: number) => {
      if (products.find((p) => p.ean === ean)) {
        setProducts(
          products.map((p) =>
            p.ean === ean ? { ean: p.ean, quantity: p.quantity + quantity } : p
          )
        );
      } else {
        setProducts([...products, { ean, quantity }]);
      }
    },
    [products]
  );

  const updateQuantity = useCallback(
    (ean: string, quantity: number) => {
      if (quantity <= 0) {
        removeProduct(ean);
        return;
      }
      if (products.find((p) => p.ean === ean)) {
        setProducts(
          products.map((p) => (p.ean === ean ? { ean: p.ean, quantity } : p))
        );
      } else {
        setProducts([...products, { ean, quantity }]);
      }
    },
    [products]
  );

  const removeProduct = useCallback(
    (ean: string) => {
      setProducts(products.filter((p) => p.ean === ean));
    },
    [products]
  );

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          products,
          setProducts,
          addProduct,
          updateQuantity,
          removeProduct,
        }}
      >
        <Navigation />
        <StatusBar translucent />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}
