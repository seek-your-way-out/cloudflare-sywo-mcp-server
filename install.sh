#!/bin/bash

# Cloudflare D1 MCP Server Installation Script

echo "Installing Cloudflare D1 MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

# Clone the repository (if not already cloned)
if [ ! -f "package.json" ]; then
    echo "Cloning repository..."
    git clone https://github.com/seek-your-way-out/cloudflare-d1-mcp-server.git
    cd cloudflare-d1-mcp-server
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create global symlink
echo "Creating global symlink..."
npm link

echo "Installation complete!"
echo ""
echo "To use this MCP server, add the following to your MCP client configuration:"
echo ""
echo "{"
echo '  "mcpServers": {'
echo '    "Cloudflare D1": {'
echo '      "command": "cloudflare-d1-mcp",'
echo '      "env": {'
echo '        "CLOUDFLARE_ACCOUNT_ID": "your-account-id",'
echo '        "CLOUDFLARE_D1_DATABASE_ID": "your-database-id",'
echo '        "CLOUDFLARE_D1_DATABASE_NAME": "your-database-name",'
echo '        "CLOUDFLARE_API_TOKEN": "your-api-token"'
echo '      }'
echo '    }'
echo '  }'
echo "}"