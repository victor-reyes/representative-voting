import { petition } from "../petition";
import { representative } from "../representative";
import { faker } from "@faker-js/faker";

const petitionService = petition.service;
const representativeService = representative.service;

async function seed() {
  const users = await fakeUniqueUsers();
  const representatives = await fakeUniqueRepresentatives(users);
  const petitions = await fakePetitions();

  await Promise.all(
    users.map(async (user) => {
      await representativeService.createUser(user.email);
    }),
  );

  await Promise.all(
    representatives.map(async (representative) => {
      await representativeService.create(
        representative.firstName,
        representative.lastName,
        representative.email,
      );
    }),
  );

  await Promise.all(
    petitions.map(async (petition) => {
      await petitionService.create(
        petition.topic,
        petition.description,
        petition.choices,
      );
    }),
  );

  const insertedPetitions = await petitionService.getAll();
  await seedFakePetitionVotes(users, insertedPetitions);
}

async function fakeUniqueUsers(numberOfUsers = 1000) {
  return faker.helpers
    .uniqueArray(faker.internet.email, numberOfUsers)
    .map((email) => ({ email }));
}

async function fakeUniqueRepresentatives(
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

async function seedFakePetitionVotes(
  users: { email: string }[],
  petitions: { id: number; choices: string[] }[],
) {
  await Promise.all(
    petitions.map(async (petition) => {
      await Promise.all(
        users.map(async (user) => {
          const choice =
            petition.choices[
              Math.floor(Math.random() * petition.choices.length)
            ];
          await representativeService.voteOnPetition(
            petition.id,
            user.email,
            choice,
          );
        }),
      );
    }),
  );
}

seed();
