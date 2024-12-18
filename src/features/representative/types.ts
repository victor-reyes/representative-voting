import { choicesTable, representativesTable, usersTable, userVotingTable } from "./schemas";

export type User = typeof usersTable.$inferInsert;
export type Representative = typeof representativesTable.$inferInsert;
export type VoteForRepresentative = typeof userVotingTable.$inferInsert;
export type VoteOnPetition = typeof choicesTable.$inferInsert;
