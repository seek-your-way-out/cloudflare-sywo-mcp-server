import { loadConfig } from "./config.js";
import { D1Client } from "./client.js";
import { createD1Server } from "./server.js";

async function main() {
  try {
    const config = loadConfig();
    const client = new D1Client(config);
    const { start } = createD1Server({ client });

    // Start the server
    await start();
    
  } catch (error) {
    console.error("Failed to start Cloudflare D1 MCP server:", error);
    process.exit(1);
  }
}

void main();