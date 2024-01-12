import {addNotifications} from '@functions/repositories/notificationsRepository';
import {getNotification} from '@functions/helpers/utils/getNotification';

export async function addNotificationService(shopify, shop) {
  const orders = await shopify.order.list();
  const {id: shopId, shopifyDomain} = shop;

  const notificationList = await Promise.all(
    orders.map(order => getNotification({shopify, shop, order}))
  );

  await addNotifications(notificationList);
}
