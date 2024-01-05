import React, {useCallback, useState} from 'react';
import './Settings.scss';
import {Layout, Page, Card, Tabs} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import Display from '../../components/Display/Display';
import Trigger from '../../components/Trigger/Trigger';
import useFetchApi from '../../hooks/api/useFetchApi';
import defaultSettings from '../../const/defaultSettings';

export default function Settings() {
  const {data: settingValue, loading, handleChangeInput: handleSettingValue} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });

  //------------------------------Tabs Setting---------------------------//
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);
  const tabs = [
    {
      id: 'display',
      content: 'Display',
      contentBody: <Display settingValue={settingValue} handleSettingValue={handleSettingValue} />
    },
    {
      id: 'trigger',
      content: 'Trigger',
      contentBody: <Trigger />
    }
  ];

  //-----------------------------End Tabs Setting-------------------------//
  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      fullWidth
      primaryAction={{
        content: 'Save',
        onAction: () => {
          alert('Saved');
        }
      }}
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup settings={settingValue} />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section>{tabs[selected].contentBody}</Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
