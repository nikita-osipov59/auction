import { FC } from "react";

import { useHistoryStore } from "@/store";

import { HistoryItem, ID } from "@/utils/interfaces";

import { Cross, Loader } from "@/components/ui";

import style from "./style.module.scss";
import clsx from "clsx";

export const ProfitHistory: FC<ID> = ({ id }) => {
  const { loading, history, toggleModal } = useHistoryStore();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  return (
    <div className={style.popup} onClick={toggleModal}>
      <ul
        className={clsx("wrapper", style.item)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style.title}>
          <div>{`Auction #${id} price history`}</div>
          <div onClick={toggleModal}>
            <Cross />
          </div>
        </div>
        {loading ? (
          history.map((item: HistoryItem, index) => (
            <li key={index} className={style.historyCard}>
              <div className={style.test}>
                <img
                  className={style.img}
                  src={`/${item.itemId}.png`}
                  alt={item.itemName}
                />
                <div className={item.qltName}>
                  {item.itemName}
                  {item.ptn && ` | +${item.ptn}`}
                </div>
              </div>
              {item.bonuses && (
                <div className="bonus">
                  {item.bonuses!.map((bonus, index) => (
                    <p key={index}>{bonus}</p>
                  ))}
                </div>
              )}
              <div className={style.top}>
                <div>{new Date(item.time).toLocaleString()}</div>
                <div className="profit">{formatPrice(item.price)} RUB</div>
              </div>
            </li>
          ))
        ) : (
          <Loader />
        )}
      </ul>
    </div>
  );
};
