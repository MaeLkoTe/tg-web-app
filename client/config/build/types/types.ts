export interface buildPaths {
    entry: string;
    output: string;
    html: string;
    public: string;
}

export type BuildMode = 'production' | 'development';

export interface BuildOptions {
    port: number;
    mode: BuildMode;
    paths: buildPaths;
}