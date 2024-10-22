import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export default {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.ts',
    target: 'node',
    devServer: {
        port: 4000,
        hot: true, // enable hot module replacement
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        // library: {
        //     type: 'module',
        // }
    },
    // experiments: {
    //     outputModule: true,
    // },
};
