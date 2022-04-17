const withCss = require("@zeit/next-css");
const config = require("./config");

const nextBaseconfig = {
  // 编译文件的输出目录
  distDir: "dest",
  // 是否给每个路由生成Etag
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 内容在缓存中的时长（ms）
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLength: 2,
  },
  // 在pages目录下哪种后缀的文件会被认为是页面
  pageExtensions: ["jsx", "js"],
  //配置buildId
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }
    // 返回null使用默认的unique id
    return null;
  },
  // 手动修改webpack配置
  webpack(config, options) {
    return config;
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware: (config) => {
    return config;
  },
  // 可以在页面上通过process.env.customKey获取value
  env: {
    customKey: "value",
  },
  // 下面两个要通过next/config来获取
  // 只有在服务的渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET,
  },
  // 在服务端和客户端渲染都可以获取到的配置
  publicRuntimeConfig: {
    staticFolder: "/static",
  },
};

// 配置nextjs支持css --start--
if (typeof require !== undefined) {
  require.extensions[".css"] = (file) => {};
}
// 配置nextjs支持css --end--

const GITHUB_OAUTG_URL = "https://github.com/login/oauth/authorize";
const SCOPE = "user";

module.exports = withCss({
  publicRuntimeConfig: {
    GITHUB_OAUTG_URL,
    OAUTH_URL: `${GITHUB_OAUTG_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`,
  },
});
