import React, { createContext, useState, useMemo, ReactNode } from "react";
import { Area, Production } from "../types";
import areaList from "../data/area.json";

interface AreaContextType {
  availableAreas: Area[];
  setAvailableAreas: React.Dispatch<React.SetStateAction<Area[]>>;
  updateAvailableAreas: (newProductionList: Production[]) => void;
}

export const AreaContext = createContext<AreaContextType>({
  availableAreas: [{ name: "All", areaId: -1, maxLevel: 0 }],
  setAvailableAreas: () => {},
  updateAvailableAreas: () => {},
});

export const AreaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [availableAreas, setAvailableAreas] = useState<Area[]>([
    { name: "All", areaId: -1, maxLevel: 0 },
  ]);

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

  const contextValue = useMemo(
    () => ({
      availableAreas,
      setAvailableAreas,
      updateAvailableAreas,
    }),
    [availableAreas]
  );

  return (
    <AreaContext.Provider value={contextValue}>{children}</AreaContext.Provider>
  );
};
