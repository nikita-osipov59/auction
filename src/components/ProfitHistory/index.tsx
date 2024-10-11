import { FC } from "react";

import { useHistoryStore } from "@/store";

import { HistoryItem, ID } from "@/utils/interfaces";

import { Loader } from "@/components/ui";

import style from "./style.module.scss";

export const ProfitHistory: FC<ID> = ({ id }) => {
  const { loading, history } = useHistoryStore();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  return (
    <ul>
      <div className={style.title}>
        <div>{`Auction #${id} price history`}</div>
      </div>
      {loading ? (
        history.map((item: HistoryItem, index) => (
          <li key={index} className={style.historyCard}>
            <div className={style.top}>
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
  );
};
