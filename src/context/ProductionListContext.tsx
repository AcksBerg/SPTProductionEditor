import React, { createContext, useState, useMemo, ReactNode } from "react";
import { Production } from "../types";
import initialProductionList from "../data/production.json";

interface ProductionListContextType {
  productionList: Production[];
  setProductionList: React.Dispatch<React.SetStateAction<Production[]>>;
  addProductionItem: (item: Production) => void;
  updateProductionItem: (updatedItem: Production) => void;
  removeProductionItem: (id: string) => void;
  moveProductionItem: (item: Production, moveUp: boolean) => void;
}

export const ProductionListContext = createContext<ProductionListContextType | undefined>(undefined);

export const ProductionListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productionList, setProductionList] = useState<Production[]>(initialProductionList);

  const addProductionItem = (item: Production) => {
    setProductionList((prevList) => [...prevList, item]);
  };

  const updateProductionItem = (updatedItem: Production) => {
    setProductionList((prevList) =>
      prevList.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  const removeProductionItem = (id: string) => {
    setProductionList((prevList) => prevList.filter((item) => item._id !== id));
  };

  const moveProductionItem = (item: Production, moveUp: boolean) => {
    setProductionList((prevList) => {
      const index = prevList.findIndex((i) => i._id === item._id);
      if (index === -1) return prevList;

      const newList = [...prevList];
      const targetIndex = moveUp ? index - 1 : index + 1;

      if (targetIndex >= 0 && targetIndex < newList.length) {
        const temp = newList[targetIndex];
        newList[targetIndex] = newList[index];
        newList[index] = temp;
      }

      return newList;
    });
  };

  const contextValue = useMemo(() => {
    return {
      productionList,
      setProductionList,
      addProductionItem,
      updateProductionItem,
      removeProductionItem,
      moveProductionItem,
    };
  }, [productionList]);

  return (
    <ProductionListContext.Provider value={contextValue}>
      {children}
    </ProductionListContext.Provider>
  );
};
