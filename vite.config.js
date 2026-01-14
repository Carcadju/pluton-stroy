import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/pluton-stroy/',
    server: {
        port: 8083,
        host: true
    }
})
