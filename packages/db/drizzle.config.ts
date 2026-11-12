import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./dizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
