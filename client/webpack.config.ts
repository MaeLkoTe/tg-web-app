import { BuildMode, buildPaths} from './config/build/types/types';
import { buildWebpack } from './config/build/buildWebpack';
import webpack from 'webpack';
import path from 'path';

interface EnvVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnvVariables) => {

    const paths: buildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
    });
    
    return config;
}
