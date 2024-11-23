import { petition } from "../instance";
import { PetitionItem } from "./components";

export async function Petitions() {
  const petitions = await petition.service.getAll();

  return (
    <>
      <h1>Petitions!</h1>
      <ul className="space-y-2">
        {petitions.map((petition) => (
          <PetitionItem key={petition.id} petition={petition} />
        ))}
      </ul>
    </>
  );
}
