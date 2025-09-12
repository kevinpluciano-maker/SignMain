import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "unzipped-preview.preview.emergentagent.com",
      ".emergentagent.com",
      ".preview.emergentagent.com"
    ],
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot']
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    exclude: ['@lovable/tagger']
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  }
}));