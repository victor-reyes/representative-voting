import { db } from "@/db";
import { petitionsTable } from "./schemas/schema";
import { desc } from "drizzle-orm";

export function createRepository() {
  return {
    async getAll() {
      return await db
        .select()
        .from(petitionsTable)
        .orderBy(desc(petitionsTable.startTimestamp));
    },

    async create(topic: string, description: string, choices: string[], timestamp?: number) {
      await db.insert(petitionsTable).values({
        topic,
        description,
        choices,
        startTimestamp: timestamp,
      });
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
