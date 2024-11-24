import { petition } from "../petition";
import { representative } from "../representative";
import { faker } from "@faker-js/faker";

async function seed() {
  const petitionService = petition.service;
  const representativeService = representative.service;

  const users = await getFakeUsers();
}

async function getFakeUsers(numberOfUsers = 1000) {
  return Array.from({ length: numberOfUsers }).map(() => ({
    email: faker.internet.email(),
  }));
}

seed();
