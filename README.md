# Cloudflare SYWO MCP Server

A minimal Model Context Protocol (MCP) server that lets MCP-compatible clients query a Cloudflare D1 database. Designed for easy setup and usage.

## Features

- **List tables** in the target D1 database with the `d1_list_tables` tool.
- **Run arbitrary SQL queries** using the `d1_query` tool.
- Lightweight TypeScript implementation relying on Cloudflare's REST API.

## Prerequisites

- Node.js 18+
- Cloudflare Account ID
- Cloudflare D1 Database ID
- Cloudflare D1 Database Name
- Cloudflare API Token with `D1:Edit` (and optional Workers KV if needed)

## Installation

```bash
npm install -g cloudflare-sywo-mcp-server
```

## Setup

### Option 1: Global Installation (Recommended)
After installing globally with `npm install -g cloudflare-database-mcp-server`, you can use it directly in your MCP configuration as shown above.

### Option 2: Local Development/Custom Build
If you want to build from source or modify the server:

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (do **not** commit it) and provide credentials:
   ```ini
   CLOUDFLARE_ACCOUNT_ID=your-account-id-here
   CLOUDFLARE_D1_DATABASE_ID=your-database-id-here
   CLOUDFLARE_D1_DATABASE_NAME=your-database-name-here
   CLOUDFLARE_API_TOKEN=your-api-token-here
   ```

4. Build the TypeScript project:
   ```bash
   npm run build
   ```

5. Start the MCP server:
   ```bash
   npm start
   ```

   Or use the development runner:
   ```bash
   npm run dev
   ```

## MCP Client Configuration

After global installation, add this to your MCP configuration:

```json
{
  "mcpServers": {
    "Cloudflare D1": {
      "command": "cloudflare-sywo-mcp",
      "env": {
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id-here",
        "CLOUDFLARE_D1_DATABASE_ID": "your-database-id-here",
        "CLOUDFLARE_D1_DATABASE_NAME": "your-database-name-here",
        "CLOUDFLARE_API_TOKEN": "your-new-token-here"
      }
    }
  }
}
```

Make sure to keep your API token secret and rotate immediately if it is ever exposed.

## Tools Summary

- **d1_list_tables**: Returns an array of table names from the database.
- **d1_query**: Executes a SQL query and returns the raw D1 response payload.

## Security Note

Never commit API tokens to source control. If a token becomes exposed, revoke it in the Cloudflare dashboard and create a fresh one.