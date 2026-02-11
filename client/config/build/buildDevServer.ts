import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
import path from 'path';

export function buildDevServer({paths, port}: BuildOptions): DevServerConfiguration {
    return {
        static: {
                    directory: paths.public,
                },
                port: port || 3000,
                open: true,
                hot: true,
                compress: true,
                historyApiFallback: true,
                client: {
                    overlay: true,
                },
        }
}