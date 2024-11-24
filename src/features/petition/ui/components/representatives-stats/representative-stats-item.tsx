type Props = {
  representative: {
    vote: string;
    votingPower: number;
    agreementRate: number;
    firstName: string;
    lastName: string;
  };
};

export function RepresentativeStatsItem({ representative }: Props) {
  return (
    <article className="p-2 flex flex-col gap-2">
      <h3 className="font-semibold text-lg">{`${representative.firstName} ${representative.lastName}`}</h3>
      <div>{`Vote: ${representative.vote}`}</div>
      <div>{`Voting Power: ${representative.votingPower}`}</div>
      <div>{`Agreement Rate: ${Math.round(
        representative.agreementRate * 100,
      )}%`}</div>
    </article>
  );
}
