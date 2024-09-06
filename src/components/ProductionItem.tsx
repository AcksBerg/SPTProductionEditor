import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";
import { DataView } from "primereact/dataview";
import itemList from "../data/item.json";
import { Area, Production, Requirement } from "../types";
import { useContext, useState } from "react";
import { DialogContext } from "../context/DialogContext";
import { ProductionItemContext } from "../context/ProductionItemContext";
import { ProductionListContext } from "../context/ProductionListContext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { formatTime } from "../utils/formatTime";
import { RequirementPanel } from "./RequirementPanel";

interface ProductionItemProps {
  item: Production;
  selectedArea: Area;
}

export const ProductionItem = ({ item, selectedArea }: ProductionItemProps) => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { setIsDialogVisible } = useContext(DialogContext);
  const { setCurrentItem } = useContext(ProductionItemContext);
  const {
    removeProductionItem,
    moveProductionItem,
    isProductionListMoveAvailable,
  } = useContext(ProductionListContext);

  const handleEditClick = () => {
    setCurrentItem(item);
    setIsDialogVisible(true);
  };

  const handleDeleteClick = () => {
    removeProductionItem(item._id);
  };

  const panelHeader = () => {
    return (
      <div className="flex w-full justify-content-between align-items-center">
        <div className="flex">
          <span className="font-bold pr-1">
            {itemList[item.endProduct as keyof typeof itemList].name}
          </span>
          <span className="font-light"> ID: {item._id}</span>
        </div>
        <div>
          {isProductionListMoveAvailable && (
            <>
              <Button
                className="panelHeader-button"
                icon={PrimeIcons.ARROW_UP}
                tooltip="Move production item up"
                tooltipOptions={{ position: "left" }}
                onClick={() =>
                  moveProductionItem(item, true, selectedArea.areaId)
                }
              />
              <Button
                className="panelHeader-button"
                icon={PrimeIcons.ARROW_DOWN}
                tooltip="Move production item down"
                tooltipOptions={{ position: "left" }}
                onClick={() =>
                  moveProductionItem(item, false, selectedArea.areaId)
                }
              />
            </>
          )}
          <Button
            className="panelHeader-button p-button-warning"
            icon={PrimeIcons.PENCIL}
            onClick={() => handleEditClick()}
            tooltip="Edit production item"
            tooltipOptions={{ position: "left" }}
          />
          <Button
            className="panelHeader-button p-button-danger"
            icon={PrimeIcons.TRASH}
            onClick={() => setDeleteDialogVisible(true)}
            tooltip="Remove production item"
            tooltipOptions={{ position: "left" }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ConfirmDialog
        group="declarative"
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        message="Are you sure you want to delete this production?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleDeleteClick}
        reject={() => undefined}
      />
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
