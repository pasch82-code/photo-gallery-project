const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function devConfig() {

    const devConfig = {
        mode: "development",
        devtool: "source-map",
        entry: "./src/index.tsx",
        cache: true,
        devServer: {
            hot: true,
            liveReload: true,
            historyApiFallback: true,
            open: true,
            port: 3000,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
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
                    use: ['style-loader', 'css-loader']
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
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: false,
                onDetected({ module, paths, compilation }) {
                    compilation.errors.push(new Error(paths.join(' -> ')))
                }
            })]
    }

    console.log(devConfig);
    return devConfig;
}

module.exports = () => {
    return devConfig();
};