# Cloudflare SYWO MCP Server

A minimal Model Context Protocol (MCP) server that lets MCP-compatible clients query a Cloudflare D1 database. Designed for easy setup and usage.

## Features

- **List tables** in the target D1 database with the `d1_list_tables` tool.
- **Run arbitrary SQL queries** using the `d1_query` tool.
- Lightweight TypeScript implementation relying on Cloudflare's REST API.
- **Cross-platform support** with proper Windows, macOS, and Linux compatibility.
- **Secure credential management** via environment variables.

## Prerequisites

- Node.js 18+
- Cloudflare Account ID
- Cloudflare D1 Database ID
- Cloudflare D1 Database Name
- Cloudflare API Token with `D1:Edit` permissions

## Quick Start (5 Minutes)

1. **Install the server:**
   ```bash
   npm install -g cloudflare-sywo-mcp-server
   ```

2. **Get your Cloudflare credentials** (takes 2 minutes):
   - Account ID: Cloudflare Dashboard → Right sidebar
   - Database ID: Cloudflare Dashboard → D1 → Your database → "Database ID"
   - Database Name: The name you gave your D1 database  
   - API Token: Cloudflare Dashboard → My Profile → API Tokens → Create Token → Custom token with `D1:Edit` permission

3. **Add to VS Code** (copy-paste into settings.json):
   ```json
   {
     "mcp.servers": {
       "cloudflare-d1": {
         "command": "cloudflare-sywo-mcp",
         "args": ["--stdio"],
         "env": {
           "CLOUDFLARE_ACCOUNT_ID": "your-account-id-here",
           "CLOUDFLARE_D1_DATABASE_ID": "your-database-id-here", 
           "CLOUDFLARE_D1_DATABASE_NAME": "your-database-name-here",
           "CLOUDFLARE_API_TOKEN": "your-api-token-here"
         }
       }
     }
   }
   ```

4. **Restart VS Code** and you're done!

## Installation

```bash
npm install -g cloudflare-sywo-mcp-server
```

## Setup

### Option 1: Global Installation (Recommended)
After installing globally with `npm install -g cloudflare-sywo-mcp-server`, you can use it directly in your MCP configuration.

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

### VS Code Setup (Step-by-Step)

**For VS Code users, here's exactly what to do:**

1. **Install the MCP server globally:**
   ```bash
   npm install -g cloudflare-sywo-mcp-server
   ```

2. **Find your VS Code MCP settings file:**
   - Open VS Code Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Type "Open User Settings (JSON)"
   - Look for or create the file: `%APPDATA%\Code\User\settings.json` (Windows) or `~/.config/Code/User/settings.json` (Mac/Linux)

3. **Add the MCP configuration to your settings.json:**

   **Option A: Direct Environment Variables (Recommended)**
   ```json
   {
     "mcp.servers": {
       "cloudflare-d1": {
         "command": "cloudflare-sywo-mcp",
         "args": ["--stdio"],
         "env": {
           "CLOUDFLARE_ACCOUNT_ID": "your-actual-account-id",
           "CLOUDFLARE_D1_DATABASE_ID": "your-actual-database-id", 
           "CLOUDFLARE_D1_DATABASE_NAME": "your-actual-database-name",
           "CLOUDFLARE_API_TOKEN": "your-actual-api-token"
         }
       }
     }
   }
   ```

   **Option B: Using .env File**
   ```json
   {
     "mcp.servers": {
       "cloudflare-d1": {
         "command": "cloudflare-sywo-mcp",
         "args": ["--stdio"],
         "cwd": "C:/path/to/your/project/folder"
       }
     }
   }
   ```

4. **Where to get your Cloudflare credentials:**
   - **Account ID**: Cloudflare Dashboard → Right sidebar under "Account ID"
   - **Database ID**: Cloudflare Dashboard → D1 → Your database → "Database ID" 
   - **Database Name**: The name you gave your D1 database
   - **API Token**: Cloudflare Dashboard → My Profile → API Tokens → Create Token → Use "Custom token" with `D1:Edit` permission

5. **No additional files needed!** The credentials go directly in the VS Code settings.json file or in a .env file if you choose that option.

### Cursor / Trae Configuration

Add this to your MCP configuration file:

```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "cloudflare-sywo-mcp",
      "args": ["--stdio"],
      "env": {
        "CLOUDFLARE_ACCOUNT_ID": "your-account-id-here",
        "CLOUDFLARE_D1_DATABASE_ID": "your-database-id-here",
        "CLOUDFLARE_D1_DATABASE_NAME": "your-database-name-here",
        "CLOUDFLARE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### Windows Command Line Configuration

For Windows users, you may need to use the full command path or cmd syntax:

```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "cmd",
      "args": ["/c", "set CLOUDFLARE_ACCOUNT_ID=your-account-id-here && set CLOUDFLARE_D1_DATABASE_ID=your-database-id-here && set CLOUDFLARE_D1_DATABASE_NAME=your-database-name-here && set CLOUDFLARE_API_TOKEN=your-api-token-here && cloudflare-sywo-mcp --stdio"]
    }
  }
}
```

### Alternative: Using .env File

You can also use a `.env` file in your project directory:

```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "cloudflare-sywo-mcp",
      "args": ["--stdio"],
      "cwd": "/path/to/your/project"
    }
  }
}
```

Make sure to keep your API token secret and rotate immediately if it is ever exposed.

## Credential Management Options

### Option 1: Direct Environment Variables (Recommended for VS Code)
Put credentials directly in your MCP configuration file. This is the simplest approach.

### Option 2: .env File (Good for Development)
Create a `.env` file in your project directory:
```ini
CLOUDFLARE_ACCOUNT_ID=your-account-id-here
CLOUDFLARE_D1_DATABASE_ID=your-database-id-here
CLOUDFLARE_D1_DATABASE_NAME=your-database-name-here
CLOUDFLARE_API_TOKEN=your-api-token-here
```

Then reference the directory in your MCP config:
```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "cloudflare-sywo-mcp",
      "args": ["--stdio"],
      "cwd": "/path/to/your/project"
    }
  }
}
```

### Option 3: System Environment Variables (Advanced)
Set the variables in your system environment, then use a minimal MCP config:
```json
{
  "mcpServers": {
    "cloudflare-d1": {
      "command": "cloudflare-sywo-mcp",
      "args": ["--stdio"]
    }
  }
}
```

**Windows:** Set via System Properties → Environment Variables
**macOS/Linux:** Add to `~/.bashrc` or `~/.zshrc`:
```bash
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
export CLOUDFLARE_D1_DATABASE_ID="your-database-id-here"
export CLOUDFLARE_D1_DATABASE_NAME="your-database-name-here"
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

## Tools Summary

- **d1_list_tables**: Returns an array of table names from the database.
- **d1_query**: Executes a SQL query and returns the raw D1 response payload.

## Troubleshooting

### Connection Issues

If you encounter "Connection closed" errors:
1. Ensure all required environment variables are set correctly
2. Check that your Cloudflare API token has the necessary permissions (`D1:Edit`)
3. Verify your account ID, database ID, and database name are correct

### Windows-Specific Issues

If you see "Syntax Error" from Windows Script Host or "how do I want to open this" popups:
- Make sure you're using version 1.0.7 or later (we fixed Windows compatibility issues)
- Use the Windows command line configuration shown above
- Ensure Node.js is properly installed and in your PATH

### JSON Parsing Errors

If you see "Unexpected token" JSON parsing errors:
- Update to the latest version (1.0.7+) which suppresses debug output
- Check that no other processes are writing to stdout/stderr

## Security Note

Never commit API tokens to source control. If a token becomes exposed, revoke it in the Cloudflare dashboard and create a fresh one.