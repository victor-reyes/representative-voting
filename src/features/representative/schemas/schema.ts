import { pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  email: text().primaryKey(),
});

export const representativesTable = pgTable("representatives", {
  email: text()
    .primaryKey()
    .references(() => usersTable.email),
  firstName: text().notNull(),
  lastName: text().notNull(),
});