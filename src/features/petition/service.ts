import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return (await repository.getAll()).map(
        ({
          id,
          topic,
          description,
          alternatives,
          startTimestamp,
          endTimestamp,
        }) => {
          return {
            id,
            topic,
            description,
            alternatives,
            startTimestamp: new Date(startTimestamp * 1000),
            isDone: endTimestamp ? true : false,
          };
        },
      );
    },

    async create(topic: string, description: string, alternatives: string[]) {
      return await repository.create(topic, description, alternatives);
    },
  };
}
