import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function ogBanner() {
  return {
    name: 'og-Banner',
    closeBundle() {
      const src = fs.readFileSync('src/data/appData.tsx', 'utf-8');
      const re = /id:\s*"([^"]+)"[\s\S]*?nama:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]+)"[\s\S]*?deskripsi:\s*"([^"]+)[\s\S]*?versi:\s*"([^"]+)"/g;
      let m;
      while ((m = re.exec(src))!== null) {
        const [_, id, nama, icon, descRaw, versi] = m;
        // BIAR GAMBAR NGIKUTIN ASLI - gak di crop jadi banner
        const iconOriginal = icon.replace(/w=\d+.*/, 'w=1200&h=1200&auto=format').split('"')[0];
        const desc = descRaw.slice(0,100).replace(/"/g,'');

        const html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<title>${nama} APK untuk Unduhan Android</title>
<meta property="og:title" content="${nama} APK untuk Unduhan Android">
<meta property="og:description" content="Unduhan APK ${nama} ${versi} untuk Android. ${desc}">
<meta property="og:image" content="${iconOriginal}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="1200">
<meta property="og:url" content="https://s.starpit.my.id/app/${id}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="NewAppStore">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0; url=/?app=${id}">
</head></html>`;
        const dir = path.join('dist','app',id);
        fs.mkdirSync(dir,{recursive:true});
        fs.writeFileSync(path.join(dir,'index.html'), html);
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
