import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getSettings} from '@functions/repositories/settingsRepository';
import {getNotifications} from '@functions/repositories/notificationsRepository';

export async function getClientData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const [settings, notifications] = await Promise.all([
      getSettings(shop.id),
      getNotifications({shopID: shop.id})
    ]);

    return (ctx.body = {
      settings: settings,
      notifications: notifications
    });
  } catch (e) {
    console.error(e);
    ctx.body = {
      success: false
    };
  }
}
