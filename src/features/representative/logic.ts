import { representativesTable, userVotingTable } from "./schemas";

export async function calculateRepresentativesVotingPower(
  userVotes: (typeof userVotingTable.$inferSelect)[],
  representatives: (typeof representativesTable.$inferSelect)[],
) {
  const mostRecentVotes = getMostRecentVotes(userVotes);

  return representatives.map((representative) => {
    const votes = mostRecentVotes.filter(
      (vote) => vote.representativeEmail === representative.email,
    );
    const votingPower = votes.length;
    return { ...representative, votingPower };
  });
}

export function getMostRecentVotes(
  userVotes: {
    timestamp: number;
    representativeEmail: string;
    userEmail: string;
  }[],
) {
  return userVotes.filter(
    (vote, index, array) =>
      array.findIndex((v) => v.userEmail === vote.userEmail) === index,
  );
}
