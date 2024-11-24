import { petition } from "../petition";
import { createRepository } from "./repository";
import { createService } from "./service";

export function createFeature() {
  const repository = createRepository();
  const service = createService({
    ...repository,
    getAllPetitions: petition.service.getAll,
  });

  return { repository, service };
}
