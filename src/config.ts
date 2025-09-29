import * as dotenv from "dotenv";

dotenv.config();

export interface D1Config {
  accountId: string;
  databaseId: string;
  databaseName: string;
  apiToken: string;
}

export function loadConfig(): D1Config {
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