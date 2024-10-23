import path from 'path';
import { dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFormat: 'module',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new Dotenv() // Load environment variables from .env
  ]
};
