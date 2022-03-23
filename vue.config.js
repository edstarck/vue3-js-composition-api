module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 4000,
    public: '0.0.0.0:4000'
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue3-js-composition-api'
  : '/'
}
