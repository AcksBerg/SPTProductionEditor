import { useContext, useState, useEffect } from "react";
import itemList from "./data/item.json";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { saveAs } from "file-saver";
import { ProductionItem } from "./components/ProductionItem";
import { DataViewHeader } from "./components/DataViewHeader";
import { Area, Production } from "./types";
import { ProductionListContext } from "./context/ProductionListContext";
import { EditProductionItem } from "./components/EditProductionItem";
import { PrimeIcons } from "primereact/api";

export const MainApp = () => {
  const { productionList, setProductionList, setIsProductionListMoveAvailable, availableAreas } =
    useContext(ProductionListContext);
  const [selectedArea, setSelectedArea] = useState<Area>({
    name: "All",
    areaId: -1,
    maxLevel: 0,
  });
  const [searchItemName, setSearchItemName] = useState<string>("");

  useEffect(() => {
    if (availableAreas.length > 0) {
      setSelectedArea(availableAreas[0]); 
    }
    setIsProductionListMoveAvailable(searchItemName === "");
  }, [searchItemName, availableAreas]);

  const filterDataView = (craft: Production) => {
    if (!selectedArea) return false;
    return searchItemName === ""
      ? craft.areaType === selectedArea.areaId || selectedArea.areaId === -1
      : itemList[craft.endProduct as keyof typeof itemList].name
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
    <>
      <Button
        className="p-button-success"
        label="Download"
        onClick={saveProductionList}
        tooltip="Download the modified production.json"
        tooltipOptions={{ position: "mouse" }}
      />
      <Button
        className="p-button-danger ml-2"
        label="Clear production list"
        icon={PrimeIcons.TRASH}
        onClick={() => setProductionList([])}
        tooltip="Remove every production and start fresh."
        tooltipOptions={{ position: "mouse" }}
      />
      <DataView
        value={productionList.filter((craft) => filterDataView(craft))}
        itemTemplate={(item) => (
          <ProductionItem item={item} selectedArea={selectedArea} />
        )}
        header={
          <DataViewHeader
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            searchItemName={searchItemName}
            setSearchItemName={setSearchItemName}
            availableAreas={availableAreas}
          />
        }
        paginator
        rows={12}
        className="m-1 mt-2"
      />
      <EditProductionItem />
    </>
  );
};
