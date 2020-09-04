const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const getApiUrl = (mode) => {
    if (mode === 'development') {
        return 'http://localhost:5000';
    }
    return '';
};


const config = (env, options) => {
    const envMode = options.mode;
    const isDevMode = envMode === 'development'; // not ideal - to generate sourcemaps, change it to true and run `webpack -p`

    return {
        mode: isDevMode ? 'development' : 'production',
        entry: [
            'react-hot-loader/patch',
            './src/index.tsx',
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'ts-loader',
                        },
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.less$/,
                    exclude: /\.module\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDevMode,
                            },
                        },
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    // hack: `true; @import '${path.join(__dirname, './src/theme/antdPalette.less')}'`,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.module\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDevMode,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isDevMode ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
                                },
                            },
                        },
                        'less-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /\.module\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.module\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.png$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                mimetype: 'image/png',
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|eot|ttf|woff2)$/,
                    loader: 'file-loader?name=resources/fonts/[name].[ext]',
                },
                {
                    test: /\.mp3$/,
                    loader: 'file-loader?name=resources/sounds/[name].[ext]',
                },
                {
                    test: /\.mp4$/,
                    loader: 'file-loader?name=resources/videos/[name].[ext]',
                },
            ],
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
            ],
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
        },
        devServer: {
            contentBase: './dist',
            historyApiFallback: true,
            host: '0.0.0.0',
        },
        plugins: [
            new LodashModuleReplacementPlugin,
            new webpack.DefinePlugin({
                API_URL: JSON.stringify(getApiUrl(envMode)),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        devtool: isDevMode ? 'source-map' : false,
        optimization: {
            minimizer: [
                new TerserJSPlugin(),
                new OptimizeCSSAssetsPlugin(),
            ],
        },
        stats: {
            children: false,
        },
    };
};

module.exports = config;