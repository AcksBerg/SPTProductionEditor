import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DialogContext } from "../context/DialogContext";
import { useContext } from "react";
import { ProductionItemContext } from "../context/ProductionItemContext";
import { AreaContext } from "../context/AreaContext";

interface DataViewHeaderProps {
  searchItemName: string;
  setSearchItemName: (name: string) => void;
}

export const DataViewHeader = ({
  searchItemName,
  setSearchItemName,
}: DataViewHeaderProps) => {
  const { availableAreas, selectedArea, setSelectedArea } =
    useContext(AreaContext);
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
          onChange={(e) => {
            setSearchItemName("");
            setSelectedArea(e.value);
          }}
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
