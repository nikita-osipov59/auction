import { create } from "zustand";
import axios from "axios";

import { History } from "@/utils/interfaces";

export const useHistoryStore = create<History>((set) => ({
  isOpen: false,
  loading: false,
  history: [],
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  getHistory: async (id) => {
    try {
      set({ loading: false });
      const response = await axios.get(
        `http://213.150.86.6:8086/api/history?uniqueId=${id}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      set(() => ({ history: response.data }));
      set({ loading: true });
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  },
}));
