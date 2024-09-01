import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";
import { validateReferer } from "../post";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const username = params.username as string
    const users = await db.select().from(Users).where(
      eq(Users.username, username)
    );
  
    return new Response(JSON.stringify({
      usernameExist: !(users.length === 0)
    }))
  })
}