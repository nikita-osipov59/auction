import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useCardsStore, useFormStore, usePopupStore } from "@/store";

import { CardItem, IFormInput } from "@/utils/interfaces";
import { AdvancedSettings } from "@/components";
import { Settings, Trash } from "@/components/svg";

import style from "./style.module.scss";

export const Form = () => {
  const [isActiveSettings, setIsActiveSetting] = useState<boolean>(false);
  const [prevCards, setPrevCards] = useState<CardItem[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<IFormInput>({
    artifact: null,
    rarity: null,
    pattern: null,
    minProfit: null,
    minPercProfit: null,
  });

  const { cards, getCards } = useCardsStore();
  const { artifact, fetchArtifacts } = useFormStore();
  const { toggleModal, popups } = usePopupStore();
  const { register, handleSubmit, resetField } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setSubmitData(data);
  };

  const audio = new Audio("/notification.mp3");

  const playNotificationSound = () => {
    audio.volume = 0.2;
    audio.play();
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  useEffect(() => {
    getCards(submitData);
    const interval = setInterval(() => {
      getCards(submitData);
    }, 10000);
    return () => clearInterval(interval);
  }, [submitData]);

  useEffect(() => {
    if (isChecked && cards.length > prevCards.length) {
      playNotificationSound();
    }
    setPrevCards(cards);
  }, [cards]);

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.box}>
          <ul className={style.list}>
            <li className={style.item}>
              <label>Artifact name</label>
              <select {...register("artifact")}>
                <option value="">All</option>
                {Object.entries(artifact.artifactNames.map!).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </li>
            <li className={style.item}>
              <label>Rarity</label>
              <select {...register("rarity")}>
                <option value="">All</option>
                {artifact.artifactRarity.list.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
            </li>
            <li className={style.item}>
              <label>Pattern</label>
              <select {...register("pattern")}>
                <option value="">All</option>
                {artifact.artifactPattern.list.map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
            </li>
            <li className={style.item}>
              <label>Min profit</label>
              <input
                {...register("minProfit")}
                type="number"
                placeholder="Enter min profit"
              />
            </li>
            <li className={style.item}>
              <label>Min % profit</label>
              <input
                {...register("minPercProfit")}
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
              <Trash size={20} /> Clear filters
            </button>
            <button
              className={style.clearArtifacts}
              type="button"
              onClick={() => resetField("artifact")}
            >
              <Trash size={20} /> Clear artifacts
            </button>
            {isActiveSettings && (
              <button
                className={style.settings}
                type="button"
                onClick={() => toggleModal("advancedSettings")}
              >
                <Settings size={20} /> Settings
              </button>
            )}
          </div>
          <div className={style.checkbox}>
            <label onChange={() => setIsChecked(!isChecked)} htmlFor="sound">
              <input id="sound" type="checkbox" />
              Sound notification
            </label>
            <label htmlFor="commission">
              <input id="commission" type="checkbox" />
              Include commission in the profit
            </label>
            <label
              htmlFor="advanced"
              onChange={() => setIsActiveSetting(!isActiveSettings)}
            >
              <input id="advanced" type="checkbox" />
              Advanced settings
            </label>
          </div>
        </div>
      </form>
      {popups.advancedSettings && <AdvancedSettings />}
    </>
  );
};
