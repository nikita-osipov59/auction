import { create } from "zustand";
import axios from "axios";

interface Bonus {
  bonusName: string;
  textMinAndMax: string;
}

interface DefaultBonusInfo {
  defaultBonuses: Bonus[];
}

interface QltInfo {
  labelQlt: string;
  labelPercentQlt?: string;
}

interface CardItem {
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

interface State {
  cards: CardItem[];
  fetchCard: () => Promise<void>;
}

export const useCardsStore = create<State>((set) => ({
  cards: [],
  fetchCard: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_KEY, {
        headers: {
          accept: "application/json",
        },
      });
      set((state) => ({ cards: [...state.cards, ...response.data] }));
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  },
}));
