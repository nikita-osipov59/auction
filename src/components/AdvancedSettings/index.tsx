import { Popup } from "@/components/ui";

import { usePopupStore } from "@/store";

export const AdvancedSettings = () => {
  const { popups } = usePopupStore();

  return (
    <>
      {popups.advancedSettings && (
        <Popup name="advancedSettings">
          <div>settings</div>
        </Popup>
      )}
    </>
  );
};
