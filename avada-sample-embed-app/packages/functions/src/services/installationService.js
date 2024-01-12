import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '@functions/helpers/utils/resolveAll';
import {addDefaultSetting} from '@functions/repositories/settingsRepository';
import {initShopify} from '@functions/helpers/utils/initShopify';
import {addNotificationService} from '@functions/services/shopifyService';

export async function afterInstall(ctx) {
  try {
    console.log(ctx.state.shopify);
    //* {
    //    shop: 'quicktrainingstore.myshopify.com',
    //    accessToken: 'shpua_088740c200c3b21375d3c90513d4ccf5'
    //  } */
    const shopifyDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = initShopify(shop);

    await resolveAll([addNotificationService(shopify, shop), addDefaultSetting(shop.id)]);
  } catch (e) {
    console.error(e);
  }
}
