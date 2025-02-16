// schema.ts
import { pgTable, serial, varchar, text, boolean, jsonb } from "drizzle-orm/pg-core";

export const appsTable = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  normal_app: varchar("normal_app", { length: 255 }).notNull(),
  description: text("description").notNull(),
  features: text("features").notNull(),
  platforms: text("platforms").notNull(),
  official_links: jsonb("official_links").notNull(),
  recommended: boolean("recommended").default(false).notNull()
});