import App from 'koa';
import apiRouter from '@functions/routes/clientApi';
import * as errorService from '@functions/services/errorService';

const api = new App();
api.proxy = true;

const router = apiRouter(true);
api.use(router.allowedMethods());
api.use(router.routes());

api.on('error', errorService.handleError);

export default api;
