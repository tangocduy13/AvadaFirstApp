import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {addDefaultSetting} from '@functions/repositories/settingsRepository';
import {initShopify} from '@functions/helpers/utils/initShopify';
// import {pushNotification} from '@functions/services/shopifyGraphQL';
import {syncNotification} from '@functions/services/syncNotification';
import {registerScriptTag} from '@functions/services/shopifyService';
import {registerWebhook} from '@functions/services/shopifyService';

export async function afterInstall(ctx) {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

    await Promise.all([
      syncNotification({shopify, shop}),
      addDefaultSetting(shop.id),
      registerWebhook(shopify)
      // registerScriptTag(shopify)
    ]);
  } catch (e) {
    console.error(e);
  }
}
