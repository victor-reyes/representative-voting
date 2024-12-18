import { db } from "@/db";
import {
  representativesTable,
  choicesTable,
  usersTable,
  userVotingTable,
} from "./schemas";
import { and, desc, eq, lte } from "drizzle-orm";
import {
  Representative,
  User,
  VoteForRepresentative,
  VoteOnPetition,
} from "./types";

export function createRepository() {
  return {
    async getAllRepresentatives() {
      return await db.select().from(representativesTable);
    },

    async createRepresentative(representative: Representative) {
      return await db.insert(representativesTable).values(representative);
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

    async createUser(user: User) {
      return await db.insert(usersTable).values(user);
    },

    async createUsers(users: User[]) {
      return await db.insert(usersTable).values(users);
    },

    async voteOnPetition(voteOnPetition: VoteOnPetition) {
      return await db.insert(choicesTable).values(voteOnPetition);
    },

    async voteForRepresentative(voteForRepresentative: VoteForRepresentative) {
      return await db.insert(userVotingTable).values(voteForRepresentative);
    },

    async getVoteOfUserOnPetitionBy(petitionId: number, userEmail: string) {
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
