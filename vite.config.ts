import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function autoAppsJson() {
  return {
    name: 'auto-apps-json',
    buildStart() {
      const content = fs.readFileSync('src/data/appData.tsx', 'utf8')
      const regex = /id:\s*"([^"]+)"[\s\S]*?nama:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]+)"/g

      let result: any = {}
      let match
      while ((match = regex.exec(content))!== null) {
        const descMatch = content.substring(match.index, match.index + 3000).match(/deskripsi:\s*"([\s\S]*?)"/)
        let deskripsi = descMatch? descMatch[1].split('\n')[0].substring(0, 120) : match[2]
        result[match[1]] = {
          nama: match[2],
          deskripsi: deskripsi.replace(/"/g, ''),
          icon: match[3]
        }
      }

      fs.mkdirSync('public', { recursive: true })
      fs.writeFileSync('public/apps.json', JSON.stringify(result, null, 2))
      console.log(`✅ AUTO apps.json: ${Object.keys(result).length} apps dari appData.tsx`)
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
