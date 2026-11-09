import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: '/',
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            {
              name: 'prefixIds',
              params: {
                prefix: (_node, info) => {
                  const filePath = info?.path;
                  if (filePath) {
                    const baseName = path.basename(
                      filePath,
                      path.extname(filePath),
                    );
                    return `wini-${baseName}`;
                  }
                  return 'wini-icon';
                },
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  optimizeDeps: {},
});
