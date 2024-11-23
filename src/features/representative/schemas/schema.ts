import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

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

export const userVotingTable = pgTable(
  "user_voting",
  {
    representativeEmail: text().references(() => representativesTable.email),
    userEmail: text().references(() => usersTable.email),
    timestamp: text().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.representativeEmail, t.userEmail, t.timestamp] }),
  ],
);

export const userPreferencesTable = pgTable("user_preferences", {
  userEmail: text()
    .primaryKey()
    .references(() => usersTable.email),
  petitionId: integer().notNull(),
});
