import React, {useEffect, useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
import {useFetchApi} from '../../hooks/api/useFetchApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const {dispatch} = useStore();

  return (
    <Page title="Home" fullWidth>
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextStyle>
              App status is{' '}
              <span style={{fontWeight: 'bold'}}>{enabled ? 'enabled' : 'disabled'}</span>{' '}
            </TextStyle>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
