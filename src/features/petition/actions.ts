"use server";

import { revalidatePath } from "next/cache";
import { petition } from "./instance";
import { redirect } from "next/navigation";

export async function createPetitionAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await petition.service.create(title, description);

  revalidatePath("/petitions");
  redirect("/petitions");
}