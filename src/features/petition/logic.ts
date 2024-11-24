export function calculateVotesFor(
  choice: string,
  representatives: { vote: string; votingPower: number }[],
) {
  const votes = representatives
    .filter((representative) => representative.vote === choice)
    .reduce(
      (totalVotes, representative) => totalVotes + representative.votingPower,
      0,
    );
  return { choice, votes };
}
