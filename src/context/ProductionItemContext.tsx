import React, { createContext, useState, useMemo } from "react";
import { Production } from "../types";

interface ProductionItemContextType {
  currentItem: Production | undefined;
  setCurrentItem: React.Dispatch<React.SetStateAction<Production | undefined>>;
  isNewProduction: boolean;
  setIsNewProduction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductionItemContext = createContext<ProductionItemContextType>({
  currentItem: undefined,
  setCurrentItem: () => undefined,
  isNewProduction: false,
  setIsNewProduction: () => undefined,
});

export const ProductionItemProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState<Production | undefined>(
    undefined
  );
  const [isNewProduction, setIsNewProduction] = useState(false);
  const contextValue = useMemo(() => {
    return {
      currentItem,
      setCurrentItem,
      isNewProduction,
      setIsNewProduction,
    };
  }, [currentItem, isNewProduction]);

  return (
    <ProductionItemContext.Provider value={contextValue}>
      {children}
    </ProductionItemContext.Provider>
  );
};
