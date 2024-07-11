"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "../utils/fetch";
import { API_URL } from "@/app/common/constants/api";

export default async function createInvoiceImageEntity(formData: FormData) {
  const response = await post("invoice-images", formData);
  const invoiceImage = formData.get("image");
  if (invoiceImage instanceof File && !response.error) {
    await uploadInvoiceImage(response.data.id, invoiceImage);
  }
  revalidateTag("invoice-images");
  return response;
}

async function uploadInvoiceImage(invoiceImageId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return await fetch(`${API_URL}/invoice-images/${invoiceImageId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
