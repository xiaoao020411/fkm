module.exports = {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/': {
        //是否允许跨域
        changeOrigin: true,
        // target: 'http://192.168.1.120:8080/'
        target: 'http://www.eshareedu.cn/fkm/',
        //  target: 'http://localhost:8080/edusystems/'
        // target: 'http://test.2004.com/'
      },
    },
  },
}
