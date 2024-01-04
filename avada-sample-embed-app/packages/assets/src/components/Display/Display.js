import React, {useState, useCallback} from 'react';
import './Display.scss';
import {Card, Checkbox, FormLayout, Stack} from '@shopify/polaris';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';
import RangeSliderWithtext from '../RangeSliderWithText/RangeSliderWithText';

export default function Display({settingValue, handleSettingValue}) {
  //-------------------Hide time checkbox setting-------------------//
  const [hideTime, setHideTime] = useState(false);
  const handleChangeTime = useCallback(newChecked => setHideTime(newChecked), []);

  //-----------------Truncate content text setting--------------------//
  const [truncateContent, setTruncateContent] = useState(false);
  const handleChangeContent = useCallback(newChecked => setTruncateContent(newChecked), []);

  return (
    <FormLayout>
      <Card.Section title="APPEARANCE">
        <FormLayout>
          <DesktopPositionInput
            label={'Desktop Position'}
            helpText="The display positon of the pop on your website"
            value={settingValue}
            onChange={value => {
              handleSettingValue('position', value);
            }}
          />
          <Stack vertical spacing="baseTight">
            <Checkbox label="Hide time ago" checked={hideTime} onChange={handleChangeTime} />
            <Checkbox
              label="Truncate content text"
              checked={truncateContent}
              onChange={handleChangeContent}
              helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
            />
          </Stack>
        </FormLayout>
      </Card.Section>
      <Card.Section title="TIMING">
        <FormLayout>
          <FormLayout.Group>
            <RangeSliderWithtext
              label={'Display duration'}
              min={0}
              max={5}
              helptext={'How long each pop will display in your page.'}
              suffix={'seconds(s)'}
              value={2} // sau lấy dữ liệu từ bên setting
            />
            <RangeSliderWithtext
              label={'Time before first popup'}
              min={0}
              max={10}
              helptext={'The delay time before the first notification.'}
              suffix={'seconds(s)'}
              value={10} // sau lấy dữ liệu từ bên setting
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <RangeSliderWithtext
              label={'Gap time between two pops'}
              min={0}
              max={10}
              helptext={'The time interval between two popup notifications.'}
              suffix={'seconds(s)'}
              value={2} // sau lấy dữ liệu từ bên setting
            />
            <RangeSliderWithtext
              label={'Maximum of popups'}
              min={0}
              max={80}
              helptext={'How long each pop will display in your page.'}
              suffix={'pop(s)'}
              value={20} // sau lấy dữ liệu từ bên setting
            />
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </FormLayout>
  );
}
