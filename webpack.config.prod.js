const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

function prodConfig() {

    const prodConfig = {
        mode: "production",
        devtool: "source-map",
        entry: "./src/index",
        cache: true,
        output: {
            filename: '[name].[contenthash].bundle.prod.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        optimization: {
            nodeEnv: 'production',
            moduleIds: 'deterministic', 
            splitChunks: { 
                chunks: 'all'
            },
            runtimeChunk: 'single',
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin()
            ]
        }, 
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.tsx', '.ts']
        },
        module: {
            rules: [
                {
                    test: /\.(png|woff|woff2|eot|ttf)$/,
                    type: 'asset'
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.[jt]sx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./html-template.html"
            }),
            new BundleAnalyzerPlugin({
                analyzerPort: 3002,
                generateStatsFile: true,
                statsFilename: "stats",
                logLevel: "error"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].[contenthash].css",
            })
        ]
    }

    console.log(prodConfig);
    return prodConfig;
}

module.exports = () => {
    return prodConfig();
};