import { sql } from "drizzle-orm";
import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const petionsTable = pgTable("petitions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  alternatives: jsonb().$type<string[]>().notNull(),
  startTimestamp: timestamp()
    .notNull()
    .default(sql`extract(epoch from now())`),
  endTimestamp: timestamp(),
});
