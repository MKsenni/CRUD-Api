import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


export default {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFormat: 'module',
        library: {
            type: 'module',
        }
    },
    experiments: {
        outputModule: true,
    },
};
