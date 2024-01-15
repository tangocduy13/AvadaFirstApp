import * as functions from 'firebase-functions';

const {app} = functions.config();

export async function createWebhook(shopify) {
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
