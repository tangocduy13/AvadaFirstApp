import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initShopify} from '@functions/helpers/utils/initShopify';
import {getNotification} from '@functions/helpers/utils/getNotification';
import {addOneNotification} from '@functions/repositories/notificationsRepository';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('x-shopify-shop-domain');
    const orderData = ctx.req.body;

    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

    const notificationList = await getNotification({shopify, shop, orderData});

    await addOneNotification(notificationList);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
  }
}
