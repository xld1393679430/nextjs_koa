const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const Redis = require("ioredis");
const RedisSessionStore = require("./server/session-store");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["xld develop GitHub App"];
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis),
  };

  server.use(session(SESSION_CONFIG, server));

  // 解决路由映射刷新页面404的问题
  router.get("/next-demo/detail/:id", async (ctx) => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/next-demo/detail",
      query: {
        id,
      },
    });
    ctx.response = false;
  });

  // 增加session
  router.get("/set/user", async (ctx) => {
    ctx.session.user = {
      name: "xld",
      age: 22,
    };
    ctx.body = "set session success";
  });

  // 删除session
  router.get("/delete/user", async (ctx) => {
    ctx.session = null;
    ctx.body = "delete session success";
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  server.listen(3000, () => {
    console.log("Koa server start on 3000");
  });
});
