import { integer, pgTable, text } from "drizzle-orm/pg-core";

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

export const userVotingTable = pgTable("user_voting", {
  userEmail: text()
    .primaryKey()
    .references(() => usersTable.email),
  representativeEmail: text()
    .references(() => representativesTable.email),
  timestamp: text().notNull(),
});

export const userPreferencesTable = pgTable("user_preferences", {
  userEmail: text()
    .primaryKey()
    .references(() => usersTable.email),
  petitionId: integer().notNull(),
});
