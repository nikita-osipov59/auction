import style from "./style.module.scss";

export const Logo = () => {
  return (
    <>
      <img className={style.logo} src="/logo.png" alt="logo" />
    </>
  );
};
