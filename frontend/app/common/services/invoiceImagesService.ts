"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../utils/fetch";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "../utils/errorMessage";

export default async function createInvoiceImageEntity(formData: FormData) {
  const response = await fetch(`${API_URL}/invoice-images/`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });

  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  revalidateTag("invoice-images");
  return parsedResponse;
}
