import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps'

export default defineConfig({
    plugins: [
        dts(),
        externalizeDeps(),,
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'phaserGui',
            fileName: 'phaser-gui',
            formats: ['es', 'cjs', 'umd', 'iife'],
        },
    },
});