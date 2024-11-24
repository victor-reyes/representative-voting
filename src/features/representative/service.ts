import {
  calculateAgreementRate,
  calculateRepresentativesVotingPower,
  getMostRecentVotes,
  getVotesFor,
} from "./logic";
import { Repository } from "./repository";
import { usersTable } from "./schemas";

export function createService(repository: Repository) {
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

    async getRepresentativesForPetition(petitionId: number, timestamp: number) {
      const userVotes = await repository.getUserVotesBeforeTimestamp(timestamp);
      const mostRecentVotes = getMostRecentVotes(userVotes);

      const userPrefs = await repository.getChoicesByPetionId(petitionId);
      const representatives = await repository.getAll();

      const representativesWithStats = representatives
        .map((representative) => {
          const vote = userPrefs.find(
            (pref) => pref.userEmail === representative.email,
          )?.choice;
          return { ...representative, vote };
        })
        .filter((representative) => representative.vote !== undefined)
        .map((representative) => {
          const votes = getVotesFor(representative.email, mostRecentVotes);
          const voterPrefs = votes
            .map((vote) => {
              return userPrefs.find(
                (pref) => pref.userEmail === vote.userEmail,
              );
            })
            .filter((pref) => pref !== undefined)
            .map((pref) => pref.choice);
          const agreementRate = calculateAgreementRate(
            representative.vote!,
            voterPrefs,
          );
          return {
            ...representative,
            vote: representative.vote!,
            votingPower: votes.length,
            agreementRate,
          };
        });

      return representativesWithStats;
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
