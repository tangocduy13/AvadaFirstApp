import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {addNotifications} from '@functions/repositories/notificationsRepository';
import {resolveAll} from '@functions/helpers/utils/resolveAll';
import {addDefaultSetting} from '@functions/repositories/settingsRepository';

export async function afterInstall(ctx) {
  try {
    const {shop: shopifyDomain, accessToken} = ctx.state.shopify;
    const {id: shopId} = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken
    });

    const addNotificationsService = async () => {
      // get the order list
      const orders = await shopify.order.list();

      // get product list in order
      const productList = await Promise.all(
        orders.map(order => {
          const productId = order.line_items[0].product_id;
          return shopify.product.get(productId);
        })
      );

      function getNotification(order, index) {
        const shippingAddress = order.shipping_address;
        const firstName = shippingAddress.first_name;
        const city = shippingAddress.city;
        const country = shippingAddress.country;
        const timestamp = order.created_at;

        const productId = productList[index].id;
        const productImage = productList[index].image.src;
        const productName = productList[index].title;

        return {
          city,
          country,
          firstName,
          productId,
          productImage,
          productName,
          shopId,
          shopifyDomain,
          timestamp
        };
      }

      const notificationList = orders.map((order, index) => {
        return getNotification(order, index);
      });

      await addNotifications(notificationList);
    };

    await resolveAll([addNotificationsService(), addDefaultSetting(shopId)]);
  } catch (e) {
    console.error(e);
  }
}
