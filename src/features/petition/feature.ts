import { representative } from "../representative";
import { createRepository } from "./repository";
import { createService } from "./service";

export function createFeature() {
  const repository = createRepository();
  const getRepresentativesForPetition = representative.service.getRepresentativesForPetition
  const service = createService({...repository, getRepresentativesForPetition});
  return { repository, service };
}
