export interface Bonus {
  bonusName: string;
  textMinAndMax: string;
}

export interface DefaultBonusInfo {
  defaultBonuses: Bonus[];
}

export interface QltInfo {
  labelQlt: string;
  labelPercentQlt?: string;
}

export interface CardItem {
  name: string;
  charge: number;
  cost: number;
  profit: number;
  profitPercent: number;
  targetPrice: number;
  uniqueId: number;
  itemId: string;
  qlt: number;
  explored?: boolean;
  ptn?: string;
  qltInfo: QltInfo;
  defaultBonusInfo: DefaultBonusInfo;
  bonusInfo?: string[];
}

export interface State {
  cards: CardItem[];
  getCards: (params: IFormInput) => Promise<void>;
}

export interface IFormInput {
  artifact?: string;
  rarity?: string;
  pattern?: string;
  minProfit?: string;
  minPercProfit?: string;
}
