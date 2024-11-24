import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return (await repository.getAll()).map((petition) => {
        return {
          ...petition,
          startTimestamp: new Date(petition.startTimestamp * 1000),
          isDone: petition.endTimestamp ? true : false,
        };
      });
    },

    async create(topic: string, description: string, choices: string[]) {
      return await repository.create(topic, description, choices);
    },
  };
}
