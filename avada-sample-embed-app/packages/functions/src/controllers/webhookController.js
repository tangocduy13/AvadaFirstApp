import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {initShopify} from '@functions/helpers/utils/initShopify';
import {addOneNotification} from '@functions/repositories/notificationsRepository';
import {prepareNotification} from '@functions/services/shopifyService';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('x-shopify-shop-domain');
    const orderData = ctx.req.body;
    console.log(orderData);
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

    const productId = orderData?.line_items[0]?.product_id;
    const product = await shopify.product.get(productId);

    const notification = await prepareNotification({shop, order: orderData, product});
    await addOneNotification(notification);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
  }
}
