import { sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  email: text().primaryKey(),
});

export const representativesTable = pgTable("representatives", {
  email: text()
    .primaryKey()
    .references(() => usersTable.email),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  timestamp: integer()
    .notNull()
    .default(sql`extract(epoch from now())`),
});

export const userVotingTable = pgTable(
  "user_voting",
  {
    representativeEmail: text("representative_email").references(
      () => representativesTable.email,
    ),
    userEmail: text("user_email").references(() => usersTable.email),
    timestamp: integer()
      .notNull()
      .default(sql`extract(epoch from now())`),
  },
  (t) => [
    primaryKey({ columns: [t.representativeEmail, t.userEmail, t.timestamp] }),
  ],
);

export const userPreferencesTable = pgTable("user_preferences", {
  userEmail: text("user_email")
    .primaryKey()
    .references(() => usersTable.email),
  petitionId: integer("petion_id").notNull(),
});
