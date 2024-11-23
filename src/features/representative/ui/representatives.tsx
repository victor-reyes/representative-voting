import { ListSectionWithAddFormDrawer } from "@/components";
import { representative } from "../instance";
import { RepresentativeDrawer, RepresentativeItem } from "./components";

export async function Representatives() {
  const representatives = await representative.service.getAll();

  return (
    <ListSectionWithAddFormDrawer
      title="Representatives"
      addFormDrawer={<RepresentativeDrawer />}
    >
      {representatives.map((representative) => (
        <RepresentativeItem
          key={representative.email}
          representative={representative}
        />
      ))}
    </ListSectionWithAddFormDrawer>
  );
}
