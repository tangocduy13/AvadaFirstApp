import Router from 'koa-router';
import {listenNewOrder} from '@functions/controllers/webhookController';

export default function webhookRouter() {
  const router = new Router({
    prefix: '/webhook'
  });
  router.post('/order/new', listenNewOrder);
  return router;
}
