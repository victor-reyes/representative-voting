import { Card } from "@/components/ui/card";

const petitions = [
  { id: 1, topic: "Free Ice Cream for Everyone!", isDone: false },
  { id: 2, topic: "Higher Wages for Teachers", isDone: true },
  { id: 3, topic: "More Nuclear Power Plants", isDone: true },
];

export default function Petitions() {
  return (
    <main>
      <h1>Petitions!</h1>
      <ul className="flex flex-col gap-2">
        {petitions.map((petition) => (
          <PetitionItem key={petition.id} petition={petition} />
        ))}
      </ul>
    </main>
  );
}

type Props = { petition: { id: number; topic: string; isDone: boolean } };

export function PetitionItem({ petition }: Props) {
  return (
    <li>
      <Card className="px-4 py-2 flex gap-4 justify-between">
        <h2>{petition.topic}</h2>
        <p>{petition.isDone ? "Done" : "Ongoing"}</p>
      </Card>
    </li>
  );
}
