import { petition } from "../instance";
import { PetitionItem } from "./components";
import { PetitionDrawer } from "./components/petion-drawer";
import { ListSectionWithAddFormDrawer } from "@/components";

export async function Petitions() {
  const petitions = await petition.service.getAllPetitionsWithStats();

  return (
    <ListSectionWithAddFormDrawer
      title="Petitions"
      addFormDrawer={<PetitionDrawer />}
    >
      {petitions.map((petition) => (
        <PetitionItem key={petition.id} petition={petition} />
      ))}
    </ListSectionWithAddFormDrawer>
  );
}
