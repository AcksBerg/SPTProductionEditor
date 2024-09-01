import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { RequirementPanel } from "./RequirementPanel";
import { formatTime } from "../utils/formatTime";
import itemList from "../data/item.json";
import { DataView } from "primereact/dataview";
import { Production, Requirement } from "../types";
import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";
import { ProductionItemContext } from "../context/ProductionItemContext";

interface ProductionItemProps {
  item: Production;
}

export const ProductionItem = ({ item }: ProductionItemProps) => {
  const { setIsDialogVisible } = useContext(DialogContext);
  const { setCurrentItem } = useContext(ProductionItemContext);
  const panelHeader = () => {
    return (
      <div className="flex w-full justify-content-between align-items-center">
        <div className="flex">
          <span className="font-bold pr-1">
            {itemList[item.endProduct as keyof typeof itemList].name}
          </span>
          <span className="font-light"> ID: {item._id}</span>
        </div>
        <Button
          className="mr-2 edit-button"
          icon={PrimeIcons.PENCIL}
          onClick={() => {
            setCurrentItem(item);
            setIsDialogVisible(true);
          }}
        />
      </div>
    );
  };

  return (
    <>
      <Panel
        toggleable
        collapsed
        key={item._id}
        className="col-12"
        header={panelHeader()}
      >
        <span className="col-12"> Produces: {item.count} </span>
        <span className="col-2">
          {" "}
          Time: {item.productionTime}s ({formatTime(item.productionTime)})
        </span>
        <DataView
          value={item.requirements}
          header="Requirements"
          itemTemplate={(requ: Requirement) => <RequirementPanel requ={requ} />}
        />
      </Panel>
    </>
  );
};
