import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useCardsStore, useFormStore } from "@/store";
import { CardItem, IFormInput } from "@/utils/interfaces";

import { Trash } from "@/components/ui";

import style from "./style.module.scss";

export const Form = () => {
  const [prevCards, setPrevCards] = useState<CardItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const { cards } = useCardsStore();

  const { register, handleSubmit, resetField } = useForm<IFormInput>({
    defaultValues: {
      artifact: 0,
    },
  });
  const { artifact, fetchArtifacts } = useFormStore();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const audio = new Audio("/public/notification.mp3");

  const playNotificationSound = () => {
    audio.volume = 0.2;
    audio.play();
  };

  useEffect(() => {
    fetchArtifacts();
  }, [fetchArtifacts]);

  useEffect(() => {
    if (isChecked && cards.length > prevCards.length) {
      playNotificationSound();
    }
    setPrevCards(cards);
  }, [cards]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.box}>
        <ul className={style.list}>
          <li className={style.item}>
            <label>Artifact name</label>
            <select {...register("artifact")}>
              <option value="0">All</option>
              {artifact.artifactNames.list.map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  {item}
                </option>
              ))}
            </select>
          </li>
          <li className={style.item}>
            <label>Rarity</label>
            <select {...register("rarity")}>
              <option value="0">All</option>
              {artifact.artifactRarity.list.map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  {item}
                </option>
              ))}
            </select>
          </li>
          <li className={style.item}>
            <label>Pattern</label>
            <select {...register("pattern")}>
              <option value="0">All</option>
              {artifact.artifactPattern.list.map((item, index) => (
                <option key={index + 1} value={index + 1}>
                  {item}
                </option>
              ))}
            </select>
          </li>
          <li className={style.item}>
            <label>Min profit</label>
            <input
              {...register("MinProfit")}
              type="number"
              placeholder="Enter min profit"
            />
          </li>
          <li className={style.item}>
            <label>Min % profit</label>
            <input
              {...register("MinPercProfit")}
              type="number"
              placeholder="Enter min %"
            />
          </li>
        </ul>
        <div className={style.buttons}>
          <button className={style.enterFilter} type="submit">
            Enter filters
          </button>
          <button className={style.clearFilter} type="reset">
            <Trash /> Clear filters
          </button>
          <button
            className={style.clearArtifacts}
            type="button"
            onClick={() => resetField("artifact")}
          >
            <Trash /> Clear artifacts
          </button>
        </div>
        <div className={style.checkbox}>
          <div>
            <input id="sound" type="checkbox" />
            <label onClick={() => setIsChecked(!isChecked)} htmlFor="sound">
              Sound notification
            </label>
          </div>
          <div>
            <input id="commission" type="checkbox" />
            <label htmlFor="commission">Include commission in the profit</label>
          </div>
        </div>
      </div>
    </form>
  );
};
