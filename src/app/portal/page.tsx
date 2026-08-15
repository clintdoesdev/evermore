import { redirect } from "next/navigation";
import { getMemberSession } from "@/lib/auth/session";

export default async function PortalRootPage() {
  const session = await getMemberSession();
  redirect(session ? "/dashboard" : "/login");
}
