import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const username = params.username as string
  const userInfo = await db.select().from(Users).where(
    eq(Users.username, username)
  );
  return new Response(JSON.stringify({
    userId: userInfo[0].user_id
  }))
}