import * as functions from 'firebase-functions';

const {app} = functions.config();

export function prepareNotification({shop, order, product}) {
  const shipping_address = order?.shipping_address;
  if (!shipping_address) return {};

  return {
    city: shipping_address.city,
    country: shipping_address.country,
    firstName: shipping_address.first_name,
    productId: product.id,
    productImage: product.image.src,
    productName: product.title,
    shopId: shop.id,
    shopifyDomain: shop.shopifyDomain,
    timestamp: order.created_at
  };
}

export async function registerScriptTag(shopify) {
  const listScriptTags = await shopify.scriptTag.list();

  await Promise.all(
    listScriptTags.map(async scripttag => {
      await shopify.scriptTag.delete(scripttag.id);
    })
  );

  await shopify.scriptTag.create({
    event: 'onload',
    src: `https://${app.scripttag_url}`
  });
}

export async function registerWebhook(shopify) {
  const listWebhook = await shopify.webhook.list();
  // delete old webhooks
  await Promise.all(
    listWebhook.map(async webhook => {
      await shopify.webhook.delete(webhook.id);
    })
  );
  // create new webhook
  await shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${app.webhook_url}/webhook/order/new`,
    format: 'json'
  });
}
