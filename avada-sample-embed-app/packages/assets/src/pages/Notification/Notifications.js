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
  Stack
} from '@shopify/polaris';

export default function Notifications() {
  //------------------------Products setting----------------------//
  const product1 = {
    id: 1,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timestamp: `${new Date()}`,
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rzj2EAe2nS5OvZKYW3_MuXJMH8zdGp7dCw&usqp=CAU',
    settings: {hideTimeAgo: false, truncateProductName: false}
  };
  const product2 = {
    id: 2,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timestamp: `${new Date()}`,
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rzj2EAe2nS5OvZKYW3_MuXJMH8zdGp7dCw&usqp=CAU',
    settings: {hideTimeAgo: false, truncateProductName: false}
  };
  const product3 = {
    id: 3,
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timestamp: `${new Date()}`,
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4rzj2EAe2nS5OvZKYW3_MuXJMH8zdGp7dCw&usqp=CAU',
    settings: {hideTimeAgo: false, truncateProductName: false}
  };
  const [products, setProducts] = useState([product1, product2, product3]);
  //--------------------------End Products Setting----------------------//
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
  return (
    <Page title="Notifications" subtitle="List of sales notifications from Shopify" fullWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={products}
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
    const {id, firstName, city, country, productName, timestamp, productImage, settings} = item;
    const {hideTimeAgo, truncateProductName} = settings;
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
