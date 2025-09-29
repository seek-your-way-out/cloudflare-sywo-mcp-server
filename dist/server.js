import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
export function createD1Server(options) {
    const { client } = options;
    const server = new Server({
        name: "cloudflare-d1-mcp",
        version: "1.0.0",
    }, {
        capabilities: {
            tools: {},
        },
    });
    // Register the tools/list handler
    server.setRequestHandler(ListToolsRequestSchema, async () => {
        return {
            tools: [
                {
                    name: "d1_query",
                    description: "Run a SQL query against the configured Cloudflare D1 database.",
                    inputSchema: {
                        type: "object",
                        properties: {
                            sql: {
                                type: "string",
                                description: "The SQL statement to execute."
                            },
                            bindings: {
                                type: "array",
                                description: "Optional positional bindings for the SQL statement.",
                                items: {
                                    type: ["string", "number", "boolean", "null"]
                                }
                            }
                        },
                        required: ["sql"]
                    }
                },
                {
                    name: "d1_list_tables",
                    description: "List tables available in the Cloudflare D1 database.",
                    inputSchema: {
                        type: "object",
                        properties: {},
                        additionalProperties: false
                    }
                }
            ]
        };
    });
    // Register the tools/call handler
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        try {
            if (name === "d1_query") {
                const { sql, bindings } = args;
                const result = await client.executeQuery(sql, bindings);
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(result, null, 2)
                        }
                    ]
                };
            }
            else if (name === "d1_list_tables") {
                const tables = await client.listTables();
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(tables, null, 2)
                        }
                    ]
                };
            }
            else {
                throw new Error(`Unknown tool: ${name}`);
            }
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error: ${error instanceof Error ? error.message : String(error)}`
                    }
                ],
                isError: true
            };
        }
    });
    return {
        server,
        async start() {
            // Connect to stdio for MCP communication
            const transport = {
                start: async () => {
                    // Transport initialization
                },
                send: async (message) => {
                    process.stdout.write(JSON.stringify(message) + '\n');
                },
                onMessage: (handler) => {
                    process.stdin.on('data', (data) => {
                        const lines = data.toString().split('\n').filter(line => line.trim());
                        lines.forEach(line => {
                            try {
                                const message = JSON.parse(line);
                                handler(message);
                            }
                            catch (e) {
                                console.error('Failed to parse message:', line);
                            }
                        });
                    });
                },
                close: async () => {
                    // Transport cleanup
                }
            };
            await server.connect(transport);
            console.error('Cloudflare D1 MCP server started');
        }
    };
}
//# sourceMappingURL=server.js.map