const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const config = require('sapper/config/webpack.js')

const sveltePreprocess = require('svelte-preprocess')

const pkg = require('./package.json')

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const hot = dev && process.env.HOT != 0

const alias = { svelte: path.resolve('node_modules', 'svelte') }
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html']
const mainFields = ['svelte', 'module', 'browser', 'main']

const preprocess = sveltePreprocess({ postcss: true })

const styleLoader = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    'style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: ['./src', './node_modules'],
        },
      },
    },
  ],
}

const sassPlugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].[id].css',
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true,
  }),
]

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        styleLoader,
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader-hot',
            options: {
              preprocess,
              dev, // NOTE dev mode is REQUIRED for HMR
              hydratable: true,
              hotReload: hot,
              hotOptions: {
                // optimistic will try to recover from runtime errors during
                // component init (instead of doing a full reload)
                optimistic: true,
              },
            },
          },
        },
      ],
    },
    mode,
    plugins: [
      ...sassPlugins,

      // pending https://github.com/sveltejs/svelte/issues/3632
      hot && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
    ].filter(Boolean),

    devtool: dev && 'inline-source-map',
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        styleLoader,
        {
          test: /\.(svelte|html)$/,
          use: {
            // you don't need svelte-loader-hot here, but it avoids having to
            // also install svelte-loader
            loader: 'svelte-loader-hot',
            options: {
              preprocess,
              css: false,
              generate: 'ssr',
              dev,
            },
          },
        },
      ],
    },
    mode: process.env.NODE_ENV,
    plugins: [...sassPlugins],
    performance: {
      hints: false, // it doesn't matter if server.js is large
    },
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV,
  },
}
