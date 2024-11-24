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

export function calculateWinLostDraw(
  choices: { choice: string; votes: number }[],
): { choice: string; votes: number; result: ChoiceState }[] {
  const maxVotes = Math.max(...choices.map((choice) => choice.votes));
  const hasWinner =
    choices.filter((choice) => choice.votes === maxVotes).length === 1;
  return choices.map((choice) => {
    if (choice.votes === maxVotes) {
      return { ...choice, result: hasWinner ? "win" : "draw" };
    } else {
      return { ...choice, result: "lose" };
    }
  });
}

export type ChoiceState = "win" | "lose" | "draw";
