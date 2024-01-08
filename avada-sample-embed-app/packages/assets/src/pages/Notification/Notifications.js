import React, {useState} from 'react';
import './Notifications.scss';
import moment from 'moment';
import {truncateString} from '../../helpers/utils/utils';
import {
  Layout,
  Page,
  Card,
  ResourceList,
  ResourceItem,
  TextStyle,
  Pagination,
  Stack,
  Frame,
  Loading
} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function Notifications() {
  const {data: settingValue} = useFetchApi({url: '/settings'});

  const {data: notifications, loading} = useFetchApi({url: '/notifications'});

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const promotedBulkActions = [
    {
      content: 'Mark as read',
      onAction: () => alert('Notifications has been read')
    }
  ];
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  if (loading) {
    return (
      <div style={{height: '100px'}}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    );
  }
  return (
    <Page title="Notifications" subtitle="List of sales notifications from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={notifications}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              resolveItemId={resolveItemIds}
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious
              onPrevious={() => {
                console.log('Previous');
              }}
              hasNext
              onNext={() => {
                console.log('Next');
              }}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );

  function renderItem(item) {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;
    const {hideTimeAgo, truncateProductName} = settingValue;
    return (
      <ResourceItem id={id} verticalAlignment="center">
        <Stack distribution="equalSpacing" alignment="leading">
          <div className="Avava-SP__Wrapper fadeInUp animated" style={{display: 'inline-block'}}>
            <div className="Avava-SP__Inner">
              <div className="Avava-SP__Container">
                <a href="#" className={'Avava-SP__LinkWrapper'}>
                  <div
                    className="Avava-SP__Image"
                    style={{
                      backgroundImage: `url(${productImage})`
                    }}
                  ></div>
                  <div className="Avada-SP__Content">
                    <div className={'Avada-SP__Title'}>
                      {firstName} in {city}, {country}
                    </div>
                    <div className={'Avada-SP__Subtitle'}>
                      purchased{' '}
                      {truncateProductName ? truncateString(productName, 16) : productName}
                    </div>
                    <div className={'Avada-SP__Footer'}>
                      {hideTimeAgo ? '' : `${moment(timestamp).fromNow()}`}{' '}
                      <span className="uni-blue">
                        <i className="fa fa-check" aria-hidden="true" /> by Avada
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <Stack vertical spacing="extraTight" alignment="trailing">
            <TextStyle className="DateInfo">{`From ${moment(timestamp).format(
              'MMMM DD,'
            )}`}</TextStyle>
            <TextStyle className="DateInfo">{`${moment(timestamp).format('YYYY')}`}</TextStyle>
          </Stack>
        </Stack>
      </ResourceItem>
    );
  }
  function resolveItemIds({id}) {
    return id;
  }
}
