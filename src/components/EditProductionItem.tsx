import { Dialog } from "primereact/dialog";
import { DialogContext } from "../context/DialogContext";
import { useContext, useEffect, useState } from "react";
import { ProductionItemContext } from "../context/ProductionItemContext";
import { Production, Requirement } from "../types";
import { Dropdown } from "primereact/dropdown";
import areaList from "../data/area.json";
import itemList from "../data/item.json";
import { InputText } from "primereact/inputtext";
import { formatTime } from "../utils/formatTime";

const generateNewId = (length: number = 24): string => {
  let newId = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    newId += characters[randomIndex];
  }
  return newId;
};

const defaultRequirement: Requirement = {
  areaType: undefined,
  requiredLevel: undefined,
  templateId: "",
  count: 1,
  isFunctional: false,
  isEncoded: false,
  type: "Item",
  questId: undefined,
};

const defaultProduction: Production = {
  _id: generateNewId(),
  areaType: 0,
  requirements: [defaultRequirement],
  productionTime: 60,
  needFuelForAllProductionTime: false,
  locked: false,
  endProduct: "",
  continuous: false,
  count: 1,
  productionLimitCount: 0,
  isEncoded: false,
  isCodeProduction: false,
};

export const EditProductionItem = () => {
  const { isDialogVisible, setIsDialogVisible } = useContext(DialogContext);
  const { currentItem } = useContext(ProductionItemContext);
  const itemDropdownOptions = Object.keys(itemList).map(id => ({
    label: itemList[id].name,
    value: id
  }));
  const [production, setProduction] = useState<Production | undefined>(
    undefined
  );

  useEffect(() => {
    if (currentItem) {
      setProduction(currentItem);
    } else {
      setProduction({ ...defaultProduction, _id: generateNewId() });
    }
  }, [currentItem]);

  if (!isDialogVisible) return null;
  const createNewItem = !currentItem;

  return (
    <Dialog
      header={createNewItem ? "New Production" : `Edit Production`}
      visible={true}
      onHide={() => setIsDialogVisible(false)}
      className="w-9"
    >
      <div className="flex align-items-center mt-1">
        <span className="col-2">ID:</span>
        <InputText
          placeholder="ID PreFix Hex"
          keyfilter="hex"
          value={production?._id}
          onChange={(e) => {
            if (e.target.value.length > 24) return;
            setProduction({ ...production!, _id: e.target.value });
          }}
          className="col-5"
        />
        <span className="ml-2">
          {production?._id}
          {generateNewId(24 - production!._id.length)}
        </span>
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">End product:</span>
        <Dropdown
          value={production?.endProduct}
          onChange={(e) => setProduction({ ...production!, endProduct: e.value })}
          options={itemDropdownOptions}
          optionLabel="label"
          optionValue="value"
          placeholder="Select an item"
          filter
          className="col-5 py-1"
        />
        <span className="ml-2">
          {production?.endProduct}
        </span>
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">Area:</span>
        <Dropdown
          value={production?.areaType}
          onChange={(e) => setProduction({ ...production!, areaType: e.value })}
          options={areaList}
          optionLabel="name"
          optionValue="areaId"
          placeholder="Select an area"
          filter
          className="col-5 py-1"
        />
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">Produces:</span>
        <InputText
          placeholder="Produces"
          keyfilter="int"
          value={production?.count}
          onChange={(e) => {
            setProduction({ ...production!, count: e.target.value });
          }}
          className="col-5 text-right"
        />
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">Time(s):</span>
        <InputText
          placeholder="Time in seconds"
          keyfilter="int"
          value={production?.productionTime}
          onChange={(e) => {
            setProduction({ ...production!, productionTime: e.target.value });
          }}
          className="col-5 text-right"
        />
        <span className="ml-2">
          {formatTime(production!.productionTime)}
        </span>
      </div>
    </Dialog>
  );
};
