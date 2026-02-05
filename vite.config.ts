import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from "vite-plugin-prerender";

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
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'production' &&
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
      renderer: new vitePrerender.PuppeteerRenderer({
        renderAfterTime: 3000,
        headless: true,
      }),
      postProcess(renderedRoute: any) {
        renderedRoute.route = renderedRoute.originalRoute;
        return renderedRoute;
      },
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true,
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
