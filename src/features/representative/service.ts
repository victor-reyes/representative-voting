import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async getAll() {
      return await repository.getAll();
    },

    async create(firstName: string, lastName: string, email: string) {
      return await repository.create(firstName, lastName, email);
    },
  };
}
