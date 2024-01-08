import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';

export default function RangeSliderWithText({label, min, max, value, helptext, onChange, suffix}) {
  return (
    <RangeSlider
      output
      label={label}
      min={min}
      max={max}
      value={value.toString()}
      onChange={onChange}
      helpText={helptext}
      suffix={
        <div style={{width: '110px'}}>
          <TextField
            value={value.toString()}
            suffix={suffix}
            autoComplete="off"
            onChange={onChange}
          ></TextField>
        </div>
      }
    />
  );
}
