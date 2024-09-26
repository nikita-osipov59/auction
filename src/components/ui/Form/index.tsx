import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useFormStore } from "@/store";

import style from "./style.module.scss";
import { Trash } from "../Trash";

interface IFormInput {
  artifact: string;
  rarity: string;
  pattern: string;
  MinProfit: string;
  MinPercProfit: string;
}

export const Form = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { artifact, fetchArtifacts } = useFormStore();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    fetchArtifacts();
  }, [fetchArtifacts]);

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
          <button className={style.clearFilter} type="submit">
            <Trash /> Clear filters
          </button>
          <button className={style.clearArtifacts} type="submit">
            <Trash /> Clear artifacts
          </button>
        </div>
      </div>
    </form>
  );
};
