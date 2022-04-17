const axios = require("axios");
const config = require("../config");
const queryString = require("query-string");

const { client_id, client_secret, request_token_url } = config.github;

module.exports = (server) => {
  server.use(async (ctx, next) => {
    if (ctx.path === "/auth") {
      const code = ctx.query.code;
      if (!code) {
        ctx.body = "code not exist";
        return;
      }

      const result = await axios({
        method: "POST",
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        header: {
          Accept: "application/json",
        },
      });

      if (result.status === 200 && result.data && !result.data.error) {
        const data = queryString.parse(result.data);
        ctx.session.githubAuth = data;
        const userInfoResp = await axios({
          method: "GET",
          url: "https://api.github.com/user",
          headers: {
            Authorization: `${data.token_type} ${data.access_token}`,
          },
        });
        ctx.session.userInfo = userInfoResp.data;
        ctx.redirect("/");
      } else {
        ctx.body = `request token fail ${result.message}`;
        return;
      }
    } else {
      await next();
    }
  });

  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    if (path === "/logout" && method === "POST") {
      ctx.session = null;
      ctx.body = "logout success";
    } else {
      await next();
    }
  });
};
