import { Repository } from "./repository";
import { calculateVotesFor, calculateWinLostDraw } from "./logic";

export function createService(
  repository: Repository & RepresentativeRepository,
) {
  return {
    async getAllPetitions() {
      return await repository.getAllPetitions();
    },

    async getAllPetitionsWithStats() {
      const petitions = (await repository.getAllPetitions()).map((petition) => {
        return {
          ...petition,
          isDone: petition.endTimestamp ? true : false,
        };
      });

      const petionsWithStats = await Promise.all(
        petitions.map(async (petition) => {
          const representatives =
            await repository.getRepresentativesForPetition(
              petition.id,
              petition.startTimestamp,
            );
          const choicesWithVotes = petition.choices.map((choice) =>
            calculateVotesFor(choice, representatives),
          );
          const choicesWithResult = calculateWinLostDraw(choicesWithVotes);

          return { ...petition, representatives, choices: choicesWithResult };
        }),
      );

      return petionsWithStats;
    },

    async createPetition(
      topic: string,
      description: string,
      choices: string[],
      timestamp?: number,
    ) {
      return await repository.createPetition({
        topic,
        description,
        choices,
        startTimestamp: timestamp ? Math.floor(timestamp / 1000) : undefined,
      });
    },

    async concludePetition(petitionId: number) {
      return await repository.concludePetition(petitionId);
    },
  };
}

type RepresentativeRepository = {
  getRepresentativesForPetition(
    petitionId: number,
    timestamp: number,
  ): Promise<
    {
      vote: string;
      votingPower: number;
      agreementRate: number;
      firstName: string;
      lastName: string;
      email: string;
      timestamp: number;
    }[]
  >;
};
