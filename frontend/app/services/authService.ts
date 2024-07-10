"user server";

import { redirect } from "next/navigation";
import { FormError } from "../common/form-error.interface";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "../utils/errorMessage";

export async function login(_prevState: FormError, formData: FormData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }
  redirect("/");
}
