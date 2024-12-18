import { Explanation } from "@/components/explanation";
import { petitionFeature } from "../instance";
import { PetitionItem } from "./components";
import { PetitionDrawer } from "./components/petion-drawer";
import { ListSectionWithAddFormDrawer } from "@/components";

export async function Petitions() {
  const petitions = await petitionFeature.service.getAllPetitionsWithStats();

  return petitions.length > 0 ? (
    <ListSectionWithAddFormDrawer
      title="Petitions"
      addFormDrawer={<PetitionDrawer />}
    >
      {petitions.map((petition) => (
        <PetitionItem key={petition.id} petition={petition} />
      ))}
    </ListSectionWithAddFormDrawer>
  ) : (
    <Explanation
      explanation={`
      No petitions have been created yet.
      Create a new petition by clicking the button below.
    `}
    >
      <PetitionDrawer />
    </Explanation>
  );
}
