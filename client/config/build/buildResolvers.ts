import { BuildOptions } from './types/types';
import { Configuration } from "webpack";

export function buildResolvers(options: BuildOptions): Configuration["resolve"] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}