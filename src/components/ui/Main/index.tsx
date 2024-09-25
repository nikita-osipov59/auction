import { FC } from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

export const Main: FC<ContainerProps> = ({ children }) => {
  return <main>{children}</main>;
};
