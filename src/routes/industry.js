import compose from 'koa-compose';
import koaRouter from 'koa-router';
import industryActions from '../transactional/industry/industryAction';

const path = require('path');

export const createIndustryRoutes = () => {
  const router = koaRouter();

  router.get('/', async (ctx) => {
    const response = await industryActions.getAllIndustrys(ctx.request.query);
    ctx.status = response.status;
    ctx.body = response;
  });

  router.get('/:industryId', async (ctx) => {
    const response = await industryActions.getIndustryByID(ctx.state.userId, ctx.params.industryId);

    ctx.status = response.status;
    ctx.body = response;
  });


  return router;
};



const storeServiceRouter = createIndustryRoutes();
export default compose([
  storeServiceRouter.routes(),
  storeServiceRouter.allowedMethods(),
]);
