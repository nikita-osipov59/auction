import { create } from "zustand";
import axios from "axios";

import { State } from "@/utils/interfaces";

export const useCardsStore = create<State>((set) => ({
  cards: [],
  fetchCard: async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_LOTS, {
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
