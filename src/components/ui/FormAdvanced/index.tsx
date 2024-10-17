import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useCardsStore, useFormStore } from "@/store";

import { IFormInput } from "@/utils/interfaces";

import {
  PatternRangeSlider,
  ProfitRangeSlider,
  RarityRangeSlider,
} from "@/components/ui";

import { Trash } from "@/components/svg";

import style from "./style.module.scss";

export const FormAdvanced = () => {
  const [submitData, setSubmitData] = useState<IFormInput>({});

  const { getCards } = useCardsStore();
  const { artifact } = useFormStore();

  const { register, handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues: {
      artifact: "",
      rarity: [0, 5],
      pattern: [0, 15],
      minProfit: [0, 15000],
      minPercProfit: [0, 15000],
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setSubmitData(data);
  };

  useEffect(() => {
    getCards(submitData);
    const interval = setInterval(() => {
      getCards(submitData);
    }, 10000);
    return () => clearInterval(interval);
  }, [submitData]);

  return (
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
          <li className={clsx(style.padding, style.item)}>
            <label htmlFor="rarity">Rarity</label>
            <Controller
              name="rarity"
              control={control}
              render={({ field: { onChange } }) => (
                <RarityRangeSlider min={0} max={5} setValue={onChange} />
              )}
            />
          </li>
          <li className={clsx(style.padding, style.item)}>
            <label htmlFor="pattern">Pattern</label>
            <Controller
              name="pattern"
              control={control}
              render={({ field: { onChange } }) => (
                <PatternRangeSlider min={0} max={15} setValue={onChange} />
              )}
            />
          </li>
          <li className={style.item}>
            <label>Profit</label>
            <Controller
              name="minProfit"
              control={control}
              render={({ field: { onChange } }) => (
                <ProfitRangeSlider min={0} max={15000} setValue={onChange} />
              )}
            />
          </li>
          <li className={style.item}>
            <label>Profit %</label>
            <Controller
              name="minPercProfit"
              control={control}
              render={({ field: { onChange } }) => (
                <ProfitRangeSlider min={0} max={15000} setValue={onChange} />
              )}
            />
          </li>
        </ul>
        <div className={style.buttons}>
          <button className={style.enterFilter} type="submit">
            Create
          </button>
          <button
            className={style.clearArtifacts}
            type="button"
            onClick={() => reset()}
          >
            <Trash size={20} /> Clear
          </button>
        </div>
      </div>
    </form>
  );
};
