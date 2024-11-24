import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { calculateRepresentativesVotingPower } from "./logic";

describe("Representatives voting power:", async () => {
  it("should return empty list if there are no representatives", async () => {
    const userVotes = [
      { timestamp: 1, representativeEmail: "email1", userEmail: "user1" },
      { timestamp: 2, representativeEmail: "email2", userEmail: "user2" },
      { timestamp: 3, representativeEmail: "email3", userEmail: "user3" },
    ];

    const result = await calculateRepresentativesVotingPower(userVotes, []);

    deepEqual(result, []);
  });
  it("should return list with representatives wwith voting power of zero if there are no votes", async () => {
    const representatives = [
      { email: "email1", firstName: "", lastName: "", timestamp: 1 },
      { email: "email2", firstName: "", lastName: "", timestamp: 2 },
      { email: "email3", firstName: "", lastName: "", timestamp: 3 },
    ];

    const result = await calculateRepresentativesVotingPower(
      [],
      representatives,
    );

    deepEqual(
      result,
      representatives.map((representative) => ({
        ...representative,
        votingPower: 0,
      })),
    );
  });
  it("should be calculated based on the number of users' most recent votes", () => {});
});
