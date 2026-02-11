import { BuildOptions } from './types/types';
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

export function buildPlugins({paths}: BuildOptions): Configuration["plugins"] {
    return [
        new HtmlWebpackPlugin({ template: paths.html }),
        new webpack.ProgressPlugin()
    ]
}