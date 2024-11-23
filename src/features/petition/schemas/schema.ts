import { sql } from "drizzle-orm";
import { integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const petionsTable = pgTable("petitions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  topic: text().notNull(),
  description: text().notNull(),
  alternatives: jsonb().$type<string[]>().notNull(),
  startTimestamp: integer()
    .notNull()
    .default(sql`extract(epoch from now())`),
  endTimestamp: integer(),
});
