import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '@functions/helpers/utils/resolveAll';
import {addDefaultSetting} from '@functions/repositories/settingsRepository';
import {initShopify} from '@functions/helpers/utils/initShopify';
import {pushNotification} from '@functions/services/pushNotification';
import {createWebhook} from '@functions/services/createWebhook';

export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    console.log('shopInfo', shop);
    const shopify = initShopify(shop);

    // await resolveAll([pushNotification({shopify, shop}), addDefaultSetting(shop.id)]);
    await Promise.all([
      pushNotification({shopify, shop}),
      addDefaultSetting(shop.id),
      createWebhook(shopify)
    ]);

    const listWebhook = await shopify.webhook.list();
    console.log('listWebhook', listWebhook);
  } catch (e) {
    console.error(e);
  }
}
