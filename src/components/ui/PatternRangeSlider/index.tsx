import * as React from "react";
import "rc-slider/assets/index.css";
import Range from "rc-slider";

type NumberArray = Array<number | null>;

interface RangeSliderProps {
  min: number;
  max: number;
  setValue: (newValues: NumberArray) => void;
}

export const PatternRangeSlider: React.FC<RangeSliderProps> = ({
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
          0: "0",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
          6: "6",
          7: "7",
          8: "8",
          9: "9",
          10: "10",
          11: "11",
          12: "12",
          13: "13",
          14: "14",
          15: "15",
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
