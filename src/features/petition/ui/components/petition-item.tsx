import { Card } from "@/components";

type Props = {
  petition: {
    id: number;
    topic: string;
    description: string;
    alternatives: string[];
    startTimestamp: Date;
    isDone: boolean;
  };
};

export function PetitionItem({ petition }: Props) {
  return (
    <li>
      <Card className="px-4 py-2 flex gap-4 justify-between items-center">
        <div>
          <h2 className="font-bold">{petition.topic}</h2>
          <p className="text-slate-600">{petition.description}</p>
          <Alternatives alternatives={petition.alternatives} />
        </div>
        <div>{petition.isDone ? "Done" : "Ongoing"}</div>
      </Card>
    </li>
  );
}

function Alternatives({ alternatives }: { alternatives: string[] }) {
  return (
    <div className="p-2">
      <h3 className="font-serif">Alternatives:</h3>
      <ul className="list-disc  ps-6">
        {alternatives.map((alternative) => (
          <li key={alternative} className="text-slate-600">
            {alternative}
          </li>
        ))}
      </ul>
    </div>
  );
}
