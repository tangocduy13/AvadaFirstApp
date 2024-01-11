import {getNotifications} from '../repositories/notificationsRepository';
import {getCurrentUser} from '@functions/helpers/auth';

export async function getShopNotifications(ctx) {
  const {shopID} = await getCurrentUser(ctx);
  const data = await getNotifications({shopID, limit: 5, page: 1, sort: 'desc'});
  ctx.body = {data};
}
