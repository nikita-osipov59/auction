import { FC } from "react";
import clsx from "clsx";

import { usePopupStore } from "@/store";

import { Cross } from "@/components/svg";

import { PopupsState } from "@/utils/interfaces";

import style from "./style.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  name: keyof PopupsState;
}

export const Popup: FC<ContainerProps> = ({ children, name }) => {
  const { toggleModal } = usePopupStore();

  return (
    <div className={style.popup} onClick={() => toggleModal(name)}>
      <div
        className={clsx("wrapper", style.item)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.cross} onClick={() => toggleModal(name)}>
          <Cross size={20} />
        </div>
        {children}
      </div>
    </div>
  );
};
