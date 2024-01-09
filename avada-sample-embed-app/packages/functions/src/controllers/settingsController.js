import {updateSettings} from '@functions/repositories/settingsRepository';
import {getCurrentUser} from '@functions/helpers/auth';

export async function getShopSettings(ctx) {
  const {shopID} = getCurrentUser(ctx);
  const data = await settingsRepo.getSettings(shopID);
  ctx.body = {
    status: true,
    data
  };
}

export async function updateShopSettings(ctx) {
  const {shopID} = getCurrentUser(ctx);
  const {data} = ctx.req.body;
  await updateSettings(data, shopID);
  ctx.body = {
    status: true
  };
}
