"use server";

import { revalidatePath } from "next/cache";
import { petition } from "./instance";
import { redirect } from "next/navigation";
import { z } from "zod";

const petitionCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  choices: z
    .string()
    .transform((choices) => choices.split(",").map((choice) => choice.trim()))
    .pipe(
      z.array(z.string()).min(2, "Petition must have at least two choices"),
    ),
});

export async function createPetitionAction(formData: FormData) {
  const createPetition = Object.fromEntries(formData.entries());
  const validatedCreatePetition =
    petitionCreationSchema.safeParse(createPetition);

  if (!validatedCreatePetition.success) {
    throw new Error("Invalid form data for creating a petition");
  }

  const { title, description, choices } = validatedCreatePetition.data;
  await petition.service.create(title, description, choices);

  revalidatePath("/petitions");
  redirect("/petitions");
}

export async function concludePetitionAction(petitionId: number) {
  await petition.service.concludePetition(petitionId);
  revalidatePath("/petitions");
}
