/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  entry: "./src/index.tsx",
  devtool: "source-map",
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
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "SForm.js",
    library: "SForm",
    libraryTarget: "umd",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
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
    // new webpack.SourceMapDevToolPlugin({}),
    new CleanWebpackPlugin(),
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
    config.entry = "./src/components/SForm";
  }

  return config;
};
