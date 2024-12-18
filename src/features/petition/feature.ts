import { representativeFeature } from "../representative";
import { createRepository } from "./repository";
import { createService } from "./service";

export function createFeature() {
  const repository = createRepository();
  const getRepresentativesForPetition =
    representativeFeature.service.getRepresentativesForPetition;
  const service = createService({
    ...repository,
    getRepresentativesForPetition,
  });
  return { service };
}
