import { redirect } from "next/navigation";
import { post } from "../utils/fetch";

export default async function createUser(_prevState: any, formData: FormData) {
  const { error } = await post("users", formData);

  if (error) {
    return { error };
  }

  redirect("/");
}
