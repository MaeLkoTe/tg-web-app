import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
}

export default (env: EnvVariables) => {
    const isDev = env?.mode === "development";

    const config: webpack.Configuration & { devServer?: DevServerConfiguration } = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true
                },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin()
                ],
        module: {
            rules: [
                {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
                },

                {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                    loader: "css-loader",
                    options: { importLoaders: 1 },
                    },
                    "postcss-loader",
                ],
                },
            ],
        },

        devtool: isDev ? "source-map" : false,


        devServer: {
            static: {
                directory: path.resolve(__dirname, "public"),
            },
            port: 8080,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
            client: {
                overlay: true,
            },
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
    return config;
}