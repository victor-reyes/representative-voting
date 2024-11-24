import { db } from "@/db";
import {
  representativesTable,
  choicesTable,
  usersTable,
  userVotingTable,
} from "./schemas";
import { and, desc, eq, lte } from "drizzle-orm";

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

    async getChoicesByPetionId(petitionId: number) {
      return await db
        .select()
        .from(choicesTable)
        .where(eq(choicesTable.petitionId, petitionId));
    },

    async createUser(email: string) {
      return await db.insert(usersTable).values({ email });
    },

    async createUsers(users: (typeof usersTable.$inferInsert)[]) {
      return await db.insert(usersTable).values(users);
    },

    async voteOnPetition(
      petitionId: number,
      userEmail: string,
      choice: string,
    ) {
      return await db
        .insert(choicesTable)
        .values({ petitionId, userEmail, choice });
    },

    async voteForRepresentative(
      representativeEmail: string,
      userEmail: string,
      timestamp: number,
    ) {
      return await db
        .insert(userVotingTable)
        .values({ representativeEmail, userEmail, timestamp });
    },

    async getVoteOfUserOnPetition(petitionId: number, userEmail: string) {
      return (
        await db
          .select({ choice: choicesTable.choice })
          .from(choicesTable)
          .where(
            and(
              eq(choicesTable.petitionId, petitionId),
              eq(choicesTable.userEmail, userEmail),
            ),
          )
      )[0]?.choice as string | undefined;
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
