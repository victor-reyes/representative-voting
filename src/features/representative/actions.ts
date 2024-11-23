"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { representative } from "./instance";

export async function createRepresentativeAction(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  representative.service.create(firstName, lastName, email);

  revalidatePath("/representatives");
  redirect("/representatives");
}
