import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return (await repository.getAll()).map(
        ({
          id,
          topic,
          description,
          choices,
          startTimestamp,
          endTimestamp,
        }) => {
          return {
            id,
            topic,
            description,
            choices,
            startTimestamp: new Date(startTimestamp * 1000),
            isDone: endTimestamp ? true : false,
          };
        },
      );
    },

    async create(topic: string, description: string, choices: string[]) {
      return await repository.create(topic, description, choices);
    },
  };
}
