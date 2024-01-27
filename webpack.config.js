const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'frontendBase',
            filename: 'remoteEntry.js',
            exposes: {
                './Example': './src/stories/components/Example.tsx',
            },
            shared: {react: {singleton: true}, "react-dom": {singleton: true}}
        }),
    ],
};