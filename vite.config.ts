import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),


    ],


    resolve: {
        alias: {
            '@': path.join(__dirname, './src'),
            '~': path.join(__dirname, './src/assets'),
            '~root': path.join(__dirname, '.'),
        },
    },
})
