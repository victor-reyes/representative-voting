import { petition } from "../petition";
import { representative } from "../representative";
import { faker } from "@faker-js/faker";

const petitionService = petition.service;
const representativeService = representative.service;
const YEAR_IN_MILLIS = 1000 * 60 * 60 * 24 * 365;

async function seed() {
  const users = await fakeUniqueUsers();
  const representatives = await fakeUniqueRepresentatives(users);
  const petitions = await fakePetitions();

  await seedUsers(users);
  await seedRepresentatives(representatives);
  await seedPetitions(petitions);

  const insertedPetitions = await petitionService.getAll();
  await seedFakePetitionVotes(users, insertedPetitions);

  await seedFakeRepresentativeVotes(
    users,
    representatives,
    insertedPetitions.map((petition) => petition.startTimestamp),
  );
}

async function seedPetitions(
  petitions: {
    topic: string;
    description: string;
    choices: string[];
    timestamp: number;
  }[],
) {
  await Promise.all(
    petitions.map(async (petition) => {
      await petitionService.create(
        petition.topic,
        petition.description,
        petition.choices,
        petition.timestamp,
      );
    }),
  );
}

async function seedRepresentatives(
  representatives: { firstName: string; lastName: string; email: string }[],
) {
  await Promise.all(
    representatives.map(async (representative) => {
      await representativeService.create(
        representative.firstName,
        representative.lastName,
        representative.email,
      );
    }),
  );
}

async function seedUsers(users: { email: string }[]) {
  await Promise.all(
    users.map(async (user) => {
      await representativeService.createUser(user.email);
    }),
  );
}

async function fakeUniqueUsers(numberOfUsers = 1000) {
  return faker.helpers
    .uniqueArray(faker.internet.email, numberOfUsers)
    .map((email) => ({ email }));
}

async function fakeUniqueRepresentatives(
  users: { email: string }[],
  numberOfRepresentatives = 5,
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

async function fakePetitions(numberOfPetitions = 10) {
  return faker.date
    .betweens({
      from: new Date().getTime() - 4 * YEAR_IN_MILLIS,
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
      await petitionService.concludePetition(petition.id);
    }),
  );
}

async function seedFakeRepresentativeVotes(
  users: { email: string }[],
  representatives: { email: string }[],
  petitionTimestamps: number[],
) {
  await Promise.all(
    petitionTimestamps.map(async (timestamp) => {
      await Promise.all(
        users.map(async (user) => {
          const representative =
            representatives[Math.floor(Math.random() * representatives.length)];
          await representativeService.voteForRepresentative(
            representative.email,
            user.email,
            timestamp - 1,
          );
        }),
      );
    }),
  );
}

seed();
