import { defineConfig } from 'vite';
import { minify } from 'html-minifier-terser';

export default defineConfig({
    base: './',
    plugins: [
        {
            name: 'html-minify',
            apply: 'build',
            enforce: 'post',
            async transformIndexHtml(html) {
                return await minify(html, {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeEmptyAttributes: true,
                    useShortDoctype: true,
                    minifyCSS: true,
                    minifyJS: false,
                });
            },
        },
    ],
    build: {
        outDir: 'dist',
        sourcemap: false,
        assetsDir: 'assets',
    },
});
