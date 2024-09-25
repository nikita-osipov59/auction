import { create } from "zustand";

export interface State {
  name: string;
  charge: "";
  cost: number;
  profit: number;
  profitPercent: number;
  targetPrice: number;
  uniqueId: number;
  getCards: (state: State) => void;
}

export const useCardsStore = create<State>((set) => ({
  name: "",
  charge: "",
  cost: 0,
  profit: 0,
  profitPercent: 0,
  targetPrice: 0,
  uniqueId: 0,
  getCards: () =>
    set((state) => ({
      name: state.name,
      charge: state.charge,
      cost: state.cost,
      profit: state.profit,
      profitPercent: state.profitPercent,
      targetPrice: state.targetPrice,
      uniqueId: state.uniqueId,
    })),
}));
