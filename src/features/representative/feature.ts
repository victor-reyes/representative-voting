import { petition } from "../petition";
import { createRepository } from "./repository";
import { createService } from "./service";

export function createFeature() {
  const repository = createRepository();
  const petitionService = { getAllPetitions: petition.service.getAll };
  const service = createService(repository, petitionService);

  return { repository, service };
}
