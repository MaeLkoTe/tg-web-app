import webpack  from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;

    const isDev = mode === "development";
    const isProd = mode === "production";

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            publicPath: isProd ? "auto" : "/",
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
                },
        
        plugins: buildPlugins(options),
        
        module: {
            rules: buildLoaders(options),
        },

        devtool: isDev ? "source-map" : false,


        devServer: isDev ? buildDevServer(options): undefined,
        resolve: buildResolvers(options),
    }
}