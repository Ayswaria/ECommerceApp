const common = require('./webpack.common');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 4002,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
