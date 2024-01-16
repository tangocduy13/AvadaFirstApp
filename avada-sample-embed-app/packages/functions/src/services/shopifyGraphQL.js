import axios from 'axios';
import {addOneNotification} from '@functions/repositories/notificationsRepository';
import {convertToId} from '@functions/helpers/utils/convertToId';

export async function pushNotification(shop) {
  const {shopId, shopifyDomain, accessToken} = shop;
  const url = `https://${shopifyDomain}/admin/api/2023-10/graphql.json`;

  try {
    const {data: docs} = await axios.post(
      url,
      {
        query: `
        {
          orders(first: 30, sortKey:CREATED_AT, reverse:true) {
            edges {
              node {
               id
               shippingAddress {
                 firstName
                 city
                 country
               }
               createdAt
                lineItems(first:1){
                  edges{
                    node{
                      image{
                        url
                      }
                      product{
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
         `
      },
      {
        headers: {
          'X-Shopify-Access-Token': accessToken
        }
      }
    );
    const ordersData = docs.data.orders.edges || [];

    const notifications = ordersData.map(order => {
      const orderData = order.node;
      const shippingAddress = order.shippingAddress;
      const lineItems = order.lineItems.edges[0].node || {};

      return {
        firstName: shippingAddress.firstName,
        city: shippingAddress.city,
        country: shippingAddress.country,
        productId: convertToId(lineItems.product.id),
        productImage: lineItems.image.url,
        productName: lineItems.product.title,
        timestamp: new Date(orderData.createdAt),
        shopId,
        shopifyDomain
      };
    });

    await Promise.all(
      notifications.map(notification => {
        addOneNotification(notification);
      })
    );
  } catch (e) {
    console.error(e);
  }
}
