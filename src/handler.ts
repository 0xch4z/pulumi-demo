import Koa = require('koa');
import Router = require('koa-router');
import serverlessHttp = require('serverless-http');

const app = new Koa();
const router = new Router();

router.get('/hello/:name', (ctx, next) => {
  const name: string | undefined = ctx.params['name'];
  if (!name) {
    ctx.throw('name is required', 400);
  }
  ctx.response.body = `Hello, ${name}!`;
  return next();
});

const handler = serverlessHttp(app);

export { app, handler };
