export async function onRequest(context) {
  const url = new URL(context.request.url);
  const appId = url.searchParams.get("app");
  const response = await context.next();

  if (!appId) return response;
  const ct = response.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return response;

  try {
    const rawText = await fetch(`https://raw.githubusercontent.com/PitNewb/NewAppStore-v3.5/main/src/data/appData.tsx?nocache=${Date.now()}`, { cf: { cacheTtl: 0 } }).then(r => r.text());

    const idx = rawText.indexOf(`id: "${appId}"`);
    if (idx === -1) return response;

    const chunk = rawText.substring(idx, idx + 4000);
    const nama = chunk.match(/nama:\s*"([^"]+)"/)?.[1];
    const icon = chunk.match(/icon:\s*"([^"]+)"/)?.[1];
    const descRaw = chunk.match(/deskripsi:\s*"([\s\S]*?)",\s*\n\s*ukuran/);
    const desc = descRaw? descRaw[1].split("\n")[0].replace(/"/g,'').slice(0,150) : nama;

    if (!nama ||!icon) return response;

    let html = await response.text();

    // HAPUS OG LAMA DULU BIAR WA GAK BINGUNG
    html = html.replace(/<meta property="og:(title|description|image|url|type)"[^>]*>/g, '');
    html = html.replace(/<meta name="twitter:[^>]*>/g, '');

    // SUNTIK OG BARU PALING ATAS <head>
    const newTags = `<meta property="og:title" content="${nama} - NewAppStore" /><meta property="og:description" content="${desc}" /><meta property="og:image" content="${icon}" /><meta property="og:url" content="${url.href}" /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary_large_image" />`;

    html = html.replace("<head>", `<head>${newTags}`);

    return new Response(html, {
      headers: {...Object.fromEntries(response.headers), "content-type": "text/html;charset=UTF-8" }
    });

  } catch {
    return response;
  }
      }
