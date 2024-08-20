import type { APIRoute } from "astro"
import { Users, db, eq } from "astro:db";
import { validateReferer } from "../post";

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const userId = params.id as string
    const userInfo = await db.select().from(Users).where(
      eq(Users.user_id, parseInt(userId))
    );
    if (userInfo.length === 0) {
      return new Response(JSON.stringify({
        error: "Usuario no encontrado.",
      }), {
        status: 404,
      })
    }
    return new Response(JSON.stringify(userInfo[0]))
  })
}