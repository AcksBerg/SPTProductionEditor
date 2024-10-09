import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Area } from "../types";
import { Button } from "primereact/button";
import { DialogContext } from "../context/DialogContext";
import { useContext } from "react";
import { ProductionItemContext } from "../context/ProductionItemContext";

interface DataViewHeaderProps {
  selectedArea: Area;
  setSelectedArea: (area: Area) => void;
  searchItemName: string;
  setSearchItemName: (name: string) => void;
  availableAreas: Area[];
}

export const DataViewHeader = ({
  selectedArea,
  setSelectedArea,
  searchItemName,
  setSearchItemName,
  availableAreas,
}: DataViewHeaderProps) => {
  const { setIsDialogVisible } = useContext(DialogContext);
  const { setCurrentItem, setIsNewProduction } = useContext(
    ProductionItemContext
  );
  return (
    <div className="flex justify-content-between">
      <div>
        <span>Production area</span>
        <Dropdown
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.value)}
          options={availableAreas}
          optionLabel="name"
          placeholder="Select an Area"
          className="mx-2"
        />
      </div>
      <Button
        label="New production"
        onClick={() => {
          setCurrentItem(undefined);
          setIsNewProduction(true);
          setIsDialogVisible(true);
        }}
        tooltip="Create new production item"
        tooltipOptions={{ position: "mouse" }}
      />
      <div>
        <span className="pr-3">Global search</span>
        <InputText
          value={searchItemName}
          onChange={(e) => setSearchItemName(e.target.value)}
          placeholder="Search for item name"
        />
      </div>
    </div>
  );
};
