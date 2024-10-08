export interface QuestList {
  [id: string]: string; 
}

export interface Item {
  name: string;
  shortname: string;
  description: string;
}

export interface ItemList {
  [id: string]: Item;
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
  type: string;
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
