import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, verifyToken, AuthPayload } from "@/lib/auth";

export async function getSessionUser(): Promise<AuthPayload | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
