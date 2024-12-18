import { sql } from "drizzle-orm";
import { integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";

export const petitionsTable = pgTable("petitions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  topic: text().notNull(),
  description: text().notNull(),
  choices: jsonb().$type<string[]>().notNull(),
  startTimestamp: integer("start_timestamp")
    .notNull()
    .default(sql`extract(epoch from now())`),
  endTimestamp: integer("end_timestamp"),
});
