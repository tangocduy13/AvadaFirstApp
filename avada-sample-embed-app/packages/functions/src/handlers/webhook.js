import App from 'koa';
import apiRouter from '@functions/routes/webhook';
import * as errorService from '@functions/services/errorService';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

const router = apiRouter(true);
// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());
// Handling all errors
api.on('error', errorService.handleError);

export default api;
