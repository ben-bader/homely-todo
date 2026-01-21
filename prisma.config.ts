import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun prisma/seed.ts" // Bun-compatible seed command
  },
  datasource: {
    url: process.env.DATABASE_URL, // Ensure this is set in your .env
  },
})
