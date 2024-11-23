import { petition } from "../instance";
import { PetitionItem } from "./components";
import { PetitionDrawer } from "./components/petion-drawer";

export async function Petitions() {
  const petitions = await petition.service.getAll();

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <div>Petitions:</div>
        <PetitionDrawer />
      </div>
      <ul className="space-y-2">
        {petitions.map((petition) => (
          <PetitionItem key={petition.id} petition={petition} />
        ))}
      </ul>
    </>
  );
}
