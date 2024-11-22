import { Button, Card, Main } from "@/components/";

const representatives: { id: number; firstName: string; lastName: string }[] = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "Alice", lastName: "Johnson" },
];

export default function Representatives() {
  return (
    <Main>
      <div className="flex justify-between items-center py-2">
        <div>Represenatives</div>
        <AddNewRepresentativeButton />
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

export function AddNewRepresentativeButton() {
  return <Button>Add New Representative</Button>;
}
