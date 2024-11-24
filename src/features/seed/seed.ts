import { petition } from "../petition";
import { representative } from "../representative";
import { faker } from "@faker-js/faker";

async function seed() {
  const petitionService = petition.service;
  const representativeService = representative.service;

  const users = await getFakeUsers();
  const representatives = await getFakeRepresentatives(users);
}

async function getFakeUsers(numberOfUsers = 1000) {
  return Array.from({ length: numberOfUsers }).map(() => ({
    email: faker.internet.email(),
  }));
}

async function getFakeRepresentatives(
  users: { email: string }[],
  numberOfRepresentatives = 10,
) {
  const representatives = Array.from({ length: numberOfRepresentatives }).map(
    () => {
      const user = users[Math.floor(Math.random() * users.length)];
      return {
        ...user,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      };
    },
  );

  const uniqueRepresentatives = [...new Set(representatives)];
  return uniqueRepresentatives;
}

seed();
