const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = __dirname;

const transpileModules = [
  'react-native',
  'react-native-web',
  '@react-native',
  '@react-native-async-storage',
  'react-native-screens',
  'react-native-safe-area-context',
  'react-native-gesture-handler',
  'react-native-vector-icons',
];

const transpileRegex = new RegExp(
  `node_modules[\\/](${transpileModules.join('|')})[\\/]`,
);

module.exports = {
  entry: path.resolve(appDirectory, 'index.web.js'),
  output: {
    path: path.resolve(appDirectory, 'web-build'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: filePath =>
          /node_modules/.test(filePath) && !transpileRegex.test(filePath),
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',
            presets: ['module:@react-native/babel-preset'],
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|otf|eot|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [
      '.mjs',
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],
    mainFields: ['browser', 'main'],
    alias: {
      'react-native$': 'react-native-web',
      '@react-native-async-storage/async-storage': path.resolve(
        appDirectory,
        '__mocks__/async-storage-web.js',
      ),
      'react-native-vector-icons/Ionicons': path.resolve(
        appDirectory,
        '__mocks__/react-native-vector-icons-web.js',
      ),
      '@react-native/new-app-screen': path.resolve(
        appDirectory,
        '__mocks__/new-app-screen-web.js',
      ),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'public/index.html'),
    }),
  ],
};
