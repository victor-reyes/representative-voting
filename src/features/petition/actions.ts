"use server";

import { revalidatePath } from "next/cache";
import { petition } from "./instance";
import { redirect } from "next/navigation";

export async function createPetitionAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const alternatives = (formData.get("alternatives") as string).split(",");

  await petition.service.create(title, description, alternatives);

  revalidatePath("/petitions");
  redirect("/petitions");
}
