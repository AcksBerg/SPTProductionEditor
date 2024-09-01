import productionList from "./data/production.json";
import areaList from "./data/area.json";
import itemList from "./data/item.json";
import { useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { saveAs } from "file-saver";
import { ProductionItem } from "./components/ProductionItem";
import { DataViewHeader } from "./components/DataViewHeader";
import { Area, Production } from "./types";
import { DialogProvider } from "./context/DialogContext";
import { ProductionItemProvider } from "./context/ProductionItemContext";
import { EditProductionItem } from "./components/EditProductionItem";

const getAvailableAreas = (
  productionList: Production[],
  areaList: Area[]
): Area[] => {
  const usedAreaTypes = Array.from(
    new Set(productionList.map((prod) => prod.areaType))
  );
  return [
    { name: "All", areaId: -1, maxLevel: 0 },
    ...areaList.filter((area) => usedAreaTypes.includes(area.areaId)),
  ];
};

export const App = () => {
  const filteredAreas = getAvailableAreas(productionList, areaList);
  const [selectedArea, setSelectedArea] = useState<Area>(filteredAreas[0]);
  const [searchItemName, setSearchItemName] = useState<string>("");
  const filterDataView = (craft: Production) => {
    if (searchItemName === "") {
      return craft.areaType === selectedArea.areaId || selectedArea.areaId === -1;
    }
    return itemList[craft.endProduct as keyof typeof itemList].name
      .toLowerCase()
      .includes(searchItemName.toLowerCase());
  };

  const saveProductionList = () => {
    const blob = new Blob([JSON.stringify(productionList, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "production.json");
  };

  return (
    <DialogProvider>
      <ProductionItemProvider>
        <Button label="Download" onClick={saveProductionList} />
        <DataView
          value={productionList.filter((craft) => filterDataView(craft))}
          itemTemplate={(item) => <ProductionItem item={item} />}
          header={
            <DataViewHeader
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              searchItemName={searchItemName}
              setSearchItemName={setSearchItemName}
              availableAreas={filteredAreas}
            />
          }
          paginator
          rows={12}
          className="m-1"
        />
        <EditProductionItem />
      </ProductionItemProvider>
    </DialogProvider>
  );
};
