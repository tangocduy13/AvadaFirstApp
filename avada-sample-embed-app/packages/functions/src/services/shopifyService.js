import {addNotifications} from '@functions/repositories/notificationsRepository';
import {getNotification} from '@functions/helpers/utils/getNotification';

export async function addNotificationService(shopify, shop) {
  const orders = await shopify.order.list();

  const notificationList = await Promise.all(
    orders.map(orderData => getNotification({shopify, shop, orderData}))
  );

  await addNotifications(notificationList);
}
