import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { type UserConfig, defineConfig, loadEnv } from 'vite';

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isHttps = env.VITE_HTTPS === 'true' || env.VITE_HTTPS === '1';
  const isDev = mode === 'development';

  return {
    plugins: [
      // Only load devtools in development
      isDev && devtools(),
      tailwindcss(),
      tanstackStart({
        router: { routeToken: '_layout' },
      }),
      nitro(),
      viteReact(),
      // NOTE: không cần vite-plugin-compression — Vercel CDN tự nén gzip/brotli,
      // plugin chỉ làm phình output & làm chậm bước build/upload.
    ].filter(Boolean),

    ssr: {
      optimizeDeps: {
        include: ['lodash', '@rc-component/image'],
      },
      noExternal: ['lodash', 'mac-scrollbar', '@rc-component/image'],
    },

    // Build optimizations
    build: {
      // Increase chunk size warning limit
      chunkSizeWarningLimit: 1000,

      // Source maps only in development
      sourcemap: isDev,

      // Target modern browsers for smaller bundle
      target: 'esnext',

      // CSS code splitting
      cssCodeSplit: true,

      // Reduce CSS size
      cssMinify: true,

      // Vite 8 (Rolldown/Oxc minifier): khôi phục hành vi cũ của `esbuild.drop`
      // — xoá console.* ở production (debugger bị xoá mặc định bởi oxc).
      ...(isDev
        ? {}
        : {
            rolldownOptions: {
              output: {
                minify: {
                  compress: { dropConsole: true },
                },
              },
            },
          }),
    },

    server: {
      // Conditionally enable HTTPS
      ...(isHttps ? { https: {} } : {}),

      // Optimize HMR
      watch: {
        // Only use polling if needed (WSL, Docker, etc.)
        usePolling: env.VITE_USE_POLLING === 'true',
        interval: 100,
        // Ignore node_modules for better performance
        ignored: ['**/node_modules/**', '**/.git/**'],
      },

      hmr: {
        host: 'localhost',
        protocol: isHttps ? 'wss' : 'ws',
        // Add overlay for better DX
        overlay: true,
      },
      // Enable cors if needed
      cors: true,
      // Compression for dev server
      compress: true,
    },

    // Resolve optimizations
    resolve: {
      // Deduplicate packages
      dedupe: ['react', 'react-dom'],

      // Vite 8 native tsconfig paths resolution (thay plugin vite-tsconfig-paths)
      tsconfigPaths: true,
    },

    // Performance hints
    logLevel: isDev ? 'info' : 'warn',
  } as UserConfig;
});

export default config;
