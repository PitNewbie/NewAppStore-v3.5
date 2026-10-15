import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function genOG() {
  return {
    name: 'gen-og-s',
    closeBundle() {
      try {
        const meta = JSON.parse(fs.readFileSync('metadata.json','utf-8'));
        const appSrc = fs.readFileSync('src/data/appData.tsx','utf-8');
        const regex = /id:\s*"([^"]+)"[\s\S]*?nama:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]+)"[\s\S]*?deskripsi:\s*"([\s\S]*?)",\s*\n\s*ukuran/g;
        let m;
        while ((m = regex.exec(appSrc))!== null) {
          const [_, id, nama, icon, des] = m;
          const desc = des.split('\n')[0].slice(0,150).replace(/"/g,'');
          const dir = `dist/app/${id}`;
          fs.mkdirSync(dir,{recursive:true});
          fs.writeFileSync(`${dir}/index.html`, `<!doctype html><html><head><meta charset="utf-8"><title>${nama}</title><meta property="og:title" content="${nama}"><meta property="og:description" content="${desc}"><meta property="og:image" content="${icon}"><meta property="og:url" content="https://s.starpit.my.id/app/${id}/"><meta http-equiv="refresh" content="0;url=/?app=${id}"></head><body></body></html>`);
        }
        let idx = fs.readFileSync('dist/index.html','utf-8');
        idx = idx.replace('</head>', `<meta property="og:title" content="${meta.name}"><meta property="og:description" content="${meta.description}"><meta property="og:image" content="${meta.image}"><meta property="og:url" content="${meta.url}"></head>`);
        fs.writeFileSync('dist/index.html', idx);
        console.log('OG s.starpit OK');
      } catch(e){ console.log(e) }
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
