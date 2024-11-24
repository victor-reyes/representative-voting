import { Explanation, ListSectionWithAddFormDrawer } from "@/components";
import { representative } from "../instance";
import { RepresentativeDrawer, RepresentativeItem } from "./components";

export async function Representatives() {
  const representatives = await representative.service.getAll();

  return representatives.length > 0 ? (
    <ListSectionWithAddFormDrawer
      title="Petitions"
      addFormDrawer={<RepresentativeDrawer />}
    >
      {representatives.map((representative) => (
        <RepresentativeItem
          key={representative.email}
          representative={representative}
        />
      ))}
    </ListSectionWithAddFormDrawer>
  ) : (
    <Explanation
      explanation={`
      No representatives have been registred yet.
      Register a new representative by clicking the button below.
      Note: Representatives are users who can vote on petitions.
      You can only register a representative if they are not already registered
      and if they registered as a user.
    `}
    >
      <RepresentativeDrawer />
    </Explanation>
  );
}
