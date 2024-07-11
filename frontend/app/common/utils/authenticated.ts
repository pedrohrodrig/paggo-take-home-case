import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../constants/auth-cookie";

export default function authenticated() {
  return !!cookies().get(AUTHENTICATION_COOKIE)?.value;
}
