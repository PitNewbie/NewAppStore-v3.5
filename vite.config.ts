import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function autoOG() {
  return {
    name: 'auto-og',
    buildStart() {
      // BACA LANGSUNG DARI appData.tsx LU
      const src = fs.readFileSync('src/data/appData.tsx', 'utf-8');
      const regex = /id:\s*"([^"]+)"[\s\S]*?nama:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]+)"[\s\S]*?deskripsi:\s*"([^"\n]+)/g;
      
      let db = "";
      let m;
      while ((m = regex.exec(src)) !== null) {
        const [_, id, nama, icon, descRaw] = m;
        const cleanDesc = descRaw.replace(/"/g, '').replace(/🤖|✨|💡/g, '').slice(0,120);
        const iconHD = icon.replace('w=200', 'w=1200'); // biar HD di WA
        db += `    "${id}": { nama: ${JSON.stringify(nama)}, icon: ${JSON.stringify(iconHD)}, desc: ${JSON.stringify(cleanDesc)} },\n`;
      }

      const middlewareCode = `export async function onRequest(context) {
  const url = new URL(context.request.url);
  const appId = url.searchParams.get("app");
  const res = await context.next();
  if (!appId) return res;
  if (!res.headers.get("content-type")?.includes("text/html")) return res;
  const DB = {
${db}  };
  const app = DB[appId];
  if (!app) return res;
  let html = await res.text();
  html = html.replace(/<meta property="og:[^>]*>/g, "");
  html = html.replace(/<meta name="twitter:[^>]*>/g, "");
  const tags = \`<meta property="og:title" content="\${app.nama} - NewAppStore" /><meta property="og:description" content="\${app.desc}" /><meta property="og:image" content="\${app.icon}" /><meta property="og:url" content="\${url.href}" /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:image" content="\${app.icon}" />\`;
  return new Response(html.replace("<head>", \`<head>\${tags}\`), res);
}`;

      fs.mkdirSync('functions', { recursive: true });
      fs.writeFileSync('functions/_middleware.js', middlewareCode);
      console.log('✅ _middleware.js auto-generated dari appData.tsx');
    },
  };
}


export default defineConfig(() => {
  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
