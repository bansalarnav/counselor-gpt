import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  name: text('name'),
  avatar: text('avatar'),
}, (table) => {
  return {
    emailIdx: index('email_idx').on(table.email)
  }
});

export const userRelations = relations(users, ({ many }) => {
  return {
    messages: many(messages)
  }
})

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  isResponse: boolean('is_response').notNull().default(false),
  messageIdx: integer('msg_idx').notNull(),
  userId: integer('user_id').references(() => users.id)
});

export const messageRelations = relations(messages, ({ one }) => {
  return {
    user: one(users, {
      fields: [messages.userId],
      references: [users.id]
    })
  }
})


