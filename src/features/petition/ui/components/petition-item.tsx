"use client";

import { Button, Card } from "@/components";
import { ChoiceState } from "../../logic";
import { RepresentativesStats } from "./representatives-stats";
import { concludePetitionAction } from "../../actions";

type Props = {
  petition: {
    id: number;
    topic: string;
    description: string;
    choices: {
      choice: string;
      votes: number;
      result: ChoiceState;
    }[];
    representatives: {
      vote: string;
      votingPower: number;
      agreementRate: number;
      email: string;
      firstName: string;
      lastName: string;
      timestamp: number;
    }[];
    isDone: boolean;
  };
};

export function PetitionItem({ petition }: Props) {
  return (
    <li>
      <Card className="px-4 py-2 space-x-4">
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h2 className="font-bold">{petition.topic}</h2>
            <p className="text-slate-600">{petition.description}</p>
          </div>
          {petition.isDone ? (
            <div>Done</div>
          ) : (
            <Button onClick={() => concludePetitionAction(petition.id)}>
              Conclude
            </Button>
          )}
        </div>
        <Choices choices={petition.choices} />
        {petition.representatives.length > 0 && (
          <RepresentativesStats representatives={petition.representatives} />
        )}
      </Card>
    </li>
  );
}

function Choices({
  choices,
}: {
  choices: {
    choice: string;
    votes: number;
    result: ChoiceState;
  }[];
}) {
  return (
    <div className="p-2">
      <h3 className="font-serif">Alternatives:</h3>
      <ul className="list-disc ps-6">
        {choices.map(({ choice, votes, result }) => (
          <li
            key={choice}
            className={`${
              result === "win"
                ? "text-green-600"
                : result === "draw"
                ? "text-yellow-600"
                : "text-slate-600"
            }
          `}
          >
            {choice} - {votes} votes
            {result === "win"
              ? " (winner)"
              : result === "draw"
              ? " (draw)"
              : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
