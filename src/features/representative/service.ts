import {
  calculateAgreementRate,
  calculateRepresentativesVotingPower,
  getMostRecentVotes,
  getVotesFor,
} from "./logic";
import { Repository } from "./repository";
import {
  Representative,
  User,
  VoteForRepresentative,
  VoteOnPetition,
} from "./types";

export function createService(repository: Repository) {
  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },

    async createRepresentative(representative: Representative) {
      return await repository.createRepresentative(representative);
    },

    async getRepresentativesWithVotingPowerByTimestamp(timestamp: number) {
      const userVotes = await repository.getUserVotesBeforeTimestamp(timestamp);
      const representatives = await repository.getAllRepresentatives();

      return await calculateRepresentativesVotingPower(
        userVotes,
        representatives,
      );
    },

    async getRepresentativesForPetition(petitionId: number, timestamp: number) {
      const userVotes = await repository.getUserVotesBeforeTimestamp(timestamp);
      const mostRecentVotes = getMostRecentVotes(userVotes);

      const userPrefs = await repository.getChoicesByPetionId(petitionId);
      const representatives = await repository.getAllRepresentatives();

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

    async createUser(user: User) {
      return await repository.createUser(user);
    },

    async createUsers(users: User[]) {
      return await repository.createUsers(users);
    },

    async voteOnPetition(voteOnPetition: VoteOnPetition) {
      return await repository.voteOnPetition(voteOnPetition);
    },

    async voteForRepresentative(voteForRepresentative: VoteForRepresentative) {
      return await repository.voteForRepresentative(voteForRepresentative);
    },
  };
}
