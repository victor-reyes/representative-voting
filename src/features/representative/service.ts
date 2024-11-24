import { calculateRepresentativesVotingPower } from "./logic";
import { Repository } from "./repository";

export function createService(
  repository: Repository & {
    getAllPetitions: () => Promise<
      {
        id: number;
        topic: string;
        description: string;
        alternatives: string[];
        startTimestamp: Date;
        isDone: boolean;
      }[]
    >;
  },
) {
  return {
    async getAll() {
      return await repository.getAll();
    },

    async create(firstName: string, lastName: string, email: string) {
      return await repository.create(firstName, lastName, email);
    },
  };
}
