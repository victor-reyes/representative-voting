import { db } from "@/db";
import {
  representativesTable,
  userPreferencesTable,
  userVotingTable,
} from "./schemas";
import { and, desc, eq, inArray, lte } from "drizzle-orm";

export function createRepository() {
  return {
    async getAll() {
      return await db.select().from(representativesTable);
    },

    async create(firstName: string, lastName: string, email: string) {
      return await db
        .insert(representativesTable)
        .values({ firstName, lastName, email });
    },

    async getUserVotesBeforeTimestamp(timestamp: number) {
      return await db
        .select()
        .from(userVotingTable)
        .where(lte(userVotingTable.timestamp, timestamp))
        .orderBy(desc(userVotingTable.timestamp));
    },

    async getPreferencesByPetionIdAndUsersEmails(
      petitionId: number,
      userEmails: string[],
    ) {
      return await db
        .select()
        .from(userPreferencesTable)
        .where(
          and(
            eq(userPreferencesTable.petitionId, petitionId),
            inArray(userPreferencesTable.userEmail, userEmails),
          ),
        );
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
