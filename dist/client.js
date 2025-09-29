const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));
const CLOUDFLARE_API_BASE = "https://api.cloudflare.com/client/v4";
export class D1Client {
    constructor(config) {
        this.config = config;
    }
    async executeQuery(sql, bindings) {
        const url = `${CLOUDFLARE_API_BASE}/accounts/${this.config.accountId}/d1/database/${this.config.databaseId}/raw`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.config.apiToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sql,
                bindings,
            }),
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Cloudflare D1 request failed with status ${response.status}: ${text}`);
        }
        const data = (await response.json());
        return data;
    }
    async listTables() {
        const sql = `SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;`;
        const result = await this.executeQuery(sql);
        if (!result.success) {
            const error = result.errors?.[0]?.message ?? "Unknown D1 error";
            throw new Error(`Failed to list tables: ${error}`);
        }
        const rows = Array.isArray(result.result) ? result.result : [];
        const firstResult = Array.isArray(rows[0]) ? rows[0] : rows;
        if (!Array.isArray(firstResult)) {
            return [];
        }
        // D1 returns rows as array of objects { name: string }
        return firstResult
            .filter((item) => typeof item === "object" && item !== null && "name" in item)
            .map((row) => row.name);
    }
}
//# sourceMappingURL=client.js.map