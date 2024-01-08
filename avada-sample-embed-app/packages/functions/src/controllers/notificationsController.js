import {getNotifications} from '../repositories/notificationsRepository';
export async function getShopNotifications(ctx) {
  const data = await getNotifications();
  ctx.body = {data};
}
