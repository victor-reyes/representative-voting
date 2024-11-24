import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return (await repository.getAll()).map((petition) => {
        return {
          ...petition,
          isDone: petition.endTimestamp ? true : false,
        };
      });
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
