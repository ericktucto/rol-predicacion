import path from 'node:path'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), tailwindcss(), viteSingleFile()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
