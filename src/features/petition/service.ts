import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return await repository.getAll();
    },

    async create(topic: string, description: string) {
      return await repository.create(topic, description);
    },
  };
}
