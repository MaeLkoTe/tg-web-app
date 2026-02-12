import { BuildOptions } from './types/types';
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { PassThrough } from 'stream';

export function buildPlugins({paths, mode}: BuildOptions): Configuration["plugins"] {
    const plugins = [new HtmlWebpackPlugin({ template: paths.html })]

    if (mode === "development") {
        new webpack.ProgressPlugin()
    }

    if (mode === "production") {
        ;
    }

    return plugins
}