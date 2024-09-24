import React from "react";

import style from "./style.module.scss";
import { FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
