"use server";

import { redirect } from "next/navigation";
import { post } from "../utils/fetch";
import { FormError } from "../common/interfaces/form-error.interface";

export async function createUser(_prevState: FormError, formData: FormData) {
  const { error } = await post("users", formData);

  if (error) {
    return { error };
  }

  redirect("/");
}
