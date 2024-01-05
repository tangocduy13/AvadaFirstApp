import {Select, Stack, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

export default function Trigger() {
  //---------------------Text Input Setting------------------//
  const [value, setValue] = useState('');

  const handleChange = useCallback(newValue => setValue(newValue), []);

  //---------------------Select Setting---------------------//
  const [selected, setSelected] = useState('All pages');

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const options = [
    {
      label: 'All pages',
      value: 'All pages',
      contentBody: (
        <TextField
          label="Excluded pages"
          value={value}
          onChange={handleChange}
          multiline={4}
          autoComplete="off"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        />
      )
    },
    {
      label: 'Specific pages',
      value: 'Specific pages',
      contentBody: (
        <>
          <TextField
            label="Included pages"
            value={value}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
            helpText="Page URLs to show the pop-up (separated by new lines)"
          />
          <TextField
            label="Excluded pages"
            value={value}
            onChange={handleChange}
            multiline={4}
            autoComplete="off"
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          />
        </>
      )
    }
  ];

  const getContentBody = () => {
    const selectedOption = options.find(option => option.value === selected);
    return selectedOption ? selectedOption.contentBody : null;
  };

  return (
    <Stack vertical>
      <Select options={options} onChange={handleSelectChange} value={selected} />
      {getContentBody()}
    </Stack>
  );
}
