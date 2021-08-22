const path = require("path");
module.exports = {
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  publicPath: "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack相关配置 别名设置
  chainWebpack: (config) => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", path.resolve(__dirname, "./src"));
  },
  devServer: {
    open: false, //是否立即启动浏览器
    host: "localhost",
    port: 8006,
    https: false,
    hotOnly: false,
    // http 代理配置
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000/api',
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/api': ''
    //     }
    //   }
    // },
  },
};
