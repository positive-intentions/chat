const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: __dirname + '/dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            // css loader
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new WorkboxPlugin.GenerateSW({
          // these options encourage the ServiceWorkers to get in there fast
          // and not allow any straggling "old" SWs to hang around
          clientsClaim: true,
          skipWaiting: true,
        }),
        new ModuleFederationPlugin({
            name: 'frontendBase',
            filename: 'remoteEntry.js',
            exposes: {
                './Example': './src/stories/components/Example.tsx',
            },
            // shared: {react: {singleton: true}, "react-dom": {singleton: true}}
        }),
    ],
    devServer: {
        // Add this configuration to serve the CSS file with the correct MIME type
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
};