import App from 'koa';
import apiRouter from '@functions/routes/clientApi';
import * as errorService from '@functions/services/errorService';
import cors from '@koa/cors';

const api = new App();
api.proxy = true;

api.use(cors());
const router = apiRouter(true);
api.use(router.allowedMethods());
api.use(router.routes());

api.on('error', errorService.handleError);

export default api;
