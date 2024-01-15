import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {resolveAll} from '@functions/helpers/utils/resolveAll';
import {getSettings} from '@functions/repositories/settingsRepository';
import {getNotifications} from '@functions/repositories/notificationsRepository';

export async function getClientData(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    console.log('shopID', shop.id);
    const [settings, notifications] = await Promise.all([
      getSettings(shop.id),
      getNotifications({shopID: shop.id})
    ]);
    console.log('notifications', notifications);
    return (ctx.body = {
      data: {
        settings: settings,
        notifications: notifications
      },
      success: true
    });
  } catch (e) {
    console.error(e);
    ctx.body = {
      success: false
    };
  }
}
