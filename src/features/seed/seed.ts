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
  return faker.helpers
    .uniqueArray(faker.internet.email, numberOfUsers)
    .map((email) => ({ email }));
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

async function fakePetitions(numberOfPetitions = 100) {
  return faker.date
    .betweens({
      from: new Date(),
      to: new Date(),
      count: numberOfPetitions,
    })
    .map((date) => {
      const timestamp = date.getTime();
      const numberOfChoices = Math.floor(Math.random() * 3) + 2;
      return {
        topic: faker.word.words(3),
        description: faker.word.words(15),
        choices: faker.helpers.uniqueArray(faker.word.noun, numberOfChoices),
        timestamp,
      };
    });
}

seed();
