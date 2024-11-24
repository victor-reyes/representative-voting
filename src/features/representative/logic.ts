import { representativesTable, userVotingTable } from "./schemas";

export async function calculateRepresentativesVotingPower(
  userVotes: (typeof userVotingTable.$inferSelect)[],
  representatives: (typeof representativesTable.$inferSelect)[],
) {
  const mostRecentVotes = getMostRecentVotes(userVotes);

  return representatives.map((representative) => {
    const votes = getVotesFor(representative.email, mostRecentVotes);
    const votingPower = votes.length;
    return { ...representative, votingPower };
  });
}

export function getVotesFor(
  representativeEmail: string,
  mostRecentVotes: { representativeEmail: string; userEmail: string }[],
) {
  return mostRecentVotes.filter(
    (vote) => vote.representativeEmail === representativeEmail,
  );
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

export function calculateAgreementRate(
  representativeChoice: string,
  voterChoices: string[],
) {
  if (voterChoices.length === 0) {
    return 1;
  }
  return (
    voterChoices.filter((choice) => choice === representativeChoice).length /
    voterChoices.length
  );
}
