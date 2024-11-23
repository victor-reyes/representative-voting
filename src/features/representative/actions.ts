"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRepresentativeAction(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;

  console.log(`Creating representative: ${firstName} ${lastName} (${email})`);

  revalidatePath("/representatives");
  redirect("/representatives");
}
