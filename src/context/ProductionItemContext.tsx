import React, { createContext, useState, useMemo } from "react";
import { Production } from "../types";

interface ProductionItemContextType {
  currentItem: Production | undefined;
  setCurrentItem: React.Dispatch<React.SetStateAction<Production | undefined>>;
}

export const ProductionItemContext = createContext<ProductionItemContextType>({
  currentItem: undefined,
  setCurrentItem: () => undefined,
});

export const ProductionItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentItem, setCurrentItem] = useState<Production | undefined>(undefined);

  const contextValue = useMemo(() => {
    return {
      currentItem,
      setCurrentItem,
    };
  }, [currentItem]);

  return (
    <ProductionItemContext.Provider value={contextValue}>
      {children}
    </ProductionItemContext.Provider>
  );
};
