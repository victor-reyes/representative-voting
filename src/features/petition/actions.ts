"use server";

import { revalidatePath } from "next/cache";
import { petition } from "./instance";
import { redirect } from "next/navigation";

export async function createPetitionAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const choices = (formData.get("choices") as string).split(",");

  await petition.service.create(title, description, choices);

  revalidatePath("/petitions");
  redirect("/petitions");
}

export async function concludePetitionAction(petitionId: number) {
  await petition.service.concludePetition(petitionId);
  revalidatePath("/petitions");
}
