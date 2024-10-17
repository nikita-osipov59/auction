import React, { useState } from "react";
import Range from "rc-slider";

import "rc-slider/assets/index.css";

import style from "./style.module.scss";

type NumberArray = Array<number | null>;

interface RangeSliderProps {
  min: number;
  max: number;
  setValue: (newValues: NumberArray) => void;
}

export const ProfitRangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  setValue,
}) => {
  const [sliderValues, setSliderValues] = useState<number[]>([min, max]);

  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setSliderValues(values);
      setValue(values as NumberArray);
    } else {
      setSliderValues([values]);
      setValue([values]);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      const newValues = [...sliderValues];
      newValues[index] = newValue;

      setSliderValues(newValues);
      setValue(newValues as NumberArray);
    }
  };

  return (
    <>
      <Range
        range
        step={1}
        value={sliderValues}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
      <div className={style.box}>
        <label className={style.title}>
          <input
            type="number"
            value={sliderValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            min={min}
            max={sliderValues[1]}
          />
          min
        </label>
        <label className={style.title}>
          <input
            type="number"
            value={sliderValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            min={sliderValues[0]}
            max={max}
          />
          max
        </label>
      </div>
    </>
  );
};
