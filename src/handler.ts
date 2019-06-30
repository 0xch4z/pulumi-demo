import Koa = require('koa');
import Router = require('koa-router');
import serverlessHttp = require('serverless-http');

const app = new Koa();
const router = new Router();

router.get('/hello/:name', (ctx, next) => {
  const name = ctx.params['name'];
  ctx.response.body = `Hello, ${name}!`;
  return next();
});

app.use(router.routes());

const handler = serverlessHttp(app);

export { app, handler };
