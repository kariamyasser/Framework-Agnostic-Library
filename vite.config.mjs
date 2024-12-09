import vue from '@vitejs/plugin-vue'; // For Vue components
import react from '@vitejs/plugin-react'; // For React components
import angular from '@analogjs/astro-angular'; // For Angular components
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'; // Polyfills Node.js globals
import replace from '@rollup/plugin-replace'; // Replaces environment variables
import { splitVendorChunkPlugin, defineConfig } from 'vite'; // Vite utilities
import { dependencies } from './package.json'; // Project dependencies

// Helper function to create chunks for dependencies
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['vue', 'react', 'angular'].includes(key)) return; // Exclude specific libraries
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  build: {
    sourcemap: false, // Disable source maps
    lib: {
      entry: './src/index.ts', // Entry point for library
      name: 'SharedLibrary', // Library name
      fileName: (format) => `shared-library.${format}.js`, // Output file names
      formats: ['es', 'umd'], // Output formats
    },
    rollupOptions: {
      manualChunks: {
        vendor: ['vue', 'react', '@angular/core', '@angular/common', '@angular/elements', '@angular/compiler', '@angular/platform-browser', '@angular/platform-browser-dynamic'],
        ...renderChunks(dependencies), // Custom chunks
      },
      output: {
        globals: {
          'zone.js': 'Zone',
          'lit': 'lit',
          'react': 'React',
          'vue': 'Vue',
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common',
          '@angular/elements': 'ng.elements',
          '@angular/compiler': 'ng.compiler',
          '@angular/platform-browser': 'ng.platformBrowser',
          '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
        },
      },
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true,
        }),
      ],
    },
  },
  plugins: [
    vue(), // Add Vue support
    react(), // Add React support
    angular(), // Add Angular support
    splitVendorChunkPlugin(), // Split vendor chunks
    {
      name: 'custom-node-polyfills',
      apply: 'build',
      setup(build) {
        build.onResolve({ filter: /^process$/ }, () => {
          return { path: 'process', namespace: 'node-polyfills' };
        });
      }
    }
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Define global variable
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  server: {
    port: 3000, // Development server port
    hmr: true, // Enable hot module replacement
  },
});
