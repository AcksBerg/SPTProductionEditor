import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { Area, Production } from "../types";
import areaList from "../data/area.json";
import productionListTemp from "../data/production.json";

interface ProductionListContextType {
  productionList: Production[] | undefined;
  availableAreas: Area[];
  setAvailableAreas: React.Dispatch<React.SetStateAction<Area[]>>;
  setProductionList: React.Dispatch<
    React.SetStateAction<Production[] | undefined>
  >;
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
  existingIdsSet: Set<string>;
  defaultIds: string[];
}

export const ProductionListContext = createContext<
  ProductionListContextType | undefined
>(undefined);

export const ProductionListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const defaultIds = Array.from(productionListTemp).map((e) => e._id);
  const [productionList, setProductionList] = useState<
    Production[] | undefined
  >(undefined);

  const [existingIdsSet, setExistingIdsSet] = useState<Set<string>>(new Set());
  const [availableAreas, setAvailableAreas] = useState<Area[]>([]);
  const [isProductionListMoveAvailable, setIsProductionListMoveAvailable] =
    useState(true);
  const addProductionItem = (item: Production) => {
    const updatedList = [...(productionList || []), item];
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const updateAvailableAreas = (newProductionList: Production[]) => {
    const usedAreaTypes = Array.from(
      new Set(newProductionList.map((prod) => prod.areaType))
    );
    const updatedAreas = [
      { name: "All", areaId: -1, maxLevel: 0 },
      ...areaList.filter((area) => usedAreaTypes.includes(area.areaId)),
    ];

    setAvailableAreas(updatedAreas);
  };

  useEffect(() => {
    if (!productionList) return;
    updateAvailableAreas(productionList);
  }, [productionList]);

  useEffect(() => {
    if (productionList) {
      const ids = new Set(productionList.map((production) => production._id));
      setExistingIdsSet(ids);
    } else {
      setExistingIdsSet(new Set());
    }
  }, [productionList]);

  const updateProductionItem = (updatedItem: Production) => {
    if (!productionList) return;
    const updatedList = productionList.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const removeProductionItem = (id: string) => {
    if (!productionList) return;
    const updatedList = productionList.filter((item) => item._id !== id);
    setProductionList(updatedList);
    updateAvailableAreas(updatedList);
  };

  const moveProductionItem = (
    item: Production,
    moveUp: boolean,
    areaId: number
  ) => {
    if (!productionList) return;
    setProductionList((prevList) => {
      if (!prevList) return;
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
      setAvailableAreas,
      setProductionList,
      addProductionItem,
      updateProductionItem,
      removeProductionItem,
      moveProductionItem,
      isProductionListMoveAvailable,
      setIsProductionListMoveAvailable,
      existingIdsSet,
      defaultIds,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productionList,
    availableAreas,
    isProductionListMoveAvailable,
    existingIdsSet,
  ]);

  return (
    <ProductionListContext.Provider value={contextValue}>
      {children}
    </ProductionListContext.Provider>
  );
};
