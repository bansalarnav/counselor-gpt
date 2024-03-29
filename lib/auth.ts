import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const config = {
  providers: [
    Google({}),
  ],
  basePath: "/auth",
  callbacks: {
    signIn: async ({ user }) => {
      const u = await db.select().from(users).where(eq(users.email, user.email!));

      if (!u.length) {
        await db.insert(users).values({
          email: user.email!,
          name: user.name!,
          avatar: user.image!,
        })
      } else {
        await db.update(users).set({
          avatar: user.image!,
        }).where(eq(users.email, user.email!))
      }

      return true;
    },
  }
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
