"use server";

import { API_URL } from "@/app/constants/api";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: any, formData: FormData) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
  });

  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: "" };
  }
  redirect("/");
}
