const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WorkboxPlugin = require('workbox-webpack-plugin');
const { HotModuleReplacementPlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const WebpackPwaManifest = require("webpack-pwa-manifest");
var OfflinePlugin = require('@lcdp/offline-plugin');
var deps = require('./package.json').dependencies;

const path = require("path");

// const isDevelopment = process.env.NODE_ENV !== "production";

const moduleRedundency = ({
  moduleName,
  urls
}) => (`promise new Promise(async (resolve) => {

  function getRandomNumber(min, max) {
    if (min > max) {
        throw new Error("Minimum value must be less than or equal to the maximum value.");
    }
    // Generate and return a random integer between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const urls = ${JSON.stringify(urls)}


  // function checkUrl(url) {
  //   return fetch(url, {
  //     method: "HEAD",
  //     mode: 'no-cors'
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return url; // Return the URL if the resource is available
  //       }
  //       throw new Error(\`Resource not available at \${url}\`); // Throw if resource is not available
  //     });
  // }

  // const availabilityPromises = urls.map(url => checkUrl(url));

  // // Use Promise.race to find the first URL that responds with an available resource
  // const firstAvailableUrl = await Promise.race(availabilityPromises)
  //   .catch(error => {
  //     // Handle the case where none of the URLs are available
  //     reject(new Error('None of the URLs responded positively: ' + error.message));
  //   });

  const remoteUrlWithVersion = urls[getRandomNumber(0, urls.length - 1)]
  const script = document.createElement('script')
  script.src = remoteUrlWithVersion
  script.onload = () => {
    // the injected script has loaded and is available on window
    // we can now resolve this Promise
    const proxy = {
      get: (request) => window.${moduleName}.get(request),
      init: (arg) => {
        try {
          return window.${moduleName}.init(arg)
        } catch(e) {
          console.log('remote container already initialized')
        }
      }
    }
    resolve(proxy)
  }
  // inject this script with the src set to the versioned remoteEntry.js
  document.head.appendChild(script);
})
`);

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
        {
          src: path.resolve("./public/favicon.ico"),
          sizes: [96], // multiple sizes
        },
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
      remotes: {
        "cryptography": moduleRedundency({
          moduleName: 'cryptography',
          urls: [
            // 'http://localhost:3000/remoteEntry.js', // local for testing
            'https://positive-intentions.github.io/cryptography/remoteEntry.js',
            'https://cryptography.positive-intentions.com/remoteEntry.js'
          ]
        }),
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        }
      }
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
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
