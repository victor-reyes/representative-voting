import { petition } from "../petition";
import { calculateRepresentativesVotingPower } from "./logic";
import { Repository } from "./repository";
import { usersTable } from "./schemas";

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

    async createUser(email: string) {
      return await repository.createUser(email);
    },

    async createUsers(users: (typeof usersTable.$inferInsert)[]) {
      return await repository.createUsers(users);
    },

    async voteOnPetition(
      petitionId: number,
      userEmail: string,
      choice: string,
    ) {
      return await repository.voteOnPetition(petitionId, userEmail, choice);
    },

    async voteForRepresentative(
      representativeEmail: string,
      userEmail: string,
      timestamp: number,
    ) {
      return await repository.voteForRepresentative(
        representativeEmail,
        userEmail,
        timestamp,
      );
    },
  };
}
