// server.ts
// run with:  npx ts-node server.ts
import { createServer } from "http";
import fetch from "node-fetch";

const PORT = 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

createServer(async (_req, res) => {
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview",
        voice: "verse"
      })
    });

    const data = await r.json();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (err) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Failed to create ephemeral session" }));
  }
}).listen(PORT, () => console.log(`Ephemeral key server running at http://localhost:${PORT}`));
