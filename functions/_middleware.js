export async function onRequest(context) {
  const url = new URL(context.request.url);
  const appId = url.searchParams.get("app");
  const response = await context.next();
  if (!appId) return response;
  try {
    const raw = await fetch("https://raw.githubusercontent.com/PitNewb/NewAppStore-v3.5/main/src/data/appData.tsx").then(r => r.text());
    const regex = new RegExp(`id:\\s*"${appId}"[\\s\\S]*?nama:\\s*"([^"]+)"[\\s\\S]*?icon:\\s*"([^"]+)"[\\s\\S]*?deskripsi:\\s*"([\\s\\S]*?)"\\s*,\\s*\\n\\s*ukuran`, "i");
    const m = raw.match(regex);
    if (!m) return response;
    let html = await response.text();
    html = html.replace("<head>", `<head>
<meta property="og:title" content="${m[1]}" />
<meta property="og:description" content="${m[3].split('\n')[0].slice(0,120)}" />
<meta property="og:image" content="${m[2]}" />
<meta property="og:url" content="${url.href}" />
`);
    return new Response(html, response);
  } catch { return response; }
}
