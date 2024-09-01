import areaList from "../data/area.json";
import itemList from "../data/item.json";
import questList from "../data/quest.json";
import { Requirement } from "../types";

interface RequirementPanelProps {
  requ: Requirement;
}

export const RequirementPanel = ({ requ }: RequirementPanelProps) => {
  const renderRequirement = () => {
    switch (requ.type) {
      case "Area":
        return (
          <>
            <div>
              Area: {areaList.find((area) => area.areaId === requ.areaType)?.name}
            </div>
            <div>
              Area level needed: {requ.requiredLevel} /{" "}
              {areaList.find((area) => area.areaId === requ.areaType)?.maxLevel}
            </div>
          </>
        );
      case "Item":
        return (
          <>
            <div>Item: {itemList[requ.templateId as keyof typeof itemList].name}</div>
            <div>Needed: {requ.count}</div>
          </>
        );
      case "Tool":
        return (
          <div>Item: {itemList[requ.templateId as keyof typeof itemList].name}</div>
        );
      case "QuestComplete":
        return (
          <div>Quest to Complete: {questList[requ.questId as keyof typeof questList]}</div>
        );
      default:
        return "Not implemented yet";
    }
  };

  return (
    <div className="col-12">
      <span className="col-2">Type: {requ.type}</span>
      <div className="ml-2 col-10">{renderRequirement()}</div>
    </div>
  );
};
