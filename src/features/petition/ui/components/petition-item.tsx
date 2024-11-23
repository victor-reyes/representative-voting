import { Card } from "@/components";

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
