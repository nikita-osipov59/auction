import * as React from "react";
import "rc-slider/assets/index.css";
import Range from "rc-slider";

type NumberArray = Array<number | null>;

interface RangeSliderProps {
  min: number;
  max: number;
  setValue: (newValues: NumberArray) => void;
}

export const RarityRangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  setValue,
}) => {
  const handleSliderChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setValue(values as NumberArray);
    } else {
      setValue([values]);
    }
  };

  return (
    <>
      <Range
        range
        marks={{
          0: "Common",
          1: "Uncommon",
          2: "Special",
          3: "Rare",
          4: "Exceptional",
          5: "Legendary",
        }}
        step={1}
        defaultValue={[min, max]}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
    </>
  );
};
