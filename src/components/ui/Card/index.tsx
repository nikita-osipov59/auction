import { useEffect, useState } from "react";
import { getCards } from "@/api";
import style from "./style.module.scss";

interface Bonus {
  bonusName: string;
  textMinAndMax: string;
}

interface DefaultBonusInfo {
  defaultBonuses: Bonus[];
}

interface CardItem {
  uniqueId: number;
  itemId: string;
  name: string;
  qlt: number;
  charge: number;
  cost: number;
  targetPrice: number;
  profit: number;
  explored?: boolean;
  ptn?: string;
  qltInfo: {
    labelQlt: string;
    labelPercentQlt?: string;
  };
  defaultBonusInfo: DefaultBonusInfo;
  bonusInfo?: string[];
}

export const Card = () => {
  const [cards, setCards] = useState<CardItem[]>([]);

  const getCardsList = async () => {
    const currentCards = await getCards();
    setCards(currentCards);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCardsList();
    }, 10000);

    // getCardsList();

    return () => clearInterval(interval);
  }, []);

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
              <span className="cost">{item.cost}</span>
            </p>
            <p>
              Target Price
              <span className="price">{item.targetPrice}</span>
            </p>
            <p>
              Profit
              <span className="profit">{item.profit}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
