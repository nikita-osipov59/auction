import { NavLink } from "react-router-dom";

import { ROUTER_PATH } from "@/router/PATH/";
import { Logo } from "@/components/ui";
import style from "./style.module.scss";

export const Header = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink to={ROUTER_PATH.HOME}>
          <Logo />
        </NavLink>
        <ul className={style.list}>
          <li>
            <NavLink className={style.link} to={ROUTER_PATH.HOME}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={style.link} to={ROUTER_PATH.FEATURES}>
              Features
            </NavLink>
          </li>
          <li>
            <NavLink className={style.link} to={ROUTER_PATH.PRICING}>
              Pricing
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
