import {FormLayout, Select, Stack, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

export default function Trigger({settingValue, handleSettingValue}) {
  const [selected, setSelected] = useState('All pages');

  const handleSelectChange = useCallback(value => setSelected(value), []);

  const options = [
    {
      label: 'All pages',
      value: 'All pages',
      contentBody: (
        <TextField
          label="Excluded pages"
          value={settingValue.excludedUrls}
          onChange={value => {
            handleSettingValue('excludedUrls', value);
          }}
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
        <Stack vertical>
          <TextField
            label="Included pages"
            value={settingValue.includedUrls}
            onChange={value => {
              handleSettingValue('includedUrls', value);
            }}
            multiline={4}
            autoComplete="off"
            helpText="Page URLs to show the pop-up (separated by new lines)"
          />
          <TextField
            label="Excluded pages"
            value={settingValue.excludedUrls}
            onChange={value => {
              handleSettingValue('excludedUrls', value);
            }}
            multiline={4}
            autoComplete="off"
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          />
        </Stack>
      )
    }
  ];

  const getContentBody = () => {
    const selectedOption = options.find(option => option.value === selected);
    return selectedOption ? selectedOption.contentBody : null;
  };

  return (
    <FormLayout>
      <Select options={options} onChange={handleSelectChange} value={selected} />
      {getContentBody()}
    </FormLayout>
  );
}
