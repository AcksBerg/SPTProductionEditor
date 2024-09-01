export interface Item {
    name: string;
    shortname: string;
    description: string;
  }
  
  export interface Area {
    name: string;
    areaId: number;
    maxLevel: number;
  }
  
  export interface Requirement {
    areaType?: number;
    requiredLevel?: number;
    templateId?: string;
    count?: number;
    isFunctional?: boolean;
    isEncoded?: boolean;
    type: "Area" | "Item" | "QuestComplete" | "Tool" | "Resource" | "GameVersion";
    questId?: string;
  }
  
  export interface Production {
    _id: string;
    areaType: number;
    requirements: Requirement[];
    productionTime: number;
    needFuelForAllProductionTime: boolean;
    locked: boolean;
    endProduct: string;
    continuous: boolean;
    count: number;
    productionLimitCount: number;
    isEncoded: boolean;
    isCodeProduction: boolean;
  }
  