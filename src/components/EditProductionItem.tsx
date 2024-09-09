import { Dialog } from "primereact/dialog";
import { DialogContext } from "../context/DialogContext";
import { DataView } from "primereact/dataview";
import { useContext, useEffect, useState } from "react";
import { ProductionItemContext } from "../context/ProductionItemContext";
import { ItemList, Production, Requirement } from "../types";
import { Dropdown } from "primereact/dropdown";
import areaList from "../data/area.json";
import itemList from "../data/item.json";
import { InputText } from "primereact/inputtext";
import { formatTime } from "../utils/formatTime";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { EditRequirementPanel } from "./EditRequirementPanel";
import { ProductionListContext } from "../context/ProductionListContext";
import { InputNumber } from "primereact/inputnumber";

export const generateNewId = (length: number = 24): string => {
  let newId = "";
  const characters = "0123456789abcdef";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    newId += characters[randomIndex];
  }
  return newId;
};

const defaultRequirement: Requirement = {
  areaType: 0,
  requiredLevel: 1,
  templateId: "5755383e24597772cb798966",
  count: 1,
  isFunctional: false,
  isEncoded: false,
  type: "Item",
  questId: "5936d90786f7742b1420ba5b",
};

const defaultProduction: Production = {
  _id: generateNewId(),
  areaType: 0,
  requirements: [],
  productionTime: 60,
  needFuelForAllProductionTime: false,
  locked: false,
  endProduct: "5755383e24597772cb798966",
  continuous: false,
  count: 1,
  productionLimitCount: 0,
  isEncoded: false,
  isCodeProduction: false,
};

export const EditProductionItem = () => {
  const { isDialogVisible, setIsDialogVisible } = useContext(DialogContext);
  const productionListContext = useContext(ProductionListContext);

if (!productionListContext) {
  throw new Error("ProductionListContext is undefined");
}

const { addProductionItem, updateProductionItem } = productionListContext;

  

  const { currentItem, setCurrentItem, setIsNewProduction, isNewProduction } =
    useContext(ProductionItemContext);
  const [tempId, setTempId] = useState<string>("");

  const items: ItemList = itemList;

  const handleClose = () => {
    setTempId("");
    setCurrentItem(undefined);
    setIsDialogVisible(false);
    setIsNewProduction(false);
  };
  const handleSave = () => {
    if (!production?.endProduct || production?.requirements.length < 1) {
      console.log("End Product and Requirments must be set.");
      return;
    }

    const updatedProduction = {
      ...production,
      _id: tempId + production._id,
      locked: production.requirements.some((r) => r.type === "QuestComplete"),
    };

    if (isNewProduction) {
      addProductionItem(updatedProduction);
    } else {
      updateProductionItem(updatedProduction);
    }
    handleClose();
  };

  const itemDropdownOptions = Object.keys(itemList).map((id) => ({
    label: items[id].name,
    value: id,
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
      header={createNewItem ? "New Production" : "Edit Production"}
      footer={
        <div className="flex align-items-center justify-content-center">
          <Button severity="success" label="Save" onClick={handleSave} />
          <Button
            severity="warning"
            label="Cancel"
            onClick={() => setIsDialogVisible(false)}
          />
        </div>
      }
      visible={true}
      onHide={handleClose}
      className="w-9"
    >
      <div className="flex align-items-center mt-1">
        <span className="col-2">ID:</span>
        <InputText
          placeholder="ID PreFix in Hex"
          keyfilter="hex"
          value={tempId}
          onChange={(e) => {
            if (e.target.value.length > 24) return;
            setTempId(e.target.value);
            setProduction({
              ...production!,
              _id: generateNewId(24 - tempId.length),
            });
          }}
          className="col-5"
          disabled={!!currentItem}
        />
        <span className="ml-2">
          {tempId ? tempId + production?._id : production?._id}
        </span>
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">End product:</span>
        <Dropdown
          value={production?.endProduct}
          onChange={(e) =>
            setProduction({ ...production!, endProduct: e.value })
          }
          options={itemDropdownOptions}
          optionLabel="label"
          optionValue="value"
          placeholder="Select an item"
          filter
          className="col-5 py-1"
        />
        <span className="ml-2">{production?.endProduct}</span>
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
        <InputNumber
          placeholder="Produces"
          value={production?.count}
          onChange={(e) => {
            setProduction({ ...production!, count: e.value ?? 0 });
          }}
          min={1}
          className="col-5 requ-input"
          showButtons
        />
      </div>
      <div className="flex align-items-center mt-1">
        <span className="col-2">Time:</span>
        <InputNumber
          placeholder="Time in seconds"
          value={production?.productionTime}
          onChange={(e) => {
            setProduction({ ...production!, productionTime: e.value ?? 0 });
          }}
          mode="decimal"
          min={1}
          suffix=" s"
          className="col-5 requ-input"
        />
        <span className="ml-2">{formatTime(production!.productionTime)}</span>
      </div>
      <DataView
        value={production!.requirements}
        header={
          <div className="flex justify-content-between align-items-center">
            <span>Requirements</span>
            <Button
              icon={PrimeIcons.PLUS}
              className="panelHeader-button"
              onClick={() => {
                setProduction((prevProduction) => ({
                  ...prevProduction!,
                  requirements: [
                    ...prevProduction!.requirements,
                    defaultRequirement,
                  ],
                }));
              }}
            />
          </div>
        }
        itemTemplate={(requ: Requirement) => (
          <EditRequirementPanel
            requ={requ}
            onRequirementChange={(updatedRequirement) => {
              const updatedRequirements = production!.requirements.map((r) =>
                r === requ ? updatedRequirement : r
              );
              setProduction({
                ...production!,
                requirements: updatedRequirements,
              });
            }}
            onDelete={() => {
              const updatedRequirements = production!.requirements.filter(
                (r) => r !== requ
              );
              setProduction({
                ...production!,
                requirements: updatedRequirements,
              });
            }}
          />
        )}
      />
    </Dialog>
  );
};
