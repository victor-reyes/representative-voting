import { Card, Main } from "@/components";

const petitions = [
  {
    id: 1,
    topic: "Free Ice Cream for Everyone!",
    description:
      "A proposal to provide free ice cream to all citizens as a gesture to boost public morale and happiness.",
    isDone: false,
  },
  {
    id: 2,
    topic: "Higher Wages for Teachers",
    description:
      "A petition advocating for increased salaries for teachers to recognize their vital role in educating future generations.",
    isDone: true,
  },
  {
    id: 3,
    topic: "More Nuclear Power Plants",
    description:
      "A call to build additional nuclear power plants to meet energy demands and reduce reliance on fossil fuels.",
    isDone: true,
  },
];

export default function Petitions() {
  return (
    <Main>
      <h1>Petitions!</h1>
      <ul className="space-y-2">
        {petitions.map((petition) => (
          <PetitionItem key={petition.id} petition={petition} />
        ))}
      </ul>
    </Main>
  );
}

type Props = {
  petition: { id: number; topic: string; description: string; isDone: boolean };
};

export function PetitionItem({ petition }: Props) {
  return (
    <li>
      <Card className="px-4 py-2 flex gap-4 justify-between items-center">
        <div>
          <h2 className="font-bold">{petition.topic}</h2>
          <p className="text-slate-600">{petition.description}</p>
        </div>
        <div>{petition.isDone ? "Done" : "Ongoing"}</div>
      </Card>
    </li>
  );
}
