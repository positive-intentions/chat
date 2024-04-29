const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { HotModuleReplacementPlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const WebpackPwaManifest = require("webpack-pwa-manifest");
var OfflinePlugin = require('@lcdp/offline-plugin');

const path = require("path");

// const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  // mode: isDevelopment ? "development" : "production",
  entry: "./src/index.js",
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      // css and scss loader
      {
        // test: /\.css$/,
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },

      // image loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    //   // ts and tsx loader
    //     {
    //         test: /\.(ts|tsx)$/,
    //         use: "ts-loader",
    //         exclude: /node_modules/,
    //     },

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling "old" SWs to hang around
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    // // make it installable
    // new WorkboxPlugin.InjectManifest({
    //     swSrc: './dist/service-worker.js',
    //     // swDest: '/dist/service-worker.js',
    //     maximumFileSizeToCacheInBytes: 10000000,
    //     exclude: [/\.LICENSE\.txt$/, /\.map$/, /\.DS_Store$/],
    //     include: [/\.html$/, /\.js$/, /\.css$/, /\.woff$/, /\.woff2$/, /\.ttf$/, /\.eot$/, /\.svg$/],

    // }),
    // new HotModuleReplacementPlugin(),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "positive-intentions",
      short_name: "PI",
      description: "positive-intentions",
      icons: [
        // {
        //   "src": "favicon.ico",
        //   "sizes": "64x64 32x32 24x24 16x16",
        //   "type": "image/x-icon"
        // },
        {
          src: path.resolve("./public/favicon.ico"),
          sizes: [96], // multiple sizes
        },
        // {
        //   "src": "logo192.png",
        //   "type": "image/png",
        //   "sizes": "192x192"
        // },
        // {
        //   "src": "logo512.png",
        //   "type": "image/png",
        //   "sizes": "512x512"
        // }
        {
          src: path.resolve("./public/logo512.png"),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          maskable: true,
        },
      ],
      start_url: ".",
      display: "standalone",
      theme_color: "#1565c0",
      background_color: "#ffffff",
      // crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      inject: true,
    }),
    new ModuleFederationPlugin({
      name: "chatApp",
      filename: "remoteEntry.js",
      // exposes: {
      //     './Example': './src/stories/components/Example.tsx',
      // },
      remotes: {
        "pi-base":
          "frontendBase@https://example-staging.positive-intentions.com/remoteEntry.js",
        "cryptography": "cryptography@https://cryptography.positive-intentions.com/remoteEntry.js"
        // "cryptography": "cryptography@http://localhost:3000/remoteEntry.js"
      },
      shared: {react: {singleton: true}, "react-dom": {singleton: true}}
    }),
    new OfflinePlugin()
  ],
  devServer: {
    // Add this configuration to serve the CSS file with the correct MIME type
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    server: 'https',
    // static: path.resolve(__dirname, "/public"),
    // // watchContentBase: true,
    // hot: true,
    // historyApiFallback: true,
  },
};
