import { db } from "@/db";
import { petitionsTable } from "./schemas/schema";
import { desc, eq } from "drizzle-orm";

export function createRepository() {
  return {
    async getAll() {
      return await db
        .select()
        .from(petitionsTable)
        .orderBy(desc(petitionsTable.startTimestamp));
    },

    async create(
      topic: string,
      description: string,
      choices: string[],
      timestamp?: number,
    ) {
      await db.insert(petitionsTable).values({
        topic,
        description,
        choices,
        startTimestamp: timestamp,
      });
    },

    async concludePetition(petitionId: number) {
      return await db
        .update(petitionsTable)
        .set({ endTimestamp: Math.floor(Date.now() / 1000) })
        .where(eq(petitionsTable.id, petitionId));
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
