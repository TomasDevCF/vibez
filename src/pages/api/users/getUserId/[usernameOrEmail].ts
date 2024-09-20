import type { APIRoute } from 'astro'
import { Users, db, eq } from 'astro:db';
import { validateReferer } from '../post';

export const GET: APIRoute = async ({ params, request }) => {
  return validateReferer(request, async () => {
    const usernameOrEmail = params.usernameOrEmail as string
    const userInfo = await db.select().from(Users).where(
      eq(usernameOrEmail.includes('@') ? Users.email : Users.username, usernameOrEmail)
    );
    return new Response(JSON.stringify({
      userId: userInfo[0].user_id
    }))
  })
}