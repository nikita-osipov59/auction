import { FormAdvanced, Popup } from "@/components/ui";

import { usePopupStore } from "@/store";

import style from "./style.module.scss";

export const AdvancedSettings = () => {
  const { popups } = usePopupStore();

  return (
    <>
      {popups.advancedSettings && (
        <Popup name="advancedSettings">
          <div className={style.title}>Advanced settings</div>
          <FormAdvanced />
        </Popup>
      )}
    </>
  );
};
