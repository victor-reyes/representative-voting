import { Card, Main } from "@/components/";
import { RepresentativeDrawer } from "./representative-drawer";
import { representativeVoterFeature } from "@/features";

export default async function Representatives() {
  const representatives = await representativeVoterFeature.service.getAll();
  return (
    <Main>
      <div className="flex justify-between items-center py-2">
        <div>Represenatives</div>
        <RepresentativeDrawer />
      </div>
      <ul className="space-y-2">
        {representatives.map((representative) => (
          <RepresentativeItem
            key={representative.id}
            representative={representative}
          />
        ))}
      </ul>
    </Main>
  );
}

type Props = {
  representative: { id: number; firstName: string; lastName: string };
};

export function RepresentativeItem({ representative }: Props) {
  return (
    <li>
      <Card className="px-4 py-2">
        <h2>
          {representative.firstName} {representative.lastName}
        </h2>
      </Card>
    </li>
  );
}
