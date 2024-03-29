import db from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { users, messages as msgs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const session = await auth()
  const user = (await db.select().from(users).where(eq(users.email, session!.user!.email!)))[0]

  if (!user) return new Response("User not found", { status: 404 })

  await db.delete(msgs).where(eq(msgs.userId, user.id))

  return new Response('OK')

}

export const runtime = 'edge'
