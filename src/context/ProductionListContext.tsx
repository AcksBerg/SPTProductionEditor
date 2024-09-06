import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { Production } from "../types";
import initialProductionList from "../data/production.json";
import areaList from "../data/area.json";

interface ProductionListContextType {
  productionList: Production[];
  availableAreas: Area[];
  setProductionList: React.Dispatch<React.SetStateAction<Production[]>>;
  addProductionItem: (item: Production) => void;
  updateProductionItem: (updatedItem: Production) => void;
  removeProductionItem: (id: string) => void;
  moveProductionItem: (
    item: Production,
    moveUp: boolean,
    areaId: number
  ) => void;
  isProductionListMoveAvailable: boolean;
  setIsProductionListMoveAvailable: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const ProductionListContext = createContext<
  ProductionListContextType | undefined
>(undefined);

export const ProductionListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productionList, setProductionList] = useState<Production[]>(
    initialProductionList
  );
  const [availableAreas, setAvailableAreas] = useState<Area[]>([]);
  const [isProductionListMoveAvailable, setIsProductionListMoveAvailable] =
    useState(true);
  const addProductionItem = (item: Production) => {
    const updatedList = [...productionList, item];
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const updateAvailableAreas = (newProductionList: Production[]) => {
    const usedAreaTypes = Array.from(
      new Set(newProductionList.map((prod) => prod.areaType))
    );
    const updatedAreas = [{ name: "All", areaId: -1, maxLevel: 0 }, ...areaList.filter((area) =>
      usedAreaTypes.includes(area.areaId)
    )];
    
    setAvailableAreas(updatedAreas);
  };

  useEffect(() => {
    updateAvailableAreas(productionList);
  }, [productionList]);

  const updateProductionItem = (updatedItem: Production) => {
    const updatedList = productionList.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const removeProductionItem = (id: string) => {
    const updatedList = productionList.filter((item) => item._id !== id);
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const moveProductionItem = (
    item: Production,
    moveUp: boolean,
    areaId: number
  ) => {
    setProductionList((prevList) => {
      if (areaId === -1) {
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
      }

      const filteredList = prevList.filter((i) => i.areaType === areaId);

      const currentFilteredIndex = filteredList.findIndex(
        (i) => i._id === item._id
      );
      if (currentFilteredIndex === -1) return prevList;

      const targetFilteredIndex = moveUp
        ? currentFilteredIndex - 1
        : currentFilteredIndex + 1;

      if (targetFilteredIndex < 0 || targetFilteredIndex >= filteredList.length)
        return prevList;

      const currentIndex = prevList.findIndex(
        (i) => i._id === filteredList[currentFilteredIndex]._id
      );
      const targetIndex = prevList.findIndex(
        (i) => i._id === filteredList[targetFilteredIndex]._id
      );

      const newList = [...prevList];
      const temp = newList[targetIndex];
      newList[targetIndex] = newList[currentIndex];
      newList[currentIndex] = temp;

      return newList;
    });
  };

  const contextValue = useMemo(() => {
    return {
      productionList,
      availableAreas,
      setProductionList,
      addProductionItem,
      updateProductionItem,
      removeProductionItem,
      moveProductionItem,
      isProductionListMoveAvailable,
      setIsProductionListMoveAvailable,
    };
  }, [productionList, availableAreas, isProductionListMoveAvailable]);

  return (
    <ProductionListContext.Provider value={contextValue}>
      {children}
    </ProductionListContext.Provider>
  );
};
