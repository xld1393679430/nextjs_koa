const withCss = require('@zeit/next-css');

// 配置nextjs支持css --start--
if(typeof require !== undefined) {
    require.extensions['.css'] = file => {}
}
// 配置nextjs支持css --end--

module.exports = withCss({})