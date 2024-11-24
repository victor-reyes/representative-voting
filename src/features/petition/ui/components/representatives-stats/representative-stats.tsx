import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RepresentativeStatsItem } from "./representative-stats-item";
import { CircleChevronDown } from "lucide-react";

type Props = {
  representatives: {
    vote: string;
    votingPower: number;
    agreementRate: number;
    email: string;
    firstName: string;
    lastName: string;
  }[];
};

export function RepresentativesStats({ representatives }: Props) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex justify-self-end">
        <CircleChevronDown className="h-8 w-8" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-2">
          <h3 className="font-serif">Representatives:</h3>
          <ul className="ps-4">
            {representatives.map((representative) => (
              <RepresentativeStatsItem
                key={representative.email}
                representative={representative}
              />
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
