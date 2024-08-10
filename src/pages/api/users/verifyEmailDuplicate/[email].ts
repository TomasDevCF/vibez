import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const email = params.email as string
  const usersInfo = await db.select().from(Users).where(
    eq(Users.email, email)
  );

  return new Response(JSON.stringify({
    alreadyExistEmail: !(usersInfo.length === 0)
  }))
}