export async function onRequest(context) {
  const url = new URL(context.request.url);
  const appId = url.searchParams.get("app");
  const res = await context.next();

  if (!appId) return res;
  if (!res.headers.get("content-type")?.includes("text/html")) return res;

  try {
    const raw = await fetch(`https://raw.githubusercontent.com/PitNewb/NewAppStore-v3.5/main/src/data/appData.tsx?v=${Date.now()}`).then(r => r.text());
    const idx = raw.indexOf(`id: "${appId}"`);
    if (idx === -1) return res;
    const chunk = raw.substring(idx, idx + 5000);

    const nama = chunk.match(/nama:\s*"([^"]+)"/)?.[1] || appId;
    const icon = chunk.match(/icon:\s*"([^"]+)"/)?.[1] || "";
    const descMatch = chunk.match(/deskripsi:\s*"([^"]+)"/);
    const desc = descMatch? descMatch[1].slice(0,150) : nama;

    let html = await res.text();
    // hapus OG lama biar gak tabrakan
    html = html.replace(/<meta property="og:[^>]*>/g, '');
    html = html.replace(/<meta name="twitter:[^>]*>/g, '');

    const tags = `<meta property="og:title" content="${nama} - NewAppStore" /><meta property="og:description" content="${desc.replace(/"/g,'')}" /><meta property="og:image" content="${icon}" /><meta property="og:url" content="${url.href}" /><meta property="og:type" content="website" />`;
    html = html.replace("<head>", `<head>${tags}`);

    return new Response(html, res);
  } catch { return res; }
                                                                                                                      }
