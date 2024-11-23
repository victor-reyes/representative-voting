import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return await repository.getAll();
    },
  };
}
