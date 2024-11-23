import { db } from "@/db";
import { petionsTable } from "./schemas/schema";

export function createRepository() {

  return {
    async getAll() {
      return (await db.select().from(petionsTable));
    },

    async create(topic: string, description: string, alternatives: string[]) {
      await db.insert(petionsTable).values({
        topic,
        description,
        alternatives,
      })
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
