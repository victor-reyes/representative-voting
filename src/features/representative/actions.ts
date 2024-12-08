"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { representative } from "./instance";
import { z } from "zod";

const representativeCreationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export async function createRepresentativeAction(formData: FormData) {
  const createRepresentative = Object.fromEntries(formData.entries());
  const validatedCreateRepresentative =
    representativeCreationSchema.safeParse(createRepresentative);

  if (!validatedCreateRepresentative.success) {
    throw new Error("Invalid form data for creating a representative");
  }

  const { firstName, lastName, email } = validatedCreateRepresentative.data;
  representative.service.create(firstName, lastName, email);

  revalidatePath("/representatives");
  redirect("/representatives");
}
