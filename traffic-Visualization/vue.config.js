module.exports = {
    publicPath: './',
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
  },
}
