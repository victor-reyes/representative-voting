import { Card } from "@/components";

type Props = {
  petition: {
    id: number;
    topic: string;
    description: string;
    choices: string[];
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
          <Choices choices={petition.choices} />
        </div>
        <div>{petition.isDone ? "Done" : "Ongoing"}</div>
      </Card>
    </li>
  );
}

function Choices({ choices }: { choices: string[] }) {
  return (
    <div className="p-2">
      <h3 className="font-serif">Alternatives:</h3>
      <ul className="list-disc  ps-6">
        {choices.map((choice) => (
          <li key={choice} className="text-slate-600">
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
}
