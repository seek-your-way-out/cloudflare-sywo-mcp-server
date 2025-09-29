import * as dotenv from "dotenv";
// Temporarily suppress console.log to prevent dotenv output
const originalLog = console.log;
console.log = () => { };
dotenv.config();
console.log = originalLog;
export function loadConfig() {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
    const databaseName = process.env.CLOUDFLARE_D1_DATABASE_NAME;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    if (!accountId) {
        throw new Error("Missing CLOUDFLARE_ACCOUNT_ID environment variable.");
    }
    if (!databaseId) {
        throw new Error("Missing CLOUDFLARE_D1_DATABASE_ID environment variable.");
    }
    if (!databaseName) {
        throw new Error("Missing CLOUDFLARE_D1_DATABASE_NAME environment variable.");
    }
    if (!apiToken) {
        throw new Error("Missing CLOUDFLARE_API_TOKEN environment variable.");
    }
    return {
        accountId,
        databaseId,
        databaseName,
        apiToken,
    };
}
//# sourceMappingURL=config.js.map