import React, {useCallback, useState} from 'react';
import {Card, RangeSlider, TextField} from '@shopify/polaris';

export default function RangeSliderWithtext({label, min, max, value, helptext, onChange, suffix}) {
  const [rangeValue, setRangeValue] = useState(value);

  const handleRangeSliderChange = useCallback(value => setRangeValue(value), []);

  return (
    <RangeSlider
      output
      label={label}
      min={min}
      max={max}
      value={rangeValue}
      onChange={handleRangeSliderChange}
      helpText={helptext}
      suffix={
        <div style={{width: '110px'}}>
          <TextField
            value={rangeValue.toString()}
            suffix={suffix}
            autoComplete="off"
            onChange={value => {
              handleRangeSliderChange(value);
            }}
          ></TextField>
        </div>
      }
    />
  );
}
