import { create } from "zustand";
import axios from "axios";

import { State, IFormInput } from "@/utils/interfaces";

export const useCardsStore = create<State>((set) => ({
  loading: false,
  cards: [],
  getCards: async ({
    artifact,
    rarity,
    pattern,
    minProfit,
    minPercProfit,
  }: IFormInput) => {
    const urlParams = new URLSearchParams();

    if (artifact) urlParams.append("itemId", artifact);
    if (rarity) urlParams.append("qlt", rarity.toString());
    if (pattern) urlParams.append("ptn", pattern.toString());
    if (minProfit) urlParams.append("minProfit", minProfit.toString());
    if (minPercProfit)
      urlParams.append("profitPercent", minPercProfit.toString());
    try {
      const response = await axios.get(
        `http://213.150.86.6:8086/api/lots?${urlParams}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      set((state) => ({ cards: [...state.cards, ...response.data] }));
      set({ loading: true });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  },
}));
