import { db } from "@/db";
import { petitionsTable } from "./schemas/schema";
import { desc, eq } from "drizzle-orm";
import { PetitionInsert } from "./ui/types";

export function createRepository() {
  return {
    async getAllPetitions() {
      return await db
        .select()
        .from(petitionsTable)
        .orderBy(desc(petitionsTable.startTimestamp));
    },

    async createPetition(petition: PetitionInsert) {
      await db.insert(petitionsTable).values(petition);
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
