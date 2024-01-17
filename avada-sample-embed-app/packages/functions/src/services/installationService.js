import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {addDefaultSetting} from '@functions/repositories/settingsRepository';
import {initShopify} from '@functions/helpers/utils/initShopify';
// import {pushNotification} from '@functions/services/shopifyGraphQL';
import {pushNotification} from '@functions/services/pushNotification';
import {createWebhook} from '@functions/services/createWebhook';
import {createScriptTag} from '@functions/services/createScriptTag';

export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

    // await resolveAll([pushNotification({shopify, shop}), addDefaultSetting(shop.id)]);
    await Promise.all([
      // pushNotification({shopify, shop}),
      // addDefaultSetting(shop.id),
      createWebhook(shopify),
      createScriptTag(shopify)
    ]);

    const webhookList = await shopify.webhook.list();
    console.log('webhookList', webhookList);
    const scripttagList = await shopify.scriptTag.list();
    console.log('scripttagList', scripttagList);
  } catch (e) {
    console.error(e);
  }
}
