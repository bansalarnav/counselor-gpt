import { auth } from "@/lib/auth"
import { Nav } from "./Nav"
import Chat from "./chat"
import db from "@/db/drizzle"
import { messages, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function Page() {
  const session = await auth()

  const user = (await db.select().from(users).where(eq(users.email, session!.user!.email!)))[0]
  const msgs = await db.select().from(messages).where(eq(messages.userId, user.id))
  const initialMsgs = msgs.sort((a, b) => a.messageIdx - b.messageIdx).map(msg => ({ role: msg.isResponse ? 'assistant' : 'user', content: msg.content }))

  return (
    <div className="flex flex-col w-[55vw] ml-auto mr-auto">
      <Nav name={session?.user?.name as string} avatar={session?.user?.image as string} />
      <div className="w-full h-[calc(100vh-110px)] mt-2">
        <Chat userAvatar={session?.user?.image as string} initialMsgs={initialMsgs} />
      </div>
    </div>
  )
}
