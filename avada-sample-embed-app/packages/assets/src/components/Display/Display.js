import React from 'react';
import './Display.scss';
import {Card, Checkbox, FormLayout, Stack} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import RangeSliderWithText from '../RangeSliderWithText/RangeSliderWithText';

export default function Display({settingValue, handleSettingValue}) {
  return (
    <>
      <Card.Section title="APPEARANCE">
        <FormLayout>
          <DesktopPositionInput
            label={'Desktop Position'}
            helpText="The display positon of the pop on your website"
            value={settingValue.position}
            onChange={value => {
              handleSettingValue('position', value);
            }}
          />
          <Stack vertical spacing="baseTight">
            <Checkbox
              label="Hide time ago"
              checked={settingValue.hideTimeAgo}
              onChange={value => {
                handleSettingValue('hideTimeAgo', value);
              }}
            />
            <Checkbox
              label="Truncate content text"
              checked={settingValue.truncateProductName}
              onChange={value => {
                handleSettingValue('truncateProductName', value);
              }}
              helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
            />
          </Stack>
        </FormLayout>
      </Card.Section>
      <Card.Section title="TIMING">
        <FormLayout>
          <FormLayout.Group>
            <RangeSliderWithText
              label={'Display duration'}
              min={0}
              max={10}
              helptext={'How long each pop will display in your page.'}
              suffix={'seconds(s)'}
              value={settingValue.displayDuration}
              onChange={value => {
                handleSettingValue('displayDuration', value);
              }}
            />
            <RangeSliderWithText
              label={'Time before first popup'}
              min={0}
              max={10}
              helptext={'The delay time before the first notification.'}
              suffix={'seconds(s)'}
              value={settingValue.firstDelay}
              onChange={value => {
                handleSettingValue('firstDelay', value);
              }}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <RangeSliderWithText
              label={'Gap time between two pops'}
              min={0}
              max={10}
              helptext={'The time interval between two popup notifications.'}
              suffix={'seconds(s)'}
              value={settingValue.popsInterval}
              onChange={value => {
                handleSettingValue('popsInterval', value);
              }}
            />
            <RangeSliderWithText
              label={'Maximum of popups'}
              min={0}
              max={80}
              helptext={'How long each pop will display in your page.'}
              suffix={'pop(s)'}
              value={settingValue.maxPopsDisplay}
              onChange={value => {
                handleSettingValue('maxPopsDisplay', value);
              }}
            />
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </>
  );
}
