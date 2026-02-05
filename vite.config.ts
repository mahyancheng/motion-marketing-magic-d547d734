import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Routes to pre-render for SSG
const routesToPrerender = [
  '/',
  '/sem',
  '/social-media-ads',
  '/custom-software',
  '/customer-software-demo',
  '/order-management',
  '/contact',
  '/corporate-profile',
  '/blog',
  '/blog/seo-services-pricing-malaysia',
  '/blog/digital-marketing-kuala-lumpur',
  '/blog/social-media-marketing-malaysia',
  '/blog/google-ads-agency-malaysia',
  '/blog/malaysia-seo-consultant',
  '/blog/facebook-marketing-malaysia',
  '/blog/local-seo-malaysia',
  '/blog/digital-marketing-training-malaysia',
  '/blog/top-digital-marketing-agency-malaysia',
  '/blog/seo-and-sem-difference',
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // 只代理这一个接口
      "/api/uploadImage": {
        target: "https://us-central1-<project-id>.cloudfunctions.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/uploadImage$/, "/uploadImage"),
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    includedRoutes: () => routesToPrerender,
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
}));
