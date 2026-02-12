import { BuildOptions } from './types/types';
import { ModuleOptions } from "webpack"

export function buildLoaders(optioins: BuildOptions): ModuleOptions["rules"] {
    const tsLoader = {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
            }
            
    const cssLoader = {
            test: /\.css$/,
            use: [
                "style-loader",
                {
                loader: "css-loader",
                options: { importLoaders: 1 },
                },
                "postcss-loader",
            ],
        }

    return [
            tsLoader,
            cssLoader,
        ]
}