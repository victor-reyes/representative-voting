import { db } from "@/db";
import { representativesTable } from "./schemas";

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
  };
}

export type Repository = ReturnType<typeof createRepository>;
