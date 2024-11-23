import { pgTable, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  email: text().primaryKey(),
});
