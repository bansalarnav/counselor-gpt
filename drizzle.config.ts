import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit";

dotenv.config({ path: "./.env.local" });
console.log("Loaded Environment")

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  },
} satisfies Config;
