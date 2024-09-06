import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import areaList from "../data/area.json";
import itemList from "../data/item.json";
import questList from "../data/quest.json";
import { Requirement } from "../types";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { PrimeIcons } from "primereact/api";

interface EditRequirementPanelProps {
  requ: Requirement;
  onRequirementChange: (updatedRequirement: Requirement) => void;
  onDelete: () => void;
}

export const EditRequirementPanel = ({
  requ,
  onRequirementChange,
  onDelete
}: EditRequirementPanelProps) => {
  const handleRequirementChange = (field: keyof Requirement, value: any) => {
    const updatedRequirement = { ...requ, [field]: value };
    onRequirementChange(updatedRequirement);
  };

  const renderRequirement = () => {
    switch (requ.type) {
      case "Area":
        return (
          <>
            <div className="flex align-items-center mt-1">
              <span className="col-2">Area:</span>
              <Dropdown
                value={requ.areaType}
                options={areaList}
                optionLabel="name"
                optionValue="areaId"
                onChange={(e) => handleRequirementChange("areaType", e.value)}
                placeholder="Select an area"
                className="col-5 requ-input"
              />
            </div>
            <div className="flex align-items-center mt-1">
              <span className="col-2">Area Level:</span>
              <Slider
                value={requ.requiredLevel}
                onChange={(e) =>
                  handleRequirementChange("requiredLevel", e.value)
                }
                min={1}
                max={
                  areaList.find((area) => area.areaId === requ.areaType)
                    ?.maxLevel
                }
                className="col-5 requ-input"
              />
              <span className="ml-3">{requ.requiredLevel}</span>
            </div>
          </>
        );
      case "Item":
        return (
          <>
            <div className="flex align-items-center mt-1">
              <span className="col-2">Item:</span>
              <Dropdown
                value={requ.templateId}
                options={Object.keys(itemList).map((id) => ({
                  label: itemList[id].name,
                  value: id,
                }))}
                onChange={(e) => handleRequirementChange("templateId", e.value)}
                placeholder="Select an item"
                className="col-5 requ-input"
                filter
              />
            </div>
            <div className="flex align-items-center mt-1">
              <span className="col-2">Count:</span>
              <InputNumber
                value={requ.count}
                onValueChange={(e) => handleRequirementChange("count", e.value)}
                placeholder="Enter count"
                min={1}
                className="col-5 requ-input"
              />
            </div>
          </>
        );
      case "Tool":
        return (
          <div className="flex align-items-center mt-1">
            <span className="col-2">Item:</span>
            <Dropdown
              value={requ.templateId}
              options={Object.keys(itemList).map((id) => ({
                label: itemList[id].name,
                value: id,
              }))}
              onChange={(e) => handleRequirementChange("templateId", e.value)}
              placeholder="Select a tool"
              className="col-5 requ-input"
              filter
            />
          </div>
        );
      case "QuestComplete":
        return (
          <div className="flex align-items-center mt-1">
            <span className="col-2">Quest:</span>
            <Dropdown
              value={requ.questId}
              options={Object.keys(questList).map((id) => ({
                label: questList[id],
                value: id,
              }))}
              onChange={(e) => handleRequirementChange("questId", e.value)}
              placeholder="Select a quest"
              className="col-5 requ-input"
              filter
            />
          </div>
        );
      default:
        return <div>Not implemented yet</div>;
    }
  };

  return (
    <div className="col-12">
      <div className="flex align-items-center mt-1">
          <span className="col-2">Type:</span>
          <Dropdown
            value={requ.type}
            options={[
              { label: "Area", value: "Area" },
              { label: "Item", value: "Item" },
              { label: "Tool", value: "Tool" },
              { label: "QuestComplete", value: "QuestComplete" },
            ]}
            onChange={(e) => handleRequirementChange("type", e.value)}
            className="col-5 requ-input"
          />
        <Button severity="danger" icon={PrimeIcons.TRASH} className="panelHeader-button ml-3" onClick={onDelete} />
      </div>
      <div className="col-12">{renderRequirement()}</div>
    </div>
  );
};
