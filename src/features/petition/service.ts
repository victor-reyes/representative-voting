import { Repository } from "./repository";
import { calculateVotesFor, calculateWinLostDraw } from "./logic";
import { representative } from "..";

export function createService(repository: Repository) {
  const representativeService = representative.service;

  return {
    async getAllPetitionsWithStats() {
      const petitions = (await repository.getAll()).map((petition) => {
        return {
          ...petition,
          isDone: petition.endTimestamp ? true : false,
        };
      });

      const petionsWithStats = await Promise.all(
        petitions.map(async (petition) => {
          const representatives =
            await representativeService.getRepresentativesForPetition(
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

    async create(
      topic: string,
      description: string,
      choices: string[],
      timestamp?: number,
    ) {
      return await repository.create(
        topic,
        description,
        choices,
        timestamp ? Math.floor(timestamp / 1000) : undefined,
      );
    },
  };
}
