import { petition } from "../petition";
import { calculateRepresentativesVotingPower } from "./logic";
import { Repository } from "./repository";

export function createService(
  repository: Repository,
  petitionService: { getAllPetitions: typeof petition.service.getAll },
) {
  return {
    async getAll() {
      return await repository.getAll();
    },

    async create(firstName: string, lastName: string, email: string) {
      return await repository.create(firstName, lastName, email);
    },

    async getRepresentativesWithVotingPowerByTimestamp(timestamp: number) {
      const userVotes = await repository.getUserVotesBeforeTimestamp(timestamp);
      const representatives = await repository.getAll();

      return await calculateRepresentativesVotingPower(
        userVotes,
        representatives,
      );
    },
  };
}
