import { representativesTable, userVotingTable } from "./schemas";

export async function calculateRepresentativesVotingPower(
  userVotes: (typeof userVotingTable.$inferSelect)[],
  representatives: (typeof representativesTable.$inferSelect)[],
) {
  const mostRecentVotes = userVotes.filter(
    (vote, index, array) =>
      array.findIndex((v) => v.userEmail === vote.userEmail) === index,
  );

  return representatives.map((representative) => {
    const votes = mostRecentVotes.filter(
      (vote) => vote.representativeEmail === representative.email,
    );
    const votingPower = votes.length;
    return { ...representative, votingPower };
  });
}
