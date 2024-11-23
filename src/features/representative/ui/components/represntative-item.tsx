import { Card } from "@/components";

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
