import { useEffect } from "react";
import { useCardsStore } from "@/store/useCardsStore.store";
import style from "./style.module.scss";

export const Card = () => {
  const { cards, fetchCard } = useCardsStore();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCard();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchCard]);

  return (
    <ul className={style.box}>
      {cards.map((item) => (
        <li key={item.uniqueId}>
          <div className={style.wrapper}>
            <div className={style.title}>
              <img
                className={style.img}
                src={`/${item.itemId}.png`}
                alt={item.name}
              />
              <div className={item.qltInfo.labelQlt}>
                {item.name}
                {item.ptn && ` | ${item.ptn}`}
              </div>
            </div>
            <div className={item.qltInfo.labelQlt}>
              <p>
                <span>{item.qltInfo.labelQlt}</span>
                <span>
                  {item.explored ? (
                    <span>{item.qltInfo.labelPercentQlt}</span>
                  ) : (
                    <span>Not explored</span>
                  )}
                </span>
              </p>
            </div>
            <hr className={style.border} />
            <div className={style.info}>
              <p>
                Freshness
                <span className={style.white}>lll</span>
              </p>
              <p>
                Charge
                <span className={style.white}>{item.charge}%</span>
              </p>
              <p>
                Max Charge
                <span className={style.white}>100%</span>
              </p>
            </div>
            <hr className={style.border} />
            <div className={style.details}>
              {item.defaultBonusInfo.defaultBonuses.map((bonus) => (
                <p key={bonus.bonusName}>
                  {bonus.bonusName}
                  <span className="upgrade">{bonus.textMinAndMax}</span>
                </p>
              ))}
              {item.bonusInfo &&
                item.bonusInfo.map((bonus, index) => (
                  <p key={index}>
                    {bonus}
                    <span className="bonus">{"[bonus]"}</span>
                  </p>
                ))}
            </div>
          </div>
          <div className={style.priceWrapper}>
            <p>
              Cost
              <span className="cost">{item.cost} RUB</span>
            </p>
            <p>
              Target Price
              <span className="price">{item.targetPrice} RUB</span>
            </p>
            <p>
              Profit
              <span className="profit">
                +{item.profit} RUB ({item.profitPercent}%)
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
