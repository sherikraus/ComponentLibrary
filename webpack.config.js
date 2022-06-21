const path = require('path');
const fs = require('fs');
const FSBuilder = require('./catelog/FSBuilder');
const crawlComponents = require('./scripts/scssRender');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const fsBuilder = new FSBuilder('./components');
const componentEntry = (component) => {
  const entries = [
    'core-js/modules/es.array.iterator',
    '@webcomponents/template/template.js',
    './components/shared/p2p-webcomponents-ce.js',
    './components/shared/fonts.scss',
    './components/shared/auro.scss',
    './components/shared/auro-components.js',
  ];
  if (fs.existsSync(`${component.dir}/index.js`)) {
    entries.push(`${component.dir}/index.js`);
  }
  if (fs.existsSync(`${component.dir}/index.ts`)) {
    entries.push(`${component.dir}/index.ts`);
  }
  if (fs.existsSync(`${component.dir}/styles.scss`)) {
    entries.push(`${component.dir}/styles.scss`);
  }
  return entries;
};

const buildEntries = () => {
  const entries = {};
  const components = fsBuilder.components;
  components.forEach((c) => {
    entries[`${c.name}/main`] = componentEntry(c);
  });
  return entries;
};

buildEntries();

const config = {
  entry: buildEntries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    jsonpFunction: 'wpJsonpPathToPurchase',
  },
  plugins: [
    /* Cleans the dist folder on build */
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        /* Transpile JS from source and Web Component packages in ES6 */
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'components'),
          path.resolve(__dirname, 'node_modules/lit-element'),
          path.resolve(__dirname, 'node_modules/lit-html'),
          path.resolve(__dirname, 'node_modules/@alaskaairux'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        /* Process SASS and extract CSS into separate
         file instead of bundling with JS */
        /*  */
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /([\\/]node_modules[\\/]|[\\/]components[\\/]shared[\\/])/,
          name: 'shared/component-base',
        },
      },
    },
  },
};

const BuildCSSAfterReload = function() {
  this.apply = function(compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('webpack-arbitrary-code', crawlComponents);
    }
  };
};
module.exports = (env, argv) => {
  argv = argv || {};

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
    config.watch = true;
    config.watchOptions = {
      ignored: ['hooks'],
    };
    config.plugins.push(new BuildCSSAfterReload());
  } else if (argv.env === 'debug') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  config.resolve = {
    extensions: ['.tsx', '.ts', '.js'],
  };

  config.node = {
    fs: 'empty',
  };

  return config;
};

