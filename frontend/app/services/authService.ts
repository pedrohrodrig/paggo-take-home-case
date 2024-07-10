"use server";

import { redirect } from "next/navigation";
import { FormError } from "../common/interfaces/form-error.interface";
import { API_URL } from "../common/constants/api";
import { getErrorMessage } from "../utils/errorMessage";
import { setAuthCookie } from "../utils/cookies";

export async function login(_prevState: FormError, formData: FormData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }
  setAuthCookie(response);
  redirect("/");
}
