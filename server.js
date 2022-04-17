const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();


  // 解决路由映射刷新页面404的问题
  router.get('/next-demo/detail/:id', async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: '/next-demo/detail',
      query: {
        id
      }
    })
    ctx.response = false;
  })

  server.use(router.routes());

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  server.listen(3000, () => {
    console.log("Koa server start on 3000");
  });
});
