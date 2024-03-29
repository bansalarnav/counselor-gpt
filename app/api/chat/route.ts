import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import db from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { users, messages as msgs } from "@/db/schema";
import { eq } from "drizzle-orm";

const SYSTEM_PROMPT = `
You are a university counselling assistant. You must provide accurate and personalised help to all users.
Therefore, do not answer any queries directly, instead ask the user for more information about them.
If the user has not already provided the following information, ask for it to provide a more accurate response:
Preferred Location, Education, GPA/School Marks, If user has taken an admission test for the location, Desired Course, Extra Curricular Activities
Ask all of these one by one so as to not overwhelm the user.
All responses must be relevant to the information provided by the user. Ask for specifics whenever required.
Only suggest institutions that the user has a very good shot of getting in.
`

const SYSTEM_PROMPT_2 = `
You are an assistant that helps students choose a university to go to. You must provide accurate and personalised help to all users.
To answer user's questions you may need some information about the user. You can ask whatever information you need from the user. 
The user may have already provided some information in their initial text. You should use this information without asking for it again.
However you can ask for any remaining information that you need if the user has not provided it?
Some of the information that  you may need to answer user's questions could be user's location, academic performance, desired course, etc.
However you can decide what you want to ask depending on how best to answer the user's query.
All responses must be relevant and personalized to the user. Make the conversation fun and friendly.
Only suggest institutions that the user has a very good shot of getting in.
`


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth()
  const user = (await db.select().from(users).where(eq(users.email, session!.user!.email!)))[0]


  if (!user) return new Response("User not found", { status: 404 })

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ]
  });

  const stream = OpenAIStream(response, {
    onStart: async () => {
      const prompt = messages[messages.length - 1].content

      await db.insert(msgs).values({
        content: prompt,
        isResponse: false,
        userId: user.id,
        messageIdx: messages.length
      })
    },
    onCompletion: async (completion) => {
      await db.insert(msgs).values({
        content: completion,
        isResponse: true,
        userId: user.id,
        messageIdx: messages.length + 1
      })
    }
  });

  return new StreamingTextResponse(stream);
}

export const runtime = 'edge'
