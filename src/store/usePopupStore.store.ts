import { create } from "zustand";

import { PopupStore } from "@/utils/interfaces";

export const usePopupStore = create<PopupStore>((set) => ({
  popups: {
    advancedSettings: false,
    profit: false,
  },
  toggleModal: (popup) =>
    set((state) => ({
      popups: {
        ...state.popups,
        [popup]: !state.popups[popup],
      },
    })),
}));
