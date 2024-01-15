import {addOneNotification} from '@functions/repositories/notificationsRepository';
import {prepareNotification} from '@functions/services/shopifyService';

export async function pushNotification({shopify, shop}) {
  const orders = await shopify.order.list({limit: 30});

  const productIds = orders.map(order => {
    return order.line_items[0].product_id;
  });

  const products = await shopify.product.list({ids: [...new Set(productIds)].toString()});

  const notifications = orders.map(order => {
    const product = products.find(product => product.id === order.line_items[0].product_id);

    if (!product) return {};
    return prepareNotification({shop, order, product});
  });

  await Promise.all(
    notifications.map(notification => {
      addOneNotification(notification);
    })
  );

  // await resolveAll(
  //   notifications.map(notification => {
  //     addOneNotification(notification);
  //   })
  // );
}
