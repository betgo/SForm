/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const pkg = require("./package.json");

const dependencies = Object.keys(pkg.peerDependencies);

const config = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          // compiles Less to CSS
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                auto: true,
                localIdentName: "[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
              },
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: {
                //   "primary-color": "#1DA57A",
                //   "link-color": "#1DA57A",
                //   "border-radius-base": "2px",
                // },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
  output: {
    path: path.join(__dirname, "lib"),
    publicPath: "/",
    filename: "index.js",
    library: "SForm",
    libraryTarget: "umd",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "lib"),
      publicPath: "/",
    },
    client: {
      overlay: true,
      progress: true,
    },
    compress: true,
    port: 9100,
    hot: true,
    // publicPath: "/",
  },
  plugins: [
    new WebpackBar(),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
    // new webpack.SourceMapDevToolPlugin({}),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: "my app",
        template: "./public/index.html",
        filename: "index.html",
        inject: "body",
      })
    );
  }

  if (argv.mode === "production") {
    config.entry = "./src/components";
    // config.devtool = "cheap-source-map";
    config.plugins.push(new CleanWebpackPlugin());
    // 外部引入包
    let externals = {
      moment: "moment",
    };
    dependencies.forEach((dependency) => {
      externals[dependency] = dependency;
    });
    config.externals = externals;
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false, //不将注释提取到单独的文件中
          parallel: 4, // 并发数量
        }),
      ],
    };
  }

  return config;
};
