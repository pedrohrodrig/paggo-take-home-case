"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../utils/fetch";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "../utils/errorMessage";

export default async function createInvoiceImageEntity(formData: FormData) {
  const response = await fetch(`${API_URL}/invoice-images`, {
    method: "POST",
    headers: { ...getHeaders(), "Content-Type": "application/json" },
  });

  const parsedResponse = await response.json();
  if (!response.ok) {
    return { error: getErrorMessage(parsedResponse) };
  }

  const invoiceImage = formData.get("image");
  if (invoiceImage instanceof File) {
    console.log(invoiceImage.name);
    const invoiceImageResponse = await uploadInvoiceImage(
      parsedResponse.id,
      invoiceImage
    );

    const invoiceImageCreationParsedResponse = await response.json();
    if (!invoiceImageResponse.ok) {
      return {
        error: getErrorMessage(invoiceImageCreationParsedResponse),
      };
    }
  }
  revalidateTag("invoice-images");
  return parsedResponse;
}

async function uploadInvoiceImage(invoiceImageId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  console.log(formData);
  const response = await fetch(
    `${API_URL}/invoice-images/${invoiceImageId}/image`,
    {
      body: formData,
      method: "POST",
      headers: getHeaders(),
    }
  );

  const parsedResponse = await response.json();
  if (!response.ok) return { error: getErrorMessage(parsedResponse) };

  return await response.json();
}
